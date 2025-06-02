
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import WelcomeOverlay from './components/ui/WelcomeOverlay';
import { useWelcomeOverlay } from './hooks/useWelcomeOverlay';

const queryClient = new QueryClient();

const App = () => {
  const { showWelcome, isWelcomeComplete, handleWelcomeComplete } = useWelcomeOverlay();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Welcome Overlay */}
          {showWelcome && (
            <WelcomeOverlay 
              onComplete={handleWelcomeComplete}
              duration={2500}
            />
          )}
          
          {/* Main App Content */}
          <div className={`transition-opacity duration-500 ${isWelcomeComplete ? 'opacity-100' : 'opacity-0'}`}>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-grow pt-16">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
