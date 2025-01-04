import React, { useState } from 'react';
import { useCreatePlayerMutation } from '@derail/gql-test';

export const CreatePlayer: React.FC = () => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [createPlayer, { loading, error }] = useCreatePlayerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPlayer({ variables: { name, biography } });
      setName('');
      setBiography('');
      alert('Player created successfully!');
    } catch (err) {
      console.error('Error creating player:', err);
    }
  };

  return (
    <div>
      <h2>Create Player</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Bio:
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Player'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};
