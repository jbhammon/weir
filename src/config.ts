import { FeedSection } from "./types/weir";

export const config: FeedSection[] = [
  {
    label: "News",
    feeds: [
      {
        label: "New York Times",
        feedUrl: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
        pageUrl: "/nytimes",
      },
      {
        label: "New York Times: World",
        feedUrl: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
        pageUrl: "/nytimes-world",
      },
    ],
  },
  {
    label: "Reddit",
    feeds: [
      {
        label: "Stardew Valley",
        feedUrl: "http://www.reddit.com/r/StardewValley/.rss",
        pageUrl: "/reddit/stardew-valley",
      },
    ],
  },
];
