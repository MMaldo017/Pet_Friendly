import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchByToken } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

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
            await fetch('http://localhost:8000/api/pets', {
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
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Name"
                    />
                    <input
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Age"
                    />
                    <input
                        name="breed"
                        value={form.breed}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Breed"
                    />
                    <input
                        name="pet_type"
                        value={form.pet_type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Pet Type"
                    />
                    <input
                        name="day_in"
                        value={form.day_in}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Day In"
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
