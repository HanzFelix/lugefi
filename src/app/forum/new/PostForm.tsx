"use client";

import { RiImageAddFill, RiQuoteText, RiText } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { createPost } from "./CreatePost";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export default function PostForm({
  cloudName,
}: {
  cloudName: string | undefined;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleImageUpload(selectedFile: File | null) {
    if (!selectedFile || !cloudName) return "";

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "lugefi_post_img");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await res.json();
    return result.secure_url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const image_url = await handleImageUpload(file);

    if (!image_url && typeof image_url != "string") {
      alert("Upload failed.");
      setLoading(false);
      return;
    }

    await createPost({ title, description, image_url });
    setLoading(false);
  }
  return (
    <>
      <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
        <h2>New post</h2>
        <div className="flex flex-row-reverse items-start gap-2">
          <Input
            id="title"
            name="title"
            value={title}
            required
            placeholder="Enter title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            className="peer-user-invalid:text-cred text-cmono-50 mt-1"
            htmlFor="title"
          >
            <RiText size={24} className="ml-auto w-8" />
          </label>
        </div>
        <div className="flex flex-row-reverse items-start gap-2">
          <Textarea
            id="description"
            name="description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter body text..."
            className="text-sm"
          />
          <label
            htmlFor="description"
            className="peer-user-invalid:text-cred text-cmono-50 mt-1"
          >
            <RiQuoteText size={24} className="ml-auto w-8" />
          </label>
        </div>
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <RiImageAddFill size={24} className="text-cmono-50 ml-auto w-8" />
          </div>
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setFile(f ?? null);

              if (!f) {
                e.target.setCustomValidity("");
                e.target.reportValidity();
                setPreviewUrl(null);
                return;
              }

              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
              };
              reader.readAsDataURL(f);

              if (f.size > 5 * 1024 * 1024) {
                e.target.setCustomValidity("Image must be under 5 MB");
              } else {
                e.target.setCustomValidity("");
              }

              e.target.reportValidity();
            }}
            placeholder="Image attachment is unavailable for now"
            className="text-sm"
          />
        </div>
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Create Post"}
          </Button>
        </div>
      </form>
      <div className="w-full md:w-1/3 lg:w-1/4">
        {previewUrl ? (
          <picture>
            <img
              src={previewUrl}
              className="bg-cmono-25 block aspect-2/3 w-full object-contain"
              alt=""
              width={200}
              height={300}
            />
          </picture>
        ) : (
          <div className="bg-cmono-25 aspect-2/3 w-full"></div>
        )}
      </div>
    </>
  );
}
