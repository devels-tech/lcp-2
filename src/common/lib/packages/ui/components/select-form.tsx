'use client'

import type { ReactNode, HTMLAttributes } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { cn } from '@/common/lib/utils'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'

export interface ISelectItem {
  label: string
  icon?: ReactNode
  value: boolean | string | number
  disabled?: boolean
}

export interface IGenericSelectProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  placeholder?: string
  tabIndex?: number
  items: ISelectItem[]
  id: string
  form: UseFormReturn<any, any, any>
  label?: string
  classNameContainer?: string
  classNameSelect?: string
  classNameGroup?: string
  description?: string
  disabled?: boolean
  loading?: boolean
}

export const SelectForm = ({
  id,
  label,
  defaultValue,
  placeholder,
  description,
  items,
  form,
  tabIndex,
  classNameContainer,
  classNameSelect,
  classNameGroup,
  disabled,
  loading
}: IGenericSelectProps) => {
  if (loading) {
    return (
      <div className={cn('w-full', classNameContainer)}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        {description && <Skeleton className='h-5 w-full max-w-[150px] my-2' />}

        <div className='relative'>
          <Skeleton className='w-full h-9 mt-2' />
        </div>
      </div>
    )
  }

  return (
    <FormField
      control={form.control}
      name={id}
      defaultValue={defaultValue}
      render={({ field, formState }) => (
        <FormItem className={cn('w-full', classNameContainer)}>
          <div className='flex justify-start items-end'>
            {label && <FormLabel className='flex'>{label}</FormLabel>}
            <FormMessage className='text-xs ml-1.5' />
          </div>

          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

          <Select
            onValueChange={(newValue) => newValue && field.onChange(newValue)}
            defaultValue={field.value}
            disabled={disabled}
            value={field?.value}
          >
            <FormControl>
              <SelectTrigger disabled={disabled} tabIndex={tabIndex} className={cn('w-full [&_>_span]:truncate', classNameSelect)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectGroup className={cn('overflow-auto', classNameGroup)}>
                {!items.length ? <div className='px-2 py-1 text-sm'>Sin Resultados</div> : null}

                {
                  items.map(item => (
                    <SelectItem key={item.value?.toString()} value={item.value?.toString()} disabled={item?.disabled}>
                      <div className='flex justify-center items-center'>
                        {
                          item?.icon && (
                            <div className='dark:text-white mr-2 h-5'>
                              {item.icon}
                            </div>
                          )
                        }

                        {item.label}
                      </div>
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}
