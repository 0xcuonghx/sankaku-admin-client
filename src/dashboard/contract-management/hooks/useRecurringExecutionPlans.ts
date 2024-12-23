import { useReadContracts } from "wagmi";
import { parseAbi } from "viem";
import { RECURRING_EXECUTOR_CONTRACT_ADDRESS } from "../../../utils/constants";

export const useRecurringExecutionPlans = () => {
  const contracts = Array.from({ length: 6 }).map((_, i) => ({
    abi: parseAbi([
      "function recurringExecutionPlanOf(uint256 planId) public view returns (uint8, address, address, uint256, bool)",
    ]),
    functionName: "recurringExecutionPlanOf",
    address: RECURRING_EXECUTOR_CONTRACT_ADDRESS as `0x${string}`,
    args: [BigInt(i + 1)],
  }));

  const { data = [], ...rest } = useReadContracts({
    contracts,
  });

  const plans = data
    .filter((plan) => plan.status === "success")
    .map((plan, i) => ({
      planId: i + 1,
      basis: parsedPlan(plan.result[0]),
      receiver: plan.result[1],
      token: plan.result[2],
      amount: plan.result[3],
      active: plan.result[4],
    }));

  return { data: plans, ...rest };
};

const parsedPlan = (basis: number) => {
  switch (basis) {
    case 0:
      return "weekly";
    case 1:
      return "monthly";
    case 2:
      return "six-monthly";
  }
};
