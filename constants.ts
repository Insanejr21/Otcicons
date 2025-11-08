import { MacroType } from './types';

export const getGeminiPrompt = (input: string, type: MacroType, itemIds: string) => {
      if (type === MacroType.ITEM) {
        return `
          Você é um especialista em scripting para OTClient V8. Sua tarefa é pegar um trecho de macro em Lua e envolvê-lo em um script de ícone completo e funcional.

          **Requisitos:**
          1.  Use o template fornecido para estruturar o código.
          2.  O ícone deve ser animado, ciclando através dos 'iconIDs' fornecidos.
          3.  O nome da macro ('macroName') deve ser descritivo, baseado no conteúdo do input do usuário (ex: "AUTO HEAL", "ATTACK SPELL").
          4.  O 'macroDelay' deve ser de 1000ms por padrão.
          5.  O código do usuário deve ser inserido no local indicado.
          6.  Corrija quaisquer erros de sintaxe óbvios no código do usuário.
          7.  **IMPORTANTE:** Retorne APENAS o bloco de código Lua final. Não inclua NENHUMA explicação, introdução, ou aspas de formatação como \`\`\`lua ou \`\`\`.

          **Input do Usuário:**
          \`\`\`lua
          ${input}
          \`\`\`
          
          **IDs dos Itens para Animação:**
          ${itemIds}

          **Template para Ícone de Item:**
          -- CONFIGURAÇÃO
          local iconIDs = {${itemIds}} -- IDs de itens para animação
          local macroName = "AUTO MACRO" -- Mude isso para algo descritivo
          local macroDelay = 1000 -- Delay em milissegundos
          local iconDelay = 200 -- Delay da animação do ícone

          storage[macroName.."Index"] = storage[macroName.."Index"] or 1
          local myMacro = macro(macroDelay, function()
            ${input}
          end)
          myMacro.setOn(false)

          local myIcon = addIcon(macroName, {item = iconIDs[1], text = macroName}, function(icon, isOn)
            myMacro.setOn(isOn)
            icon.text:setText(isOn and macroName.." ON" or macroName)
          end)
          myIcon:setSize({width = 100, height = 50})

          macro(iconDelay, function()
            if myMacro:isOn() and #iconIDs > 1 then
              storage[macroName.."Index"] = (storage[macroName.."Index"] % #iconIDs) + 1
              myIcon.item:setItemId(iconIDs[storage[macroName.."Index"]])
            end
          end)
        `;
      } else { // MacroType.OUTFIT
        return `
          Você é um especialista em scripting para OTClient V8. Sua tarefa é pegar um trecho de macro em Lua e envolvê-lo em um script de ícone completo e funcional.

          **Requisitos:**
          1.  Use o template fornecido para estruturar o código.
          2.  O ícone deve usar uma 'outfit' estática.
          3.  O nome da macro ('macroName') deve ser descritivo, baseado no conteúdo do input do usuário (ex: "AUTO UTAMO", "SUMMON MONSTER").
          4.  O 'macroDelay' deve ser de 1000ms por padrão.
          5.  O código do usuário deve ser inserido no local indicado.
          6.  Corrija quaisquer erros de sintaxe óbvios no código do usuário.
          7.  **IMPORTANTE:** Retorne APENAS o bloco de código Lua final. Não inclua NENHUMA explicação, introdução, ou aspas de formatação como \`\`\`lua ou \`\`\`.

          **Input do Usuário:**
          \`\`\`lua
          ${input}
          \`\`\`

          **Template para Ícone de Outfit:**
          -- CONFIGURAÇÃO
          local macroName = "AUTO BIXO" -- Mude isso para algo descritivo
          local macroDelay = 1000 -- Delay em milissegundos
          local outfitConfig = {type=35, head=114, body=114, legs=114, feet=114}

          local myMacro = macro(macroDelay, function()
            ${input}
          end)
          myMacro.setOn(false)

          local myIcon = addIcon(macroName, {
            outfit = outfitConfig,
            text = macroName
          }, function(icon, isOn)
            myMacro.setOn(isOn)
            icon.text:setText(isOn and macroName.." ATIVO" or macroName)
          end)
          myIcon:setSize({width = 100, height = 50})
        `;
      }
    };
