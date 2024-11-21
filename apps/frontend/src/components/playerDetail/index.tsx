// components/PlayerDetail.tsx
import React, { useState } from 'react';
import { useGetPlayerQuery, useUpdatePlayerMutation } from '@derail/gql-test';

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
  const [age, setAge] = useState<number | undefined>();
  const [bio, setBio] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.getPlayer) return <></>;

  const player = data.getPlayer;

  const handleUpdate = () => {
    updatePlayer({
      variables: {
        id: playerId,
        name: name || player.name,
        age: age ?? player.profile?.age,
        bio: bio || player.profile?.bio,
      },
    });
  };

  return (
    <div>
      <h2>Player Detail: {player.name}</h2>
      <p>Age: {player.profile?.age ?? 'N/A'}</p>
      <p>Bio: {player.profile?.bio ?? 'N/A'}</p>

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
          Age:
          <input
            type="number"
            defaultValue={player.profile?.age ?? ''}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <label>
          Bio:
          <textarea
            defaultValue={player.profile?.bio ?? ''}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default PlayerDetail;
