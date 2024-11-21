import React, { useState } from 'react';
import PlayerList from './components/playerList';
import PlayerDetail from './components/playerDetail';

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  return (
    <div>
      <h1>GraphQL CRUD App</h1>
      <PlayerList onClickListItem={setSelectedPlayer} />
      {selectedPlayer && <PlayerDetail playerId={selectedPlayer} />}
    </div>
  );
};

export default App;
