import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute } from "../const";
import { AppDispatch } from "../types/state";
import { loadBeers, loadCart, setBeersDataLoadingStatus, setCartDataLoadingStatus } from "./actions";
import firebase from "firebase/compat/app";
import { Beer, BeerInCart } from "../types/beer";
import "firebase/compat/database";
import { useSelector } from "react-redux";
import { RootState } from "./root-reducer";

type ThunkOptions = {
  dispatch: AppDispatch;
};

const firebaseConfig = {
  apiKey: "AIzaSyAubl8w5sBzjV7pKberZSLAw0mXTRkrqSg",
  authDomain: "braga-67e6d.firebaseapp.com",
  databaseURL: "https://braga-67e6d-default-rtdb.firebaseio.com/",
  projectId: "braga-67e6d",
  storageBucket: "braga-67e6d.appspot.com",
  messagingSenderId: "305750185039",
  appId: "1:305750185039:web:b73331ff9fadb92651863a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const fetchBeersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchItems', async (_arg, { dispatch }) => {
    try {
      dispatch(setBeersDataLoadingStatus({ isBeersDataLoading: true }));
      
      const data = (await firebase.database().ref(APIRoute.Beers).once("value")).val();

      const itemsArray: Beer[] = data ? Object.values(data) : [];
      dispatch(loadBeers({ beers: itemsArray }));
      dispatch(setBeersDataLoadingStatus({ isBeersDataLoading: false }));
    } catch (error) {
      console.error('Error fetching beers data:', error);
      dispatch(setBeersDataLoadingStatus({ isBeersDataLoading: false }));
    }
  }
);

export const addItemToDatabaseCart = async (item: BeerInCart) => {
  try {
    const cartRef = firebase.database().ref(APIRoute.Cart);
    const snapshot = await cartRef.orderByChild('id').equalTo(item.id).once('value');

    if (snapshot.exists()) {
      // If item already exists, update its amount
      const key = Object.keys(snapshot.val())[0];
      const existingItem = snapshot.val()[key];
      await cartRef.child(key).update({ amount: existingItem.amount + item.amount });
    } else {
      // If item doesn't exist, add a new item
      await cartRef.push(item);
    }
  } catch (error) {
    console.error('Error adding item to database cart:', error);
  }
}

export const fetchCartAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchCart', async (_arg, { dispatch }) => {
    dispatch(setCartDataLoadingStatus({isCartDataLoading: true}));
    const data = (await firebase.database().ref(APIRoute.Cart).once("value")).val();
    const itemsArray: BeerInCart[] = data ? Object.values(data) : [];
    dispatch(loadCart({beers: itemsArray}));
    dispatch(setCartDataLoadingStatus({isCartDataLoading: false}));
  }
)
