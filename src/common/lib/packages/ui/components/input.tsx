import { forwardRef, ReactNode } from 'react'

import { validateInputIconClassNames } from '../lib/utils/validate-input-icon-classnames'
import { cn } from '@/common/lib/utils'

import { Skeleton } from './skeleton'
import { Label } from './label'

interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  icon?: ReactNode
  loading?: boolean
  description?: string
  classNameContainer?: string
  iconDirection?: 'left' | 'right'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, classNameContainer, type, label, description, icon, iconDirection, loading, ...props }, ref) => {

    if (loading) {
      return (
        <div className={cn('w-full', classNameContainer)}>
          <div className='flex justify-start items-end'>
            {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
          </div>

          {description && <Skeleton className='h-5 w-full max-w-[150px] my-2' />}

          <div className='relative'>
            <Skeleton
              className={cn(validateInputIconClassNames({ iconDirection, icon, type }), 'w-full h-9 mt-2')}
            />
          </div>
        </div>
      )
    }

    return (
      <div className='w-full'>
        <div className='flex flex-col justify-start items-start'>
          {label && <Label className='font-semibold'>{label}</Label>}
        </div>

        {description && (<p className='text-xs text-muted-foreground'>{description}</p>)}

        <div className='my-2'></div>

        <div className='relative'>
          {
            (iconDirection === 'left' && icon) && (
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                {icon}
              </div>
            )
          }

          <input
            ref={ref}
            type={type}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              validateInputIconClassNames({ iconDirection, icon, type }),
              className
            )}
            {...props}
          />

          {
            (iconDirection === 'right' && icon) && (
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                {icon}
              </div>
            )
          }
        </div>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
