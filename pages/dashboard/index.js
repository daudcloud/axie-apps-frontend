import { useRouter } from "next/router";
import UserAddress from "../../components/UserAddress";

export default function AddressPage() {
  const router = useRouter();
  const { address } = router.query;
  return (
    <UserAddress address={address} page="profile" title="AxFinity | Profile" />
  );
}
