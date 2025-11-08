import React from 'react';
import { MacroType } from '../types';

interface TypeSelectorProps {
  selectedType: MacroType;
  onSelectType: (type: MacroType) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="type-selector flex flex-col md:flex-row justify-center gap-4 mb-6">
      <button 
        className={`tibia-button flex-1 ${selectedType === MacroType.ITEM ? 'active' : ''}`} 
        onClick={() => onSelectType(MacroType.ITEM)}
      >
        Usar ID de Item
      </button>
      <button 
        className={`tibia-button flex-1 ${selectedType === MacroType.OUTFIT ? 'active' : ''}`} 
        onClick={() => onSelectType(MacroType.OUTFIT)}
      >
        Usar Outfit
      </button>
    </div>
  );
};
