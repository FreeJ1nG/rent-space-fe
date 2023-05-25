declare interface ApiParam<T = void> {
  accessToken?: string;
  payload?: T;
}

declare interface User {
  email: string;
  firstname: string;
  lastname: string;
}
