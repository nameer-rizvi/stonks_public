import Head from "next/head";
import { google } from "../constants";

const constants = {
  title: "wsb_portfolio.csv",
  description: "Stonks only go up. Double-D's from r/wallstreetbets.",
  img: "https://stonks.vercel.app/stonks.png",
  url: "https://stonks.vercel.app/",
};

const HTMLHead = () => (
  <Head>
    <link rel="icon" href="/favicon.ico" />
    <title>{constants.title}</title>
    <meta name="title" content={constants.title} />
    <meta name="description" content={constants.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={constants.url} />
    <meta property="og:title" content={constants.title} />
    <meta property="og:description" content={constants.description} />
    <meta property="og:image" content={constants.img} />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={constants.url} />
    <meta property="twitter:title" content={constants.title} />
    <meta property="twitter:description" content={constants.description} />
    <meta property="twitter:image" content={constants.img} />
    <script async src={google.tagManager.src} />
  </Head>
);

export default HTMLHead;
