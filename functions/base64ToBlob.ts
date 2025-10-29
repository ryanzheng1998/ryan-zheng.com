export function base64ToBlob(base64: string, mimeType = 'image/png') {
  const byteString = atob(base64.split(',')[1]!) // decode base64
  const arrayBuffer = new ArrayBuffer(byteString.length)
  const uint8Array = new Uint8Array(arrayBuffer)

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: mimeType })
}
