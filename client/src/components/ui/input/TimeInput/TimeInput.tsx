import ClockIcon from '../../../../assets/icons/clock.svg';

import Field from '../Field';
import InputWrapper from '../InputWrapper';
import {
    DEFAULT_TIME_DIGITS,
    formatTimeMask,
    normalizeTimeDigits,
    completeTimeDigits,
} from './timeMask';

interface TimeInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
}

export default function TimeInput({ label, value = DEFAULT_TIME_DIGITS, onChange }: TimeInputProps) {
    const digits = value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(normalizeTimeDigits(e.target.value));
    };

    // Отдельно обрабатываем удаление символа, чтобы учесть удаление маски
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            onChange(digits.slice(0, -1));
        }
    };

    // Если пользователь начал ввод, дополняем неполное время нулями.
    const handleBlur = () => {
        onChange(completeTimeDigits(digits));
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
                    className={`flex w-10 border-0 text-[14px] focus:outline-none ${digits ? 'text-title' : 'text-disabled'}`}
                />
            </InputWrapper>
        </Field>
    );
}
