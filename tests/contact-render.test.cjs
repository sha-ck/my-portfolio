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
const {
  Skills,
  filterRenderableAiPractices,
} = require('../app/immersive/sections/Skills.tsx');

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

test('only evidence-backed AI practices render while the approved identity remains intact', () => {
  const practices = [
    {
      id: 'verified-ai-practice',
      name: 'Verified AI Practice',
      description: 'Evidence-backed and eligible to render.',
      evidence: [{ kind: 'project', id: 'ai-project' }],
    },
    {
      id: 'unsupported-ai-practice',
      name: 'Unsupported AI Practice',
      description: 'No evidence; should not render.',
      evidence: [],
    },
  ];

  assert.deepEqual(
    filterRenderableAiPractices(practices).map((practice) => practice.id),
    ['verified-ai-practice'],
  );

  const html = renderToStaticMarkup(
    React.createElement(Skills, {
      groups: [],
      projects: [
        {
          id: 'ai-project',
          name: 'AI project',
          users: 'teams',
          problem: 'needs',
          responsibilities: [],
          architecture: 'system',
          technologies: [],
          outcomes: [],
        },
      ],
      experience: [],
      aiPractices: practices,
    }),
  );

  assert.match(html, /Verified AI Practice/);
  assert.doesNotMatch(html, /Unsupported AI Practice/);
});
