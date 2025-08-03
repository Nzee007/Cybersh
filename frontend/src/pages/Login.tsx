import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Layout, Typography, message } from 'antd';
import axios from 'axios';
import './Login.css';

const { Title } = Typography;
const { Content } = Layout;

interface LoginValues {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username?: string;
  expiresIn?: number;
}

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginValues) => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.username) {
          localStorage.setItem('username', response.data.username);
        }
        message.success('Login successful!');
        setIsAuthenticated(true);
        window.dispatchEvent(new Event('storage')); // Trigger global state update
      }
    } catch (error) {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      message.error(errorMessage);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="login-layout">
      <Content className="login-content">
        <Card className="login-card" hoverable>
          <div className="login-header">
            <Title level={2} className="login-title">
              <span className="brand-highlight">Cyber</span>Shield Monitor
            </Title>
            <p>Real-time security dashboard</p>
          </div>
          
          <Form<LoginValues>
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 4, message: 'Username must be at least 4 characters' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Username" 
                size="large"
                autoComplete="username"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
                autoComplete="current-password"
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                size="large"
                className="login-button"
                disabled={loading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Login;