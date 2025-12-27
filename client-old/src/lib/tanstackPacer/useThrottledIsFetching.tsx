import { useThrottledValue } from "@tanstack/react-pacer";

export function useThrottledIsFetching(
  isFetching: boolean,
  wait: number = 500
) {
  const [throttledIsFetching] = useThrottledValue(isFetching, {
    wait: isFetching ? 0 : wait,
  });

  return throttledIsFetching;
}

