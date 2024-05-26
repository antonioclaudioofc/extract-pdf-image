import FileUploadForm from "./FileUploadForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-2">Extrair imagens de PDF</h1>
      <h2 className="text-lg mb-6">Extrai todas as imagens de arquivos PDF</h2>
      <FileUploadForm />
    </main>
  );
}
