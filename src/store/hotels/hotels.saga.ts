import { all, put, call, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
// import { PayloadAction } from '@reduxjs/toolkit';
import { hotelActions } from './hotels.actions';
import hotelService from '../../services/hotels.service'
import { IApiResponse} from '../../@shared/types/hotels.types';

function* getHotels() {
  try {
    const { data }: AxiosResponse<IApiResponse> = yield call(hotelService.getHotels);
    
    if (!data.success) {
      throw new Error(data.error)
    }
    yield put(hotelActions.hotelsSuccess(data));
  } catch (e) {
    yield put(hotelActions.hotelsError(e));
    console.error(e)
  }
}

export const hotelSaga = all([takeEvery(hotelActions.getHotels, getHotels)]);
