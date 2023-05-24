import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useGlobalContext } from '../../context/GlobalContext'
import { Button, Footer } from '../../components'

import './Home.scss'
import ProductTour from '../../components/ProductTour/ProductTour'

const Home = () => {
    const { user } = useGlobalContext()
    const isLargeScreen = useMediaQuery('(min-width:1200px)')
    const stage = user?.onboardingStage

    return (
        <div className='home page'>
            {/* Will be conditionally rendered based on user's Onboarding progress */}
            <div className='section first'>
                {stage === 0 && <ProductTour step={0} />}
            </div>

            <div
                className={`section center gray second ${
                    isLargeScreen ? 'left' : ''
                }`}
            >
                <div className='box'>
                    <Button label='Battle' type='link' path='/battleSetup' />
                </div>
            </div>
            <div
                className={`section center third ${
                    isLargeScreen ? 'right' : ''
                }`}
            >
                <div className='box'>
                    <Button label='COllectiON' type='link' path='/collection' />
                </div>
            </div>
            <div
                className={`section center gray fourth ${
                    isLargeScreen ? 'left' : ''
                }`}
            >
                <div className='box'>
                    <Button label='MarKet' type='link' path='/packs' />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
