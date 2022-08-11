interface Move {
  id: number,
  name: string,
  level: number,
}

interface Stats {
  hp: number,
  attack: number,
  defense: number,
  special_attack: number,
  special_defense: number,
  speed: number,
}

interface Pokemon {
  id: number,
  name: string,
  form: string,
  owned: boolean,
  types: string[],
  baseExp: number,
  height: string,
  weight: string,
  moves: Move[],
  stats: Stats,
}
