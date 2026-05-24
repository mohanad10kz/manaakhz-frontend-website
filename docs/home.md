# Home Page Documentation

The Home page serves as the entry point to `manaakhz.com` and provides a quick overview of the engineer's profile, latest designs, and blog posts.

## Components Used

### `HeroSection`
- **Purpose**: A visually striking hero area introducing the user.
- **Features**: 
  - Dynamic gradient background using `primary/5` and `secondary/5` colors for a premium feel.
  - Large, bold typography.
  - Call-to-action button directing to the Designs page.
  - Arrow icon that flips direction based on the current locale (RTL/LTR).

### `SectionsPreview`
- **Purpose**: Displays a glimpse of the latest content.
- **Features**:
  - Fetches the first 3 items from `mockDesigns` and `mockPosts`.
  - Uses shadcn `Card` and `Badge` components.
  - Images have a hover scale effect `group-hover:scale-105` for a dynamic feel.
  - Automatically switches content (Arabic/English) based on the locale prop.

## Routing
- Located at `app/[locale]/page.tsx`.
- Uses Server Components where possible, passing `locale` as a prop to Client or Server components as needed.
