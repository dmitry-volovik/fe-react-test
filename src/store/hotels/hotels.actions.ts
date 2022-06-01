import {createAction} from '@reduxjs/toolkit';
import { IApiResponse } from '../../@shared/types/hotels.types';

export const hotelActionTypes = {
  HOTELS_REQUEST: '[hotels] request',
  HOTELS_SUCCESS: '[hotels] success',
  HOTELS_ERROR: '[hotels] error',
};

export const hotelActions = {
  getHotels: createAction(hotelActionTypes.HOTELS_REQUEST),
  hotelsSuccess: createAction<IApiResponse>(hotelActionTypes.HOTELS_SUCCESS),
  hotelsError: createAction<unknown>(hotelActionTypes.HOTELS_ERROR),
};
