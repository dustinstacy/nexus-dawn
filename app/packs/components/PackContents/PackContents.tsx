import { Button } from "@components"
import { ICard } from "@interfaces"
import { useUserStore } from "@stores"

import "./packContents.scss"
import { useEffect, useState } from "react"
import PackCarousel from "./components/PackCarousel/PackCarousel"
import MultiCardShow from "./components/MultiCardShow/MultiCardShow"

interface PackContents {
    packContents: Array<ICard>
    setPackContents: React.Dispatch<React.SetStateAction<Array<ICard> | null>>
}

// Render contents of opened pack and button to return
const PackContents = ({ packContents, setPackContents }: PackContents) => {
		const user = useUserStore((state) => state.user)
		const stage = user?.onboardingStage

    const [batchedCards, setBatchedCards] = useState<ICard[][]>([]);
    const [currentCardBatch, setCurrentCardBatch] = useState<ICard[]>([]);

    useEffect(() => {
        setBatchedCards(breakArrayIntoGroups(packContents, 5));
        setCurrentCardBatch(batchedCards[0]);
    }, [packContents]);

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
                currentBatch={currentCardBatch}
                setCurrentItem={setCurrentCardBatch}
                emptyMessage="hi"
            >   
                <MultiCardShow packContents={currentCardBatch} />    
            </PackCarousel>
            <Button label='Go BaCk' onClick={() => setPackContents(null)} disabled={(stage as number) < 5} />
        </div>
    )
}

export default PackContents
