import React from 'react';
import { Layout, Card, Typography } from 'antd';
import AttackMap from '../components/AttackMap';
import './Dashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;

// Define the attack data type to match AttackMap's expectations
type AttackData = {
  id: string;
  from: [number, number]; // Tuple type for exactly 2 numbers
  to: [number, number];   // Tuple type for exactly 2 numbers
  severity: 'low' | 'medium' | 'high';
};

const Dashboard: React.FC = () => {
  // Explicitly type the attacks array as AttackData[]
  const attacks: AttackData[] = [
    { 
      id: '1', 
      from: [40.7128, -74.0060] as [number, number], // New York
      to: [51.5074, -0.1278] as [number, number],    // London
      severity: 'high' 
    },
    { 
      id: '2', 
      from: [35.6762, 139.6503] as [number, number], // Tokyo
      to: [48.8566, 2.3522] as [number, number],     // Paris
      severity: 'medium' 
    },
    { 
      id: '3', 
      from: [19.4326, -99.1332] as [number, number], // Mexico City
      to: [55.7558, 37.6173] as [number, number],    // Moscow
      severity: 'low' 
    },
  ];

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <Title level={3} style={{ color: 'white', margin: 0 }}>CyberShield Dashboard</Title>
      </Header>
      <Content className="dashboard-content">
        <Card title="Global Attack Map" className="dashboard-card">
          <AttackMap attacks={attacks} />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;