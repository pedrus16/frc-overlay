import React from 'react';

interface Properties {
  id: string;
}

const Cameo = ({ id }: Properties) => (
  <img style={{ display: 'block' }} src={`/icons/${id}.jpg`} alt={id} />
);

export default Cameo;
