import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { CPUCardProvider } from './context/CPUCardContext'
import { useGlobalContext } from './context/GlobalContext'

import { NavBar } from './components'
import {
    LandingPage,
    Home,
    Battle,
    Match,
    MatchEnd,
    MatchSetup,
    Collection,
    Packs,
    Account,
} from './pages'
import './App.scss'

function App() {
    const { getAllCards, allCards } = useGlobalContext()
    const { pathname } = useLocation()

    useEffect(() => {
        if (allCards.length === 0) {
            getAllCards()
        }
    }, [])

    return (
        <CPUCardProvider>
            {pathname !== '/match' && pathname !== 'matchEnd' && <NavBar />}
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<LandingPage register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/battle' element={<Battle />} />
                <Route path='/matchSetup' element={<MatchSetup />} />
                <Route path='/match' element={<Match />} />
                <Route path='/matchEnd' element={<MatchEnd />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/packs' element={<Packs />} />
                <Route path='/account' element={<Account />} />
            </Routes>
        </CPUCardProvider>
    )
}

export default App
