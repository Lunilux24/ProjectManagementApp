export function formatStatus(status) {
  if (!status) return "";
  switch (status) {
    case "in_progress":
      return "In Progress";
    case "complete":
      return "Completed";
    case "ready":
      return "Ready";
    default:
      return status;
  }
}
