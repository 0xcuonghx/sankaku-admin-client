import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { Box, Chip, Link, Typography } from "@mui/material";
import useActivityLogs, { ActivityLogResponse } from "./hooks/useActivityLogs";
import { formatUnits } from "viem";
import { LinkOutlined } from "@mui/icons-material";

export default function ActivityLogs() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const { isLoading, data } = useActivityLogs({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  });

  const columns: GridColDef<ActivityLogResponse["data"][0]>[] = [
    {
      field: "id",
      headerName: "Id",
    },
    {
      field: "account",
      headerName: "Account",
      flex: 1,
      renderCell: (params) =>
        `${params.value.slice(0, 10)}...${params.value.slice(-8)}`,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 150,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      minWidth: 200,
      renderCell: (params) => new Date(params.value * 1000).toLocaleString(),
    },
    {
      field: "data",
      headerName: "Data",
      renderCell: (params) => (
        <Typography component="pre" variant="body2">
          {JSON.stringify(params.value, null, 2)}
        </Typography>
      ),
      flex: 1,
    },
    {
      field: "tx_hash",
      headerName: "Detail",
      renderCell: (params) => (
        <Link
          href={`https://amoy.polygonscan.com/tx/${params.value}`}
          target="_blank"
        >
          <LinkOutlined />
        </Link>
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
      rowHeight={150}
      disableRowSelectionOnClick
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
