
import { useState, useEffect } from 'react';
import { Github, Award, Code } from 'lucide-react';
import { CodingModel, CodingProfile, CodingStats } from '../models/codingModel';

export const useCodingController = () => {
  const [profiles, setProfiles] = useState<CodingProfile[]>([]);
  const [stats, setStats] = useState<CodingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [profilesData, statsData] = await Promise.all([
          CodingModel.getProfiles(),
          CodingModel.getStats()
        ]);

        // Add icons to profiles
        const profilesWithIcons: CodingProfile[] = profilesData.map(profile => ({
          ...profile,
          icon: getIconForPlatform(profile.platform)
        }));

        setProfiles(profilesWithIcons);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading coding data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'GitHub': return Github;
      case 'LeetCode': return Code;
      case 'HackerRank': return Award;
      default: return Code;
    }
  };

  return {
    profiles,
    stats,
    isLoading,
  };
};
