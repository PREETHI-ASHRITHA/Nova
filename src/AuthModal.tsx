import React, { useState } from "react";
import { useAuth } from "./AuthContext";

function GlassModal({ open, onClose, children }) {
  return open ? (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass-modal" onClick={e => e.stopPropagation()}>{children}</div>
      <style>{`
        .modal-overlay {
          position: fixed; left:0; top:0; width:100vw; height:100vh; z-index:50;
          background: rgba(17,19,30,.65);
          display: flex; align-items: center; justify-content: center;
          animation: fadeinbg .26s;
        }
        @keyframes fadeinbg { from{opacity:0} to{opacity:1} }
        .glass-modal {
          min-width: 337px; max-width: 97vw;
          background: var(--card-glass);
          border: 1.5px solid #5a63df38;
          border-radius: 1.4rem;
          box-shadow: 0 16px 54px #43e7ea27;
          padding: 2.5rem 2rem 1.2rem 2rem;
          position: relative;
          animation: modal-pop-in .38s cubic-bezier(.63,.2,.3,1.02);
          backdrop-filter: blur(var(--blur));
        }
        @keyframes modal-pop-in {0% {transform: scale(.87); opacity: 0;} 100%{transform:none;opacity:1}}
      `}</style>
    </div>
  ) : null;
}

export default function AuthModal({ open, mode, onClose }) {
  const { login, signup, forgotPassword } = useAuth();
  const [step, setStep] = useState(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function resetForms() {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setLoading(false);
  }

  function closeModal() {
    resetForms();
    onClose && onClose();
    setStep(mode);
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return setError("Please enter email and password.");
    setLoading(true);
    const res = login(email, password);
    setLoading(false);
    if (!res.success) return setError(res.error);
    closeModal();
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!name || !email || !password) return setError("Fill all fields.");
    setLoading(true);
    const res = signup(name, email, password);
    setLoading(false);
    if (!res.success) return setError(res.error);
    setSuccess("Welcome! Account created.");
    setTimeout(closeModal, 800);
  }

  async function handleForgot(e) {
    e.preventDefault();
    if (!email) return setError("Enter your email address.");
    setLoading(true);
    await forgotPassword(email); // Will trigger EmailJS in future
    setLoading(false);
    setSuccess("Reset instructions sent!");
    setTimeout(closeModal, 900);
  }

  return (
    <GlassModal open={open} onClose={closeModal}>
      {step === "login" && (
        <form onSubmit={handleLogin} autoComplete="on">
          <h2 style={{marginBottom:"1.2em", color:"var(--accent2)"}}>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} autoFocus autoComplete="email"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/>
          {error && <div style={{color:"#ff4e6a",marginTop:"0.6em"}}>{error}</div>}
          {success && <div style={{color:"var(--accent2)",marginTop:"0.65em"}}>{success}</div>}
          <button type="submit" disabled={loading} style={{marginTop:"1.25em"}}>{loading ? "..." : "Login"}</button>
          <p style={{marginTop:"0.95em",color:"var(--text-secondary)",fontSize:"0.96em"}}>
            No account? <span className="modal-link" onClick={()=>{resetForms();setStep("signup")}}>Sign up</span> <br/>
            <span className="modal-link" onClick={()=>{resetForms();setStep("forgot")}}>Forgot password?</span>
          </p>
        </form>
      )}
      {step === "signup" && (
        <form onSubmit={handleSignup} autoComplete="on">
          <h2 style={{marginBottom:"1.2em",color:"var(--accent)"}}>Sign Up</h2>
          <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} autoFocus autoComplete="username"/>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="new-password"/>
          {error && <div style={{color:"#ff4e6a",marginTop:"0.6em"}}>{error}</div>}
          {success && <div style={{color:"var(--accent2)",marginTop:"0.65em"}}>{success}</div>}
          <button type="submit" disabled={loading} style={{marginTop:"1.25em"}}>{loading ? "..." : "Sign Up"}</button>
          <p style={{marginTop:"0.95em",color:"var(--text-secondary)",fontSize:"0.96em"}}>
            Already a member? <span className="modal-link" onClick={()=>{resetForms();setStep("login")}}>Login</span>
          </p>
        </form>
      )}
      {step === "forgot" && (
        <form onSubmit={handleForgot} autoComplete="on">
          <h2 style={{marginBottom:"1.2em",color:"var(--accent)"}}>Forgot Password?</h2>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} autoFocus autoComplete="email"/>
          {error && <div style={{color:"#ff4e6a",marginTop:"0.6em"}}>{error}</div>}
          {success && <div style={{color:"var(--accent2)",marginTop:"0.65em"}}>{success}</div>}
          <button type="submit" disabled={loading} style={{marginTop:"1.15em"}}>{loading ? "..." : "Send Reset Email"}</button>
          <p style={{marginTop:"1.05em",color:"var(--text-secondary)",fontSize:"0.95em"}}>
            Back to <span className="modal-link" onClick={()=>{resetForms();setStep("login")}}>Login</span>
          </p>
        </form>
      )}
      <style>{`
        .glass-modal form {
          display:flex; flex-direction:column;
        }
        .glass-modal input {
          margin-bottom: .95em; border: none; outline: none;
          border-radius: 0.8em;
          background: rgba(52,56,100,.28);
          color: var(--text-main);
          padding: 0.9em 1.2em; font-size: 1.06em;
          transition: box-shadow .26s;
          box-shadow: 0 1.5px 8px #43e7ea12;
        }
        .glass-modal input:focus {
          box-shadow: 0 2.5px 15px #ab8fff44;
          background: rgba(64,70,123,0.38);
        }
        .glass-modal button {
          background: linear-gradient(89deg,var(--accent) 49%,var(--accent2) 121%);
          color: #191a23; font-weight: 700; border:none; border-radius: 1.09em;
          padding: 0.64em 1.55em; font-size: 1.05em;
          cursor: pointer; margin-top: 0.7em;
          transition: filter .16s;
          box-shadow: 0 2px 9px #43e7ea17;
        }
        .glass-modal button:active {
          filter: brightness(0.98) saturate(1.24);
        }
        .modal-link {
          color: var(--accent2); cursor: pointer;
          margin-left: .3em;
          text-shadow: 0 1px 8px #43e7ea2e;
        }
        .modal-link:hover { text-decoration:underline; filter:brightness(1.22)}
      `}</style>
    </GlassModal>
  );
}
