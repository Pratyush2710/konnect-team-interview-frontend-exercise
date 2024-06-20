import { formatTimeAgo } from "@vueuse/core";

/**
 * Formats the timstamp to human-readable approximated string (e.g 2 months ago)
 *
 * @param  updated_at - The timestamp string in a format supported by the Date constructor.
 * @returns - A human-readable time difference string (e.g., "2 minutes ago").
 */
export const getFormattedTime = (updated_at: string): string => {
  console.log(updated_at);
  return formatTimeAgo(new Date(updated_at));
};
