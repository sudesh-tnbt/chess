import React from 'react';

import './Chessboard.css';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
export default function Chessboard() {
    let board = [];
    for (let i = verticalAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            if ((i + j) % 2 == 0) {
                board.push(<div className='black-tile'></div>)
            }
            else {
                board.push(<div className='white-tile'></div>)
            }
        } 
    } 
    return <div id = "chessboard">{board}
    </div> 
}
