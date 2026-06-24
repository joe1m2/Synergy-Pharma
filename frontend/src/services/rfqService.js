import api from './api';

export const rfqService = {
  submitRFQ: async (rfqData) => {
    const response = await api.post('/rfqs', rfqData);
    return response.data;
  },

  getAllRFQs: async () => {
    const response = await api.get('/rfqs');
    return response.data;
  },

  updateRFQStatus: async (id, status) => {
    const response = await api.put(`/rfqs/${id}/status`, { status });
    return response.data;
  }
};
