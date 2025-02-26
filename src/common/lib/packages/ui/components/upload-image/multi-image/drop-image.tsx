'use client'

import { ImagePlus } from 'lucide-react'

import { Button } from '@/ui/button'
import { cn } from '@/common/lib/utils'

export const DropMultipleImages = ({ dragProps, isDragging, emptyClassName, tabIndexs, uploadLabel, disabled, onImageUpload }) => {
  return (
    <div
      {...dragProps}
      className={cn(
        `${isDragging ? 'border-indigo-600' : 'border-muted-foreground'}`,
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
        className={`mt-2 ${isDragging && 'text-indigo-600'}`} onClick={onImageUpload}
      >
        <ImagePlus size={24} />
      </Button>
      {!disabled && <span className='font-normal text-sm text-zinc-500'>o arrastra y suelta una imagen</span>}
    </div>
  )
}
