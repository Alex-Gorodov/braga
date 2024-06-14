import { ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute, AuthorizationStatus } from "../const";
import { loadBeers, loadUsers, requireAuthorization, setBeersDataLoadingStatus, setUserInformation, setUsersDataLoadingStatus } from "./actions";
import { Beer, BeerInCart } from "../types/beer";
import { database } from "../services/database";
import { AxiosInstance } from "axios";
import { User } from "../types/user";
import { Review } from "../types/review";
import { RootState } from "./root-reducer";
import { AppDispatch } from "../types/state";
import { AuthData } from "../types/auth-data";
import { UserAuthData } from "../types/user-auth-data";
import { removeUserFromLocalStorage, saveToken } from "../services/token";
import { removeUser, setUser } from "./slices/user-slice";
import { Guest } from "../types/guest";

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
  'data/fetchUsers', async (_arg, { dispatch}) => {
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

export const addItemToUserDatabaseCart = async (user: User, item: BeerInCart) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    const snapshot = await userRef.orderByChild('id').equalTo(user.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];
      let updatedCartItems = existingItem.cartItems || [];

      const itemIndex = updatedCartItems.findIndex((i: BeerInCart) => i.id === item.id);
      if (itemIndex > -1) {
        updatedCartItems[itemIndex].amount += item.amount;
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
