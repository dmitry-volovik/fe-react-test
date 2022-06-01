import React, { useState, Fragment, useRef } from "react";
import { TextField } from "@material-ui/core";
import { number, bool, func, object } from "prop-types";

import Button from "../../../../components/uielements/button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from "../../../../components/uielements/dialogs";
import { CircularProgress } from "../../../../components/uielements/progress";
import DialogBodyWrapper from "./dialog.style";
import with2FA from "../../../../helpers/with2FA";
import { claimantsApi } from "../../../../api/api-new";

const OnHoldDialog = ({
  open,
  onClose,
  onVerifyAction,
  caseId,
  ofacId,
  reload,
  context
}) => {
  const [ids, setIds] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const claimIds = useRef(null);

  const handleChange = ({ target: { value } }) => {
    setIds(value);
  };

  const prepareSubmit = () => {
    let formattedIds = [];

    ids
      .split("\n")
      .map((row) =>
        formattedIds.push(...row.split(",").map((str) => str.trim()))
      );

    claimIds.current = formattedIds.filter((el) => el.length);
    if(!claimIds.current.length){
      setError(true);
      return;
    }

    onSubmit();
  };

  const onSubmit = (verificationCode) => {
    setLoading(true);
    onVerifyAction(
      (verificationToken) =>
        claimantsApi.updateOFACInfo(
          { caseId, ofacId },
          { claimIds: claimIds.current, caseId, id: ofacId, action: "hold" },
          verificationToken && {
            "x-2fa-challenge": verificationToken,
            "x-2fa-code": verificationCode,
          }
        ),
      onSubmit,
      (result) => onSuccess(result),
      (stopLoading) => stopLoading && setLoading(false)
    );
  };

  const onSuccess = () => {
    context.func.showModal('OFAC statuses updated successfully.')
    setLoading(false);
    reload();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogBodyWrapper>
        <DialogTitle>
          {isLoading
            ? "Processing..."
            : "Please enter the IDs of the claims that you want to put on hold."}
        </DialogTitle>

        <DialogContent>
          {isLoading ? (
            <Fragment>
              <span>Please wait while we are set selected claims on hold.</span>
              <div className="formLoaderBackground">
                <CircularProgress
                  size={24}
                  className="buttonProgress"
                  style={{ marginTop: "12px" }}
                />
              </div>
            </Fragment>
          ) : (
            <TextField
              className="content"
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={5}
              variant="outlined"
              onChange={handleChange}
              autoFocus
              error={error}
              helperText={error ? "Should be at least 1 valid claim ID" : ""}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>

          <Button
            color="primary"
            onClick={prepareSubmit}
            disabled={isLoading || !ids}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogBodyWrapper>
    </Dialog>
  );
};

export default with2FA(OnHoldDialog);

OnHoldDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onVerifyAction: func.isRequired,
  caseId: number,
  ofacId: number,
  reload: func.isRequired,
  context: object.isRequired,
};