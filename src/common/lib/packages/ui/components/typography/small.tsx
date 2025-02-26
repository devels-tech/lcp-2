import React from 'react'

import { cn } from '@/common/lib/utils'

interface SmallProps extends React.ComponentPropsWithoutRef<'small'> { }

export const Small = ({ className, ...props }: SmallProps) => {
  return (
    <small
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    />
  )
}
