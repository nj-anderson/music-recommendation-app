## About the Project

Music Discovery is a full-stack music recommendation web application using Next.js, React, and TypeScript. The application allows users to search for a song, select it, and receive recommendations based on audio features such as energy, danceability, valence, BPM, key, mode, and genre. I implemented the search and recommendation functionality through API routes so that the large song dataset remains on the server rather than being loaded into the client. I also integrated the iTunes Search API to retrieve album artwork and audio preview clips for songs displayed in the application.

For the recommendation system, I created a similarity algorithm that compares the selected song against songs in the dataset and assigns each song a similarity score based on the differences between their audio features. Songs with the lowest scores are considered the most similar and are returned as recommendations. I also created a reusable Song TypeScript type to define the properties shared across the dataset and application.

The project uses a large Spotify song dataset that was converted from CSV to JSON and processed to remove duplicate songs. The primary resources for continuing development are the project GitHub repository, the dataset files in `src/data`, the recommendation logic in  `src/lib/recommend.ts`, and the API routes in `src/app/api`. Future work should focus on improving the quality and diversity of the dataset, particularly reducing irrelevant/non-English songs and improving coverage of newer music and genres such as hip-hop and rap. Additionally, not all songs consistently return album artwork or audio previews from the iTunes API, so improving the reliability of these results or finding an alternative source for missing artwork and previews would be useful. Finally, it would be great if the application had some sort of explanation to the user as to why the recommendation results were recommended.



## Getting Started
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
