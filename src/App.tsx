
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ParticleBackground from './components/effects/ParticleBackground';
import SimpleParticleBackground from './components/effects/SimpleParticleBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Coding from './pages/Coding';
import Articles from './pages/Articles';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [use3D, setUse3D] = useState(true);
  
  // Check if Three.js related modules are available
  useEffect(() => {
    const check3DSupport = async () => {
      try {
        await import('@react-three/fiber');
        await import('@react-three/drei');
        setUse3D(true);
      } catch (error) {
        console.warn('3D libraries not available, falling back to 2D animations');
        setUse3D(false);
      }
    };
    
    check3DSupport();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col relative">
              {/* Global particle background */}
              {use3D ? <ParticleBackground /> : <SimpleParticleBackground />}
              
              <Navigation />
              <main className="flex-grow pt-16 relative z-10">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home use3D={use3D} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/coding" element={<Coding />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
