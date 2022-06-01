import React, { useEffect, useState, useMemo, useContext, useRef, useCallback } from "react";
import queryString from "query-string";
import { useHistory } from 'react-router';
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import { FormsMainWrapper } from "../caseClaimRecordView/forms.style";
import { Row, HalfColumn } from "../../../components/utility/rowColumn";
import Breadcrumbs from "../../../components/app/breadcrumbs";
import HeadSection from './HeadSection';
import {getBreadcrumbsList} from './helper';
import { useAPI } from '../../../helpers/hooks';
import { claimantsApi } from '../../../api/api-new';
import { ClaimantTable } from './ClaimantTable';
import {defaultPagination, prepareColumnData, useGetClaims} from './helper';
import { AppContext } from '../../../app-context';
import RemoveHoldDialogWith2FA from './dialogs/RemoveHoldDialog';

const ViewOFACRecord = () => {

  const history = useHistory();
  const context = useContext(AppContext);

  const {caseId, ofacId} = queryString.parse(history.location.search);

  const [caseData, setCase] = useState({name: ''});
  const [claimPagination, setClaimPagination] = useState(defaultPagination);
  const [claimOnHoldPgntn, setClaimOnHoldPgntn] = useState(defaultPagination);
  const [isValidParams, setParams] = useState(false);
  const [reloadTrigger, setReload] = useState(1);
  const [removeHold, setRemoveHold] = useState(false);
  const claimId = useRef(null);

  const [isLoading, response] = useAPI(
    () => claimantsApi.getOFACFile(caseId, ofacId),
    {
      dependencies: [caseId, ofacId, reloadTrigger],
      defaultData: {result:{data:{}}},
    }
    );

  const [ofacRecords, setRecords] = useState({result: { data: {}, included:{} }});

  const [isLoadingClaims, claims] = useGetClaims(
    caseId,
    ofacId,
    claimPagination.page,
    "not-hold",
    isValidParams,
    reloadTrigger
  );

  const [isLoadingHoldClaims, holdClaims] = useGetClaims(
    caseId,
    ofacId,
    claimOnHoldPgntn.page,
    "hold",
    isValidParams,
    reloadTrigger
  );

  const fileInfo = useMemo(() => prepareColumnData(ofacRecords), [ofacRecords]);

  const reloadPage = useCallback(
    () => {
      const reload = reloadTrigger + 1;
      setReload(reload);
    },
    [setReload, reloadTrigger],
  )

  useEffect(() => {
    setRecords(response.result?.data);
    if (response.included?.case) {
      setParams(true)
      setCase(response.included.case.data);
    }

    setClaimPagination(claims.pagination);
    setClaimOnHoldPgntn(holdClaims.pagination);
  }, [
    response,
    claims.pagination,
    holdClaims.pagination
  ]);

  const bcList = getBreadcrumbsList(caseId, caseData.name);

  const handleClaimView = (claimantId) => () =>
    history.push({
      pathname: "/dashboard/view-claim",
      search: "?caseId=" + caseId + "&claimId=" + claimantId,
    });

  const onChangePage = (e, page) =>
    setClaimPagination({ ...claimPagination, page });

  const onChangeHoldPage = (e, page) =>
    setClaimOnHoldPgntn({ ...claimOnHoldPgntn, page });

  const removeHoldHandler = useCallback(
    (id) => (ev) => {
      ev.stopPropagation();
      claimId.current = id;
      setRemoveHold(true);
    },
    [claimId],
  )

  // eslint-disable-next-line
  const removeParams = useMemo(() => ({action: 'removeHold', claimIds: [claimId.current]}), [claimId.current])

  return (
    <LayoutWrapper className="mateFormsLayout">
      <FormsMainWrapper>
        <Row>
          <Breadcrumbs list={bcList} />
        </Row>
        <HalfColumn>
          <HeadSection
            fileInfo={fileInfo}
            loadingData={isLoading}
            reload={reloadPage}
            context={context}
          />
        </HalfColumn>

        <Row>
          <ClaimantTable
            claims={holdClaims.result.data}
            title="claims on hold"
            loading={!isValidParams || isLoadingHoldClaims}
            onClick={handleClaimView}
            pagination={holdClaims.pagination}
            onChangePage={onChangeHoldPage}
            onHold={true}
            removeHoldClick={removeHoldHandler}
          />
        </Row>

        <Row>
          <ClaimantTable
            claims={claims.result.data}
            title="other claims"
            loading={!isValidParams || isLoadingClaims}
            onClick={handleClaimView}
            pagination={claimPagination}
            onChangePage={onChangePage}
          />
        </Row>
      </FormsMainWrapper>

      {removeHold && (
        <RemoveHoldDialogWith2FA
          open={removeHold}
          onClose={() => setRemoveHold(false)}
          caseId={fileInfo.caseId}
          ofacId={fileInfo.id}
          reload={reloadPage}
          context={context}
          params={removeParams}
        />
      )}
    </LayoutWrapper>
  );
}

export default ViewOFACRecord;