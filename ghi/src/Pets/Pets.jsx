import { useState, useEffect } from 'react'
// import Modal from './Modal'
import DropdownMenu from './Dropdown'

const Pets = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const [types, setTypes] = useState([])

    // const openModal = () => {
    //     setIsModalOpen(true)
    // }

    // const closeModal = () => {
    //     setIsModalOpen(false)
    // }

    useEffect(() => {
        async function getTypes() {
            try {
                const response = await fetch('http://localhost:8000/api/pets/')

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()
                setTypes(data)
            } catch (error) {
                console.error('Error fetching data:', error.message)
            }
        }

        getTypes()
    }, [])

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-blue-500">
                        Meet Our Friends
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Welcome to our adoption center! Explore our charming
                        animals, each with a unique story and love to share.
                        Find your perfect match among our playful pups and
                        serene cats. Browse profiles filled with adorable photos
                        and heartwarming tales. Start your journey to
                        companionship today!
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {types.map((pet) => (
                        <div key={pet.id} className="relative">
                            <img
                                className="w-full h-96 object-cover border-4 border-blue-500"
                                src={pet.photo_url}
                                alt={`Photo of ${pet.name}`}
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center border-2 border-blue-500 bg-white opacity-0 hover:opacity-80">
                                <h2 className="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                                    {pet.subtitle}
                                </h2>
                                <h1 className="title-font text-lg font-sans text-indigo-500 mb-3">
                                    {pet.name}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <DropdownMenu />
                </div>
            </div>
        </section>
    )
}

export default Pets
