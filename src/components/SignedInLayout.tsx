import React from 'react';
import { signOut } from 'next-auth/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Session } from 'next-auth';

const NavButtons = () => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => signOut()}
        className="flex gap-2 rounded bg-gray-200 p-4 font-bold text-gray-800 hover:bg-gray-100"
      >
        Logout <FaSignOutAlt size={24} />
      </button>
    </div>
  );
};

type Props = {
  children: React.ReactNode;
  user: Session['user'];
};

export default function SignedInLayout(props: Props) {
  const { children, user } = props;

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center justify-between bg-gray-800 text-white py-4 px-8 shadow">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          {user?.image && (
            <img
              src={user?.image}
              alt={`${user?.name} profile pic`}
              className="w-16 rounded-full"
            />
          )}
          {user?.name}
        </h1>
        <NavButtons />
      </div>
      <main className="py-8 flex flex-col gap-8">{children}</main>
    </div>
  );
}
