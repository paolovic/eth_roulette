import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import 'styles/views/RouletteWheel.scss';
import wheel from './assets/roulette-wheel.png'

const RouletteWheel = () => {
    const [state, setState] = useState({ name: "circle" });

    const startRotation = () => {
        setState({
            name: "circle start-rotate"
        });
        setTimeout(() => {
            setState({
                name: "circle start-rotate stop-rotate"
            });
        }, Math.floor(Math.random() * 10000) + 1);
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
