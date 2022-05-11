import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Button } from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";

const data = [
    { option: '0' },
    { option: '32' },
    { option: '15' },
    { option: '19' },
    { option: '4' },
    { option: '21' },
    { option: '2' },
    { option: '25' },
    { option: '17' },
    { option: '34' },
    { option: '6' },
    { option: '27' },
    { option: '13' },
    { option: '36' },
    { option: '11' },
    { option: '30' },
    { option: '8' },
    { option: '23' },
    { option: '10' },
    { option: '5' },
    { option: '24' },
    { option: '16' },
    { option: '33' },
    { option: '1' },
    { option: '20' },
    { option: '14' },
    { option: '31' },
    { option: '9' },
    { option: '22' },
    { option: '18' },
    { option: '29' },
    { option: '7' },
    { option: '28' },
    { option: '12' },
    { option: '35' },
    { option: '3' },
    { option: '26' }
]



export const RouletteWheel = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        setMustSpin(true)
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber)
    }

    return (

        <BaseContainer>
                <div className="login form">
                    <Wheel
                        className="login wheel"
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        backgroundColors={['#016D29',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                            '#df3428', '#3e3e3e',
                        ]}
                        textColors={['#ffffff']}

                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                        innerBorderWidth={2}
                        radiusLineColor={'yellow'}
                        radiusLineWidth={1}
                        innerRadius={30}
                        textDistance={80}
                        spinDuration={1}
                    />
                    <Button onClick={handleSpinClick}>SPIN</Button>
                </div>
        </BaseContainer>
    )
} 