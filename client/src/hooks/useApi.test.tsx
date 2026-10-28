import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useApi from './useApi';

const emptyData: string[] = [];

describe('useApi', () => {
    it('загружает данные и позволяет повторить запрос', async () => {
        const request = vi.fn().mockResolvedValueOnce(['первая']).mockResolvedValueOnce(['вторая']);
        const { result } = renderHook(() => useApi(request, true, emptyData));

        await waitFor(() => expect(result.current.status).toBe('loaded'));
        expect(result.current.data).toEqual(['первая']);

        act(() => result.current.refetch());
        await waitFor(() => expect(result.current.data).toEqual(['вторая']));
        expect(request).toHaveBeenCalledTimes(2);
    });

    it('показывает ошибку запроса', async () => {
        const request = vi.fn().mockRejectedValue(new Error('offline'));
        const { result } = renderHook(() => useApi(request, true, emptyData));

        await waitFor(() => expect(result.current.status).toBe('error'));
        expect(result.current.error).toEqual(new Error('offline'));
    });

    it('не выполняет запрос, если загрузка отключена', async () => {
        const request = vi.fn();
        const { result } = renderHook(() => useApi(request, false, emptyData));

        await waitFor(() => expect(result.current.status).toBe('loaded'));
        expect(result.current.data).toBe(emptyData);
        expect(request).not.toHaveBeenCalled();
    });

    it('не заменяет свежие данные результатом устаревшего запроса', async () => {
        let resolveOld!: (value: string[]) => void;
        const oldRequest = () => new Promise<string[]>(resolve => { resolveOld = resolve; });
        const newRequest = vi.fn().mockResolvedValue(['актуальные']);
        const { result, rerender } = renderHook(
            ({ request }: { request: () => Promise<string[]> }) => useApi(request, true, emptyData),
            { initialProps: { request: oldRequest } },
        );

        rerender({ request: newRequest });
        await waitFor(() => expect(result.current.data).toEqual(['актуальные']));
        resolveOld(['устаревшие']);
        await act(async () => {});

        expect(result.current.data).toEqual(['актуальные']);
    });
});
