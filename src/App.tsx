import React, { useState } from "react";
import "./index.css";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import About from "./pages/About";
import Feedback from "./pages/Feedback";

function Avatar({ name }) {
  return (
    <span style={{
      display: "inline-block",
      width: 49,
      height: 49,
      background: "linear-gradient(145deg,#43e7ea,#ab8fff)",
      borderRadius: "50%",
      textAlign: "center",
      color: "#191a23",
      fontWeight: 800,
      fontSize: 24,
      border: "2px solid var(--accent2)",
      boxShadow: "0 1px 8px #43e7eaa5",
      lineHeight: "49px",
    }}>
      {name ? name.charAt(0).toUpperCase() : "?"}
    </span>
  );
}

const sidebarLinks = [
  { name: "Home", icon: "🏠", path: "/" },
  { name: "Explore", icon: "✨", path: "/explore" },
  { name: "Search", icon: "🔍", path: "/search" },
  { name: "Login", icon: "🔑", path: "#login-modal" },
  { name: "Join", icon: "➕", path: "#join-modal" },
  { name: "About", icon: "ℹ️", path: "/about" },
  { name: "Feedback", icon: "💬", path: "/feedback" },
];

const topTabs = ["Featured", "Following", "Trendy"];

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Tarik Eamin",
      handle: "@eaminux",
    },
    title: "A bold, animated and engaging UI/UX concept!",
    description:
      "Here's a demo with new dark mode, gradients, and lively glassmorphism animation.",
    tags: ["uxui", "webdesign", "custom"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
    views: 91,
    upvotes: 13,
  },
  {
    id: 2,
    author: {
      name: "Neon Nova",
      handle: "@neon.nova",
    },
    title: "Glass & Glow Dashboard Design!",
    description: "Vivid shadows, glass blur effects and neon highlights—try upvoting!",
    tags: ["dashboard", "glass", "animated"],
    img: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=700&q=80",
    views: 65,
    upvotes: 8,
  },
];

function getInitialUpvotes() {
  try {
    return JSON.parse(localStorage.getItem("tdesign-upvotes") || "{}") || {};
  } catch {
    return {};
  }
}

function Sidebar({ onAuth, user, onLogout, active = "Home" }) {
  const location = useLocation();
  return (
    <aside className="sidebar fade-in">
      <div>
        <div className="logo-area">
          <span className="logo-dot"></span> nova<span style={{ color: "var(--accent)" }}>design</span>
        </div>
        <nav>
          {sidebarLinks.map((item) => {
            if (item.name === "Login" && !user)
              return (
                <a
                  href="#login"
                  key={item.name}
                  onClick={e => {
                    e.preventDefault();
                    onAuth("login");
                  }}
                >
                  <span>{item.icon}</span>
                  <span style={{ fontSize: "1rem" }}>Login</span>
                </a>
              );
            if (item.name === "Join" && !user)
              return (
                <a
                  href="#join"
                  key={item.name}
                  onClick={e => {
                    e.preventDefault();
                    onAuth("signup");
                  }}
                >
                  <span>{item.icon}</span>
                  <span style={{ fontSize: "1rem" }}>Join</span>
                </a>
              );
            if (["Login", "Join"].includes(item.name) && user) return null;
            if (item.name === "Home" && location.pathname === "/") {
              return (
                <Link key={item.name} to={item.path} className="active">
                  <span>{item.icon}</span>
                  <span style={{ fontSize: "1rem" }}>{item.name}</span>
                </Link>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.path}
                className={location.pathname === item.path ? "active" : undefined}
              >
                <span>{item.icon}</span>
                <span style={{ fontSize: "1rem" }}>{item.name}</span>
              </Link>
            );
          })}
          {user && (
            <>
              <a href="#profile" className="active">
                <span>👤</span> <span style={{ fontSize: "1rem" }}>{user.name}</span>
              </a>
              <a
                href="#logout"
                onClick={e => {
                  e.preventDefault();
                  onLogout();
                }}
              >
                <span>⏻</span> <span style={{ fontSize: "1rem" }}>Logout</span>
              </a>
            </>
          )}
        </nav>
      </div>
      <footer style={{ padding: "2.3rem 0 1.5rem 2rem", color: "var(--text-secondary)", fontSize: "1rem" }}>
        <Link to="/about" style={{ color: "var(--accent2)", marginRight: "1.2rem" }}>About</Link>
        <Link to="/feedback" style={{ color: "var(--accent)" }}>Feedback</Link>
      </footer>
    </aside>
  );
}

function Topbar({ tab, setTab }) {
  return (
    <div className="topbar fade-in">
      {topTabs.map((t) => (
        <button
          className={"tab" + (tab === t ? " active" : "")}
          key={t}
          onClick={() => setTab(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function PostCard({ post, onUpvote }) {
  const { user } = useAuth();
  const [clicked, setClicked] = useState(false);

  const handleUpvote = () => {
    if (user && !post.hasUpvoted) {
      setClicked(true);
      setTimeout(() => setClicked(false), 500);
      onUpvote(post.id);
    }
  };

  return (
    <div className="post-card fade-in">
      <div className="author">
        <Avatar name={post.author.name} />
        <div>
          <div className="username">{post.author.name}</div>
          <div className="handle">{post.author.handle}</div>
        </div>
      </div>
      <div style={{ fontWeight: 600, fontSize: "1.15rem", lineHeight: 1.4 }}>
        {post.title}
      </div>
      <div style={{ color: "var(--text-secondary)" }}>{post.description}</div>
      <img
        loading="lazy"
        className="main-img"
        src={post.img}
        alt={post.title}
      />
      <div style={{ marginTop: ".25rem" }}>
        {post.tags.map((t) => (
          <span
            key={t}
            style={{
              background:
                "linear-gradient(89deg,var(--accent),var(--accent2))",
              color: "#181a27",
              display: "inline-block",
              padding: ".17em .8em",
              borderRadius: "0.7em",
              fontSize: ".9em",
              fontWeight: 700,
              marginRight: ".53em",
            }}
          >
            #{t}
          </span>
        ))}
      </div>
      <div className="post-actions">
        <button
          onClick={handleUpvote}
          disabled={!user || post.hasUpvoted}
          className={clicked ? "upvote-animate" : ""}
          title={user ? (post.hasUpvoted ? "You upvoted" : "Upvote post") : "Login to upvote"}
        >▲ Upvote <span style={{ marginLeft: ".6em" }}>{post.upvotes}</span></button>
        <button disabled>💬 Comment</button>
        <button disabled>👁️ {post.views} Views</button>
      </div>
      <style>{`.upvote-animate{animation:pop-bounce .38s cubic-bezier(.7,.01,.18,1)}@keyframes pop-bounce{0%{transform:scale(1)}40%{transform:scale(1.2)}60%{transform:scale(.91)}100%{transform:scale(1)}}`}</style>
    </div>
  );
}

const hashtags = [
  "Logos", "Bento", "Saas", "Graphicdesign", "Widget", "Type", "Visualdesign", "Dashboard", "Stickers", "Seoagency", "Ai", "Onboarding", "Darktheme", "Grabui", "Social"
];

// Use Unsplash stable face avatars and fallback SVG initials
const topPeople = [
  {
    id: 1,
    name: "Tarik Eamin",
    avatar: "https://source.unsplash.com/60x60/?face&sig=11",
    rank: 1
  }
];

const newUsers = [
  { name: "Dharmik", avatar: "https://source.unsplash.com/60x60/?face&sig=12" },
  { name: "Kenan", color: "#ffe6df" },
  { name: "Victoria Griffiths", avatar: "https://source.unsplash.com/60x60/?face&sig=14" },
  { name: "Hello world", color: "#c7efd1" },
  { name: "miftahudin", avatar: "https://source.unsplash.com/60x60/?face&sig=17" }
];

function Rightbar() {
  const fontBase = '0.97rem';
  return (
    <aside className="rightbar2 v2">
      <div style={{ marginBottom: 25 }}>
        <div className="rb-title" style={{ fontSize: '1.09em', marginBottom: 7 }}>Top people this week</div>
        {topPeople.map(person => (
          <div key={person.id} style={{ display: "flex", alignItems: "center", marginTop: 15, marginBottom: 6, height: 39 }}>
            {person.avatar ? (
              <img src={person.avatar} alt={person.name} style={{ width: 31, height: 31, borderRadius: "50%", objectFit: "cover", marginRight: 9, border: '1.5px solid #19191b', background:'#161618' }} onError={e=>{e.target.style.display='none'}}/>
            ) : (
              <span style={{ width:31, height:31, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', marginRight:9, fontWeight:700, color:'#181818', background:'#eee' }}>{person.name[0]}</span>
            )}
            <span style={{ fontWeight: 500, fontSize: fontBase, color: "#fff", lineHeight:"1" }}>{person.name}</span>
            <span style={{ color: '#86868f', fontSize: fontBase, marginLeft: 'auto', fontWeight: 700, paddingRight:2 }}>#1</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 28 }}>
        <div className="rb-title" style={{ fontSize: '1.09em', marginBottom: 6 }}>Popular hashtags</div>
        <div className='rb-chipgrid'>
          {hashtags.map(tag => (
            <span key={tag} className='rb-chip'>{tag}</span>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 7 }}>
        <div className="rb-title" style={{ fontSize: '1.09em', marginBottom: 7 }}>New to todays.design</div>
        <div>
          {newUsers.map(u => (
            <div key={u.name} style={{ display: 'flex', alignItems: 'center', marginTop: 12, gap: 8, minHeight: 32 }}>
              {u.avatar ? (
                <img src={u.avatar} alt={u.name} style={{ width: 25, height: 25, borderRadius: '50%', objectFit: 'cover', marginRight: 7, border: '1.3px solid #20202b', background:'#161618' }} onError={e=>{e.target.style.display='none'}} />
              ) : (
                <span style={{ width:25, height:25, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', marginRight:7, fontWeight:700, color:'#181818', background:(u.color||'#e5e5e5') }}>{u.name[0]}</span>
              )}
              <span style={{ color:'#ededed', fontWeight:500, fontSize:fontBase, letterSpacing:0.04 }}>{u.name}</span>
              <span style={{ color:'#929293',fontWeight:900,fontSize:'1.03em', marginLeft:'auto', paddingRight:3 }}>{'>'}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .rightbar2.v2 {
          min-width: 232px; max-width: 289px; background: #101012; border-radius: 1.2rem 0 0 1.2rem;
          box-shadow: 0 6px 38px #0004; margin-left: 2rem; margin-top: 2rem; padding: 1.8rem 1.3rem 1rem 1.3rem;
          height: fit-content; position: sticky; top: 2.3rem;
        }
        .rb-title { font-weight:700; color:#ededed;margin-bottom:5px; }
        .rb-chipgrid { display: flex; flex-wrap: wrap; gap: 7px 8px; margin-top: 0; }
        .rb-chip {
          background: #18191b; color: #e9e9f1;
          font-weight: 450; padding: .27em 1em;
          border-radius: 1.28em; font-size: 0.87em; margin-bottom: 1px;
          letter-spacing: 0.01em;
        }
        @media (max-width:1100px) { .rightbar2{display:none;} }
      `}</style>
    </aside>
  );
}

function MainApp() {
  const [upvotesMap, setUpvotesMap] = useState(getInitialUpvotes());
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("Featured");
  const [modal, setModal] = useState(null);

  // Combine post upvotes with session/user upvote history
  const posts = mockPosts.map(p => {
    let newUpvotes = p.upvotes;
    let hasUpvoted = false;
    if (user && upvotesMap[user.email]) {
      const u = upvotesMap[user.email] || [];
      if (u.includes(p.id)) {
        hasUpvoted = true;
        newUpvotes = p.upvotes + 1;
      }
    }
    return { ...p, upvotes: newUpvotes, hasUpvoted };
  });

  const handleUpvote = (postId) => {
    if (!user) return;
    setUpvotesMap(prev => {
      const newMap = { ...prev };
      const up = new Set(newMap[user.email] || []);
      up.add(postId);
      newMap[user.email] = Array.from(up);
      localStorage.setItem("tdesign-upvotes", JSON.stringify(newMap));
      return newMap;
    });
  };

  const location = useLocation();

  return (
    <>
      <Sidebar
        onAuth={setModal}
        user={user}
        onLogout={logout}
        active={sidebarLinks.find(l => l.path === location.pathname)?.name || "Home"}
      />
      <main className="main-area">
        <section className="feed-section">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Topbar tab={tab} setTab={setTab} />
                  {posts.map((post) => (
                    <PostCard post={post} key={post.id} onUpvote={handleUpvote} />
                  ))}
                </>
              }
            />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </section>
        <Rightbar />
      </main>
      <AuthModal open={!!modal} mode={modal} onClose={() => setModal(null)} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-shell">
          <MainApp />
        </div>
      </Router>
    </AuthProvider>
  );
}
