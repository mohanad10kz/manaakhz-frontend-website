# About Page Documentation

The About page provides detailed information about the engineer, including their biography, skills, work experience timeline, and contact links.

## Components Used

### `ProfileCard`
- **Purpose**: Displays the profile photo, name, title, and social links.
- **Features**: Circular image with a gold border, automatically localized name and title.

### `InfoGrid`
- **Purpose**: Displays basic personal information.
- **Features**: 2x2 grid (desktop) displaying Birth Date, Nationality, Education, and Marital Status with Lucide icons.

### `SkillsTags`
- **Purpose**: Displays technical skills.
- **Features**: Alternating gold and green colors for each skill pill.

### `MembershipsList`
- **Purpose**: Lists professional memberships.
- **Features**: Subtle green background with gold checkmarks.

### `ExperienceTimeline`
- **Purpose**: Displays work experience in a chronological timeline.
- **Features**: Vertical line layout with alternating sides (on desktop). Includes role, place, period, description, and thumbnail image.

## Data Source
- Uses `getAbout(locale)` from `lib/strapi.ts`, utilizing the robust `WorkExperience` data type.

## Routing
- Located at `app/[locale]/about/page.tsx`.
