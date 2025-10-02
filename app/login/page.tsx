"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { useRouter } from "next/navigation"
import BannerBackground from "@/components/banner-crossfade"
import { bannerImages, bannerIntervalMs, bannerTransitionMs, bannerEasing } from "@/components/banner-config"

export default function LoginPage() {
  const [userType, setUserType] = useState("local")
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
    adminId: "",
    adminPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Removed useEffect redirect to prevent blinking/shaking

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (userType === "local") {
        if (!formData.email || !formData.phone || !formData.password || !formData.otp) {
          throw new Error("Please fill in all fields")
        }
        if (formData.otp !== "1234") {
          throw new Error("Invalid OTP. Please enter 1234")
        }
        localStorage.setItem("glacierwatch_auth", "true")
        localStorage.setItem("glacierwatch_user", JSON.stringify({
          email: formData.email,
          phone: formData.phone,
          role: "local",
          name: "Local User",
        }))
  router.push("/alerts")
      } else {
        if (!formData.adminId || !formData.adminPassword) {
          throw new Error("Please fill in all fields")
        }
        if (formData.adminId !== "admin" || formData.adminPassword !== "admin123") {
          throw new Error("Invalid admin credentials")
        }
        localStorage.setItem("glacierwatch_auth", "true")
        localStorage.setItem("glacierwatch_user", JSON.stringify({
          adminId: formData.adminId,
          role: "admin",
          name: "Administrator",
        }))
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }, [formData, userType, router])

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Slideshow background */}
      <BannerBackground
        images={bannerImages}
        intervalMs={bannerIntervalMs}
        transitionMs={bannerTransitionMs}
        easing={bannerEasing}
      />
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-lg shadow-2xl p-8 bg-opacity-90 backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GlacierWatch</h1>
            <p className="text-gray-600">AI-Powered Glacier Monitoring</p>
          </div>

          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === "local"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setUserType("local")}
              >
                Local User
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === "admin"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setUserType("admin")}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {userType === "local" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                        type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="user@example.com"
                      />
                    </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                          required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                      </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                        required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Enter password"
                      />
                    </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OTP (Fixed: 1234)</label>
                  <input
                        type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                    placeholder="Enter OTP"
                      />
                    </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin ID</label>
                  <input
                    type="text"
                        required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.adminId}
                    onChange={(e) => setFormData({...formData, adminId: e.target.value})}
                    placeholder="admin"
                      />
                    </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                        type="password"
                        required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.adminPassword}
                    onChange={(e) => setFormData({...formData, adminPassword: e.target.value})}
                    placeholder="admin123"
                      />
                    </div>
              </>
            )}

                    {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : `Sign In as ${userType === "local" ? "Local User" : "Admin"}`}
            </button>
                  </form>

          <div className="mt-6 text-xs text-gray-500 text-center">
            <div className="mb-2">
              <strong>Local User:</strong> Any email/phone + any password + OTP: 1234
            </div>
            <div>
              <strong>Admin:</strong> admin / admin123
            </div>
              </div>
        </div>
      </div>
    </div>
  )
}
