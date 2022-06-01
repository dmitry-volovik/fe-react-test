import * as cars from '3d-react-carousal';
import { FunctionComponent } from 'react';

import { IHotel } from '../@shared/types/hotels.types';
import { HotelCard } from './hotel/hotel-card';
import { HotelInfoWrapper } from './hotel/hotel-info-wrapper';

const { Carousel }: any = cars;
type SliderProps = {
  list: IHotel[];
};

export const Slider: FunctionComponent<SliderProps> = ({ list }) => {
  let slides = list.map(({ images, benefits, name, id, deals }) => {
    const props = { benefits, name, id, deals };
    return (
      <>
        <HotelCard img={images[0]} />
        <HotelInfoWrapper {...props} />
      </>
    );
  });

  return (
    <div className='App'>
      <br />
      <Carousel slides={slides} />
    </div>
  );
};
