import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  const { data: session, status } = useSession();

  if (status === "loading") return "loading";
  if (user || (session && session.user)) return true;
  return false;
}
