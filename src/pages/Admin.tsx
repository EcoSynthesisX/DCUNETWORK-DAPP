import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const Admin: React.FC = () => {
  const [tokenId, setTokenId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenId(event.target.value);
  };

  const handleButtonClick = () => {
    if (tokenId) {
      navigate(`/upgrade/${tokenId}`);
    }
  };

  return (
    <div className="page-wrap">
    <div className="navbar border">
      <a
        href="/"
        className="logotype w-inline-block w--current"
      >
        <p className="logo">DECLEANUP NETWORK</p>
      </a>
      <div>
        {/* <a href="#" className="icon w-inline-block">
          <img src="images/Group-118.svg" loading="lazy" alt="" />
        </a> */}
        <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
          <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
        </a>
        <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
          <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
        </a>
      </div>
    </div>
    <div className="heading-wrap">
      <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
      <h1 className="is-mob is-hide-mob">De Cleanup Rewards</h1>
    </div>
    <div className="admin">
    <h1 style={{ color: 'white' }}>Admin Panel</h1>
      <input
        type="text"
        value={tokenId}
        onChange={handleInputChange}
        placeholder="Enter Token ID"
        style={{
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '3px solid #000',
          color: 'black',
          width: '80%',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          textAlign:'center'
        }}
      />
    </div>
    <div className="button-wrap border">
    <a
        onClick={handleButtonClick}
        className="button"
      >
        upgrade
      </a>
    </div>
    <div className="footer">
      <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
      <p className="logo-a">ARBITRUM</p>
    </div>
  </div>
  );
};

export default Admin;
