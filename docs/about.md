# About Page Documentation

The About page provides detailed information about the engineer, including their biography, skills, and contact links.

## Components Used

### `BiographyCard`
- **Purpose**: Displays a comprehensive profile card.
- **Features**:
  - A two-column layout on desktop (image on one side, details on the other).
  - Automatically switches biography text (Arabic/English) based on the locale prop.
  - Lists skills using shadcn `Badge` components.
  - Displays birth date, nationality, and social links using `lucide-react` icons.

## Data Source
- Uses `mockAbout` from `lib/mock-data.ts`.

## Routing
- Located at `app/[locale]/about/page.tsx`.
