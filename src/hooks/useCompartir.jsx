import { useState } from "react";
import iconoCheck from '../assets/check-svgrepo-com.svg';
import iconoError from '../assets/error-svgrepo-com.svg';


export const useCompartir = () => {
    const [copiado, setCopiado] = useState(false);
    const [errorCopia, setErrorCopia] = useState(false);

    const urlActual = location.href;

    const compartir = async () => {
        try {
            await navigator.clipboard.writeText(urlActual);
            setCopiado(true);

            setTimeout(() => {
                setCopiado(false)
            }, 3000);

        } catch (error) {
            console.error('Error al copiar al portapapeles:', error);
            setErrorCopia(true);

            setTimeout(() => {
                setErrorCopia(false)
            }, 3000);
        }
    };

    const renderNotificacion = () => {
        if (copiado) {
            return <div className='notificacion' onClick={() => setCopiado(false)}>Enlace copiado al portapapeles <img src={iconoCheck} /></div>;

        }
        if (errorCopia) {
            return <div className='notificacion error' onClick={() => setErrorCopia(false)}>No se pudo copiar el enlace <img src={iconoError} /> </div>
        }
    };

    return {
        compartir,
        renderNotificacion
    };
};