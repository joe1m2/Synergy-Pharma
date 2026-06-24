import api from './api';

export const newsService = {
  getAllNews: async () => {
    try {
      const response = await api.get('/news');
      return response.data;
    } catch (e) {
      return [
        {
          id: 1,
          title: 'Synergy Pharma Partners with GE Healthcare',
          content: 'Distribution partnership details for bringing imaging systems to Ethiopia.',
          createdAt: new Date().toISOString()
        }
      ];
    }
  },

  getNewsById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  createNews: async (newsData) => {
    const response = await api.post('/news', newsData);
    return response.data;
  },

  updateNews: async (id, newsData) => {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },

  submitPartnerInquiry: async (inquiryData) => {
    const response = await api.post('/partners/inquire', inquiryData);
    return response.data;
  }
};
