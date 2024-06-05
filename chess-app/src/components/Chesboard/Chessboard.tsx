import React, { useRef } from 'react';

import './Chessboard.css';
import Tile from '../Tile/tile';

const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];

interface Piece  {
    image: string,
    x : number,
    y: number
}

const pieces: Piece[] = []

for (let i = 0; i < 2; i++) {
    const type1 = (i === 0)? 'b':'w'
    const type2 = (i === 0)? 7: 0
    pieces.push({image: `assets/images/rook_${type1}.png`, x: 0, y: type2})
    pieces.push({image: `assets/images/rook_${type1}.png`, x: 7, y: type2})
    pieces.push({image: `assets/images/knight_${type1}.png`, x: 1, y: type2})
    pieces.push({image: `assets/images/bishop_${type1}.png`, x: 5, y: type2})
    pieces.push({image: `assets/images/queen_${type1}.png`, x: 3, y: type2})
    pieces.push({image: `assets/images/king_${type1}.png`, x: 4, y: type2})
    pieces.push({image: `assets/images/bishop_${type1}.png`, x: 2, y: type2})
    pieces.push({image: `assets/images/knight_${type1}.png`, x: 6, y: type2})
}

for (let i = 0; i < 8; i++) {
    pieces.push({image: "assets/images/pawn_w.png", x: i, y: 1})
    pieces.push({image: "assets/images/pawn_b.png", x: i, y: 6})
}


export default function Chessboard() {
    const chessboardRef = useRef<HTMLDivElement>(null)
    let board = []

    let activePiece: HTMLElement | null = null

    function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement
    if(element.classList.contains("chess-piece")) {
        const x = e.clientX - 50
        const y = e.clientY - 50
        element.style.position = "absolute"
        element.style.left = `${x}px`
        element.style.top = `${y}px`
        activePiece = element
    }    
 }

    function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if(activePiece && chessboard) {
        const minX = (chessboard.offsetLeft - 25)
        const minY = (chessboard.offsetTop - 25)
        const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75
        const maxY = chessboard.offsetTop + chessboard.clientHeight -75
        const x = e.clientX - 50
        const y = e.clientY - 50
        activePiece.style.position = "absolute"

        //If x is smaller than minimum amount
        if (x < minX) {
            activePiece.style.left = `${minX}px`
        } 
        //If x is bigger than maximum amount
        else if (x > maxX) {
            activePiece.style.left = `${maxX}px`
        } else {
            activePiece.style.left = `${x}px`
        }

        //If y is smaller than minimum amount
        if (y < minY) {
            activePiece.style.top = `${minY}px`
        } 
        //If y is bigger than maximum amount
        else if (y > maxY) {
            activePiece.style.top = `${maxY}px`
        } else {
            activePiece.style.top = `${y}px`
        }
    }    
}

    function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
        activePiece = null
    }
  }
    for (let i = verticalAxis.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontalAxis.length; j++) {
        let image = ''
        pieces.forEach(p => {
            if(p.x === j && p.y === i) {
                    image = p.image
            }
        })
        board.push(<Tile number = {i + j} image = {image}></Tile>)
    } 
} 
    return <div 
    onMouseMove = {e => movePiece(e)} 
    onMouseDown = {e => grabPiece(e)} 
    onMouseUp = {e => dropPiece(e)}
    id = "chessboard"
    ref = {chessboardRef}
    > {board}
    </div> 
 }
