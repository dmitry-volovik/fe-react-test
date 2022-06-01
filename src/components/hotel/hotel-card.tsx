import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { FunctionComponent } from 'react';
import { ILngAttr } from '../../@shared/types/hotels.types';
import { getLngString } from '../../helper/index';

type IHotelCardProps = {
  img: {
    url: string;
    caption: ILngAttr;
  };
};

export const HotelCard: FunctionComponent<IHotelCardProps> = ({ img }) => {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 0,
        width: '100%',
      }}
      style={{ backgroundColor: 'transparent', display: 'relative' }}
    >
      <CardMedia
        component='img'
        height='425'
        image={img.url}
        alt={getLngString(img.caption)}
      />
    </Card>
  );
};
