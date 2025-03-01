import api from './api';
import { AITool } from '../types/AITool';
import { mockAITools } from './mockData';

export const aiToolsService = {
  async getAllTools(): Promise<AITool[]> {
    // In a real application, this would call the API
    // try {
    //   const response = await api.get('/ai-tools');
    //   return response.data;
    // } catch (error: any) {
    //   throw new Error(error.response?.data?.error || 'Failed to fetch AI tools');
    // }
    
    // For now, return mock data
    return Promise.resolve(mockAITools);
  },

  async getToolById(id: string): Promise<AITool> {
    // In a real application, this would call the API
    // try {
    //   const response = await api.get(`/ai-tools/${id}`);
    //   return response.data;
    // } catch (error: any) {
    //   throw new Error(error.response?.data?.error || 'Failed to fetch AI tool');
    // }
    
    // For now, return mock data
    const tool = mockAITools.find(tool => tool.id === id);
    if (!tool) {
      return Promise.reject(new Error('AI tool not found'));
    }
    return Promise.resolve(tool);
  },

  async searchTools(query: string): Promise<AITool[]> {
    // In a real application, this would call the API
    // try {
    //   const response = await api.get(`/ai-tools/search?q=${encodeURIComponent(query)}`);
    //   return response.data;
    // } catch (error: any) {
    //   throw new Error(error.response?.data?.error || 'Failed to search AI tools');
    // }
    
    // For now, filter mock data
    const filteredTools = mockAITools.filter(tool => 
      tool.name.toLowerCase().includes(query.toLowerCase()) || 
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return Promise.resolve(filteredTools);
  }
};