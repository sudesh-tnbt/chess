import './tile.css'

interface Props {
    number: number
}
export default function Tile({number}:Props) {
    if (number % 2 === 0) {
        return <div className='black-tile'></div>
    }
    else {
        return <div className='white-tile'></div>
    }
}