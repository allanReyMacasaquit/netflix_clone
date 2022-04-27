import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components/dist/tailwind'
import {BellIcon, SearchIcon} from '@heroicons/react/solid'
import Link from 'next/link'
import useAuth from '../hooks/useAuth';

function Header() {
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
        window.removeEventListener('scroll', handleScroll)
    }
}, [])

  return (
      <header className={`${isScrolled && 'bg-slate-900'} fixed w-full`}>
        <Container>
            <LeftMenu>
                <ImageLogo src='https://rb.gy/ulxxee' alt=''/>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Tv Shows</ListItem>
                <ListItem>Movies</ListItem>
                <ListItem>New and Popular</ListItem>
                <ListItem>My List</ListItem>
            </List>
            </LeftMenu>
            <RightMenu>
                <SearchIcon className='hidden h-6 w-6 sm:inline cursor-pointer'/>
                <SearchTitle>Kids</SearchTitle>
                <BellIcon className='h-6 w-6'/>
                <Link href='/login'>
                    <ProfileLogo  src='https://rb.gy/g1pwyx'/>
                </Link>
            </RightMenu>
        </Container>
      </header>
    
  )
}

export default Header

const Container = tw.div`
    relative flex justify-between items-center top-0 -z-50 py-4 px-4 transition-all lg:px-10 lg:py-6
`
const LeftMenu = tw.div`
    flex items-center space-x-2 md:space-x-10
`
const RightMenu = tw.div`
    flex items-center space-x-4 font-light
`
const ImageLogo = tw.img`
    cursor-pointer object-contain w-24 h-10
`
const List = tw.ul`
    hidden space-x-4 md:flex
`
const ListItem = tw.li`
    cursor-pointer text-sm font-light transition duration-500
`
const SearchTitle = tw.p`
    hidden lg:inline
`
const ProfileLogo = tw.img`
    cursor-pointer rounded 
`