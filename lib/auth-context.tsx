"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  role: 'local' | 'admin'
  name: string
  email?: string
  phone?: string
  adminId?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on mount
    const auth = localStorage.getItem("glacierwatch_auth")
    const userData = localStorage.getItem("glacierwatch_user")
    
    if (auth === "true" && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("glacierwatch_auth")
        localStorage.removeItem("glacierwatch_user")
      }
    }
    
    setLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("glacierwatch_auth", "true")
    localStorage.setItem("glacierwatch_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("glacierwatch_auth")
    localStorage.removeItem("glacierwatch_user")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
