import { renderHook, waitFor } from '@testing-library/react';
import { usePaymentOptions, fetchPaymentOptions } from '@/app/hooks/usePaymentOptions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Mock fetch
global.fetch = jest.fn();

describe('usePaymentOptions', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    (global.fetch as jest.Mock).mockClear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches payment options successfully', async () => {
    const mockData = {
      data: [
        {
          id: 'credit',
          title: 'Credit Cards',
          methods: [
            {
              name: 'visa',
              logo: '/visa.png',
              alt: 'Visa',
              width: 40,
              height: 25,
            },
          ],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => usePaymentOptions('123'), { wrapper });

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.error).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith('/api/payment-options/123');
  });

  it('handles fetch error correctly', async () => {
    const errorMessage = 'Failed to fetch payment options';
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => usePaymentOptions('123'), { wrapper });

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe(errorMessage);
  });

  it('handles non-ok response correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() => usePaymentOptions('123'), { wrapper });

    // Wait for the error to be set
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBe('Failed to fetch payment options');
  });

  describe('fetchPaymentOptions', () => {
    it('fetches and returns data correctly', async () => {
      const mockData = {
        data: [
          {
            id: 'credit',
            title: 'Credit Cards',
            methods: [
              {
                name: 'visa',
                logo: '/visa.png',
                alt: 'Visa',
                width: 40,
                height: 25,
              },
            ],
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchPaymentOptions('123');
      expect(result).toEqual(mockData.data);
      expect(global.fetch).toHaveBeenCalledWith('/api/payment-options/123');
    });

    it('throws error for non-ok response', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchPaymentOptions('123')).rejects.toThrow('Failed to fetch payment options');
    });

    it('throws error when fetch fails', async () => {
      const errorMessage = 'Network error';
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await expect(fetchPaymentOptions('123')).rejects.toThrow(errorMessage);
    });
  });
});
