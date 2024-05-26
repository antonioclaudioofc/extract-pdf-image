"use client";
import { useState } from "react";

export default function FileUploadForm() {
  const [downloadUrl, setDownloadUrl] = useState("");
  async function handleFileUpload(form: React.ChangeEvent<HTMLInputElement>) {
    const pdf = form.target.files?.[0];

    if (!pdf) {
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      setDownloadUrl(url);
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  }

  return (
    <>
      <form className="flex flex-col items-center justify-center w-full px-12 max-w-5xl">
        <label
          htmlFor="file-upload"
          className="w-full py-20 px-4 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg text-center cursor-pointer"
          // onDrop={handleDrop}
          // onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded mt-2">
            Escolher arquivos
          </span>
          <p className="mt-2 text-gray-500">... ou solte arquivos aqui</p>
        </label>
      </form>
      {downloadUrl && (
        <a
          className="inline-block p-4 bg-blue-500 text-white rounded mt-12"
          href={downloadUrl}
          download="output.zip"
        >
          Download das images
        </a>
      )}
    </>
  );
}
