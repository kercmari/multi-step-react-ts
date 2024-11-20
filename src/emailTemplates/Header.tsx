import React from 'react';

const Header: React.FC = () => (
  <div
    style={{
      backgroundImage: 'url(https://i.ibb.co/LRK77K7/Group-175.png)',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '300px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    }}
  >
    <img
      src="https://i.ibb.co/TkWSG1b/Group-171.png"
      alt="Logo"
      style={{
        width: '150px',
        height: '55px',
        marginTop: '120px',
        marginLeft: '2rem',
      }}
    />
  </div>
);

export default Header;