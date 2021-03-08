import useLocalStorage from './useLocalStorage';

interface Props {}

const Settings = (props: Props) => {
  const [, setSwapped] = useLocalStorage('swapped');
  const [, setReforgedStyle] = useLocalStorage('reforgedStyle');

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
