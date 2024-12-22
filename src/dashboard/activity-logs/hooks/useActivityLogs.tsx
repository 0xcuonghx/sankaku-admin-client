import { useQuery } from "@tanstack/react-query";

export interface ActivityLogResponse {
  data: {
    id: number;
    account: string;
    type:
      | "wallet_created"
      | "token_transferred"
      | "token_received"
      | "recurring_execution_installed"
      | "recurring_execution_uninstalled"
      | "recurring_execution_executed";
    timestamp: number;
    tx_hash: string;
    data: Record<string, any>;
  }[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export default function useActivityLogs({
  page = 0,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  return useQuery<ActivityLogResponse>({
    queryKey: ["activity-logs", page, limit],
    queryFn: () =>
      fetch(
        `http://194.233.67.165:3400/activity-logs?page=${
          page + 1
        }&limit=${limit}`
      ).then((res) => res.json()),
  });
}
