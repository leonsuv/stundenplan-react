import { useState, useEffect } from "react";

export function getLocalValue(key: string, initValue: any) {
  const localValue = JSON.parse(localStorage.getItem(key)!!);
  if (localValue) return localValue
  if (initValue instanceof Function) return initValue();
  return initValue;
}

export function useLocalStorage(key: string, initValue: any) {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue];
}