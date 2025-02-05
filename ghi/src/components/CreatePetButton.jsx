import { Link } from 'react-router-dom'

const CreatePetButton = () => {
    return (
        <div className="container flex justify-end">
            <Link
                to="/pets/new"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Add a Pet
            </Link>
        </div>
    )
}

export default CreatePetButton
