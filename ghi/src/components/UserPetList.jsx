import { useEffect, useState } from 'react'

const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST

const UserPetList = ({ user }) => {
    const [pets, setPets] = useState([])
    const [selectedPet, setSelectedPet] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchUserPets = async () => {
            try {
                const response = await fetch(
                    `${API_HOST}/api/users/${user.id}/pets`
                )
                const data = await response.json()
                setPets(data)
            } catch (error) {
                console.log('Failed to fetch user pets:', error)
            }
        }
        fetchUserPets()
    }, [user])

    const handleRowClick = (pet) => {
        setSelectedPet(pet)
        setShowModal(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(
                `${API_HOST}/api/pets/${selectedPet.id}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(selectedPet),
                }
            )
            const updatedPet = await response.json()
            const updatedPets = pets.map((pet) =>
                pet.id === updatedPet.id ? updatedPet : pet
            )
            setPets(updatedPets)
        } catch (error) {
            console.log('Failed to update pet:', error)
        }
        setShowModal(false)
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto w-full">
                <div className="min-w-screen flex justify-center font-sans overflow-auto w-full">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded">
                            <div className="text-3xl font-bold text-center border-b-2 border-blue-500">
                                Your Pets
                            </div>
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left"></th>
                                        <th className="py-3 px-6 text-left">
                                            Name
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Age
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Breed
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Type
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Description
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Adoption Status
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Day In
                                        </th>
                                        <th className="py-3 px-6 text-left">
                                            Day Out
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {pets.map((pet) => (
                                        <tr
                                            className="border-b border-gray-200 hover:bg-gray-100 h-10"
                                            key={pet.id}
                                            onClick={() => handleRowClick(pet)}
                                        >
                                            <td className="py-3 px-6 text-left">
                                                <img
                                                    src={pet.photo_url}
                                                    alt="Pet"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                            </td>
                                            <td className="py-3 px-6 text-left overflow-ellipsis overflow-hidden">
                                                {pet.name}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {pet.age}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {pet.breed}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {pet.pet_type}
                                            </td>
                                            <td className="py-3 px-6 text-left max-w-xs overflow-ellipsis overflow-hidden">
                                                {pet.description}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {pet.adoption_status}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {pet.day_in}
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {pet.day_out
                                                    ? pet.day_out
                                                    : 'Still in shelter'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                                    Update info for{' '}
                                                    {selectedPet.name}!
                                                </h1>
                                                <label className="text-gray-700">
                                                    Name:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="text"
                                                        autoComplete="off"
                                                        id="name"
                                                        value={selectedPet.name}
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </label>
                                                <label className="text-gray-700">
                                                    Age:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="text"
                                                        autoComplete="off"
                                                        id="age"
                                                        value={selectedPet.age}
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                age: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </label>
                                                <label className="text-gray-700">
                                                    Breed:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="text"
                                                        autoComplete="off"
                                                        id="breed"
                                                        value={
                                                            selectedPet.breed
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                breed: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </label>
                                                <label className="text-gray-700">
                                                    Type:
                                                    <select
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        autoComplete="off"
                                                        id="pet_type"
                                                        value={
                                                            selectedPet.pet_type
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                pet_type:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    >
                                                        <option value="Cat">
                                                            Cat
                                                        </option>
                                                        <option value="Dog">
                                                            Dog
                                                        </option>
                                                        <option value="Horse">
                                                            Horse
                                                        </option>
                                                        <option value="Other">
                                                            Other
                                                        </option>
                                                    </select>
                                                </label>
                                                <label className="text-gray-700">
                                                    Description:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="text"
                                                        autoComplete="off"
                                                        id="description"
                                                        value={
                                                            selectedPet.description
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </label>
                                                <label className="text-gray-700">
                                                    Adoption Status:
                                                    <select
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        autoComplete="off"
                                                        id="adoption_status"
                                                        value={
                                                            selectedPet.adoption_status
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                adoption_status:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    >
                                                        <option value="Adopted">
                                                            Adopted
                                                        </option>
                                                        <option value="Available">
                                                            Available
                                                        </option>
                                                    </select>
                                                </label>
                                                <label className="text-gray-700">
                                                    Date Arrived At Shelter:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="date"
                                                        autoComplete="off"
                                                        id="day_in"
                                                        value={
                                                            selectedPet.day_in
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                day_in: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </label>
                                                <label className="text-gray-700">
                                                    Date Left Shelter:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="date"
                                                        autoComplete="off"
                                                        id="day_out"
                                                        value={
                                                            selectedPet.day_out
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                day_out:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </label>
                                                <label className="text-gray-700">
                                                    Photo URL:
                                                    <input
                                                        className="border-2 rounded-lg focus:border-blue-500 focus:border-4 focus:outline-none focus:shadow-2xl ml-3"
                                                        type="url"
                                                        autoComplete="off"
                                                        id="photo_url"
                                                        value={
                                                            selectedPet.photo_url
                                                        }
                                                        onChange={(e) =>
                                                            setSelectedPet({
                                                                ...selectedPet,
                                                                photo_url:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPetList
