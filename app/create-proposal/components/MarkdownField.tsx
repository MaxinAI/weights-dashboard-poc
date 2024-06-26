"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import "@/app/styles/custom-mde.css";
import Image from "next/image";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MarkdownField({
  id,
  title,
  desc,
  placeholder,
  removable = false,
  onClick,
}: {
  id: string;
  title: string;
  desc: string;
  placeholder: string;
  removable?: boolean;
  onClick?: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditorChange = (value: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  };

  return (
    <div className="flex flex-col mt-5">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-1">
          <label htmlFor={id}>{title}</label>
          <button
            type="button"
            className={`cursor-pointer hover:scale-110 ${
              removable ? "" : "hidden"
            }`}
            onClick={onClick}
          >
            <Image src="/bin.svg" alt="bin" width={24} height={24} />
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
      </div>

      {/* Editor */}
      <SimpleMDE
        onChange={handleEditorChange}
        options={{
          placeholder: placeholder,
          spellChecker: false,
          hideIcons: ["fullscreen", "side-by-side"],
        }}
      />

      {/* Hidden textarea which maps the editor value */}
      <textarea
        ref={textareaRef}
        name={id}
        id={id}
        className="hidden"
      ></textarea>
    </div>
  );
}
