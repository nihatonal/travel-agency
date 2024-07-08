
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoadingSpinner from './shared/UI/LoadingSpinner';
import MainNavigation from './shared/navigation/MainNavigation'
import { LanguageProvider } from "./shared/context/Language";

import Footer from './shared/footer/Footer';
import Admin from './admin/Admin';
import AdminBar from './shared/navigation/AdminBar';
import Tourist from './tourist/Tourist';
import Tourists from './admin/components/Tourists';
import UpdateTourist from './admin/components/UpdateTourist';
import CreateTourist from './admin/components/CreateTourist';
import TouristDetails from './admin/components/TouristDetails';
import CallBtn from './shared/UI/CallBtn';
import CountryCard from './main/countries/CountryCard'
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { ShareContext } from './shared/context/share-context';
import { useShare } from './shared/hooks/share-hook';


const Main = React.lazy(() => import("./main/Main.js"));

function App() {
  const { token, login, logout, userId } = useAuth();
  const { setProfileImage, image, AdminURL, adminURL } = useShare();
  const pathname = window.location.pathname;

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/admin/touristlist" element={<Tourists />} />
        <Route exact path="/admin/addtourist" element={<CreateTourist />} />
        <Route exact path="/admin/touristlist/:temail" element={<TouristDetails />} />
        <Route exact path='/admin/tourists/:tid' element={<UpdateTourist />} />

        <Route exact path='/admin' element={<Admin />} />
        <Route path="*" element={<Main />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/country/:cid" element={<CountryCard />} />

        <Route exact path="/writecomment/:name/:location/:otel/:tid" element={<Tourist />} />
        <Route exact path='/admin' element={<Admin />} />
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

        <ShareContext.Provider value={{ setProfileImage: setProfileImage, image: image, AdminURL: AdminURL, adminURL: adminURL }}>
          <LanguageProvider>
            <BrowserRouter>
              <Suspense
                fallback={
                  <div className='suspense_container'>
                    <LoadingSpinner />
                  </div>
                }
              >
                {pathname !== "/" && <AdminBar />}
                {!token && <MainNavigation />}
                <Routes>{routes}</Routes>
                {pathname === "/" && <Footer />}

                {/* <CallBtn /> */}
              </Suspense>
            </BrowserRouter>
          </LanguageProvider>
        </ShareContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
