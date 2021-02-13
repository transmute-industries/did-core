import fs from 'fs';
import path from 'path';

export const yaml = {
  example0: fs
    .readFileSync(path.resolve(__dirname, './example-0.yml'))
    .toString(),
  example1: fs
    .readFileSync(path.resolve(__dirname, './example-1.yml'))
    .toString(),
  example2: fs
    .readFileSync(path.resolve(__dirname, './example-2.yml'))
    .toString(),
};
