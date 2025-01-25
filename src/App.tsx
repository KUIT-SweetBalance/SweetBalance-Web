import './App.css';
import CustomMain from './pages/custom/custom';
import UserNickname from './pages/onboarding/UserNickname';
import UserPassword from './pages/onboarding/UserPassword';
import Home from './pages/main/home/Home';       
import SearchDrink from './pages/search/searchDrink/SearchDrink'; 
import Mypage from './pages/mypage/Mypage';
import LoginButton from './pages/onboarding/Kakaotalk/LoginButton';
// import SearchDrink from './pages/search/searchDrink/SearchDrink';
import EditDrink from './pages/main/edit/EditDrink';
import EditDrinkModal from './pages/main/modal/EditDrinkModal';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';
import LargeFavoriteDrinkModal from './pages/main/modal/LargeFavoriteDrinkModal';
import SmallFavoriteDrinkModal from './pages/main/modal/SmallFavoriteDrinkModal';
import EditCompleted from './pages/main/edit/EditCompleted';
import Alarm from './pages/main/alarm/Alarm';

const App = () => {
  return (
    // <CustomMain brand="스타벅스" drink="아이스 아메리카노" sugar={0} kcal={0} caffeine={5}/>
    // <Home />
    // <SearchDrink />
    // <Mypage/>
    // <LoginButton/>
    // <UserNickname />
    // <UserPassword />
    // <EditDrink />
    // <EditDrinkModal />
    // <LargeFavoriteDrinkModal />
    <Router />
    // <SmallFavoriteDrinkModal />
    // <EditCompleted />
    // <Alarm />
  );
};

export default App;
