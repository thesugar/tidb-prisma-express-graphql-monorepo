import React from 'react';
import { ListPlayersDocument, useDeletePlayerMutation } from '@derail/gql-test';

interface DeletePlayerProps {
  playerId: string;
}

export const DeletePlayer: React.FC<DeletePlayerProps> = ({ playerId }) => {
  const [deletePlayer, { loading, error }] = useDeletePlayerMutation({
    refetchQueries: [{ query: ListPlayersDocument }]
  })

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await deletePlayer({ variables: { id: playerId } });
        alert('Player deleted successfully!');
      } catch (err) {
        console.error('Error deleting player:', err);
      }
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Player'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};
