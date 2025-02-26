import type { ReactNode } from 'react'

interface Pagination {
  page: number
  count: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ITableFilterOption {
  id: string
  label: string
  value: string | boolean | number
  icon?: ReactNode
  selected?: boolean
}

export type DataProperty<Type> = {
  [Property in keyof Type as Exclude<Property, '__typename'>]: Type[Property]
}

export interface ITableColumn<TDataSchema> {
  id: keyof DataProperty<TDataSchema> | 'actions' | 'select' | 'multi-select'
  label: string
  filters?: ITableFilterOption[]
  isQuery?: boolean
  render?: (item: DataProperty<TDataSchema>) => ReactNode
}

export interface DataTableSubmitParams<TData = any> {
  pagination: {
    limit: number
    page: number
  }
  search?: Record<string, string>
  filters?: Record<string, string[]>
  selectedRows?: TData[]
}

export type DataTableSubmit<TData = any> = (params: DataTableSubmitParams<TData>) => Promise<void>

export interface DataTableProps<TData> {
  columns: ITableColumn<TData>[]
  data: TData[]
  loading: boolean
  pagination: Partial<Pagination>
  selection?: boolean
  onSubmit: DataTableSubmit<TData>
}
