import { useState } from 'react';
import CalendarIcon from '../../../../../assets/icons/calendar.svg';
import ChevronDownIcon from '../../../../../assets/icons/chevron-down.svg';
import { useDropdown } from '../../../../../context/DropdownContext';
import Button from '../../../Button';
import Field from '../../Field';
import InputWrapper from '../../InputWrapper';
import {
    addDays,
    formatDayLabel,
    formatMonth,
    formatSelectedDate,
    getMonthDays,
    MAX_DAYS_AHEAD,
    startOfDay,
    startOfMonth,
    WEEKDAYS,
} from './calendarDate';

const NOT_SELECTED_DATE_ID = 0;

interface CalendarSelectorProps {
    value: Date | null;
    onChange: (value: Date | null) => void;
    showClearOption?: boolean;
}

export default function CalendarSelector({ value, onChange, showClearOption = true }: CalendarSelectorProps) {
    const today = startOfDay(new Date());
    const maximumDate = addDays(today, MAX_DAYS_AHEAD);
    const selectedDateId = value?.getTime() ?? NOT_SELECTED_DATE_ID;
    const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
    const { close } = useDropdown();
    const days = getMonthDays(visibleMonth);

    const changeMonth = (offset: number) => {
        setVisibleMonth(month => new Date(month.getFullYear(), month.getMonth() + offset, 1));
    };

    const selectDate = (date: Date) => {
        onChange(date);
        close();
    };

    const clearDate = () => {
        onChange(null);
        close();
    };

    return (
        <Field label="ДАТА">
            <InputWrapper
                id="date-selector"
                leftIcon={CalendarIcon}
                label={value ? formatSelectedDate(value) : 'Выберите дату'}
                triggerClassName="!h-11 !w-42 !justify-start !rounded-lg !px-3.5 !py-0"
                dropdownClassName="!w-[312px] p-4 shadow-xl"
            >
                <div aria-label="Выбор даты">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-[16px] font-bold text-title">{formatMonth(visibleMonth)}</h2>
                        <div className="flex gap-1">
                            {[
                                { label: 'Предыдущий месяц', offset: -1, iconClass: 'rotate-90' },
                                { label: 'Следующий месяц', offset: 1, iconClass: '-rotate-90' },
                            ].map(({ label, offset, iconClass }) => (
                                <Button
                                    aria-label={label}
                                    className="!h-8 !w-8 !rounded-md !border-0 !p-0 !bg-secondary-bg"
                                    key={label}
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => changeMonth(offset)}
                                >
                                    <img className={iconClass} src={ChevronDownIcon} alt="" />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {showClearOption && (
                        <Button
                            aria-pressed={selectedDateId === NOT_SELECTED_DATE_ID}
                            className="mb-2 w-full justify-start! text-[14px]"
                            isSelected={selectedDateId === NOT_SELECTED_DATE_ID}
                            size="sm"
                            variant="ghost"
                            weight="normal"
                            onClick={clearDate}
                        >
                            Не выбрано
                        </Button>
                    )}

                    <div className="mb-2 grid grid-cols-7 justify-items-center">
                        {WEEKDAYS.map(weekday => (
                            <span className="py-1 text-[13px] font-medium text-disabled" key={weekday}>
                                {weekday}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 justify-items-center gap-y-1">
                        {days.map((date) => {
                            const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
                            const isBeyondLimit = date.getTime() > maximumDate.getTime();
                            const isSelected = selectedDateId === date.getTime();
                            const isDisabled = !isCurrentMonth || isBeyondLimit;

                            return (
                                <Button
                                    aria-label={formatDayLabel(date)}
                                    aria-pressed={isSelected}
                                    className={`!h-9 !w-9 !rounded-md !p-0 ${isDisabled ? 'text-disabled' : ''}`}
                                    disabled={isDisabled}
                                    key={date.toISOString()}
                                    size="sm"
                                    variant={isSelected ? 'primary' : 'ghost'}
                                    weight="normal"
                                    onClick={() => selectDate(date)}
                                >
                                    {date.getDate()}
                                </Button>
                            );
                        })}
                    </div>

                    <p className="mt-3 text-xs leading-5 text-disabled">
                        Ограничение: не более 30 дней вперёд.<br />
                        Даты за пределами лимита неактивны.
                    </p>
                </div>
            </InputWrapper>
        </Field>
    );
}
