import React, { useState, Fragment } from "react";
import {
  shape,
  arrayOf,
  oneOfType,
  string,
  number,
  bool,
  instanceOf,
  array,
  func,
  object,
} from "prop-types";
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    List,
    ListItem,
    Typography,
    Collapse,
} from "@material-ui/core";
import { CircularProgress } from "../../../components/uielements/progress";
import { StatusChip } from "../../../components/app/status";
import HeaderButtons from './OfacHeaderBtns';
import OnHoldDialog from './dialogs/OnHoldDialog';
import ClearDialog from './dialogs/ClearDialog';

export default function HeadSection({ fileInfo, loadingData, reload, context }) {
  const[onHold, setHold] = useState(false);
  const[onClear, setClear] = useState(false);

  return (
    <Fragment>
      <div className="loaderWrapper">
        <Card className="cardRoot">
          <CardHeader
            classes={{
              root: "cardHeadRoot",
            }}
            action={
              <HeaderButtons
                onLoading={loadingData}
                setHold={setHold}
                setClear={setClear}
              />
            }
            title={fileInfo.tag ?? ""}
          ></CardHeader>
          <Collapse in={!loadingData}>
            <CardContent className="cardContentRoot">
              <Grid container>
                <Grid item xs={12} md={6}>
                  <List dense>
                    {fileInfo.left.map(({ title, value, status }) => {
                      return (
                        <ListItem key={title}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="body1" color="textSecondary">
                                {title}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} align="center">
                              {status ? (
                                <StatusChip status={value} type="ofac-file" />
                              ) : (
                                <Typography variant="body1">{value}</Typography>
                              )}
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <List dense>
                    {fileInfo.right.map(({ title, value }) => {
                      return (
                        <ListItem key={title}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography variant="body1" color="textSecondary">
                                {title}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} align="center">
                              <Typography variant="body1">{value}</Typography>
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
          {loadingData && (
            <div className="formLoaderBackground">
              <CircularProgress size={24} className="buttonProgress" />
            </div>
          )}
        </Card>
      </div>

      {onHold && (
        <OnHoldDialog
          open={onHold}
          onClose={() => setHold(false)}
          caseId={fileInfo.caseId}
          ofacId={fileInfo.id}
          reload={reload}
          context={context}
        />
      )}
      {onClear && (
        <ClearDialog
          open={onClear}
          onClose={() => setClear(false)}
          caseId={fileInfo.caseId}
          ofacId={fileInfo.id}
          reload={reload}
          context={context}
        />
      )}
    </Fragment>
  );
};

const Column = arrayOf(
  shape({
    title: string,
    value: oneOfType([string, number]),
    status: bool,
  })
);

HeadSection.propTypes = {
  fileInfo: shape({
    left: oneOfType([instanceOf(Column), array]),
    right: oneOfType([instanceOf(Column), array]),
    tag: string,
    caseId: number,
    id: number
  }),
  loadingData: bool,
  reload: func,
  context: object
};