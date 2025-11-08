import React, { useState, useEffect, useCallback } from 'react';
import { MacroType } from './types';
import { generateIconScript } from './services/geminiService';
import { BetaPopup } from './components/BetaPopup';
import { TypeSelector } from './components/TypeSelector';
import { ItemIdsInput } from './components/ItemIdsInput';
import { MacroInput } from './components/MacroInput';
import { ActionButtons } from './components/ActionButtons';
import { ResultDisplay } from './components/ResultDisplay';

export const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [macroType, setMacroType] = useState<MacroType>(MacroType.ITEM);
  const [macroInput, setMacroInput] = useState('');
  const [itemIds, setItemIds] = useState('3050, 3051, 3052');
  const [result, setResult] = useState('Aguardando Pedido...');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  const generateLocalTemplate = useCallback((input: string, type: MacroType, itemIdsStr: string) => {
    const escapedInput = input.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    if (type === MacroType.ITEM) {
      return `-- Fallback (Gerado Localmente)\nlocal macroName = "AUTO MACRO"\nlocal iconIDs = {${itemIdsStr}}\nlocal macroDelay = 1000\nlocal iconDelay = 200\n\nif not storage[macroName.."Index"] then storage[macroName.."Index"] = 1 end\n\nlocal myMacro = macro(macroDelay, function()\n  ${escapedInput}\nend)\nmyMacro.setOn(false)\n\nlocal myIcon = addIcon(macroName, {item = iconIDs[storage[macroName.."Index"]], text = macroName}, function(icon, isOn)\n  myMacro.setOn(isOn)\n  icon.text:setText(isOn and macroName.." ON" or macroName)\nend)\nmyIcon:setSize({width = 100, height = 50})\n\nif #iconIDs > 1 then\n  macro(iconDelay, function()\n    if myMacro:isOn() then\n      storage[macroName.."Index"] = (storage[macroName.."Index"] % #iconIDs) + 1\n      myIcon.item:setItemId(iconIDs[storage[macroName.."Index"]])\n    end\n  end)\nend`;
    }
    return `-- Fallback (Gerado Localmente)\nlocal macroName = "AUTO BIXO"\nlocal macroDelay = 1000\nlocal outfitConfig = {type=35, head=114, body=114, legs=114, feet=114}\n\nlocal myMacro = macro(macroDelay, function()\n  ${escapedInput}\nend)\nmyMacro.setOn(false)\n\nlocal myIcon = addIcon(macroName, {\n  outfit = outfitConfig,\n  text = macroName\n}, function(icon, isOn)\n  myMacro.setOn(isOn)\n  icon.text:setText(isOn and macroName.." ATIVO" or macroName)\nend)\nmyIcon:setSize({width = 100, height = 50})`;
  }, []);

  const handleGenerate = async () => {
    if (!macroInput.trim()) {
      alert("Adicione sua macro primeiro.");
      return;
    }
    if (macroType === MacroType.ITEM && !itemIds.trim()) {
        alert("Por favor, insira os IDs dos itens.");
        return;
    }

    setIsLoading(true);
    setResult("Gerando seu icon...");

    try {
      const response = await generateIconScript(macroInput, macroType, itemIds);
      const cleanedResponse = response.replace(/(\`\`\`lua|\`\`\`)/gi, "").trim();

      if (!cleanedResponse.includes("addIcon") || !cleanedResponse.includes("macro(")) {
        throw new Error("A resposta da IA não parece um script válido. Tentando fallback.");
      }
      setResult(cleanedResponse);
    } catch (error) {
      console.error("Erro detalhado do Gemini:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setResult(`❌ Erro: ${errorMessage}\n\nIniciando fallback...`);
      setTimeout(() => {
        const fallback = generateLocalTemplate(macroInput, macroType, itemIds);
        setResult(fallback);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMacroInput('');
    setItemIds('3050, 3051, 3052');
    setResult('Aguardando Pedido...');
  };

  return (
    <>
      {showPopup && <BetaPopup onClose={closePopup} />}
      <div className="tibia-panel container mx-auto max-w-2xl p-4 md:p-6">
        <header className="text-center mb-4">
          <h2 className="title text-2xl md:text-3xl">Gerador de Ícones OTClient</h2>
        </header>
        <main>
          <TypeSelector selectedType={macroType} onSelectType={setMacroType} />
          {macroType === MacroType.ITEM && <ItemIdsInput value={itemIds} onChange={setItemIds} />}
          <MacroInput value={macroInput} onChange={setMacroInput} />
          <ActionButtons onGenerate={handleGenerate} onClear={handleClear} result={result} isLoading={isLoading} />
          <ResultDisplay result={result} />
        </main>
        <footer className="text-center mt-4">
          <p className="text-xs opacity-70">Criado por RafaelOdessa</p>
        </footer>
      </div>
    </>
  );
};
