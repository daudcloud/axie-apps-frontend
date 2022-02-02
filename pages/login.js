import Login from "../components/Login";
import Layout from "../components/Layout";

export default function LoginPage() {
  return (
    <div>
      <Layout page="login" title="User Login">
        <Login />
      </Layout>
    </div>
  );
}
