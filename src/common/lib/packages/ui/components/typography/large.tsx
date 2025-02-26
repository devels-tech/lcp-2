import React from 'react'

import { cn } from '@/common/lib/utils'

interface TypographyLargeProps extends React.ComponentPropsWithoutRef<'div'> { }

export const TypographyLarge = ({ className, ...props }: TypographyLargeProps) => {
  return (
    <div
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}
