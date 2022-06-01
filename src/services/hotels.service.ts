import { BASE_URL, HOTELS_ENDPOINT, IResponse } from '../@shared/types/hotels.types';
import { apiService } from './api.service';

const HOTELS_URI = BASE_URL + '/hotels';

type GetHotelParams = {
  id: number;
  numPersons?: number;
  numRooms?: number;
};

class HotelService {
  public name = 'hotel';

  getHotel({ id, numPersons = 2, numRooms = 1 }: GetHotelParams) {
    return apiService.get<IResponse>(`${HOTELS_URI}/anfrage-details/`, {
      params: { id, numPersons, numRooms },
    });
  }

  getHotels() {
    return apiService.get<IResponse>(HOTELS_ENDPOINT, {});
  }
}

export default new HotelService();
