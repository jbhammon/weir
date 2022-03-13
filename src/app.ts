import express from "express";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";

const app: express.Application = express();

const parser = new XMLParser();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello!");
});

app.get("/feed", async (req: Express.Request, res: express.Response) => {
  const rawFeed = await axios("http://www.reddit.com/.rss");
  const feed = parser.parse(rawFeed.data);
  console.log(feed.feed.entry[0]);
  res.send(JSON.stringify(feed));
});

app.listen(5001, () => console.log("Server running"));
