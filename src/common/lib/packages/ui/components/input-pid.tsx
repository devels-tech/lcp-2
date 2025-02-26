'use client'
import type { UseFormReturn } from 'react-hook-form'


import { formatPidTypes, PID_TYPES } from '@/common/lib/utils/pid'
import { InputForm } from '@/ui/input-form'
import { ComboBox } from '@/ui/combox/ui'


type TPIDTypesKeys = 'VENEZUELAN' | 'JURIDICAL' | 'FOREIGN' | 'PASSPORT' | 'GOVERNMENTAL'
export type PIDValue = 'v' | 'e' | 'j' | 'g' | 'p'

interface FormatCITypesResult {
  label: string
  value: PIDValue
}

export const formatCITypes = (selectedTypes?: TPIDTypesKeys[]): FormatCITypesResult[] => {
  const allCITypes = [
    PID_TYPES.VENEZUELAN,
    PID_TYPES.FOREIGN,
    PID_TYPES.JURIDICAL,
    PID_TYPES.PASSPORT,
    PID_TYPES.GOVERNMENTAL
  ]

  if (!selectedTypes || selectedTypes.length === 0) {
    return allCITypes.map(ciType => ({
      label: ciType.key,
      value: ciType.key.toLowerCase() as PIDValue
    }))
  }

  const selectedCITypes = allCITypes.filter(ciType => selectedTypes.includes(ciType.value as TPIDTypesKeys))

  const selectedTypesCIFormatted = selectedCITypes.map(ciType => ({
    label: ciType.key,
    value: ciType.key.toLowerCase() as PIDValue
  }))

  return selectedTypesCIFormatted
}


export type TComboxItem = {
  value: string
  label: string
  image?: string
  icon?: React.ReactNode
}

export interface PIDType {
  id?: 'pidType' | string
  tabIndex?: number
  buttonClassName?: string
  popoverClassName?: string
  notFoundLabel?: string
  ctaPlaceholder?: string
  placeholder?: string
  label?: string
  defaultValue?: PIDValue
  items?: TComboxItem[]
  disabled?: boolean
}

export interface PIDNumber {
  id?: 'pidNumber' | string
  tabIndex?: number
  placeholder?: string
  maxLength?: number
  disabled?: boolean
  defaultValue?: string
}

export interface PID {
  type?: PIDType
  number?: PIDNumber
}

export interface PIDProps {
  label: string
  form: UseFormReturn<any, any, any>
  pid?: PID
  format?: boolean
}

const dniDefaultValues: PID = {
  type: {
    id: 'pidType',
    tabIndex: undefined,
    buttonClassName: 'w-[80px]',
    popoverClassName: 'w-[90px]',
    notFoundLabel: 'Codigo No Encontrado',
    ctaPlaceholder: 'Tipo',
    placeholder: 'Buscar...',
    defaultValue: formatCITypes(['VENEZUELAN'])[0].value,
    label: 'Cedula',
    items: formatCITypes(['VENEZUELAN', 'FOREIGN', 'PASSPORT'])
  },
  number: {
    id: 'pidNumber',
    tabIndex: undefined,
    placeholder: '00.000.000',
    maxLength: 10,
    defaultValue: ''
  }
}

export function InputPID({ form, pid: dni = dniDefaultValues, format = true }: PIDProps) {
  const handleOnKeyUpIdentifierNumber = (event) => {
    const { value } = event.target
    const identifierNumberFormmated = format ? formatPidTypes(value) : value
    const formId = dni?.number?.id || dniDefaultValues.number.id
    form.setValue(formId, identifierNumberFormmated)
  }

  return (
    <div className='w-full flex justify-start items-end gap-x-2'>
      <ComboBox
        id={dni?.type?.id || dniDefaultValues.type.id}
        form={form}
        label={dni?.type?.label || dniDefaultValues.type.label}
        items={dni?.type?.items || dniDefaultValues.type.items}
        tabIndex={dni?.type?.tabIndex || dniDefaultValues.type.tabIndex}
        placeholder={dni?.type?.placeholder || dniDefaultValues.type.placeholder}
        defaultValue={dni?.type?.defaultValue || dniDefaultValues.type.defaultValue}
        notFoundLabel={dni?.type?.notFoundLabel || dniDefaultValues.type.notFoundLabel}
        ctaPlaceholder={dni?.type?.ctaPlaceholder || dniDefaultValues.type.ctaPlaceholder}
        buttonClassName={dni?.type?.buttonClassName || dniDefaultValues.type.buttonClassName}
        popoverClassName={dni?.type?.popoverClassName || dniDefaultValues.type.popoverClassName}
        disabled={dni?.type?.disabled}
      />

      <InputForm
        id={dni?.number?.id || dniDefaultValues.number.id}
        form={form}
        type='text'
        defaultValue={dni?.number?.defaultValue}
        onKeyPress={onlyNumbersRegex}
        onKeyUp={handleOnKeyUpIdentifierNumber}
        tabIndex={dni?.number?.tabIndex || dniDefaultValues.number.tabIndex}
        maxLength={dni?.number?.maxLength || dniDefaultValues.number.maxLength}
        placeholder={dni?.number?.placeholder || dniDefaultValues.number.placeholder}
        disabled={dni?.number?.disabled}
      />
    </div>
  )
}

