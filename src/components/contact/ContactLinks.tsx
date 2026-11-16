import { Phone, Mail, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface ContactLinksProps {
  variant?: "compact" | "cards";
  className?: string;
}

/**
 * Renders the owner's phone/email/WhatsApp from the single
 * `siteConfig.contact` source. Any channel still `null` shows a
 * clearly-labelled "coming soon" chip instead of a dead or invented
 * link — never fabricated contact details.
 */
export async function ContactLinks({
  variant = "cards",
  className,
}: ContactLinksProps) {
  const t = await getTranslations("booking");
  const { phone, phoneIntl, whatsappIntl, email } = siteConfig.contact;

  const items = [
    {
      key: "phone",
      icon: Phone,
      label: t("phone.label"),
      cta: t("phone.cta"),
      pending: t("phone.pending"),
      href: phoneIntl ? `tel:${phoneIntl}` : null,
      display: phone,
    },
    {
      key: "email",
      icon: Mail,
      label: t("email.label"),
      cta: t("email.cta"),
      pending: t("email.pending"),
      href: email ? `mailto:${email}` : null,
      display: email,
    },
    {
      key: "whatsapp",
      icon: MessageCircle,
      label: t("whatsapp.label"),
      cta: t("whatsapp.cta"),
      pending: t("whatsapp.pending"),
      href: whatsappIntl ? `https://wa.me/${whatsappIntl}` : null,
      display: phone,
    },
  ];

  if (variant === "compact") {
    return (
      <ul className={cn("space-y-3", className)}>
        {items.map(({ key, icon: Icon, label, href, display, pending }) => (
          <li key={key} className="flex items-center gap-3 text-sm">
            <Icon aria-hidden className="h-4 w-4 shrink-0 text-terracotta-dark" />
            {href ? (
              <a
                href={href}
                className="text-ink hover:text-terracotta-dark hover:underline"
              >
                {display ?? label}
              </a>
            ) : (
              <span className="text-ink-faint italic">{pending}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {items.map(({ key, icon: Icon, label, cta, pending, href, display }) => (
        <Card key={key} className="flex flex-col items-start gap-3 p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-deep text-terracotta-dark">
            <Icon aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-xl text-ink">{label}</p>
            {href ? (
              <p className="text-sm text-ink-soft">{display}</p>
            ) : (
              <p className="text-sm italic text-ink-faint">{pending}</p>
            )}
          </div>
          {href ? (
            <a
              href={href}
              className="mt-auto text-sm font-medium text-terracotta-dark hover:underline"
            >
              {cta} →
            </a>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
