import express from "express";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";
import path from "path";
import { create } from "express-handlebars";

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
  const feed = parser.parse(rawFeed.data);
  // console.log(feed.feed.entry[0]);
  res.render("feed", {
    entries: feed.feed.entry,
  });
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
