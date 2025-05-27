
import { useState, useEffect } from 'react';
import { ProjectModel, Project, ProjectCategory } from '../models/projectModel';

export const useProjectController = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [projectsData, categoriesData] = await Promise.all([
          ProjectModel.getAllProjects(),
          ProjectModel.getCategories()
        ]);
        setProjects(projectsData);
        setCategories(categoriesData);
        setFilteredProjects(projectsData);
      } catch (error) {
        console.error('Error loading project data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle category filtering
  useEffect(() => {
    const filterProjects = async () => {
      const filtered = await ProjectModel.getProjectsByCategory(selectedCategory);
      setFilteredProjects(filtered);
    };

    filterProjects();
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return {
    projects: filteredProjects,
    categories,
    selectedCategory,
    isLoading,
    handleCategoryChange,
  };
};
