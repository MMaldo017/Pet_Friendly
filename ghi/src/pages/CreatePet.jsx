import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchByToken } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

const API_HOST = import.meta.env.VITE_API_HOST // Use VITE_API_HOST instead of REACT_API_HOST

function CreatePetForm() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            dispatch(fetchByToken())
        }
    }, [dispatch, user])

    const [form, setForm] = useState({
        name: '',
        age: '',
        breed: '',
        pet_type: '',
        day_in: '',
        owner_id: '',
    })

    useEffect(() => {
        if (user) {
            setForm((prevForm) => ({ ...prevForm, owner_id: user.id }))
        }
    }, [user])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch(`${API_HOST}/api/pets`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
        } catch (error) {
            console.log(error)
        }
        navigate('/portal')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="text-3xl font-bold mb-[0.5rem]">
                        Add A Pet!
                    </h1>
                    <div
                        className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                        htmlFor="name"
                    >
                        Name
                    </div>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Name"
                        autoComplete="off"
                        id="name"
                        required
                    />
                    <div
                        className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                        htmlFor="age"
                    >
                        Age
                    </div>
                    <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Age"
                        autoComplete="off"
                        id="age"
                        required
                    />
                    <div
                        className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                        htmlFor="breed"
                    >
                        Breed
                    </div>
                    <input
                        name="breed"
                        value={form.breed}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Breed"
                        autoComplete="off"
                        id="breed"
                        required
                    />
                    <div
                        className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                        htmlFor="pet_type"
                    >
                        Pet Type
                    </div>
                    <select
                        name="pet_type"
                        value={form.pet_type}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        id="pet_type"
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="Horse">Horse</option>
                        <option value="Other">Other</option>
                    </select>
                    <div
                        className="block text-gray-700 text-sm font-bold mb-[0.5rem]"
                        htmlFor="day_in"
                    >
                        Day They Arrived at Shelter
                    </div>
                    <input
                        name="day_in"
                        type="date"
                        value={form.day_in}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Day Arrived at Shelter"
                        autoComplete="off"
                        id="day_in"
                        required
                    />
                    <div className="bg-gray-50 px-2 py-3 sm:px-6 flex items-center justify-between space-x-4">
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="flex-grow inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-4 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:text-lg"
                            style={{ flexBasis: '40%' }}
                        >
                            Confirm
                        </button>
                        <button
                            onClick={() => navigate('/portal')}
                            type="button"
                            className="flex-grow mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-4 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-lg"
                            style={{ flexBasis: '40%' }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePetForm
