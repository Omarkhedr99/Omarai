import React, { useState } from 'react';
import { 
  MessageCircle, 
  BookOpen, 
  Database, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Home,
  Search,
  FileText,
  Users,
  Bell,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobile = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'chat', label: 'المحادثة', icon: MessageCircle, color: 'text-blue-600' },
    { id: 'knowledge', label: 'المعرفة', icon: BookOpen, color: 'text-green-600' },
    { id: 'sources', label: 'المصادر', icon: Database, color: 'text-purple-600' },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3, color: 'text-orange-600' },
    { id: 'search', label: 'البحث', icon: Search, color: 'text-teal-600' },
    { id: 'documents', label: 'المستندات', icon: FileText, color: 'text-indigo-600' },
    { id: 'users', label: 'المستخدمون', icon: Users, color: 'text-pink-600' },
    { id: 'notifications', label: 'الإشعارات', icon: Bell, color: 'text-yellow-600' },
  ];

  const bottomMenuItems = [
    { id: 'help', label: 'المساعدة', icon: HelpCircle, color: 'text-gray-600' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, color: 'text-gray-600' },
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  // Mobile sidebar overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg md:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Mobile sidebar overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <img src="/icons/icon-72x72.png" alt="OMAR" className="w-8 h-8" />
                  <h2 className="text-xl font-bold text-gray-800">عمر AI</h2>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              
              <nav className="flex-1 p-4">
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={20} className={isActive ? 'text-blue-600' : item.color} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-8 pt-4 border-t space-y-2">
                  {bottomMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gray-50 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={20} className={item.color} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className={`hidden md:flex flex-col bg-white border-l border-gray-200 shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 space-x-reverse">
            <img src="/icons/icon-72x72.png" alt="OMAR" className="w-8 h-8" />
            <h2 className="text-xl font-bold text-gray-800">عمر AI</h2>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : item.color} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isCollapsed && (
                  <div className="absolute right-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Bottom menu items */}
        <div className="mt-8 pt-4 border-t space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-gray-50 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon size={20} className={item.color} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isCollapsed && (
                  <div className="absolute right-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User profile section */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">عم</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">مستخدم عمر AI</p>
              <p className="text-xs text-gray-500 truncate">مساعد ذكي متقدم</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

