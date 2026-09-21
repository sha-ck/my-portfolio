const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  validateContact,
  buildIntroduction,
  buildEmailUrl,
  buildWhatsAppUrl,
} = require("../app/immersive/contact/contact.ts");
const valid = {
  name: "Zoë",
  email: "zoe@example.com",
  intent: "role",
  message: "Hello & welcome? #100%\nA second line.",
};
test("required fields, malformed email, invalid intent and single-line injection fail", () => {
  for (const field of ["name", "email", "message"])
    assert.ok(validateContact({ ...valid, [field]: "   " })[field]);
  assert.ok(validateContact({ ...valid, email: "bad@" }).email);
  assert.ok(validateContact({ ...valid, intent: "unknown" }).intent);
  assert.ok(validateContact({ ...valid, name: "Name\r\nBcc: x" }).name);
  assert.ok(validateContact({ ...valid, email: "a@example.com\n" }).email);
  assert.deepEqual(validateContact(valid), {});
});
test("field limits accept the boundary and reject excess", () => {
  for (const [field, length] of [
    ["name", 100],
    ["message", 3000],
  ]) {
    assert.equal(
      validateContact({ ...valid, [field]: "a".repeat(length) })[field],
      undefined,
    );
    assert.ok(
      validateContact({ ...valid, [field]: "a".repeat(length + 1) })[field],
    );
  }
  const email = `${"a".repeat(64)}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(61)}`;
  assert.equal(email.length, 254);
  assert.equal(validateContact({ ...valid, email }).email, undefined);
  assert.ok(validateContact({ ...valid, email: email + "a" }).email);
});
test("email round-trips Unicode and reserved characters with sender email included", () => {
  const introduction = buildIntroduction(valid);
  const url = new URL(buildEmailUrl("owner@example.com", valid));
  assert.equal(url.searchParams.get("body"), introduction);
  assert.ok(introduction.includes(valid.email));
  assert.ok(introduction.includes(valid.message));
  assert.equal(url.searchParams.size, 2);
  assert.ok(
    buildIntroduction({ ...valid, intent: "client" }).includes(
      "a client project",
    ),
  );
});
test("WhatsApp requires a complete international number and safely encodes the introduction", () => {
  for (const number of ["", "9876543210", "+0", "+123abc", "+1234567890123456"])
    assert.equal(buildWhatsAppUrl(number, "hello"), null);
  const url = new URL(
    buildWhatsAppUrl("+12345678901", buildIntroduction(valid)),
  );
  assert.equal(url.pathname, "/12345678901");
  assert.equal(url.searchParams.get("text"), buildIntroduction(valid));
});
