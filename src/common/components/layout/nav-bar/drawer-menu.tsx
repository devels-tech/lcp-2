'use client'

import { Instagram, MenuIcon, Youtube } from 'lucide-react'

import { useMediaQuery } from '@/common/lib/hooks/use-media-query'
import { useEffect, useState } from 'react'

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/ui/drawer'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'
import { Separator } from '@/ui/separator'
import {  Button } from '@/ui/button'

import { ThemeToggle } from './theme-toggle'
import { ProfileMenu } from './profile-menu'
import { NavLink } from './link'

export const DrawerMenu = () => {
  const [isMounted, setIsMounted] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null // Evita renderizar hasta montar en cliente

  if (isDesktop) {
    return (
      <div className='flex justify-center items-center gap-x-2'>
        <ProfileMenu />

        <Sheet>
          <SheetTrigger className='flex justify-center items-center hover:opacity-80 bg-white dark:bg-muted px-6 rounded-full py-2' asChild>
            <Button>
              <span className='text-base mr-2'>Menu</span>
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent className='bg-white'>
            <SheetHeader>
              <SheetTitle>Menu de Acciones</SheetTitle>
              <SheetDescription>
                Navega por las diferentes paginas que te brinda La Casa de mi Padre
              </SheetDescription>
            </SheetHeader>

            <section className='mt-4 space-y-3'>
              <Separator className='my-4' />

              <NavLink href='/'>Inicio</NavLink>
              <NavLink href='/nosotros'>Nosotros</NavLink>
              <NavLink href='/devocionales'>Devocionales</NavLink>
              <NavLink href='/Recursos'>Recursos</NavLink>
              <NavLink href='/Eventos'>Eventos</NavLink>
              <NavLink href='/Contactanos'>Contactanos</NavLink>
            </section>

            <Separator className='my-4' />

            <section>
              <h6 className='font-bold text-xl'>Tema</h6>

              <ThemeToggle />

            </section>

            <Separator className='my-4' />

            <section>
              <h6 className='font-bold text-xl'>Redes Sociales</h6>

              <ul className='flex justify-start items-center space-x-3 mt-2'>
                <li>
                  <a
                    href='https://www.instagram.com/kevelscy/'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='social__instagram hover:top-1 hover:-left-1 hover:shadow-[4px_4px_0px_#61dafb]'
                  >
                    <Instagram />
                  </a>
                </li>

                <li>
                  <a
                    href='https://www.instagram.com/kevelscy/'
                    rel='noopener noreferrer'
                    target='_blank'
                    className='social__youtube hover:top-1 hover:-left-1 hover:shadow-[4px_4px_0px_#61dafb]'
                  >
                    <Youtube />
                  </a>
                </li>

              </ul>
            </section>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger className='px-6 py-2 bg-white rounded-full flex justify-center items-center hover:opacity-80' asChild>
        <Button>
          <span className='text-base mr-2'>Menu</span>
          <MenuIcon size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Button>Submit</Button>

          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
