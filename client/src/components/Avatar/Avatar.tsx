import { useGlobalContext } from '@context'
import { useToggle } from '@hooks'
import { classSet } from '@utils'
import { User } from 'src/global.interfaces'

import { AvatarMenu } from './components'
import './Avatar.scss'

// Renders user image avatar
// levelShowing: Indicates whether the user's level should be displayed
// menu: Indicates whether the avatar has an onClick menu
// small, medium, large: Indicates the avatar's size
const Avatar = ({
    levelShowing = false as boolean,
    menu = false as boolean,
    small = false as boolean,
    medium = false as boolean,
    large = false as boolean,
}) => {
    const { user } = useGlobalContext()
    const { image, level } = (user as User) ?? {}

    const [isOpen, toggleIsOpen] = useToggle(false)

    const handleClick = () => {
        menu ? toggleIsOpen() : null
    }

    // Dynamically set CSS classes based on props
    const avatarClasses = classSet(
        'avatar',
        'primary-border',
        small ? 'small' : '',
        medium ? 'medium' : '',
        large ? 'large' : ''
    )

    const imageClasses = classSet('fill', menu ? 'pointer' : '')

    return (
        <div className={avatarClasses} style={{ backgroundColor: user?.color }}>
            <img
                className={imageClasses}
                src={image}
                alt='user image'
                onClick={() => handleClick()}
            />
            {levelShowing && (
                <span className='level box'>LVL &nbsp;{level}</span>
            )}
            {menu && <AvatarMenu isOpen={isOpen} toggleIsOpen={toggleIsOpen} />}
        </div>
    )
}

export default Avatar
