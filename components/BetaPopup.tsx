import React from 'react';

interface BetaPopupProps {
  onClose: () => void;
}

export const BetaPopup: React.FC<BetaPopupProps> = ({ onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 max-w-lg">
        <div className="tibia-panel p-6 flex flex-col items-center text-center gap-4">
          <p className="text-lg my-2 font-bold">SE OCORRER ERRO DE FALLBACK OU DE API, ME AVISE CLICANDO NO BOTAO SUGERIR ALGO QUE ESTA LOCALIZADO NO POPUP DO INICIO DA PAGINA, POIS ESTOU USANDO API GRATIS.</p>
          <div className="flex justify-center items-center flex-wrap gap-4 mt-2">
            <button onClick={onClose} className="tibia-button">Compreendo</button>
            <a href="http://t.me/rafaelodessa" target="_blank" rel="noopener noreferrer" className="tibia-button">Sugerir Algo</a>
          </div>
        </div>
      </div>
    </>
  );
};
