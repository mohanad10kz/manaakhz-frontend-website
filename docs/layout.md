# Layout Documentation

The shared layout for `manaakhz.com` acts as the primary shell for all pages across the application.

## Components

- **`Header`**: A sticky top navigation bar.
- **`Navbar`**: Responsive navigation links. Uses standard links on desktop, and a shadcn `Sheet` drawer for mobile devices.
- **`ThemeToggle`**: Switches between dark and light modes. Uses `next-themes`.
- **`LanguageSwitcher`**: Toggles between Arabic (`/ar`) and English (`/en`) routes using `next-intl`.
- **`Footer`**: Simple bottom section with copyright text and social links populated from `mockContactInfo`.

## Architecture

- The root layout is located at `app/[locale]/layout.tsx` to support `next-intl` static export requirements without middleware.
- `NextIntlClientProvider` wraps the application to provide translations to Client Components.
- The layout automatically sets the `dir` attribute on the `<html>` element based on the current locale, enabling seamless Right-To-Left (RTL) support for Arabic.
- **Fonts**: Cairo is loaded for Arabic text, and Playfair Display + Source Serif 4 are loaded for English text.
