import { useState, useEffect, SetStateAction, Dispatch } from 'react';

const usePersistState = <T,>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>, Dispatch<SetStateAction<boolean>>] => {
  const [persist, setPersist] = useState<boolean>(() => {
    const persistedState = localStorage.getItem(key);
    return !!persistedState;
  });
  const [state, setState] = useState<T>(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState !== null ? JSON.parse(persistedState) : defaultValue;
  });

  useEffect(() => {
    if (persist) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, persist, state]);

  return [state, setState, setPersist];
};

export default usePersistState;
