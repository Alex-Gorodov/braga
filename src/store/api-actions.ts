import { ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute, AppRoute, AuthorizationStatus } from "../const";
import { getAuthedUser, getUserInformation, loadBeers, loadCart, loadUsers, redirectToRoute, requireAuthorization, setBeersDataLoadingStatus, setCartDataLoadingStatus, setUsersDataLoadingStatus } from "./actions";
import { Beer, BeerInCart } from "../types/beer";
import { database } from "../services/database";
import { AxiosInstance } from "axios";
import { User } from "../types/user";
import { Review } from "../types/review";
import { RootState } from "./root-reducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/state";
import { AuthData } from "../types/auth-data";
import { UserAuthData } from "../types/user-auth-data";
import { saveToken } from "../services/token";

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

export const fetchCartAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchCart', async (_arg, { dispatch }) => {
    dispatch(setCartDataLoadingStatus({isCartDataLoading: true}));
    const data = (await database.ref(APIRoute.Cart).once("value")).val();
    const itemsArray: BeerInCart[] = data ? Object.values(data) : [];
    dispatch(loadCart({beers: itemsArray}));
    dispatch(setCartDataLoadingStatus({isCartDataLoading: false}));
  }
)

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

export const addItemToDatabaseCart = async (item: BeerInCart) => {
  try {
    const cartRef = database.ref(APIRoute.Cart);
    const snapshot = await cartRef.orderByChild('id').equalTo(item.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];
      await cartRef.child(key).update({ amount: existingItem.amount + 1 });
    } else {
      await cartRef.push(item);
    }
  } catch (error) {
    console.error('Error adding item to database cart:', error);
  }
}

export const removeItemFromDatabaseCart = async (item: BeerInCart) => {
  try {
    const cartRef = database.ref(APIRoute.Cart);
    const snapshot = await cartRef.orderByChild('id').equalTo(item.id).once('value');

    if (snapshot.exists()) {
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];

      if (existingItem.amount) {
        await cartRef.child(key).remove();
      }
    }
  } catch (error) {
    console.error('Error removing item from database cart:', error);
  }
}

export const addNewUserToDatabase = async (user: User, dispatch: AppDispatch) => {
  try {
    const userRef = database.ref(APIRoute.Users);
    await userRef.push(user);
    console.log('User successfully added to database');

    // Получаем обновленный список пользователей
    const snapshot = await userRef.once('value');
    const usersArray: User[] = [];
    snapshot.forEach(childSnapshot => {
      usersArray.push(childSnapshot.val());
    });

    // Диспатчим экшен loadUsers с обновленным списком пользователей
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
void,
AuthData,
ThunkOptions>
(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserAuthData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
  }
);
