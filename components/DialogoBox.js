import React, { useState, useEffect } from 'react';

const DialogScreen = ({tamanho, posicao, dialogText, cor, complete, posicaoY }) => {
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
        <div>
            {dialogVisible && (
                <div className='dialogoBox'>
                    <span style={{ whiteSpace: 'pre-wrap'}}>{currentText}</span>
                </div>
            )}
            <style jsx>{`
                .dialogoBox {
                    position: absolute;
                    width: ${tamanho ? tamanho : '20%'};
                    left: ${posicao ? posicao : '5%'};
                    background-color: ${cor ? cor: 'blue'};
                    top: ${posicaoY ? posicaoY : '40%'};
                    padding: 10px;
                    color: rgb(15, 5, 5);
                    border: 1px solid #0a0a0a;
                    height: auto;
                    z-index: 100;
                    border-radius: 30px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
                    transform: translateY(-50%);
                    max-height: ${posicaoY ? posicaoY : '60%'};
                    overflow-y: auto;
                  };
            `}</style>
        </div>
    );
};

export default DialogScreen;
