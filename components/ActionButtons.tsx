import React, { useState } from 'react';

interface ActionButtonsProps {
  onGenerate: () => void;
  onClear: () => void;
  result: string;
  isLoading: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onGenerate, onClear, result, isLoading }) => {
  const [copyStatus, setCopyStatus] = useState('Copiar');

  const handleCopy = () => {
    if (!result || result.includes("Aguardando") || result.includes("❌")) {
      alert("A caixa esta vazia ou a macro está incorreta!");
      return;
    }
    navigator.clipboard.writeText(result).then(() => {
      setCopyStatus('Copiado!');
      setTimeout(() => setCopyStatus('Copiar'), 2000);
    }).catch(err => {
      alert("Erro ao tentar copiar: " + err);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <button onClick={onGenerate} disabled={isLoading} className="tibia-button flex-1">
        {isLoading ? "Gerando..." : "CRIAR ICON"}
      </button>
      <button onClick={handleCopy} className="tibia-button flex-1">
        {copyStatus}
      </button>
      <button onClick={onClear} className="tibia-button flex-1">
        Limpar
      </button>
    </div>
  );
};
