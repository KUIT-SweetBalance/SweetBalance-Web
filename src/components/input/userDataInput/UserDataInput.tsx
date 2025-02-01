// 닉네임
// 비밀번호
// 프로필 한 줄 소개 설정
// 브랜드와 제품 검색, 나의 음료 기록 검색
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import visibility from '../../../assets/visibility.png';

interface UserDataInputProps {
  useFormMode?: 'onChange' | 'onBlur' | 'onSubmit'; // useForm의 mode
  id: string; // input태그의 id
  label?: string; // label의 텍스트
  type: string; // input태그의 타입
  placeholder: string;
  requiredMessage: string; // 유효성 검사 메시지
  pattern?: {
    value: RegExp;
    message: string; // 정규식 유효성 검사 실패 시 메시지
  };
  validate?: (value: string) => boolean | string;
  position?: 'center' | 'left';

  // useForm을 단일 인스턴스로 공유해야 하므로 UserDataInput컴포넌트를 호출한 컴포넌트에서 넘겨받는 props 선언
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;

  // 비밀번호를 보여줄 지 가릴 지 선택하는 기능 관련 props
  togglePasswordVisibility?: () => void;
  showPassword?: boolean;
}

const UserDataInput = ({
  useFormMode = 'onChange',
  position = 'left',
  ...props
}: UserDataInputProps) => {
  return (
    <div
      className={`flex flex-col ${position === 'center' ? 'items-center' : 'items-start'}`}
    >
      {props.label && (
        <label className="mb-2 text-[16px]" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <div className="w-full relative">
        <input
          className={`
          w-full
          h-[6.52vh]
          p-3 
          border 
          rounded-full 
          text-base
          text-[#909090] 
          placeholder-gray-400
          focus:outline-none 
          focus:ring-1 
          focus:ring-primary 
          focus:placeholder-transparent ${
            props.errors[props.id]
              ? 'border-red-300 focus:ring-red-400'
              : 'border-gray-300'
          } ${position === 'center' ? 'text-center' : 'text-left'}`}
          id={props.id}
          type={props.showPassword ? 'text' : props.type}
          placeholder={props.placeholder}
          {...props.register(props.id, {
            required: props.requiredMessage,
            ...(props.pattern ? { pattern: props.pattern } : {}),
            ...(props.validate ? { validate: props.validate } : {}),
          })}
        />
        {props.togglePasswordVisibility && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary"
            onClick={props.togglePasswordVisibility}
          >
            <img
              src={visibility}
              alt="비밀번호 보기, 가리기"
              className="w-[20px] h-[20px]"
            />
          </button>
        )}
      </div>
      {props.errors[props.id]?.message && (
        <p
          className={`mt-2 text-sm text-red-500 ${
            position === 'center' ? 'text-center' : 'text-left'
          }`}
        >
          {props.errors[props.id]?.message as string}
        </p>
      )}
    </div>
  );
};

export default UserDataInput;
