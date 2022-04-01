import express from "express";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import path from "path";
import { create } from "express-handlebars";
import { parse } from "node-html-parser";

const app: express.Application = express();
const hbs = create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

const parser = new XMLParser();

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("home");
});

app.get("/feed", async (req: Express.Request, res: express.Response) => {
  const rawFeed = await axios("http://www.reddit.com/.rss");
  console.log(rawFeed.data);
  const feed = parser.parse(rawFeed.data);
  const parsedFeed = feed.feed.entry.map((entry: any) => {
    const root = parse(entry.content);
    console.log("================");
    console.log(root.toString());
    console.log("================");
    // if a post has an image, there's a table
    // otherwise, there is just some divs and spans
    return {
      title: entry.title,
      content: root,
    };
  });
  res.render("feed", {
    entries: parsedFeed,
  });
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
