import './App.css';
import CustomMain from './pages/custom/custom-main/custom';
// import TailwindExample from './pages/TailwindExample';
// import UserNickname from './pages/onboarding/UserNickname';
import UserPassword from './pages/onboarding/UserPassword';
interface Props {
  brand : string;
  drink : string;
  sugar : number;
  kcal: number;
  caffeine: number;
}
const  App=()=> {
  return (
    <CustomMain brand="스타벅스" drink="아이스 아메리카노" sugar={0} kcal={0} caffeine={5}/>
  );
}

export default App;
