export enum AppRoute {
  Root = "/braga",
  Shop = "/shop",
  Blog = "/blog",
  Cart = "/cart",
  Login = "/login",
  ProductPage = "/shop/:id",
}

export enum ScreenSizes {
  Mobile = 430,
  MobileOnly = 768,
  Tablet = 1024,
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
