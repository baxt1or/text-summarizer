"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface SummaryResponse {
  summary: string;
}

const Summarizer = () => {
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data: SummaryResponse = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError("An error occurred while summarizing the text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 w-full px-10 mb-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between px-8">
          <h1 className="text-center text-black font-medium text-md">Text</h1>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full text-white bg-yellow-500 p-2 px-3 cursor-pointer text-xs"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </div>
        <textarea
          onChange={handleTextChange}
          placeholder="Place your text here"
          className="rounded-xl border  placeholder:font-light placeholder:text-gray-500 px-4 py-3 text-md font-light"
          rows={24}
          cols={50}
        />
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex flex-col gap-y-2">
        <h1 className="text-center text-black font-medium text-lg">Summary</h1>
        {summary && (
          <div className="p-2">
            <p className="text-md text-center font-light">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summarizer;
