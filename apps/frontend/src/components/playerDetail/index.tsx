// components/PlayerDetail.tsx
import React, { useState } from 'react';
import { useGetPlayerQuery, useUpdatePlayerMutation } from '@derail/gql-test';
import { DeletePlayer } from '../deletePlayer';

interface PlayerDetailProps {
  playerId: string;
}

const PlayerDetail: React.FC<PlayerDetailProps> = ({ playerId }) => {
  const { data, loading, error } = useGetPlayerQuery({
    variables: {
        id: playerId,
    }
  })
  const [updatePlayer] = useUpdatePlayerMutation();

  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getPlayer) return <></>;

  const player = data.getPlayer;

  const handleUpdate = () => {
    updatePlayer({
      variables: {
        id: playerId,
        name: name || player.name,
        biography: biography || player.profile?.biography,
      },
    });
  };

  return (
    <div>
      <h2>Player Detail: {player.name}</h2>
      <p>Biography: {player.profile?.biography ?? 'N/A'}</p>

      <h3>Edit Player</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input
            type="text"
            defaultValue={player.name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Biography:
          <textarea
            defaultValue={player.profile?.biography ?? ''}
            onChange={(e) => setBiography(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
        <DeletePlayer playerId={playerId} />
      </form>
    </div>
  );
};

export default PlayerDetail;
