import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import 'styles/views/RouletteWheel.scss';
import wheel from './assets/roulette-wheel.png'

const RouletteWheel = () => {
    const [state, setState] = useState({ name: "circle" });

    const startRotation = async () => {
        setState({
            name: "circle start-rotate"
        });
        var startTime = Date.now();
        await new Promise(() => setTimeout(() => {
            setState({
                name: "circle start-rotate stop-rotate"
            });
        }, 2000));
        var endTime = Date.now();
        console.log(endTime - startTime);
    }

    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <div className='arrow'></div>
                    <img className={state.name} src={wheel} alt="Wheel" />
                    <Button className="wheel"
                        onClick={startRotation}>SPIN</Button>
                </div>
            </div>
        </BaseContainer>
    )
}

export default RouletteWheel;
