import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Player, Team } from '../types';

interface PlayerFormProps {
  teams: Team[];
  onSubmit: (player: Omit<Player, 'id'>) => void;
  onCancel: () => void;
}

export function PlayerForm({ teams, onSubmit, onCancel }: PlayerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    age: 20,
    position: 'Mediocampista' as Player['position'],
    teamId: '',
    nationality: 'Colombia',
    jerseyNumber: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.teamId) return;
    
    const selectedTeam = teams.find(team => team.id === formData.teamId);
    if (!selectedTeam) return;

    onSubmit({
      ...formData,
      teamName: selectedTeam.name
    });
    
    setFormData({
      name: '',
      photo: '',
      age: 20,
      position: 'Mediocampista',
      teamId: '',
      nationality: 'Colombia',
      jerseyNumber: 1
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Agregar Nuevo Jugador</h3>
        <button
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipo *
            </label>
            <select
              value={formData.teamId}
              onChange={(e) => setFormData(prev => ({ ...prev, teamId: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar equipo</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="16"
              max="45"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posición
            </label>
            <select
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as Player['position'] }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Portero">Portero</option>
              <option value="Defensa">Defensa</option>
              <option value="Mediocampista">Mediocampista</option>
              <option value="Delantero">Delantero</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Camiseta
            </label>
            <input
              type="number"
              value={formData.jerseyNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, jerseyNumber: parseInt(e.target.value) }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="99"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL de la Foto
            </label>
            <input
              type="url"
              value={formData.photo}
              onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nacionalidad
            </label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Agregar Jugador
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}