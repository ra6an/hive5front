import React, { useEffect, useState } from "react";

import classes from "./UsersContainer.module.scss";

// COMPONENTS
import UserCard from "./UserCard";

const UsersContainer = (props) => {
  const [usersRenderer, setUsersRenderer] = useState([]);

  useEffect(() => {
    setUsersRenderer(props.data.map((u) => <UserCard key={u.id} data={u} />));
  }, [props.data]);

  return <div className={classes.container}>{usersRenderer}</div>;
};

export default UsersContainer;
