import { useQuery } from "@tanstack/react-query";
import { INDEXER_BASE_URL } from "../../../utils/constants";

interface SmartAccountResponse {
  data: {
    owner: string;
    account: string;
    salt: string;
  }[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
export default function useSmartAccounts({
  page = 0,
  limit = 10,
}: { page?: number; limit?: number } = {}) {
  return useQuery<SmartAccountResponse>({
    queryKey: ["smart-accounts", page, limit],
    queryFn: () =>
      fetch(
        `${INDEXER_BASE_URL}/smart-accounts?page=${page + 1}&limit=${limit}`
      ).then((res) => res.json()),
  });
}
