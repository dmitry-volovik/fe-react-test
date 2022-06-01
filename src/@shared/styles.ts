import {createTheme} from '@mui/material';

export const styles = {
  btnColor: '#365959',
  btnColorActive: '#253d3d',
  textColor: '#2B121D'
}


export const globalTheme = createTheme({
  typography: {
    allVariants: {
      color: styles.textColor
    },
  },
})