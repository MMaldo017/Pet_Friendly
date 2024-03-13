import { useState, useEffect } from 'react'

const UserContactCard = ({ user }) => {
    const [userData, setUserData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [editData, setEditData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/users/${user.id}`
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
                `http://localhost:8000/api/users/${user.id}`,
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
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        User ID: {userData.id}
                    </div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black">
                        {userData.name}
                    </p>
                    <p className="mt-2 text-gray-500">
                        {userData.phone_number}
                    </p>
                    <p className="mt-2 text-gray-500">{userData.email}</p>
                    <p className="mt-2 text-gray-500">{userData.address}</p>
                    <p className="mt-2 text-gray-500">{userData.state}</p>
                    <p className="mt-2 text-gray-500">{userData.zip_code}</p>
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

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Phone Number:
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={editData.phone_number}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="text"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Address:
                                    <input
                                        type="text"
                                        name="address"
                                        value={editData.address}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    State:
                                    <input
                                        type="text"
                                        name="state"
                                        value={editData.state}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Zip Code:
                                    <input
                                        type="text"
                                        name="zip_code"
                                        value={editData.zip_code}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit">Submit</button>
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
