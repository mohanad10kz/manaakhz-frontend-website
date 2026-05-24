# Contact Page Documentation

The Contact page provides ways for users to get in touch with the engineer.

## Features

- **Cards Layout**: Uses a grid of three shadcn `Card` components to display Email, Phone, and Location.
- **Icons**: Uses `lucide-react` icons (`Mail`, `Phone`, `MapPin`) within styled circular backgrounds for a clean look.
- **Interactive Links**: Email and Phone numbers are clickable (`mailto:` and `tel:` links respectively).
- **Localization**: Uses `getTranslations` from `next-intl/server` to fetch translations directly in the Server Component. Location text automatically switches between Arabic and English.

## Data Source
- Uses `mockContactInfo` from `lib/mock-data.ts`.

## Routing
- Located at `app/[locale]/contact/page.tsx`.
