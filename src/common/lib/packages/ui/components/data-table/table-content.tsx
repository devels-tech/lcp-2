import { Table, TableBody, TableCell, TableRow } from '@/ui/table'
import { DataTableLoading } from './table-loading'
import { DataTableHeader } from './table-header'
import { DataTableEmpty } from './table-emtpy'

export const DataTableContent = ({ loading, table, flexRender }) => {
  return (
    <Table className='rounded-t-md'>
      <DataTableHeader table={table} flexRender={flexRender} />

      <TableBody>
        {
          loading ? <DataTableLoading />
            : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='bg-white hover:bg-white even:bg-muted even:hover:bg-muted '
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='px-4' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : <DataTableEmpty />
        }
      </TableBody>
    </Table>
  )
}