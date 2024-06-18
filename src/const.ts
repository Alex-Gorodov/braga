export enum AppRoute {
  Root = "/braga",
  Shop = "/braga/shop",
  Blog = "/braga/blog",
  Cart = "/braga/cart",
  Login = "/braga/login",
  ProductPage = "/braga/shop/:id",
  UserPage = "/braga/user/:id",
  AdminPage = "/braga/admin"
}

export enum ScreenSizes {
  Mobile = 490,
  Tablet = 768,
  Desktop = 1280,
  ContainerMaxWidth = 1440
}

export enum APIRoute {
  Beers = "braga-db/beers",
  Users = "braga-db/users",
  Login = 'braga-db/login',
  Logout = 'braga-db/logout',
  Guests = 'braga-db/guests',
  Subscribers = 'braga-db/subscribers',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum ErrorMessages {
  AuthError = 'Invalid username or password. Please try again.',
  EmailError = 'Please enter correct e-mail.',
  PasswordError = 'Password must have at least one letter, one number, and be 8+ characters long.',
  CommentError = 'Error! Can\'t add review, please, try again.',
  PreOrderError = 'Please sign in or register to add items to your preorder.',
  NotificationError = 'Please sign in or register to add items to get notification.',
  GuestNotificationError = 'Please enter either a phone number or an email address.',
  RegisterPasswordNotMatch = 'Passwords do not match',
  RegisterEmptyFields = 'Fill the required fields, please.'
}

export enum SuccessMessages {
  AddToCart = "Item successfully added to your cart!",
  AddToPreOrder = "Item successfully added to your pre-order list!"
}

export enum ItemInfo {
  Description = "Description",
  Additional = "Additional information",
  Reviews = "Reviews",
}

export const SHOP_SORTING = [
  {name: "default", value: "Default sorting"}, //no sorting
  {name: "popular", value: "Sort by popularity"}, // sorting by reviews count
  {name: "rating", value: "Sort by rating"}, // sorting by reviews rating
  {name: "newest", value: "Sort by latest"},
  {name: "price", value: "Sort by price: high to low"},
  {name: "price reverse", value: "Sort by price: low to high"},
]

export enum SortingNames {
  Default = "default",
  Popular = "popular",
  Rating = "rating",
  Newest = "newest",
  Price = "price",
  PriceReverse = "price reverse",
}

export const REVIEW_STARS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'terribly' },
  { value: 1, title: 'badly' },
];

export enum StockEmojis {
  NotInStock = '128553',
  LessThenTen = '128556',
  LessThenTwenty = '128523',
  OnStock = '129321',
}
