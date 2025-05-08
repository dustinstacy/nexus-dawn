import { Player, Stats  } from "@interfaces"

export const getValueforPlayerKey = (key: string, player:Player):string | number | Stats => {
    if(key === 'wins' ||
        key === 'draws' ||
        key === 'losses' ||
        key === 'battles'
    ) return   player.stats[key as keyof typeof player.stats]

    return  player[key as keyof typeof player]
}
