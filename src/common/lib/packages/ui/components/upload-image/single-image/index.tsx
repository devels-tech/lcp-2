'use client'

import ImageUploading from 'react-images-uploading'
import { useEffect, useState } from 'react'

import type { IUploadImageProps, ImageListType, onChangeImage } from '../types'
import { convertBytes } from '@/common/lib/utils/converter-bytes'
import { compressImage } from '../handleCompressionImage'

import { UploadImageActions } from './actions'
import { DropImage } from './drop-image'
import { NextImage } from '@/ui/image'
import { Label } from '@/ui/label'

export const UploadImage = (props: IUploadImageProps) => {
  const { edit = true, initialPreview = null, setUploadImage, crossOrigin, format, label, uploadLabel, tabIndexs, disabled, emptyClassName, imageContainerClassName, zoom, compress, download, onRemove, onEdit } = props
  const [localImage, setLocalImage] = useState<ImageListType>(initialPreview ? [{ data_url: initialPreview as string, file: null }] : [])

  const onChangeImage: onChangeImage = async (imageList, addUpdateIndex) => {
    const originalFile = imageList[0]?.file
    const originalDataUrl = imageList[0]?.data_url

    if (!originalFile) {
      setLocalImage([])
      setUploadImage({ original: null, compressed: null })
    }

    setLocalImage(imageList)
    const originalSize = convertBytes(imageList[0]?.file.size)

    if (compress?.resizer && originalFile) {
      const { data_url: compressedUrl, file: compressedFile } = await compressImage({
        resizer: compress?.resizer,
        imageFile: originalFile,
        quality: format?.quality || 10,
        maxWidth: format?.width || 500,
        maxHeight: format?.width || 500,
        compressFormat: format?.extension || 'png',
        rotation: format?.rotation || 0
      })

      const compreesedSize = convertBytes(compressedFile.size)

      setUploadImage({
        original: {
          preview: originalDataUrl as string,
          file: originalFile,
          size: {
            formated: originalSize,
            bytes: imageList[0]?.file.size
          }
        },
        compressed: {
          preview: compressedUrl?.toString() as string,
          file: compressedFile,
          size: {
            formated: compreesedSize,
            bytes: compressedFile.size
          }
        }
      })

      return
    }

    if (onEdit) {
      imageList[0]?.data_url && onEdit({
        data_url: imageList[0]?.data_url as string || null,
        file: imageList[0]?.file || null
      })
    }

    setUploadImage({
      original: {
        preview: imageList[0]?.data_url as string,
        file: imageList[0]?.file,
        size: { formated: originalSize, bytes: imageList[0]?.file.size }
      },
      compressed: null
    })
  }

  const handleOnRemoveImage = (idxImageRemoved: number) => {
    if (idxImageRemoved === undefined || idxImageRemoved === null || !localImage || !localImage.length) {
      return
    }

    onRemove && onRemove(localImage[idxImageRemoved])
  }

  useEffect(() => {
    if (initialPreview) {
      setLocalImage([{ data_url: initialPreview as string, file: null }])
    }
  }, [initialPreview])

  return (
    <div className='w-full h-full'>
      {label && <Label>{label}</Label>}

      {label && <div className='my-2'></div>}

      <ImageUploading
        value={localImage}
        onChange={onChangeImage}
        dataURLKey='data_url'
        acceptType={['webp', 'png', 'jpg', 'jpeg']}
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => {
          return (
            (
              <>
                {
                  (imageList.length >= 1)
                    ? <div>
                      {
                        imageList.map((image, index) => {
                          return (
                            <div key={index} className='imagen-container w-full flex flex-col justify-center items-center relative'>
                              <NextImage
                                zoom={zoom}
                                src={image?.data_url}
                                crossOrigin={crossOrigin}
                                containerClassName={imageContainerClassName}
                              />

                              <UploadImageActions
                                edit={edit}
                                imageIndex={index}
                                compress={compress}
                                disabled={disabled}
                                download={download}
                                tabIndexs={tabIndexs}
                                src={image?.data_url}
                                onImageRemove={onImageRemove}
                                onImageUpdate={onImageUpdate}
                                setLocalImage={setLocalImage}
                                setUploadImage={setUploadImage}
                                handleOnRemove={handleOnRemoveImage}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                    : <>
                      <DropImage
                        dragProps={dragProps}
                        emptyClassName={emptyClassName}
                        isDragging={isDragging}
                        onImageUpload={onImageUpload}
                        tabIndexs={tabIndexs}
                        uploadLabel={uploadLabel}
                        disabled={disabled}
                      />
                    </>
                }
              </>
            )
          )
        }}
      </ImageUploading>
    </div>
  )
}
