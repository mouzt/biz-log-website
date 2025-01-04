import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_DIR = path.join(__dirname, '../public/cache');
const CACHE_FILE = path.join(CACHE_DIR, 'star-history.svg');
const STAR_HISTORY_URL = 'https://api.star-history.com/svg?repos=mouzt/mzt-biz-log&type=Date&theme=dark&width=800&height=300';

// 确保缓存目录存在
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// 下载图片
https.get(STAR_HISTORY_URL, (response) => {
    const file = fs.createWriteStream(CACHE_FILE);
    response.pipe(file);
    
    file.on('finish', () => {
        file.close();
        console.log('Star history chart updated successfully');
    });
}).on('error', (err) => {
    console.error('Error downloading star history chart:', err);
}); 