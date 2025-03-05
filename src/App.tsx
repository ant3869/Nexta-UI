
import React, { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Switch } from './components/ui/switch'
import { FloatingLabelInput } from './components/ui/floating-label-input'
import { ThemeToggle } from './components/ui/theme-toggle'
import { ProgressRing } from './components/ui/progress-ring'
import { Search, Mail, Lock, Eye, EyeOff, ChevronRight, Download, Check, X, AlertCircle, Info, Bell, User, Settings, FileText, BarChart2, Calendar } from 'lucide-react'
// Import previously unused components
import { Badge } from './components/ui/badge'
import { Tooltip } from './components/ui/tooltip'
import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastAction } from './components/ui/toast'
import { Checkbox } from './components/ui/checkbox'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './components/ui/table'
import { Skeleton } from './components/ui/skeleton'
import { Sparkline } from './components/ui/sparkline'
import { MegaMenu, MegaMenuContent, MegaMenuSection, MegaMenuSectionTitle, MegaMenuSectionItems, MegaMenuSectionItem, MegaMenuFooter } from './components/ui/mega-menu'

function App() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [switchValues, setSwitchValues] = useState({
    switch1: false,
    switch2: true,
    switch3: false
  })
  
  // State for toast notifications
  const [toasts, setToasts] = useState<{ id: string; title: string; description: string; variant: string }[]>([])
  
  // State for loading simulation
  const [isLoading, setIsLoading] = useState(true)
  
  // Sample data for sparklines
  const sparklineData1 = [10, 15, 8, 20, 18, 25, 22, 30, 28, 35]
  const sparklineData2 = [30, 25, 35, 20, 25, 15, 20, 25, 30, 20]
  const sparklineData3 = [15, 16, 18, 17, 19, 20, 22, 21, 23, 25]
  
  // Sample data for table
  const tableData = [
    { id: 1, name: 'Product A', category: 'Electronics', price: '$299.99', stock: 45 },
    { id: 2, name: 'Product B', category: 'Clothing', price: '$59.99', stock: 120 },
    { id: 3, name: 'Product C', category: 'Home', price: '$149.99', stock: 32 },
    { id: 4, name: 'Product D', category: 'Electronics', price: '$499.99', stock: 18 },
    { id: 5, name: 'Product E', category: 'Accessories', price: '$29.99', stock: 87 },
  ]
  
  // Function to add a toast notification
  const addToast = (title: string, description: string, variant: string = 'default') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, variant }])
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])
  function showToast(variant: string, message: string): void {
    const title = variant.charAt(0).toUpperCase() + variant.slice(1)
    addToast(title, message, variant)
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-foreground p-6 carbon-pattern">
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
        
        {/* Navigation with MegaMenu */}
        {/* Added MegaMenu component for enhanced navigation */}
        <nav className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">UI Library</span>
            <Badge variant="success" size="sm">v1.0</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <MegaMenu 
              trigger="Components" 
              variant="underlined"
            >
              <MegaMenuContent>
                <MegaMenuSection>
                  <MegaMenuSectionTitle>Inputs</MegaMenuSectionTitle>
                  <MegaMenuSectionItems>
                    <MegaMenuSectionItem href="#buttons">Buttons</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#inputs">Inputs</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#checkboxes">Checkboxes</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#switches">Switches</MegaMenuSectionItem>
                  </MegaMenuSectionItems>
                </MegaMenuSection>
                
                <MegaMenuSection>
                  <MegaMenuSectionTitle>Display</MegaMenuSectionTitle>
                  <MegaMenuSectionItems>
                    <MegaMenuSectionItem href="#cards">Cards</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#badges">Badges</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#tooltips">Tooltips</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#tables">Tables</MegaMenuSectionItem>
                  </MegaMenuSectionItems>
                </MegaMenuSection>
                
                <MegaMenuSection>
                  <MegaMenuSectionTitle>Feedback</MegaMenuSectionTitle>
                  <MegaMenuSectionItems>
                    <MegaMenuSectionItem href="#status-messages">Status Messages</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#toasts">Toast Notifications</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#progress">Progress Indicators</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#skeletons">Skeleton Loaders</MegaMenuSectionItem>
                  </MegaMenuSectionItems>
                </MegaMenuSection>
              </MegaMenuContent>
              <MegaMenuFooter>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Explore all components</span>
                  <Button variant="link" size="sm" className="p-0">View documentation</Button>
                </div>
              </MegaMenuFooter>
            </MegaMenu>
            
            <MegaMenu 
              trigger="Resources" 
              variant="underlined"
            >
              <MegaMenuContent className="grid-cols-2">
                <MegaMenuSection>
                  <MegaMenuSectionTitle>Documentation</MegaMenuSectionTitle>
                  <MegaMenuSectionItems>
                    <MegaMenuSectionItem href="#">Getting Started</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#">Installation</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#">Theming</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#">Customization</MegaMenuSectionItem>
                  </MegaMenuSectionItems>
                </MegaMenuSection>
                
                <MegaMenuSection>
                  <MegaMenuSectionTitle>Resources</MegaMenuSectionTitle>
                  <MegaMenuSectionItems>
                    <MegaMenuSectionItem href="#">GitHub Repository</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#">NPM Package</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#">Changelog</MegaMenuSectionItem>
                    <MegaMenuSectionItem href="#">License</MegaMenuSectionItem>
                  </MegaMenuSectionItems>
                </MegaMenuSection>
              </MegaMenuContent>
            </MegaMenu>
            
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact</Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Added tooltip to provide context for the notification button */}
            <Tooltip content="Notifications" placement="bottom">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge variant="error" size="xs" className="absolute -top-1 -right-1" count={3} maxCount={9} />
              </Button>
            </Tooltip>
            
            {/* Added tooltip to provide context for the user button */}
            <Tooltip content="User settings" placement="bottom">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Tooltip>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Modern UI Component Library</h1>
            <p className="text-xl text-muted-foreground">A collection of beautiful, accessible, and customizable UI components</p>
            
            {/* Added badges to highlight key features */}
            <div className="flex justify-center mt-4 space-x-2">
              <Badge variant="default">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="success">Accessible</Badge>
              <Badge variant="info">Customizable</Badge>
            </div>
          </header>

          {/* Buttons Section */}
          <section className="component-section" id="buttons">
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
          <section className="component-section" id="inputs">
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
          
          {/* Checkboxes Section */}
          {/* Added new section to showcase the Checkbox component */}
          <section className="component-section" id="checkboxes">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Checkboxes</h2>
            <div className="component-grid">
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Checkbox Variants</CardTitle>
                  <CardDescription>Different styles for checkboxes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Checkbox 
                    id="checkbox-default" 
                    label="Default Checkbox" 
                    description="This is the default checkbox style"
                  />
                  <Checkbox 
                    id="checkbox-circle" 
                    variant="circle" 
                    label="Circle Checkbox" 
                    description="A rounded checkbox variant"
                  />
                  <Checkbox 
                    id="checkbox-square" 
                    variant="square" 
                    label="Square Checkbox" 
                    description="A square checkbox variant"
                  />
                  <Checkbox 
                    id="checkbox-outline" 
                    variant="outline" 
                    label="Outline Checkbox" 
                    description="A checkbox with thicker borders"
                  />
                  <Checkbox 
                    id="checkbox-filled" 
                    variant="filled" 
                    label="Filled Checkbox" 
                    description="A checkbox with background fill"
                  />
                  <Checkbox 
                    id="checkbox-minimal" 
                    variant="minimal" 
                    label="Minimal Checkbox" 
                    description="A minimalist checkbox style"
                  />
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Checkbox Sizes</CardTitle>
                  <CardDescription>Different size options for checkboxes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Checkbox 
                    id="checkbox-sm" 
                    size="sm" 
                    label="Small Checkbox" 
                    description="A smaller checkbox"
                  />
                  <Checkbox 
                    id="checkbox-default-size" 
                    label="Default Size Checkbox" 
                    description="The standard checkbox size"
                  />
                  <Checkbox 
                    id="checkbox-lg" 
                    size="lg" 
                    label="Large Checkbox" 
                    description="A larger checkbox"
                  />
                  <Checkbox 
                    id="checkbox-xl" 
                    size="xl" 
                    label="Extra Large Checkbox" 
                    description="An extra large checkbox"
                  />
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Checkbox States</CardTitle>
                  <CardDescription>Different states for checkboxes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Checkbox 
                    id="checkbox-checked" 
                    defaultChecked 
                    label="Checked Checkbox" 
                    description="A checkbox in the checked state"
                  />
                  <Checkbox 
                    id="checkbox-unchecked" 
                    label="Unchecked Checkbox" 
                    description="A checkbox in the unchecked state"
                  />
                  <Checkbox 
                    id="checkbox-disabled" 
                    disabled 
                    label="Disabled Checkbox" 
                    description="A checkbox that cannot be interacted with"
                  />
                  <Checkbox 
                    id="checkbox-disabled-checked" 
                    disabled 
                    defaultChecked 
                    label="Disabled Checked Checkbox" 
                    description="A checked checkbox that cannot be interacted with"
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Cards Section */}
          <section className="component-section" id="cards">
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
          
          {/* Badges Section */}
          {/* Added new section to showcase the Badge component */}
          <section className="component-section" id="badges">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Badges</h2>
            <div className="component-grid">
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Badge Variants</CardTitle>
                  <CardDescription>Different styles for badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Badge Sizes</CardTitle>
                  <CardDescription>Different size options for badges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge size="xs">Extra Small</Badge>
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Badge Features</CardTitle>
                  <CardDescription>Additional badge features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <Badge dot>With Dot</Badge>
                    <Badge dot variant="success">Success</Badge>
                    <Badge dot variant="warning">Warning</Badge>
                    <Badge dot variant="error">Error</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Badge count={5}>Counter</Badge>
                    <Badge count={42}>Counter</Badge>
                    <Badge count={128} maxCount={99}>Max Count</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Badge removable onRemove={() => console.log('Badge removed')}>Removable</Badge>
                    <Badge variant="success" removable onRemove={() => console.log('Success badge removed')}>Success</Badge>
                    <Badge variant="error" removable onRemove={() => console.log('Error badge removed')}>Error</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Badge color="#8B5CF6">Custom Color</Badge>
                    <Badge color="#EC4899">Custom Color</Badge>
                    <Badge color="#10B981">Custom Color</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Badge pulse>Pulsing</Badge>
                    <Badge variant="error" pulse>Alert</Badge>
                    <Badge variant="success" pulse>Online</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Tooltips Section */}
          {/* Added new section to showcase the Tooltip component */}
          <section className="component-section" id="tooltips">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Tooltips</h2>
            <div className="component-grid">
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Tooltip Placements</CardTitle>
                  <CardDescription>Different positions for tooltips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 place-items-center">
                    <Tooltip content="Top tooltip" placement="top">
                      <Button variant="outline">Top</Button>
                    </Tooltip>
                    
                    <Tooltip content="Top start tooltip" placement="top-start">
                      <Button variant="outline">Top Start</Button>
                    </Tooltip>
                    
                    <Tooltip content="Top end tooltip" placement="top-end">
                      <Button variant="outline">Top End</Button>
                    </Tooltip>
                    
                    <Tooltip content="Left tooltip" placement="left">
                      <Button variant="outline">Left</Button>
                    </Tooltip>
                    
                    <Tooltip content="Center tooltip" placement="bottom">
                      <Button variant="outline">Center</Button>
                    </Tooltip>
                    
                    <Tooltip content="Right tooltip" placement="right">
                      <Button variant="outline">Right</Button>
                    </Tooltip>
                    
                    <Tooltip content="Bottom tooltip" placement="bottom">
                      <Button variant="outline">Bottom</Button>
                    </Tooltip>
                    
                    <Tooltip content="Bottom start tooltip" placement="bottom-start">
                      <Button variant="outline">Bottom Start</Button>
                    </Tooltip>
                    
                    <Tooltip content="Bottom end tooltip" placement="bottom-end">
                      <Button variant="outline">Bottom End</Button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Tooltip Variants</CardTitle>
                  <CardDescription>Different styles for tooltips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Tooltip content="Default tooltip" variant="default">
                      <Button variant="outline">Default</Button>
                    </Tooltip>
                    
                    <Tooltip content="Light tooltip" variant="light">
                      <Button variant="outline">Light</Button>
                    </Tooltip>
                    
                    <Tooltip content="Dark tooltip" variant="dark">
                      <Button variant="outline">Dark</Button>
                    </Tooltip>
                    
                    <Tooltip content="Colored tooltip" variant="colored">
                      <Button variant="outline">Colored</Button>
                    </Tooltip>
                    
                    <Tooltip content="Glass tooltip" variant="glass">
                      <Button variant="outline">Glass</Button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Tooltip Features</CardTitle>
                  <CardDescription>Additional tooltip features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Tooltip 
                      content="This tooltip has a delay before showing" 
                      delayShow={500}
                    >
                      <Button variant="outline">Delayed Show</Button>
                    </Tooltip>
                    
                    <Tooltip 
                      content="This tooltip has a delay before hiding" 
                      delayHide={1000}
                    >
                      <Button variant="outline">Delayed Hide</Button>
                    </Tooltip>
                    
                    <Tooltip 
                      content="This tooltip has no arrow" 
                      noArrow
                    >
                      <Button variant="outline">No Arrow</Button>
                    </Tooltip>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Tooltip 
                      content="This tooltip is triggered by click" 
                      trigger="click"
                    >
                      <Button variant="outline">Click Trigger</Button>
                    </Tooltip>
                    
                    <Tooltip 
                      content="This tooltip is triggered by focus" 
                      trigger="focus"
                    >
                      <Button variant="outline">Focus Trigger</Button>
                    </Tooltip>
                    
                    <Tooltip 
                      content={
                        <div className="p-2">
                          <h4 className="font-bold">Rich Content</h4>
                          <p>Tooltips can contain rich content</p>
                          <Button size="sm" className="mt-2">Action</Button>
                        </div>
                      } 
                      maxWidth="15rem"
                      interactive
                    >
                      <Button variant="outline">Rich Content</Button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Switches Section */}
          <section className="component-section" id="switches">
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
          
          {/* Tables Section */}
          {/* Added new section to showcase the Table component */}
          <section className="component-section" id="tables">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Tables</h2>
            <div className="component-grid">
              <Card variant="dark" className="col-span-full">
                <CardHeader>
                  <CardTitle>Data Table</CardTitle>
                  <CardDescription>A table for displaying structured data</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : (
                    <Table variant="modern">
                      <TableCaption>Product inventory and pricing information</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tableData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>
                              {item.stock > 50 ? (
                                <Badge variant="success">In Stock</Badge>
                              ) : item.stock > 20 ? (
                                <Badge variant="warning">Limited</Badge>
                              ) : (
                                <Badge variant="error">Low Stock</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={3}>Totals</TableCell>
                          <TableCell>$1,039.95</TableCell>
                          <TableCell>302</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  )}
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Table Variants</CardTitle>
                  <CardDescription>Different styles for tables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bordered Table</h4>
                    <Table variant="bordered">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Item 1</TableCell>
                          <TableCell>Value 1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Item 2</TableCell>
                          <TableCell>Value 2</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Striped Table</h4>
                    <Table variant="striped">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Item 1</TableCell>
                          <TableCell>Value 1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Item 2</TableCell>
                          <TableCell>Value 2</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Item 3</TableCell>
                          <TableCell>Value 3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Item 4</TableCell>
                          <TableCell>Value 4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Elegant Table</h4>
                    <Table variant="elegant">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Item 1</TableCell>
                          <TableCell>Value 1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Item 2</TableCell>
                          <TableCell>Value 2</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Sparklines Section */}
          {/* Added new section to showcase the Sparkline component */}
          <section className="component-section" id="sparklines">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Data Visualization</h2>
            <div className="component-grid">
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Sparkline Charts</CardTitle>
                  <CardDescription>Compact data visualization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Basic Sparkline</h4>
                    <Sparkline 
                      data={sparklineData1} 
                      className="w-full" 
                      showDots
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Colored Sparkline</h4>
                    <Sparkline 
                      data={sparklineData2} 
                      variant="success" 
                      className="w-full" 
                      showDots
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Gradient Sparkline</h4>
                    <Sparkline 
                      data={sparklineData3} 
                      variant="gradient" 
                      className="w-full" 
                      showDots
                      animated
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Sparkline Features</CardTitle>
                  <CardDescription>Different options for sparklines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Line Only</h4>
                    <Sparkline 
                      data={sparklineData1} 
                      className="w-full" 
                      showArea={false}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">With Dots</h4>
                    <Sparkline 
                      data={sparklineData2} 
                      className="w-full" 
                      showDots
                      dotSize={5}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Custom Stroke Width</h4>
                    <Sparkline 
                      data={sparklineData3} 
                      className="w-full" 
                      strokeWidth={4}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Animated</h4>
                    <Sparkline 
                      data={sparklineData1} 
                      className="w-full" 
                      animated
                      showDots
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Metric Cards</CardTitle>
                  <CardDescription>Combining sparklines with metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="dark">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
                            <p className="text-2xl font-bold">$12,543</p>
                          </div>
                          <Badge variant="success">+12.5%</Badge>
                        </div>
                        <Sparkline 
                          data={sparklineData1} 
                          className="w-full h-10" 
                          variant="success"
                        />
                      </CardContent>
                    </Card>
                    
                    <Card variant="dark">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Users</h3>
                            <p className="text-2xl font-bold">2,453</p>
                          </div>
                          <Badge variant="info">+5.2%</Badge>
                        </div>
                        <Sparkline 
                          data={sparklineData2} 
                          className="w-full h-10" 
                          variant="info"
                        />
                      </CardContent>
                    </Card>
                    
                    <Card variant="dark">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Conversion</h3>
                            <p className="text-2xl font-bold">3.6%</p>
                          </div>
                          <Badge variant="warning">-0.8%</Badge>
                        </div>
                        <Sparkline 
                          data={sparklineData3} 
                          className="w-full h-10" 
                          variant="warning"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Skeleton Section */}
          {/* Added new section to showcase the Skeleton component */}
          <section className="component-section" id="skeletons">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Skeleton Loaders</h2>
            <div className="component-grid">
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Skeleton Variants</CardTitle>
                  <CardDescription>Different styles for loading placeholders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Default Skeleton</h4>
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Shimmer Effect</h4>
                    <Skeleton variant="shimmer" className="h-8 w-full mb-2" />
                    <Skeleton variant="shimmer" className="h-4 w-3/4" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Gradient Effect</h4>
                    <Skeleton variant="gradient" className="h-8 w-full mb-2" />
                    <Skeleton variant="gradient" className="h-4 w-3/4" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Wave Effect</h4>
                    <Skeleton variant="wave" className="h-8 w-full mb-2" />
                    <Skeleton variant="wave" className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Content Skeletons</CardTitle>
                  <CardDescription>Skeleton loaders for common content types</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Text Content</h4>
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Card Content</h4>
                    <div className="border rounded-md p-4">
                      <Skeleton className="h-8 w-2/3 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex justify-end mt-4">
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Profile Content</h4>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>Examples of skeleton loading states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-[150px] mb-2" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                    
                    <Skeleton className="h-[1px] w-full bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-[150px] mb-2" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                    
                    <Skeleton className="h-[1px] w-full bg-gray-700" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-[150px] mb-2" />
                          <Skeleton className="h-4 w-[100px]" />
                        </div>
                      </div>
                      <Skeleton className="h-10 w-10 rounded-md" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Status Messages */}
          <section className="component-section" id="status-messages">
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
 

          {/* Toast Notifications Section */}
          {/* Added new section to showcase the Toast component */}
          <section className="component-section" id="toasts">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Toast Notifications</h2>
            <div className="component-grid">
              <Card variant="dark">
                <CardHeader>
                  <CardTitle>Toast Examples</CardTitle>
                  <CardHeader>
                    <CardTitle>Toast Examples</CardTitle>
                    <CardDescription>Interactive toast notification examples</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={() => showToast("success", "Your profile has been updated.")}>
                        Show Success Toast
                      </Button>
                      <Button onClick={() => showToast("error", "Failed to save changes. Please try again.")}>
                        Show Error Toast
                      </Button>
                      <Button onClick={() => showToast("info", "New version available. Refresh to update.")}>
                        Show Info Toast
                      </Button>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
              </div>
              </section>
              <ToastViewport />
            </div>
          </div>
        </ToastProvider>
      );
    }
          
  export default App;                  


















