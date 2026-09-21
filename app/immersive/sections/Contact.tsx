import type { PortfolioContent } from "../types";
import { ContactComposer } from "../contact/ContactComposer";
import { buildWhatsAppUrl } from "../contact/contact";
import s from "../portfolio.module.css";
export function Contact({ config }: { config: PortfolioContent["contact"] }) {
  const whatsapp = config.whatsappInternational
    ? buildWhatsAppUrl(config.whatsappInternational, "")
    : null;
  return (
    <section
      id="contact"
      className={`${s.section} ${s.contact}`}
      aria-labelledby="contact-heading"
    >
      <div data-reveal>
        <p className={s.eyebrow}>Contact / Make a connection</p>
        <h2 id="contact-heading">
          A good system
          <br />
          starts with
          <br />
          <span>a conversation.</span>
        </h2>
        <p className={s.lead}>
          A role worth exploring.
          <br />A product worth building.
          <br />
          Tell me what you have in mind.
        </p>
        <div className={s.contactLinks}>
          {!config.email && !config.linkedinUrl && !whatsapp && (
            <p>
              Contact channels are currently unavailable. Please check back
              later.
            </p>
          )}
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp: {config.whatsappInternational} ↗
            </a>
          )}
          {config.email && (
            <a href={`mailto:${config.email}`}>{config.email} ↗</a>
          )}
          {config.linkedinUrl && (
            <a
              href={config.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find me on LinkedIn ↗
            </a>
          )}
        </div>
      </div>
      <ContactComposer config={config} />
    </section>
  );
}
