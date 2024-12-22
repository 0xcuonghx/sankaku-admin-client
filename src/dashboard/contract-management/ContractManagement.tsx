import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRecurringExecutionPlans } from "./hooks/useRecurringExecutionPlans";
import { Chip } from "@mui/material";
import { formatUnits } from "viem";

export default function ContractManagement() {
  const { data, isLoading } = useRecurringExecutionPlans();

  const columns: GridColDef[] = [
    { field: "planId", headerName: "Id" },
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
      renderCell: (params) => {
        const type = [1, 2, 3].includes(params.row.planId)
          ? "plus"
          : "infinity";
        return (
          <Chip
            label={type}
            color={type == "infinity" ? "default" : "secondary"}
            size="small"
          />
        );
      },
    },
    {
      field: "active",
      headerName: "Active",
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={params.value.toString()}
          color={params.value ? "primary" : "secondary"}
          size="small"
        />
      ),
    },
  ];

  return (
    <DataGrid
      sx={{ width: "100%" }}
      loading={isLoading}
      autoHeight
      checkboxSelection
      rows={data}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      getRowId={(row) => row.planId}
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
    />
  );
}
