import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { IHotel } from '../@shared/types/hotels.types';
import { hotelActions } from './hotels/hotels.actions';


const initHotels: IHotel[] = [];


const { hotelsSuccess } = hotelActions;

const hotels = createReducer(initHotels, (builder) => {
  builder
    .addCase(hotelsSuccess, (state, { payload }) => {
      return [...payload.result];
    })
});


export function rootReducer() {
  return combineReducers({
    hotels
  });
}

export type AppState = ReturnType<typeof rootReducer>;
