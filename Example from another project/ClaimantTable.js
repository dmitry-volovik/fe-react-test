import React from "react";
import {arrayOf, string, bool, object} from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  TablePagination,
} from "@material-ui/core";
import { CircularProgress } from "../../../components/uielements/progress";
import { FullColumn } from "../../../components/utility/rowColumn";
import { StatusChip } from '../../../components/app/status';
import { headers } from "./helper";
import { ActionButton } from '../../../components/app/action-button';

export const ClaimantTable = ({
  claims,
  title,
  loading,
  onClick,
  onChangePage,
  pagination,
  onHold,
  removeHoldClick,
}) => (
  <FullColumn>
    <div className="loaderWrapper">
      <Card className="cardRoot">
        <CardHeader
          classes={{
            root: "cardHeadRoot",
          }}
          title={`${pagination.total} ${title}`}
        />

        <CardContent className="cardContentRoot">
          <div className="paymentsListWrapper">
            <table className="paymentsList">
              <thead>
                <tr>
                  {headers.map((el) => (
                    <th key={el.label}>{el.label}</th>
                  ))}
                  {onHold && <th>{""}</th>}
                </tr>
              </thead>

              <tbody>
                {claims.length > 0
                  ? claims.map(
                      ({ id, claimId, name, phone, email, ofacStatus }) => {
                        return (
                          <tr
                            key={claimId}
                            onClick={onClick(id)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>{claimId}</td>
                            <td>{name ?? ""}</td>
                            <td>{phone}</td>
                            <td>{email ?? ""}</td>
                            <td>
                              <StatusChip status={ofacStatus} type="ofac" />
                            </td>
                            {onHold && (
                              <td>
                                <ActionButton
                                  title="Remove hold status"
                                  icon="remove_circle"
                                  onClick={removeHoldClick(claimId)}
                                />
                              </td>
                            )}
                          </tr>
                        );
                      }
                    )
                  : null}
              </tbody>
            </table>

            {pagination.total > 0 ? (
              <TablePagination
                rowsPerPageOptions={[25]}
                component="div"
                count={pagination.total}
                rowsPerPage={pagination.pageSize}
                page={pagination.page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={onChangePage}
              />
            ) : null}
          </div>
        </CardContent>

        {loading && (
          <div className="formLoaderBackground">
            <CircularProgress size={24} className="buttonProgress" />
          </div>
        )}
      </Card>
    </div>
  </FullColumn>
);

ClaimantTable.propTypes = {
  claims:arrayOf(object),
  title: string,
  loading: bool,
};