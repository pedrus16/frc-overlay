import React from 'react';

interface Properties {
  id: string;
  className?: string;
}

const Cameo = ({ id, className }: Properties) => (
  <img
    className={className}
    style={{ display: 'block' }}
    src={`/icons/${id}.jpg`}
    alt={id}
  />
);

export default Cameo;
