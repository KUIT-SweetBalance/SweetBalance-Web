import './App.css';
import CustomMain from './pages/custom/custom-main/custom';
import UserNickname from './pages/onboarding/UserNickname';
import UserPassword from './pages/onboarding/UserPassword';
import Home from './pages/main/home/Home';       
import SearchDrink from './pages/search/searchDrink/SearchDrink'; 
import Mypage from './pages/mypage/Mypage';
import LoginButton from './pages/onboarding/Kakaotalk/LoginButton';
// import SearchDrink from './pages/search/searchDrink/SearchDrink';

const  App=()=> {
  return (
    // <CustomMain brand="스타벅스" drink="아이스 아메리카노" sugar={0} kcal={0} caffeine={5}/>
    // <Home />
    // <SearchDrink />
    <Mypage/>
    // <LoginButton/>
    // <UserNickname />
    // <UserPassword />
  );
}

export default App;
