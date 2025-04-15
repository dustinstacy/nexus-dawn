import useLeaderboardStore from 'app/stores/useLeaderboardStore';
import './rankings.scss'
import { useEffect } from 'react';
import { getValueforPlayerKey } from 'app/leaderboard/utils';
const Rankings = ()=>{
    const players = useLeaderboardStore((state) => state.allPlayers)
    const filter = useLeaderboardStore((state)=>state.rankingFilter)
    const fetchLeaderboard = useLeaderboardStore((state)=>state.fetchLeaderboard)
    useEffect(() => {
        const fetchData = async () => {
            await fetchLeaderboard(filter);
        }
        fetchData()
    }, [filter])

    return (
        <div className="rankings">
            <div className="r-table panel">
            <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Players (Username)</th>
                            <th>{filter}</th>
                        </tr>
                        {players.map((player,ind)=>{
                            return(
                                <tr key={ind}>
                                <td>{ind}</td>
                                <td>{player.username}</td>
                                <td>{`${getValueforPlayerKey(filter,player)}`}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Rankings;