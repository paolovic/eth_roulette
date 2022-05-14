import { Button } from 'components/ui/Button';
import React, { useState } from 'react';
import 'styles/views/RouletteWheel.scss';

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
        <div>
            <div className='arrow'></div>
            <ul className={state.name}>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    0
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    1
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    2
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    3
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    4
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    5
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    6
                </div></li><li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    7
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    8
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    9
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    10
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    11
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    12
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    13
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    14
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    15
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    16
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    17
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    18
                </div></li><li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    19
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    20
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    21
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    22
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    23
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    24
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    25
                </div></li><li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    26
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    27
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    28
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    29
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    30
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    31
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    32
                </div></li><li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    33
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    34
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    35
                </div></li>
                <li><div className='text'
                    contentEditable='true'
                    spellCheck='false'>
                    36
                </div></li>
            </ul>
            <Button className="wheel"
                onClick={startRotation}>SPIN</Button>
        </div>
    )
}

export default RouletteWheel;
