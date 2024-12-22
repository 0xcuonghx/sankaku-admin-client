import {
  Box,
  Card,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { formatEther } from "viem";
import { useBalance, useReadContract } from "wagmi";

export default function Home() {
  const { data: executorBalance } = useBalance({
    address: "0x924B5E4be3f1D84f4993bAE5ceF3D8Fda1a4634b",
  });

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid2
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
            <CardContent>
              <Typography component="h2" variant="subtitle2" gutterBottom>
                Executor Gas
              </Typography>
              <Stack
                direction="column"
                sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
              >
                <Stack sx={{ justifyContent: "space-between" }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4" component="p">
                      {Number(
                        formatEther(executorBalance?.value || 0n)
                      ).toFixed(4)}{" "}
                      <Typography component="span">POL</Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}
