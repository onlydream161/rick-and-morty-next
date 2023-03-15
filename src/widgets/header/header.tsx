import React, { FC } from 'react'
import { ChangeThemeButton } from '@/features/change-theme'

export const Header: FC = () => {
  return (
    <header className='sticky top-0 z-20 min-w-[1440px] flex items-center h-[60px] bg-background-primary'>
      <div className='container flex items-center justify-end w-full gap-5'>
        <ChangeThemeButton />
      </div>
    </header>
  )
}
