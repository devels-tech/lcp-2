import * as React from 'react'

import { cn } from '@/common/lib/utils'
import { Label } from './label'

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  label?: string
  loading?: boolean
  description?: string
  classNameContainer?: string
}


const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, classNameContainer, label, description, ...props }, ref) => {
  return (
    <div className={cn('w-full', classNameContainer)}>
      <div className='flex flex-col justify-start items-start'>
        {label && <Label className='font-semibold'>{label}</Label>}
      </div>

      {description && (<p className='text-xs text-muted-foreground'>{description}</p>)}

      <div className='my-2'></div>

      <div className='relative'>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
