import {useReducer} from 'react';

type FetchState<T> = {
  status: 'idle' | 'fetching' | 'fetched' | 'error';
  error: string | null;
  data: T[];
};

type FetchAction<T> =
  | {type: 'FETCHING'; payload: T[]}
  | {type: 'FETCHED'; payload: T[]}
  | {type: 'FETCH_ERROR'; payload: string};

const useFetch = <T extends {}>(): [
  (url: string) => Promise<void>,
  FetchState<T>,
] => {
  const initialState: FetchState<T> = {
    status: 'idle',
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer(
    (state: FetchState<T>, action: FetchAction<T>): FetchState<T> => {
      switch (action.type) {
        case 'FETCHING':
          return {...initialState, status: 'fetching', data: action.payload};
        case 'FETCHED':
          return {...initialState, status: 'fetched', data: action.payload};
        case 'FETCH_ERROR':
          return {...initialState, status: 'error', error: action.payload};
        default:
          return state;
      }
    },
    initialState,
  );

  const fetchData = async (url: string): Promise<void> => {
    dispatch({type: 'FETCHING', payload: []});

    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch({type: 'FETCHED', payload: data});
    } catch (error) {
      const errorMessage =
        typeof error === 'string'
          ? error
          : 'An error occurred while fetching the data';
      dispatch({type: 'FETCH_ERROR', payload: errorMessage});
    }
  };

  return [fetchData, state];
};

export default useFetch;
