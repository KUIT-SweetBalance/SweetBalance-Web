import React from 'react';

interface NoContentsProps {
  contentString: string;
}

const NoContents = (props: NoContentsProps) => {
  return (
    <div
      className={`flex flex-grow justify-center items-center w-full text-gray_text text-[14px]`}
      // style={{ height: props.height }}
    >
      {props.contentString}
    </div>
  );
};

export default NoContents;
