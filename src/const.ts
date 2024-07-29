export enum ErrorMessages {
  PasswordError = 'Password must have at least one letter, one number, and be 8+ characters long.',
  NotificationError = 'Please sign in or register to add items to get notification.',
  GuestNotificationError = 'Please enter either a phone number or an email address.',
  PreOrderError = 'Please sign in or register to add items to your pre-order list.',
  AddingToCartError = "Please login or register to add item to cart.",
  AuthError = 'Invalid username or password. Please try again.',
  CommentError = 'Error! Can\'t add review, please, try again.',
  RegisterEmptyFields = 'Fill the required fields, please.',
  RegisterPasswordNotMatch = 'Passwords do not match',
  SubscriptionError = 'Please enter the valid e-mail.',
  EmailError = 'Please enter correct e-mail.',
  LimitError = 'Maximum stock for this item reached.',
  LikeError = "Please sign in or register to like this post."
}

export enum SuccessMessages {
  AddToPreOrder = "Item successfully added to your pre-order list!",
  AddToCart = "Item successfully added to your cart!",
  Subscription = "Thank You for Subscribing!",
  CopiedToClipboard = "Copied to clipboard!",
}

export const SHOP_SORTING = [
  {name: "price reverse", value: "price: low to high"},
  {name: "price", value: "price: high to low"},
  {name: "popular", value: "popularity"},
  {name: "default", value: "default"},
  {name: "rating", value: "rating"},
  {name: "newest", value: "latest"},
]

export enum AppRoute {
  ProductPage = "/braga/shop/:id",
  UserPage = "/braga/user/:id",
  PostPage = "/braga/blog/:id",
  AdminPage = "/braga/admin",
  Login = "/braga/login",
  Cart = "/braga/cart",
  Shop = "/braga/shop",
  Blog = "/braga/blog",
  Root = "/braga",
}

export enum APIRoute {
  Subscribers = 'braga-db/subscribers',
  Logout = 'braga-db/logout',
  Guests = 'braga-db/guests',
  Beers = "braga-db/beers",
  Users = "braga-db/users",
  Login = 'braga-db/login',
  Blog = 'braga-db/blog',
}

export enum ItemInfo {
  Additional = "Additional information",
  Description = "Description",
  Reviews = "Reviews",
}

export enum BeerStatus {
  Unavailable = "Unavailable",
  Fermentation = "Fermentation",
  Maturation = "Maturation",
  Brewing = "Brewing",
  Ready = "Ready",
}

export const BeerStatusColor = {
  Fermentation: ["#e7c942", "#000000"],
  Maturation: ["#258815", "#ffffff"]
}

export const REVIEW_STARS = [
  { value: 2, title: 'terribly' },
  { value: 3, title: 'not bad' },
  { value: 5, title: 'perfect' },
  { value: 1, title: 'badly' },
  { value: 4, title: 'good' },
];

export enum StockEmojis {
  LessThenTwenty = '128523',
  LessThenTen = '128556',
  NotInStock = '128553',
  OnStock = '129321',
}

export enum SortingNames {
  PriceReverse = "price reverse",
  Default = "default",
  Popular = "popular",
  Rating = "rating",
  Newest = "newest",
  Price = "price",
}

export enum AuthorizationStatus {
  Unknown = 'UNKNOWN',
  NoAuth = 'NO_AUTH',
  Auth = 'AUTH',
}

export enum ScreenSizes {
  ContainerMaxWidth = 1440,
  Desktop = 1280,
  Mobile = 490,
  Tablet = 768,
}
