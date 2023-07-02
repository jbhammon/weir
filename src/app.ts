import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import Parser from "rss-parser";
import helmet from "helmet";

import { config } from "./config";

const app: express.Application = express();

// Basic security measures
app.use(helmet());
app.disable("x-powered-by");

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static(path.join(__dirname, "public")));

const rssParser: Parser = new Parser();

app.get("/", (req: express.Request, res: express.Response) => {
  res.render("home", {
    config: config,
  });
});

config.forEach((section) => {
  section.feeds.forEach((feedConfig) => {
    app.get(
      feedConfig.pageUrl,
      async (req: express.Request, res: express.Response) => {
        try {
          const feed = await rssParser.parseURL(feedConfig.feedUrl);
          res.render("feed", {
            entries: feed.items,
            title: feed.title,
          });
        } catch (error) {
          console.log(`Error getting ${feedConfig.label} feed: `, error);
          res.render("error", {
            title: feedConfig.label,
          });
        }
      },
    );
  });
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
