import axios from "axios";
import { useState, useEffect, useReducer } from "react";

export const ACTION_ENUM = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};

function dataFetchReducer(state, action) {
  switch (action.type) {
    case ACTION_ENUM.FETCH_INIT:
      return { ...state, isLoading: true, hasError: false };
    case ACTION_ENUM.FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload, error: null };
    case ACTION_ENUM.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      throw new Error("DATA FETCH REDUCER: action type not found");
  }
}

export function useDataApi(initialUrl, initialData) {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    hasError: false,
    error: null,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const controller = new AbortController();

    async function fetchData() {
      dispatch({ type: ACTION_ENUM.FETCH_INIT });

      try {
        const res = await axios(url, { signal: controller.signal });

        if (!didCancel) {
          dispatch({ type: ACTION_ENUM.FETCH_SUCCESS, payload: res.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ACTION_ENUM.FETCH_FAILURE, payload: error });
        }
      }
    }

    if (url) {
      fetchData();
    }

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, [url]);

  return [state, setUrl];
}
