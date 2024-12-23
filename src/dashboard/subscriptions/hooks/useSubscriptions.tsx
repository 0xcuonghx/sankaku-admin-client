import { useQuery } from "@tanstack/react-query";
import { INDEXER_BASE_URL } from "../../../utils/constants";

export interface SubscriptionResponse {
  data: {
    account: string;
    planId: number;
    last_execution_timestamp: number;
    next_execution_timestamp: number;
    basis: "weekly" | "monthly" | "six-monthly";
    receiver: string;
    token: string;
    amount: string;
    status: "active" | "inactive";
    type: "plus" | "infinity";
  }[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
export default function useSubscriptions({
  page = 0,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  return useQuery<SubscriptionResponse>({
    queryKey: ["subscriptions", page, limit],
    queryFn: () =>
      fetch(
        `${INDEXER_BASE_URL}/subscriptions?page=${page + 1}&limit=${limit}`
      ).then((res) => res.json()),
  });
}
