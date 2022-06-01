import { all } from '@redux-saga/core/effects';
import { hotelSaga } from './hotels/hotels.saga';

export default function* rootSaga() {
  yield all([hotelSaga]);
}
