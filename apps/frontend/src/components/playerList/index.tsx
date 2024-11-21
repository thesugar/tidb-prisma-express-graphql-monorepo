import React, { useCallback } from "react";
import { useListPlayersQuery } from "@derail/gql-test";

type PlayerListProps = {
  onClickListItem: (playerId: string) => void;
};

const PlayerList: React.FC<PlayerListProps> = ({ onClickListItem }) => {
  const { data, loading, error } = useListPlayersQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || !data.listPlayers) {
    return <div>No players found.</div>;
  }

  const handleClick = useCallback((playerId: string) => () => {
    onClickListItem(playerId)
  }, [])

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {data.listPlayers.map((player) => (
          <li
            key={player.id}
            onClick={handleClick(player.id)}
            style={{ cursor: "pointer" }}
          >
            {player.name} (Age: {player.profile?.age})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
