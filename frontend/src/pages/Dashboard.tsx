import React from 'react';
import { Layout, Card, Typography, Button } from 'antd';
import AttackMap from '../components/AttackMap';
import './Dashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;

// Type definition for attack data
type AttackData = {
  id: string;
  from: [number, number];
  to: [number, number];
  severity: 'low' | 'medium' | 'high';
};

// Props interface for TypeScript
interface DashboardProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setIsAuthenticated }) => {
  // Memoized attack data to prevent unnecessary re-renders
  const attacks = React.useMemo<AttackData[]>(() => [
    { 
      id: '1', 
      from: [40.7128, -74.0060], // New York coordinates
      to: [51.5074, -0.1278],    // London coordinates
      severity: 'high' 
    },
    { 
      id: '2', 
      from: [35.6762, 139.6503], // Tokyo coordinates
      to: [48.8566, 2.3522],     // Paris coordinates
      severity: 'medium' 
    },
    { 
      id: '3', 
      from: [19.4326, -99.1332], // Mexico City coordinates
      to: [55.7558, 37.6173],    // Moscow coordinates
      severity: 'low' 
    },
  ], []);

  // Logout handler function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          CyberShield Dashboard
        </Title>
        <Button 
          type="primary" 
          danger 
          onClick={handleLogout}
          style={{ float: 'right', marginTop: 16 }}
          aria-label="Logout button"
        >
          Logout
        </Button>
      </Header>
      
      <Content className="dashboard-content">
        <Card 
          title="Global Attack Map" 
          className="dashboard-card"
          headStyle={{ fontSize: '1.2rem' }}
        >
          <AttackMap attacks={attacks} />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;