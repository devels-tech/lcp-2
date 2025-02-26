import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'
import { Card } from '@/ui/card'
import { Pagination } from '@/common/lib/types'
import { Dispatch, SetStateAction } from 'react'
import { Skeleton } from '../skeleton'

interface DataTablePaginationProps {
  loading: boolean
  pagination: Partial<Pagination>
  setLocalPagination: Dispatch<SetStateAction<Partial<Pagination>>>
  tempSearch: Record<string, string>
  tempFilters: Record<string, string>
  onSubmit: (params: any) => void
  selectedRows: any[]
  selection: boolean
}

export const DataTablePagination = ({ loading, tempSearch, tempFilters, selection, selectedRows, onSubmit, pagination, setLocalPagination }: DataTablePaginationProps) => {
  // TODO: refactor onSubmit

  const onChangeLimit = (value: string) => {
    setLocalPagination({ ...pagination, limit: Number(value) })

    const payload = {
      search: tempSearch,
      filters: tempFilters,
      pagination: {
        limit: Number(value) || 10,
        page: pagination?.page || 1
      },
    }

    Object.assign(
      payload,
      selection && { selectedRows }
    )

    onSubmit(payload as any)
  }

  const onChangeNextPage = () => {
    const incrementedPage = pagination.page + 1

    setLocalPagination(prev => ({ ...pagination, page: incrementedPage }))

    const payload = {
      search: tempSearch,
      filters: tempFilters,
      pagination: {
        limit: pagination.limit || 10,
        page: incrementedPage
      },
    }

    Object.assign(
      payload,
      selection && { selectedRows }
    )

    onSubmit(payload as any)
  }

  const onChangePrevPage = () => {
    const decrementedPage = pagination.page - 1
    setLocalPagination(prev => ({ ...pagination, page: decrementedPage }))

    const payload = {
      search: tempSearch,
      filters: tempFilters,
      pagination: {
        limit: pagination.limit || 10,
        page: decrementedPage
      },
    }

    Object.assign(
      payload,
      selection && { selectedRows }
    )

    onSubmit(payload as any)
  }

  if (loading || !pagination) {
    return (
      <div className='w-full flex justify-end items-center'>
        <Card className='w-fit flex items-center justify-between space-x-2 border-none rounded-sm py-1 px-4 mt-2'>
          <Skeleton className='w-16 h-7' />

          <div className='space-x-2 flex justify-end items-center'>
            <Skeleton className='w-10 h-8' />
            <Skeleton className='w-16 h-7' />
            <Skeleton className='w-10 h-8' />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className='w-full flex justify-end items-center'>
      <Card className='w-fit flex items-center justify-between space-x-2 border-none rounded-sm py-1 px-4 mt-2'>
        <div className='text-sm flex justify-start items-center space-x-2'>
          <Label className='text-xs'>Limite</Label>

          <Select defaultValue={String(pagination.limit)} onValueChange={(value) => onChangeLimit(value)}>
            <SelectTrigger className='w-fit h-fit px-2 py-1 text-xs'>
              <SelectValue defaultValue='10' className='w-fit h-fit text-xs' />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='15'>15</SelectItem>
              <SelectItem value='20'>20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-x-2 flex justify-end items-center'>
          <Button
            variant='outline'
            className='w-fit h-fit p-1'
            onClick={onChangePrevPage}
            disabled={!pagination.hasPrevPage || loading}
          >
            <ChevronLeft size={20} />
          </Button>

          <span className='text-xs'>
            Pagina {pagination.page}
          </span>

          <Button
            className='w-fit h-fit p-1'
            variant='outline'
            onClick={onChangeNextPage}
            disabled={!pagination.hasNextPage || loading}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </Card>
    </div>
  )
}