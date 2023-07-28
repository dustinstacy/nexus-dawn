import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { useGlobalContext } from '@context'
import { NavBar } from '@components'
import {
    Account,
    Battle,
    BattleIntro,
    Collection,
    Forge,
    Home,
    Landing,
    Market,
    OpenPacks,
    OpponentSelect,
    Rules,
} from '@pages'

import './styles/layout.scss'
import './styles/modules.scss'
import './styles/state.scss'
import './styles/theme.scss'

function App() {
    const { getGlobalState } = useGlobalContext()
    const { pathname } = useLocation()

    useEffect(() => {
        getGlobalState()
    }, [])

    return (
        <>
            {pathname !== '/battle' && <NavBar landing={false} />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Landing register={false} />} />
                <Route path='/register' element={<Landing register />} />
                <Route path='/opponentSelect' element={<OpponentSelect />} />
                <Route path='/battleIntro' element={<BattleIntro />} />
                <Route path='/battle' element={<Battle />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/market' element={<Market />} />
                <Route path='/packs' element={<OpenPacks />} />
                <Route path='/forge' element={<Forge />} />
                <Route path='/rules' element={<Rules />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </>
    )
}

export default App
