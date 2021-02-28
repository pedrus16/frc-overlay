import { useContext, useState } from 'react';
import { ReforgedStyleContext } from '../../Overlay';

interface Properties {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

const Cameo = ({ id, className, width, height }: Properties) => {
  const reforgedStyle = useContext(ReforgedStyleContext);
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  return (
    <img
      className={className}
      width={width}
      height={height}
      style={{ display: 'block' }}
      src={`${process.env.PUBLIC_URL}/icons${
        reforgedStyle ? '/reforged' : '/classic'
      }/${id}.jpg`}
      alt={id}
      onError={() => setError(true)}
    />
  );
};

export default Cameo;
