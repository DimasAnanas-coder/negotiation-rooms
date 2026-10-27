import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import Button, { type ButtonSize, type ButtonVariant, type ButtonWeight } from './Button'

const bgStyles: Array<[ButtonVariant, string]> = [
    ['primary', 'bg-active-bg'],
    ['secondary', 'bg-primary-bg'],
    ['ghost', 'bg-transparent'],
    ['danger', 'bg-error-bg'],
]

const sizeStyles: Array<[ButtonSize, string]> = [
    ['sm', 'px-3 py-2 text-xs'],
    ['md', 'px-4 py-2.5 text-sm'],
    ['lg', 'px-6 py-3 text-sm'],
]

const weightStyles: Array<[ButtonWeight, string]> = [
    ['normal', 'font-normal'],
    ['medium', 'font-medium'],
    ['semibold', 'font-semibold'],
    ['bold', 'font-bold'],
]


describe('Button', () => {
    it('Кнопка успешно рендерится c дочерним содержим', () => {
        render(
            <Button>
                <svg data-testid="img-test"/>
                <p>Удалить</p>
            </Button>
        );
        const button = screen.getByRole('button', {name: "Удалить"});
        expect(button).toBeInTheDocument();
        expect(screen.getByTestId("img-test")).toBeInTheDocument();
    });
    
    describe('Стили', () => {
        it.each(bgStyles)('вариант %s получает нужный класс %s', (variant, expectedClass) => {
            render(<Button variant={variant}>Кнопка</Button>);

            expect(screen.getByRole('button', { name: 'Кнопка' }))
                .toHaveClass(expectedClass);
        });

        it.each(sizeStyles)('размер %s получает нужные классы', (size, expectedClasses) => {
            render(<Button size={size}>Кнопка</Button>);

            expect(screen.getByRole('button', { name: 'Кнопка' }))
                .toHaveClass(...expectedClasses.split(' '));
        });

        it.each(weightStyles)('насыщенность %s получает класс %s', (weight, expectedClass) => {
            render(<Button weight={weight}>Кнопка</Button>);

            expect(screen.getByRole('button', { name: 'Кнопка' }))
                .toHaveClass(expectedClass);
        });

        it('выбранный вариант ghost получает класс выделенного фона', () => {
            render(<Button variant="ghost" isSelected>Кнопка</Button>);

            expect(screen.getByRole('button', { name: 'Кнопка' }))
                .toHaveClass('bg-highlight-bg');
        });

        it('добавляет пользовательский className', () => {
            render(<Button className="custom-button">Кнопка</Button>);

            expect(screen.getByRole('button', { name: 'Кнопка' }))
                .toHaveClass('custom-button');
        });

    })


    describe('Клики', () => {
        it('Активная кнопка способна активировать onClick действие', async () => {
            const user = userEvent.setup();
            const onClick = vi.fn();
            render(
                <Button onClick={onClick}>
                    <p>Сохранить</p>
                </Button>
            );
            const button = screen.getByRole('button', {name: 'Сохранить'});
            expect(button).toBeInTheDocument();

            await user.click(button);
            expect(onClick).toHaveBeenCalledOnce();
        });

        it('Неактивная кнопка отключает onClick действие', async () => {
            const user = userEvent.setup();
            const onClick = vi.fn();
            render(
                <Button onClick={onClick} disabled>
                    <p>Сохранить</p>
                </Button>
            );
            const button = screen.getByRole('button', {name: 'Сохранить'});
            expect(button).toBeInTheDocument();

            await user.click(button);
            expect(onClick).not.toHaveBeenCalled()
        });
    })

    it('по умолчанию имеет type="button"', () => {
        render(<Button>Сохранить</Button>);

        expect(screen.getByRole('button', { name: 'Сохранить' }))
            .toHaveAttribute('type', 'button');
    });

    it('позволяет передать type="submit" и стандартные атрибуты', () => {
        render(<Button type="submit" name="save" aria-label="Сохранить форму">Сохранить</Button>);

        const button = screen.getByRole('button', { name: 'Сохранить форму' });
        expect(button).toHaveAttribute('type', 'submit');
        expect(button).toHaveAttribute('name', 'save');
    });

});
