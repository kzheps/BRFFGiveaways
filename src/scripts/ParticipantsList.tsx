import React, { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Users, Star, Shield, Heart, User, X } from 'lucide-react';
import { Participant } from '../types';
import { cn } from '../utils/cn';

interface ParticipantsListProps {
  participants: Participant[];
  isActive: boolean;
  onRemoveParticipant?: (username: string) => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants, isActive, onRemoveParticipant }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [filterText, setFilterText] = useState('');

  const filteredParticipants = participants.filter((p) =>
    p.displayName.toLowerCase().includes(filterText.toLowerCase()) ||
    p.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const rowVirtualizer = useVirtualizer({
    count: filteredParticipants.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 10,
  });

  const getRoleIcon = (participant: Participant) => {
    if (!participant.roles) return null;
    if (participant.roles.isModerator) return <Shield className="h-4 w-4 text-green-500" title="MOD" />;
    if (participant.roles.isVIP) return <Star className="h-4 w-4 text-purple-500" title="VIP" />;
    if (participant.roles.isSubscriber) return <Heart className="h-4 w-4 text-yellow-500" title="Subscriber" />;
    if (participant.roles.isFollower) return <User className="h-4 w-4 text-blue-500" title="Follower" />;
    return null;
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">УЧАСТНИКИ</CardTitle>
          <div className="flex items-center">
            <Users className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-sm font-medium">{filteredParticipants.length}</span>
          </div>
        </div>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Поиск по нику..."
          className="w-full px-3 py-1.5 text-sm rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        {filteredParticipants.length > 0 ? (
          <div ref={parentRef} className="h-full overflow-y-auto pr-2">
            <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const participant = filteredParticipants[virtualRow.index];
                return (
                  <div
                    key={participant.id}
                    className={cn(
                      'absolute top-0 left-0 w-full px-2 py-1',
                      'flex items-center rounded-md bg-slate-800 border-l-4',
                      participant.roles?.isModerator && 'border-green-500',
                      participant.roles?.isVIP && 'border-yellow-500',
                      participant.roles?.isSubscriber && 'border-purple-500',
                      participant.roles?.isFollower && 'border-blue-500',
                      (!participant.roles?.isFollower || !participant.roles) && 'border-slate-500'
                    )}
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                      {participant.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="font-medium text-white">
                        {participant.displayName}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(participant.entryTime).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(participant)}
                      {onRemoveParticipant && (
                        <button
                          onClick={() => onRemoveParticipant(participant.username)}
                          className="text-slate-400 hover:text-red-500"
                          title="Удалить участника"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-600">
            {isActive ? 'Нищий стример, без зрителей пока-что' : 'Нет активного розыгрыша'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParticipantsList;
