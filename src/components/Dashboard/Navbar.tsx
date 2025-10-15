import React from 'react';
import UserCard from './UserCard';
import Logo from '../../assets/Logo.png';

type NavbarProps = {
  user: { name?: string; email: string; avatar?: string } | null;
  onLogout: () => void;
};

export default function Navbar({ user, onLogout }: NavbarProps): JSX.Element {
  return (
    <nav className="navbar">
      <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
         <img src={Logo} alt="Logo" style={{ height: 72 }} />
        {/* <h1 className="logo" style={{ margin: 0 }}>FusionCore</h1> */}
      </div>
      <div className="navbar-right">
        <UserCard user={user} onLogout={onLogout} />
      </div>
    </nav>
  );
}
