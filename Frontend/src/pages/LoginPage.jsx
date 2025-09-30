import React from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div>
      <div className="text-center text-base-content/70">
        Already have an account?{" "}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
