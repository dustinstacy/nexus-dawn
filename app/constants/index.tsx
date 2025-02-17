import { classSet } from "@utils"
import { User } from "@interfaces"

export const maxValues = {
    Common: 5,
    Uncommon: 6,
    Rare: 7,
    Epic: 8,
    Legendary: 9,
}

export const subPanels = (/*user: User*/) => {
    // const userPacks = user?.inventory.filter((item) => item?.type === "pack")

    // const packsClasses = classSet(userPacks?.length ? "unopened" : "", !user ? "hidden" : "")

    return [
        {
            className: "packs",
            type: "sub",
            to: "/packs",
            jsx: (
                <>
                    {/* <p className={packsClasses}>
                        Unopened Packs: <span>{userPacks?.length}</span>
                    </p> */}
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
