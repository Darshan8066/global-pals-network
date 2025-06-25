
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./components/auth/AuthPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import HomePage from "./components/pages/HomePage";
import SearchPage from "./components/pages/SearchPage";
import ChatPage from "./components/pages/ChatPage";
import StatsPage from "./components/pages/StatsPage";
import ActiveMembersPage from "./components/pages/ActiveMembersPage";
import CountriesPage from "./components/pages/CountriesPage";
import NewConnectionsPage from "./components/pages/NewConnectionsPage";
import SmartDiscoveryPage from "./components/pages/SmartDiscoveryPage";
import GlobalNetworkPage from "./components/pages/GlobalNetworkPage";
import ProfilePage from "./components/profile/ProfilePage";
import MultiStepEditProfile from "./components/profile/MultiStepEditProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/active-members" element={<ActiveMembersPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/new-connections" element={<NewConnectionsPage />} />
        <Route path="/smart-discovery" element={<SmartDiscoveryPage />} />
        <Route path="/global-network" element={<GlobalNetworkPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<MultiStepEditProfile />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
