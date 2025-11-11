import React, { useMemo, useState } from "react";
import "./index.css";

/*
  Simple login page (frontend only)
  - Email  exist in a small in-memory list
  - Password rules: 8–16 chars, must include upper, lower, number, symbol
  - On success: hide form, show welcome + logout
*/

// Small input wrapper so markup stays tidy
function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className={`input ${error ? "input-error" : ""}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-err`}
      />
      <div id={`${id}-err`} className="err" aria-live="polite">
        {error || ""}
      </div>
    </div>
  );
}

// Password helpers: keep checks central and readable
function usePasswordRules() {
  // compile once
  const rx = useMemo(() => ({
    upper: /[A-Z]/,
    lower: /[a-z]/,
    digit: /\d/,
    sym: /[^A-Za-z0-9]/,
  }), []);

  const isValid = (pw) => {
    if (!pw || pw.length < 8 || pw.length > 16) return false;
    return rx.upper.test(pw) && rx.lower.test(pw) && rx.digit.test(pw) && rx.sym.test(pw);
  };

  // short message for what’s missing
  const explain = (pw) => {
    if (!pw) return "Password is required.";
    if (pw.length < 8 || pw.length > 16) return "Use 8–16 characters.";
    const miss = [];
    if (!rx.upper.test(pw)) miss.push("uppercase letter");
    if (!rx.lower.test(pw)) miss.push("lowercase letter");
    if (!rx.digit.test(pw)) miss.push("number");
    if (!rx.sym.test(pw))   miss.push("symbol");
    return miss.length ? `Add ${miss.join(", ")}.` : "";
  };

  return { isValid, explain };
}

export default function App() {
  // Hardcoded demo users. In a real app, this belongs on a server.
  const users = useMemo(() => ({
    "test@example.com": "Abcdef1!",
    "admin@solum.test": "Secure9#",
    "nia@elaria.io": "WaveX8$z",
  }), []);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
  const [emailErr, setEmailErr] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [authedEmail, setAuthedEmail] = useState("");

  const { isValid, explain } = usePasswordRules();

  // keep resets consistent
  const resetErrors = () => { setEmailErr(""); setPwErr(""); };

  // The password flow:
  // 1) email exists, 2) password strength first, 3) then exact match
  const onSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    const eVal = email.trim();
    const pVal = password;

    // email check
    if (!eVal) { setEmailErr("Email is required."); return; }
    if (!(eVal in users)) { setEmailErr("This email is not registered."); return; }

    // strength before checking whether it matches stored password
    if (!isValid(pVal)) { setPwErr(explain(pVal)); return; }

    // exact match
    if (users[eVal] !== pVal) { setPwErr("Incorrect password for this email."); return; }

    // success → switch view
    setAuthedEmail(eVal);
  };

  const onLogout = () => {
    setAuthedEmail("");
    setPassword("");
    resetErrors();
  };

  // Success view
  if (authedEmail) {
    return (
      <div className="page">
        <main className="card center">
          <h1 className="title">Welcome, {authedEmail}!</h1>
          <p className="muted">You are signed in. This is a front-end only demo.</p>
          <button className="btn" onClick={onLogout}>Logout</button>
        </main>
      </div>
    );
  }

  // Form view
  return (
    <div className="page">
      <main className="card" role="form" aria-labelledby="login-title">
        <h1 id="login-title" className="title">Sign in</h1>

        <form onSubmit={onSubmit} noValidate>
          <Field
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={emailErr}
            autoComplete="username"
          />

          <div className="field">
            <div className="row">
              <label className="label" htmlFor="password">Password</label>
              <a
                className="link"
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Forgot password?"
              >
                Forgot password?
              </a>
            </div>

            {/* separate wrapper so the toggle can sit inside the input area */}
            <div className="pwwrap">
              <input
                id="password"
                className={`input ${pwErr ? "input-error" : ""}`}
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                aria-invalid={Boolean(pwErr)}
                aria-describedby="password-err"
              />
              <button
                type="button"
                className="toggle"
                onClick={() => setShowPw(s => !s)}
                aria-pressed={showPw}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            {/* strength/mismatch messages */}
            <div id="password-err" className="err" aria-live="polite">
              {pwErr || ""}
            </div>

            {/* static hint */}
            <p className="hint">
              Password must be 8–16 characters and include an uppercase, lowercase, number, and symbol.
            </p>
          </div>

          <button className="btn" type="submit">Login</button>
          <p className="muted mt">Demo only. No data is sent anywhere.</p>
        </form>
      </main>
    </div>
  );
}
