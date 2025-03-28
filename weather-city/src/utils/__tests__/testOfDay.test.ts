import { getTimeOfDayIcon } from "../timeOfDay";

describe('getTimeOfDayIcon', () => {
    it('Deve retornar ícone correto para morning', () => {
        expect(getTimeOfDayIcon('morning')).toBe('BsSun.svg');
    });

    it('Deve retornar ícone default para período inválido', () => {
        expect(getTimeOfDayIcon('unknown')).toBe('BsCloud.svg');
    });
})