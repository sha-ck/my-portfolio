import type { ContactIntent } from "../types";

export interface ContactInput {
  name: string;
  email: string;
  intent: ContactIntent;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (!input.name.trim()) errors.name = "Enter your name.";
  else if (/[\r\n]/.test(input.name) || input.name.trim().length > 100)
    errors.name = "Use one line, up to 100 characters.";
  if (!input.email.trim()) errors.email = "Enter your email address.";
  else if (
    /[\r\n]/.test(input.email) ||
    input.email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())
  )
    errors.email = "Enter a valid email address, up to 254 characters.";
  if (input.intent !== "role" && input.intent !== "client")
    errors.intent = "Choose a role opportunity or client project.";
  if (!input.message.trim())
    errors.message = "Tell me a little about the opportunity.";
  else if (input.message.trim().length > 3000)
    errors.message = "Keep your message within 3000 characters.";
  return errors;
}

export function buildIntroduction(input: ContactInput): string {
  return `Hello Shanid,\n\nMy name is ${input.name.trim()}. I am contacting you about ${input.intent === "role" ? "a role opportunity" : "a client project"}.\nReply email: ${input.email.trim()}\n\n${input.message.trim()}`;
}

export function buildEmailUrl(email: string, input: ContactInput): string {
  const subject = `${input.intent === "role" ? "Role opportunity" : "Client project"} - ${input.name.trim()}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildIntroduction(input))}`;
}

export function buildWhatsAppUrl(
  international: string,
  introduction: string,
): string | null {
  if (!/^\+[1-9]\d{6,14}$/.test(international)) return null;
  return `https://wa.me/${international.slice(1)}?text=${encodeURIComponent(introduction)}`;
}
