import { Button } from "@components"
import { ICard } from "@interfaces"
import { useUserStore } from "@stores"
import { useEffect, useState } from "react"

import { PackCarousel, MultiCardShow } from "./components"
import "./packContents.scss"

interface PackContents {
    packContents: Array<ICard>
    setPackContents: React.Dispatch<React.SetStateAction<Array<ICard> | null>>
}

// Render contents of opened pack and button to return
const PackContents = ({ packContents, setPackContents }: PackContents) => {
    const user = useUserStore((state) => state.user)
    const stage = user?.onboardingStage

    const [batchedCards] = useState<ICard[][]>((breakArrayIntoGroups(packContents, 5)));
    const [currentCardBatch, setCurrentCardBatch] = useState<ICard[]>([]);

    function breakArrayIntoGroups(data: ICard[], maxPerGroup: number) {
        const groups = [];
        for (let index = 0; index < data?.length; index += maxPerGroup) {
            groups.push(data.slice(index, index + maxPerGroup));
        }
        return groups;
    }

    return (
        <div className='packs-contents fill center between-column'>
            <PackCarousel
                uniqueItems={batchedCards}
                setCurrentItem={setCurrentCardBatch}
            >   
                <MultiCardShow packContents={currentCardBatch} />    
            </PackCarousel>
            <Button label='Go BaCk' onClick={() => setPackContents(null)} disabled={(stage as number) < 5} />
        </div>
    )
}

export default PackContents
