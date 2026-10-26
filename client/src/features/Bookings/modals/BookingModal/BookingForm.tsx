import { useId } from 'react';
import Button from '../../../../components/ui/Button';
import CalendarSelector from '../../../../components/ui/input/selectors/CalendarSelector';
import TimeSelector from '../../../../components/ui/input/selectors/TimeSelector';
import ClockIcon from '../../../../assets/icons/clock.svg';
import InfoIcon from '../../../../assets/icons/info.svg';
import FieldError from '../../../../components/ui/input/FieldError';
import type useBookingForm from '../../hooks/useBookingForm';

interface BookingFormProps {
    form: ReturnType<typeof useBookingForm>;
    onClose: () => void;
}

export default function BookingForm({ form, onClose }: BookingFormProps) {
    const id = useId();
    const {
        title, setTitle, date, setDate, time, setTime, duration, setDuration,
        comment, setComment, saving, error, fieldErrors, submit,
    } = form;
    const inputClass = 'mt-2 w-full rounded-lg border border-primary-border bg-primary-bg px-4 py-3 text-sm font-normal text-title placeholder:text-disabled focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';
    const errorClass = 'border-error! focus:border-error! focus:ring-error!';
    const selectorClass = '!h-11 !w-full !justify-between !rounded-lg !px-4 !py-0';
    const labelClass = 'text-sm font-semibold text-primary';
    const [year, month, day] = date.split('-').map(Number);
    const calendarDate = date ? new Date(year, month - 1, day) : null;
    const selectDate = (value: Date | null) => {
        if (!value) return;
        setDate(`${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`);
    };
    const [hours, minutes] = time.split(':').map(Number);
    const endMinutes = hours * 60 + minutes + duration;
    const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
    const dateLabel = calendarDate?.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <form noValidate onSubmit={submit} className="mt-6">
            <fieldset disabled={saving} className="flex flex-col gap-4">
                <div>
                    <label htmlFor={`${id}-subject`} className={labelClass}>Тема встречи *</label>
                    <input
                        id={`${id}-subject`}
                        required
                        placeholder="Укажите тему встречи"
                        maxLength={200}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.title) || undefined}
                        aria-describedby={fieldErrors.title ? `${id}-subject-error` : undefined}
                        className={`${inputClass} ${fieldErrors.title ? errorClass : ''}`}
                    />
                    <div className="mt-1.5"><FieldError id={`${id}-subject-error`} message={fieldErrors.title} /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <CalendarSelector
                        label="Дата"
                        error={fieldErrors.date}
                        value={calendarDate}
                        onChange={selectDate}
                        showClearOption={false}
                        labelClassName={labelClass}
                        triggerClassName={selectorClass.replace('!justify-between', '!justify-start')}
                        dropdownClassName="!w-[min(312px,calc(100vw-5rem))] min-w-0! p-3 shadow-xl"
                    />
                    <label className={labelClass}>
                        Время начала
                        <div className="relative mt-1.5">
                            <img 
                                src={ClockIcon} 
                                alt="" 
                                className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" 
                            />
                            <input
                                type="time"
                                required
                                min="09:00"
                                max="19:45"
                                step={900}
                                aria-invalid={Boolean(fieldErrors.time) || undefined}
                                aria-describedby={fieldErrors.time ? `${id}-time-error` : undefined}
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                className={`${inputClass} mt-0! h-11 pl-11 [&::-webkit-calendar-picker-indicator]:hidden ${fieldErrors.time ? errorClass : ''}`}
                            />
                        </div>
                        <div className="mt-1.5"><FieldError id={`${id}-time-error`} message={fieldErrors.time} /></div>
                    </label>
                </div>
                <TimeSelector
                    label="Продолжительность"
                    error={fieldErrors.duration}
                    value={duration}
                    onChange={value => value !== null && setDuration(value)}
                    showClearOption={false}
                    labelClassName={labelClass}
                    triggerClassName={selectorClass}
                    dropdownClassName="w-full min-w-0! max-h-52 overflow-y-auto shadow-xl"
                />
                <label className={labelClass}>
                    Комментарий
                    <textarea 
                        placeholder="Дополнительная информация для участников встречи…" 
                        maxLength={2000} 
                        rows={3} 
                        value={comment} 
                        onChange={e => setComment(e.target.value)} 
                        aria-invalid={Boolean(fieldErrors.comment) || undefined} 
                        aria-describedby={fieldErrors.comment ? `${id}-comment-error` : undefined} 
                        className={`${inputClass} min-h-20 resize-y ${fieldErrors.comment ? errorClass : ''}`} 
                    />
                    <div className="mt-1.5"><FieldError id={`${id}-comment-error`} message={fieldErrors.comment} /></div>
                </label>
            </fieldset>
            {dateLabel && time && (
                <p className="mt-6 flex items-start gap-2 rounded-lg bg-highlight-bg px-4 py-3 text-sm font-medium text-highlight" aria-live="polite">
                    <img
                        className="flex justify-center items-center"
                        src={InfoIcon}
                    />
                    <span>Бронирование на {dateLabel}, {time}–{endTime} ({duration} мин.)</span>
                </p>
            )}
            {error && <p role="alert" className="mt-4 rounded-lg bg-error-bg p-3 text-sm">{error}</p>}
            <div className="mt-6 flex flex-wrap justify-end gap-3">
                <Button className="min-w-28" variant="secondary" disabled={saving} onClick={onClose}>Отмена</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Бронируем…' : 'Забронировать'}</Button>
            </div>
        </form>
    );
}
