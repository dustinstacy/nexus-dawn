"use client"
import { Rankings } from "./components"
import Controls from "./components/Controls/Controls"
import './leaderboard.scss'

const Leaderboard = ()=>{
    return (
        <div className="leaderboard page">
            <Controls/>
            <Rankings/>
        </div>
    )
}
export default Leaderboard