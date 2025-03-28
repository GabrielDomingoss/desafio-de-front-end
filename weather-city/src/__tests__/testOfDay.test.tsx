import { getTimeOfDayIcon } from "@/utils/timeOfDay";

// Agrupa os testes da função getTimeOfDayIcon
describe('getTimeOfDayIcon', () => {

    // Teste para verificar se o ícone correto é retornado para o período "morning"
    it('Deve retornar ícone correto para morning', () => {
        // Espera-se que o resultado seja 'BsSun.svg' para o período da manhã
        expect(getTimeOfDayIcon('morning')).toBe('BsSun.svg');
    });

   // Teste para garantir que a função retorne o ícone padrão quando o período for inválido ou desconhecido
   it('Deve retornar ícone default para período inválido', () => {
        // Ao fornecer um valor não esperado, deve retornar o ícone padrão ('BsCloud.svg')
        expect(getTimeOfDayIcon('unknown')).toBe('BsCloud.svg');
    });
})