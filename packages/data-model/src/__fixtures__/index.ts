import fs from 'fs';
import path from 'path';

export const json = {
  example1: require('./did-json/example-1.json'),
  example2: require('./did-json/example-2.json'),
};

export const yaml = {
  example0: fs
    .readFileSync(path.resolve(__dirname, './did-yaml/example-0.yml'))
    .toString(),
  example1: fs
    .readFileSync(path.resolve(__dirname, './did-yaml/example-1.yml'))
    .toString(),
  example2: fs
    .readFileSync(path.resolve(__dirname, './did-yaml/example-2.yml'))
    .toString(),
};
