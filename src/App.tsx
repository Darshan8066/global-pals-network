
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthPage from "./components/auth/AuthPage";
import HomePage from "./components/pages/HomePage";
import SearchPage from "./components/pages/SearchPage";
import ChatPage from "./components/pages/ChatPage";
import ProfilePage from "./components/profile/ProfilePage";
import MultiStepEditProfile from "./components/profile/MultiStepEditProfile";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  // Always show AuthPage for unauthenticated users
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<MultiStepEditProfile />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
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
