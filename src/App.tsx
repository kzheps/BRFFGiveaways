import React from 'react';
import { useTwitchChat } from './hooks/useTwitchChat';
import { useGiveawayStore } from './store/giveawayStore';

import Header from './scripts/Header';
import Footer from './scripts/Footer';
import GiveawayTimer from './scripts/GiveawayTimer';
import KeywordInput from './scripts/KeywordDisplay';
import WinnerDisplay from './scripts/WinnerDisplay';
import ParticipantsList from './scripts/ParticipantsList';
import SettingsToggle from './scripts/GiveawayControls';

function App() {
  const { isActive, winner } = useGiveawayStore();
  useTwitchChat();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {winner ? (
          <div className="space-y-6">
            <WinnerDisplay />
            <ParticipantsList />
          </div>
        ) : (
          <div className="space-y-6">
            {isActive ? (
              <div className="w-full">
                <GiveawayTimer />
              </div>
            ) : (
              <>
                <div className="flex-grow px-4 py-8 w-full space-y-6">
                    <KeywordDisplay />
                    <GiveawayControls />
                </div>
              </>
            )}
            <ParticipantsList />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
