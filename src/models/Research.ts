import { ResearchType } from './enums/ResearchType';

export default interface Research {
  id: string;
  progress_percent: number;
  type: ResearchType;
}
