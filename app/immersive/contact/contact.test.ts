import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateContact,
  buildIntroduction,
  buildEmailUrl,
  buildWhatsAppUrl,
} from "./contact";
import type { ContactInput } from "./contact";
import type { ContactIntent } from "../types";

const valid: ContactInput = {
  name: "Zoë",
  email: "zoe@example.com",
  intent: "role",
  message: "Hello & welcome? #100%\nA second line.",
};

test("required fields, malformed email, invalid intent and single-line injection fail", () => {
  const fields: (keyof ContactInput)[] = ["name", "email", "message"];
  for (const field of fields) {
    const errors = validateContact({ ...valid, [field]: "   " }) as Record<string, string>;
    assert.ok(errors[field]);
  }
  assert.ok(validateContact({ ...valid, email: "bad@" }).email);
  assert.ok(validateContact({ ...valid, intent: "unknown" as ContactIntent }).intent);
  assert.ok(validateContact({ ...valid, name: "Name\r\nBcc: x" }).name);
  assert.ok(validateContact({ ...valid, email: "a@example.com\n" }).email);
  assert.deepEqual(validateContact(valid), {});
});

test("field limits accept the boundary and reject excess", () => {
  for (const [field, length] of [
    ["name", 100],
    ["message", 3000],
  ] as [string, number][]) {
    const errs = validateContact({ ...valid, [field]: "a".repeat(length) }) as Record<string, string>;
      assert.equal(errs[field], undefined);
      const errs2 = validateContact({ ...valid, [field]: "a".repeat(length + 1) }) as Record<string, string>;
      assert.ok(errs2[field]);
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
  const whatsappUrl = buildWhatsAppUrl("+12345678901", buildIntroduction(valid));
  assert.ok(whatsappUrl);
  const url = new URL(whatsappUrl);
  assert.equal(url.pathname, "/12345678901");
  assert.equal(url.searchParams.get("text"), buildIntroduction(valid));
});