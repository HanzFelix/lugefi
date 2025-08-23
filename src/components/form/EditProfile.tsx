"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RiAtFill } from "@remixicon/react";
import { useRef, useState } from "react";
import {
  checkUsernameAvailability,
  updateProfile,
} from "@/app/actions/profile";
import { redirect } from "next/navigation";

export default function EditProfileForm({
  username,
  profileId,
}: {
  username: string;
  profileId: number;
}) {
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const newUsernameRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const input = newUsernameRef.current;
    if (!input) return;

    setLoading(true);
    input.setCustomValidity("");
    const isUnique = await checkUsernameAvailability(newUsername);

    if (!isUnique) {
      input.setCustomValidity("Username is already taken");
      input.reportValidity();
      setLoading(false);
      return;
    }

    const isSuccess = await updateProfile(newUsername);
    if (isSuccess) redirect(`/profile/${profileId}`);

    setLoading(false);
  }
  return (
    <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
      <p>Edit Profile</p>
      <div className="flex flex-row-reverse items-start gap-2">
        <Input
          id="username"
          name="username"
          value={newUsername}
          required
          ref={newUsernameRef}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
          className="text-sm"
          placeholder="Enter title..."
        />
        <label
          className="peer-user-invalid:text-cred text-cmono-50 mt-0.5"
          htmlFor="title"
        >
          <RiAtFill size={24} className="ml-auto w-8" />
        </label>
      </div>
      <div className="mt-2 flex justify-end">
        <Button type="submit" disabled={loading}>
          Update Profile
        </Button>
      </div>
    </form>
  );
}
