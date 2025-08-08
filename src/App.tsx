import React, { useState, useMemo } from 'react';
import { Plus, Users, Trophy, Search } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Team, Player, TabType } from './types';
import { TeamCard } from './components/TeamCard';
import { PlayerCard } from './components/PlayerCard';
import { TeamForm } from './components/TeamForm';
import { PlayerForm } from './components/PlayerForm';
import { SearchBar } from './components/SearchBar';

// Sample data
const sampleTeams: Team[] = [
  {
    id: '1',
    name: 'Atlético Nacional',
    logo: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    foundedYear: 1947,
    city: 'Medellín',
    stadium: 'Estadio Atanasio Girardot',
    playerCount: 0
  },
  {
    id: '2',
    name: 'Millonarios FC',
    logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    foundedYear: 1946,
    city: 'Bogotá',
    stadium: 'Estadio El Campín',
    playerCount: 0
  }
];

const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'James Rodríguez',
    photo: 'https://images.pexels.com/photos/1884236/pexels-photo-1884236.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    age: 32,
    position: 'Mediocampista',
    teamId: '2',
    teamName: 'Millonarios FC',
    nationality: 'Colombia',
    jerseyNumber: 10
  },
  {
    id: '2',
    name: 'Jefferson Lerma',
    photo: 'https://images.pexels.com/photos/1884235/pexels-photo-1884235.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    age: 29,
    position: 'Mediocampista',
    teamId: '1',
    teamName: 'Atlético Nacional',
    nationality: 'Colombia',
    jerseyNumber: 8
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('teams');
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [teams, setTeams] = useLocalStorage<Team[]>('liga-teams', sampleTeams);
  const [players, setPlayers] = useLocalStorage<Player[]>('liga-players', samplePlayers);

  // Update team player counts
  const teamsWithPlayerCount = useMemo(() => {
    return teams.map(team => ({
      ...team,
      playerCount: players.filter(player => player.teamId === team.id).length
    }));
  }, [teams, players]);

  const handleAddTeam = (teamData: Omit<Team, 'id' | 'playerCount'>) => {
    const newTeam: Team = {
      ...teamData,
      id: Date.now().toString(),
      playerCount: 0,
      logo: teamData.logo || 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };
    setTeams([...teams, newTeam]);
    setShowTeamForm(false);
  };

  const handleAddPlayer = (playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: Date.now().toString(),
      photo: playerData.photo || 'https://images.pexels.com/photos/1884236/pexels-photo-1884236.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    };
    setPlayers([...players, newPlayer]);
    setShowPlayerForm(false);
  };

  const filteredTeams = teamsWithPlayerCount.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'teams', label: 'Equipos', icon: Trophy, count: teams.length },
    { id: 'players', label: 'Jugadores', icon: Users, count: players.length },
    { id: 'search', label: 'Buscar', icon: Search }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-blue-500 to-red-500 rounded-full flex items-center justify-center">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Liga de Fútbol Colombiana</h1>
                <p className="text-sm text-gray-600">Sistema de Gestión Deportiva</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>{teams.length} Equipos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span>{players.length} Jugadores</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs font-medium">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {(activeTab === 'teams' || activeTab === 'players') && (
              <div className="flex items-center">
                <button
                  onClick={() => activeTab === 'teams' ? setShowTeamForm(true) : setShowPlayerForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {activeTab === 'teams' ? 'Agregar Equipo' : 'Agregar Jugador'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div>
            {showTeamForm && (
              <TeamForm 
                onSubmit={handleAddTeam}
                onCancel={() => setShowTeamForm(false)}
              />
            )}
            
            {teamsWithPlayerCount.length === 0 && !showTeamForm ? (
              <div className="text-center py-12">
                <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay equipos registrados</h3>
                <p className="text-gray-600 mb-4">Comienza agregando tu primer equipo a la liga</p>
                <button
                  onClick={() => setShowTeamForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-5 w-5" />
                  <span>Agregar Primer Equipo</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamsWithPlayerCount.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div>
            {showPlayerForm && (
              <PlayerForm 
                teams={teams}
                onSubmit={handleAddPlayer}
                onCancel={() => setShowPlayerForm(false)}
              />
            )}
            
            {players.length === 0 && !showPlayerForm ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay jugadores registrados</h3>
                <p className="text-gray-600 mb-4">
                  {teams.length === 0 
                    ? 'Necesitas crear al menos un equipo antes de agregar jugadores'
                    : 'Comienza agregando tu primer jugador'
                  }
                </p>
                {teams.length > 0 && (
                  <button
                    onClick={() => setShowPlayerForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 mx-auto"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Agregar Primer Jugador</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {players.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <div>
            <SearchBar 
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar equipos, jugadores, posiciones..."
            />
            
            {searchTerm.trim() === '' ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Buscar en la Liga</h3>
                <p className="text-gray-600">Escribe para buscar equipos, jugadores, ciudades o posiciones</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Teams Results */}
                {filteredTeams.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                      Equipos ({filteredTeams.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTeams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Players Results */}
                {filteredPlayers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-500" />
                      Jugadores ({filteredPlayers.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredPlayers.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {filteredTeams.length === 0 && filteredPlayers.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sin resultados</h3>
                    <p className="text-gray-600">No se encontraron equipos o jugadores que coincidan con "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;