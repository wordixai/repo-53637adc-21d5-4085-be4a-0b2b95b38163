import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Download, Settings, Code, Zap, Palette } from 'lucide-react';

const Index = () => {
  const [selectedComposition, setSelectedComposition] = useState('TechVideo');
  
  const compositions = [
    {
      id: 'TechVideo',
      title: 'Complete Tech Demo',
      description: 'Full-featured demonstration with all animation types',
      duration: '20s',
      features: ['Code Reveal', 'Logo Morph', 'Kinetic Text', 'Geometric Shapes']
    },
    {
      id: 'CodeReveal',
      title: 'Code Block Animation',
      description: 'Line-by-line code revelation with syntax highlighting',
      duration: '10s',
      features: ['Typewriter Effect', 'Syntax Highlighting', 'Smooth Transitions']
    },
    {
      id: 'LogoAnimation',
      title: 'Logo Morphing',
      description: 'Dynamic logo transformations with brand colors',
      duration: '8s',
      features: ['Color Cycling', 'Shape Morphing', 'Glow Effects']
    },
    {
      id: 'KineticTypography',
      title: 'Kinetic Typography',
      description: 'Advanced text animations with easing controls',
      duration: '12s',
      features: ['Multiple Animations', 'Timing Control', 'Letter Staggering']
    },
    {
      id: 'GeometricShapes',
      title: 'Geometric Precision',
      description: 'Mathematical shape animations with smooth interpolation',
      duration: '15s',
      features: ['Mathematical Precision', 'Smooth Interpolation', 'Grid Systems']
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Remotion Studio</h1>
                <p className="text-slate-400 text-sm">Dynamic Video Creation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                v2.0.0
              </Badge>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Composition Selector */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="w-5 h-5 mr-2 text-blue-400" />
                  Compositions
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Select a video composition to preview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {compositions.map((comp) => (
                  <Card
                    key={comp.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedComposition === comp.id
                        ? 'bg-blue-500/20 border-blue-500/50'
                        : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                    }`}
                    onClick={() => setSelectedComposition(comp.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm">{comp.title}</h3>
                          <p className="text-xs text-slate-400 mt-1">{comp.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                              {comp.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {comp.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="text-xs bg-slate-600/30 text-slate-300 border-slate-600/50"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="preview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50">
                <TabsTrigger value="preview" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  Code
                </TabsTrigger>
                <TabsTrigger value="export" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview">
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">
                        {compositions.find(c => c.id === selectedComposition)?.title}
                      </CardTitle>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                    <CardDescription className="text-slate-400">
                      {compositions.find(c => c.id === selectedComposition)?.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-slate-900 rounded-lg border-2 border-slate-700/50 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-slate-400 mb-2">Video Preview</p>
                        <p className="text-xs text-slate-500">Click Preview to render composition</p>
                      </div>
                    </div>
                    
                    {/* Animation Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <Card className="bg-slate-700/30 border-slate-600/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white text-sm mb-2">Duration</h4>
                          <p className="text-slate-400 text-xs">
                            {compositions.find(c => c.id === selectedComposition)?.duration}
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-700/30 border-slate-600/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white text-sm mb-2">Resolution</h4>
                          <p className="text-slate-400 text-xs">1920×1080 (Full HD)</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-700/30 border-slate-600/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white text-sm mb-2">Frame Rate</h4>
                          <p className="text-slate-400 text-xs">30 FPS</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code">
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Code className="w-5 h-5 mr-2 text-blue-400" />
                      Component Code
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Implementation details for {compositions.find(c => c.id === selectedComposition)?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700/50">
                      <pre className="text-sm text-slate-300 overflow-x-auto">
                        <code>{`// ${selectedComposition} Component
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const ${selectedComposition}: React.FC = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(
    frame,
    [0, 30],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  
  return (
    <div style={{ opacity }}>
      {/* Animation implementation */}
    </div>
  );
};`}</code>
                      </pre>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {compositions.find(c => c.id === selectedComposition)?.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="border-slate-600 text-slate-300"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export">
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Download className="w-5 h-5 mr-2 text-blue-400" />
                      Export Settings
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Configure and export your video composition
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-slate-700/30 border-slate-600/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white text-sm mb-3">Video Format</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="radio" name="format" defaultChecked className="text-blue-500" />
                              <label className="text-slate-300 text-sm">MP4 (H.264)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" name="format" className="text-blue-500" />
                              <label className="text-slate-300 text-sm">WebM (VP9)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" name="format" className="text-blue-500" />
                              <label className="text-slate-300 text-sm">GIF</label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-slate-700/30 border-slate-600/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-white text-sm mb-3">Quality</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input type="radio" name="quality" className="text-blue-500" />
                              <label className="text-slate-300 text-sm">High (1080p)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" name="quality" defaultChecked className="text-blue-500" />
                              <label className="text-slate-300 text-sm">Medium (720p)</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" name="quality" className="text-blue-500" />
                              <label className="text-slate-300 text-sm">Low (480p)</label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Export Video
                      </Button>
                      <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
                        Export Frame
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;