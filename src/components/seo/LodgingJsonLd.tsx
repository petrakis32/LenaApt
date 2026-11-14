import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { propertyFacts } from "@/config/property";
import { amenities } from "@/config/amenities";
import { asLooseT } from "@/lib/i18n";
import { JsonLd } from "./JsonLd";

/**
 * LodgingBusiness structured data. Only includes facts we actually
 * have — an approximate/wrong pin or address here would actively
 * mislead search results, so each optional field stays out until
 * `siteConfig` actually has it.
 */
export async function LodgingJsonLd() {
  const t = await getTranslations("meta");
  const tAmenities = asLooseT(await getTranslations("amenities"));

  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.locality,
    addressRegion: siteConfig.location.region,
    addressCountry: siteConfig.location.countryCode,
  };
  if (siteConfig.location.streetAddress) {
    address.streetAddress = siteConfig.location.streetAddress;
  }
  if (siteConfig.location.postalCode) {
    address.postalCode = siteConfig.location.postalCode;
  }

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: t("defaultDescription"),
    url: siteConfig.url,
    address,
    numberOfRooms: propertyFacts.bedroomCount,
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: tAmenities(`items.${amenity.id}.title`),
      value: true,
    })),
  };

  if (siteConfig.contact.phone) {
    data.telephone = siteConfig.contact.phone;
  }
  if (siteConfig.contact.email) {
    data.email = siteConfig.contact.email;
  }
  if (siteConfig.location.exactCoordinates) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.exactCoordinates.lat,
      longitude: siteConfig.location.exactCoordinates.lng,
    };
  }

  return <JsonLd data={data} />;
}
