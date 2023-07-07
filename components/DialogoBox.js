import React, { useState, useEffect } from 'react';

const DialogScreen = ({tamanho, posicao, dialogText, cor, complete }) => {
    const [currentText, setCurrentText] = useState('');
    const [dialogVisible, setDialogVisible] = useState(true);

    useEffect(() => {
        const textLength = dialogText.length;
        let currentLength = 0;

        const interval = setInterval(() => {
            if (currentLength < textLength) {
                setCurrentText(dialogText.slice(0, currentLength + 1));
                currentLength++;
            } else {
                clearInterval(interval);
                complete();
            }
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, [dialogText]);

    return (
        <div className='centerDown'>
            {dialogVisible && (
                <div className='dialogoBox'>
                    <span style={{ whiteSpace: 'pre-wrap' , fontSize: '18px'}}>{currentText}</span>
                </div>
            )}
            <style jsx>{`
                .dialogoBox {
                    font-size: 10px;
                    position: absolute;
                    width: ${tamanho};
                    left: ${posicao};
                    backgroundColor: ${cor};
                    top: 10%;
                    left: 5%;
                    padding: 10px;
                    color: rgb(15, 5, 5);
                    font-size: 16px;
                    border: 1px solid #0a0a0a;
                    height: auto;
                    min-height: 100px; 
                    z-index: 9999;
                    background-color: #f1f1f1;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  };
                  
                  .centerDown {
                  position: fixed;
                  left: 50%;
                  top: 20%;
                  }
            `}</style>
        </div>
    );
};

export default DialogScreen;
