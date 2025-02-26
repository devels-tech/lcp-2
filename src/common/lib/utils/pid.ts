export const PID_TYPES = {
  VENEZUELAN: { label: 'Venezolano', value: 'VENEZUELAN', key: 'V' },
  PASSPORT: { label: 'Pasaporte', value: 'PASSPORT', key: 'P' },
  JURIDICAL: { label: 'Jurídico', value: 'JURIDICAL', key: 'J' },
  FOREIGN: { label: 'Extranjero', value: 'FOREIGN', key: 'E' },
  GOVERNMENTAL: { label: 'Gubernamental', value: 'GOVERNMENTAL', key: 'G' }
}

export type TCITypesKeys = 'VENEZUELAN' | 'JURIDICAL' | 'FOREIGN' | 'PASSPORT' | 'GOVERNMENTAL'

export const formatPidTypes = (selectedTypes?: TCITypesKeys) => {
  const allCITypes = [
    PID_TYPES.VENEZUELAN,
    PID_TYPES.JURIDICAL,
    PID_TYPES.FOREIGN,
    PID_TYPES.PASSPORT,
    PID_TYPES.GOVERNMENTAL
  ]

  if (!selectedTypes) {
    return allCITypes.map(pidType => ({ label: pidType.key, value: pidType.key.toLowerCase() }))
  }

  const selectedCITypes = allCITypes.filter(pidType => selectedTypes.includes(pidType.key))

  const selectedTypesCIFormated = selectedCITypes.map(pidType => ({ label: pidType.key, value: pidType.key.toLowerCase() }))

  return selectedTypesCIFormated
}
