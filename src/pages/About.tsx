import React from "react";

export default function About() {
  return (
    <div style={{ maxWidth: 580, margin: '4.5rem auto', color: 'var(--accent2)', textAlign: 'center', fontSize: '1.15rem', lineHeight: 1.7,animation:'fadeInScaleUp .6s'}}>
      <h2 style={{color: 'var(--accent)', marginBottom: 22}}>About nova design</h2>
      <p>
        <b>nova design</b> is a social platform built for celebrating and discovering design—fresh, unique, and with a vibrant touch!<br/>
        Share your work, upvote, and explore creativity across the globe. Whether you’re a pro or just exploring, our dark neon-inspired space welcomes you.
      </p>
      <p style={{marginTop:22,color:'var(--text-secondary)'}}>Handcrafted with inspiration from the best design communities and a love for modern tech.</p>
    </div>
  );
}
