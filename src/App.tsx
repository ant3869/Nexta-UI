import React, { useState } from 'react'
import { RainbowButton } from './components/ui/rainbow-button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'

function App() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground p-6 carbon-pattern">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Rainbow UI Component Library
          </h1>
          <p className="text-xl text-muted-foreground">
            Modern UI components with beautiful rainbow effects
          </p>
        </header>

        <section className="component-section">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Rainbow Buttons
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="dark">
              <CardHeader>
                <CardTitle>Primary Buttons</CardTitle>
                <CardDescription>Interactive buttons with rainbow effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RainbowButton
                  variant="primary"
                  onClick={() => setClickCount(prev => prev + 1)}
                  shortcut="Space"
                >
                  Click Me
                </RainbowButton>

                <RainbowButton
                  variant="primary"
                  shortcut="⌘S"
                >
                  Save Changes
                </RainbowButton>

                <RainbowButton
                  variant="primary"
                  disabled
                >
                  Disabled Button
                </RainbowButton>

                <RainbowButton
                  variant="primary"
                  isLoading
                >
                  Loading...
                </RainbowButton>
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Secondary Buttons</CardTitle>
                <CardDescription>Alternative style buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RainbowButton
                  variant="secondary"
                  shortcut="Esc"
                >
                  Cancel
                </RainbowButton>

                <RainbowButton
                  variant="secondary"
                >
                  Learn More
                </RainbowButton>

                <RainbowButton
                  variant="secondary"
                  className="w-full"
                >
                  Full Width Button
                </RainbowButton>
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Different size variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RainbowButton size="sm">Small Button</RainbowButton>
                <RainbowButton size="default">Default Button</RainbowButton>
                <RainbowButton size="lg">Large Button</RainbowButton>
                <RainbowButton size="icon">🌈</RainbowButton>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Button clicked: <span className="text-white font-semibold">{clickCount}</span> times
          </p>
        </div>

        <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-800 mt-8">
          <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>• Mouse-tracking rainbow glow effect</li>
            <li>• Smooth CSS custom property animations</li>
            <li>• Display P3 color space support with sRGB fallback</li>
            <li>• TypeScript interface with full type safety</li>
            <li>• Tailwind CSS integration</li>
            <li>• Accessible disabled states</li>
            <li>• Loading states</li>
            <li>• Keyboard shortcut display</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App