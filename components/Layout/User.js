import { useState } from "react";
import styles from "./styles/user.module.scss";

const User = ({ logout, user }) => {
  const [userOption, setUserOption] = useState(false);
  console.log(user);
  return (
    <>
      <div className={styles.user} onClick={() => setUserOption(!userOption)}>
        <div className={styles.userImage}></div>
        <i className="fas fa-sort-down"></i>
        {userOption && (
          <ul>
            <li>{user.firstName}</li>
            <li onClick={logout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default User;
