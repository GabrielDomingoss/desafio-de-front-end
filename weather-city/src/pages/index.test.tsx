import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Home from ".";
import React from "react";

// Mock do useRouter do Next.js para interceptar navegações
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

describe('Home', () => {
    // Mock da função push para verificar navegações
    const push = jest.fn();

    beforeEach(() => {
        // Antes de cada teste, o useRouter é configurado para retornar a função mockada
        (useRouter as jest.Mock).mockReturnValue({
            push
        });
    });

    // Testa se o título principal e o subtítulo são renderizados corretamente
    it('Deve renderizar título e subtítulo corretamente', () => {
        render(<Home />);

        // Valida se o título "Weather" é exibido
        expect(screen.getByText('Weather')).toBeInTheDocument();

        // Valida se o subtítulo "Select a city" é exibido
        expect(screen.getByText('Select a city')).toBeInTheDocument();
    })

    // Verifica se todas as cidades esperadas são exibidas na página inicial
    it('Deve renderizar todas as cidades da lista', () => {
        render(<Home />);

        // Lista de cidades que devem aparecer no componente
        const cities = ['Dallol', 'Fairbanks', 'London', 'Recife', 'Vancouver', 'Yakutsk'];

        
        // Para cada cidade, verifica se ela é exibida corretamente
        cities.forEach((city) => {
            expect(screen.getByText(city)).toBeInTheDocument()
        });
    });

    // Valida se clicar em uma cidade causa a navegação correta para a página da cidade
    it('Deve navegar para a cidade ao clicar em uma cidade', () => {
        render(<Home />);

        // Encontra o elemento da cidade "Recife" e simula um clique
        const city = screen.getByText('Recife');
        fireEvent.click(city);

        // Verifica se a função push (navegação) foi chamada com a rota correta
        expect(push).toHaveBeenCalledWith('/city/Recife?country=BR');
    })
});