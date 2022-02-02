import Signup from "../components/Signup";
import Layout from "../components/Layout";

export default function SignupPage() {
  return (
    <div>
      <Layout page="signup" title="Create An User">
        <Signup />
      </Layout>
    </div>
  );
}
