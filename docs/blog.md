# Blog Page Documentation

The Blog page lists articles and thoughts on electronics, design, and technology.

## Components Used

### `PostList`
- **Purpose**: Displays a grid layout of `PostCard` components.
- **Features**: Responsive grid, localized title and description.

### `PostCard`
- **Purpose**: A card representing a single blog post.
- **Features**: Uses a shadcn `Card`. Displays the date, localized title, excerpt, and tags. Includes a "Read More" link.

## Dynamic Routes
- **`/blog`**: The main listing page. Uses `PostList` populated by `mockPosts`.
- **`/blog/[slug]`**: The detail page for a specific post.
  - **Static Generation**: Uses `generateStaticParams` to pre-build routes for all posts in `mockPosts`.
  - **Features**: "Back to Blog" link, title, date, tags, and the main content.

## Data Source
- Uses `mockPosts` and `getPostBySlug` from `lib/mock-data.ts`.
