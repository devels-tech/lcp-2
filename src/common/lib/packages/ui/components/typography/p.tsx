import React from 'react'

import { cn } from '@/common/lib/utils'

interface PProps extends React.ComponentPropsWithoutRef<'p'> { }

export const P = ({ className, ...props }: PProps) => {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  )
}
