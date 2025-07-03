import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setCartFromBackend } = useCart();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        login(data.token, data.user || { email: form.email });
        // Fetch cart from backend
        const cartRes = await fetch('http://localhost:5000/api/cart', {
          headers: { 'Authorization': `Bearer ${data.token}` },
        });
        if (cartRes.ok) {
          const items = await cartRes.json();
          setCartFromBackend(items);
        }
        navigate('/');
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Box width="212.1vh" Height="100vh" display="flex" 
    alignItems="center" justifyContent="center" sx={{ 
      background: '#fff', color: '#111' }}>
      <Box maxWidth={400} width="100%" p={4} borderRadius={2} boxShadow={3} sx={{ background: '#fff', color: '#111' }}>
        <Typography variant="h4" mb={2} align="center" sx={{ color: '#111' }}>Login</Typography>
        {error && <Alert severity="error" sx={{ color: '#fff', background: '#b71c1c' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ color: '#fff', background: '#388e3c' }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: '#111' } }}
            InputProps={{ style: { color: '#111' } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: '#111' } }}
            InputProps={{ style: { color: '#111' } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, color: '#fff' }}>
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>Register</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login; 