import React from 'react'
import Container from '../container/container'
import { GoTriangleDown } from "react-icons/go";
const Header = () => {
    return (
        <Container className='w-full '>
            <div className='flex justify-between  h-14  mt-1 mx-2.5 items-center'>
                <div className=' inline-flex  items-center hover:border rounded-3xl bg-gradient-to-r from-blue-500/90 via-purple-500/80 to-pink-500/70 text-white py-1 px-2.5'>
                    Ask Bot
                    <GoTriangleDown />
                </div>
                <div className=' flex justify-center  gap-2 items-center'>
                    <button className=' hidden font-extra-light sm:block border rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-3 py-1 hover:animate-pulse'>
                        Coming Soon Askbot 2.0
                    </button>
                    <button className='border rounded-full hover:animate-spin p-1 '>
                        <img className="w-10 rounded-full" src="/image.png" alt="profile img" />

                    </button>
                </div>
            </div>

        </Container>
    )
}

export default Header
