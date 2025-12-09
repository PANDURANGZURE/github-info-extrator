"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import RecentRepos from "../components/RecentRepos";
import Header from "@/components/Header";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



export default function Home() {
  const titleRef = useRef(null);
  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const repoCardsRef = useRef([]);
  const profileRef = useRef(null);
  const statsRef = useRef([]);
  const profileSectionRef = useRef(null);

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

  // Animate title on page load
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
    }
  }, []);

  // Animate repo cards when they appear
  useEffect(() => {
    if (repoCardsRef.current.length > 0) {
      gsap.fromTo(
        repoCardsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
      
      // Add hover animations to repo cards
      repoCardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
              duration: 0.3,
              ease: "power2.out",
            });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              boxShadow: "0 0 0px rgba(99, 102, 241, 0)",
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });
    }
  }, [repos]);

  // Animate profile section entrance
  useEffect(() => {
    if (profileRef.current) {
      gsap.fromTo(
        profileRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: profileRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [userData]);

  // Animate profile stats with stagger
  useEffect(() => {
    if (statsRef.current.length > 0) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current[0]?.parentElement,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, [userData]);

  // Scroll trigger animations for other elements
  useEffect(() => {
    if (profileSectionRef.current) {
      ScrollTrigger.create({
        trigger: profileSectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            profileSectionRef.current.querySelectorAll(".stat-box"),
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
            }
          );
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [userData]);

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
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-neutral-900 to-neutral-800 text-white flex flex-col items-center px-4 md:px-12 pt-4 md:pt-0">
      <Header ref={headerRef}/>
      <div className="w-full max-w-5xl mt-4 md:mt-0">
        <header className="mb-6 md:mb-8" ref={titleRef}>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-[saurav] font-extrabold bg-gradient-to-r text-purple-200 text-center">
            Github Glance
          </h1>
          <p className="text-center text-xs sm:text-sm text-neutral-400 mt-2">Search any GitHub profile and explore repos with a clean, dark UI.</p>
        </header>

        {/* Search Card */}
        <div ref={searchRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 md:p-6 bg-neutral-800/40 border border-neutral-700/40 rounded-2xl backdrop-blur-sm shadow-md">
          <input
            type="text"
            placeholder="e.g. pandurangzure"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-transparent placeholder-neutral-400 text-white px-4 py-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />

          <button
            onClick={fetchGitHubData}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-5 py-3 rounded-lg shadow-lg transform transition active:scale-95 whitespace-nowrap"
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
          <div ref={profileRef} className="mt-6 md:mt-8 w-full bg-neutral-800/40 border border-neutral-700/40 rounded-2xl backdrop-blur-md p-4 md:p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
              <img
                src={userData.avatar_url}
                alt="avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full ring-2 ring-indigo-500 object-cover flex-shrink-0"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{userData.name || userData.login}</h2>
                <p className="text-neutral-400 mt-1 text-sm">@{userData.login}</p>

                <p className="text-neutral-300 mt-3 md:mt-4 max-w-xl leading-relaxed text-sm md:text-base">{userData.bio || 'No bio available.'}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-6 mt-3 md:mt-4 text-xs sm:text-sm text-neutral-300">
                  <span>Followers: <span className="font-semibold text-white">{userData.followers}</span></span>
                  <span>Following: <span className="font-semibold text-white">{userData.following}</span></span>
                  <span>Repos: <span className="font-semibold text-white">{userData.public_repos}</span></span>
                </div>
              </div>
              <div className=" flex justify-center">
          <img src={`https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat`} alt="profile views" className="" />
        </div>
            </div>

            <div ref={profileSectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-4 md:mt-6 text-xs sm:text-sm text-neutral-300">
              <div className="stat-box bg-neutral-900/40 p-3 rounded-lg" ref={(el) => { if (el) statsRef.current[0] = el; }}>Location: <div className="font-medium text-white">{userData.location || 'N/A'}</div></div>
              <div className="stat-box bg-neutral-900/40 p-3 rounded-lg" ref={(el) => { if (el) statsRef.current[1] = el; }}>Company: <div className="font-medium text-white">{userData.company || 'N/A'}</div></div>
              <div className="stat-box bg-neutral-900/40 p-3 rounded-lg" ref={(el) => { if (el) statsRef.current[2] = el; }}>Joined: <div className="font-medium text-white">{new Date(userData.created_at).toLocaleDateString()}</div></div>
              <div className="stat-box bg-neutral-900/40 p-3 rounded-lg" ref={(el) => { if (el) statsRef.current[3] = el; }}>Email: <div className="font-medium text-white">{userData.email || 'N/A'}</div></div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <RecentRepos username={username} />
        </div>

        {/* Repo Section */}
        {repos.length > 0 && (
          <div className="mt-6 md:mt-8 w-full">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">📂 Repositories</h3>

            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo, index) => (
                <div 
                  key={repo.id} 
                  ref={(el) => {
                    if (el) repoCardsRef.current[index] = el;
                  }}
                  className="bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
                >
                  <a href={repo.html_url} target="_blank" className="text-base md:text-lg font-semibold text-indigo-200 hover:underline break-words">{repo.name}</a>
                  <p className="text-neutral-300 text-xs md:text-sm mt-2 line-clamp-2">{repo.description || 'No description provided'}</p>

                  <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4 text-xs md:text-sm text-neutral-300">
                    <span>🌐 {repo.language || 'N/A'}</span>
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>🐛 {repo.open_issues_count}</span>
                    <span>Size: {repo.sizeFormatted || repo.size}</span>
                  </div>

                  <div className="mt-3 md:mt-4 flex justify-between items-end">
                    <div className="text-xs text-neutral-400">
                      <div>Created: {new Date(repo.created_at).toLocaleDateString()}</div>
                      <div>Updated: {new Date(repo.updated_at).toLocaleDateString()}</div>
                    </div>
                    <a href={repo.html_url} target="_blank" className="text-xl md:text-2xl text-neutral-200 hover:text-white"><FaGithub /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Views */}
        

        
      </div>
    </div>
  );
}
