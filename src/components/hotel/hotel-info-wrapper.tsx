import Typography from '@mui/material/Typography';
import { HotelInfoContent } from './hotel-info-content';
import { ColorButton } from '../button/button';
import background from '../../assets/Hotel_Ad_Background@2x.png';
import { FunctionComponent } from 'react';
import { IHotel, BASE_URL } from '../../@shared/types/hotels.types';
import { getLngString } from '../../helper/index';
import start from '../../assets/Star.svg';
import startTop from '../../assets/Top_Element_Star_Icon.svg';

type HotelInfoWrapProps = Pick<IHotel, 'benefits' | 'name' | 'id' | 'deals'>;

//hardcode only for test.
const LINK = BASE_URL + '/hotels/anfrage-details/?numPersons=2&numRooms=1&hotelId=';

export const HotelInfoWrapper: FunctionComponent<HotelInfoWrapProps> = ({
  benefits,
  name,
  id,
  deals,
}) => {
  const handleClick = () => {
    window.open(LINK + id, '_blank');
  };

  const deal = deals.length ? getLngString(deals[0].headline) : '';

  return (
    <div className='info-wrapper'>
      <Typography variant='h5' className='hotel-name' style={{ color: '#FFFFFF' }}>
        {name['en-US']}{' '}
      </Typography>
      <img src={startTop} className='top-star'></img>
      <div className='info-content-wrapper'>
        <div style={{ position: 'relative' }}>
          <Typography variant='subtitle1' style={{ paddingTop: '35px' }}>
            {deal && <img src={start} />}
            <span style={{ marginLeft: '15px' }}>{deal}</span>
          </Typography>

          <HotelInfoContent benefits={benefits.slice(0, 3)} />
          <img src={background} className='background-img'></img>
        </div>
      </div>
      <ColorButton onClick={handleClick} variant='contained' style={{ marginTop: '-22px' }}>
        Direkt anfragen
      </ColorButton>
    </div>
  );
};
