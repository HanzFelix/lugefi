"use client";

import { useEffect, useState } from "react";
import { RiCloseLine, RiPriceTag3Fill } from "@remixicon/react";

interface TagInputProps {
  onChange?: (tags: string[]) => void;
  initialTags?: string[];
  placeholder?: string;
}

export default function TagInput({
  onChange,
  initialTags = [],
  placeholder = "EnterTags...",
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [input, setInput] = useState("");

  useEffect(() => {
    onChange?.(tags);
  }, [tags, onChange]);

  const handleAdd = (tag: string) => {
    const newTag = tag.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
  };

  const handleRemove = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleAdd(input);
      setInput("");
    }
  };

  return (
    <div className="flex gap-2 text-xs">
      <div className="peer-user-invalid:text-cred text-cmono-50 text-xs">
        <RiPriceTag3Fill size={24} className="ml-auto w-6" />
      </div>
      <div className="border-cpurple disabled:border-cmono-50 flex basis-full flex-wrap items-center gap-2 overflow-x-hidden border-l-2 pl-2">
        {tags.map((tag, id) => (
          <div
            key={id}
            className="bg-cmono-25 flex max-w-full items-center pl-1"
          >
            <span className="truncate">#{tag}</span>
            <button
              type="button"
              onClick={() => handleRemove(id)}
              className="hover:text-cred p-1"
            >
              <RiCloseLine size={12} />
            </button>
          </div>
        ))}
        <div className="flex min-w-8 flex-1">
          <span>#</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="placeholder:text-cmono-50 w-full border-0 py-0 focus:outline-0"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
}
