import React from "react";

export default function Search() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '45vh' }}>
      <div style={{fontWeight:700, fontSize:'1.3rem',color:'var(--accent2)'}}>🔍 Search</div>
      <input style={{marginTop:23,padding:'1rem 1.45rem',width:280,maxWidth:'82vw',background:'var(--card-glass)',border:'none',borderRadius:'1em',fontSize:'1.05em',color:'var(--accent2)',boxShadow:'0 2px 16px #43e7ea22'}} placeholder="Type to search designs, users, tags..." />
      <div style={{marginTop:18,color:'var(--text-secondary)'}}>Coming soon: Search across designs and designers!</div>
    </div>
  );
}
