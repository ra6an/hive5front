import React from "react";

import classes from "./RandomUserProfiles.module.scss";

// COMPONENTS
import UsersContainer from "../users/UsersContainer";

const DUMMY_DATA = [
  {
    id: "84f11c0c-5352-4584-a020-a1a2712c8ad2",
    username: "ra6an2",
    createdAt: "2025-02-10T22:33:48.414775",
    role: "USER",
  },
  {
    id: "84f11c3c-5352-4584-a020-a1a2712c8ad2",
    username: "ra6an4",
    createdAt: "2024-02-10T22:33:48.414775",
    role: "USER",
  },
  {
    id: "84f11c3c-5352-4584-a020-a1a2772c8ad2",
    username: "ra6an3",
    createdAt: "2023-02-10T22:33:48.414775",
    role: "USER",
  },
  {
    id: "84f21c3c-5352-4584-a020-a1a2712c8ad2",
    username: "ra6an5",
    createdAt: "2024-01-10T22:33:48.414775",
    role: "USER",
  },
];

const RandomUserProfiles = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>{`Meet New People`}</h2>
        <div className={`primary-bg ${classes.horizontal}`} />
      </div>
      <UsersContainer data={DUMMY_DATA} />
    </div>
  );
};

export default RandomUserProfiles;
