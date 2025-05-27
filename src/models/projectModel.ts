
export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: 'backend' | 'frontend' | 'academic';
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
}

export class ProjectModel {
  private static projects: Project[] = [
    {
      title: 'E-Commerce API',
      description: 'Comprehensive e-commerce backend built with Node.js, Express.js, and PostgreSQL. Features include user authentication with Keycloak, product management, order processing, and payment integration.',
      tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Keycloak', 'REST API'],
      category: 'backend',
      featured: true,
      githubUrl: '#',
    },
    {
      title: 'CRM System',
      description: 'Customer Relationship Management system with token-based authentication, role-based access control, and comprehensive customer data management.',
      tags: ['Node.js', 'JWT', 'PostgreSQL', 'Prisma'],
      category: 'backend',
      githubUrl: '#',
    },
    {
      title: 'Auto Fertilizer Mixer',
      description: 'PLC-based precision agriculture system for automated fertilizer mixing and distribution, improving crop yield and reducing waste.',
      tags: ['PLC', 'IoT', 'Agriculture', 'Automation'],
      category: 'academic',
      githubUrl: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'Interactive portfolio website built with React.js, featuring 3D animations, particle effects, and responsive design.',
      tags: ['React.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
      category: 'frontend',
      githubUrl: '#',
    },
  ];

  private static categories: ProjectCategory[] = [
    { id: 'all', name: 'All Projects' },
    { id: 'backend', name: 'Backend' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'academic', name: 'Academic' },
  ];

  static async getAllProjects(): Promise<Project[]> {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.projects]), 100);
    });
  }

  static async getProjectsByCategory(category: string): Promise<Project[]> {
    const projects = await this.getAllProjects();
    if (category === 'all') return projects;
    return projects.filter(project => project.category === category);
  }

  static async getCategories(): Promise<ProjectCategory[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.categories]), 50);
    });
  }

  static async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getAllProjects();
    return projects.filter(project => project.featured);
  }
}
