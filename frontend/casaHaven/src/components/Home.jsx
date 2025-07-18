import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSmile, FaHome, FaCity, FaStar, FaFire } from "react-icons/fa";

const bannerMessages = [
  "🎉 New! Book verified properties with instant confirmation – Get 20% off your first booking",
  "🏡 Discover unique stays and experiences at CasaHaven!",
  "⭐ Trusted by thousands of happy guests and hosts.",
  "💸 Secure payments and instant booking confirmation.",
  "🌟 Become a host and earn extra income with CasaHaven!"
];

const taglines = [
  "Your next adventure starts here.",
  "Stay unique. Stay local. Stay CasaHaven.",
  "Book with confidence, stay with comfort.",
  "Verified hosts. Trusted stays. Happy memories."
];

const Home = () => {
  const { user, isAuthenticated, becomeHost } = useAuth();
  const navigate = useNavigate();
  const [isBecomingHost, setIsBecomingHost] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleBecomeHost = async () => {
    if (!isAuthenticated) {
      // If not authenticated, redirect to register
      navigate("/register");
      return;
    }

    if (user?.role === "host") {
      // If already a host, redirect to host dashboard
      navigate("/host/dashboard");
      return;
    }

    if (user?.role === "guest") {
      // If guest, upgrade to host
      setIsBecomingHost(true);
      try {
        const result = await becomeHost();
        if (result.success) {
          // Show success toast
          setSuccessMessage(
            result.message ||
              "Welcome to hosting! You can now add your first property."
          );
          setShowSuccessToast(true);

          // Hide toast and redirect after delay
          setTimeout(() => {
            setShowSuccessToast(false);
            navigate("/host/dashboard");
          }, 3000);
        } else {
          alert(result.error || "Failed to become a host. Please try again.");
        }
      } catch (error) {
        console.error("Error becoming host:", error);
        alert("Failed to become a host. Please try again.");
      } finally {
        setIsBecomingHost(false);
      }
    }
  };

  const features = [
    {
      name: "Wide Selection",
      description:
        "Choose from thousands of unique homes, apartments, and more.",
      icon: (
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      name: "Best Price Guarantee",
      description: "We offer the best prices for your perfect stay.",
      icon: (
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Easy Booking",
      description: "Simple and secure booking process.",
      icon: (
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  const featureCards = [
    {
      title: 'Wide Selection',
      desc: 'Choose from thousands of unique homes, apartments, and more.',
      svg: (
        <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 12l9-9 9 9" />
          <path d="M9 21V9h6v12" />
        </svg>
      ),
    },
    {
      title: 'Best Price Guarantee',
      desc: 'We offer the best prices for your perfect stay.',
      svg: (
        <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7" />
          <path d="M9 16h6" />
          <path d="M9 12h6" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
    {
      title: 'Easy Booking',
      desc: 'Simple and secure booking process.',
      svg: (
        <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M16 3v4" />
          <path d="M8 3v4" />
        </svg>
      ),
    },
    {
      title: '24/7 Support',
      desc: 'Our team is here to help you anytime, anywhere.',
      svg: (
        <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
    {
      title: 'Secure Payments',
      desc: 'All transactions are encrypted and safe.',
      svg: (
        <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Top Rated',
      desc: 'Guests love us! Consistently high ratings.',
      svg: (
        <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.5 21 12 17.8 5.5 21 7 14.1 2 9.3 9 8.5 12 2" />
        </svg>
      ),
    },
  ];

  const featureScrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = featureScrollRef.current;
    if (!scrollContainer) return;
    let scrollAmount = 1;
    let intervalId;
    let isHovered = false;
    const singleSetWidth = scrollContainer.scrollWidth / 2;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!isHovered) {
          if (scrollContainer.scrollLeft >= singleSetWidth) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += scrollAmount;
          }
        }
      }, 16); // ~60fps
    };

    startScroll();

    scrollContainer.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    scrollContainer.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('mouseenter', () => {
        isHovered = true;
      });
      scrollContainer.removeEventListener('mouseleave', () => {
        isHovered = false;
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 glass rounded-2xl px-6 py-4 shadow-2xl flex items-center space-x-3 animate-slide-in border border-emerald-200/50 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white backdrop-blur-lg">
          <svg
            className="w-6 h-6 text-white animate-glow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold">{successMessage}</span>
          <button
            onClick={() => setShowSuccessToast(false)}
            className="ml-4 text-white/80 hover:text-white transition-colors duration-200 hover:scale-110 transform"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-4 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm md:text-base font-medium">
            {bannerMessages[bannerIndex]}
          </p>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative bg-mesh overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-purple-600/70 to-teal-600/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "3s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="relative z-10 text-center lg:text-left">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                  ✨ Welcome to CasaHaven
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up">
                Find your perfect
                <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent font-black">
                  homestay experience
                </span>
              </h1>

              <p className="mt-6 text-lg text-white/90 max-w-xl leading-relaxed animate-fade-in-up">
                {taglines[taglineIndex]}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 lg:justify-start justify-center animate-fade-in-up">
                <Link
                  to="/properties"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/25 animate-glow"
                >
                  <span>Explore Stays</span>
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <button
                  onClick={handleBecomeHost}
                  disabled={isBecomingHost}
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl bg-white text-red-600 border border-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isBecomingHost ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>
                        {user?.role === "guest"
                          ? "Becoming Host..."
                          : "Loading..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {!isAuthenticated
                          ? "Become a Host"
                          : user?.role === "host"
                          ? "Host Dashboard"
                          : user?.role === "guest"
                          ? "Become a Host"
                          : "Become a Host"}
                      </span>
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            user?.role === "host"
                              ? "M9 5l7 7-7 7"
                              : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          }
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
                  <FaSmile className="text-3xl text-yellow-400 mb-2" />
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm text-white/80">Happy Guests</div>
                </div>
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
                  <FaHome className="text-3xl text-pink-400 mb-2" />
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/80">Properties</div>
                </div>
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
                  <FaCity className="text-3xl text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-white/80">Cities</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:block">
              <div className="relative">
                {/* Hero Image */}
                <img
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-2xl"
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80"
                  alt="Beautiful homestay"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Floating Card: Verified Host */}
                <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-red-200 flex items-center space-x-3 animate-float">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                    <FaSmile className="w-5 h-5 text-green-500" />
                  </span>
                  <div>
                    <div className="font-bold text-gray-800">Verified Host</div>
                    <div className="text-xs text-gray-500">100% Trusted</div>
                  </div>
                </div>

                {/* Floating Card: Rating */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-yellow-200 flex items-center space-x-3 animate-float-slow">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                    <FaStar className="w-5 h-5 text-yellow-500" />
                  </span>
                  <div>
                    <div className="font-bold text-yellow-700">4.9 Rating</div>
                    <div className="text-xs text-yellow-600">2,847 reviews</div>
                  </div>
                </div>

                {/* Floating Card: Trending */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-pink-200 flex items-center space-x-3 animate-float-fast">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100">
                    <FaFire className="w-5 h-5 text-pink-500" />
                  </span>
                  <div>
                    <div className="font-bold text-pink-700">Trending</div>
                    <div className="text-xs text-pink-600">Most booked this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-0 bg-gradient-to-b from-white to-red-100 w-full">
        <div className="w-full">
          <div
            className="flex gap-10 overflow-x-auto pb-4 scroll-smooth scrollbar-none hide-scrollbar w-full"
            ref={featureScrollRef}
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Render cards twice for infinite scroll */}
            {featureCards.concat(featureCards).map((card, idx) => (
              <div key={idx} className="min-w-[380px] max-w-[420px] bg-white rounded-3xl p-12 flex flex-col items-start hover:scale-105 transition-transform duration-300 border border-gray-100">
                <div className="mb-8 flex flex-col items-center w-full">
                  <div className="mb-4">
                    <div className="bg-gradient-to-br from-pink-200 to-red-100 p-6 rounded-full flex items-center justify-center">
                      {card.svg}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-lg text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-pink-400 to-orange-200 overflow-hidden">
         {/* Mesh/Radial Overlay for modern effect */}
         <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.18) 0 200px, transparent 300px), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.10) 0 180px, transparent 300px)'}}></div>
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-2xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Your journey begins here.</span>
            <span className="block">
              {isAuthenticated
                ? "Discover unique places to stay."
                : "Find and book your perfect escape today."}
            </span>
          </h2>
          <p className="mt-6 text-lg leading-7 text-white/90">
            {isAuthenticated
              ? "Handpicked stays for every kind of traveler."
              : "Thousands of happy guests have already found their home away from home."}
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="mt-10 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-2xl text-red-600 bg-white hover:bg-red-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-200/25 sm:w-auto animate-glow"
            >
              Sign up for free
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/properties"
              className="mt-10 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-2xl text-red-600 bg-white hover:bg-red-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-200/25 sm:w-auto animate-glow"
            >
              Explore Properties
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
