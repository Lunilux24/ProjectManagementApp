import { useState } from "react";
import ProjectDataService from "../services/project.service";

export const useProjectSearch = (setProjects) => {
  const [searchTitle, setSearchTitle] = useState("");

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const searchTitleFunc = () => {
    ProjectDataService.findByName(searchTitle)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    searchTitle,
    onChangeSearchTitle,
    searchTitleFunc,
  };
};
