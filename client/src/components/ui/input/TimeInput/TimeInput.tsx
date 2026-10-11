import { useState } from 'react';
import ClockIcon from '../../../../assets/icons/clock.svg';

import Field from '../Field';
import InputWrapper from '../InputWrapper';
import {
    DEFAULT_TIME_DIGITS,
    formatTimeMask,
    normalizeTimeDigits,
    completeTimeDigits,
} from './timeMask';

export default function TimeInput({ label }: { label?: string }) {
    const [digits, setDigits] = useState<string>(DEFAULT_TIME_DIGITS);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDigits(normalizeTimeDigits(e.target.value));
    };

    // Отдельно обрабатываем удаление символа, чтобы учесть удаление маски
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            setDigits(prev => prev.slice(0, -1));
        }
    };

    // Если пользователь не ввел время до конца, то отстаток маски заполнится в этой функции нулями
    const handleBlur = () => {
        setDigits(prev => completeTimeDigits(prev));
    };

    return (
        <Field label={label || 'ВРЕМЯ НАЧАЛА'}>
            <InputWrapper
                id="Time-input"
                leftIcon={ClockIcon}
                isDropdown={false}
            >
                <input
                    id="Time-input"
                    type="text"
                    inputMode="numeric"
                    value={formatTimeMask(digits)}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onFocus={e => e.target.select()}
                    placeholder="--:--"
                    className="flex w-10 border-0 text-[14px] text-title focus:outline-none"
                />
            </InputWrapper>
        </Field>
    );
}
