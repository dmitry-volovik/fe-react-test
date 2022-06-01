import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { styles } from '../../@shared/styles';

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(styles.btnColor),
  backgroundColor: styles.btnColor,
  '&:hover': {
    backgroundColor: styles.btnColorActive,
  },
}));