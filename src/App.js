
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoadingSpinner from './shared/UI/LoadingSpinner';
import MainNavigation from './shared/navigation/MainNavigation'
import { LanguageProvider } from "./shared/context/Language";
import Footer from './shared/footer/Footer';
import CallBtn from './shared/UI/CallBtn';
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Main = React.lazy(() => import("./main/Main.js"));

function App() {
  const { token, login, logout, userId } = useAuth();

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<Main />} />
        <Route path="*" element={<Main />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<Main />} />
        <Route path="*" element={<Main />} />
      </React.Fragment>
    );
  }
  return (
    <div className="root-wrapper">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout
        }}
      >


        <LanguageProvider>
          <BrowserRouter>

            <Suspense
              fallback={
                <div className='suspense_container'>
                  <LoadingSpinner />
                </div>
              }
            >
              <MainNavigation />
              <Routes>{routes}</Routes>

              {/* <Footer /> */}
              <CallBtn />
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
