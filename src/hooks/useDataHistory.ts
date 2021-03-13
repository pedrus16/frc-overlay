import { useCallback, useState } from 'react';

const useDataHistory = () => {
  const [data, setData] = useState<unknown[]>([]);
  const addData = useCallback(
    (dataSlice: unknown) => setData((prev) => prev.concat(dataSlice)),
    []
  );

  return [data, addData] as [number[], (value: number) => void];
};

export default useDataHistory;
