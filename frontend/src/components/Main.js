import React, { useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const { onEditProfile, onUpdateAvatar, onAddCard, onOpenFull, onCardSelect } = props;
  const currentUser = useContext(CurrentUserContext);

  const [isPreloading, setPreloadingStatement] = useState({
    cards: false,
    profile: false,
  });

  function isAuthor(ownerId) {
    return ownerId === currentUser._id;
  }

  function isLiked(cardLikes) {
    return cardLikes.some((like) => {
      return like._id === currentUser._id;
    });
  }

  return (
    <main>
      <section className="profile">
        <div
          className={isPreloading.profile ? "profile__avatar skeleton" : "profile__avatar"}
          onClick={() => onUpdateAvatar(true)}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          <div className="profile__change-icon" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className={isPreloading.profile ? "profile__name skeleton" : "profile__name"}>{currentUser.name}</h1>
            <button type="button" className="profile__edit" onClick={() => onEditProfile()} />
          </div>
          <p className={isPreloading.profile ? "profile__subtitle skeleton" : "profile__subtitle"}>
            {currentUser.about}
          </p>
        </div>
        <button type="button" className="button button_type_add" onClick={() => onAddCard()} />
      </section>
      <section className="cards">
        <ul className="grid-cards">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              link={card.link}
              name={card.name}
              likesAmount={card.likes.length}
              isLiked={isLiked(card.likes)}
              isAuthor={isAuthor(card.owner._id)}
              openFull={onOpenFull}
              onCardLike={() => props.onCardLike(card)}
              onCardDelete={() => props.onCardDelete(card._id)}
              selectCard={() => {
                onCardSelect(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
