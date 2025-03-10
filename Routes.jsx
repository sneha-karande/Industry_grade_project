import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Events from "./components/Events";
import EventForm from "./components/EventForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/events"
                        element={
                            <PrivateRoute>
                                <Events />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/events/new"
                        element={
                            <PrivateRoute>
                                <EventForm />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
