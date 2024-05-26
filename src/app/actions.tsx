// src/app/actions.ts
"use server";

export async function handleFileUpload(form: FormData) {
  const pdf = form.get("pdf");

  if (!pdf) {
    console.log("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("pdf", pdf);

  try {
    const response = await fetch(
      "https://api-extract-pdf-image.onrender.com/upload-pdf",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.zip"); // Customize the filename if needed
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log("File downloaded successfully");
  } catch (error) {
    console.error("Error during file upload and download:", error);
  }
}
