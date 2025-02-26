import { TableCell, TableRow } from '@/ui/table'

export const DataTableEmpty = () => {
  return (
    <TableRow>
      <TableCell className='px-4 py-10 text-center' colSpan={7}>
        <div className='w-full flex flex-col justify-center items-center'>
          <img src='/images/pdvsa-short-logo.png' className='h-16 w-16 mb-1' />
          <span className='font-semibold'>Sin resultados</span>
        </div>
      </TableCell>
    </TableRow>
  )
}