import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const MODES = { login: "login", register: "register", forgot: "forgot", session: "session" };

function AuthView() {
  const { isAuthenticated } = useAuth();
  const [mode, setMode] = useState(MODES.login);

  if (isAuthenticated) {
    return <Navigate to="/ventas" replace />;
  }

  return (
        < >
          {mode === MODES.login && (
            <LoginForm
              onSwitchToRegister={() => setMode(MODES.register)}
              onSwitchToForgot={() => setMode(MODES.forgot)}
            />
          )}
          {mode === MODES.register && (
            <RegisterForm onSwitchToLogin={() => setMode(MODES.login)} />
          )}
          {mode === MODES.forgot && (
            <ForgotPasswordForm onBackToLogin={() => setMode(MODES.login)} />
          )}
        </>
      
  );
}

export default AuthView;
