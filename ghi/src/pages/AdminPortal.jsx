import { useDispatch, useSelector } from 'react-redux'
import UserPetList from '../components/UserPetList'
import UserContactCard from '../components/UserContactCard'
import CreatePetButton from '../components/CreatePetButton'
import { useEffect } from 'react'
import { fetchByToken } from '../store/userSlice'

const AdminPortal = () => {
    const dispatch = useDispatch()

    const { user, status, error } = useSelector((state) => state.user)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchByToken())
        }
    }, [status, dispatch])

    if (status === 'loading') return <div>Loading...</div>
    if (status === 'failed') return <div>Error: {error}</div>

    return (
        <div className="flex flex-col sm:flex-row px-4">
            <div className="flex flex-col pr-2 sm:w-3/4">
                <div className="w-full">
                    <div className="container mx-auto w-full py-4">
                        {<CreatePetButton />}
                    </div>
                    <div className="container mx-auto overflow-auto">
                        {user && <UserPetList user={user} />}
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-1/4 flex flex-col pl-2">
                <div className="sticky top-0">
                    {user && <UserContactCard user={user} />}
                </div>
            </div>
        </div>
    )
}

export default AdminPortal
