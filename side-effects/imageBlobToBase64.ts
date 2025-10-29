export const imageBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string) // "data:<mime>;base64,...."
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
