import React, { useState, useEffect } from 'react';
import { MessageCircle, BookOpen, Database, BarChart3, Settings, Send, Bot, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'مرحباً! أنا عمر، مساعدك الذكي المدعوم بـ Graphlit. يمكنني مساعدتك في استيعاب المحتوى من مصادر مختلفة، والبحث في قاعدة المعرفة الخاصة بك، وتقديم إجابات ذكية. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date().toLocaleTimeString('ar-SA')
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('ar-SA')
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/graphlit/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.response || 'عذراً، واجهت مشكلة في معالجة طلبك. يرجى التأكد من أن خادم Graphlit MCP مُكوّن بشكل صحيح ويعمل.',
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
        timestamp: new Date().toLocaleTimeString('ar-SA')
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">مساعد الذكاء الاصطناعي</h2>
                  <p className="text-sm text-gray-500">محادثة مع مساعدك الذكي المدعوم بـ Graphlit</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2 space-x-reverse">
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      ) : (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2 space-x-reverse">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اسألني أي شيء عن قاعدة المعرفة الخاصة بك..."
                  className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'knowledge':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة المعرفة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'المحتوى', count: '1,247', color: 'bg-blue-500' },
                { label: 'المجموعات', count: '23', color: 'bg-green-500' },
                { label: 'التغذية النشطة', count: '8', color: 'bg-purple-500' },
                { label: 'المحادثات', count: '5', color: 'bg-orange-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'sources':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">مصادر البيانات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'GitHub Repository', status: 'متصل', lastSync: 'منذ دقيقتين', color: 'text-green-600' },
                { name: 'AI development best practices', status: 'متصل', lastSync: 'منذ 5 دقائق', color: 'text-green-600' },
                { name: 'Slack Channel #engineering', status: 'متصل', lastSync: 'منذ 10 دقائق', color: 'text-yellow-600' },
                { name: 'Explain machine learning concepts', status: 'متصل', lastSync: 'منذ 15 دقيقة', color: 'text-green-600' }
              ].map((source, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <Database className="w-8 h-8 text-blue-600" />
                    <span className={`px-2 py-1 text-xs rounded-full ${source.color} bg-opacity-10`}>
                      {source.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{source.name}</h3>
                  <p className="text-sm text-gray-600">آخر مزامنة: {source.lastSync}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">التحليلات والإحصائيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'المستخدمون النشطون', count: '1,234', change: '+12%', color: 'text-green-600' },
                { label: 'المحادثات', count: '5,678', change: '+8%', color: 'text-blue-600' },
                { label: 'الاستعلامات', count: '12,345', change: '+15%', color: 'text-purple-600' },
                { label: 'معدل الرضا', count: '94%', change: '+2%', color: 'text-orange-600' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                    <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الإعدادات</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إعدادات خادم MCP</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط خادم MCP
                  </label>
                  <input
                    type="text"
                    placeholder="http://your-graphlit-server.com:port"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رمز المصادقة
                  </label>
                  <input
                    type="password"
                    placeholder="your_api_key_or_token"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    معرف المشروع
                  </label>
                  <input
                    type="text"
                    placeholder="project_xyz"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  حفظ الإعدادات
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">قريباً...</h2>
            <p className="text-gray-600">هذه الميزة قيد التطوير.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 rtl" dir="rtl">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img src="/icons/icon-72x72.png" alt="OMAR" className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">عمر - منصة الذكاء الاصطناعي</h1>
                <p className="text-sm text-gray-600">مساعدك الذكي المدعوم بـ Graphlit</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">متصل</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-hidden">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default App;

