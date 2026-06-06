'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAdmin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (data.success) {
        login(data.data.token)
        router.push('/admin')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] p-6 transition-colors duration-300">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border border-[var(--border)] bg-[var(--bg-surface)] p-8 transition-colors duration-300 shadow-xl">
          <h1 className="font-display text-2xl font-bold text-[var(--text)]">
            WCC <span className="text-gold">Admin</span>
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Sign in to manage your catalogue</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[var(--border)] bg-neutral-50 dark:bg-white/5 px-4 py-3 text-sm text-[var(--text)] placeholder-neutral-400 dark:placeholder-white/20 focus:border-gold focus:outline-none transition-colors"
                placeholder="admin@wccgarments.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[var(--border)] bg-neutral-50 dark:bg-white/5 px-4 py-3 pr-10 text-sm text-[var(--text)] placeholder-neutral-400 dark:placeholder-white/20 focus:border-gold focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:text-white/30 dark:hover:text-white/60">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-gold py-3 text-[11px] font-semibold uppercase tracking-wider text-black transition-colors hover:bg-gold-light disabled:opacity-50"
            >
              {loading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-neutral-400 dark:text-white/20">
            Default: admin@wccgarments.com / wcc2026admin
          </p>
        </div>
      </motion.div>
    </div>
  )
}
