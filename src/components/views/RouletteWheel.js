import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import React, { useEffect, useState, useRef } from 'react';
import 'styles/views/RouletteWheel.scss';
import wheel from './assets/roulette-wheel.png'
import Web3 from 'web3';
import roulette_abi from "abi/roulette_abi.json"
import { useWeb3React } from "@web3-react/core"
import croupier from 'styles/images/croupier.png'
import "styles/views/Game.scss";

const anglePerField = 360 / 37;
const msPerRotation = 10000; //milliseconds per rotation
const angularVelocity = 360 / msPerRotation; //angle per millisecond
const fields = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const contractAddress = "0x666209CD9248D5D9E6fb55cB14e06B0ED9d724f8";

const FormField = props => {
    return (
        <div className="game field">
            <label className="game label">
                {props.label}
            </label>
            <input
                className={props.className}
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
            {
                props.showUnits ? <span className="game units">ETH</span> : null
            }
        </div>
    );
};


const RouletteWheel = () => {
    const [betNumbers, setBetNumbers] = useState([]);
    const [betAmount, setBetAmount] = useState(0);
    const [angle, setAngle] = useState(0);
    const [cssState, setCssState] = useState({ name: "wheel" });
    const [balance, setBalance] = useState(null);
    const [hasWon, setHasWon] = useState(null);
    const startTime = useRef();

    const { account, library } = useWeb3React();

    var web3 = new Web3(library.givenProvider);
    var contract = new web3.eth.Contract(roulette_abi, contractAddress);



    useEffect(() => {
        async function fetchData() {
            contract.events.allEvents({
                fromBlock: 'latest',
            }, async function (error, event) {
                if (error) {
                    alert("error while subscribing to event");
                }
                else {
                    stopRotation(event);
                    setHasWon(event.event==="Win");
                    let b = await web3.eth.getBalance(account);
                    setBalance(Web3.utils.fromWei(b));
                }
                console.log(event)
            }
            )
            let b = await web3.eth.getBalance(account);
            setBalance(Web3.utils.fromWei(b));
        }
        fetchData();
    }, []);

    const stopRotation = async (event) => {
        var endTime = Date.now();
        const duration = endTime - startTime.current;

        var currentAngle;
        setAngle((previousAngle) => {
            currentAngle = (previousAngle + duration * angularVelocity) % 360;
            return currentAngle;
        });
        const currentPosition = Math.floor(currentAngle / anglePerField);
        const currentAngleOffset = currentAngle - currentPosition * anglePerField;
        currentAngle += currentAngleOffset;

        const winningField = parseInt(event.returnValues.result);
        const winningPosition = fields.indexOf(winningField);
        const winningAngle = winningPosition * anglePerField;
        var angleDif = winningAngle - currentAngle;
        if (winningAngle < currentAngle) {
            angleDif += 360
        }
        setAngle((previousAngle) => {
            var currentAngle2 = (previousAngle + angleDif) % 360;
            return currentAngle2;
        });
        var rotationDuration = (angleDif / angularVelocity) + 230;
        await new Promise(r => setTimeout(r, rotationDuration));
        setCssState({
            name: "wheel start-rotate stop-rotate"
        });
    }

    const startRotation = async () => {
        startTime.current = Date.now();
        setCssState({
            name: "wheel start-rotate"
        });
        await contract.methods.spinRoulette(betNumbers).send({ from: account, value: betAmount })
    }

    return (
        <BaseContainer>
            <div className="wheel container">
                <div className="wheel arrow"></div>
                <img className={cssState.name} src={wheel} alt="Wheel" />
                {hasWon !== null && <div className="game win-message" style={{ color: hasWon ? 'white' : 'red' }}>{hasWon ? 'Congratulations! You have won!' : 'Loser! Your parents were right...'}</div>}
                <Button className="wheel button" disabled={betAmount === 0 || betNumbers.length === 0 || cssState.name === "wheel start-rotate"}
                    onClick={startRotation}
                >SPIN</Button>
            </div>
            <div className="game container">
                <img className="croupier" src={croupier} alt="croupier" />
                <div className="game balance">Player Balance: {balance} ETH</div>
                <div className="game form">
                    <div>
                        <h1 className="game title">Place your bets</h1>
                        <FormField
                            className="game amount"
                            label="Bet amount"
                            value={betAmount}
                            placeholder="Introduce the bet amount..."
                            onChange={n => {
                                if (cssState.name !== "wheel start-rotate") {
                                    setBetAmount(n)
                                }
                            }
                            }
                            showUnits={true}
                        >
                        </FormField>
                    </div>
                    <div>
                        <Button className="game button big"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}>1 to 12</Button>
                        <Button className="game button big"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])}>13 to 24</Button>
                        <Button className="game button big"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])}>25 to 36</Button>
                    </div>
                    <div>
                        <Button className="game button small"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36])}>EVEN</Button>
                        <Button className="game button small red"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3])}>RED</Button>
                        <Button className="game button small black"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26])}>BLACK</Button>
                        <Button className="game button small"
                            disabled={cssState.name === "wheel start-rotate"}
                            onClick={() => setBetNumbers([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35])}>ODD</Button>
                    </div>
                    <FormField
                        className="game input"
                        label="Bet numbers"
                        value={betNumbers}
                        placeholder="Introduce a single number or choose an option..."
                        onChange={n => {
                            if (cssState.name !== "wheel start-rotate") {
                                if (n !== '') {
                                    setBetNumbers([n])
                                }
                                else {
                                    setBetNumbers([]);
                                }
                            }
                        }}
                        showUnits={false}
                    />
                </div>
            </div>
        </BaseContainer>
    )
}

export default RouletteWheel;
