/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import '../App.css'
import Alert from '../components/Alert'




const SignUpPage = () => {
    const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        phone_number: '',
        zip_code: '',
        state: '',
        address: '',
        email: '',
    })
    const [usernames, setUsernames] = useState([])
    const [users, setUsers] = useState([])
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(false)

    const handleSuccessMessage = () => {
        setSuccessMessage(true)
        setTimeout(() => {
            setSuccessMessage(false)
        }, 4000)
    }

    const handleFormChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        setFormData({
            ...formData,
            [name]: value,
        })

        if (name === 'confirmPassword') {
            setConfirmPassword(value)
        }
    }

    const getUsers = async () => {
        const url = `${API_HOST}/api/usernames`
        const fetchOptions = {
            method: 'GET',
        }
        const req = await fetch(url, fetchOptions)
        try {
            if (req.ok) {
                const data = await req.json()
                setUsers(data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    const filteredUsernames = users.map((user) => user.username)

    useEffect(() => {
        setUsernames(filteredUsernames)
    }, [users, filteredUsernames])

    const validateUser = () => {
        return usernames.includes(formData.username) ? (
            <p className="text-red-700">Username already exists</p>
        ) : null
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `${API_HOST}/api/users`
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json',
            },
        }
        try {
            const req = await fetch(url, fetchOptions)
            if (req.ok) {
                setFormData({
                    username: '',
                    password: '',
                    name: '',
                    phone_number: '',
                    zip_code: '',
                    state: '',
                    address: '',
                    email: '',
                })
                setConfirmPassword('')
                handleSuccessMessage()
            } else {
                throw new Error('Network response was not ok.')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    return (
        <>
            <div>
                {successMessage && (
                    <Alert
                        color="green"
                        title="Account created successfully"
                        message="Please log in!"
                    />
                )}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center mt-[2rem]"
                >
                    <h1 className="text-3xl font-bold">New Agency</h1>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl "
                            autoComplete="off"
                            type="text"
                            id="username"
                            onChange={handleFormChange}
                            value={formData.username}
                            name="username"
                            placeholder="Enter a username"
                            maxLength="20"
                            required
                        />
                        {validateUser()}
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="password"
                            id="password"
                            onChange={handleFormChange}
                            value={formData.password}
                            name="password"
                            placeholder="Enter a password"
                            maxLength="20"
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="password"
                            id="confirmPassword"
                            onChange={handleFormChange}
                            value={confirmPassword}
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            maxLength="20"
                            required
                        />
                        {confirmPassword.length > 0 &&
                        confirmPassword !== formData.password ? (
                            <p className="text-red-700">
                                Passwords do not match
                            </p>
                        ) : null}
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="agencyName"
                        >
                            Agency Name
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="text"
                            id="agencyName"
                            onChange={handleFormChange}
                            value={formData.name}
                            name="name"
                            placeholder="Enter an agency name"
                            maxLength="50"
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="phoneNumber"
                        >
                            Phone Number
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="number"
                            id="phoneNumber"
                            onChange={handleFormChange}
                            value={formData.phone_number}
                            name="phone_number"
                            placeholder="Enter a phone number"
                            maxLength="10"
                            minLength="10"
                            required
                        />
                        {formData.phone_number &&
                        formData.phone_number.length !== 10 ? (
                            <p className="text-red-700">
                                Please enter a valid 10 digit phone number
                                <p className="text-green-600">
                                    i.e. 1234567890
                                </p>
                            </p>
                        ) : null}
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="zipCode"
                        >
                            Zip Code
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="number"
                            id="zipCode"
                            onChange={handleFormChange}
                            value={formData.zip_code}
                            name="zip_code"
                            placeholder="Enter a zip code"
                            maxLength="5"
                            minLength="5"
                            required
                        />
                        {formData.zip_code &&
                            formData.zip_code.length !== 5 && (
                                <>
                                    <p className="text-red-700">
                                        Please enter a valid zip code
                                    </p>
                                    <p className="text-green-600">i.e. 87756</p>
                                </>
                            )}
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label className="text-xl mb-[0.3rem]" htmlFor="state">
                            State
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="text"
                            id="state"
                            onChange={handleFormChange}
                            value={formData.state}
                            name="state"
                            placeholder="Enter a state i.e. CA"
                            maxLength="2"
                            required
                        />
                        {formData.state && formData.state.length !== 2 ? (
                            <>
                                <p className="text-red-700">
                                    State abbreviation needs to be 2 characters
                                </p>
                                <p className="text-green-600">i.e. CA</p>
                            </>
                        ) : null}
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="streetAddress"
                        >
                            Street Address
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="text"
                            id="streetAddress"
                            onChange={handleFormChange}
                            value={formData.address}
                            name="address"
                            placeholder="Enter a street address"
                            maxLength="60"
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-[1.3rem]">
                        <label
                            className="text-xl mb-[0.3rem]"
                            htmlFor="contactEmail"
                        >
                            Contact Email
                        </label>
                        <input
                            className="w-[20rem] lg:w-[50rem] border-blue-500 border-2 p-[0.5rem] rounded-lg focus:border-green-600 focus:border-4 focus:outline-none focus:shadow-2xl"
                            autoComplete="off"
                            type="email"
                            id="contactEmail"
                            onChange={handleFormChange}
                            value={formData.email}
                            name="email"
                            placeholder="Enter an email"
                            maxLength="40"
                            required
                        />
                        {formData.email && formData.email.indexOf('@') < 0 ? (
                            <>
                                <p className="text-red-700">
                                    Please enter a valid email
                                </p>
                                <p className="text-green-600">
                                    i.e john23@gmail.com
                                </p>
                            </>
                        ) : null}
                    </div>
                    <div>
                        <button className=" pl-[1.5rem] pr-[1.5rem] pt-[0.8rem] pb-[0.8rem] mt-[1.5rem] mb-[5rem] transition ease-in-out delay-75 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-600 hover:text-white duration-300 rounded-lg">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUpPage
