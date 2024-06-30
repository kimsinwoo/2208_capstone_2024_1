import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Detail from "./components/Detail";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Upload from "./components/Upload";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.App}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/main"
              element={
                <>
                  <NavBar />
                  <MainPage />
                </>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <>
                  <NavBar />
                  <Detail />
                </>
              }
            />
            <Route
              path="/chat/:roomId"
              element={
                <>
                  <NavBar />
                  <Chat />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <NavBar />
                  <Profile />
                </>
              }
            />
            <Route
              path="/upload"
              element={
                <>
                  <Upload />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <MainPage />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
