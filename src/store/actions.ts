import { createAction } from "@reduxjs/toolkit";
import { Beer } from "../types/beer";

export const addItemToCart = createAction<{item: Beer}>('page/addItemToCart');
