import React, { useState, useEffect } from 'react'
import { AuthForm } from '../../components'
import { logo } from '../../assets/logos'
import './LandingPage.scss'

const LandingPage = ({ register }) => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const handleResize = () => {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize, false)
    }, [])

    return (
        <div className='landing page'>
            <div className='auth box'>
                <img
                    className={`${register ? 'logo-register' : 'logo'}`}
                    src={logo}
                    alt='logo'
                />
                <AuthForm register={register} />
            </div>
            {dimensions.width > 1200 &&
            dimensions.height !== window.screen.availHeight ? (
                <div className='tip__fullscreen'>
                    *Press F11 for fullscreen experience.
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default LandingPage
