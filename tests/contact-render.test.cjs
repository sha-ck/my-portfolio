const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
// Render the actual server output; no browser or new test dependency required.
for (const ext of [".ts", ".tsx"])
  require.extensions[ext] = (module, path) =>
    module._compile(
      ts.transpileModule(fs.readFileSync(path, "utf8"), {
        compilerOptions: {
          jsx: ts.JsxEmit.ReactJSX,
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2020,
        },
      }).outputText,
      path,
    );
require.extensions[".css"] = (module) => {
  module.exports = {
    default: new Proxy({}, { get: (_, name) => String(name) }),
  };
};
const { Contact } = require("../app/immersive/sections/Contact.tsx");
const {
  ContactComposer,
} = require("../app/immersive/contact/ContactComposer.tsx");
test("server-rendered composer cannot submit personal input before hydration", () => {
  const html = renderToStaticMarkup(
    React.createElement(ContactComposer, {
      config: { email: "owner@example.com" },
    }),
  );
  assert.match(html, /<fieldset[^>]*disabled=""/);
});
test("WhatsApp-only configuration retains an ordinary no-JavaScript link", () => {
  const html = renderToStaticMarkup(
    React.createElement(Contact, {
      config: { whatsappInternational: "+12345678901" },
    }),
  );
  assert.match(html, /href="https:\/\/wa.me\/12345678901\?text="/);
  assert.match(html, /\+12345678901/);
});
test("empty contact configuration is honest before hydration", () => {
  const html = renderToStaticMarkup(
    React.createElement(Contact, { config: {} }),
  );
  assert.match(html, /Contact channels are currently unavailable/);
  assert.doesNotMatch(html, /href="(?:mailto:|https:\/\/wa.me)/);
});
