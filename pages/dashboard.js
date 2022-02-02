import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";

export default function DashboardPage() {
  return (
    <div>
      <Layout page="dashboard" title="Dashboard">
        <Dashboard />
      </Layout>
    </div>
  );
}
