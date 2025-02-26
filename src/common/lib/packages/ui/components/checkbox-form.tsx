'use client'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Checkbox } from '@/ui/checkbox'
import { cn } from '@/common/lib/utils'

interface CheckboxFormProps {
  form: any
  id: string
  label?: string
  description?: string
  className?: string
  onClick?: () => void
}

export const CheckboxForm = (props: CheckboxFormProps) => {
  const { form, id, label, description, className, onClick } = props

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem onClick={onClick}>
          <FormLabel className={cn('flex flex-row items-start justify-between space-x-3 space-y-0 rounded-md', className)}>
            {label && label}

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />

            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormLabel>
        </FormItem>
      )}
    />
  )
}