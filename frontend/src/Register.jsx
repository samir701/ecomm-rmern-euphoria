import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else if (res.ok) {
        setSuccess('Registration successful!');
        setForm({ name: '', email: '', password: '' });
      } else {
        setError(data.msg || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Box width="212.1vh" height="100vh" display="flex" 
    alignItems="center" justifyContent="center" sx={{ 
      background: '#fff', color: '#111' }}>
    
      <Box maxWidth={400} width="100%" p={4} borderRadius={2} boxShadow={3} sx={{ background: '#fff', color: '#111' }}>
        <Typography variant="h4" mb={2} align="center" sx={{ color: '#111' }}>Register</Typography>
        {error && <Alert severity="error" sx={{ color: '#fff', background: '#b71c1c' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ color: '#fff', background: '#388e3c' }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: '#111' } }}
            InputProps={{ style: { color: '#111' } }}
          />
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
            Register
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline' }}>Login</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register; 