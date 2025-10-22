import fs from 'fs';
import https from 'https';
import path from 'path';

const url = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
const outDir = path.resolve(process.cwd(), 'public', 'libs');
const outFile = path.join(outDir, 'face-api.min.js');

async function download() {
  try {
    await fs.promises.mkdir(outDir, { recursive: true });
    const file = fs.createWriteStream(outFile);
    console.log('Downloading face-api.js ->', outFile);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error('Failed to download, status', res.statusCode);
        process.exit(1);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded face-api.min.js');
      });
    }).on('error', (err) => {
      fs.unlink(outFile, () => {});
      console.error('Download error', err.message);
      process.exit(1);
    });
  } catch (err) {
    console.error('Error', err);
    process.exit(1);
  }
}

download();
