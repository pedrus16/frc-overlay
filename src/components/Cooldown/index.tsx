import { useMemo } from 'react';

export interface Props {
  progressPercent: number;
  className?: string;
  width?: number;
  height?: number;
}

const Cooldown = ({
  progressPercent,
  className = '',
  width,
  height,
}: Props) => {
  const size = 2;
  const angle = useMemo(
    () => Math.min(1, Math.max(0, progressPercent / 100)) * Math.PI * 2,
    [progressPercent]
  );
  const angleFromTop = useMemo(() => angle + Math.PI * -0.5, [angle]);
  const x = useMemo(() => (Math.cos(angleFromTop) * size + 1) * 0.5, [
    angleFromTop,
  ]);
  const y = useMemo(() => (Math.sin(angleFromTop) * size + 1) * 0.5, [
    angleFromTop,
  ]);

  const path = useMemo(
    () =>
      [
        `M 0.5 0.5`,
        `L ${x} ${y}`,
        `${angle >= Math.PI * 0.25 ? '' : 'L 1 0'}`,
        `${angle >= Math.PI * 0.75 ? '' : 'L 1 1'}`,
        `${angle >= Math.PI * 1.25 ? '' : 'L 0 1'}`,
        `${angle >= Math.PI * 1.75 ? '' : 'L 0 0'}`,
        `L 0.5 0`,
      ].join(' '),
    [x, y, angle]
  );

  return (
    <svg
      className={className}
      width={width || 64}
      height={height || 64}
      viewBox="0 0 1 1"
      fill="none"
    >
      <g fill="none">
        <path fill="currentColor" d={path} />
      </g>
    </svg>
  );
};

export default Cooldown;
