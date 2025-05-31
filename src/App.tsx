import React from 'react';
import { useGiveaway } from './hooks/useGiveaway';
import { useTwitchChat } from './hooks/useTwitchChat';
import ChannelHeader from './components/ChannelHeader';
import GiveawayTimer from './components/GiveawayTimer';
import KeywordDisplay from './components/KeywordDisplay';
import ParticipantsList from './components/ParticipantsList';
import WinnerDisplay from './components/WinnerDisplay';
import GiveawayControls from './components/GiveawayControls';
import { Rocket } from 'lucide-react';
import { cn } from './utils/cn';

function GiveawayApp() {
  const channelName = 'bratishkinoff';
  const {
    state,
    endTime,
    startGiveaway,
    stopGiveaway,
    resetGiveaway,
    drawWinner,
    handleTimerEnd,
    removeParticipant,
    addParticipantFromChat,
  } = useGiveaway(channelName);

  useTwitchChat(channelName, addParticipantFromChat);

  return (
    <div className="min-h-screen bg-monkey-bg text-monkey-text">
      <ChannelHeader channelName={channelName} />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <GiveawayTimer
                endTime={endTime}
                isActive={state.status === 'active'}
                onTimerEnd={handleTimerEnd}
              />
              <KeywordDisplay
                keyword={state.keyword}
                isActive={state.status === 'active'}
              />
            </div>

            <WinnerDisplay winner={state.winner} />
          </div>

          <div className="flex flex-col space-y-6">
            <GiveawayControls
              status={state.status}
              onStart={startGiveaway}
              onStop={stopGiveaway}
              onReset={resetGiveaway}
              onDrawWinner={drawWinner}
              participantsCount={state.participants.length}
            />

            <div className="flex-grow">
              <ParticipantsList
                participants={state.participants}
                isActive={state.status === 'active'}
                onRemoveParticipant={removeParticipant}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-4 bg-monkey-bg border-t border-monkey-hover">
        <div className="container mx-auto px-4 flex items-center justify-center space-x-3">
          <span className="text-monkey-sub">Created by</span>
          <a
            href="https://boosty.to/kzheps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-monkey-main hover:text-monkey-text transition-colors duration-200 flex items-center space-x-2"
          >
            <span>KZHEPS</span>
            <Rocket className="w-4 h-4 animate-float" />
          </a>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return <GiveawayApp />;
}

export default App;
