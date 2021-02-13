export type AbstractDataModel<T> = {
  [P in keyof T]?: T[P];
};
