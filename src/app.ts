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
  console.log(feed.feed.entry[0]);
  // res.send(JSON.stringify(feed));
  res.render("feed", {
    title: feed.feed.entry[0].title,
    content: feed.feed.entry[0].content,
  });
});

app.listen(5001, () => console.log("Server running"));
