import { Filter } from "@components";
import { rankByOptions } from "app/leaderboard/constants";
import './controls.scss'
import useLeaderboardStore from "app/stores/useLeaderboardStore";

const Controls = ()=>{
    const filter = useLeaderboardStore((state)=>state.rankingFilter)
    const setFilter = useLeaderboardStore((state)=>state.setRankingFilter)
    const handleFilterChange = (value: string)=>{
        setFilter(value.toLowerCase())
    }
    return(
        <div className="controls">
            <h2>Rankings</h2>
            <div className="filter-controls">
                <Filter
                    label='Rank Filter'
                    value={filter}
                    setValue={handleFilterChange as React.Dispatch<React.SetStateAction<string>>}
                    options={rankByOptions}
                    selectedOption='wins'
                    id='rank=filter'
                />
            </div>
        </div>
    )
}

export default Controls;