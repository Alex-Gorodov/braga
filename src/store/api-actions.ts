import { loadBeers, loadBlogPosts, loadGuests, loadSubscribers, loadUsers, requireAuthorization, setBeerBrewingDate, setBeersDataLoadingStatus, setBlogPostsDataLoadingStatus, setGuestsDataLoadingStatus, setSubscribersDataLoadingStatus, setUserInformation, setUsersDataLoadingStatus } from "./actions";
import { removeUserFromLocalStorage, saveToken } from "../services/token";
import { ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { removeUser, setUser } from "./slices/user-slice";
import { APIRoute, AuthorizationStatus, BeerStatus } from "../const";
import { UserAuthData } from "../types/user-auth-data";
import { Guest, Subscriber } from "../types/guest";
import { Beer, BeerInCart } from "../types/beer";
import { database } from "../services/database";
import { AuthData } from "../types/auth-data";
import { AppDispatch } from "../types/state";
import { RootState } from "./root-reducer";
import { Review } from "../types/review";
import { AxiosInstance } from "axios";
import { User } from "../types/user";
import { Post } from "../types/post";

export type ThunkOptions = {
  dispatch: ThunkDispatch<RootState, AxiosInstance, any>;
  state: RootState;
  extra: AxiosInstance;
};

export const fetchBeersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchItems', async (_arg, { dispatch }) => {
    try {
      dispatch(setBeersDataLoadingStatus({ isBeersDataLoading: true }));

      const data = (await database.ref(APIRoute.Beers).once("value")).val();

      const itemsArray: Beer[] = data ? Object.values(data) : [];
      dispatch(loadBeers({ beers: itemsArray }));
      dispatch(setBeersDataLoadingStatus({ isBeersDataLoading: false }));
    } catch (error) {
      console.error('Error fetching beers data:', error);
      dispatch(setBeersDataLoadingStatus({ isBeersDataLoading: false }));
    }
  }
);

export const fetchUsersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchUsers', async (_arg, { dispatch }) => {
    try {
      dispatch(setUsersDataLoadingStatus({isUsersDataLoading: true}));

      const data = ((await database.ref(APIRoute.Users).once("value")).val());

      const usersArray: User[] = data ? Object.values(data) : [];

      dispatch(loadUsers({ users: usersArray}));
      dispatch(setUsersDataLoadingStatus({ isUsersDataLoading: false }));
    } catch (error) {
      console.error('Error fetching users data:', error);
      dispatch(setUsersDataLoadingStatus({ isUsersDataLoading: false }));
    }
  }
)

export const fetchGuestsAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchGuests', async (_arg, { dispatch }) => {
    try {
      dispatch(setGuestsDataLoadingStatus({isGuestsDataLoading: true}))
      const data = ((await database.ref(APIRoute.Guests).once("value")).val());
      const guestsArray: Guest[] = data ? Object.values(data) : [];

      dispatch(loadGuests({guests: guestsArray}));
      dispatch(setGuestsDataLoadingStatus({isGuestsDataLoading: false}));
    } catch (error) {
      console.error('Error fetching guests data: ', error);
      dispatch(setGuestsDataLoadingStatus({ isGuestsDataLoading: false }))
    }
  }
)

export const fetchSubscribersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchSubscribers', async (_arg, { dispatch }) => {
    try {
      dispatch(setSubscribersDataLoadingStatus({isSubscribersDataLoading: true}))
      const data = ((await database.ref(APIRoute.Subscribers).once("value")).val());
      const subscribersArray: Subscriber[] = data ? Object.values(data) : [];

      dispatch(loadSubscribers({ subscribersEmails: subscribersArray }));
      dispatch(setSubscribersDataLoadingStatus({ isSubscribersDataLoading: false }));
    } catch (error) {
      console.error('Error fetching subscribers data: ', error);
      dispatch(setSubscribersDataLoadingStatus({ isSubscribersDataLoading: false }))
    }
  }
)

export const fetchBlogPostsAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchBlogPosts', async (_arg, {dispatch}) => {
    try {
      dispatch(setBlogPostsDataLoadingStatus({isBlogPostsDataLoading: true}));
      const data = ((await database.ref(APIRoute.Blog).once("value")).val());
      const blogPostsArray: Post[] = data ? Object.values(data) : [];

      dispatch(loadBlogPosts({posts: blogPostsArray}));
      dispatch(setBlogPostsDataLoadingStatus({isBlogPostsDataLoading: false}));
    } catch (error) {
      console.error("Error fetching blog posts: ", error);
      dispatch(setBlogPostsDataLoadingStatus({isBlogPostsDataLoading: false}));
    }
  }
)

export const addItemToUserDatabaseCart = async (user: User, item: BeerInCart, amount?: number) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];
      let updatedCartItems = existingItem.cartItems || [];

      const itemIndex = updatedCartItems.findIndex((i: BeerInCart) => i.id === item.id);
      if (itemIndex > -1) {
        if (amount) {
          updatedCartItems[itemIndex].amount += amount;
        } else {
          updatedCartItems[itemIndex].amount += item.amount;
        }
      } else {
        updatedCartItems.push(item);
      }

      await userRef.child(key).update({ cartItems: updatedCartItems });
    }
  } catch (error) {
    console.error('Error adding to preorder: ', error);
  }
}

export const removeItemFromUserCart = async (user: User, item: BeerInCart) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const userData = snapshot.val()[key];

      const itemIndex = userData.cartItems.findIndex((i: BeerInCart) => i.id === item.id);

      if (itemIndex > -1) {
        userData.cartItems.splice(itemIndex, 1);

        await userRef.child(key).update({ cartItems: userData.cartItems });
      }
    }
  } catch (error) {
    console.error('Error removing item from user cart:', error);
  }
};

export const addItemToUserPreOrder = async (user: User, item: BeerInCart, amount: number) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];
      let updatedPreOrder = existingItem.preOrder || [];

      const itemIndex = updatedPreOrder.findIndex((i: BeerInCart) => i.id === item.id);
      if (itemIndex > -1) {
        updatedPreOrder[itemIndex].amount += amount;
      } else {
        updatedPreOrder.push(item);
      }

      await userRef.child(key).update({ preOrder: updatedPreOrder });
    }
  } catch (error) {
    console.error('Error adding to preorder: ', error);
  }
};

export const removeItemFromUserPreOrder = async (user: User, item: BeerInCart, dispatch: AppDispatch) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const userData = snapshot.val()[key];

      const itemIndex = userData.preOrder.findIndex((i: BeerInCart) => i.id === item.id);

      if (itemIndex > -1) {
        userData.preOrder.splice(itemIndex, 1);
        await userRef.child(key).update({preOrder: userData.preOrder});
      }
    }
  } catch (error) {
    console.error('Error removing item from user pre-order list:', error);
  }
}

export const addItemToUserNotifications = async (user: User, item: Beer) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];
      let updatedNotifications = existingItem.notifications || [];
      const itemIndex = updatedNotifications.findIndex((i: BeerInCart) => i.id === item.id);

      if (itemIndex > -1) {
        console.error('You\'re already subscribed to notifications for this item.');
      } else {
        updatedNotifications.push(item);
      }

      await userRef.child(key).update({ notifications: updatedNotifications });
    }
  } catch (error) {
    console.error('Error adding to notifications: ', error);
  }
}

export const removeItemFromUserNotifications = async (user: User, item: Beer, dispatch: AppDispatch) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const userData = snapshot.val()[key];

      const itemIndex = userData.notifications.findIndex((i: Beer) => i.id === item.id);

      if (itemIndex > -1) {
        userData.notifications.splice(itemIndex, 1);
        await userRef.child(key).update({notifications: userData.notifications});
      }
    }
  } catch (error) {
    console.error('Error removing item from user notifications list:', error);
  }
}

export const addGuestNotificationToDatabase = async (guest: Guest, item: Beer) => {
  try {
    const guestRef = database.ref(APIRoute.Guests);
    const snapshot = await guestRef.orderByChild('id').equalTo(guest.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingGuest = snapshot.val()[key];
      let updatedNotifications = existingGuest.notifications || [];
      const itemIndex = updatedNotifications.findIndex((i: Beer) => i.id === item.id);

      if (itemIndex > -1) {
        console.error('You\'re already subscribed to notifications for this item.');
      } else {
        updatedNotifications.push(item);
        await guestRef.child(key).update({ notifications: updatedNotifications });
      }
    } else {
      const newGuestRef = guestRef.push();
      await newGuestRef.set({
        ...guest,
        notifications: [item]
      });
    }
  } catch (error) {
    console.error('Error adding to notifications: ', error);
  }
};

export const addSubscriberToDatabase = async (subscriber: string) => {
  try {
    const subscriberRef = database.ref(APIRoute.Subscribers);
    const newSubscriberRef = subscriberRef.push();
    await newSubscriberRef.set({ email: subscriber });
    console.log(`New subscriber ${subscriber} added.`);
  } catch (error) {
    console.error('Error adding to subscribers: ', error);
  }
};


export const addNewUserToDatabase = async (user: User, dispatch: AppDispatch) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    await userRef.push(user);

    const snapshot = await userRef.once('value');
    const usersArray: User[] = [];
    snapshot.forEach(childSnapshot => {
      usersArray.push(childSnapshot.val());
    });

    dispatch(loadUsers({ users: usersArray }));
  } catch (error) {
    console.error('Error adding new user to database:', error);
  }
};


export const addReviewToDatabase = async (beer: Beer, review: Review) => {
  try {
    const beerRef = database.ref(`${APIRoute.Beers}/${beer.id}`);
    const snapshot = await beerRef.once('value');
    const beerData = snapshot.val();

    if (!beerData.reviews) {
      beerData.reviews = [];
    }

    const user = {
      name: review.user.name,
      surname: review.user.surname,
      email: review.user.email,
      phone: review.user.phone,
      avatar: review.user.avatar || '/default/avatar/path'
    };

    const newReview = {
      review: review.review,
      date: review.date,
      id: review.id,
      rating: review.rating,
      user: user
    };

    beerData.reviews.push(newReview);

    await beerRef.update(beerData);
  } catch (error) {
    console.error("Error adding review: ", error);
  }
}

export const adminChangeBeerCount = async (beer: Beer, num: number) => {
  try {
    const beerRef = database.ref(`${APIRoute.Beers}/${beer.id}`);
    const snapshot = await beerRef.once('value');
    const beerData = snapshot.val();

    beerData.onStock = num;
    await beerRef.update(beerData);
  } catch (error) {
    console.error("Error update beer amount: ", error)
  }
}

export const adminToggleBeerStatus = async (beer: Beer, status: BeerStatus, dispatch: AppDispatch) => {
  try {
    const beerRef = database.ref(`${APIRoute.Beers}/${beer.id}`);
    const snapshot = await beerRef.once('value');
    const beerData = snapshot.val();
    if (status === BeerStatus.Brewing) {
      dispatch(setBeerBrewingDate({beer: beerData, brewingDate: new Date()}))
      beerData.brewingDate = new Date();
    }

    if (status === BeerStatus.Unavailable) {
      dispatch(setBeerBrewingDate({beer: beerData, brewingDate: null}))
      beerData.brewingDate = null;
    }

    beerData.status = status;
    await beerRef.update(beerData);
  } catch (error) {
    console.error("Error updating beer on brewing: ", error);
  }
}

export const toggleLikeInDatabase = async (post: Post, user: User, isLiked: boolean) => {
  try {
    const postRef = database.ref(`${APIRoute.Blog}/${post.id}`);
    const postSnapshot = await postRef.once('value');
    const postData = postSnapshot.val();

    if (!postData.likes) {
      postData.likes = [];
    }

    if (!isLiked) {
      // Remove user from likes
      postData.likes = postData.likes.filter((likedUser: User) => likedUser.id !== user.id);
    } else {
      // Add user to likes
      postData.likes.push(user);
    }

    await postRef.update(postData);
  } catch (error) {
    console.error("Error toggle like: ", error);
  }
};


export const loginAction = createAsyncThunk<
  UserAuthData,
  AuthData,
  ThunkOptions
>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserAuthData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    localStorage.setItem('braga-user', JSON.stringify(data));
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  ThunkOptions
>(
  'user/logout',
  async (_arg, { dispatch }) => {
    try {
      removeUserFromLocalStorage();
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
      dispatch(setUserInformation({
        userInformation: {
          id: '',
          email: '',
          token: ''
        }
      }))
      dispatch(removeUser())
      dispatch(setUser({
        email: '',
        id: '',
        token: ''
      }))
    } catch (error) {
      console.error('Failed to logout', error);
    }
  }
);
