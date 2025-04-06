import SavedBlogs from "@/components/SavedBlogs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Saved() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated){
    redirect('/');
  }

  // return (
    <>
      <SavedBlogs isUserAuthenticated={isUserAuthenticated} />
    </>
  // );
}
