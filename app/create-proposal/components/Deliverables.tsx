"use client";

import { useState } from "react";
import MarkdownField from "./MarkdownField";

export default function Deliverables() {
  const [numberOfDeliverables, setNumberOfDeliverables] = useState(1);

  const addDeliverable = () => {
    setNumberOfDeliverables((prev) => prev + 1);
  };

  const removeDeliverable = () => {
    setNumberOfDeliverables((prev) => prev - 1);
  };

  return (
    <div className="w-full">
      {Array.from({ length: numberOfDeliverables }).map((_, index) => (
        <div key={index} className="flex flex-col -mt-7">
          <MarkdownField
            id={`deliverable-${index}`}
            title={`Deliverable ${index + 1}`}
            desc="Deliverable should include its description, success criteria, time to complete, and any other relevant information."
            placeholder="Describe the deliverable here..."
            removable={index > 0 && index === numberOfDeliverables - 1}
            onClick={removeDeliverable}
          />
        </div>
      ))}

      <button
        type="button"
        className="bg-gray-800 p-2 font-semibold px-5 rounded mb-3 cursor-pointer hover:bg-gray-700"
        onClick={addDeliverable}
      >
        Add Deliverable
      </button>
    </div>
  );
}
