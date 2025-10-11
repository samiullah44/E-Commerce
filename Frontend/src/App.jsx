import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import AuthFlipCard from "./components/AuthFlipCard";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthFlipCard />} />
          <Route
            path="/profile"
            element={
              <div className="h-[1200px]  pt-20  bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
                Profile Page
              </div>
            }
          />
          <Route
            path="/collections"
            element={
              <div className="min-h-screen pt-20  bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
                Collections Page
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="min-h-screen pt-20  bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
                Contact Page
              </div>
            }
          />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f2937",
            color: "white",
            border: "1px solid #374151",
          },
        }}
      />
    </>
  );
}

export default App;
