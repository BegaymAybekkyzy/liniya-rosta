const isServer = typeof window === 'undefined';

export const API_BASE_URL = isServer
    ? 'http://nginx:80/api'
    : '/api';