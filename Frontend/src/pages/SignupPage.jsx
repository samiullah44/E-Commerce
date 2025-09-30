import React from "react";

const SignupPage = () => {
  const handleSubmit = (e) => {
    e.prevetDefault();
  };
  return (
    <div className="h-full py-3 flex justify-center items-center gap-3">
      <div className="w-full max-w-lg">
        <div className="p-3 text-center">
          <h1>Create Account</h1>
          <p>Join the future of Online Shopping</p>
        </div>
        <div className="flex flex-col gap-4">
          <button className="btn flex-1 text-xl p-1 rounded-2xl bg-gradient-to-bl from-purple-600 to-rose-400">
            Google
          </button>
          <button className="btn flex-1 text-xl p-1 rounded-2xl bg-gradient-to-bl from-cyan-100 to-amber-800">
            OTP
          </button>
        </div>
        <div className="divider text-sm text-base-content/70">or</div>
        <form onSubmit={handleSubmit} className="space-y-4"></form>
      </div>
    </div>
  );
};

export default SignupPage;
