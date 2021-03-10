const TEAM_COLORS = [
  'Red',
  'Blue',
  'Teal',
  'Purple',
  'Yellow',
  'Orange',
  'Green',
  'Pink',
  'Gray',
  'LightBlue',
  'DarkGreen',
  'Brown',
  'Maroon',
  'Navy',
  'Turqoise',
  'Violet',
  'Wheat',
  'Peach',
  'Mint',
  'Lavender',
  'Coal',
  'Snow',
  'Emerald',
  'Peanut',
];

const getColorNameByIndex = (teamColor: number) =>
  `var(--${TEAM_COLORS[teamColor]})`;

export default getColorNameByIndex;
