import { useContext, useEffect, useState } from 'react';

import { ReforgedStyleContext } from '../../contexts';

import style from './style.module.css';

export interface Props {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

const DEFAULT_SIZE_PX = 64;

const Cameo = ({ id, className = '', width, height }: Props) => {
  const reforgedStyle = useContext(ReforgedStyleContext);
  const [error, setError] = useState(false);

  const handleError = () => setError(true);

  useEffect(() => setError(false), [id]);

  if (error) {
    return (
      <div
        className={`${className} ${style.fallback}`}
        style={{
          width,
          height,
          fontSize: `${
            ((height || DEFAULT_SIZE_PX) / DEFAULT_SIZE_PX) * 2.5
          }rem`,
        }}
      >
        ?
      </div>
    );
  }

  return (
    <img
      className={className}
      width={width}
      height={height}
      style={{
        display: 'block',
        objectFit: 'contain',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      src={`${process.env.PUBLIC_URL}/icons${
        reforgedStyle ? '/reforged' : '/classic'
      }/${id}.jpg`}
      alt={id}
      onError={handleError}
    />
  );
};

export default Cameo;
