import React from "react";

export default function Explore() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', color: 'var(--accent2)', fontWeight: 700, fontSize: '1.58rem', letterSpacing: '.01em', textShadow: '0 2px 20px #43e7ea55'
    }}>
      <div className="fade-in">✨ Explore</div>
      <div style={{fontSize:'1.03rem',color:'var(--accent)',marginTop:18,opacity:0.77}}>A new world of trending designs is coming soon!</div>
    </div>
  );
}
