import {act, renderHook} from '@testing-library/react-hooks';
import useFetch from '../src/utils/useFetch';
import fetchMock from 'jest-fetch-mock';
import {BASE_URL, PRODUCT_LIST} from '../src/constants';

describe('useFetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch data successfully', async () => {
    const url = PRODUCT_LIST;
    const data = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
    ];
    fetchMock.mockResponseOnce(JSON.stringify(data));

    const {result, waitForNextUpdate} = renderHook(() => useFetch());

    expect(result.current[1].status).toEqual('idle');

    act(() => {
      result.current[0](url);
    });

    expect(result.current[1].status).toEqual('fetching');

    await waitForNextUpdate({timeout: 10000});

    expect(result.current[1].status).toEqual('fetched');
  });

  it('should handle errors while fetching data', async () => {
    const url = `${BASE_URL}/reject`;
    const errorMessage = 'An error occurred while fetching the data';
    fetchMock.mockReject(new Error(errorMessage));

    const {result, waitForNextUpdate} = renderHook(() => useFetch());

    expect(result.current[1].status).toEqual('idle');

    act(() => {
      result.current[0](url);
    });

    expect(result.current[1].status).toEqual('fetching');

    await waitForNextUpdate({timeout: 10000});

    expect(result.current[1].status).toEqual('error');
    expect(result.current[1].error).toEqual(errorMessage);
  });
});
