import React, { useEffect, useCallback } from "react";
import { number, bool, func, object } from "prop-types";

import Dialog, {
  DialogContent,
  DialogTitle,
} from "../../../../components/uielements/dialogs";
import { CircularProgress } from "../../../../components/uielements/progress";
import DialogBodyWrapper from "./dialog.style";
import with2FA from "../../../../helpers/with2FA";
import { claimantsApi } from "../../../../api/api-new";

const RemoveHoldDialog = ({
  open,
  onClose,
  onVerifyAction,
  caseId,
  ofacId,
  reload,
  context,
  params,
}) => {
  const onSuccess = useCallback(
    () => {
      context.func.showModal('OFAC status changed successfully.')
      reload();
      onClose();
    },
    [reload, onClose, context.func],
  )

  const onSubmit = useCallback(
    (verificationCode) => {
      onVerifyAction(
        (verificationToken) =>
          claimantsApi.updateOFACInfo(
            { caseId, ofacId },
            { caseId, id: ofacId, ...params},
            verificationToken && {
              "x-2fa-challenge": verificationToken,
              "x-2fa-code": verificationCode,
            }
          ),
        onSubmit,
        (result) => onSuccess(result),
        (stopLoading) => stopLoading && onClose()
      );
    },
    [caseId, ofacId, onClose, onSuccess, onVerifyAction, params],
  )

  useEffect(() => {
    onSubmit();
// eslint-disable-next-line
  },[])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogBodyWrapper>
        <DialogTitle>
            Processing...
        </DialogTitle>

        <DialogContent>
            <div className="formLoaderBackground">
              <CircularProgress
                size={24}
                className="buttonProgress"
                style={{ marginTop: "12px" }}
              />
            </div>
        </DialogContent>

      </DialogBodyWrapper>
    </Dialog>
  );
};

export default with2FA(RemoveHoldDialog);

RemoveHoldDialog.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
  onVerifyAction: func.isRequired,
  caseId: number,
  ofacId: number,
  reload: func.isRequired,
  context: object.isRequired,
  params: object,
};