import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { getUserAxies } from "../../fetch-api/getData";
import styles from "./styles/user.module.scss";

const User = ({ setModal, setMenuOpen }) => {
  const [user, setUser] = useUser();
  const [userOption, setUserOption] = useState(false);
  const [userAxies, setUserAxies] = useState([]);
  useEffect(async () => {
    if (user.roninAddress === "") return;
    const _userAxies = await getUserAxies(user);
    setUserAxies(_userAxies);
  }, []);
  const logout = () => {
    setModal(true);
    setMenuOpen(false);
  };
  return (
    <>
      <div className={styles.user} onClick={() => setUserOption(!userOption)}>
        <div className={styles.users}>
          <div className={styles.userImage}>
            {userAxies.length > 0 && (
              <Image
                src={`https://assets.axieinfinity.com/axies/${userAxies[0].id}/axie/axie-full-transparent.png`}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
          <i className="fas fa-sort-down"></i>
        </div>
        {userOption && (
          <ul className={styles.dropdown}>
            <Link href={`/dashboard/${user.roninAddress}`}>
              <a>Dashboard</a>
            </Link>
            <Link href={`/${user._id}/settings`}>
              <a>Settings</a>
            </Link>
            <li onClick={logout}>Logout</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default User;
