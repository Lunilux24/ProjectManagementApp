import { useState } from "react";

export const useTaskSort = (tasks, searchTitle, searchTasks) => {
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedTasks = () => {
    const copy = searchTitle ? searchTasks() : tasks ? [...tasks] : [];
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
    sortedTasks,
  };
};
