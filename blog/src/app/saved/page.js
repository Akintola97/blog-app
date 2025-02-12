import SavedBlogs from "@/components/SavedBlogs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Saved() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();


  return (
    <>
      <SavedBlogs isUserAuthenticated={isUserAuthenticated} />
    </>
  );
}
