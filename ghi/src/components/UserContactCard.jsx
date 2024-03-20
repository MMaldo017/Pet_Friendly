import { useState, useEffect } from 'react'

    const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST

const UserContactCard = ({ user }) => {
    const [userData, setUserData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_HOST}/api/users/${user.id}`
                )
                const data = await response.json()
                setUserData(data)
                setEditData(data)
            } catch (error) {
                console.log('Error fetching data:', error)
            }
        }

        fetchData()
    }, [user])

    const handleInputChange = (event) => {
        setEditData({
            ...editData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(
                `${API_HOST}/api/users/${user.id}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editData),
                }
            )
            if (response.ok) {
                setUserData(editData)
                setShowModal(false)
            } else {
                console.log('Error updating data:', await response.text())
            }
        } catch (error) {
            console.log('Error updating data:', error)
        }
    }

    return userData ? (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
            <div className="md:flex">
                <div className="p-8">
                    <h1 className="text-3xl font-bold">{userData.name}</h1>
                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold py-1">
                        User ID: {userData.id}
                    </div>
                    <p className="mt-2 text-gray-600 py-1">
                        {userData.phone_number}
                    </p>
                    <p className="mt-2 text-gray-600 py-1">{userData.email}</p>
                    <p className="mt-2 text-gray-600 py-1">
                        {userData.address}
                    </p>
                    <p className="mt-2 text-gray-600 py-1">
                        {userData.state}, {userData.zip_code}
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={() => setShowModal(false)}
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-4"
                            >
                                <h1 className="text-3xl font-bold">
                                    Update Shelter Info
                                </h1>
                                <label>
                                    Name:
                                    <input
                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Phone Number:
                                    <input
                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                        type="text"
                                        name="phone_number"
                                        value={editData.phone_number}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                        type="text"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Address:
                                    <input
                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                        type="text"
                                        name="address"
                                        value={editData.address}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    State:
                                    <input
                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                        type="text"
                                        name="state"
                                        maxLength={2}
                                        value={editData.state}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Zip Code:
                                    <input
                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                        type="text"
                                        name="zip_code"
                                        maxLength={5}
                                        value={editData.zip_code}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="flex flex-col items-center justify-center mt-[2rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div>Loading...</div>
    )
}

export default UserContactCard
