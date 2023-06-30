import React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { api } from "../utils/api";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { DeletePlacePopup } from "./DeletePlacePopup";
import { Login } from "./Login";
import { Register } from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import { InfoTooltip } from "./InfoTooltip";
import { getCurrentUser } from "../utils/auth";

function App() {

  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltipParams, setInfoTooltipParams] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser ] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setDeletePlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleRegistrationClick({imgLink, text, name}) {
    setInfoTooltipOpen(true);
    setInfoTooltipParams({imgLink, text, name})
  }


  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setDeletePlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleLogin(currentUserEmail) {
    setLoggedIn(true);
    setCurrentUserEmail(currentUserEmail);
  }

  function handleLogOut() {
    setLoggedIn(false);
    setCurrentUserEmail('');
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log('tokenCheck');

      if(token) {
        getCurrentUser(token).then(result => {
          if (result) {
            setLoggedIn(true);
            console.log({result});
            console.log(result.email);
            setCurrentUserEmail(result.data.email)
            navigate("/", {replace: true})
          }
        })
      }
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])

  
  React.useEffect(
    () => {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    }, []
  );

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(isLiked, card._id)
      .then((newCard) => {
        setCards(state => state.map(cardSame => cardSame._id === card._id ? newCard : cardSame));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(cardSame => cardSame._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(newUser) {
    setIsLoading(true);
    api.patchUser(newUser)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.patchAvatar(newAvatar)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api.postNewCard(cardData)
      .then( (newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
    
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        isLoggedIn={loggedIn}
        handleLogOut={handleLogOut}
        email={currentUserEmail}
      />

      <Routes>
        <Route path="/" element={
          <ProtectedRoute
            element={Main}
            isLoggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace ={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />}
        />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route path="/sign-up" element={<Register onRegister={handleRegistrationClick}/>} />
        <Route path="*" element={<Login handleLogin={handleLogin} />} />
      </ Routes>  

      {loggedIn && <Footer />}

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <DeletePlacePopup 
      card={selectedCard}
      isOpen={isDeletePlacePopupOpen}
      onClose={closeAllPopups}
      onUpdateCardDelete={handleUpdateCardDelete}
      
      />

      <ImagePopup
        isOpen={isImagePopupOpen} 
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        infoTooltipParams={infoTooltipParams}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />

    </ CurrentUserContext.Provider>
  );
}

export default App;
