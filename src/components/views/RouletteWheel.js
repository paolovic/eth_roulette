import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import React, { useEffect, useState } from 'react';
import 'styles/views/RouletteWheel.scss';
import PropTypes from "prop-types";
import wheel from './assets/roulette-wheel.png'
import Web3 from 'web3';
import roulette_abi from "abi/roulette_abi.json"
import { useWeb3React } from "@web3-react/core"

const anglePerField = 360 / 37;
const msPerRotation = 10000; //milliseconds per rotation
const angularVelocity = 360 / msPerRotation; //angle per millisecond
const fields = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const fieldsColors = ["green", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black"];
const contractAddress = "0x8a86f335c2926e75E57e67bBA2F504F5704c80f3";

const FormField = props => {
    return (
        <div className="game field">
            <label className="game label">
                {props.label}
            </label>
            <input
                className="game input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    type: PropTypes.string,
    min: PropTypes.number
};


const RouletteWheel = () => {
    const [betOnRed, setBetOnRed] = useState(0)
    const [betOnBlack, setBetOnBlack] = useState(0)
    const [betOnOdd, setBetOnOdd] = useState(0)
    const [betOnEven, setBetOnEven] = useState(0)
    const [betOn1To12, setBetOn1To12] = useState(0)
    const [betOn13To24, setBetOn13To24] = useState(0)
    const [betOn25To36, setBetOn25To36] = useState(0)
    const [betOnNumber, setBetOnNumber] = useState(0)
    const [angle, setAngle] = useState(0);
    const [cssState, setCssState] = useState({ name: "wheel" });

    const { active, account, library, activate, deactivate } = useWeb3React();

    /* useEffect(() => {
        console.log(angle);
    }, [angle]); */

    const startRotation = async (winningField) => {
        const web3 = new Web3(library.givenProvider);
        const contract = new web3.eth.Contract(roulette_abi, contractAddress);
        await contract.methods.spinRoulette([19]).send({ from: account, value: 10000, gas: 100000 })
        setCssState({
            name: "wheel start-rotate"
        });
        const startTime = Date.now();
        //make call to smart contract
        await new Promise(r => setTimeout(r, 2534));
        const endTime = Date.now();
        const duration = endTime - startTime;
        var currentAngle;
        setAngle((previousAngle) => {
            currentAngle = (previousAngle + duration * angularVelocity) % 360;
            return currentAngle;
        });
        const currentPosition = Math.floor(currentAngle / anglePerField);
        const currentAngleOffset = currentAngle - currentPosition * anglePerField;
        currentAngle += currentAngleOffset;

        const winningPosition = fields.indexOf(winningField);
        const winningAngle = winningPosition * anglePerField;
        var angleDif = winningAngle - currentAngle;
        if (winningAngle < currentAngle) {
            angleDif += 360
        }
        //console.log(winningAngle)
        //setAngle(winningAngle);
        setAngle((previousAngle) => {
            var currentAngle2 = (previousAngle + angleDif) % 360;
            //console.log(currentAngle2)
            return currentAngle2;
        });
        var rotationDuration = angleDif / angularVelocity;
        await new Promise(r => setTimeout(r, rotationDuration));
        setCssState({
            name: "wheel start-rotate stop-rotate"
        });
    }

    return (
        <BaseContainer>
            <div className="game container">
                <div className="game form">
                    <div className='arrow'></div>
                    <img className={cssState.name} src={wheel} alt="Wheel" />
                    <Button className="wheel"
                        onClick={() => startRotation(19)}>SPIN</Button>
                </div>
            </div>
            <div className="game container">
                <div className="game form">
                    <h1>Place your bets</h1>
                    <FormField
                        label="Red"
                        value={betOnRed}
                        onChange={un => setBetOnRed(un)}
                        type="number" min={0}
                    />
                    <FormField
                        label="black"
                        value={betOnBlack}
                        onChange={n => setBetOnBlack(n)}
                        type="number" min={0}
                    />
                    <FormField
                        label="odd"
                        value={betOnOdd}
                        onChange={n => setBetOnOdd(n)}
                        type="number" min={0}
                    />
                    <FormField
                        label="even"
                        value={betOnEven}
                        onChange={n => setBetOnEven(n)}
                        type="number" min={0}
                    />
                    <FormField
                        label="1-12"
                        value={betOn1To12}
                        onChange={n => setBetOn1To12(n)}
                        type="number" min={0}
                    />
                    <FormField
                        label="13-24"
                        value={betOn13To24}
                        onChange={n => setBetOn13To24(n)}
                        type="number" min={0}
                    />
                    <FormField
                        label="25-36"
                        value={betOn25To36}
                        onChange={n => setBetOn25To36(n)}
                        type="number" min={0}
                    />
                    <FormField
                        label="Specific number"
                        value={betOnNumber}
                        onChange={n => setBetOnNumber(n)}
                        type="number" min={0}
                    />
                </div>
            </div>
        </BaseContainer>
    )
}

export default RouletteWheel;
