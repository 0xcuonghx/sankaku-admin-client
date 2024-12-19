import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import useSmartAccounts from "./hooks/useSmartAccounts";
import { useCallback, useState } from "react";

export default function SmartAccount() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const { isLoading, data } = useSmartAccounts({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  });

  const columns = [
    { field: "owner", headerName: "Owner", flex: 1 },
    {
      field: "account",
      headerName: "Smart Accounts",
      flex: 1,
    },
  ];

  const onPaginationModelChange = useCallback<
    NonNullable<DataGridProps["onPaginationModelChange"]>
  >((model) => {
    setPaginationModel(model);
  }, []);

  const rows = data?.data;

  return (
    <DataGrid
      sx={{ width: "100%" }}
      pagination
      loading={isLoading}
      autoHeight
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      getRowId={(row) => row.owner + row.account}
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
      onPaginationModelChange={onPaginationModelChange}
      rowCount={data?.total}
      paginationMode="server"
      paginationModel={paginationModel}
    />
  );
}
