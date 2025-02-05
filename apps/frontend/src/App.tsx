import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import PlayerList from "./components/playerList";
import PlayerDetail from "./components/playerDetail";
import client from "./graphql/client";

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>GraphQL CRUD App</h1>
        {import.meta.env.VITE_BACKEND_URL}
        <PlayerList onClickListItem={setSelectedPlayer} />
        {selectedPlayer && <PlayerDetail playerId={selectedPlayer} />}
      </div>
    </ApolloProvider>
  );
};

export default App;
