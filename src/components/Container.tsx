import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Container(props: Props) {
  const { children } = props;
  return (
    <div className="bg-slate-800 shadow rounded px-2.5 py-2 text-white box-border">
      {children}
    </div>
  );
}
