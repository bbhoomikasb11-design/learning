import React, { useState } from "react";

export default function GithubSearch() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
      const reposData = await reposRes.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>GitHub Profile Inspector</h2>
      <form onSubmit={fetchProfile} style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter GitHub username (e.g. facebook)..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Search</button>
      </form>

      {loading && <p>Fetching profile...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={user.avatar_url} alt={user.login} style={{ width: "60px", height: "60px", borderRadius: "50%" }} />
            <div>
              <h3 style={{ margin: 0 }}>{user.name || user.login}</h3>
              <p style={{ margin: 0, color: "#666" }}>Public Repos: {user.public_repos} | Followers: {user.followers}</p>
            </div>
          </div>

          <h4 style={{ marginTop: "1rem" }}>Recent Repositories</h4>
          <ul style={{ paddingLeft: "20px" }}>
            {repos.map(r => (
              <li key={r.id}>
                <a href={r.html_url} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "#0066cc" }}>
                  {r.name}
                </a> ({r.stargazers_count} ★)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}