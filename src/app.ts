import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import Parser from "rss-parser";

import { config } from "./config";

const app: express.Application = express();
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const rssParser: Parser = new Parser();

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("home", {
    config: config,
  });
});

app.get("/reddit", (req: express.Request, res: express.Response) => {
  res.render("reddit");
});

config.forEach((section) => {
  section.feeds.forEach((feedConfig) => {
    app.get(
      feedConfig.pageUrl,
      async (req: express.Request, res: express.Response) => {
        const feed = await rssParser.parseURL(feedConfig.feedUrl);
        res.render("feed", {
          entries: feed.items,
          title: feed.title,
        });
      },
    );
  });
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
