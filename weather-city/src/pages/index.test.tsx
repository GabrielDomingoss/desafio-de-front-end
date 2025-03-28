import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Home from ".";
import React from "react";

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

describe('Home', () => {
    const push = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push
        });
    });

    it('Deve renderizar título e subtítulo corretamente', () => {
        render(<Home />);

        expect(screen.getByText('Weather')).toBeInTheDocument();
        expect(screen.getByText('Select a city')).toBeInTheDocument();
    })

    it('Deve renderizar todas as cidades da lista', () => {
        render(<Home />);

        const cities = ['Dallol', 'Fairbanks', 'London', 'Recife', 'Vancouver', 'Yakutsk'];

        cities.forEach((city) => {
            expect(screen.getByText(city)).toBeInTheDocument()
        });
    });

    it('Deve navegar para a cidade ao clicar em uma cidade', () => {
        render(<Home />);

        const city = screen.getByText('Recife');
        fireEvent.click(city);

        expect(push).toHaveBeenCalledWith('/city/Recife?country=BR');
    })
});