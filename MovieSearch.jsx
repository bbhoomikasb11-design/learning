import React, { useState } from "react";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      // Free public key demo (s=query search)
      const res = await fetch(`https://www.omdbapi.com/?apikey=trilogy&s=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Movie Search</h2>
      <form onSubmit={searchMovies} style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search movie titles (e.g., Batman)..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px" }}>
        {movies.map((m) => (
          <div key={m.imdbID} style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "8px", textAlign: "center" }}>
            <img 
              src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/150"} 
              alt={m.Title} 
              style={{ width: "100%", height: "200px", objectFit: "cover" }} 
            />
            <h4 style={{ margin: "8px 0 4px" }}>{m.Title}</h4>
            <p style={{ margin: 0, color: "#666" }}>{m.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}