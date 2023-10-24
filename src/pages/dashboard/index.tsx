import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // State to store user information
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    console.log(userData)

    if (userData) {
        try{
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
        }catch (error){
            console.error('Error parsing userData:', error);
            setUser(null);
        }

    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Redirect to the signin page or any other desired location
    navigate('/signin'); // Redirect to the signin page, assuming you have a route for it
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <a id="logout-link" onClick={handleLogout} href="#">
            Logout
          </a>
        </div>
      )}
    </div>
  );
      }
export default Dashboard;