import { formatTimeAgo } from "@vueuse/core";

export const getFormattedTime = (updated_at: string): string => {
  console.log(updated_at);
  return formatTimeAgo(new Date(updated_at));
};
