import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { XMLParser } from 'fast-xml-parser';
import axios from 'axios';

const parser = new XMLParser();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  root(): { message: string } {
    return { message: 'Hello Ypsilanti!' };
  }

  @Get('feed/:id')
  @Render('list')
  async feed() {
    const res = await axios('http://www.reddit.com/.rss');
    const feed = parser.parse(res.data);
    console.log(feed.feed.entry[0]);
    return { feed: JSON.stringify(feed) };
  }
}
