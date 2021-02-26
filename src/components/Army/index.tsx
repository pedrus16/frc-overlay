import Cameo from '../Cameo';
import Unit from '../../models/Unit';

interface Properties {
  units: Unit[];
}

const Army = ({ units }: Properties) => (
  <>
    {units.map((unit) => (
      <div key={unit.id}>
        <Cameo id={unit.id} />
        <div>{unit.alive_count}</div>
      </div>
    ))}
  </>
);

export default Army;
