import React from 'react';

interface NoContentsProps {
  height: string;
}

const NoContents = (props: NoContentsProps) => {
  return (
    <div
      className={`flex justify-center items-center w-full text-gray_text text-[14px]`}
      style={{ height: props.height }}
    >
      아직 기록이 없습니다
    </div>
  );
};

export default NoContents;
