// src/pages/Home.jsx

import React from "react";
import { photoService } from "@/services/photoService";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection";
import HalftoneBackground from "@/components/HalftoneBackground";

const Home = () => {
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["photos-home"],
    queryFn: () => photoService.getFeaturedPhotos(20),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="relative">
      <HalftoneBackground />
      <div className="relative z-10">
        <HeroSection featuredPhoto={photos[0]} />
        {/* Render photos or other components here */}
      </div>
    </div>
  );
};

export default Home;
