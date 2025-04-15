import { formatDistance, formatRelative, format } from "date-fns";

export function formatTimestamp(timestamp, type = "distance") {
  if (!timestamp || !timestamp.toDate) return "Just now";

  const date = timestamp.toDate();

  switch (type) {
    case "distance":
      return formatDistance(date, new Date(), { addSuffix: true });
    case "relative":
      return formatRelative(date, new Date());
    case "full":
      return format(date, "MMMM dd, yyyy h:mm a");
    default:
      return formatDistance(date, new Date(), { addSuffix: true });
  }
}
