import { siteConfig } from "@/config/site";

/**
 * Opens Google Maps with directions to the property. Prefers the
 * owner's actual "Lena Apt" place listing (googleMapsDirectionsUrl)
 * so visitors land on the named listing rather than a bare pin;
 * falls back to a query built from the Plus Code / address if that
 * isn't set.
 */
export function getGoogleMapsDirectionsUrl(): string {
  if (siteConfig.location.googleMapsDirectionsUrl) {
    return siteConfig.location.googleMapsDirectionsUrl;
  }

  const { plusCode, streetAddress, locality, region, postalCode, country } =
    siteConfig.location;
  const query =
    plusCode ||
    [streetAddress, postalCode, locality, region, country]
      .filter(Boolean)
      .join(", ");

  const params = new URLSearchParams({ api: "1", destination: query });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
