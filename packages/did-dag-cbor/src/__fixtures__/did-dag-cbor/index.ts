import fs from 'fs';
import path from 'path';

export const dagCbor = {
  example1: fs.readFileSync(path.resolve(__dirname, './example-1.dag-cbor')),
  example2: fs.readFileSync(path.resolve(__dirname, './example-2.dag-cbor')),
};
