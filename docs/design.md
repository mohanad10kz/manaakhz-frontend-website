# Design Page Documentation

The Design page showcases a collection of electronic circuit designs and PCBs.

## Components Used

### `DesignGrid`
- **Purpose**: Displays a grid layout of `DesignCard` components.
- **Features**: Responsive layout (1 column on mobile, up to 3 on desktop), localized title and description.

### `DesignCard`
- **Purpose**: A visually appealing card representing a single design project.
- **Features**: Uses a shadcn `Card` with hover effects. Displays the category badge, date, localized title, and an excerpt of the description. Links to the detail page.

## Dynamic Routes
- **`/design`**: The main listing page. Uses `DesignGrid` populated by `mockDesigns`.
- **`/design/[slug]`**: The detail page for a specific design. 
  - **Static Generation**: Uses `generateStaticParams` to pre-build routes for all designs in `mockDesigns`.
  - **Features**: Includes a "Back" button with a localized arrow icon, a large hero image, and the full description text.

## Data Source
- Uses `mockDesigns` and `getDesignBySlug` from `lib/mock-data.ts`.
