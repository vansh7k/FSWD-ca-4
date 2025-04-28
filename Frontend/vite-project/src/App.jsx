import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      
      const updatedMovies = [...movies];
      updatedMovies[editIndex] = { title, rating };
      setMovies(updatedMovies);
      setEditIndex(null);
    } else {
      
      setMovies([...movies, { title, rating }]);
    }
    setTitle('');
    setRating(1);
  };

  const handleEdit = (index) => {
    setTitle(movies[index].title);
    setRating(movies[index].rating);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    if (editIndex === index) {
      setTitle('');
      setRating(1);
      setEditIndex(null);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h1>🎬 Movie Collection</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          {editIndex !== null ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
        {movies.map((movie, index) => (
          <li key={index} style={{ marginBottom: '1rem', background: '#f1f1f1', padding: '1rem', borderRadius: '8px' }}>
            <strong>{movie.title}</strong> - {movie.rating} ⭐
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => handleEdit(index)} style={{ marginRight: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDelete(index)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
