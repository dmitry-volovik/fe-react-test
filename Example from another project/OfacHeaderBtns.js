import React, { Fragment, useState, useCallback } from "react";
import {func} from "prop-types";
import {
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { actionLabels, batchActions } from './helper';

function HeaderButtons({
  setHold,
  setClear,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectAction = (action) => () => {
    switch (action) {
      case 'hold':
        setHold(true);
        break;
      case 'clear':
        setClear(true)
        break;
      default:
        break;
    }

    handleClose();
  };

  return (
    <Fragment>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu
        id="header-button-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {batchActions.map((action) => (
          <MenuItem dense onClick={selectAction(action)} key={action}>
            {actionLabels[action]}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default HeaderButtons;

HeaderButtons.propTypes = {
  setHold: func,
  setClear: func,
};