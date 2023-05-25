declare namespace AuthFeature {
  interface LoginResponse {
    token: string;
  }
  interface LoginParam {
    email: string;
    password: string;
  }
  interface RegisterResponse {
    token: string;
  }
  interface RegisterParam {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }
}
