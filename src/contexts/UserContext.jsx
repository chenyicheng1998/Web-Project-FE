import React, { createContext, useState, useEffect } from "react";

// 创建 Context
export const UserContext = createContext();

// 提供 Context 的 Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 页面刷新时验证 token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('http://localhost:5000/api/verify-token', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.valid) setUser(data.user);
          else localStorage.removeItem('authToken');
        });
    }
  }, []);

  // 登录函数
  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
