export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/validate-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.isValid || false;
    
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};