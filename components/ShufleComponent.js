import { useEffect, useState } from 'react';

const ShuffleComponent = ({ items, onReorder }) => {
  
  const [shuffledItems, setShuffledItems] = useState([]);

  useEffect(() => {
    shuffleItems();
  }, [items]);

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData('text/plain');
    const toIndex = event.target.getAttribute('data-index');
    onReorder(fromIndex, toIndex);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{width: '400px', left: '10%', zIndex: '9999'}}>
      <h2>Organize os itens arrastando-os na ordem correta:</h2>
      <ul>
        {shuffledItems.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            data-index={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShuffleComponent;
