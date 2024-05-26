import { createAction } from "@reduxjs/toolkit";
import { Beer, BeerInCart } from "../types/beer";

export const setBeersDataLoadingStatus = createAction<{isBeersDataLoading: boolean}>('data/setBeersDataLoadingStatus');

export const loadBeers = createAction<{beers: Beer[]}>('data/loadBeers');

export const setCartDataLoadingStatus = createAction<{isCartDataLoading: boolean}>('data/setCartDataLoadingStatus');

export const loadCart = createAction<{beers: BeerInCart[]}>('data/loadCart');

export const addItemToCart = createAction<{item: BeerInCart}>('page/addItemToCart');