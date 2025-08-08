export interface Team {
  id: string;
  name: string;
  logo: string;
  foundedYear: number;
  city: string;
  stadium: string;
  playerCount: number;
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  age: number;
  position: 'Portero' | 'Defensa' | 'Mediocampista' | 'Delantero';
  teamId: string;
  teamName: string;
  nationality: string;
  jerseyNumber: number;
}

export type TabType = 'teams' | 'players' | 'search';