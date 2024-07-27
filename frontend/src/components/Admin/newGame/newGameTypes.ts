export interface Option {
  id: number;
  value: string;
}

export interface Category {
  id: number;
  name: string;
  options: Option[];
}

export interface Types {
  OS: Category[];
  processer: Category[];
  memory: Category[];
  graphics: Category[];
  storage: Category[];
}

export type TypesKeys = keyof Types;
