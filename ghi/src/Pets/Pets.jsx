import { useState, useEffect } from 'react'

const Pets = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [types, setTypes] = useState([])
    const [selectedPet, setSelectedPet] = useState(null)
    const [user, setUser] = useState({})

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

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch('http://localhost:8000/api/users')

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.error('Error fetching data:', error.message)
            }
        }

        getUser()
    }, [])

    const openModal = async (pet) => {
        setSelectedPet(pet)

        try {
            const response = await fetch(
                `http://localhost:8000/api/users/${pet.owner_id}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const userData = await response.json()
            setUser(userData)
        } catch (error) {
            console.error('Error fetching user data:', error.message)
        }

        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {}, [isModalOpen])

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
                        Find your perfect match among our playful pups or our
                        serene cats. Browse profiles filled with adorable photos
                        and heartwarming tales. Start your journey to
                        companionship today!
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {types.map((pet) => (
                        <div key={pet.id} className="relative">
                            <div className="relative group">
                                <img
                                    className="w-full h-96 object-cover border-4 border-blue-500"
                                    src={pet.photo_url}
                                    alt={`Photo of ${pet.name}`}
                                />
                                <div className="absolute inset-0 flex flex-col justify-center items-center border-2 border-blue-500 bg-white opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-blue-500 mb-1">
                                        {pet.subtitle}
                                    </h2>
                                    <h1 className="title-font text-lg font-sans text-indigo-500 mb-3">
                                        {pet.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => openModal(pet)}
                                >
                                    Info
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-md w-1/2 h-3/4 relative">
                            <h2 className="text-2xl font-bold mb-4">
                                A little bit about {selectedPet.name}
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="relative">
                                    <div className="font-sans text-gray-600 mb-1">
                                        Age: {selectedPet.age}
                                    </div>
                                    <div className="font-sans text-gray-600 mb-1">
                                        Breed: {selectedPet.breed}
                                    </div>
                                    <div className="font-sans text-gray-600 mb-1">
                                        Description: {selectedPet.description}
                                    </div>
                                    <div className="font-sans text-gray-600 mb-1">
                                        Adoption Status:{' '}
                                        {selectedPet.adoption_status}
                                    </div>
                                    <div className="font-sans text-gray-600">
                                        Day In: {selectedPet.day_in}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold mt-4">
                                Their Shelter
                            </h3>
                            <p>
                                <strong>Name:</strong> {user.name}
                                <br />
                                <strong>Phone Number:</strong>{' '}
                                {user.phone_number}
                                <br />
                                <strong>Email:</strong> {user.email}
                                <br />
                                <strong>Address:</strong> {user.address}
                                <br />
                                <strong>State:</strong> {user.state}
                                <br />
                                <strong>Zip Code:</strong> {user.zip_code}
                                <br />
                            </p>
                            <div className="absolute bottom-4 right-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Pets
