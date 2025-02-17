import { toast } from "react-toastify";

export const useNotification = () => {
    function notify(message: string, level: "success" | "info" | "warning" | "error") {
        toast(message, {
            type: level,
            position: "top-right", // Define a posição no canto superior direito
            autoClose: 5000, // Fecha automaticamente após 5 segundos
            hideProgressBar: false, // Exibe a barra de progresso
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", // Define o tema claro
        });
    }

    return {
        notify
    };
};
