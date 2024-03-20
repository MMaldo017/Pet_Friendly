import { useEffect, useState } from 'react'
import './Home.css'

 const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const Home = () => {
    const [pets, setPets] = useState([])
    const [adoptedPetsCount, setAdoptedPetsCount] = useState(0)
    const [activePetIndex, setActivePetIndex] = useState(0)

    useEffect(() => {
        fetch(`${API_HOST}/api/pets`)
            .then((response) => response.json())
            .then((data) => {
                const adoptedPets = data.filter(
                    (pet) => pet.adoption_status === 'adopted'
                )
                setAdoptedPetsCount(adoptedPets.length)
                const availablePets = data.filter(
                    (pet) => pet.adoption_status !== 'adopted'
                )
                setPets(shuffleArray(availablePets).reverse())
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePetIndex(
                (prevActivePetIndex) =>
                    (prevActivePetIndex - 1 + pets.length) % pets.length
            )
        }, 4000)
        return () => clearInterval(interval)
    }, [activePetIndex, pets])

    const handleNext = () => {
        setActivePetIndex(
            (prevActivePetIndex) =>
                (prevActivePetIndex - 1 + pets.length) % pets.length
        )
    }

    const handlePrev = () => {
        setActivePetIndex(
            (prevActivePetIndex) => (prevActivePetIndex + 1) % pets.length
        )
    }

    const getCardClass = (index) => {
        if (index === activePetIndex) {
            return 'card active'
        }
        if (index === (activePetIndex - 1 + pets.length) % pets.length) {
            return 'card inactive-right'
        }
        if (index === (activePetIndex + 1) % pets.length) {
            return 'card inactive-left'
        }
        return 'card hidden'
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="adopted-pets-count">
                <p>Pets Adopted: {adoptedPetsCount}</p>
            </div>
            <div className="carousel-container flex justify-center">
                <div className="button-container flex flex-col justify-center">
                    <button
                        onClick={handlePrev}
                        className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                </div>
                <div className="carousel flex items-center">
                    {pets.map((pet, index) => (
                        <div key={index} className={getCardClass(index)}>
                            <img
                                src={pet.photo_url}
                                alt={pet.name}
                                className="pet-image"
                            />
                            <h2 className="text-2xl mb-2">{pet.name}</h2>
                            <p>Type: {pet.pet_type}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Age: {pet.age}</p>
                            <p>Description: {pet.description}</p>
                            <p>Adoption Status: {pet.adoption_status}</p>
                        </div>
                    ))}
                </div>
                <div className="button-container flex flex-col justify-center">
                    <button
                        onClick={handleNext}
                        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
