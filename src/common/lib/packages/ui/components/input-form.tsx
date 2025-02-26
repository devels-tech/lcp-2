'use client'

/* eslint-disable no-unused-expressions */

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'
import { cn } from '@/common/lib/utils'
import { Input } from './input'

import { validateInputIconClassNames } from '../lib/utils/validate-input-icon-classnames'
import { InputFormProps } from '../lib/types/input-form'

export const InputForm = (props: InputFormProps) => {
  const { children, form, id, label, classNameContainer, description, icon, loading: isLoading, iconDirection = 'left', ...rest } = props

  if (isLoading) {
    return (
      <div className={cn('w-full', classNameContainer)}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        {description && <Skeleton className='h-5 w-full max-w-[150px] my-2' />}

        <div className='relative'>
          <Skeleton
            className={cn(validateInputIconClassNames({ iconDirection, icon, type: rest.type }), 'w-full h-9 mt-2')}
          />
        </div>
      </div>
    )
  }

  if (rest.readOnly) {
    return (
      <FormItem className={cn('w-full', classNameContainer)}>
        <div className='flex flex-col justify-start items-start'>
          {label && <FormLabel className='font-semibold'>{label}</FormLabel>}
          <FormMessage />
        </div>

        {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

        <div className='my-2'></div>

        <div className='relative'>
          {
            (iconDirection === 'left' && icon) && (
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                {icon}
              </div>
            )
          }

          <FormControl>
            <Input
              {...rest}
              disabled={rest?.disabled}
              className={cn(validateInputIconClassNames({ iconDirection, icon, type: rest.type }), rest?.className)}
            />
          </FormControl>

          {
            (iconDirection === 'right' && icon) && (
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                {icon}
              </div>
            )
          }
        </div>
      </FormItem>
    )
  }

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className={cn('w-full space-y-0', classNameContainer)}>
          <div className='flex flex-col justify-start items-start'>
            {label && <FormLabel className='font-semibold'>{label}</FormLabel>}
            <FormMessage />
          </div>

          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

          <div className='relative'>
            {
              (iconDirection === 'left' && icon) && (
                <div className='absolute top-1 inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10'>
                  {icon}
                </div>
              )
            }

            <FormControl>
              <Input
                {...field}
                {...rest}
                disabled={rest?.disabled}
                tabIndex={rest?.tabIndex}
                className={cn(validateInputIconClassNames({ iconDirection, icon, type: rest.type }), rest?.className)}
              />
            </FormControl>

            {
              (iconDirection === 'right' && icon) && (
                <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                  {icon}
                </div>
              )
            }
          </div>
        </FormItem>
      )}
    />
  )
}
