import { useUser } from "../../contexts/UserContext";

const Dashboard = () => {
  const [user, setUser] = useUser();
  return <>{user ? <h1>{`${user.firstName} ${user.lastName}`}</h1> : null}</>;
};

export default Dashboard;
