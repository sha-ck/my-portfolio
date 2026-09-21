// Optional real-Chrome checks. Start the app and Chrome with remote debugging,
// then run: node tests/browser/immersive.cjs
// CDP_URL and PORTFOLIO_URL may override the local defaults. No test dependencies.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const endpoint = process.env.CDP_URL || "http://127.0.0.1:9333";
const base = process.env.PORTFOLIO_URL || "http://localhost:3000";
let socket,
  session,
  targetId,
  sequence = 0;
const pending = new Map();
const errors = [];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function call(method, params = {}, sessionId = session) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(Error(`Timed out: ${method}`));
    }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
}
async function evaluate(expression) {
  const result = await call("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails)
    throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function until(expression) {
  for (let i = 0; i < 150; i++) {
    if (await evaluate(expression)) return;
    await pause(100);
  }
  throw Error(`Not observed: ${expression}`);
}
async function navigate(path = "/lab") {
  await call("Page.navigate", { url: base + path });
  await until(
    `document.querySelector('[data-immersive-root]')?.dataset.scene && !document.querySelector('form fieldset').disabled`,
  );
}
async function viewport(width, height = 900, mobile = false) {
  await call("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await pause(120);
}
async function screenshot(name) {
  const result = await call("Page.captureScreenshot", { format: "png" });
  fs.mkdirSync(".superpowers/refinement", { recursive: true });
  fs.writeFileSync(
    `.superpowers/refinement/${name}.png`,
    Buffer.from(result.data, "base64"),
  );
}
async function main() {
  const version = await (await fetch(endpoint + "/json/version")).json();
  console.log("Browser:", version.Browser);
  socket = new WebSocket(version.webSocketDebuggerUrl);
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.method === "Runtime.exceptionThrown")
      errors.push(message.params.exceptionDetails.text);
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timer);
    pending.delete(message.id);
    message.error
      ? request.reject(Error(message.error.message))
      : request.resolve(message.result);
  };
  await new Promise((resolve) => (socket.onopen = resolve));
  ({ targetId } = await call("Target.createTarget", { url: "about:blank" }));
  ({ sessionId: session } = await call("Target.attachToTarget", {
    targetId,
    flatten: true,
  }));
  await call("Runtime.enable");
  await call("Page.enable");
  await viewport(1440, 1000);
  await navigate();
  await until(
    `document.querySelector('[data-immersive-root]').dataset.canvasReady === 'true'`,
  );
  assert.equal(
    await evaluate(`document.querySelector('meta[name="robots"]').content`),
    "noindex, nofollow",
  );
  assert.equal(
    await evaluate(`document.querySelector('img').naturalWidth > 0`),
    true,
  );
  assert.equal(
    await evaluate(
      `getComputedStyle(document.querySelector('header')).position`,
    ),
    "fixed",
  );
  assert.equal(
    await evaluate(`document.querySelectorAll('[data-reveal]').length > 20`),
    true,
  );
  const canvasLeft = await evaluate(
    `document.querySelector('canvas').getBoundingClientRect().left`,
  );
  await screenshot("final-desktop");
  const ids = [
    "about",
    "experience",
    "projects",
    "skills",
    "contact",
    "skills",
    "projects",
    "experience",
    "about",
    "home",
  ];
  for (const id of ids) {
    await evaluate(`document.querySelector('nav a[href="#${id}"]').click()`);
    await until(
      `document.querySelector('[data-immersive-root]').dataset.scene === '${id}'`,
    );
    assert.equal(
      await evaluate(
        `document.querySelector('nav a[href="#${id}"]').getAttribute('aria-current')`,
      ),
      "location",
    );
    assert.equal(
      await evaluate(
        `document.querySelector('canvas').getBoundingClientRect().left`,
      ),
      canvasLeft,
    );
    assert.equal(
      await evaluate(
        `document.querySelector('header').getBoundingClientRect().top`,
      ),
      0,
    );
  }
  console.log(
    "Forward/reverse anchors, persistent header, active navigation, stable canvas: passed",
  );
  // A fresh document exercises normal entrances instead of previously revealed content.
  await call("Page.reload");
  await until(
    `Boolean(document.querySelector('[data-immersive-root]')?.dataset.scene)`,
  );
  await pause(800);
  const entrances = await evaluate(`(async()=>{
    const seen = new Set();
    const end = document.documentElement.scrollHeight;
    for(let y=0;y<end;y+=300){
      scrollTo(0,y);
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      for(const animation of document.getAnimations()){
        const el=animation.effect?.target;
        if(el?.hasAttribute('data-reveal')) seen.add(el.closest('section').id);
      }
    }
    return [...seen];
  })()`);
  for (const id of ["about", "experience", "projects", "skills", "contact"])
    assert.ok(entrances.includes(id), `entrances in ${id}`);
  await evaluate(
    `scrollTo(0,0); scrollTo(0,document.body.scrollHeight); scrollTo(0,0)`,
  );
  await pause(850);
  assert.equal(
    await evaluate(
      `Array.from(document.querySelectorAll('[data-reveal]')).every(el=>getComputedStyle(el).opacity==='1')`,
    ),
    true,
  );
  console.log(
    "Content entrances across sections and rapid-scroll recovery: passed",
  );
  await navigate("/lab#projects");
  await call("Page.reload");
  await pause(500);
  await until(
    `document.querySelector('[data-immersive-root]').dataset.scene === 'projects'`,
  );
  assert.equal(
    await evaluate(
      `document.querySelectorAll('[data-reveal]').length > 20 && document.getAnimations().filter(a=>a.effect?.target?.hasAttribute('data-reveal')).length === 0`,
    ),
    true,
  );
  await evaluate(`document.querySelector('summary').focus()`);
  assert.equal(await evaluate("document.activeElement.tagName"), "SUMMARY");
  await call("Page.bringToFront");
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Enter",
    code: "Enter",
    text: "\r",
    unmodifiedText: "\r",
    windowsVirtualKeyCode: 13,
    nativeVirtualKeyCode: 13,
  });
  await call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
  });
  await until(`document.querySelector('details').open`);
  await screenshot("final-projects");
  await evaluate(`document.querySelector('summary').click()`);
  assert.equal(await evaluate(`document.querySelector('details').open`), false);
  await evaluate(`document.querySelector('nav a[href="#contact"]').click()`);
  await pause(100);
  const history = await call("Page.getNavigationHistory");
  await call("Page.navigateToHistoryEntry", {
    entryId: history.entries[history.currentIndex - 1].id,
  });
  await until(
    `location.hash === '#projects' && document.querySelector('[data-immersive-root]').dataset.scene === 'projects'`,
  );
  await call("Page.navigateToHistoryEntry", {
    entryId: history.entries[history.currentIndex].id,
  });
  await until(
    `location.hash === '#contact' && document.querySelector('[data-immersive-root]').dataset.scene === 'contact'`,
  );
  await evaluate(`document.querySelector('form button').click()`);
  await until(
    `document.querySelectorAll('[aria-invalid="true"]').length === 3`,
  );
  assert.equal(await evaluate("document.activeElement.id"), "contact-name");
  await evaluate(
    `for (const [id,value] of [['contact-name','Browser check'],['contact-email','test@example.com'],['contact-message','A local test — nothing sent.']]) { const el=document.getElementById(id); Object.getOwnPropertyDescriptor(el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(el,value); el.dispatchEvent(new Event('input',{bubbles:true})); }`,
  );
  await evaluate(`document.querySelector('form button').click()`);
  await until(`Boolean(document.getElementById('introduction-preview'))`);
  assert.match(
    await evaluate(`document.querySelector('[role="status"]').textContent`),
    /introduction is ready/,
  );
  assert.match(
    await evaluate(
      `decodeURIComponent(document.querySelector('a[href^="mailto:"][class]').href)`,
    ),
    /test@example.com/,
  );
  await evaluate(
    `Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('test denial'))}}); Array.from(document.querySelectorAll('button')).find(b=>b.textContent==='Copy introduction').click()`,
  );
  await until(`document.activeElement.id === 'introduction-preview'`);
  assert.match(
    await evaluate(`document.querySelector('[role="status"]').textContent`),
    /Copy is unavailable/,
  );
  console.log(
    "Fragment refresh, history, keyboard disclosure, contact validation/preparation/copy denial: passed",
  );
  for (const width of [320, 375, 768, 1024, 1440, 2560]) {
    await viewport(width);
    if (width === 768) await screenshot("final-tablet");
    assert.equal(
      await evaluate("document.documentElement.scrollWidth > innerWidth"),
      false,
      `overflow at ${width}`,
    );
  }
  await viewport(375, 812, true);
  await navigate();
  await until(
    `document.querySelector('[data-immersive-root]').dataset.renderProfile === 'lite'`,
  );
  const point = await evaluate(
    `(()=>{const r=document.querySelector('button[aria-controls="lab-mobile-nav"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
  );
  await call("Emulation.setTouchEmulationEnabled", { enabled: true });
  await call("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [point],
  });
  await call("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await until(
    `document.querySelector('button[aria-controls="lab-mobile-nav"]').getAttribute('aria-expanded') === 'true'`,
  );
  await call("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await call("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await until(
    `document.querySelector('button[aria-controls="lab-mobile-nav"]').getAttribute('aria-expanded') === 'false'`,
  );
  assert.equal(
    await evaluate('document.activeElement.getAttribute("aria-controls")'),
    "lab-mobile-nav",
  );
  await screenshot("final-mobile");
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await until(
    `document.querySelector('[data-immersive-root]').dataset.renderProfile === 'static'`,
  );
  assert.equal(await evaluate("document.getAnimations().length"), 0);
  for (let i = 0; i < 6; i++) await evaluate(`scrollTo(0,${i}*1000)`);
  await pause(100);
  assert.equal(await evaluate("document.getAnimations().length"), 0);
  assert.equal(await evaluate('document.querySelectorAll("canvas").length'), 0);
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
  });
  await until(
    `document.querySelector('[data-immersive-root]').dataset.canvasReady === 'true'`,
  );
  await evaluate(
    `document.querySelector('canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()`,
  );
  await until(
    `document.querySelector('[data-immersive-root]').dataset.renderProfile === 'static'`,
  );
  await call("Emulation.setScriptExecutionDisabled", { value: true });
  await call("Page.reload");
  await pause(1500);
  assert.equal(
    await evaluate('document.querySelectorAll("main>section").length'),
    6,
  );
  assert.equal(
    await evaluate('document.querySelector("form fieldset").disabled'),
    true,
  );
  assert.equal(
    await evaluate("document.documentElement.scrollWidth > innerWidth"),
    false,
  );
  await screenshot("final-no-js");
  console.log(
    "320–2560px, touch menu, Escape/focus, reduced motion, context loss, no-JS: passed",
  );
  await call("Emulation.setScriptExecutionDisabled", { value: false });
  const { identifier } = await call("Page.addScriptToEvaluateOnNewDocument", {
    source: `const original=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args)}; Element.prototype.animate=undefined;`,
  });
  await navigate();
  await pause(300);
  assert.equal(
    await evaluate(
      `document.querySelector('[data-immersive-root]').dataset.renderProfile`,
    ),
    "static",
  );
  assert.equal(
    await evaluate(
      `Array.from(document.querySelectorAll('[data-reveal]')).every(el=>getComputedStyle(el).opacity==='1')`,
    ),
    true,
  );
  await call("Page.removeScriptToEvaluateOnNewDocument", { identifier });
  console.log(
    "Unavailable WebGL and animation API retain readable content: passed",
  );
  assert.deepEqual(errors, []);
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert.equal(sitemap.includes("/lab"), false);
  const home = await (await fetch(base)).text();
  assert.equal(home.includes("data-immersive-root"), false);
  assert.equal(home.includes('href="/lab'), false);
  console.log(
    "Production isolation, sitemap exclusion, no uncaught browser errors: passed",
  );
}
main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (socket?.readyState === 1) {
      if (targetId)
        await call("Target.closeTarget", { targetId }, undefined).catch(
          () => {},
        );
      socket.close();
    }
  });
