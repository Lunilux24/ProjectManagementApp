import { useState } from "react";

export const useTaskSearch = (tasks) => {
  const [searchTitle, setSearchTitle] = useState("");

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchTasks = () => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchTitle.toLowerCase())
    );
  };

  return {
    searchTitle,
    onChangeSearchTitle,
    searchTasks,
  };
};
