export async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
  try {
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.statusText}`);
    }

    const blob = await response.blob();

    const fileName = `${crypto.randomUUID()}`;
    const mimeType = blob.type || "application/octet-stream";
    const extension = mimeType.split("/")[1] || "bin";

    return new File([blob], `${fileName}.${extension}`, { type: mimeType });
  } catch (error) {
    console.error("Error converting Blob URL to File:", error);
    throw error;
  }
}
