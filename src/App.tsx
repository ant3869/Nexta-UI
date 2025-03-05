import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Switch } from './components/ui/switch'
import { FloatingLabelInput } from './components/ui/floating-label-input'
import { ThemeToggle } from './components/ui/theme-toggle'
import { ProgressRing } from './components/ui/progress-ring'
import { Search, Mail, Lock, Eye, EyeOff, ChevronRight, Download, Check, X, AlertCircle, Info } from 'lucide-react'

function App() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [switchValues, setSwitchValues] = useState({
    switch1: false,
    switch2: true,
    switch3: false
  })

  return (
    <div className="min-h-screen bg-background text-foreground p-6 carbon-pattern">
      <div className="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Modern UI Component Library</h1>
          <p className="text-xl text-muted-foreground">A collection of beautiful, accessible, and customizable UI components</p>
        </header>

        {/* Buttons Section */}
        <section className="component-section">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Buttons</h2>
          <div className="component-grid">
            <Card variant="dark">
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different visual styles for buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button variant="gradient">Gradient</Button>
                  <Button variant="glass" className="bg-blue-500/10">Glass</Button>
                  <Button variant="3d">3D Button</Button>
                  <Button variant="dark">Dark</Button>
                </div>
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Different size options for buttons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="dark" size="sm">Small</Button>
                  <Button variant="dark" size="default">Default</Button>
                  <Button variant="dark" size="lg">Large</Button>
                  <Button variant="dark" size="xl">Extra Large</Button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="dark" size="icon" rounded="full" aria-label="Search">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="dark" size="sm" rounded="full">Small Rounded</Button>
                  <Button variant="dark" rounded="full">Default Rounded</Button>
                  <Button variant="dark" size="lg" rounded="full">Large Rounded</Button>
                </div>
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Button States</CardTitle>
                <CardDescription>Different states and variations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="dark" isLoading>Loading</Button>
                  <Button variant="dark" disabled>Disabled</Button>
                  <Button variant="dark" leftIcon={<Download className="h-4 w-4" />}>
                    Download
                  </Button>
                  <Button variant="dark" rightIcon={<ChevronRight className="h-4 w-4" />}>
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="component-section">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Inputs</h2>
          <div className="component-grid">
            <Card variant="dark">
              <CardHeader>
                <CardTitle>Input Variants</CardTitle>
                <CardDescription>Different styles for text inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input variant="dark" placeholder="Default input" />
                <Input variant="dark" placeholder="Outline input" className="border-2" />
                <Input variant="filled" placeholder="Filled input" />
                <Input variant="underlined" placeholder="Underlined input" />
                <Input variant="ghost" placeholder="Ghost input" />
                <Input 
                  variant="dark" 
                  placeholder="Search input" 
                  leftIcon={<Search className="h-4 w-4" />} 
                />
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Input with Icons</CardTitle>
                <CardDescription>Inputs with leading and trailing icons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  variant="dark"
                  placeholder="Email address" 
                  leftIcon={<Mail className="h-4 w-4" />} 
                />
                <Input 
                  variant="dark"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password" 
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    passwordVisible ? (
                      <EyeOff 
                        className="h-4 w-4 cursor-pointer" 
                        onClick={() => setPasswordVisible(false)} 
                        aria-label="Hide password"
                        role="button"
                      />
                    ) : (
                      <Eye 
                        className="h-4 w-4 cursor-pointer" 
                        onClick={() => setPasswordVisible(true)} 
                        aria-label="Show password"
                        role="button"
                      />
                    )
                  }
                />
                <Input 
                  variant="dark"
                  placeholder="Search..." 
                  leftIcon={<Search className="h-4 w-4" />} 
                  rightIcon={<X className="h-4 w-4 cursor-pointer" aria-label="Clear search" role="button" />} 
                />
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Floating Label Inputs</CardTitle>
                <CardDescription>Inputs with animated floating labels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FloatingLabelInput 
                  variant="dark"
                  label="Username" 
                />
                <FloatingLabelInput 
                  variant="dark"
                  label="Email" 
                  type="email" 
                  leftIcon={<Mail className="h-4 w-4" />} 
                />
                <FloatingLabelInput 
                  variant="dark"
                  label="Password" 
                  type={passwordVisible ? "text" : "password"}
                  leftIcon={<Lock className="h-4 w-4" />}
                  rightIcon={
                    passwordVisible ? (
                      <EyeOff 
                        className="h-4 w-4 cursor-pointer" 
                        onClick={() => setPasswordVisible(false)} 
                        aria-label="Hide password"
                        role="button"
                      />
                    ) : (
                      <Eye 
                        className="h-4 w-4 cursor-pointer" 
                        onClick={() => setPasswordVisible(true)} 
                        aria-label="Show password"
                        role="button"
                      />
                    )
                  }
                />
                <FloatingLabelInput 
                  variant="filled" 
                  label="Message" 
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="component-section">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Cards</h2>
          <div className="component-grid">
            <Card variant="dark">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>Basic card with header, content and footer</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content area of the card. You can put any content here.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button variant="dark">Submit</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>Card with elevated shadow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has an elevated shadow that increases on hover.</p>
              </CardContent>
              <CardFooter>
                <Button variant="dark" className="w-full">Learn More</Button>
              </CardFooter>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Card with hover effects</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has interactive hover effects that make it feel clickable.</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Gradient Card</CardTitle>
                <CardDescription>Card with gradient background</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a subtle gradient background effect.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Explore</Button>
              </CardFooter>
            </Card>

            <Card variant="glass" className="bg-blue-500/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>Card with glassmorphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card has a modern glass effect with background blur.</p>
              </CardContent>
              <CardFooter>
                <Button variant="glass" className="w-full bg-white/20">Continue</Button>
              </CardFooter>
            </Card>

            <Card variant="dark" className="border-blue-500/50 glow-border">
              <CardHeader>
                <CardTitle>Glow Card</CardTitle>
                <CardDescription>Card with glow effect on hover</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hover over this card to see a subtle glow effect around the border.</p>
              </CardContent>
              <CardFooter>
                <Button variant="gradient" className="w-full">Select</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Switches Section */}
        <section className="component-section">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Switches</h2>
          <div className="component-grid">
            <Card variant="dark">
              <CardHeader>
                <CardTitle>Switch Variants</CardTitle>
                <CardDescription>Different styles for toggle switches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span>Default Switch</span>
                    <Switch 
                      checked={switchValues.switch1}
                      onCheckedChange={(checked) => setSwitchValues({...switchValues, switch1: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Slim Switch</span>
                    <Switch 
                      variant="slim"
                      checked={switchValues.switch2}
                      onCheckedChange={(checked) => setSwitchValues({...switchValues, switch2: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pill Switch</span>
                    <Switch 
                      variant="pill"
                      checked={switchValues.switch3}
                      onCheckedChange={(checked) => setSwitchValues({...switchValues, switch3: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>iOS Style Switch</span>
                    <Switch 
                      variant="ios"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dark Switch</span>
                    <Switch 
                      variant="dark"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Disabled Switch</span>
                    <Switch disabled checked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Progress Indicators</CardTitle>
                <CardDescription>Circular progress indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 justify-center">
                  <ProgressRing value={25} color="rgba(59, 130, 246, 0.8)" bgColor="rgba(30, 41, 59, 0.5)" />
                  <ProgressRing value={50} color="rgba(139, 92, 246, 0.8)" bgColor="rgba(30, 41, 59, 0.5)" />
                  <ProgressRing value={75} color="rgba(14, 165, 233, 0.8)" bgColor="rgba(30, 41, 59, 0.5)" />
                  <ProgressRing value={100} color="rgba(34, 197, 94, 0.8)" bgColor="rgba(30, 41, 59, 0.5)" />
                  
                  <ProgressRing 
                    value={65} 
                    size={100} 
                    strokeWidth={10}
                    color="rgba(59, 130, 246, 0.8)"
                    bgColor="rgba(30, 41, 59, 0.5)"
                  />
                  
                  <ProgressRing 
                    value={42} 
                    size={60} 
                    strokeWidth={4}
                    showValue={false}
                    color="rgba(139, 92, 246, 0.8)"
                    bgColor="rgba(30, 41, 59, 0.5)"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Status Messages */}
        <section className="component-section">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Status Messages</h2>
          <div className="component-grid">
            <Card variant="dark">
              <CardHeader>
                <CardTitle>Alert Messages</CardTitle>
                <CardDescription>Different types of status alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-900/30 border border-green-700 text-green-300 rounded-md p-4 flex items-start neo-card">
                  <Check className="h-5 w-5 mr-3 mt-0.5 text-green-400" />
                  <div>
                    <h4 className="font-medium">Success Message</h4>
                    <p className="text-sm opacity-80">Your changes have been saved successfully.</p>
                  </div>
                </div>
                
                <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-md p-4 flex items-start neo-card">
                  <X className="h-5 w-5 mr-3 mt-0.5 text-red-400" />
                  <div>
                    <h4 className="font-medium">Error Message</h4>
                    <p className="text-sm opacity-80">There was a problem processing your request.</p>
                  </div>
                </div>
                
                <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 rounded-md p-4 flex items-start neo-card">
                  <AlertCircle className="h-5 w-5 mr-3 mt-0.5 text-yellow-400" />
                  <div>
                    <h4 className="font-medium">Warning Message</h4>
                    <p className="text-sm opacity-80">Please review your information before continuing.</p>
                  </div>
                </div>
                
                <div className="bg-blue-900/30 border border-blue-700 text-blue-300 rounded-md p-4 flex items-start neo-card">
                  <Info className="h-5 w-5 mr-3 mt-0.5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">Information Message</h4>
                    <p className="text-sm opacity-80">This feature will be available in the next update.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="dark">
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>Popup notification examples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-800/80 border border-gray-700 shadow-lg rounded-lg p-4 flex items-start max-w-sm neo-card">
                  <Check className="h-5 w-5 mr-3 mt-0.5 text-green-400" />
                  <div className="flex-1">
                    <h4 className="font-medium">Success Toast</h4>
                    <p className="text-sm text-gray-400">Your profile has been updated.</p>
                  </div>
                  <button type="button" className="text-gray-400 hover:text-white" aria-label="Close notification">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="bg-gray-800/80 border border-gray-700 shadow-lg rounded-lg p-4 flex items-start max-w-sm neo-card">
                  <AlertCircle className="h-5 w-5 mr-3 mt-0.5 text-red-400" />
                  <div className="flex-1">
                    <h4 className="font-medium">Error Toast</h4>
                    <p className="text-sm text-gray-400">Failed to save changes. Please try again.</p>
                  </div>
                  <button type="button" className="text-gray-400 hover:text-white" aria-label="Close notification">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="bg-gray-800/80 border border-gray-700 shadow-lg rounded-lg p-4 flex items-start max-w-sm neo-card">
                  <Info className="h-5 w-5 mr-3 mt-0.5 text-blue-400" />
                  <div className="flex-1">
                    <h4 className="font-medium">Info Toast</h4>
                    <p className="text-sm text-gray-400">New version available. Refresh to update.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">Later</Button>
                    <Button size="sm" variant="dark">Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
