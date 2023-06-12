import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@context'
import { ProductTour } from '@components'

import { Loader, PackContents, UserPacks } from './components'
import './OpenPacks.scss'

// Component for opening packs and displaying their contents
const OpenPacks = () => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage ?? {}

    const [packContents, setPackContents] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className='open-packs page center'>
            {stage === 2 && <ProductTour step={stage} />}
            {stage === 3 && <ProductTour step={stage} />}

            {packContents && !isLoading ? (
                <PackContents
                    packContents={packContents}
                    setPackContents={setPackContents}
                />
            ) : isLoading ? (
                <div className='loader-container'>
                    <Loader depth={60} />
                </div>
            ) : (
                <UserPacks
                    setIsLoading={setIsLoading}
                    setPackContents={setPackContents}
                />
            )}
        </div>
    )
}

export default OpenPacks
