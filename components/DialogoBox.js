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
                <div className='dialogoBox' style={{width: `${tamanho}`, left: `${posicao}`, backgroundColor: `${cor}`}}>
                    <span style={{ whiteSpace: 'pre-wrap' , fontSize: '20px'}}>{currentText}</span>
                </div>
            )}
        </div>
    );
};

export default DialogScreen;
