import { useRouter } from "next/router";
import Dashboard from "../components/UserAddress";

export default function AddressPage() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <Dashboard address={address} page="profile" title="AxFinity | Profile" />
  );
}
