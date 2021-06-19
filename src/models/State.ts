import Player from './Player';

interface Game {
  refresh_rate: number;
  is_in_game: boolean;
  game_time: number;
  players_count: number;
  game_name: string;
  map_name: string;
}

export default interface State {
  game: Game;
  players: Player[];
}
