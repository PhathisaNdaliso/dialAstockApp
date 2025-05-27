"use client"

import { useEffect, useState } from "react"
import { BarChart3 } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 100 / 30 // 30 seconds
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center animate-pulse">
            <BarChart3 className="w-16 h-16 text-red-500" />
          </div>
          <div className="absolute inset-0 w-32 h-32 mx-auto border-4 border-white rounded-full animate-spin opacity-30"></div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Dial-a-Stocktaker</h1>
          <p className="text-xl md:text-2xl font-medium opacity-90">South Africa's #1 Stocktaking Workforce Solution</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 opacity-75">Loading... {Math.round(progress)}%</p>
        </div>

        {/* Skip Button */}
        <button onClick={onComplete} className="text-white/80 hover:text-white underline text-sm transition-colors">
          Skip
        </button>
      </div>
    </div>
  )
}
