export enum AppRoute {
  Root = "/braga",
  Shop = "/braga/shop",
  Blog = "/braga/blog",
  Cart = "/braga/cart",
  Login = "/braga/login",
  ProductPage = "/braga/shop/:id",
}

export enum ScreenSizes {
  Mobile = 490,
  Tablet = 768,
  Desktop = 1280,
  ContainerMaxWidth = 1250
}

export enum APIRoute {
  Beers = "braga-db/beers",
  Cart = "braga-db/cart",
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ErrorMessage {
  EmailError = 'Please enter correct e-mail',
  PasswordError = 'Please enter at least one letter and one number',
  CommentError = 'Error! Can\'t add review, please, try again',
}
