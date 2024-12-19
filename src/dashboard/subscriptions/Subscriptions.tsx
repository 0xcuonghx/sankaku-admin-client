import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { Chip } from "@mui/material";
import useSubscriptions, {
  SubscriptionResponse,
} from "./hooks/useSubscriptions";
import { formatUnits, parseUnits } from "viem";

export default function Subscriptions() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const { isLoading, data } = useSubscriptions({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  });

  const columns: GridColDef<SubscriptionResponse["data"][0]>[] = [
    {
      field: "account",
      headerName: "Account",
      flex: 1.5,
      minWidth: 400,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value == "active" ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "basis",
      headerName: "Basis",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value == "weekly"
              ? "default"
              : params.value == "monthly"
              ? "warning"
              : "secondary"
          }
          size="small"
        />
      ),
    },
    {
      field: "receiver",
      headerName: "Receiver",
      flex: 1.5,
      renderCell: (params) =>
        `${params.value.slice(0, 10)}...${params.value.slice(-8)}`,
    },
    {
      field: "token",
      headerName: "Token",
      flex: 0.5,
      valueGetter: (params) => "USDC",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueGetter: (value) => formatUnits(value, 6).toString(),
      renderCell: (params) => `${params.value}$`,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value == "infinity" ? "default" : "secondary"}
          size="small"
        />
      ),
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
      getRowId={(row) => row.account}
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
