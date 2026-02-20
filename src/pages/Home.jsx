import React from "react";
import { photoService } from "@/services/photoService";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../components/home/HeroSection";
import FeaturedGrid from "../components/home/FeaturedGrid";
import HalftoneBackground from "@/components/HalftoneBackground";

const Home = () => {
  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["photos-home"],
    queryFn: () => photoService.getFeaturedPhotos(20),
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground text-sm tracking-widest">
      Loading...
    </div>
  );

  return (
    <div className="relative">
      <HalftoneBackground />
      <div className="relative z-10">
        <HeroSection featuredPhoto={photos[0]} />
        <FeaturedGrid photos={photos} />
      </div>
    </div>
  );
};

export default Home;
