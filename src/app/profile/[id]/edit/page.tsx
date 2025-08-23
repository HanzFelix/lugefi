import { redirect } from "next/navigation";
import { getProfile } from "@/app/actions/profile";
import EditProfileForm from "@/components/form/EditProfile";

export default async function EditProfile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const [p] = await getProfile(id);

  // attempting to edit another user's profile
  if (!p || !p.is_profile_of_user) redirect(`/profile/${id}`);

  return (
    <div className="container mx-auto mt-8 flex flex-col gap-8 px-4 md:flex-row md:gap-4">
      <EditProfileForm username={p.username} profileId={id} />
      <div className="w-full md:w-1/3 lg:w-1/4"></div>
    </div>
  );
}
