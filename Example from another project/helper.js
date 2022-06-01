import moment from "moment";
import queryString from "query-string";
import { useAPI } from '../../../helpers/hooks';
import { trimEmptyParams } from "../../../helpers/utility";
import { claimantsApi } from '../../../api/api-new';

const filterFields = (data) => data.filter(({ value }) => Boolean(value));

const defBreadcrumbsList = [
    {
      href: "/dashboard/",
      name: "Dashboard",
    },
    {
      name: "OFAC File",
    },
  ];

export const getBreadcrumbsList = (caseId, name) => {
    if (caseId >= 0 && name) {
      return [
        defBreadcrumbsList[0],
        {
          href: "/dashboard/cases-list",
          name: "Cases list",
        },
        {
          href: `/dashboard/view-case?caseId=${caseId}`,
          name: name?.length > 0 ? name : "Case",
        },
        {
          name: "OFAC",
        },
      ];
    } else {
      return defBreadcrumbsList;
    }
  };

export const prepareColumnData = ({
  cleared,
  created,
  claimants,
  claimantsOnHold,
  tag,
  caseId,
  id
}) => {
  const left = filterFields([
    {
      title: "Status",
      value: cleared ? 'cleared' : 'created',
      status: true,
    },
    {
      title: "Created",
      value: created
      ? moment(created).format("MM/DD/YYYY")
      : "",
      status: false,
    },
    {
      title: "Cleared",
      value: cleared
      ? moment(cleared).format("MM/DD/YYYY")
      : null,
      status: false,
    },
  ]);

  const right = filterFields([
    {
      title: "# of claimants",
      value: claimants,
      status: false,
    },
    {
      title: "# of claimants on hold",
      value: claimantsOnHold,
      status: false,
    },
  ]);

  return {
    left,
    right,
    tag,
    caseId,
    id
  }
};

export const headers = [
  {
    label: "Claim ID",
  },
  {
    label: "Name",
  },
  {
    label: "Email",
  },
  {
    label: "Phone",
  },
  {
    label: "OFAC status",
  },
];

export const defaultPagination = {
  page: 0,
  pageSize: 25,
  total: 0,
}
export const defaultClaimData = {
  result: { data: [] },
  pagination: defaultPagination
}

export const useGetClaims = (caseId, ofacId, page, ofacStatus, isValidParams, reload) => {
  return useAPI(
     isValidParams ? () =>
       claimantsApi.getOFACFileClaims(
         {
           caseId,
           ofacId,
           params: "?" + queryString.stringify(trimEmptyParams({ page, ofacStatus })),
         }
       ): null,
     {
       dependencies: [caseId, ofacId, page, isValidParams, reload],
       defaultData: defaultClaimData,
     }
   );
 };

 export const batchActions = ['hold', 'clear'];

 export const actionLabels = {
  'hold': 'Put on hold',
  'clear': 'Clear OFAC file',
};