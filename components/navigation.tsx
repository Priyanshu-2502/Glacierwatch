"use client"

import { AlertTriangle, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  const isAdmin = user?.role === 'admin'

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-primary-foreground" />
            </div>
            <Link href={isAdmin ? "/dashboard" : "/"} className="text-xl font-bold text-primary font-[family-name:var(--font-playfair)]">
              GlacierWatch
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {/* Local User header: Home, About, Impact, Alert */}
            {!isAdmin && (
              <>
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/impacts" className="text-muted-foreground hover:text-primary transition-colors">
                  Impact
                </Link>
                <Link href="/alerts" className="text-muted-foreground hover:text-primary transition-colors">
                  Alert
                </Link>
              </>
            )}
            {/* Admin header: Home, Alert, Risk Map, About, Dashboard, Impact, Monitoring */}
            {isAdmin && (
              <>
                <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/alerts" className="text-muted-foreground hover:text-primary transition-colors">
                  Alert
                </Link>
                <Link href="/risk-map" className="text-muted-foreground hover:text-primary transition-colors">
                  Risk Map
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/impacts" className="text-muted-foreground hover:text-primary transition-colors">
                  Impact
                </Link>
                <Link href="/monitoring" className="text-muted-foreground hover:text-primary transition-colors">
                  Monitoring
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
