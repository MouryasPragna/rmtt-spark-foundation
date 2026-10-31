import { writeFileSync } from 'node:fs';
import { news } from '../src/data/news';
import { generateNewsRss } from '../src/lib/rss';

writeFileSync(new URL('../public/rss.xml', import.meta.url), generateNewsRss(news));