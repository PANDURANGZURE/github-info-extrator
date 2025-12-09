"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import RecentRepos from "../components/RecentRepos";



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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-10">
  <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-10 text-center">
    🔍 GitHub Profile Finder
  </h1>

  {/* Input */}
  <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full sm:w-auto">
    <input
      type="text"
      placeholder="Enter GitHub username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="px-4 py-2 border rounded-lg w-full sm:w-72 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={fetchGitHubData}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Search
    </button>
  </div>

  {/* Loading */}
  {loading && <p className="text-gray-600 text-lg">Fetching data...</p>}

  {/* Error */}
  {error && <p className="text-red-600 font-semibold text-lg">{error}</p>}

  {/* Profile Section */}
  {userData && (
  <>
    {/* Dashboard Profile Section */}
    <div className="w-full bg-white rounded-2xl p-8 shadow-md border border-gray-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

        {/* Avatar */}
        <img
          src={userData.avatar_url}
          alt="avatar"
          className="w-40 h-40 rounded-full border-4 border-gray-300 object-cover"
        />

        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold">{userData.name}</h2>
          <p className="text-gray-600 font-medium text-lg">{userData.login}</p>

          <p className="text-gray-700 mt-3 max-w-xl leading-relaxed">
            {userData.bio}
          </p>

          {/* Followers Row */}
          <div className="flex gap-6 mt-4 text-gray-800 font-semibold">
            <span>Followers : {userData.followers}</span>
            <span>Following : {userData.following}</span>
          </div>
        </div>

      </div>

      {/* Extra Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 text-gray-800 font-medium text-center">
        <span>Followers : {userData.followers}</span>
        <span>Following : {userData.following}</span>
        <span>Repos : {userData.public_repos}</span>
        <span>Location : {userData.location || "N/A"}</span>

        <span>Company : {userData.company || "N/A"}</span>
        <span>Joined : {new Date(userData.created_at).toLocaleDateString()}</span>
        <span>Updated : {new Date(userData.updated_at).toLocaleDateString()}</span>
        <span>Email : {userData.email || "N/A"}</span>
      </div>
    </div>
  </>
)}


  {/* Repo Section */}
  {repos.length > 0 && (
    <div className="w-full max-w-6xl mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📂 Repositories</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition"
          >
            <a
              href={repo.html_url}
              target="_blank"
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {repo.name}
            </a>

            <p className="text-gray-600 text-sm mt-2">
              {repo.description || "No description provided"}
            </p>

            <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-700">
              <span>🌐 {repo.language || "N/A"}</span>
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>👀 {repo.watchers_count}</span>
              <span>🐛 {repo.open_issues_count}</span>
            </div>

            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">
                  Created: {new Date(repo.created_at).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600">
                  License: {repo.license?.name || "No license"}
                </p>
                <p className="text-xs text-gray-600">
                  Size: {repo.sizeFormatted || repo.size}
                </p>
              </div>

              <a href={repo.html_url}>
                <div className="text-3xl text-gray-800 hover:text-black">
                  <FaGithub />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Profile Views */}
  <div className="mt-8">
    <img
      src={`https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`}
      alt="profile views"
      className="mx-auto"
    />
  </div>

  <RecentRepos username={username} />
</div>

  );
}
