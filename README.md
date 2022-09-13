## 🎴 NFT Collection 

<p align="left">
  <img width="70%" src="https://i.ibb.co/sj5vQzZ/Screenshot-2022-09-14-011254.png">
</p>

This app shows the NFTs **user owns** and **all other available** NFTs on the **Learn Web 3 DAO** and **Buildspace** collection from Opensea.

> 💡 Works on Polygon Mainnet only.
> 

## ⚔️ Features

- Fetch NFTs owned by the user.
- Fetch all available NFTs in the mentioned collection.
- Pagination (Initial limit is 20 NFTs, user can see next 20 NFTs by clicking on **show more**).
- Detect current Network and show a warning when not connected to the mentioned network.
- Users can share owned NFTs on Social platforms such as Twitter, LinkedIn, Reddit, and WhatsApp.
- Can redirect to a particular NFT page on OpenSea
- Connect Metamask wallet
- Light and Dark mode
- Responsive

## 🛣️ Approach

There are two approaches in this app, first approach is on the **Main** branch, the second approach is on **api-approach** branch

> 1) API handlers inside Next.js client side
> 
- Dynamic fetch functions that take user addresses, collection addresses, and page keys (for pagination), present in **utils/fetchApi.ts**, can be used for fetching multiple NFTs collections.

- A central store in **pages/index.tsx**, which controls fetching and state management for all components.

> 2) Serverless API routes inside Next.js API folder
> 
- Serverless API routes for fetching NFTs (User, Collections)

- Pagination supported

## ⏳ Challanges 
Here are some challanges I faced during development of this app
- I wanted to implement pagination feature for both user nfts and collection nfts, but it was a little tricky since Alchemy API sends a page-key in string for a next page, and when it's the last page the page-key is undefined. So it was fun but a little time consuming to mutate the NFT Objects to support this feature

- Programming a concise Dynamic function that serves both as Initial fetching function and pagination function.

- Working with types in TypeScript was also a little time consuming, but in the end it gave a better structure to the codebase with less chances of bugs and unexpected results.

## ⚙️ Tech Stack

- Next.js with TypeScript
- Alchemy API (To fetch from OpenSea)
- Thirdweb (To Connect wallet and detect network)
- Tailwind

## 🔗 Website Link

> https://nft-collection-learnweb.vercel.app/



## Deployment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
