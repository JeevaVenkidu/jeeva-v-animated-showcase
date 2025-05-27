
import { useState, useEffect } from 'react';
import { HomeModel, HeroData } from '../models/homeModel';

export const useHomeController = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [use3D, setUse3D] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [heroDataResult, supports3D] = await Promise.all([
          HomeModel.getHeroData(),
          HomeModel.check3DSupport()
        ]);
        
        setHeroData(heroDataResult);
        setUse3D(supports3D);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    heroData,
    use3D,
    isLoading,
  };
};
