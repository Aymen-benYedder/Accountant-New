// src/app/_utilities/auth.ts

import api from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: any;
}

export async function login({ email, password }: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

export async function register({ name, email, password }: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', { name, email, password });
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

export function logout(): void {
  localStorage.removeItem('token');
}