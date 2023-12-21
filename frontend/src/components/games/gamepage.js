// Gamepage.js
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Heading</h1>
      <div>
        <a href="https://cdn.htmlgames.com/ColoringMandalas/" target="_blank" rel="noopener noreferrer">
          <button style={buttonStyle1}>Play Game 1</button>
        </a>
      </div>
      <div style={{ marginTop: '20px' }}>
        <a href="https://cdn.htmlgames.com/YourSecondGame/" target="_blank" rel="noopener noreferrer">
          <button style={buttonStyle2}>Play Game 2</button>
        </a>
      </div>
    </div>
  );
};

const buttonStyle1 = {
  fontSize: '18px',
  padding: '15px 30px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const buttonStyle2 = {
  fontSize: '18px',
  padding: '15px 30px',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default HomePage;
