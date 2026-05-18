import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const css = fs.readFileSync(
  path.join(root, 'dist/assets/index-BRFhIHLk.css'),
  'utf8'
);

const start = css.indexOf(':root{--browser-inner-width');
const end = css.lastIndexOf('@media(max-width:860px){.jb-virtual-page');
const tailEnd = css.indexOf('}', end + 200) + 1;
const slice =
  start >= 0 && end >= 0
    ? css.slice(start, tailEnd > start ? tailEnd : css.length)
    : '';

const fonts = `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Inter:wght@400;700;800;900&display=swap");

`;

fs.mkdirSync(path.join(root, 'src/styles'), { recursive: true });
fs.writeFileSync(path.join(root, 'src/styles/nlmcoaching.css'), fonts + slice);
console.log(`Wrote nlmcoaching.css (${(fonts + slice).length} bytes)`);
