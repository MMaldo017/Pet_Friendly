import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_HOST = import.meta.env.VITE_API_HOST

const CustomerServiceCard = ({ user }) => {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${API_HOST}/api/users/${user.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const logoutResponse = await fetch(`${API_HOST}/token`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!logoutResponse.ok) {
                    console.log(
                        'Error logging out:',
                        await logoutResponse.text()
                    )
                }

                setShowModal(false)
                navigate('/')
                window.location.reload()
            } else {
                console.log('Error deleting user:', await response.text())
            }
        } catch (error) {
            console.log('Error deleting user:', error)
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-xl text-blue-500 font-semibold border-b-2 border-gray-50">
                        Have a question?
                    </div>
                    <p className="mt-2 text-gray-500">
                        Reach out to devs@fakeemail.com for assistance and bug
                        fixes!
                    </p>
                    <div>
                        <p className="mt-2 text-gray-500 py-2">
                            If you wish to delete your account click the button
                            below.
                        </p>
                        <div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md hover:bg-red-700"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                        ></div>
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-title"
                                        >
                                            Delete Account
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 p-1">
                                                We are sorry to see you go!
                                            </p>
                                            <p className="text-sm text-gray-500 p-1">
                                                Are you sure you want to delete
                                                your account?
                                            </p>
                                            <p className="text-sm text-gray-500 font-bold p-1">
                                                Deleting this account is
                                                permanent and will remove all
                                                listed pets from the
                                                application.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomerServiceCard
