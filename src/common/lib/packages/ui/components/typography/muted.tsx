import React from 'react'

import { cn } from '@/common/lib/utils'

interface TypographyMutedProps extends React.ComponentPropsWithoutRef<'p'> { }

export const TypographyMuted = ({ className, ...props }: TypographyMutedProps) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
