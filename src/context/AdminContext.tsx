'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminContextType {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AdminContext = createContext<AdminContextType>({
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export function AdminProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('wcc-admin-token')
    if (saved) {
      setToken(saved)
    }
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('wcc-admin-token', newToken)
    document.cookie = `wcc-admin-token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('wcc-admin-token')
    document.cookie = 'wcc-admin-token=; path=/; max-age=0'
  }

  return (
    <AdminContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
