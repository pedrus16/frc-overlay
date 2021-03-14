import { CSSProperties } from 'react';

const teamColorStyle = (color: string) =>
  ({
    '--team-color': color,
  } as CSSProperties);

export default teamColorStyle;
