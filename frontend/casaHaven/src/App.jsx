import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Properties from "./components/Properties";
import PropertyDetail from "./components/PropertyDetail";
import BookingRequest from "./components/BookingRequest";
import BookingSuccess from "./components/BookingSuccess";
import BookingDetail from "./components/BookingDetail";
import UserBookings from "./components/UserBookings";
import Review from "./components/Review";
import Navbar from "./components/Navbar";
import OAuthSuccess from "./components/OAuthSuccess";
import OAuthRoleSelection from "./components/OAuthRoleSelection";
import Home from "./components/Home";
import AddProperty from "./components/AddProperty";
import EditProperty from "./components/EditProperty";
import HostDashboard from "./components/HostDashboard";
import AdminDashboard from "./components/AdminDashboard";
import UserProfile from "./components/UserProfile";
import Contact from "./components/Contact";
import Support from "./components/Support";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

import "./App.css";

// Protected Route Component
const PrivateRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (for routes that should only be accessible when not logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/auth/success" element={<OAuthSuccess />} />
          <Route path="/auth/role-selection" element={<OAuthRoleSelection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* Auth Routes - Only accessible when not logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <div className="max-w-md mx-auto">
                  <Login />
                </div>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <div className="max-w-md mx-auto">
                  <Register />
                </div>
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <UserBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/:propertyId"
            element={
              <PrivateRoute>
                <BookingRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking-success"
            element={
              <PrivateRoute>
                <BookingSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking/:bookingId"
            element={
              <PrivateRoute>
                <BookingDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviews/:propertyId"
            element={
              <PrivateRoute>
                <div className="max-w-4xl mx-auto">
                  <Review />
                </div>
              </PrivateRoute>
            }
          />

          {/* Host Only Routes */}
          <Route
            path="/host/dashboard"
            element={
              <PrivateRoute roles={["host", "admin"]}>
                <HostDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/host/add-property"
            element={
              <PrivateRoute roles={["host", "admin"]}>
                <AddProperty />
              </PrivateRoute>
            }
          />
          <Route
            path="/host/edit-property/:id"
            element={
              <PrivateRoute roles={["host", "admin"]}>
                <EditProperty />
              </PrivateRoute>
            }
          />

          {/* Admin Only Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="max-w-md mx-auto mt-20 text-center px-4">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    404 - Page Not Found
                  </h2>
                  <p className="text-gray-600 mb-8">
                    The page you are looking for doesn't exist or has been
                    moved.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Go back home
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="relative bg-gradient-to-r from-pink-50 via-white to-orange-50 mt-auto border-t-0 shadow-[0_-8px_32px_-8px_rgba(255,99,132,0.08)]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg mb-1">CasaHaven</span>
              <p className="text-gray-500 text-sm mb-3">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex space-x-6 mb-2">
                <Link to="/privacy-policy" className="flex items-center text-gray-500 hover:text-pink-500 text-sm font-medium transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20.5c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5-7.5 3.358-7.5 7.5 3.358 7.5 7.5 7.5z"/><path d="M12 8v4l3 3"/></svg>
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="flex items-center text-gray-500 hover:text-pink-500 text-sm font-medium transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 4h12M6 8h12M6 12h12M6 16h12"/></svg>
                  Terms of Service
                </Link>
                <Link to="/contact" className="flex items-center text-gray-500 hover:text-pink-500 text-sm font-medium transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5a8.38 8.38 0 01-7.5 8.44A8.38 8.38 0 013 10.5V5.75A2.75 2.75 0 015.75 3h12.5A2.75 2.75 0 0121 5.75z"/><path d="M3 6l9 6 9-6"/></svg>
                  Contact Us
                </Link>
                <Link to="/support" className="flex items-center text-gray-500 hover:text-pink-500 text-sm font-medium transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
