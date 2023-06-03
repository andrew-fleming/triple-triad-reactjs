import React from 'react'
import { cardback } from '@assets'
import './Card.scss'

const Card = ({ card, handleClick, isShowing, isSelected }) => {
    const { color, _id, image, values } = card || {}

    return (
        <div
            className={`card ${isShowing ? 'flipped' : ''} ${
                isSelected ? 'selected' : ''
            }`}
            id={_id}
            onClick={(e) => handleClick(e)}
        >
            <div
                className='card__side card__front'
                style={{ backgroundColor: color }}
            >
                <img className='card__image' src={image} alt={_id} />
                <div className='card__values'>
                    <span className='up'>{values[0]}</span>
                    <span className='right'>{values[1]}</span>
                    <span className='down'>{values[2]}</span>
                    <span className='left'>{values[3]}</span>
                </div>
            </div>
            <div className='card__side card__back'>
                <img className='card__image' src={cardback} alt={_id} />
            </div>
        </div>
    )
}

export default Card
