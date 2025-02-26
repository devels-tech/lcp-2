import React from 'react'

import { cn } from '@/common/lib/utils'

interface InlineCodeProps extends React.ComponentPropsWithoutRef<'code'> { }

export const InlineCode = ({ className, ...props }: InlineCodeProps) => {
  return (
    <code
      className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', className)}
      {...props}
    />
  )
}
