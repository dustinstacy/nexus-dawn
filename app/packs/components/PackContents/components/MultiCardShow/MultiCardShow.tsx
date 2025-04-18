import { ICard } from "@interfaces"
import { Card } from "@components"

import './MultiCardShow.scss'
interface IPackContents {
  packContents: ICard[]
}

const MultiCardShow = ( {packContents} : IPackContents ) => { 
  return (
    <div className="multi-packs panel fill">
      {packContents?.map((currentCard: ICard, currentCardIndex: number) => {
          return (
            <Card key={currentCardIndex} card={currentCard} isShowing />    
          );
      })}
    </div>
  )
}

export default MultiCardShow