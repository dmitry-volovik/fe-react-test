import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import calendarIcon from '../../assets/Calendar_Icon_Large.svg';
import diamondIcon from '../../assets/Diamond_Icon.svg';
import giftIcon from '../../assets/Gift_Icon.svg';
import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { IHotel } from '@shared/types/hotels.types';
import { getLngString } from '../../helper/index';

type HotelInfoContentProps = Pick<IHotel, 'benefits'>;

const icons = [giftIcon, diamondIcon, calendarIcon];

export const HotelInfoContent: FunctionComponent<HotelInfoContentProps> = ({ benefits }) => {
  const items = benefits.map(({ text }, i) => {
    const msg = getLngString(text);
    return (
      <Grid item xs={4} md={4} key={msg}>
        <img src={icons[i]} />
        <Typography variant='body1' style={{ marginTop: '20px' }}>
          {msg}
        </Typography>
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" >
        {items}
      </Grid>
    </Box>
  );
};
