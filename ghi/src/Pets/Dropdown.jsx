import { useState, useEffect } from 'react'

const API_HOST = import.meta.env.VITE_API_HOST

const DropdownMenu = ({ setSelectedType }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [types, setTypes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getTypes() {
            try {
                const response = await fetch(`${API_HOST}/api/pets`)

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()
                setTypes(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error.message)
            }
        }

        getTypes()
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="relative w-80 cursor-default rounded-md bg-blue-500 py-1.5 pl-3 pr-10 text-left font-medium text-black-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-black-500 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    aria-labelledby="listbox-label"
                    onClick={toggleDropdown}
                >
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">Pet Type</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <svg
                            className="h-5 w-5 text-black-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </button>

                {isDropdownOpen && (
                    <ul
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        tabIndex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                        onBlur={closeDropdown}
                    >
                        {loading && (
                            <li
                                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                                id="listbox-option-0"
                                role="option"
                            >
                                <span>Loading...</span>
                            </li>
                        )}
                        {!loading && types.length === 0 && (
                            <li
                                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                                id="listbox-option-0"
                                role="option"
                            >
                                <span>No pet types available</span>
                            </li>
                        )}
                        {!loading && (
                            <>
                                <li
                                    key="all"
                                    className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                                    id={`listbox-option-all`}
                                    role="option"
                                    onClick={() => {
                                        setSelectedType(null)
                                        closeDropdown()
                                    }}
                                >
                                    <span>All</span>
                                </li>
                                {types.map((pet) => (
                                    <li
                                        key={pet.id}
                                        className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                                        id={`listbox-option-${pet.id}`}
                                        role="option"
                                        onClick={() => {
                                            setSelectedType(pet.pet_type)
                                            closeDropdown()
                                        }}
                                    >
                                        <span>{pet.pet_type}</span>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default DropdownMenu
