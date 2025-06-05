export type Links = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: any;
  path: string;
  per_page: number;
  to: number;
  total: number;
}