import React from 'react';
import { Calendar, MapPin, Users, Radius as Stadium } from 'lucide-react';
import { Team } from '../types';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <img
              src={team.logo}
              alt={`Logo ${team.name}`}
              className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{team.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {team.city}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>Fundado: {team.foundedYear}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 text-green-500" />
            <span>{team.playerCount} jugadores</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <Stadium className="h-4 w-4 mr-2 text-yellow-500" />
          <span className="truncate">{team.stadium}</span>
        </div>
      </div>
    </div>
  );
}