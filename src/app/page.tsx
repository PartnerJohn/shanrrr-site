"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy, Medal, Crown, Clock, Users, Gamepad2, Eye,
  Search, Tv, ExternalLink, ChevronDown, Sparkles,
  MessageSquare, Heart, Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Gift } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const KICK_URL = "https://kick.com/shanrrr";
const DISCORD_URL = "https://discord.gg/UsHTKFhrEb";
const TWITTER_URL = "https://x.com/shanohni";
const INSTAGRAM_URL = "#";
const TIKTOK_URL = "#";

const profileColors = ["#fdba74", "#b07aff", "#f472b6", "#7dd3fc", "#6ee7b7", "#ff6b6b", "#fbbf24", "#a78bfa", "#34d399", "#fb923c"];

interface LeaderboardPlayer {
  rank: number;
  name: string;
  wager: string;
  avatar: string;
}

function formatCents(cents: number): string {
  return "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function useDatDropLeaderboard() {
  const [data, setData] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((raw: { steamid: string; nickname: string; total_wagered: number }[]) => {
        if (!Array.isArray(raw)) { setLoading(false); return; }
        const sorted = raw.sort((a, b) => b.total_wagered - a.total_wagered);
        setData(
          sorted.map((p, i) => ({
            rank: i + 1,
            name: p.nickname,
            wager: formatCents(p.total_wagered),
            avatar: profileColors[i % profileColors.length],
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
}

const communityStats = [
  { icon: Clock, label: "Watch Hours", value: "24,580", color: "text-[#b07aff]", bg: "bg-[#b07aff]/10" },
  { icon: Users, label: "Members", value: "1,247", color: "text-[#f472b6]", bg: "bg-[#f472b6]/10" },
  { icon: Gamepad2, label: "Total Wins", value: "3,892", color: "text-[#7dd3fc]", bg: "bg-[#7dd3fc]/10" },
  { icon: Eye, label: "Peak Viewers", value: "486", color: "text-[#6ee7b7]", bg: "bg-[#6ee7b7]/10" },
];

const casinoSites = ["Gamba", "DatDrop", "SkinWaste"] as const;
type CasinoSite = typeof casinoSites[number];

const placeholderData: Record<"Gamba" | "SkinWaste", LeaderboardPlayer[]> = {
  Gamba: [
    { rank: 1, name: "xStarDust", wager: "$284,200", avatar: profileColors[0] },
    { rank: 2, name: "CozyPanda99", wager: "$251,800", avatar: profileColors[1] },
    { rank: 3, name: "PixelQueen", wager: "$239,400", avatar: profileColors[2] },
    { rank: 4, name: "LuckyClover", wager: "$198,600", avatar: profileColors[3] },
    { rank: 5, name: "MoonBeam", wager: "$176,300", avatar: profileColors[4] },
    { rank: 6, name: "BubbleTea", wager: "$154,800", avatar: profileColors[5] },
    { rank: 7, name: "SparkleKid", wager: "$138,200", avatar: profileColors[6] },
    { rank: 8, name: "CloudNine", wager: "$121,500", avatar: profileColors[7] },
    { rank: 9, name: "SunnyDaze", wager: "$108,900", avatar: profileColors[8] },
    { rank: 10, name: "JellyBean", wager: "$94,200", avatar: profileColors[9] },
  ],
  SkinWaste: [
    { rank: 1, name: "NeonRider", wager: "$192,400", avatar: profileColors[5] },
    { rank: 2, name: "CherryBomb", wager: "$168,100", avatar: profileColors[6] },
    { rank: 3, name: "FrostyMint", wager: "$143,800", avatar: profileColors[7] },
    { rank: 4, name: "ThunderCat", wager: "$121,300", avatar: profileColors[8] },
    { rank: 5, name: "VelvetRose", wager: "$98,900", avatar: profileColors[9] },
    { rank: 6, name: "CosmicDust", wager: "$81,200", avatar: profileColors[0] },
    { rank: 7, name: "WildFox", wager: "$67,400", avatar: profileColors[1] },
    { rank: 8, name: "PixelDream", wager: "$52,800", avatar: profileColors[2] },
    { rank: 9, name: "GoldenAce", wager: "$41,300", avatar: profileColors[3] },
    { rank: 10, name: "LunarWolf", wager: "$34,100", avatar: profileColors[4] },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 18 },
  },
};

function CountdownTimer() {
  // Counts down to end of current month
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const diff = endOfMonth.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return (
    <div className="flex items-center gap-1">
      {[
        { val: days, label: "d" },
        { val: hours, label: "h" },
        { val: minutes, label: "m" },
      ].map(({ val, label }) => (
        <span key={label} className="bg-[#2a2438]/60 backdrop-blur-sm border border-[#b07aff]/10 rounded-md px-2 py-0.5 text-white font-mono font-bold text-sm">
          {val}<span className="text-[#9487aa] text-xs ml-0.5">{label}</span>
        </span>
      ))}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-[#fdba74]" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-[#b07aff]" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-[#f472b6]" />;
  return (
    <span className="w-7 h-7 rounded-full bg-[#b07aff]/5 border border-[#b07aff]/10 flex items-center justify-center text-xs font-bold text-[#9487aa]">
      {rank}
    </span>
  );
}

function KickIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className={className}>
      <path d="M37 .036h164.448v113.621h54.71v-56.82h54.731V.036h164.448v170.777h-54.73v56.82h-54.711v56.8h54.71v56.82h54.73V512.03H310.89v-56.82h-54.73v-56.8h-54.711v113.62H37V.036z" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </svg>
  );
}

const podiumConfig: Record<number, { color: string; borderColor: string; bgColor: string; icon: React.ReactNode; size: string; label: string }> = {
  1: { color: "text-[#fdba74]", borderColor: "border-[#fdba74]/25", bgColor: "bg-[#fdba74]/10", icon: <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#fdba74]" />, size: "w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl", label: "1st Place" },
  2: { color: "text-[#c0c0c0]", borderColor: "border-[#c0c0c0]/20", bgColor: "bg-[#c0c0c0]/10", icon: <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-[#c0c0c0]" />, size: "w-11 h-11 sm:w-14 sm:h-14 text-base sm:text-lg", label: "2nd Place" },
  3: { color: "text-[#cd7f32]", borderColor: "border-[#cd7f32]/20", bgColor: "bg-[#cd7f32]/10", icon: <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-[#cd7f32]" />, size: "w-11 h-11 sm:w-14 sm:h-14 text-base sm:text-lg", label: "3rd Place" },
  4: { color: "text-[#b07aff]", borderColor: "border-[#b07aff]/20", bgColor: "bg-[#b07aff]/10", icon: <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-[#b07aff]" />, size: "w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base", label: "4th Place" },
  5: { color: "text-[#f472b6]", borderColor: "border-[#f472b6]/20", bgColor: "bg-[#f472b6]/10", icon: <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-[#f472b6]" />, size: "w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base", label: "5th Place" },
};

function PodiumCard({ player, rank, className }: { player: LeaderboardPlayer; rank: number; className?: string }) {
  const config = podiumConfig[rank];

  return (
    <motion.div variants={bounceIn} className={className}>
      <Card className={`podium-${rank} border rounded-2xl relative`}>
        <CardContent className="p-4 sm:p-6 text-center">
          {rank === 1 && (
            <Sparkles className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 text-[#fdba74] opacity-60" />
          )}
          <div className={`${config.size} rounded-full border-2 ${config.borderColor} flex items-center justify-center mx-auto mb-3`} style={{ background: `color-mix(in srgb, ${player.avatar} 15%, transparent)` }}>
            <span className="font-bold" style={{ color: player.avatar }}>{rank}</span>
          </div>
          <div className="flex justify-center mb-1">{config.icon}</div>
          <p className={`text-xs font-semibold ${config.color} mb-1 uppercase tracking-wider`}>{config.label}</p>
          <p className={`font-bold text-white ${rank === 1 ? "text-lg" : ""}`}>{player.name}</p>
          <p className={`font-black ${config.color} mt-1 ${rank === 1 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
            {player.wager}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">wagered</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface KickStatus {
  is_live: boolean;
  title?: string;
  viewers?: number;
  started_at?: string;
}

function useKickStatus() {
  const [status, setStatus] = useState<KickStatus>({ is_live: false });

  const check = useCallback(async () => {
    try {
      // Fetch directly from Kick API (browser requests are allowed)
      const res = await fetch(
        "https://kick.com/api/v2/channels/shanrrr/livestream",
        { headers: { Accept: "application/json" } }
      );
      if (!res.ok) {
        setStatus({ is_live: false });
        return;
      }
      const json = await res.json();
      const stream = json?.data;
      if (!stream || !stream.id) {
        setStatus({ is_live: false });
        return;
      }
      setStatus({
        is_live: true,
        title: stream.session_title || "",
        viewers: stream.viewers || 0,
        started_at: stream.created_at || "",
      });
    } catch {
      // Fallback to our API route
      try {
        const res = await fetch("/api/kick-status");
        const data = await res.json();
        setStatus(data);
      } catch {
        // silently fail
      }
    }
  }, []);

  useEffect(() => {
    check();
    const interval = setInterval(check, 60_000); // poll every 60s
    return () => clearInterval(interval);
  }, [check]);

  return status;
}

function StreamSection({ kickStatus }: { kickStatus: KickStatus }) {

  return (
    <section id="stream" className="pt-10 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial="hidden" whileInView="visible" viewport={{ once: false }}
          variants={bounceIn}
        >
          <div className="inline-flex items-baseline justify-center gap-2 mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text-full">Watch the Stream</h2>
            {kickStatus.is_live && (
              <Badge className="bg-[#f472b6] text-white border-0 animate-pulse text-xs relative -top-0.5">
                LIVE
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {kickStatus.is_live
              ? kickStatus.title || "Shanrrr is live now!"
              : "Catch Shanrrr live on Kick"}
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={bounceIn}>
          <Card className={`bg-[#2a2438]/60 backdrop-blur-xl rounded-2xl relative overflow-hidden transition-all duration-500 ${
            kickStatus.is_live
              ? "border-[#f472b6]/30 shadow-[0_0_30px_rgba(244,114,182,0.15)]"
              : "border-transparent"
          }`}>
            <CardContent className="p-4 sm:p-6">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#c084fc]/8">
                <iframe
                  src="https://player.kick.com/shanrrr"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title="Shanrrr Kick Stream"
                />
              </div>
              <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 shrink-0">
                  {kickStatus.is_live ? (
                    <>
                      <motion.div
                        className="w-2 h-2 rounded-full bg-red-500"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <span className="text-xs sm:text-sm text-red-400 font-semibold">Live Now</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-[#6b5f7e]" />
                      <span className="text-xs sm:text-sm text-muted-foreground font-medium">Offline</span>
                    </>
                  )}
                </div>
                {kickStatus.is_live ? (
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px] sm:text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    {kickStatus.viewers?.toLocaleString()} watching
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm" asChild className="border-[#53fc18]/20 text-[#53fc18] hover:bg-[#53fc18]/10 text-[10px] sm:text-xs h-7">
                    <a href={KICK_URL} target="_blank" rel="noopener noreferrer">
                      <KickIcon className="w-3 h-3 mr-1" />
                      Follow on Kick
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function LeaderboardTable({ leaderboardData }: { leaderboardData: LeaderboardPlayer[] }) {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase().trim();

  // Skip top 5 (shown in podium) unless searching
  const displayData = query
    ? leaderboardData.filter((p) => p.name.toLowerCase().includes(query))
    : leaderboardData.slice(5, 15);

  const rowAccent = (rank: number) => {
    if (rank === 1) return { bg: "bg-gradient-to-r from-[#fdba74]/10 via-[#fdba74]/5 to-transparent", wager: "text-[#fdba74]", hover: "hover:from-[#fdba74]/15 hover:via-[#fdba74]/8 hover:to-transparent" };
    if (rank === 2) return { bg: "bg-gradient-to-r from-[#c0c0c0]/10 via-[#c0c0c0]/5 to-transparent", wager: "text-[#c0c0c0]", hover: "hover:from-[#c0c0c0]/15 hover:via-[#c0c0c0]/8 hover:to-transparent" };
    if (rank === 3) return { bg: "bg-gradient-to-r from-[#cd7f32]/10 via-[#cd7f32]/5 to-transparent", wager: "text-[#cd7f32]", hover: "hover:from-[#cd7f32]/15 hover:via-[#cd7f32]/8 hover:to-transparent" };
    if (rank === 4) return { bg: "bg-gradient-to-r from-[#b07aff]/8 via-[#b07aff]/4 to-transparent", wager: "text-[#b07aff]", hover: "hover:from-[#b07aff]/12 hover:via-[#b07aff]/6 hover:to-transparent" };
    if (rank === 5) return { bg: "bg-gradient-to-r from-[#f472b6]/8 via-[#f472b6]/4 to-transparent", wager: "text-[#f472b6]", hover: "hover:from-[#f472b6]/12 hover:via-[#f472b6]/6 hover:to-transparent" };
    return { bg: "", wager: "text-white/90", hover: "hover:bg-[#c084fc]/[0.05]" };
  };


  return (
    <>
      <div className="mb-4 max-w-xs mx-auto relative px-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9487aa]" />
        <Input
          placeholder="Search your name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl bg-[#2a2438]/60 backdrop-blur-xl border-[#c084fc]/10 text-sm text-white placeholder:text-[#6b5f7e] focus-visible:ring-2 focus-visible:ring-[#f472b6]/25 focus-visible:border-[#c084fc]/30 transition-shadow"
        />
      </div>

      <motion.div
        key={query || "default"}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <Card className="bg-[#2a2438]/60 backdrop-blur-xl border-[#c084fc]/12 rounded-2xl overflow-hidden relative shadow-[0_4px_40px_rgba(192,132,252,0.06),0_8px_80px_rgba(192,132,252,0.03),inset_0_1px_1px_rgba(255,255,255,0.04)] max-w-2xl mx-auto">
          <div className="grid grid-cols-[1fr_auto] px-4 sm:px-5 py-3 text-[#9487aa] text-xs sm:text-sm font-medium">
            <span>Player</span>
            <span>Wagered</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#c084fc]/30 to-transparent" />

          <div className="divide-y divide-[#c084fc]/[0.06]">
            {displayData.length === 0 ? (
              <div className="text-center text-sm text-[#6b5f7e] py-8">
                No players found for &ldquo;{search}&rdquo;
              </div>
            ) : (
              displayData.map((player) => {
                const accent = rowAccent(player.rank);
                return (
                  <motion.div
                    key={player.rank}
                    variants={staggerItem}
                    className={`grid grid-cols-[1fr_auto] items-center px-4 sm:px-5 py-2.5 sm:py-3 transition-all duration-200 ${accent.bg} ${accent.hover}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border text-[11px] sm:text-xs font-bold"
                        style={{
                          background: `color-mix(in srgb, ${player.avatar} 18%, transparent)`,
                          borderColor: `color-mix(in srgb, ${player.avatar} 30%, transparent)`,
                          color: player.avatar,
                        }}
                      >
                        {player.rank}
                      </div>
                      <span className={`font-semibold text-xs sm:text-sm truncate ${player.rank <= 3 ? "text-white" : "text-[#f0eaf8]/80"}`}>
                        {player.name}
                      </span>
                    </div>
                    <span className={`font-bold text-xs sm:text-sm tabular-nums ${accent.wager}`}>
                      {player.wager}
                    </span>
                  </motion.div>
                );
              })
            )}
          </div>

          {!query && leaderboardData.length > 13 && (
            <div className="text-center py-2.5 text-[10px] sm:text-xs text-[#6b5f7e] border-t border-[#c084fc]/[0.06]">
              Search to find your rank
            </div>
          )}
        </Card>
      </motion.div>
    </>
  );
}

const socials = [
  {
    name: "Kick",
    icon: <KickIcon className="w-6 h-6" />,
    iconSmall: <KickIcon className="w-5 h-5" />,
    accent: "#53fc18",
    url: KICK_URL,
    intentUrl: "https://kick.com/shanrrr",
    handle: "@shanrrr",
    desc: "Watch live streams, earn rewards, and interact with Shanrrr in real time.",
    cta: "Follow on Kick",
  },
  {
    name: "Discord",
    icon: <DiscordIcon className="w-6 h-6" />,
    iconSmall: <DiscordIcon className="w-5 h-5" />,
    accent: "#5865F2",
    url: DISCORD_URL,
    intentUrl: DISCORD_URL,
    handle: "shanrrr's server",
    desc: "Join the community server for giveaways, game nights, and good vibes.",
    cta: "Join Server",
  },
  {
    name: "X",
    icon: <XIcon className="w-5 h-5" />,
    iconSmall: <XIcon className="w-4 h-4" />,
    accent: "#f0eaf8",
    url: TWITTER_URL,
    intentUrl: "https://twitter.com/intent/follow?screen_name=shanohni",
    handle: "@shanohni",
    desc: "Stay up to date with announcements, clips, and hot takes.",
    cta: "Follow on X",
  },
];

function SocialsSection() {
  const [open, setOpen] = useState<string | null>(null);
  const activeSocial = socials.find((s) => s.name === open);

  return (
    <section id="socials" className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial="hidden" whileInView="visible" viewport={{ once: false }}
          variants={bounceIn}
        >
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text-full inline-block">Join the Community</h2>
          <p className="text-sm text-muted-foreground mt-2">Follow along everywhere</p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2"
          initial="hidden" whileInView="visible" viewport={{ once: false }}
          variants={staggerContainer}
        >
          {socials.map(({ name, iconSmall, accent }) => (
            <motion.button
              key={name}
              variants={staggerItem}
              onClick={() => setOpen(name)}
              className="group w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{
                background: `color-mix(in srgb, ${accent} 8%, transparent)`,
                borderColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
                color: accent,
              }}
              whileHover={{ boxShadow: `0 0 20px ${accent}30` }}
              title={name}
            >
              {iconSmall}
            </motion.button>
          ))}
        </motion.div>

        <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
          {activeSocial && (
            <DialogContent className="bg-[#1a1625]/95 backdrop-blur-2xl border-[#c084fc]/12 max-w-[calc(100vw-2rem)] sm:max-w-sm mx-auto">
              <DialogHeader>
                <div className="flex flex-col items-center gap-4 pt-2">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border"
                    style={{
                      background: `color-mix(in srgb, ${activeSocial.accent} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${activeSocial.accent} 25%, transparent)`,
                      color: activeSocial.accent,
                    }}
                  >
                    {activeSocial.icon}
                  </div>
                  <div className="text-center">
                    <DialogTitle className="text-white text-lg">{activeSocial.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">{activeSocial.handle}</p>
                  </div>
                </div>
              </DialogHeader>
              <p className="text-sm text-[#9487aa] text-center mt-2 leading-relaxed">
                {activeSocial.desc}
              </p>
              <a
                href={activeSocial.intentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-sm transition-all duration-200 hover:brightness-110"
                style={{
                  background: activeSocial.accent,
                  color: activeSocial.accent === "#f0eaf8" ? "#0b0e14" : "#fff",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                {activeSocial.cta}
              </a>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}

export default function Home() {
  const kickStatus = useKickStatus();
  const { data: datdropData, loading: lbLoading } = useDatDropLeaderboard();
  const [activeSite, setActiveSite] = useState<CasinoSite>("DatDrop");

  const leaderboardData = activeSite === "DatDrop" ? datdropData : placeholderData[activeSite];
  const isLoading = activeSite === "DatDrop" && lbLoading;

  return (
    <main className="min-h-screen relative z-10">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0b0e14]/70 border-b border-[#c084fc]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="text-base sm:text-lg font-bold gradient-text tracking-tight flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#f472b6] fill-[#f472b6]" />
            shanrrr
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <a href="#leaderboard" className="text-sm text-muted-foreground hover:text-white transition-colors hidden sm:block font-medium">Leaderboard</a>
            <a href="#stream" className="text-sm text-muted-foreground hover:text-white transition-colors hidden sm:block font-medium">Watch</a>
            <Button variant="outline" size="sm" asChild className="border-[#53fc18]/20 text-[#53fc18] hover:bg-[#53fc18]/10 hover:text-[#53fc18]">
              <a href={KICK_URL} target="_blank" rel="noopener noreferrer">
                <KickIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Live</span>
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden pt-14 sm:pt-16">

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-8xl md:text-9xl font-black gradient-text-full leading-tight tracking-tight lowercase drop-shadow-[0_0_40px_rgba(192,132,252,0.35)] [filter:drop-shadow(0_0_80px_rgba(255,80,180,0.2))]"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            shanrrr
          </motion.h1>

          <motion.p
            className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-2"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Earn points, climb the leaderboard, and compete for rewards.
          </motion.p>

        </div>

        <motion.a
          href={kickStatus.is_live ? "#stream" : "#leaderboard"}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground hover:text-white transition-colors" />
        </motion.a>
      </section>

      {/* When live: Stream first, Leaderboard second. When offline: Leaderboard first, Stream second. */}
      {kickStatus.is_live && <StreamSection kickStatus={kickStatus} />}

      {/* Leaderboard Section */}
      <section id="leaderboard" className={kickStatus.is_live ? "pt-10 sm:pt-16 pb-10 px-4 sm:px-6 relative" : "pt-32 sm:pt-60 pb-10 px-4 sm:px-6 relative"}>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-10"
            initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-100px" }}
            variants={bounceIn}
          >
            <motion.div
              className="inline-flex items-center gap-2 text-[#c084fc] mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Trophy className="w-5 h-5" />
              <p className="text-sm uppercase tracking-widest font-semibold">Leaderboard</p>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-4xl font-bold text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            >Top Players</motion.h2>
          </motion.div>

          {/* Casino Site Tabs */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-[#231e30]/50 backdrop-blur-lg border border-[#c084fc]/10 rounded-lg p-1 gap-1">
              {casinoSites.map((site) => (
                <button
                  key={site}
                  onClick={() => setActiveSite(site)}
                  className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeSite === site
                      ? "bg-gradient-to-r from-[#c084fc] to-[#f472b6] text-white shadow-[0_2px_12px_rgba(192,132,252,0.3)]"
                      : "text-[#9487aa] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {site}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly + Countdown */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-10">
            <Badge className="bg-gradient-to-r from-[#c084fc] to-[#f472b6] text-white border-0 px-4 py-1.5 text-sm font-semibold shadow-[0_2px_16px_rgba(192,132,252,0.25)]">
              Monthly
            </Badge>
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-[#9487aa]" />
              <span className="text-[#9487aa]">Ends in</span>
              <CountdownTimer />
            </div>
          </div>

          {/* Top 3 Podium */}
          {leaderboardData.length >= 3 && (
            <motion.div
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 items-end"
              initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }}
              variants={staggerContainer}
            >
              <PodiumCard player={leaderboardData[1]} rank={2} className="order-1 pt-10 sm:pt-12" />
              <PodiumCard player={leaderboardData[0]} rank={1} className="order-first sm:order-2 pt-0" />
              <PodiumCard player={leaderboardData[2]} rank={3} className="order-3 pt-16 sm:pt-20" />
            </motion.div>
          )}

          {/* 4th & 5th Place */}
          {leaderboardData.length >= 5 && (
            <motion.div
              className="grid grid-cols-2 gap-2 sm:gap-4 mb-8 sm:mb-10 max-w-md mx-auto"
              initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }}
              variants={staggerContainer}
            >
              <PodiumCard player={leaderboardData[3]} rank={4} />
              <PodiumCard player={leaderboardData[4]} rank={5} />
            </motion.div>
          )}

          {/* Search + Leaderboard Table */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-2 text-[#9487aa] text-sm">
                <div className="w-4 h-4 border-2 border-[#c084fc]/30 border-t-[#c084fc] rounded-full animate-spin" />
                Loading leaderboard...
              </div>
            </div>
          ) : (
            <LeaderboardTable leaderboardData={leaderboardData} />
          )}
        </div>
      </section>

      {/* Live Stream Section — below leaderboard when offline */}
      {!kickStatus.is_live && <StreamSection kickStatus={kickStatus} />}

      {/* Socials Section */}
      <SocialsSection />

      {/* Giveaway Ticker — fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0e14]/85 backdrop-blur-xl border-t border-[#c084fc]/8 overflow-hidden h-10">
        <div className="ticker-track h-full items-center">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex items-center gap-8 shrink-0 px-4">
              {[
                { winner: "xStarDust", prize: "$500 Gamba Credit", time: "2h ago" },
                { winner: "CozyPanda99", prize: "DatDrop Case", time: "5h ago" },
                { winner: "PixelQueen", prize: "$250 SkinWaste", time: "8h ago" },
                { winner: "LuckyClover", prize: "$100 Gamba Credit", time: "12h ago" },
                { winner: "MoonBeam", prize: "Mystery Skin Box", time: "1d ago" },
                { winner: "BubbleTea", prize: "$300 DatDrop", time: "1d ago" },
                { winner: "SparkleKid", prize: "$150 Gamba Credit", time: "2d ago" },
                { winner: "CloudNine", prize: "AWP Dragon Lore", time: "2d ago" },
              ].map(({ winner, prize, time }, i) => (
                <div key={`${copy}-${i}`} className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0">
                  <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f472b6] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white">{winner}</span>
                  <span className="text-[10px] sm:text-xs text-[#9487aa]">won</span>
                  <span className="text-xs sm:text-sm font-medium text-[#fdba74]">{prize}</span>
                  <span className="text-[10px] sm:text-xs text-[#6b5f7e]">{time}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#c084fc]/8 py-6 sm:py-8 pb-14 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <span className="text-sm text-[#6b5f7e] flex items-center gap-1">
            &copy; {new Date().getFullYear()} shanrrr
            <Heart className="w-3 h-3 text-[#f472b6] fill-[#f472b6]" />
          </span>
          <div className="flex items-center gap-3">
            <a href={KICK_URL} target="_blank" rel="noopener noreferrer" className="text-[#6b5f7e] hover:text-[#53fc18] transition-colors"><KickIcon className="w-4 h-4" /></a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-[#6b5f7e] hover:text-[#5865F2] transition-colors"><DiscordIcon className="w-4 h-4" /></a>
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-[#6b5f7e] hover:text-white transition-colors"><XIcon className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
