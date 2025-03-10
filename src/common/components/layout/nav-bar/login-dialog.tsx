'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { User } from 'lucide-react'

import { ILogin, loginSchema } from '@/common/lib/schema/auth'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/ui/dialog'
import { InputForm } from '@/ui/input-form'
import { Button } from '@/ui/button'
import { Form } from '@/ui/form'

export function LoginDialog () {
  const form = useForm<ILogin>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: ILogin) => {
    console.log({ data })
  }

  return (
    <Dialog>
      <DialogTrigger className='cursor-pointer bg-white shadow border border-zinc-300 w-fit h-fit p-3 rounded-full'>
        <User size={18} />
        {/* <Image
          src=''
          imageClassName='w-12 h-12'
          containerClassName='h-12 w-12 p-4 rounded-full '
        /> */}
      </DialogTrigger>

      <DialogContent className='max-w-96 bg-white'>
        <DialogHeader>
          <DialogTitle>Iniciar Sesión</DialogTitle>
          <DialogDescription>
            Inicia sesion como miembro de La Casa de mi Padre
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
            <InputForm
              form={form}
              id='email'
              type='email'
              label='Correo Electrónico'
              placeholder='usuario@correo.com'
            />
            <InputForm
              form={form}
              id='password'
              type='password'
              label='Contraseña'
              placeholder='***********'
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline' className='w-full' type='button'>Cancelar</Button>
              </DialogClose>
              <Button className='w-full' type='submit'>Iniciar Sesión</Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
