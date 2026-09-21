"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { PortfolioContent } from "../types";
import {
  buildEmailUrl,
  buildIntroduction,
  buildWhatsAppUrl,
  validateContact,
} from "./contact";
import type { ContactErrors, ContactInput } from "./contact";
import s from "../portfolio.module.css";

export function ContactComposer({
  config,
}: {
  config: PortfolioContent["contact"];
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [input, setInput] = useState<ContactInput>({
    name: "",
    email: "",
    intent: "role",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [prepared, setPrepared] = useState<ContactInput | null>(null);
  const [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const preview = useRef<HTMLTextAreaElement>(null);
  function update(field: keyof ContactInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
    setPrepared(null);
    setStatus("");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const next = validateContact(input);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      setPrepared(null);
      setStatus("Check the highlighted fields.");
      (form.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setPrepared({ ...input });
    setStatus("Your introduction is ready. Choose how to continue.");
  }
  async function copy() {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(buildIntroduction(prepared));
      setStatus("Introduction copied. Paste it into your conversation.");
    } catch {
      preview.current?.focus();
      preview.current?.select();
      setStatus("Copy is unavailable. Select and copy the introduction below.");
    }
  }
  const introduction = prepared ? buildIntroduction(prepared) : "";
  const whatsapp = config.whatsappInternational
    ? buildWhatsAppUrl(config.whatsappInternational, introduction)
    : null;
  const available = !!(config.email || config.linkedinUrl || whatsapp);
  return (
    <div className={s.composer} data-reveal>
      <noscript>
        <p>
          The introduction composer needs JavaScript. Any available contact
          links are listed beside it.
        </p>
      </noscript>
      <form ref={form} onSubmit={submit} noValidate>
        <fieldset disabled={!hydrated} className={s.composerFields}>
          <fieldset className={s.intents}>
            <legend>I’m reaching out about</legend>
            {(["role", "client"] as const).map((intent) => (
              <label key={intent}>
                <input
                  type="radio"
                  name="intent"
                  value={intent}
                  checked={input.intent === intent}
                  onChange={() => update("intent", intent)}
                />
                <span>
                  {intent === "role"
                    ? "A role opportunity"
                    : "A client project"}{" "}
                  <span aria-hidden="true">↗</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className={s.fields}>
            {(["name", "email"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={`contact-${field}`}>
                  {field === "name" ? "Your name" : "Email address"}
                </label>
                <input
                  id={`contact-${field}`}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  autoComplete={field}
                  required
                  maxLength={field === "name" ? 100 : 254}
                  value={input[field]}
                  onChange={(e) => update(field, e.target.value)}
                  aria-invalid={!!errors[field]}
                  aria-describedby={
                    errors[field] ? `${field}-error` : undefined
                  }
                />
                {errors[field] && (
                  <p id={`${field}-error`} className={s.error}>
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <label htmlFor="contact-message">What do you have in mind?</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={3000}
            value={input.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className={s.error}>
              {errors.message}
            </p>
          )}
          <button type="submit" className={s.primary}>
            Prepare introduction <span aria-hidden="true">↗</span>
          </button>
          <p className={s.formNote}>
            Prepare once. Continue in your preferred app. Nothing is sent from
            this page.
          </p>
        </fieldset>
      </form>
      <p role="status" aria-live="polite" className={s.status}>
        {status}
      </p>
      {prepared && (
        <div className={s.preview}>
          <label htmlFor="introduction-preview">Your introduction</label>
          <textarea
            id="introduction-preview"
            ref={preview}
            readOnly
            value={introduction}
            rows={8}
          />
          <div className={s.actions}>
            <button type="button" className={s.secondary} onClick={copy}>
              Copy introduction
            </button>
            {config.email && (
              <a
                className={s.secondary}
                href={buildEmailUrl(config.email, prepared)}
                onClick={() =>
                  setStatus(
                    "Email draft requested. Review and send it in your email app.",
                  )
                }
              >
                Open email draft ↗
              </a>
            )}
            {whatsapp && (
              <a
                className={s.secondary}
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open WhatsApp ↗
              </a>
            )}
            {config.linkedinUrl && (
              <a
                className={s.secondary}
                href={config.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open LinkedIn ↗
              </a>
            )}
          </div>
          {!available && (
            <p>
              No contact channel is currently configured. You can copy your
              introduction for later.
            </p>
          )}
          {config.linkedinUrl && (
            <p className={s.formNote}>
              For LinkedIn, copy your introduction, then paste it into a message
              on my profile.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
