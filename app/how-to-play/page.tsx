"use client"

import React from "react"

import { Onboarding } from "@components"
import { useUserStore } from "@stores"

import { howToPlay } from "./constants"
import "./howToPlay.scss"

const HowToPlay = () => {
    const user = useUserStore((state) => state.user)
    const stage = user?.onboardingStage ?? {}

    return (
        <div className='how-to-play page center'>
            {(stage === 4 || stage === 5) && <Onboarding />}
            {howToPlay.map((panel) => (
                <div key={panel.header} className='panel center-column'>
                    <h1>{panel.header}</h1>
                    <div className='panel-body'>
                        {panel.body.map((section) => (
                            <div key={section.title} className='panel-section'>
                                <h2>{section.title}</h2>
                                <ul className='panel-section-content'>
                                    {section.content.map((content) => (
                                        <li key={content.line.slice(0, 10)}>{content.line}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HowToPlay
