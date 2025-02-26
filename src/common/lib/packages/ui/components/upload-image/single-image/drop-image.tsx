'use client'

import React from 'react'

import { Button } from '../../button'
import { ImagePlus } from 'lucide-react'
import { cn } from '@/common/lib/utils'

export const DropImage = ({ dragProps, isDragging, emptyClassName, tabIndexs, uploadLabel, disabled, onImageUpload }) => {
  return (
    <div
      {...dragProps}
      className={cn(
        `${isDragging ? 'border-indigo-600' : 'border-gray-300'}`,
        'h-[250px] mt-1 flex flex-col justify-center items-center px-6 pt-5 pb-6 border-2 border-dashed border-muted-foreground rounded-md text-center',
        emptyClassName
      )}
    >

      <Button
        size='icon'
        type='button'
        variant='outline'
        tabIndex={tabIndexs?.upload}
        disabled={disabled}
        className={cn('mt-2', isDragging && 'text-indigo-600', disabled && 'cursor-not-allowed')} onClick={onImageUpload}
      >
        <ImagePlus size={24} />
      </Button>

      {!disabled && <span className='font-normal text-sm text-zinc-500'>o arrastra y suelta una imagen</span>}
    </div>
  )
}
