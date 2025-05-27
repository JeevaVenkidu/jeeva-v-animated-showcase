
export interface CodingProfile {
  platform: string;
  username: string;
  stats: Record<string, string | number>;
  url: string;
  icon: any;
  color: string;
}

export interface CodingStats {
  problemsSolved: number;
  projectsBuilt: number;
  certifications: number;
}

export class CodingModel {
  private static profiles: Omit<CodingProfile, 'icon'>[] = [
    {
      platform: 'GitHub',
      username: 'jeeva-v',
      stats: { repos: 25, followers: 150, contributions: 500 },
      url: '#',
      color: 'from-gray-600 to-gray-800',
    },
    {
      platform: 'LeetCode',
      username: 'jeeva-v',
      stats: { solved: 180, ranking: '85k', streak: 45 },
      url: '#',
      color: 'from-orange-500 to-red-600',
    },
    {
      platform: 'HackerRank',
      username: 'jeeva-v',
      stats: { badges: 12, rank: 'Gold', points: 2500 },
      url: '#',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  private static stats: CodingStats = {
    problemsSolved: 500,
    projectsBuilt: 25,
    certifications: 12,
  };

  static async getProfiles(): Promise<Omit<CodingProfile, 'icon'>[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.profiles]), 100);
    });
  }

  static async getStats(): Promise<CodingStats> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.stats }), 50);
    });
  }
}
