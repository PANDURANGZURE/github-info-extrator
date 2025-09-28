"use client";

import { useEffect, useState } from "react";

export default function RecentRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=4`
        );
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (repos.length === 0) return <p className="text-gray-400">No repos found.</p>;

  return (
    <div className="p-4 bg-neutral-900 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-white mb-4">
        Recent Committed Repos for <span className="text-blue-400">{username}</span>
      </h2>
      <ul className="space-y-3">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 font-medium"
            >
              {repo.name}
            </a>
            <p className="text-sm text-gray-400">
              Last pushed: {new Date(repo.pushed_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
