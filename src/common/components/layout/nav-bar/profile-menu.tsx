'use client'

import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

import { useAuthStore } from '@/common/lib/store/auth'
import { APP_CONFIG } from '@/config'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { NextImage } from '@/ui/image'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { LoginDialog } from './login-dialog'

const { USER } = APP_CONFIG

export const ProfileMenu = () => {
  const { auth } = useAuthStore()

  if (!auth) return <LoginDialog />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <NextImage src='' containerClassName='h-12 w-12 p-4 rounded-full ' imageClassName='w-12 h-12' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='text-sm translate-x-10 w-60' side='top'>
        <DropdownMenuLabel>
          <div className='w-full flex justify-start items-center'>
            <NextImage src='' containerClassName='h-16 w-16 p-6 rounded-full mr-2' imageClassName='w-full h-full' />

            <div className='truncate'>
              <span className='font-semibold'>{auth.firstName} {auth.lastName}</span> <br />
              <span className='font-normal text-muted-foreground'>{auth.email}</span> <br />
              <Badge className='mt-1'>{USER.ROLES[auth.role].label}</Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href='/mi-perfil'>
            <User size={18} className='mr-2' />
          Mi Perfil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LogOut size={18} className='mr-2' />
        Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
