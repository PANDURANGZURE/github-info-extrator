"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import RecentRepos from "../components/RecentRepos";
import Header from "@/components/Header";



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
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white flex flex-col items-center px-6 md:px-12">
      <Header/>
      <div className="w-full max-w-5xl">
        <header className="mb-8">
          <h1 className="text-4xl font-[saurav] md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-300 to-yellow-300 text-center">
            
          </h1>
          <h1 className="text-center text-6xl font-[saurav]">
            Github Glance
          </h1>
          <p className="text-center text-sm text-neutral-400 mt-2">Search any GitHub profile and explore repos with a clean, dark UI.</p>
        </header>

        {/* Search Card */}
        <div className="flex items-center gap-4 p-4 md:p-6 bg-neutral-800/40 border border-neutral-700/40 rounded-2xl backdrop-blur-sm shadow-md">
          <input
            type="text"
            placeholder="e.g. torvalds or paste full profile URL"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-transparent placeholder-neutral-400 text-white px-4 py-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={fetchGitHubData}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-5 py-3 rounded-lg shadow-lg transform transition active:scale-95"
          >
            Search
          </button>
        </div>

        {/* Status */}
        <div className="mt-4">
          {loading && <p className="text-neutral-300">Fetching data...</p>}
          {error && <p className="text-rose-400 font-semibold">{error}</p>}
        </div>

        {/* Profile Section */}
        {userData && (
          <div className="mt-8 w-full bg-neutral-800/40 border border-neutral-700/40 rounded-2xl backdrop-blur-md p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={userData.avatar_url}
                alt="avatar"
                className="w-36 h-36 rounded-full ring-2 ring-indigo-500 object-cover"
              />

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold">{userData.name || userData.login}</h2>
                <p className="text-neutral-400 mt-1">@{userData.login}</p>

                <p className="text-neutral-300 mt-4 max-w-xl leading-relaxed">{userData.bio || 'No bio available.'}</p>

                <div className="flex gap-6 mt-4 text-sm text-neutral-300">
                  <span>Followers: <span className="font-semibold text-white">{userData.followers}</span></span>
                  <span>Following: <span className="font-semibold text-white">{userData.following}</span></span>
                  <span>Repos: <span className="font-semibold text-white">{userData.public_repos}</span></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm text-neutral-300">
              <div className="bg-neutral-900/40 p-3 rounded-lg">Location: <div className="font-medium text-white">{userData.location || 'N/A'}</div></div>
              <div className="bg-neutral-900/40 p-3 rounded-lg">Company: <div className="font-medium text-white">{userData.company || 'N/A'}</div></div>
              <div className="bg-neutral-900/40 p-3 rounded-lg">Joined: <div className="font-medium text-white">{new Date(userData.created_at).toLocaleDateString()}</div></div>
              <div className="bg-neutral-900/40 p-3 rounded-lg">Email: <div className="font-medium text-white">{userData.email || 'N/A'}</div></div>
            </div>
          </div>
        )}

        {/* Repo Section */}
        {repos.length > 0 && (
          <div className="mt-8 w-full">
            <h3 className="text-xl font-semibold mb-4 text-white">📂 Repositories</h3>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <div key={repo.id} className="bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-5 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition">
                  <a href={repo.html_url} target="_blank" className="text-lg font-semibold text-indigo-200 hover:underline">{repo.name}</a>
                  <p className="text-neutral-300 text-sm mt-2">{repo.description || 'No description provided'}</p>

                  <div className="flex flex-wrap gap-3 mt-4 text-sm text-neutral-300">
                    <span>🌐 {repo.language || 'N/A'}</span>
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>🐛 {repo.open_issues_count}</span>
                    <span>Size: {repo.sizeFormatted || repo.size}</span>
                  </div>

                  <div className="mt-4 flex justify-between items-end">
                    <div className="text-xs text-neutral-400">
                      <div>Created: {new Date(repo.created_at).toLocaleDateString()}</div>
                      <div>Updated: {new Date(repo.updated_at).toLocaleDateString()}</div>
                    </div>
                    <a href={repo.html_url} target="_blank" className="text-2xl text-neutral-200 hover:text-white"><FaGithub /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Views */}
        <div className="mt-8 flex justify-center">
          <img src={`https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`} alt="profile views" className="" />
        </div>

        <div className="mt-8">
          <RecentRepos username={username} />
        </div>
      </div>
    </div>
  );
}
