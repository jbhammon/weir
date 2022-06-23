export interface Feed {
  label: string;
  feedUrl: string;
  pageUrl: string;
}

export interface FeedSection {
  label: string;
  feeds: Feed[];
}
