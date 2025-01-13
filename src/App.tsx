import './App.css';
import CustomMain from './pages/custom/custom-main/custom';
import UserNickname from './pages/onboarding/UserNickname';
import UserPassword from './pages/onboarding/UserPassword';
import Home from './pages/main/home/Home';       
import SearchDrink from './pages/search/searchDrink/SearchDrink'; 
// import SearchDrink from './pages/search/searchDrink/SearchDrink';
import EditDrink from './pages/main/edit/EditDrink';
import EditDrinkModal from './pages/main/edit/EditDrinkModal';

const  App=()=> {
  return (
    // <CustomMain brand="스타벅스" drink="아이스 아메리카노" sugar={0} kcal={0} caffeine={5}/>
    // <Home />
    // <SearchDrink />
    // <UserNickname />
    // <UserPassword />
    // <EditDrink />
    <EditDrinkModal /> 
  );
}

export default App;
