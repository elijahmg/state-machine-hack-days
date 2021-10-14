import React from 'react';

interface Props {
  children: React.ReactNode
  className?: string;
  onClick: () => void;
}

export function Button({ children, onClick, className }: Props) {
  return <button className={`${className} text-white font-bold py-2 px-4 rounded`}
                 onClick={onClick}>{children}</button>
}
