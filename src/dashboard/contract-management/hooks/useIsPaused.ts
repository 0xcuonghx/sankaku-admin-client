import { useReadContract } from "wagmi";
import { RECURRING_EXECUTOR_CONTRACT_ADDRESS } from "../../../utils/constants";
import { parseAbi } from "viem";

export default function useIsPaused() {
  return useReadContract({
    address: RECURRING_EXECUTOR_CONTRACT_ADDRESS,
    abi: parseAbi(["function paused() external view returns (bool)"]),
    functionName: "paused",
  });
}
