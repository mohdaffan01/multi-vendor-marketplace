// Frontend API service to communicate with Node/Express Backend

const API_BASE_URL = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  // Auth
  async register(userData) {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },

  async logout() {
    localStorage.removeItem('token');
    const res = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE_URL}/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products${query ? `?${query}` : ''}`);
    return res.json();
  },

  async getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    return res.json();
  },

  // Categories
  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return res.json();
  },

  // Vendors
  async getVendors() {
    const res = await fetch(`${API_BASE_URL}/vendors`);
    return res.json();
  },

  async getVendorById(id) {
    const res = await fetch(`${API_BASE_URL}/vendors/${id}`);
    return res.json();
  },

  // Cart
  async getCart() {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async addToCart(productId, quantity = 1) {
    const res = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    return res.json();
  },

  async updateCartItem(productId, quantity) {
    const res = await fetch(`${API_BASE_URL}/cart/item`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    return res.json();
  },

  async removeFromCart(productId) {
    const res = await fetch(`${API_BASE_URL}/cart/item/${productId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Orders
  async createOrder(orderData) {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData),
    });
    return res.json();
  },

  async getMyOrders() {
    const res = await fetch(`${API_BASE_URL}/orders/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Wishlist
  async getWishlist() {
    const res = await fetch(`${API_BASE_URL}/wishlist`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  async addToWishlist(productId) {
    const res = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ productId }),
    });
    return res.json();
  },

  async removeFromWishlist(productId) {
    const res = await fetch(`${API_BASE_URL}/wishlist/item/${productId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },
};
