
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
}

export class HomeModel {
  private static heroData: HeroData = {
    title: "Jeeva V",
    subtitle: "Backend Developer",
    description: "Passionate about building scalable backend systems and exploring new technologies"
  };

  static async getHeroData(): Promise<HeroData> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...this.heroData }), 100);
    });
  }

  static async check3DSupport(): Promise<boolean> {
    try {
      await import('@react-three/fiber');
      await import('@react-three/drei');
      return true;
    } catch (error) {
      console.warn('3D libraries not available, falling back to 2D animations');
      return false;
    }
  }
}
