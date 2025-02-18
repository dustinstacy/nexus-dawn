import { classSet } from "@utils"
import { User } from "@interfaces"
import {
    GiAbstract062,
    GiAbstract021,
    GiAbstract005,
    GiAbstract088,
    GiAbstract112,
    GiAbstract120,
    GiAbstract116,
} from "react-icons/gi"

export const maxValues = {
    Common: 5,
    Uncommon: 6,
    Rare: 7,
    Epic: 8,
    Legendary: 9,
}

// The case of the names is intentionally varied to achieve different letter stylings
export const navlinks = [
    {
        name: "HoMe",
        path: "/",
        image: <GiAbstract021 />,
    },
    {
        name: "BAttLe",
        path: "/opponentSelect",
        image: <GiAbstract088 />,
    },
    {
        name: "COlleCtiON",
        path: "/collection",
        image: <GiAbstract062 />,
    },
    {
        name: "MarKet",
        path: "/market",
        image: <GiAbstract120 />,
    },
    {
        name: "OpeN PacKs",
        path: "/packs",
        image: <GiAbstract112 />,
    },
    {
        name: "ForGe",
        path: "/forge",
        image: <GiAbstract005 />,
    },
    {
        name: "HoW to pLAy",
        path: "/rules",
        image: <GiAbstract116 />,
    },
]

export const subPanels = (user: User) => {
    const userPacks = user?.inventory.filter((item) => item?.type === "pack")

    const packsClasses = classSet(userPacks?.length ? "unopened" : "", !user ? "hidden" : "")

    return [
        {
            className: "packs",
            type: "sub",
            to: "/packs",
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
            className: "how-to-play",
            type: "sub",
            to: "/rules",
            jsx: (
                <>
                    <h2>How To Play</h2>
                </>
            ),
        },
        {
            className: "news",
            type: "sub",
            to: "/",
            jsx: (
                <>
                    <p>Coming Soon!</p>
                    <h2>News</h2>
                </>
            ),
        },
    ]
}

export const mainPanels = [
    {
        className: "battle",
        type: "main",
        to: "/opponentSelect",
        text: "Test your skill",
        header: "Battle",
    },
    {
        className: "collection",
        type: "main",
        to: "/collection",
        text: "Prepare for battle",
        header: "Deck",
    },
    {
        className: "market",
        type: "main",
        to: "/market",
        text: "Purchase packs",
        header: "Market",
    },
]
