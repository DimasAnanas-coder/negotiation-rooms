import { useRef, useState, type SubmitEvent } from 'react';

export type FormFieldErrors<Values> = Partial<Record<keyof Values, string>>;

export type FormValidation<Values, Data> = { valid: true; data: Data } | { valid: false; fieldErrors: FormFieldErrors<Values> };

export interface FormRequestError<Values> {
    error: string;
    fieldErrors: FormFieldErrors<Values>;
}

interface UseFormOptions<Values, Data> {
    initialValues: Values | (() => Values);
    validate: (values: Values) => FormValidation<Values, Data>;
    onSubmit: (data: Data, values: Values) => Promise<unknown>;
    getRequestError?: (error: unknown) => FormRequestError<Values>;
    errorGroups?: readonly (readonly (keyof Values)[])[];
}

export default function useForm<Values extends object, Data = Values>({
    initialValues,
    validate,
    onSubmit,
    getRequestError,
    errorGroups = [],
}: UseFormOptions<Values, Data>) {
    const [values, setValues] = useState<Values>(initialValues);
    const [fieldErrors, setFieldErrors] = useState<FormFieldErrors<Values>>({});
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const pending = useRef(false);

    const setFieldValue = <Field extends keyof Values>(field: Field, value: Values[Field]) => {
        setValues(current => ({ ...current, [field]: value }));
        setError('');
        setSuccess(false);
        setFieldErrors((current) => {
            const next = { ...current };
            delete next[field];
            for (const group of errorGroups) {
                if (group.includes(field)) {
                    for (const relatedField of group) delete next[relatedField];
                }
            }
            return next;
        });
    };

    const submit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending.current) return;
        pending.current = true;
        setError('');
        setSuccess(false);

        try {
            const validation = validate(values);
            if (!validation.valid) {
                setFieldErrors(validation.fieldErrors);
                return;
            }

            setFieldErrors({});
            setSaving(true);
            await onSubmit(validation.data, values);
            setSuccess(true);
        }
        catch (requestError) {
            const failure = getRequestError?.(requestError) ?? {
                error: 'Не удалось сохранить данные. Попробуйте ещё раз.',
                fieldErrors: {},
            };
            setError(failure.error);
            setFieldErrors(failure.fieldErrors);
        }
        finally {
            pending.current = false;
            setSaving(false);
        }
    };

    return {
        values, setFieldValue, fieldErrors, error, saving, success, submit,
        isPending: () => pending.current,
    };
}
