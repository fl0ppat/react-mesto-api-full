import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/api";
import auth from "../utils/auth";

import CurrentUserContext from "../contexts/CurrentUserContext";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupStatement] = useState(false);
  const [isUpdateAvatarPopupOpen, setUpdateAvatarPopupStatement] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupStatement] = useState(false);
  const [isFullImagePopupOpen, setFullImagePopupStatement] = useState(false);

  const [email, setEmail] = useState("");

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem("id"));
  const [selectedCard, selectCard] = useState({});

  useEffect(
    () =>
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err)),
    []
  );

  useEffect(() => {
    if (loggedIn) {
      auth
        .getUserData(window.localStorage.getItem("id"))
        .then((res) => {
          setEmail(res.data.email);
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCardLike(card) {
    if (!isLiked(card.likes)) {
      api
        .sendLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.error(err));
    } else {
      api
        .delLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.error(err));
    }
  }

  function isLiked(cardLikes) {
    return cardLikes.some((like) => {
      return like._id === currentUser._id;
    });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== id));
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch(() => console.error(`Cards loading Error`));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditProfileClick = () => setEditProfilePopupStatement(true);
  const handleEditAvatarClick = () => setUpdateAvatarPopupStatement(true);
  const handleAddPlaceClick = () => setAddCardPopupStatement(true);
  const handleFullImagePopupOpen = () => setFullImagePopupStatement(true);

  const handleCardSelection = (card) => selectCard(card);

  const closeAllPopups = () => {
    setEditProfilePopupStatement(false);
    setUpdateAvatarPopupStatement(false);
    setAddCardPopupStatement(false);
    setFullImagePopupStatement(false);
  };

  const handleUpdateUser = (data) => {
    api
      .editProfileData(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(
        setCurrentUser({
          name: "mr.Crot",
          about: "Приходит когда что-то сломалось",
        })
      );
  };

  const handleUpdateAvatar = (link) => {
    api
      .updateAvatar(link)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error("Ошибка установки аватара"));
  };

  const handleAddPlaceSubmit = (name, link) => {
    console.log(name, link);
    api
      .addNewCard(name, link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.error("Ошибка добавления карточки"));
  };

  const getUserAuthData = (token) => auth.getUserData(token).then((res) => setEmail(res.data.email));
  const handleLogin = (password, email) => auth.loginUser(password, email);
  const handleRegister = (password, email) => auth.registerUser(password, email);
  const handleSignOut = () => {
    window.localStorage.removeItem("id");
    setEmail("");
    setLoggedIn(false);
  };
  const onLogin = (token) => {
    window.localStorage.setItem("id", token);
    getUserAuthData(token);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={email} loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            path="/cards"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onUpdateAvatar={handleEditAvatarClick}
            onAddCard={handleAddPlaceClick}
            onOpenFull={handleFullImagePopupOpen}
            onCardSelect={handleCardSelection}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/sign-in">
            {!loggedIn ? (
              <Login handleLogin={handleLogin} onSignIn={setLoggedIn} onLogin={onLogin} />
            ) : (
              <Redirect to="/cards" />
            )}
          </Route>
          <Route path="/sign-up">
            {!loggedIn ? <Register handleRegister={handleRegister} /> : <Redirect to="/cards" />}
          </Route>
          <Route path="/">{loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          closeCallback={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isUpdateAvatarPopupOpen}
          closeCallback={closeAllPopups}
          onUpdateUserAvatar={handleUpdateAvatar}
          name="updateAvatar"
          title="Обновить аватар?"
          btnName="Да"
        />
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          closeCallback={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
          name="addCard"
          title="Новое место"
          btnName="Сохранить"
        ></AddPlacePopup>

        <ImagePopup isOpen={isFullImagePopupOpen} cardData={selectedCard} closeCallback={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
