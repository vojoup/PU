import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button(props: Props) {
  const { children, onClick } = props;

  return (
    <button
      className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-2xl text-black"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
