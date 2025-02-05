import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import useToken from '@galvanize-inc/jwtdown-for-react'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'
const LoginButton = () => {
    const { login, token, logout } = useToken()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const [logInData, setLogInData] = useState({
        username: '',
        password: '',
    })

    const [loginAlert, setLoginAlert] = useState(false)
    const [logOutAlert, setLogoutAlert] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [buttonVisible, setButtonVisible] = useState(true)
    const [username, setUsername] = useState('')

    const handleLogoutAlert = () => {
        setLogoutAlert(true)
        setTimeout(() => {
            setLogoutAlert(false)
        }, 4000)
    }

    const handleLoginAlert = () => {
        setLoginAlert(true)
        setTimeout(() => {
            setLoginAlert(false)
        }, 4000)
    }

    const handleLoginError = () => {
        setLoginError(true)
        setTimeout(() => {
            setLoginError(false)
        }, 4000)
    }

    const handleLoginButton = () => {
        setIsOpen(!isOpen)
    }
    const handleFormLogOut = async (event) => {
        try {
            event.preventDefault()
            await logout(FormData.username, FormData.password)
            handleLogoutAlert()
            setButtonVisible(false)
            setUsername('')
            localStorage.removeItem('username')
            setTimeout(() => {
                setButtonVisible(true)
            }, 4000)
            navigate('/pet-friendly')
        } catch (error) {
            console.error('Log out failed', error)
        }
    }
    const handleFormChange = (event) => {
        let input = event.target.name
        let value = event.target.value
        setLogInData({
            ...logInData,
            [input]: value,
        })
    }

    const handleFormLogin = async (event) => {
        event.preventDefault()
        try {
            const req = await login(logInData.username, logInData.password)
            if (req) {
                setIsOpen(false)
                event.target.reset()
                handleLoginAlert()
                setButtonVisible(false)
                setUsername(logInData.username)
                localStorage.setItem('username', logInData.username)
                setTimeout(() => {
                    setButtonVisible(true)
                }, 4000)
                navigate('/portal')
            } else {
                handleLoginError()
            }
        } catch (error) {
            console.error('Log in failed', error)
        }
    }

    useEffect(() => {
        const currentUsername = localStorage.getItem('username')
        if (currentUsername) {
            setUsername(currentUsername)
        }
    }, [])
    return (
        <>
            <div className="relative">
                {!!token === false && buttonVisible ? (
                    <button
                        onClick={handleLoginButton}
                        className="cursor-pointer pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] bg-green-500 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300"
                    >
                        Log In
                    </button>
                ) : null}
                {!!token === true && buttonVisible && (
                    <div className="flex flex-col justify-center">
                        <div className="flex gap-1 mb-1">
                            <p>Hello, </p>
                            <p className="font-bold">{username} 👋</p>
                        </div>
                        <button
                            onClick={handleFormLogOut}
                            className="cursor-pointer pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] bg-green-500 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300"
                        >
                            Log Out
                        </button>
                    </div>
                )}
                {isOpen && (
                    <div className="absolute right-0 mt-[0.5rem] w-[15rem] bg-white rounded-lg shadow-lg z-50">
                        <form onSubmit={handleFormLogin} className="p-[1rem]">
                            <div className="flex justify-between">
                                <h1 className="text-3xl font-bold mb-[0.5rem]">
                                    Log In
                                </h1>
                                <IoClose
                                    className="cursor-pointer hover:text-blue-500 transition-colors duration-300"
                                    onClick={handleLoginButton}
                                    size={30}
                                />
                            </div>
                            <div className="mb-[1rem]">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleFormChange}
                                    value={logInData.username}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleFormChange}
                                    value={logInData.password}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <NavLink
                                to="/signup"
                                className="mt-[0.5rem] mb-[0.5rem]"
                                onClick={handleLoginButton}
                            >
                                <p className="mt-[0.8rem] mb-[0.8rem] underline hover:text-blue-500 transition-colors duration-300">
                                    New agency? Create account
                                </p>
                            </NavLink>
                            <div className="flex items-center justify-between">
                                <button className="cursor-pointer pt-[0.5rem] pb-[0.5rem] pr-[1rem] pl-[1rem] bg-green-500 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {loginAlert && <Alert color="green" title="Login successful" />}
            {logOutAlert && <Alert color="green" title="Logout successful" />}
            {loginError && <Alert color="red" title="Invalid credentials" />}
        </>
    )
}

export default LoginButton
