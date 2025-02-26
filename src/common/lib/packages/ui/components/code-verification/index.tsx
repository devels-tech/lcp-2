'use client'

import { useState } from 'react'
import PinField, { Props } from 'react-pin-field'

import { cn } from '@/common/lib/utils'

export interface ICodeVerificationProps extends Omit<Props, 'validate'> {
  onComplete: (code: string) => void
  mode: 'numeric' | 'alpha-numeric'
  length: number
  disabled?: boolean
  containerClassName?: string
  format?: (char: string) => string
}

export const CodeVerification = ({ onComplete, mode, length, disabled, tabIndex, autoFocus, containerClassName, className, ...rest }: ICodeVerificationProps) => {
  const [complete] = useState(false)

  return (
    <div className={cn('pin-field-container', containerClassName)}>
      <PinField
        className={cn('pin-field', { complete }, className)}
        onComplete={onComplete}
        // formNoValidate={mode === 'numeric' ? '0123456789' : 'abcABC123'}
        disabled={disabled}
        length={length}
        {...rest}
      />
    </div>
  )
}
