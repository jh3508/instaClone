import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";

const App = () => {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
      </Routes>
    </PageLayout >
  );
};

export default App;
