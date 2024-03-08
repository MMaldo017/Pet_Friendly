// Pets.js
import React, { useState } from 'react'
import Modal from './Modal' // Import the Modal component
import DropdownMenu from './Dropdown'

const Pets = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Meet our Friends
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Libero fames augue nisl porttitor nisi, quis. Id ac elit
                        odio vitae elementum enim vitae ullamcorper suspendisse.
                    </p>
                </div>
                <DropdownMenu />
                <ul
                    role="list"
                    className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
                >
                    <li>
                        <div className="flex items-center gap-x-6">
                            <img
                                className="h-16 w-16 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <div>
                                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                                    Leslie Alexander
                                </h3>
                                <p className="text-sm font-semibold leading-6 text-indigo-600">
                                    Co-Founder / CEO
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="block mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={openModal}
                        >
                            Toggle modal
                        </button>
                        <Modal isOpen={isModalOpen} closeModal={closeModal} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pets
