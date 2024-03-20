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
                    <div className="block text-gray-700 text-sm font-bold mb-[0.5rem]">
                        Name
                    </div>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Name"
                    />
                    <div className="block text-gray-700 text-sm font-bold mb-[0.5rem]">
                        Age
                    </div>
                    <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Age"
                    />
                    <div className="block text-gray-700 text-sm font-bold mb-[0.5rem]">
                        Breed
                    </div>
                    <input
                        name="breed"
                        value={form.breed}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Breed"
                    />
                    <div className="block text-gray-700 text-sm font-bold mb-[0.5rem]">
                        Pet Type
                    </div>
                    <input
                        name="pet_type"
                        value={form.pet_type}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-[0.7rem] px-[0.7rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Pet Type"
                    />
                    <div className="block text-gray-700 text-sm font-bold mb-[0.5rem]">
                        Day They Arrived at Shelter
                    </div>
                    <input
                        name="day_in"
                        type="date"
                        value={form.day_in}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Day Arrived at Shelter"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePetForm
