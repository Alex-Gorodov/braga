import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute, AppRoute, AuthorizationStatus } from "../const";
import { AppDispatch } from "../types/state";
import { loadBeers, loadCart, redirectToRoute, requireAuthorization, setBeersDataLoadingStatus, setCartDataLoadingStatus } from "./actions";
import { Beer, BeerInCart } from "../types/beer";
import { database } from "../services/database";
import { AuthData } from "../types/auth-data";
import { AxiosInstance } from "axios";
import { dropToken, saveToken } from "../services/token";
import { UserAuthData } from "../types/user-auth-data";

type ThunkOptions = {
  dispatch: AppDispatch;
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
      //   await cartRef.child(key).update({ amount: 0 });
      // } else {
        await cartRef.child(key).remove();
      }
    }
  } catch (error) {
    console.error('Error removing item from database cart:', error);
  }
}

export const checkAuthAction = createAsyncThunk<
void,
undefined,
ThunkOptions>
(
  'user/checkAuth', async (_arg, { dispatch, extra: api }) => {
    try {
      // const {data} = await api.get<UserAuthData>(APIRoute.Login);
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
      // dispatch(getUserInformation({userInformation: data}));
    } catch {
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
    }
  });

export const loginAction = createAsyncThunk<
void,
AuthData,
ThunkOptions>
(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserAuthData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    console.log(api);
    try {

      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
      dispatch(redirectToRoute(AppRoute.Root));
    }
    catch {
      console.log(data);

    }
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  ThunkOptions>
  (
    'user/logout', async (_arg, { dispatch, extra: api }) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
    });
