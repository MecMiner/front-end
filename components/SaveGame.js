import config from '@/config';
import { useEffect } from 'react';

const SaveGame = ({ id, info }) => {
    const apiUrl = config.apiUrl
    const saveToDatabase = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/respostas/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(info),
            });
            if (response.ok) {
                console.log('Valores inseridos no banco');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    useEffect(() => {
        saveToDatabase();
    }, []);

    return null;
};

const SaveUser = ({ user }) => {
    const apiUrl = config.apiUrl
    const saveToDatabase = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${apiUrl}/setPts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(user),
            })
            if (response.ok) {
                console.log('Valores inseridos no banco');
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
        }
    };

    useEffect(() => {
        saveToDatabase();
    }, []);

    return null;
};

export  {SaveGame, SaveUser};
