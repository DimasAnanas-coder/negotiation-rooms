import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Button from './Button'


describe('Button', () => {
    it('Кнопка успешно рендерится с нужным стилем', () => {
        render(
            <Button variant="danger">
                <img /> 
                <p>кнопочка</p>
            </Button>
        );
        const button = screen.getByRole('button', {name: "кнопочка"});
        expect(button).toBeInTheDocument();
    });

});