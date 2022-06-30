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
  {
    label: "YouTube",
    feeds: [
      {
        label: "Dunkey",
        feedUrl:
          "https://www.youtube.com/feeds/videos.xml?channel_id=UCsvn_Po0SmunchJYOWpOxMg",
        pageUrl: "/yt/dunkey",
      },
      {
        label: "Dessert Person",
        feedUrl:
          "https://www.youtube.com/feeds/videos.xml?channel_id=UCvw6Y1kr_8bp6B5m1dqNyiw",
        pageUrl: "/yt/dessert-person",
      },
    ],
  },
];
