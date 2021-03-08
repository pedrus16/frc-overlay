import React from 'react';
import useLocalStorage from './useLocalStorage';

interface Props {}

interface Settings {
  swapped: boolean;
}

const Settings = (props: Props) => {
  const [swapped, setSwapped] = useLocalStorage('swapped');
  const [reforgedStyle, setReforgedStyle] = useLocalStorage('reforgedStyle');

  const swapPlayer = () => {
    setSwapped((currentValue) => {
      return currentValue === 'true' ? 'false' : 'true';
    });
  };

  const swapHd = () => {
    setReforgedStyle((currentValue) => {
      return currentValue === 'true' ? 'false' : 'true';
    });
  };

  return (
    <div>
      <button onClick={swapPlayer}>Switch</button>
      <button onClick={swapHd}>HD</button>
    </div>
  );
};

export default Settings;
