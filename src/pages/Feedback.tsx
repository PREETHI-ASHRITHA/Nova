import React from "react";

export default function Feedback() {
  return (
    <form style={{ maxWidth: 470, margin: '4rem auto', background:'var(--card-glass)', borderRadius:'1.2rem', padding:'2.2rem 1.6rem', boxShadow:'0 2px 30px #43e7ea22',animation:'fadeInScaleUp .6s'}}>
      <h2 style={{color:'var(--accent2)',fontWeight:700,marginBottom:'1.1em'}}>Feedback</h2>
      <textarea placeholder="Your feedback or ideas..." rows={5} style={{width:'100%',padding:'1em',borderRadius:'0.95em',marginBottom:18,background:'rgba(52,56,100,.28)',color:'var(--text-main)',border:'none',fontSize:'1.04em',outline:'none'}}/>
      <input type="email" placeholder="Your email (optional)" style={{width:'100%',padding:'.85em 1em',borderRadius:'.95em',marginBottom:'2em',background:'rgba(52,56,100,.28)',color:'var(--accent)',border:'none',fontSize:'1.04em',outline:'none'}}/>
      <button type="button" style={{background:'linear-gradient(89deg,var(--accent) 43%,var(--accent2) 114%)',color:'#191a23',fontWeight:700,border:'none',borderRadius:'1.09em',padding:'0.75em 1.9em',fontSize:'1.05em',cursor:'pointer',boxShadow:'0 2px 9px #43e7ea17'}}>Send</button>
      <div style={{marginTop:'1.3em',color:'var(--text-secondary)',fontSize:'.99em'}}>Thank you for helping nova design grow and improve! 💜</div>
    </form>
  );
}
