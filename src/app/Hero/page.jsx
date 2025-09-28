"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  // Helper to format repo size (GitHub API returns size in KB)
  function formatRepoSize(size) {
    if (size < 1024) return `${size} KB`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} MB`;
    return `${(size / (1024 * 1024)).toFixed(2)} GB`;
  }
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGitHubData = async () => {
    if (!username) return;
    setLoading(true);
    setError("");
    setUserData(null);
    setRepos([]);

    try {
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) throw new Error("User not found");
  const user = await userRes.json();

  const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
  const repoData = await repoRes.json();

  // format size before setting repos
  const reposWithSize = repoData.map(repo => ({
    ...repo,
    sizeFormatted: formatRepoSize(repo.size)
  }));

  setUserData(user);
  setRepos(reposWithSize);

} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">
        🔍 GitHub Profile Finder
      </h1>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchGitHubData}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-600">Fetching data...</p>}

      {/* Error */}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {/* Profile Section */}
      {userData && (
        <div className="bg-white shadow-md rounded-lg p-6 w-96 mb-6 text-center">
          <img
            src={userData.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
          <p className="text-gray-600">@{userData.login}</p>
          <p className="mt-2">{userData.bio}</p>
          <div className="flex justify-around mt-4 text-sm font-medium">
            <br /><span>👥 {userData.followers} Followers</span>
            <br /><span>➡️ {userData.following} Following</span>
            <br /><span>📦 {userData.public_repos} Repos</span>
            <br /><span>📦 {userData.email} Email</span>
            <br /><span>📦 {userData.blog} Blog</span>
            <br /><span>📦 {userData.stargazers_count} Total star</span>
            <br /><span>📦 {userData.location} Location</span>
            <br /><span>📦 {userData.company} Company</span>
            <br /><span>📦 {userData.created_at} created on date</span>
            <br /><span>📦 {userData.updated_at} Last profile update</span>
          </div>
        </div>
      )}

      {/* Repo Section */}
      {repos.length > 0 && (
        <div className="w-full ">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📂 Repositories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
                <p className="text-gray-600 text-sm mt-2">
                    {repo.description || "No description provided"}
                  </p>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
                    <span>🌐 {repo.language || "N/A"}</span>
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>👀 {repo.watchers_count}</span>
                    <span>🐛 {repo.open_issues_count}</span>
                  </div>
                  <div className="flex justify-between items-end">
                   <div>
                     <p className="text-xs text-gray-500 mt-2">
                    Created: {new Date(repo.created_at).toLocaleDateString()} | Updated:{" "}
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    License: {repo.license?.name || "No license"}
                  </p>
                  <p>Size: {repo.sizeFormatted}</p>
                   </div>
                  <a href={repo.html_url}><div className="flex justify-end text-3xl"><FaGithub /></div></a>

                  </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3">
  <img 
    src={`https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`} 
    alt="profile views"
  />
</div>
    </div>
  );
}
