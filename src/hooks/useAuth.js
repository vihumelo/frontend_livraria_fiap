import React from 'react';
import api from '../helpers/api';
import { AuthContext } from '../providers/AuthProvider';

export default function useAuth() {
  const [error, setError] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const { setToken, removeToken } = React.useContext(AuthContext);

  async function signUp(payload) {
    setError(null);
    setSaving(true);

    try {
      const { data } = await api.post('/auth/signup', payload);

      setToken('token', data.token, {
        path: '/',
        expires: new Date(data.exp * 1000),
      });
    } catch (e) {
      setError(e?.response?.data?.error);
      throw e;
    } finally {
      setSaving(false);
    }
  }

  async function login(payload) {
    setError(null);
    setSaving(true);

    try {
      const { data } = await api.post('/auth/login', payload);

      setToken('token', data.token, {
        path: '/',
        expires: new Date(data.exp * 1000),
      });
    } catch (e) {
      setError(e?.response?.data?.error);
      throw e;
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    removeToken('token');
  }

  return {
    signUp,
    login,
    logout,
    authError: error,
    authSaving: saving,
  };
}
