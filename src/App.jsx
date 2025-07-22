import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Bot, 
  MessageSquare, 
  Database, 
  Settings, 
  Send, 
  Upload, 
  Search,
  Brain,
  Zap,
  Globe,
  FileText,
  Image,
  Music,
  Video,
  Github,
  Slack,
  Mail,
  Twitter,
  Linkedin,
  Activity,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m Omarai, your AI agent powered by Graphlit. I can help you ingest content from various sources, search through your knowledge base, and provide intelligent responses. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalContents: 1247,
    totalCollections: 23,
    totalFeeds: 8,
    activeConversations: 5,
    creditsUsed: 850,
    tokensUsed: 125000
  })

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'ingest', source: 'GitHub Repository', status: 'completed', time: '2 minutes ago' },
    { id: 2, type: 'search', query: 'AI development best practices', status: 'completed', time: '5 minutes ago' },
    { id: 3, type: 'ingest', source: 'Slack Channel #engineering', status: 'in-progress', time: '10 minutes ago' },
    { id: 4, type: 'conversation', query: 'Explain machine learning concepts', status: 'completed', time: '15 minutes ago' }
  ])

  const [connectedSources, setConnectedSources] = useState([
    { name: 'GitHub', icon: Github, status: 'connected', count: 15 },
    { name: 'Slack', icon: Slack, status: 'connected', count: 8 },
    { name: 'Email', icon: Mail, status: 'connected', count: 234 },
    { name: 'Twitter', icon: Twitter, status: 'disconnected', count: 0 },
    { name: 'LinkedIn', icon: Linkedin, status: 'connected', count: 45 }
  ])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: `I understand you're asking about "${inputMessage}". Based on your Graphlit knowledge base, I can help you with that. This is a simulated response - in the full implementation, this would connect to the Graphlit MCP Server to provide real AI-powered responses using your ingested content.`,
        timestamp: new Date().toLocaleTimeString()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Omarai</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI Agent Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>Knowledge</span>
            </TabsTrigger>
            <TabsTrigger value="sources" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Sources</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span>AI Assistant</span>
                    </CardTitle>
                    <CardDescription>
                      Chat with your AI agent powered by Graphlit knowledge base
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.type === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                              <div className="flex items-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                    <Separator className="my-4" />
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Ask me anything about your knowledge base..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 min-h-[60px] resize-none"
                        disabled={isLoading}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={isLoading || !inputMessage.trim()}
                        className="self-end"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Contents</span>
                      <Badge variant="secondary">{stats.totalContents.toLocaleString()}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Collections</span>
                      <Badge variant="secondary">{stats.totalCollections}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Feeds</span>
                      <Badge variant="secondary">{stats.totalFeeds}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Conversations</span>
                      <Badge variant="secondary">{stats.activeConversations}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-3">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'completed' ? 'bg-green-500' : 
                              activity.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{activity.source || activity.query}</p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Tab */}
          <TabsContent value="knowledge" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalContents * 0.4).toFixed(0)}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PDF, DOCX, TXT files</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Image className="h-5 w-5 text-green-600" />
                    <span>Images</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalContents * 0.3).toFixed(0)}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">JPG, PNG, GIF files</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Music className="h-5 w-5 text-purple-600" />
                    <span>Audio</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalContents * 0.2).toFixed(0)}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">MP3, WAV files</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="h-5 w-5 text-red-600" />
                    <span>Videos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalContents * 0.1).toFixed(0)}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">MP4, AVI files</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                    <span>Messages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalContents * 0.6).toFixed(0)}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Slack, Discord, Email</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-cyan-600" />
                    <span>Web Pages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.totalContents * 0.5).toFixed(0)}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Crawled websites</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Search Knowledge Base</CardTitle>
                <CardDescription>
                  Search through your ingested content using AI-powered semantic search
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input placeholder="Search your knowledge base..." className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connectedSources.map((source) => {
                const IconComponent = source.icon
                return (
                  <Card key={source.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-5 w-5" />
                          <span>{source.name}</span>
                        </div>
                        <Badge 
                          variant={source.status === 'connected' ? 'default' : 'secondary'}
                          className={source.status === 'connected' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {source.status === 'connected' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {source.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{source.count}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {source.status === 'connected' ? 'Items ingested' : 'Not connected'}
                      </p>
                      <Button 
                        variant={source.status === 'connected' ? 'outline' : 'default'} 
                        className="w-full mt-4"
                      >
                        {source.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New Source</CardTitle>
                <CardDescription>
                  Connect new data sources to expand your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload Files</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Globe className="h-6 w-6" />
                    <span className="text-sm">Web Crawl</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Database className="h-6 w-6" />
                    <span className="text-sm">Database</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Zap className="h-6 w-6" />
                    <span className="text-sm">API</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span>Total Users</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <span>Conversations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeConversations}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span>Credits Used</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.creditsUsed}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Out of 1000</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <span>Tokens</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.tokensUsed / 1000).toFixed(0)}K</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">LLM tokens used</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Usage Over Time</CardTitle>
                <CardDescription>
                  Monitor your platform usage and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics charts would be displayed here</p>
                    <p className="text-sm">Connected to Recharts for data visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

