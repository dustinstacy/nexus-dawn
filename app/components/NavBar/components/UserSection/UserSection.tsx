import { Avatar, ExperienceBar, UserInventory } from "@components"
import { User } from "@interfaces"
import { useAuthStore } from "@stores"

import "./UserSection.scss"

// This component acts as the parent component for all User-related navigation bar components
const UserSection = () => {
    const user = useAuthStore((state) => state.user)
    const { username } = (user as User) ?? {}

    return (
        <div className='user-section end'>
            <hr />
            <UserInventory />
            <div className='user-info center-column'>
                <h2>{username}</h2>
                <ExperienceBar />
            </div>
            <Avatar levelShowing menu small />
        </div>
    )
}
export default UserSection
