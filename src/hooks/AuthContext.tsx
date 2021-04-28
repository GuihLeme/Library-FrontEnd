import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  adminUserWithoutPassword: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface userData {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthContextData {
  user: userData;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;

}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Library:token')
    const adminUserWithoutPassword = localStorage.getItem('@Library:adminUser')

    if(token && adminUserWithoutPassword)  {
      return {token, adminUserWithoutPassword: JSON.parse(adminUserWithoutPassword)}
    }

    return {} as AuthState;
  })

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('sessions', {
      email,
      password
    })

    const { token, adminUserWithoutPassword } = response.data;

    localStorage.setItem('@Library:token', token)
    localStorage.setItem('@Library:adminUser', JSON.stringify(adminUserWithoutPassword))
    console.log(token)

    setData({ token, adminUserWithoutPassword })
  },[])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Library:token')
    localStorage.removeItem('@Library:adminUser')

    setData({} as AuthState)
  },[])

  return(
    <AuthContext.Provider value={{ user: data.adminUserWithoutPassword as userData, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context;
}


