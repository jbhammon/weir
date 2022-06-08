import express from "express";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import path from "path";
import { engine } from "express-handlebars";
import { parse } from "node-html-parser";

const app: express.Application = express();
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const parser = new XMLParser();

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
    const rawFeed = await axios(`http://www.reddit.com/r/${subreddit}/.rss`);
    const feed = parser.parse(rawFeed.data);
    const parsedFeed = feed.feed.entry.map((entry: any) => {
      const root = parse(entry.content);
      return {
        title: entry.title,
        content: root,
      };
    });
    res.render("feed", {
      entries: parsedFeed,
    });
  },
);

app.get("/nytimes", async (req: express.Request, res: express.Response) => {
  const rawFeed = await axios(
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  );
  console.log(rawFeed.data);
  const feed = parser.parse(rawFeed.data);
  console.log(feed);
  res.render("nytimes");
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
