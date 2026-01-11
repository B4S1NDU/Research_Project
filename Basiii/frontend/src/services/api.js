import axios from 'axios';

const API_BASE_URL = '/api';

export const apiService = {
  // Ask a what-if question about an artifact
  async askQuestion(artid, question) {
    try {
      const response = await axios.post(`${API_BASE_URL}/answer`, {
        artid,
        question
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to generate scenarios');
    }
  },

  // Check API health
  async healthCheck() {
    try {
      const response = await axios.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API is not available');
    }
  },

  // Get model status
  async getModelStatus() {
    try {
      const response = await axios.get('/model-status');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get model status');
    }
  }
};
