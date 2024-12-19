import { useQuery } from "@tanstack/react-query";

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
        `http://194.233.67.165:3400/smart-accounts?page=${
          page + 1
        }&limit=${limit}`
      ).then((res) => res.json()),
  });
}
