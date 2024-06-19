[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

# esteban.io

This repository contains the code for my personal portfolio site, built with various modern technologies to showcase my work and projects.

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://vercel.com/postgres)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/echirinos/esteban-portfolio-v2.git
cd esteban-portfolio-v2
bun install
bun run setup # Remove all of my personal information
bun dev
```

Create a `.env.local` file similar to [`.env.example`](https://github.com/leerob/leerob.io/blob/main/.env.example).

## Database Schema

```sql
CREATE TABLE redirects (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  permanent BOOLEAN NOT NULL
);

CREATE TABLE guestbook (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP
);

CREATE TABLE views (
  slug VARCHAR(255) PRIMARY KEY,
  count INT NOT NULL
);
```

## Credits

This portfolio was inspired by the work of [Lee Robinson](https://leerob.io/). You can find his original repository [here](https://github.com/leerob/leerob.io/tree/main).

## License

1. You are free to use this code as inspiration.
2. Please do not copy it directly.
3. Crediting the author is appreciated.

Please remove all of my personal information (blog posts, images, etc.) by running `bun run setup`.
