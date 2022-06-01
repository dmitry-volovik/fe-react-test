import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { hotelActions } from './store/hotels/hotels.actions';
import { Slider } from './components/carousel';
import logo from './assets/Three_Diamonds.svg'
import './App.css';

function App() {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels);

  useEffect(() => {
    dispatch(hotelActions.getHotels());
  }, [dispatch]);

  return (
    <div className='App'>
      <div className='main-background'></div>
      <Typography variant='h3'>Aktuelle Angebote</Typography>
      <img src={logo} />
      <Slider list={hotels.slice(0,5)} />
    </div>
  );
}

export default App;
