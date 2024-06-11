export enum AppRoute {
  Root = "/braga",
  Shop = "/braga/shop",
  Blog = "/braga/blog",
  Cart = "/braga/cart",
  Login = "/braga/login",
  ProductPage = "/braga/shop/:id",
  UserPage = "/braga/user/:id"
}

export enum ScreenSizes {
  Mobile = 490,
  Tablet = 768,
  Desktop = 1280,
  ContainerMaxWidth = 1250
}

export enum APIRoute {
  Beers = "braga-db/beers",
  Users = "braga-db/users",
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

export enum SuccessMessage {
  AddToCart = "Item successfully added to your cart!",
  AddToPreOrder = "Item successfully added to your pre-order list!"
}

export enum ItemInfo {
  Description = "Description",
  Additional = "Additional information",
  Reviews = "Reviews",
}

export const REVIEW_STARS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'terribly' },
  { value: 1, title: 'badly' },
];
