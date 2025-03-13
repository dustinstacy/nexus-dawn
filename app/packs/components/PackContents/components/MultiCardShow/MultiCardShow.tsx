import { ICard } from "@interfaces"
import { Card } from "@components"

interface IPackContents {
  packContents: ICard[]
}
const MultiCardShow = ( {packContents} : IPackContents ) => { 
  return (
    <div className="user-packs panel fill between-column">
      {packContents?.map((currentCard: ICard, currentCardIndex: number) => {
        return (
          <Card key={currentCardIndex} card={currentCard} isShowing />    
        );
      })}
    </div>
  )
}

export default MultiCardShow