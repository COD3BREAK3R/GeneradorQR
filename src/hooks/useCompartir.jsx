import { useState, useEffect } from "react";
import iconoCheck from '../assets/check-svgrepo-com.svg';
import iconoError from '../assets/error-svgrepo-com.svg';


export const useCompartir = (canvasRef) => {
    const [copiado, setCopiado] = useState(false);
    const [errorCopia, setErrorCopia] = useState(false);
    const [esMobile, setEsMobile] = useState(false)

    const urlActual = location.href;

    useEffect(() => {
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        isMobile ? setEsMobile(true) : setEsMobile(false)
    }, [])


    const compartir = async () => {

        if (navigator.share && esMobile) {
            try {
                const canvas = canvasRef.current;

                if (!canvas) {
                    throw new Error('Canvas no disponible');
                }

                canvas.toBlob(async (blob) => {
                    const file = new File([blob], 'qr-code.png', { type: 'image/png' });

                    await navigator.share({
                        title: 'Compartir QR',
                        text: 'Mira este QR que generé',
                        files: [file],
                    });
                }, 'image/png');

            } catch (error) {
                console.error('Error al compartir:', error);
                copiarAlPortapapeles(urlActual);
            }
        } else {
            copiarAlPortapapeles(urlActual);
        }
    };

    const copiarAlPortapapeles = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
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
        renderNotificacion,
        esMobile
    };
};