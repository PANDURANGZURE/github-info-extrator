"use client";
import { useState } from "react";

export default function Testing() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchContributions() {
    setError("");
    setData(null);

    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);

    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const json = await res.json();

      if (json.errors) {
        setError(json.errors[0]?.message || "An error occurred.");
        setLoading(false);
        return;
      }

      if (!json.data?.user) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      setData(json.data.user.contributionsCollection.contributionCalendar);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub Contributions Checker</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 flex-grow rounded-md"
        />
        <button
          onClick={fetchContributions}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Output */}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {data && (
        <div className="mt-4 p-4 border rounded-md">
          <h2 className="font-semibold text-lg">{username}</h2>
          <p>Total contributions (last year): {data.totalContributions}</p>
        </div>
      )}
    </div>
  );
}