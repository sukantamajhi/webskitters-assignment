export interface user {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  enabled?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

export interface header {
  authorization?: string;
}

export interface request {
  user?: user;
  query?: any;
  params?: any;
  body?: any;
  headers: header;
  files?: any;
  status: Function;
}