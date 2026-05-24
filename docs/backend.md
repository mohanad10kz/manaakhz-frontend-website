# Backend Documentation (Strapi 5)

## Overview
This backend powers the Manaa Electronics (manaakhz) website using Strapi 5.

## Starting the Server
Navigate to the `backend` directory and run the following command to start the Strapi server in development mode:
```bash
cd backend
npm run develop
```
The server will start on `http://localhost:1337`.
The Strapi Admin UI is available at `http://localhost:1337/admin`.

## Content Types Created

1. **About** (Single Type)
   - `name`: Short Text
   - `title_ar`: Short Text
   - `title_en`: Short Text
   - `bio_ar`: Long Text
   - `bio_en`: Long Text
   - `birth_date`: Date
   - `nationality`: Short Text
   - `skills`: JSON
   - `photo`: Media (single)

2. **Design** (Collection Type)
   - `title_ar`: Short Text
   - `title_en`: Short Text
   - `description_ar`: Long Text
   - `description_en`: Long Text
   - `slug`: UID (from title_ar)
   - `category`: Enumeration [power, arduino, basic, other]
   - `date`: Date
   - `images`: Media (multiple)

3. **Post** (Collection Type)
   - `title_ar`: Short Text
   - `title_en`: Short Text
   - `content_ar`: Rich Text
   - `content_en`: Rich Text
   - `slug`: UID (from title_ar)
   - `date`: Date
   - `tags`: Short Text
   - `images`: Media (multiple)

4. **ContactInfo** (Single Type)
   - `email`: Email
   - `phone`: Short Text
   - `location_ar`: Short Text
   - `location_en`: Short Text

5. **SocialLink** (Collection Type)
   - `platform`: Enumeration [twitter, linkedin, github, instagram]
   - `url`: Short Text
   - `label`: Short Text

## API Access & CORS
- CORS has been configured in `config/middlewares.ts` to explicitly allow origins from the Next.js frontend (`http://localhost:3000`).
- **IMPORTANT**: To allow the frontend to fetch data from the API, you must log into the Strapi Admin UI and enable the `find` and `findOne` permissions for the Public role under Settings > Roles > Public.

## Frontend Integration
The Next.js frontend fetches data using the Strapi REST API via `frontend/lib/strapi.ts`.
To authenticate requests, the frontend uses an API token.
1. Generate an API token in the Strapi Admin UI (Settings > API Tokens) with read-only access.
2. Add this token to the `frontend/.env.local` file:
   `STRAPI_API_TOKEN=your_token_here`
