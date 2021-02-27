interface Properties {
  id: string;
  className?: string;
  width?: number;
  height?: number;
}

const Cameo = ({ id, className, width, height }: Properties) => (
  <img
    className={className}
    width={width}
    height={height}
    style={{ display: 'block' }}
    src={`${process.env.PUBLIC_URL}/icons/hd/${id}.jpg`}
    alt={id}
  />
);

export default Cameo;
