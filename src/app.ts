import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import Parser from "rss-parser";

const app: express.Application = express();
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

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
    const feed = await rssParser.parseURL(
      `http://www.reddit.com/r/${subreddit}/.rss`,
    );
    res.render("feed", {
      entries: feed.items,
    });
  },
);

app.get("/nytimes", async (req: express.Request, res: express.Response) => {
  const feed = await rssParser.parseURL(
    "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  );
  res.render("feed", {
    entries: feed.items,
  });
});

const PORT = process.env.APP_PORT ?? 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
