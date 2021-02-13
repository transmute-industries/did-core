import fs from 'fs';
import path from 'path';

export const cbor = {
  example1: fs.readFileSync(path.resolve(__dirname, './example-1.cbor')),
  example2: fs.readFileSync(path.resolve(__dirname, './example-2.cbor')),
};
