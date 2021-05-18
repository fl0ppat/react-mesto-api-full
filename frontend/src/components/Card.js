import React from 'react';

function Card(props) {
  function handleCardClick() {
    props.selectCard();
    props.openFull(true);
  }

  return (
    <li className="grid-cards__card">
      <img src={props.link} alt={props.name} onClick={() => handleCardClick()} className="grid-cards__img" />
      {props.isAuthor && (
        <button type="button" className="grid-cards__delete" onClick={() => props.onCardDelete()} />
      )}

      <div className="grid-cards__badge">
        <h2 className="grid-cards__title">{props.name}</h2>
        <div className="grid-cards__like-container">
          <button
            onClick={() => props.onCardLike()}
            type="button"
            className={props.isLiked ? 'grid-cards__like grid-cards__like_liked' : 'grid-cards__like'}
          />
          <p className="grid-cards__like-counter">{props.likesAmount}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
