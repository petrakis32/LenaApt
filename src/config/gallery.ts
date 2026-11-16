/**
 * Central photo catalogue for the whole site (hero, homepage
 * highlights and the full gallery all read from this one list).
 *
 * To add a real photo: drop the file in `public/images/gallery/`
 * and set its `src` below, e.g. `/images/gallery/living-room-1.jpg`.
 * Until `src` is set, the site renders a tasteful labelled
 * placeholder instead of a broken image — never a fake stock photo.
 *
 * `alt` keys resolve against messages.gallery.alt.<id> in both
 * locales — every photo must have real alt text once added.
 */

export type GalleryCategory =
  | "living"
  | "bedroom-1"
  | "bedroom-2"
  | "bathroom"
  | "balcony-large"
  | "balcony-small"
  | "exterior"
  | "view";

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  src: string | null;
  /** Wide images span two grid columns in the gallery layout. */
  wide?: boolean;
  /** Width / height of the photo file, so the gallery can keep its true shape. */
  ratio?: number;
  /** Shown in the curated homepage strip. */
  featured?: boolean;
}

export const heroImage: GalleryImage = {
  id: "hero",
  category: "view",
  src: "/images/hero/rethymno-harbor.jpg",
  wide: true,
};

const GALLERY_BASE = "/images/gallery";

/**
 * Photos chosen for the homepage sections (kept separate from the
 * gallery list so a section can use any file without it needing an id).
 */
export const homePhotos = {
  introLarge: `${GALLERY_BASE}/balcony-1/slide3.jpg`,
  introSmall: `${GALLERY_BASE}/other/slide18.jpg`,
  spaces: {
    bedrooms: `${GALLERY_BASE}/bedroom-1/img_20210714_153436.jpg`,
    living: `${GALLERY_BASE}/hall-kitchen/img_20210714_165422.jpg`,
    balconies: `${GALLERY_BASE}/balcony-2/img_20210714_161201.jpg`,
    bathroom: `${GALLERY_BASE}/bathroom/img_20210714_160356.jpg`,
  },
  cta: `${GALLERY_BASE}/other/slide1.jpg`, // decanter + raki glasses on the dining table
} as const;

export const galleryImages: GalleryImage[] = [
  // Bedroom 1 — double bed
  { id: "bedroom-1-1", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_153221.jpg`, ratio: 2.165 },
  { id: "bedroom-1-2", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_153302.jpg`, ratio: 2.165 },
  { id: "bedroom-1-3", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_153436.jpg`, ratio: 1.774, featured: true },
  { id: "bedroom-1-4", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_153457.jpg`, ratio: 1.774 },
  { id: "bedroom-1-5", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_153512.jpg`, ratio: 1.774 },
  { id: "bedroom-1-6", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_154140.jpg`, ratio: 1.333 },
  { id: "bedroom-1-7", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_154155.jpg`, ratio: 1.333 },
  { id: "bedroom-1-8", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/img_20210714_154242.jpg`, ratio: 1.333 },
  { id: "bedroom-1-9", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/slide6.jpg`, ratio: 1.333 },
  { id: "bedroom-1-10", category: "bedroom-1", src: `${GALLERY_BASE}/bedroom-1/slide7.jpg`, ratio: 1.333 },

  // Bedroom 2 — twin beds
  { id: "bedroom-2-1", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/img_20210714_155319.jpg`, ratio: 1.333, wide: true, featured: true },
  { id: "bedroom-2-2", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/img_20210714_155541.jpg`, ratio: 1.333 },
  { id: "bedroom-2-3", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/img_20210714_155654.jpg`, ratio: 0.75 },
  { id: "bedroom-2-4", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/img_20210714_155709.jpg`, ratio: 0.75 },
  { id: "bedroom-2-5", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/img_20210714_155758.jpg`, ratio: 1.333 },
  { id: "bedroom-2-6", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/img_20210714_160012.jpg`, ratio: 1.333 },
  { id: "bedroom-2-7", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/slide8.jpg`, ratio: 1.333 },
  { id: "bedroom-2-8", category: "bedroom-2", src: `${GALLERY_BASE}/bedroom-2/slide9.jpg`, ratio: 1.333 },

  // Bathroom
  { id: "bathroom-1", category: "bathroom", src: `${GALLERY_BASE}/bathroom/img_20210714_160356.jpg`, ratio: 1.333, featured: true },
  { id: "bathroom-2", category: "bathroom", src: `${GALLERY_BASE}/bathroom/img_20210714_160408.jpg`, ratio: 0.75 },
  { id: "bathroom-3", category: "bathroom", src: `${GALLERY_BASE}/bathroom/img_20210714_160504.jpg`, ratio: 1.333 },
  { id: "bathroom-4", category: "bathroom", src: `${GALLERY_BASE}/bathroom/img_20210714_160548.jpg`, ratio: 1.333 },

  // Small balcony
  { id: "balcony-small-1", category: "balcony-small", src: `${GALLERY_BASE}/balcony-1/1000018446.jpg`, ratio: 0.75 },
  { id: "balcony-small-2", category: "balcony-small", src: `${GALLERY_BASE}/balcony-1/img_20210714_155207.jpg`, ratio: 1.333 },
  { id: "balcony-small-3", category: "balcony-small", src: `${GALLERY_BASE}/balcony-1/slide2.jpg`, ratio: 1.333, wide: true },
  { id: "balcony-small-4", category: "balcony-small", src: `${GALLERY_BASE}/balcony-1/slide3.jpg`, ratio: 1.333 },

  // Large balcony
  { id: "balcony-large-1", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161128.jpg`, ratio: 0.75 },
  { id: "balcony-large-2", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161201.jpg`, ratio: 0.75 },
  { id: "balcony-large-3", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161231.jpg`, ratio: 0.75 },
  { id: "balcony-large-4", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161328.jpg`, ratio: 0.75 },
  { id: "balcony-large-5", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161505.jpg`, ratio: 1.333, featured: true },
  { id: "balcony-large-6", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161620.jpg`, ratio: 1.333 },
  { id: "balcony-large-7", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/img_20210714_161634.jpg`, ratio: 1.333 },
  { id: "balcony-large-8", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/slide4.jpg`, ratio: 1.333 },
  { id: "balcony-large-9", category: "balcony-large", src: `${GALLERY_BASE}/balcony-2/slide5.jpg`, ratio: 1.333 },

  // Living room & kitchen (open-plan salonokouzina)
  { id: "living-1", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165407.jpg`, ratio: 0.75, wide: true },
  { id: "living-2", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165422.jpg`, ratio: 1.333, wide: true, featured: true },
  { id: "living-3", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165429.jpg`, ratio: 1.333 },
  { id: "living-4", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165518.jpg`, ratio: 1.333 },
  { id: "living-5", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165523.jpg`, ratio: 1.333 },
  { id: "living-6", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165531.jpg`, ratio: 1.333 },
  { id: "living-7", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165552.jpg`, ratio: 1.333 },
  { id: "living-8", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165613.jpg`, ratio: 1.333 },
  { id: "living-9", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165657.jpg`, ratio: 0.75 },
  { id: "living-10", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165733.jpg`, ratio: 0.75 },
  { id: "living-11", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165742.jpg`, ratio: 0.75 },
  { id: "living-12", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_165749.jpg`, ratio: 1.333 },
  { id: "living-13", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171336.jpg`, ratio: 1.333 },
  { id: "living-14", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171351.jpg`, ratio: 1.333 },
  { id: "living-15", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171407.jpg`, ratio: 1.333 },
  { id: "living-16", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171449.jpg`, ratio: 0.75 },
  { id: "living-17", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171504.jpg`, ratio: 1.333 },
  { id: "living-18", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171814.jpg`, ratio: 0.75 },
  { id: "living-19", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171826.jpg`, ratio: 1.333 },
  { id: "living-20", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171903.jpg`, ratio: 1.333 },
  { id: "living-21", category: "living", src: `${GALLERY_BASE}/hall-kitchen/img_20210714_171914.jpg`, ratio: 1.333 },
  { id: "living-22", category: "living", src: `${GALLERY_BASE}/hall-kitchen/slide11.jpg`, ratio: 1.333 },
  { id: "living-23", category: "living", src: `${GALLERY_BASE}/hall-kitchen/slide12.jpg`, ratio: 1.333 },
  { id: "living-24", category: "living", src: `${GALLERY_BASE}/hall-kitchen/slide13.jpg`, ratio: 1.333 },
  { id: "living-25", category: "living", src: `${GALLERY_BASE}/hall-kitchen/slide14.jpg`, ratio: 1.333 },
  { id: "living-26", category: "living", src: `${GALLERY_BASE}/hall-kitchen/slide15.jpg`, ratio: 1.333 },

  // Building entrance
  { id: "exterior-1", category: "exterior", src: `${GALLERY_BASE}/doors-hallway/img_20210714_170553.jpg`, ratio: 1.774 },
  { id: "exterior-2", category: "exterior", src: `${GALLERY_BASE}/doors-hallway/img_20210714_171127.jpg`, ratio: 0.75 },

  // Rethymno — nearby views
  { id: "view-1", category: "view", src: `${GALLERY_BASE}/other/img_20210714_171213.jpg`, ratio: 1.333 },
  { id: "view-2", category: "view", src: `${GALLERY_BASE}/other/img_20210714_203411.jpg`, ratio: 1.774, wide: true },
  { id: "view-3", category: "view", src: `${GALLERY_BASE}/other/img_20210714_203419.jpg`, ratio: 1.774 },
  { id: "view-4", category: "view", src: `${GALLERY_BASE}/other/img_20210714_203616.jpg`, ratio: 1.774 },
  { id: "view-5", category: "view", src: `${GALLERY_BASE}/other/img_20210714_203627.jpg`, ratio: 1.774, wide: true, featured: true },
  { id: "view-6", category: "view", src: `${GALLERY_BASE}/other/img_20210714_205323.jpg`, ratio: 1.774 },
];
