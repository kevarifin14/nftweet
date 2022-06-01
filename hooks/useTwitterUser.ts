import useSWR from "swr";
import { findUserById, TwitterResponse } from "twitter-api-sdk/dist/types";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useTwitterUser = (userId: string) => {
  const { data } = useSWR<TwitterResponse<findUserById>>(
    `/api/twitter/users/${userId}`,
    fetcher
  );
  return { data };
};
