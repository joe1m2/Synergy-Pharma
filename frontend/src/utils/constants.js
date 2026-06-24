export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const USER_ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const RFQ_STATUS = {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const DEPARTMENTS = {
  GENERAL: 'General Inquiry',
  PRODUCT: 'Product Info',
  PARTNERSHIP: 'Partnership',
};
