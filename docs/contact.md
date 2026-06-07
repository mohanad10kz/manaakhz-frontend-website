# Contact Page Documentation

The Contact page provides ways for users to get in touch with the engineer.

## Features

- **Two-Column Layout**: Left column for contact info (40%), right column for the contact form (60%).
- **Multiple Phone Numbers**: Displays all phone numbers from Strapi with their labels (Arabic/English).
- **Social Icons**: Shows WhatsApp, Facebook, YouTube icons with hover effects and dark mode support. Uses `SocialIcons.tsx` component.
- **Contact Form with Zod Validation**: Name, Subject, Message fields — all validated with Zod. Errors shown inline after blur.
- **WhatsApp Web Submit**: On valid submission, opens WhatsApp Web/app with pre-filled message.
- **Dark Mode**: All form fields, labels, and social icons are dark-mode compatible.
- **Localization**: Location text switches between Arabic and English based on locale.
- **Decorative SVG**: Circuit pattern SVG in the bottom of the left column.

## Components

- `components/contact/ContactForm.tsx` — Client component with Zod validation + WhatsApp submit
- `components/contact/SocialIcons.tsx` — Renders social links with SVG icons

## Data Source

- Uses `getContactInfo(locale)` from `lib/strapi.ts`.
- Strapi endpoint: `/api/contact-info?populate[phones]=*&populate[social_links]=*`

## Strapi Schema

- **Contact Info** (Single Type) fields:
  - `email` (email)
  - `whatsapp_number` (string, required) — format: `218925337531` (no + or spaces)
  - `location_ar` / `location_en` (string)
  - `phones` (component: `contact.phone`, repeatable)
  - `social_links` (component: `contact.social-link`, repeatable)

- **contact.phone** component: `number`, `label_ar`, `label_en`
- **contact.social-link** component: `platform` (enum: whatsapp/facebook/youtube), `url`, `label`

## WhatsApp Message Format

```
الاسم: [name]
الموضوع: [subject]

الرسالة:
[message]
```

## Routing

- Located at `app/[locale]/contact/page.tsx`.

## Seed Script

- `backend/scripts/seed-contact.mjs` — Seeds ContactInfo with phones and social links
- Run: `node backend/scripts/seed-contact.mjs`
- Requires: `STRAPI_SEED_TOKEN` in `.env`
