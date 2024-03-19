import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import useToken from '@galvanize-inc/jwtdown-for-react'
import LoginButton from './LoginButton'
const Navbar = () => {
    const { token } = useToken()
    const [mobileDropDown, setMobileDropDown] = useState(false)
    const handleMobileNav = () => {
        setMobileDropDown(!mobileDropDown)
    }
    return (
        <>
            <nav className="flex items-center justify-between  p-[1rem] bg-blue-500">
                <NavLink to="/" className="text-2xl font-bold">
                    Pet Friendly
                </NavLink>
                <ul className="hidden md:flex gap-[2rem] items-center">
                    {token && (
                        <li className="hover:text-white transition-colors duration-300">
                            <NavLink to="/portal">Portal</NavLink>
                        </li>
                    )}
                    <li className="hover:text-white transition-colors duration-300">
                        <NavLink to="/pets">Pets</NavLink>
                    </li>
                    <li className="hover:text-white transition-colors duration-300">
                        <NavLink to="/">Home</NavLink>
                    </li>
                </ul>
                <div className="flex items-center gap-[1rem]">
                    <LoginButton />
                    <GiHamburgerMenu
                        className="md:hidden cursor-pointer"
                        size={30}
                        onClick={handleMobileNav}
                    />
                </div>
            </nav>
            {mobileDropDown && (
                <ul className=" pt-[2.5rem] md:hidden text-white leading-[80px] fixed h-[100vh] w-[100%] bg-blue-500 flex flex-col items-center gap-[1rem]">
                    <li className="cursor-pointer transition-colors duration-300 w-[50vw] flex justify-center bg-black rounded-lg hover:text-blue-500 ">
                        <NavLink
                            className="flex justify-center"
                            style={{ width: '100%' }}
                            onClick={handleMobileNav}
                            to="/pets"
                        >
                            Pets
                        </NavLink>
                    </li>
                    <li className="cursor-pointer transition-colors duration-300 w-[50vw] flex justify-center bg-black rounded-lg hover:text-blue-500">
                        <NavLink
                            className="flex justify-center"
                            style={{ width: '100%' }}
                            onClick={handleMobileNav}
                            to="/home"
                        >
                            Home
                        </NavLink>
                    </li>
                </ul>
            )}
        </>
    )
}

export default Navbar
