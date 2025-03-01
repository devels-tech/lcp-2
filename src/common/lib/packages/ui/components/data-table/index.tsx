'use client'

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState, useEffect, useCallback, useMemo } from 'react'


import { Checkbox } from '@/ui/checkbox'

import { DataTablePagination } from './table-pagination'
import { DataTableFilters } from './table-filters'
import { DataTableContent } from './table-content'

// TODO
export function DataTable<TData>({ columns, data, loading, pagination, selection = false, onSubmit }: any) {
  const [localPagination, setLocalPagination] = useState<Partial<any>>(null)
  const [localSearch, setLocalSearch] = useState<Record<string, string>>({})
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({})
  const [selectedRows, setSelectedRows] = useState<TData[]>([])
  const [openFilters, setOpenFilters] = useState(false)

  const tableColumns: ColumnDef<TData>[] = useMemo(() => [
    ...(selection
      ? [
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checked={table.getRowModel().rows.length > 0 && selectedRows.length === table.getRowModel().rows.length}
              onCheckedChange={(value) => {
                if (value) {
                  setSelectedRows(data)
                } else {
                  setSelectedRows([])
                }
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={selectedRows.some((item) => JSON.stringify(item) === JSON.stringify(row.original))}
              onCheckedChange={(value) => {
                setSelectedRows((prev) => {
                  if (value) {
                    return [...prev, row.original]
                  } else {
                    return prev.filter((item) => JSON.stringify(item) !== JSON.stringify(row.original))
                  }
                })
              }}
            />
          ),
        },
      ]
      : []),
    ...columns.map((column) => ({
      accessorKey: column.id as string,
      header: column.label,
      cell: column.render
        // ? ({ row }) => column.render!(row.original as DataProperty<TData>)
        ? ({ row }) => column.render!(row.original as any)
        : ({ row }) => row.getValue(column.id as string),
    })),
  ], [columns, selectedRows])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onSubmitLocal = useCallback((params) => onSubmit(params), [onSubmit])

  const onSubmitWithPersistence = () => {
    onSubmitLocal({
      pagination: {
        page: localPagination.page || 1,
        limit: localPagination.limit || 10,
      },
      search: localSearch,
      filters: localFilters,
      selectedRows: selection ? selectedRows : undefined,
    })
  }

  useEffect(() => setLocalPagination({ ...pagination, page: pagination?.page || 1 }), [pagination])

  return (
    <div>
      <DataTableFilters
        columns={columns}
        open={openFilters}
        tempSearch={localSearch}
        setOpen={setOpenFilters}
        tempFilters={localFilters}
        setTempSearch={setLocalSearch}
        setTempFilters={setLocalFilters}
        setOpenFilters={setOpenFilters}
        onSubmit={onSubmitWithPersistence}
      />

      <div className='rounded-t-md border'>
        <DataTableContent
          table={table}
          loading={loading}
          flexRender={flexRender}
        />
      </div>

      <DataTablePagination
        loading={loading}
        onSubmit={onSubmitLocal}
        selectedRows={selectedRows}
        selection={selection}
        tempSearch={localSearch}
        tempFilters={localFilters}
        pagination={localPagination}
        setLocalPagination={setLocalPagination}
      />
    </div>
  )
}
