import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTypedSelector, useTypedDispatch } from "../redux/store";
import { getStore, updateStore } from "../redux/slices/common";

const useAsyncStorage = (key: string) => {
  const dispatch = useTypedDispatch();
  const [loading, setLoading] = useState(true);
  const storedValue = useTypedSelector(getStore);

  useEffect(() => {
    if (!storedValue[key])
      AsyncStorage.getItem(key)
        .then((value) => {
          if (!value) return;
          return JSON.parse(value);
        })
        .then((res: any) => {
          if (res) dispatch(updateStore({ key, value: res }));
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  const setValue = (value: any) => dispatch(updateStore({ key, value }));

  return [storedValue[key], setValue, loading];
};

export default useAsyncStorage;
