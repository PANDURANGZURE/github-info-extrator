"use client";
import { useState } from "react";

export default function GithubRepos() {
  const [input, setInput] = useState(""); // Username or profile link
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = () => {
    let user = input.trim();
    // If input looks like a link, extract username
    if (user.startsWith("http")) {
      try {
        const url = new URL(user);
        const parts = url.pathname.split("/").filter(Boolean);
        user = parts[0] || "";
      } catch (error) {
        console.error("Invalid GitHub link");
        return;
      }
    }
    if (!user) return;

    setLoading(true);
    fetch(`https://api.github.com/users/${user}/repos?sort=updated`)
      .then((res) => res.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Input Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="GitHub username or profile link (e.g. octocat or https://github.com/octocat)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-lg text-white"
        />
        <button
          onClick={fetchRepos}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Repos
        </button>
      </div>

      {/* Loader */}
      {loading && <p className="text-gray-500">Loading repositories...</p>}

      {/* Repo List */}
      {!loading && repos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Repositories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="p-4 border rounded-2xl shadow hover:shadow-lg transition"
              >
                {/* Repo Name */}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>

                {/* Repo Description */}
                <p className="text-gray-600 text-sm mt-2">
                  {repo.description || "No description provided"}
                </p>

                {/* Repo Stats */}
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
                  <span>🌐 {repo.language || "N/A"}</span>
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  <span>👀 {repo.watchers_count}</span>
                  <span>🐛 {repo.open_issues_count}</span>
                </div>

                {/* Dates */}
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(repo.created_at).toLocaleDateString()} | Updated:{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </p>

                {/* License */}
                <p className="text-xs text-gray-500">
                  License: {repo.license?.name || "No license"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && repos.length === 0 && input && (
        <p className="text-gray-500">No repositories found for this user.</p>
      )}
    </div>
  );
}
