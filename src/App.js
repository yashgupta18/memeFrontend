import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { NotificationProvider } from "./context/NotificationContext";

const App = () => (
  <NotificationProvider>
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </NotificationProvider>
);

export default App;
