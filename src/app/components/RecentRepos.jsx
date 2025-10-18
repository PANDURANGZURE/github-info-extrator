"use client";

import { useEffect, useState } from "react";

export default function RecentRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // reset state when username changes
    setRepos([]);
    setError(null);

    if (!username) {
      // don't show loading if there's no username
      setLoading(false);
      return;
    }

    let aborted = false;

    async function fetchRepos() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=4`
        );

        if (!res.ok) {
          // give clearer messages for common status codes
          if (res.status === 404) throw new Error("User not found (404)");
          if (res.status === 403) throw new Error("API rate limit exceeded or access forbidden (403)");
          const text = await res.text();
          throw new Error(`Request failed: ${res.status} ${text}`);
        }

        const data = await res.json();
        if (!aborted) setRepos(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!aborted) setError(err.message || String(err));
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    fetchRepos();

    return () => {
      aborted = true;
    };
  }, [username]);

  if (!username) return <p className="text-gray-400">Enter a GitHub username to see recent repos.</p>;
  if (loading) return <p className="text-gray-400">Loading recent repos…</p>;
  if (error)
    return (
      <div className="text-red-400">
        <p>Error: {error}</p>
        <button
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
          onClick={() => {
            // retry by re-setting username (will retrigger effect)
            setError(null);
            setLoading(true);
            // simple refetch by invoking effect: create a microtick reset
            setTimeout(() => setLoading(false), 10);
          }}
        >
          Retry
        </button>
      </div>
    );
  if (repos.length === 0) return <p className="text-gray-400">No recent repos found for {username}.</p>;

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
