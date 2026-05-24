# About Page Documentation

The About page provides detailed information about the engineer, featuring a modern Bento Grid design, a chronological experience timeline, and dynamic SSG image optimization.

## Components Used

### `HeroBento`
- **Purpose**: A visually striking hero section combining the profile photo, name, title, bio, and social links.
- **Features**: Uses a Bento Grid layout (CSS Grid). Responsive design that collapses to a single column on mobile and expands to multiple columns on desktop. It uses `<ExportedImage>` for static image optimization.

### `InfoBento`
- **Purpose**: Displays detailed personal and professional information in grouped Bento boxes.
- **Features**: 
  - **Personal Details**: Birth date, nationality, marital status, and location.
  - **Skills & Languages**: Technical skills displayed as badges and languages displayed with percentage progress bars.
  - **Education & Memberships**: Academic background and professional affiliations.

### `ExperienceTimeline`
- **Purpose**: Displays work experience in a chronological timeline.
- **Features**: 
  - Vertical timeline layout with interactive design.
  - Includes role, place, period, and description.
  - **Image Carousel**: If an experience entry has multiple images, they are displayed in an interactive carousel with thumbnail navigation and next/prev controls, using `<ExportedImage>`.

## Data Source
- Uses `getAbout(locale)` from `lib/strapi.ts`.
- Deeply populates components: `?populate[photo]=true&populate[experience][populate][images]=true&populate[languages]=true`.
- Supports full localization (Arabic/English).

## SSG Image Optimization
- Images from Strapi are downloaded during the `prebuild` phase using `scripts/fetch-images.mjs`.
- All images are rendered using `next-image-export-optimizer` (`<ExportedImage>`) to ensure they are optimized and available in the `out/` folder for static hosting without requiring an active Next.js server.

## Routing
- Located at `app/[locale]/about/page.tsx`.
