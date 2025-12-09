"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RecentRepos({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const repoCardsRef = useRef([]);
  const containerRef = useRef(null);

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

  // Animate repo cards with scroll trigger
  useEffect(() => {
    if (repoCardsRef.current.length > 0 && containerRef.current) {
      // Staggered entrance animation with scroll trigger
      gsap.fromTo(
        repoCardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add hover scale animation to each card
      repoCardsRef.current.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)",
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [repos]);

  if (!username) return <p className="text-neutral-400 text-sm">Enter a GitHub username to see recent repos.</p>;
  if (loading) return <p className="text-neutral-400 text-sm">Loading recent repos…</p>;
  if (error)
    return (
      <div className="text-rose-400 text-sm">
        <p>Error: {error}</p>
        <button
          className="mt-2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white rounded-lg transition text-xs"
          onClick={() => {
            setError(null);
            setLoading(true);
            setTimeout(() => setLoading(false), 10);
          }}
        >
          Retry
        </button>
      </div>
    );
  if (repos.length === 0) return <p className="text-neutral-400 text-sm">No recent repos found for {username}.</p>;

  return (
    <div ref={containerRef} className="w-full">
      <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
        ⏱️ Recently Pushed by <span className="text-indigo-300">{username}</span>
      </h2>
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {repos.map((repo, index) => (
          <a
            key={repo.id}
            ref={(el) => {
              if (el) repoCardsRef.current[index] = el;
            }}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-indigo-200 hover:underline break-words">{repo.name}</h3>
                <p className="text-neutral-400 text-xs md:text-sm mt-1">
                  Pushed: {new Date(repo.pushed_at).toLocaleDateString()}
                </p>
              </div>
              <FaGithub className="text-neutral-300 flex-shrink-0 text-lg md:text-xl" />
            </div>
            <p className="text-neutral-300 text-xs md:text-sm mt-2 line-clamp-2">{repo.description || 'No description'}</p>
            <div className="flex gap-2 mt-3 text-xs text-neutral-400">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
