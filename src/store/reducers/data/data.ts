import { createReducer } from "@reduxjs/toolkit";
import { DataState } from "../../../types/state";
import {
  addGuestNotification,
  addItemToCart,
  addItemToNotifications,
  addItemToPreOrder,
  addReview,
  addSubscriber,
  deleteReview,
  loadBeers,
  loadBlogPosts,
  loadGuests,
  loadSubscribers,
  loadUsers,
  removeFromCart,
  removeItemFromNotifications,
  removeItemFromPreOrder,
  setBeerBrewingDate,
  setBeersDataLoadingStatus,
  setBlogPostsDataLoadingStatus,
  setGuestsDataLoadingStatus,
  setSubscribersDataLoadingStatus,
  setUsersDataLoadingStatus,
  toggleBeerStatus,
  togglePostLike,
  updateBeersAmount
} from "../../actions";

const initialState: DataState = {
  beers: [],
  users: [],
  guests: [],
  subscribers: [],
  blog: [],
  isBeersDataLoading: false,
  isUsersDataLoading: false,
  isGuestsDataLoading: false,
  isSubscribersDataLoading: false,
  isBlogPostsDataLoading: false,
}

export const dataReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(loadBeers, (state, action) => {
    state.beers = action.payload.beers;
  })
  .addCase(setBeersDataLoadingStatus, (state, action) => {
    state.isBeersDataLoading = action.payload.isBeersDataLoading;
  })
  .addCase(updateBeersAmount, (state, action) => {
    const { beerToUpdate, numToUpdate } = action.payload;
    state.beers[beerToUpdate.id].onStock = numToUpdate;
  })
  .addCase(toggleBeerStatus, (state, action) => {
    const { beer, status } = action.payload;
    state.beers[beer.id].status = status;
  })
  .addCase(loadUsers, (state, action) => {
    state.users = action.payload.users;
  })
  .addCase(setUsersDataLoadingStatus, (state, action) => {
    state.isUsersDataLoading = action.payload.isUsersDataLoading;
  })
  .addCase(loadGuests, (state, action) => {
    state.guests = action.payload.guests;
  })
  .addCase(setGuestsDataLoadingStatus, (state, action) => {
    state.isGuestsDataLoading = action.payload.isGuestsDataLoading;
  })
  .addCase(loadSubscribers, (state, action) => {
    state.subscribers = action.payload.subscribersEmails;
  })
  .addCase(setSubscribersDataLoadingStatus, (state, action) => {
    state.isSubscribersDataLoading = action.payload.isSubscribersDataLoading;
  })
  .addCase(loadBlogPosts, (state, action) => {
    state.blog = action.payload.posts
  })
  .addCase(setBlogPostsDataLoadingStatus, (state, action) => {
    state.isBlogPostsDataLoading = action.payload.isBlogPostsDataLoading;
  })
  .addCase(setBeerBrewingDate, (state, action) => {
    const beer = action.payload.beer;
    const brewingDate = action.payload.brewingDate;
    if (brewingDate !== null) state.beers[beer.id].brewingDate = brewingDate;
  })
  .addCase(addItemToCart, (state, action) => {
    const { user, item, amount } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind) {
      if (!userToFind.cartItems) {
        userToFind.cartItems = [];
      }

      const existingItemIndex = userToFind.cartItems.findIndex((i) => i.id === item.id)
      if (existingItemIndex > -1) {
        userToFind.cartItems[existingItemIndex].amount += amount;
      } else {
        userToFind.cartItems.push(item);
      }
    }
  })
  .addCase(removeFromCart, (state, action) => {
    const { user, item } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind && userToFind.cartItems) {
      const existingItemIndex = userToFind.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        userToFind.cartItems.splice(existingItemIndex, 1);
      }
    }
  })

  .addCase(addReview, (state, action) => {
    const { id } = action.payload.item;
    const { review } = action.payload;

    const index = state.beers.findIndex(beer => beer.id === id);

    if (index !== -1) {
        if (!state.beers[index].reviews) {
            state.beers[index].reviews = [];
        }
        state.beers[index].reviews.push(review);
    } else {
        console.error(`Beer with id ${id} not found`);
    }
  })
  .addCase(deleteReview, (state, action) => {
    const { id } = action.payload.review;
    const { review } = action.payload;

    state.beers[id].reviews = state.beers[id].reviews?.filter((reviewId) => reviewId.id !== review.id);
  })
  .addCase(addItemToPreOrder, (state, action) => {
    const { user, item, amount } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind) {
      if (!userToFind.preOrder) {
        userToFind.preOrder = [];
      }

      const existingItemIndex = userToFind.preOrder.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        userToFind.preOrder[existingItemIndex].amount += amount;
      } else {
        userToFind.preOrder.push(item);
      }
    }
  })
  .addCase(removeItemFromPreOrder, (state, action) => {
    const { user, item } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind && userToFind.preOrder) {
      const existingItemIndex = userToFind.preOrder.findIndex(itemToRemove => itemToRemove.id === item.id);
      if (existingItemIndex !== -1) {
        userToFind.preOrder.splice(existingItemIndex, 1);
      }
    }
  })
  .addCase(addItemToNotifications, (state, action) => {
    const { user, item } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind) {
      if (!userToFind.notifications) {
        userToFind.notifications = [];
      }

      const existingItemIndex = userToFind.notifications.findIndex((i) => i.id === item.id);
      if (existingItemIndex > -1) {
        console.error('You\'re already subscribed to notifications for this item.');
      } else {
        userToFind.notifications.push(item);
      }
    }
  })
  .addCase(removeItemFromNotifications, (state, action) => {
    const { user, item } = action.payload;
    const userToFind = state.users.find((userToFind) => user.id === userToFind.id);

    if (userToFind && userToFind.notifications) {
      const existingItemIndex = userToFind.notifications.findIndex(itemToRemove => itemToRemove.id === item.id);
      if (existingItemIndex !== -1) {
        userToFind.notifications.splice(existingItemIndex, 1);
      }
    }
  })
  .addCase(addGuestNotification, (state, action) => {
    const { guest, item } = action.payload;
    const userToFind = state.users.find(
      (user) => guest.email === user.email || guest.phone === user.phone
    );

    if (userToFind) {
      addItemToNotifications({ user: userToFind, item: item });
    }

    if (!state.guests[guest.id]) {
      state.guests[guest.id] = {
        ...guest,
        notifications: []
      };
    }

    if (!state.guests[guest.id].notifications) {
      state.guests[guest.id].notifications = [];
    }

    const existingItemIndex = state.guests[guest.id].notifications.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      console.error("You're already subscribed to notifications for this item.");
    } else {
      state.guests[guest.id].notifications.push(item);
    }
  })
  .addCase(addSubscriber, (state, action) => {
    const { subscriber } = action.payload;

    if (!state.subscribers) {
      state.subscribers = [];
    }

    state.subscribers.push(subscriber);
  })
  .addCase(togglePostLike, (state, action) => {
    const { post, user } = action.payload;
    const userToFind = state.users.find((userToFind) => user?.id === userToFind.id);

    if (userToFind) {
        if (!Array.isArray(state.blog[post.id].likes)) {
          state.blog[post.id].likes = [];
        }

        const userLikedIndex = state.blog[post.id].likes.findIndex(likedUser => likedUser.email === userToFind.email);

        if (userLikedIndex !== -1) {
          state.blog[post.id].likes = state.blog[post.id].likes.filter(likedUser => likedUser.email !== userToFind.email);
        } else {
          state.blog[post.id].likes.push(userToFind);
        }
    }
  });
})
