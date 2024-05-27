export enum AppRoute {
  Root = "/braga",
  Shop = "/braga/shop",
  Blog = "/braga/blog",
  Cart = "/braga/cart",
  ProductPage = "/braga/shop/:id",
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
}
