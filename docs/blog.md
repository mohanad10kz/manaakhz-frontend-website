# Blog Page Documentation

The Blog page lists articles and thoughts on electronics, design, and technology.

## Components Used

### `PostList`
- **Purpose**: Displays a grid layout of `PostCard` components.
- **Features**: Responsive grid, localized title and description.

### `PostCard`
- **Purpose**: A card representing a single blog post.
- **Features**: Uses a shadcn `Card`. Displays the date, localized title, excerpt, and tags. Includes a "Read More" link.

### `RichTextRenderer`
- **Purpose**: A client-side helper component (`components/shared/RichTextRenderer.tsx`) that sanitizes and renders rich HTML safely.
- **Features**:
  - Uses `DOMPurify` to clean HTML against XSS vectors.
  - Supports automatic LTR/RTL text direction (`dir` attribute).
  - Uses Tailwind CSS v4 `@plugin "@tailwindcss/typography"` (`prose` class) with Cairo font and gold heading themes for premium Arabic typography styling.

## Dynamic Routes
- **`/blog`**: The main listing page.
- **`/blog/[slug]`**: The detail page for a specific post.
  - **Static Generation**: Uses `generateStaticParams` to pre-build routes for all posts fetched from Strapi.
  - **Rich HTML Rendering**: Uses `<RichTextRenderer>` to display the `content_ar` or `content_en` parsed from Strapi CKEditor fields.
  - **Layout & Structure**: Custom sticky image layout, custom Cairo fonts, localized tags, and a "Other Articles" link.

## Data Source
- Uses `getAllPosts(locale)` and `getPostBySlug(slug, locale)` from `lib/strapi.ts`.
- **Content Fields (`content_ar`, `content_en`)**: Managed via Strapi 5's community CKEditor plugin (`plugin::ckeditor.CKEditor` custom field) that outputs standardized HTML instead of raw Markdown.

