import { classSet } from '@utils'

export const subPanels = (user) => {
    const userPacks = user?.inventory.filter((item) => item?.name === 'pack')

    const packsClasses = classSet(
        userPacks?.length && 'unopened',
        !user && 'hidden'
    )

    return [
        {
            className: 'packs',
            type: 'sub',
            to: '/packs',
            jsx: (
                <>
                    <p className={packsClasses}>
                        Unopened Packs: <span>{userPacks?.length}</span>
                    </p>
                    <h2>Packs</h2>
                </>
            ),
        },
        {
            className: 'how-to-play',
            type: 'sub',
            to: '/rules',
            jsx: (
                <>
                    <h2>How To Play</h2>
                </>
            ),
        },
        {
            className: 'news',
            type: 'sub',
            to: '/',
            jsx: (
                <>
                    <p>Coming Soon!</p>
                    <h2>News</h2>
                </>
            ),
        },
        {
            className: 'contact',
            type: 'sub',
            to: '/',
            jsx: (
                <>
                    <p>Coming Soon!</p>
                    <h2>ContAct</h2>
                </>
            ),
        },
    ]
}

export const mainPanels = [
    {
        className: 'battle',
        type: 'main',
        to: '/opponentSelect',
        text: 'Test your skill',
        header: 'Battle',
    },
    {
        className: 'collection',
        type: 'main',
        to: '/collection',
        text: 'Prepare for battle',
        header: 'Deck',
    },
    {
        className: 'market',
        type: 'main',
        to: '/packs',
        text: 'Purchase packs',
        header: 'Market',
    },
]
