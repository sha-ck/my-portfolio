const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  clampProgress,
  resolveScene,
  chooseRenderProfile,
  downgradeProfile,
  resolveTransition,
} = require("../app/immersive/scene/renderProfile.ts");

test("scroll morph holds each form, then joins the next scene continuously", () => {
  assert.deepEqual(resolveTransition({ id: "home", progress: 0 }), {
    from: 0,
    to: 1,
    mix: 0,
  });
  assert.equal(resolveTransition({ id: "home", progress: 0.5 }).mix, 0);
  const halfway = resolveTransition({ id: "home", progress: 0.75 });
  assert.equal(halfway.mix, 0.5);
  assert.equal(resolveTransition({ id: "home", progress: 1 }).mix, 1);
  assert.deepEqual(resolveTransition({ id: "contact", progress: 1 }), {
    from: 5,
    to: 5,
    mix: 0,
  });
  assert.equal(resolveTransition({ id: "home", progress: NaN }).mix, 0);
  assert.equal(
    resolveTransition({ id: "home", progress: 0.75 }).mix,
    halfway.mix,
  );
});

test("poor rendering downgrades the actual active profile, including initially lite devices", () => {
  assert.equal(downgradeProfile("full"), "lite");
  assert.equal(downgradeProfile("lite"), "static");
  assert.equal(downgradeProfile("static"), "static");
});

test("progress stays finite and within the scene", () => {
  for (const value of [NaN, Infinity, -Infinity, -1])
    assert.equal(clampProgress(value), 0);
  assert.equal(clampProgress(0), 0);
  assert.equal(clampProgress(0.4), 0.4);
  assert.equal(clampProgress(2), 1);
});

test("the final section owns the document bottom even when its anchor cannot reach the header", () => {
  const sections = [
    { id: "skills", top: 0, height: 800 },
    { id: "contact", top: 800, height: 400 },
  ];
  assert.deepEqual(resolveScene(sections, 312, true), {
    id: "contact",
    progress: 1,
  });
});

test("section starts own boundaries, gaps, and forward/backward anchor jumps", () => {
  const sections = [
    { id: "home", top: 0, height: 400 },
    { id: "about", top: 400, height: 800 },
    { id: "contact", top: 1300, height: 0 },
  ];
  assert.deepEqual(resolveScene(sections, 0), { id: "home", progress: 0 });
  assert.deepEqual(resolveScene(sections, 400), { id: "about", progress: 0 });
  assert.deepEqual(resolveScene(sections, 800), { id: "about", progress: 0.5 });
  assert.deepEqual(resolveScene(sections, 1250), { id: "about", progress: 1 });
  assert.deepEqual(resolveScene(sections, 1400), {
    id: "contact",
    progress: 1,
  });
  assert.deepEqual(resolveScene(sections, 100), { id: "home", progress: 0.25 });
  assert.deepEqual(resolveScene([], NaN), { id: "home", progress: 0 });
});

test("motion and WebGL override capability; unknown hardware remains lite", () => {
  for (const constrained of [true, false]) {
    assert.equal(
      chooseRenderProfile({
        reducedMotion: true,
        webglAvailable: true,
        constrained,
      }),
      "static",
    );
    assert.equal(
      chooseRenderProfile({
        reducedMotion: false,
        webglAvailable: false,
        constrained,
      }),
      "static",
    );
  }
  assert.equal(
    chooseRenderProfile({ reducedMotion: false, webglAvailable: true }),
    "lite",
  );
  assert.equal(
    chooseRenderProfile({
      reducedMotion: false,
      webglAvailable: true,
      constrained: false,
    }),
    "full",
  );
});
