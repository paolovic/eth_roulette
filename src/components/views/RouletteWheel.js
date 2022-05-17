import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import 'styles/views/RouletteWheel.scss';
import wheel from './assets/roulette-wheel.png'

const RouletteWheel = () => {
    const rotationSpeed = 10000;
    const [angle, setAngle] = useState(0);
    const [cssState, setCssState] = useState({ name: "wheel" });

    const startRotation = async () => {
        setCssState({
            name: "wheel start-rotate"
        });
        var startTime = Date.now();
        await new Promise(r => setTimeout(r, 1000));
        setCssState({
            name: "wheel start-rotate stop-rotate"
        });
        var endTime = Date.now();
        var duration = endTime - startTime;
        setAngle(angle + duration / rotationSpeed * 360);
        console.log(angle);
    }

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <div className='arrow'></div>
                    <img className={cssState.name} src={wheel} alt="Wheel" />
                    <Button className="wheel"
                        onClick={startRotation}>SPIN</Button>
                </div>
            </div>
        </BaseContainer>
    )
}

export default RouletteWheel;
