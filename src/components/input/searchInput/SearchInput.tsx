import { UseFormRegister, FieldErrors } from 'react-hook-form';
import magnifyingglass from '../../../assets/magnifyingglass.png';

interface SearchInputProps {
  id: string;
  label?: string;
  type: string;
  placeholder: string;
  height?: string;
  register: UseFormRegister<any>;
  onSearch: () => void;
}

const SearchInput = ({ height = '40px', ...props }: SearchInputProps) => {
  return (
    <div className="flex w-full relative">
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.id)}
        className="w-full p-[12px] border rounded-full placeholder-[#BABABA] bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="button"
        onClick={props.onSearch}
        className="absolute right-5 top-1/2 -translate-y-1/2"
      >
        {/* top-1/2를 하면 요소의 최상단이 부모의 1/2지점에 위치하게 됨 */}
        {/* -> 버튼이 시각적으로 부모의 중심에 위치하도록 하려면 translate를 통해 이 요소(버튼)의 크기의 절반만큼 y축으로 올려야 함 */}
        <img src={magnifyingglass} alt="검색버튼" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchInput;
