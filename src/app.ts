import express from "express";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import path from "path";
import { engine } from "express-handlebars";
import { parse } from "node-html-parser";

import Parser from "rss-parser";

const app: express.Application = express();
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const parser = new XMLParser();
const rssParser: Parser = new Parser();

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("home");
});

app.get("/reddit", (req: express.Request, res: express.Response) => {
  res.render("reddit");
});

app.get(
  "/reddit/:subreddit",
  async (req: express.Request, res: express.Response) => {
    const { subreddit } = req.params;
    // const rawFeed = await axios(`http://www.reddit.com/r/${subreddit}/.rss`);
    // const feed = parser.parse(rawFeed.data);
    // const parsedFeed = feed.feed.entry.map((entry: any) => {
    //   const root = parse(entry.content);
    //   return {
    //     title: entry.title,
    //     content: root,
    //   };
    // });
    const feed = await rssParser.parseURL(
      `http://www.reddit.com/r/${subreddit}/.rss`,
    );
    console.log(feed);
    const parsedFeed: string[] = [];
    res.render("feed", {
      entries: parsedFeed,
    });
  },
);

app.get("/nytimes", async (req: express.Request, res: express.Response) => {
  const feed = await rssParser.parseURL(
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  );
  console.log(feed);
  res.render("nytimes");
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const reddit = {
//   title:
//     "I was going to just sell the cauliflowers but the game had other ideas 😂",
//   link: "https://www.reddit.com/r/StardewValley/comments/vee369/i_was_going_to_just_sell_the_cauliflowers_but_the/",
//   pubDate: "2022-06-17T14:10:47.000Z",
//   author: "/u/Crash_Master001",
//   content:
//     '<table> <tr><td> <a href="https://www.reddit.com/r/StardewValley/comments/vee369/i_was_going_to_just_sell_the_cauliflowers_but_the/"> <img src="https://preview.redd.it/m3tfoedqv6691.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=fd3100114f7b217ae9e68abc24708f0172dcddc9" alt="I was going to just sell the cauliflowers but the game had other ideas 😂" title="I was going to just sell the cauliflowers but the game had other ideas 😂" /> </a> </td><td> &#32; submitted by &#32; <a href="https://www.reddit.com/user/Crash_Master001"> /u/Crash_Master001 </a> <br/> <span><a href="https://i.redd.it/m3tfoedqv6691.jpg">[link]</a></span> &#32; <span><a href="https://www.reddit.com/r/StardewValley/comments/vee369/i_was_going_to_just_sell_the_cauliflowers_but_the/">[comments]</a></span> </td></tr></table>',
//   contentSnippet: "submitted by    /u/Crash_Master001  \n [link]   [comments]",
//   id: "t3_vee369",
//   isoDate: "2022-06-17T14:10:47.000Z",
// };
// const nyt = {
//   creator: "Carlos Aguilar",
//   title: "Cooper Raiff, Arriving Early to the Party",
//   link: "https://www.nytimes.com/2022/06/17/movies/cooper-raiff-cha-cha-real-smooth.html",
//   pubDate: "Fri, 17 Jun 2022 14:00:08 +0000",
//   "dc:creator": "Carlos Aguilar",
//   content:
//     "At 25, the indie writer, director and actor is making waves in Hollywood. His second feature, “Cha Cha Real Smooth,” could start a new career chapter.",
//   contentSnippet:
//     "At 25, the indie writer, director and actor is making waves in Hollywood. His second feature, “Cha Cha Real Smooth,” could start a new career chapter.",
//   guid: "https://www.nytimes.com/2022/06/17/movies/cooper-raiff-cha-cha-real-smooth.html",
//   categories: [Array],
//   isoDate: "2022-06-17T14:00:08.000Z",
// };
