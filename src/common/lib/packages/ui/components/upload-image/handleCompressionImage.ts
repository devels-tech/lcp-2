'use client'

import FileResizer from 'react-image-file-resizer'

const dataURItoFile = (dataURI: string, filename: string): File => {
  const arr = dataURI.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)

  if (!mimeMatch) {
    throw new Error('Invalid data URI')
  }

  const mime = mimeMatch[1]
  const bstr = atob(arr[1])
  const buffer = new ArrayBuffer(bstr.length)
  const u8arr = new Uint8Array(buffer)

  for (let i = 0; i < bstr.length; i++) {
    u8arr[i] = bstr.charCodeAt(i)
  }

  return new File([buffer], filename, { type: mime })
}

interface IHandleCompressionImageParams {
  imageFile: File
  quality: number
  maxWidth?: number
  rotation?: number
  minWidth?: number
  maxHeight?: number
  minHeight?: number
  outputType?: string
  compressFormat?: string
  resizer: typeof FileResizer
}

export const compressImage = ({
  resizer,
  imageFile,
  maxWidth = 1080, // Nueva resolución horizontal
  maxHeight = 720, // Nueva resolución vertical
  compressFormat = 'png', // Formato de salida (JPEG, PNG, WEBP)
  quality = 80, // Calidad de compresión (0-100)
  rotation = 0, // Rotación en grados (0, 90, 180, 270)
  outputType = 'base64'
}: IHandleCompressionImageParams): Promise<{ data_url: string | Blob | File | ProgressEvent<FileReader>, file: File }> => {
  return new Promise((resolve) => {
    resizer?.imageFileResizer(
      imageFile,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      async (uri) => {
        const file = dataURItoFile(uri?.toString(), imageFile.name)
        resolve({ data_url: uri, file })
      },
      outputType
    )
  })
}
