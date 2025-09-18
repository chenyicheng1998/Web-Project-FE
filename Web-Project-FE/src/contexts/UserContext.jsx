import React, { createContext, useState, useEffect } from "react";

// 创建 Context
export const UserContext = createContext();

// 提供 Context 的 Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  // 页面刷新时验证 token
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');

  //   if (token) {
  //     fetch('http://localhost:5001/api/auth/verify-token', {
  //       headers: { 'Authorization': `Bearer ${token}` }
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.valid) setUser(data.user);
  //         else localStorage.removeItem('authToken');
  //       });
  //   }
  // }, []);

  useEffect(() => {
    if (!authToken) {
      setUser(null);
      return;
    }

    fetch('http://localhost:5001/api/auth/verify-token', {
      headers: { 'Authorization': `Bearer ${authToken}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) setUser(data.user);
        else {
          localStorage.removeItem('authToken');
          setAuthToken(null);
          setUser(null);
        }
      });
  }, [authToken]);


  // 登录函数
  const login = (userData, token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token); // ✅ 触发验证
    setUser(userData);
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
