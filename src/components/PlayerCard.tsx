import React from 'react';
import { User, Calendar, MapPin, Shirt } from 'lucide-react';
import { Player } from '../types';

interface PlayerCardProps {
  player: Player;
}

const getPositionColor = (position: string) => {
  switch (position) {
    case 'Portero': return 'bg-yellow-100 text-yellow-800';
    case 'Defensa': return 'bg-blue-100 text-blue-800';
    case 'Mediocampista': return 'bg-green-100 text-green-800';
    case 'Delantero': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0 relative">
            <img
              src={player.photo}
              alt={player.name}
              className="w-16 h-16 rounded-full object-cover border-3 border-blue-200"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {player.jerseyNumber}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{player.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{player.teamName}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
              {player.position}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>{player.age} años</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-green-500" />
            <span>{player.nationality}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Shirt className="h-4 w-4 mr-2 text-purple-500" />
            <span>Dorsal #{player.jerseyNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
}