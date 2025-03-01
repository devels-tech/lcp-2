'use client'
import { Fragment } from 'react'
import { DrawerMenu } from './drawer-menu'
import { Logo } from './logo'

export const NavBar = () => {
  return (
    <div className='z-20 sticky top-0 left-0 w-full py-2'>
      <div className='w-full flex items-center justify-between max-w-7xl px-4 mx-auto'>
        <Logo />
        <DrawerMenu />
      </div>
    </div>
  )
}
