import { useState } from "react";

export const useProjectSort = (projects) => {
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedProjects = () => {
    const copy = projects ? [...projects] : [];
    const statusOrder = { ready: 0, in_progress: 1, complete: 2 };
    copy.sort((a, b) => {
      let res = 0;
      if (sortKey === "name") {
        res = (a.name || "").localeCompare(b.name || "");
      } else if (sortKey === "status") {
        res = (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      }
      return sortOrder === "asc" ? res : -res;
    });
    return copy;
  };

  return {
    sortKey,
    setSortKey,
    sortOrder,
    toggleSortOrder,
    sortedProjects,
  };
};
