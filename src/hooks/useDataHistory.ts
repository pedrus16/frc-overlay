import { useCallback, useState } from 'react';

const useDataHistory = <T>() => {
  const [data, setData] = useState<T[]>([]);
  const addData = useCallback(
    (dataSlice: T) => setData((prev) => prev.concat(dataSlice)),
    []
  );

  return [data, addData] as [T[], (value: T) => void];
};

export default useDataHistory;
