import Link from "next/link";

const KICK_URL = "https://kick.com/shanrrr";
const DISCORD_URL = "#";
const TWITTER_URL = "#";
const INSTAGRAM_URL = "#";
const TIKTOK_URL = "#";

const schedule = [
  { day: "Monday", time: "7:00 PM - 11:00 PM", game: "Slots & Gaming" },
  { day: "Tuesday", time: "7:00 PM - 11:00 PM", game: "Variety" },
  { day: "Wednesday", time: "Off", game: "" },
  { day: "Thursday", time: "7:00 PM - 11:00 PM", game: "Slots & Gaming" },
  { day: "Friday", time: "8:00 PM - 12:00 AM", game: "Late Night Slots" },
  { day: "Saturday", time: "6:00 PM - 12:00 AM", game: "Weekend Vibes" },
  { day: "Sunday", time: "Off", game: "" },
];

function KickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M1.333 0h21.334C23.4 0 24 .6 24 1.333v21.334c0 .733-.6 1.333-1.333 1.333H1.333C.6 24 0 23.4 0 22.667V1.333C0 .6.6 0 1.333 0zm4 5.333h3.334v4.445L12.89 5.333h4.222l-5.333 5.334L17.11 18.667h-4.222l-3.555-5.334v5.334H5.333V5.333z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            Shanrrr
          </Link>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</a>
            <a href="#schedule" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Schedule</a>
            <a href="#socials" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Socials</a>
            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#53fc18]/10 text-[#53fc18] text-sm font-medium hover:bg-[#53fc18]/20 transition-colors"
            >
              <KickIcon />
              <span className="hidden sm:inline">Watch Live</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px] animate-pulse-glow animation-delay-200" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse-glow animation-delay-400" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/80 mb-6 font-medium">
              Live on Kick
            </p>
          </div>
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black gradient-text animate-fade-in-up animation-delay-200 leading-tight">
            Shanrrr
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/50 max-w-xl mx-auto animate-fade-in-up animation-delay-400">
            Gaming streamer bringing good vibes, big wins, and nonstop entertainment.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <KickIcon />
              Watch on Kick
            </a>
            <a
              href="#schedule"
              className="gradient-border-btn inline-flex items-center justify-center text-lg"
            >
              Stream Schedule
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-white/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/80 mb-4 font-medium">
              About
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Who is Shanrrr?
            </h2>
          </div>

          <div className="glow-card p-8 sm:p-12">
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Hey! I&apos;m <span className="text-white font-medium">Shanrrr</span> — a gaming streamer on Kick bringing you
                the best slots action, late night vibes, and a community that feels like home.
              </p>
              <p>
                Whether I&apos;m chasing big wins or just hanging out with chat, every stream is a good time.
                Come for the gameplay, stay for the energy.
              </p>
              <div className="flex flex-wrap gap-3 pt-4">
                {["Slots", "Gaming", "Good Vibes", "Community", "Late Night"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/80 mb-4 font-medium">
              Schedule
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Stream Schedule
            </h2>
            <p className="mt-4 text-white/40">
              Times shown in EST — follow on Kick for go-live notifications
            </p>
          </div>

          <div className="grid gap-3">
            {schedule.map(({ day, time, game }) => {
              const isOff = time === "Off";
              return (
                <div
                  key={day}
                  className={`glow-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isOff ? "opacity-40" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${isOff ? "bg-white/20" : "bg-[#53fc18]"}`} />
                    <span className="font-semibold text-white w-28">{day}</span>
                  </div>
                  <span className="text-white/60 sm:text-center flex-1">
                    {isOff ? "Day Off" : time}
                  </span>
                  <span className="text-purple-400/80 text-sm font-medium sm:w-40 sm:text-right">
                    {game}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Socials Section */}
      <section id="socials" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400/80 mb-4 font-medium">
              Connect
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
              Join the Community
            </h2>
            <p className="mt-4 text-white/40">
              Follow along and never miss a stream
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Kick", icon: <KickIcon />, url: KICK_URL, color: "group-hover:text-[#53fc18]", bg: "group-hover:bg-[#53fc18]/10", desc: "Watch live streams" },
              { name: "Discord", icon: <DiscordIcon />, url: DISCORD_URL, color: "group-hover:text-[#5865F2]", bg: "group-hover:bg-[#5865F2]/10", desc: "Join the server" },
              { name: "Twitter / X", icon: <TwitterIcon />, url: TWITTER_URL, color: "group-hover:text-white", bg: "group-hover:bg-white/10", desc: "Follow for updates" },
              { name: "Instagram", icon: <InstagramIcon />, url: INSTAGRAM_URL, color: "group-hover:text-[#E4405F]", bg: "group-hover:bg-[#E4405F]/10", desc: "Behind the scenes" },
              { name: "TikTok", icon: <TikTokIcon />, url: TIKTOK_URL, color: "group-hover:text-[#ff0050]", bg: "group-hover:bg-[#ff0050]/10", desc: "Clips & highlights" },
            ].map(({ name, icon, url, color, bg, desc }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glow-card p-6 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 ${bg} flex items-center justify-center text-white/60 ${color} transition-all`}>
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-white">{name}</p>
                  <p className="text-sm text-white/40">{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Shanrrr. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href={KICK_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
              <KickIcon />
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
              <DiscordIcon />
            </a>
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors">
              <TwitterIcon />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
