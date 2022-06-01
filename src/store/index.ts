import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, createStore, Store } from 'redux';
import { rootReducer } from './root.reducer';
import rootSaga from './root.saga';
import { IHotel } from '../@shared/types/hotels.types';

export interface AppState {
  hotels: IHotel[]
}

const configureStore = (): Store<AppState> => {
  const sagaMiddleware = createSagaMiddleware();
  const initialState = {};

  const store = createStore(rootReducer(), initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
};
const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
