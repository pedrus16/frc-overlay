import { useCallback, useState } from 'react';

const useDataHistory = <T>() => {
  const [data, setData] = useState<T[]>([]);
  const addData = useCallback(
    (dataSlice: T) => setData((prev) => prev.concat(dataSlice)),
    []
  );
  const resetData = useCallback(() => setData([]), []);

  return [data, addData, resetData] as [T[], (value: T) => void, () => void];
};

export default useDataHistory;
