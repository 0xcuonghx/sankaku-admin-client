import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRecurringExecutionPlans } from "./hooks/useRecurringExecutionPlans";
import {
  Box,
  Button,
  Chip,
  Link,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { formatUnits } from "viem";
import {
  AddOutlined,
  PlayCircleOutline,
  StopOutlined,
} from "@mui/icons-material";
import { RECURRING_EXECUTOR_CONTRACT_ADDRESS } from "../../utils/constants";
import PauseConfirmDialog from "./components/PauseConfirmDialog";
import { useState } from "react";
import useIsPaused from "./hooks/useIsPaused";
import UnpauseConfirmDialog from "./components/UnpauseConfirmDialog";

export default function ContractManagement() {
  const { data, isLoading } = useRecurringExecutionPlans();
  const { data: isPaused, error } = useIsPaused();

  const [openPause, setOpenPause] = useState(false);
  const [openUnpause, setOpenUnpause] = useState(false);

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
      renderCell: (params) => <Switch checked={params.value} />,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Information
          </Typography>
          {isPaused ? (
            <Button
              startIcon={<PlayCircleOutline />}
              variant="contained"
              onClick={() => setOpenUnpause(true)}
            >
              Unpause
            </Button>
          ) : (
            <Button
              startIcon={<StopOutlined />}
              variant="contained"
              onClick={() => setOpenPause(true)}
            >
              Pause
            </Button>
          )}
        </div>
        <div>
          <Typography component="p">
            Contract Address:{" "}
            <Link
              href={`https://amoy.polygonscan.com/address/${RECURRING_EXECUTOR_CONTRACT_ADDRESS}`}
              target="_blank"
            >
              {RECURRING_EXECUTOR_CONTRACT_ADDRESS}
            </Link>
          </Typography>
          <Typography>
            Status:{" "}
            <Chip
              label={!isPaused ? "Active" : "Paused"}
              color={!isPaused ? "success" : "error"}
              size="small"
            />
          </Typography>
        </div>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Subscription Plans
          </Typography>
          <Button startIcon={<AddOutlined />} variant="contained">
            Add
          </Button>
        </div>
        <DataGrid
          sx={{ width: "100%" }}
          loading={isLoading}
          autoHeight
          disableRowSelectionOnClick
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
      </Paper>
      <PauseConfirmDialog
        open={openPause}
        onClose={() => setOpenPause(false)}
      />
      <UnpauseConfirmDialog
        open={openUnpause}
        onClose={() => setOpenUnpause(false)}
      />
    </Box>
  );
}
