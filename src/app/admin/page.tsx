'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, User, LogOut, Settings, DollarSign, HelpCircle, Link2, Home, Lock, RefreshCw, ArrowLeft, Mail, Shield, BarChart3, TrendingUp, MousePointer, Eye as EyeIcon, Calendar } from 'lucide-react';
import { getContent, type ContentData } from '@/lib/content';
import { AnalyticsStats } from '@/lib/analytics';

interface AdminUser {
  email: string;
  name: string;
}

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('pricing');
  const [content, setContent] = useState<ContentData>(getContent());
  const [previewMode, setPreviewMode] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    error: '',
    isLoading: false
  });

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginForm(prev => ({ ...prev, isLoading: true, error: '' }));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('admin_token', data.token);
        setLoginForm({ email: '', password: '', error: '', isLoading: false });
      } else {
        setLoginForm(prev => ({ 
          ...prev, 
          error: data.error || 'Login failed', 
          isLoading: false 
        }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginForm(prev => ({ 
        ...prev, 
        error: 'Network error. Please try again.', 
        isLoading: false 
      }));
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
             .then(data => {
         if (data.user) {
           setUser(data.user);
           loadFreshContent(); // Load fresh content after login
           loadAnalytics(); // Load analytics after login
         } else {
           localStorage.removeItem('admin_token');
         }
         setLoading(false);
       })
      .catch((error) => {
        console.error('Token verification failed:', error);
        localStorage.removeItem('admin_token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  const loadFreshContent = async () => {
    setContentLoading(true);
    try {
      const response = await fetch('/api/content/get', {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (response.ok) {
        const freshContent = await response.json();
        setContent(freshContent);
      }
    } catch (error) {
      console.error('Error loading fresh content:', error);
    }
         setContentLoading(false);
   };

   const loadAnalytics = async () => {
     setAnalyticsLoading(true);
     try {
       const token = localStorage.getItem('admin_token');
       const response = await fetch('/api/analytics/stats', {
         headers: { 
           'Authorization': `Bearer ${token}`,
           'Cache-Control': 'no-cache' 
         }
       });
       if (response.ok) {
         const analyticsData = await response.json();
         setAnalytics(analyticsData);
       }
     } catch (error) {
       console.error('Error loading analytics:', error);
     }
     setAnalyticsLoading(false);
   };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/content/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Content updated successfully! Changes will be deployed automatically.');
        // Refresh content after successful save
        setTimeout(() => {
          loadFreshContent();
        }, 2000); // Wait 2 seconds for GitHub to process the commit
      } else {
        throw new Error(result.error || 'Failed to update content');
      }
    } catch (error) {
      alert(`Error updating content: ${error instanceof Error ? error.message : 'Please try again.'}`);
      console.error(error);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Modern background with gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgb(var(--primary) / 0.15) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgb(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px',
            backgroundPosition: '0 0, 30px 30px',
            animation: 'meshFloat 20s ease-in-out infinite'
          }} />
        </div>
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Go back button */}
            <motion.button
              onClick={() => window.history.back()}
              className="mb-8 flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group"
              whileHover={{ x: -2 }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
              <span className="text-sm">Back to website</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl"
            >
              {/* Header with logo styling */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative w-20 h-20 mx-auto mb-6"
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                    <Shield className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-2">
                    Spleux Admin
                  </h1>
                  <p className="text-muted-foreground">Secure content management portal</p>
                </motion.div>
              </div>
              
              <motion.form
                onSubmit={handleLogin}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {loginForm.error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>{loginForm.error}</span>
                  </motion.div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50"
                        placeholder="admin@spleux.com"
                        required
                        disabled={loginForm.isLoading}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3 text-foreground">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50"
                        placeholder="••••••••"
                        required
                        disabled={loginForm.isLoading}
                      />
                    </div>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={loginForm.isLoading}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
                  whileHover={{ scale: loginForm.isLoading ? 1 : 1.02, y: loginForm.isLoading ? 0 : -1 }}
                  whileTap={{ scale: loginForm.isLoading ? 1 : 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {loginForm.isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Access Dashboard</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
              
              {/* Security indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-6 flex items-center justify-center space-x-2 text-xs text-muted-foreground"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Secure encrypted connection</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

     const tabs = [
     { id: 'statistics', label: 'Statistics', icon: BarChart3 },
     { id: 'hero', label: 'Hero', icon: Home },
     { id: 'pricing', label: 'Pricing', icon: DollarSign },
     { id: 'faq', label: 'FAQ', icon: HelpCircle },
     { id: 'links', label: 'Links', icon: Link2 },
   ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Modern gradient background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgb(var(--primary) / 0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgb(var(--primary) / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px',
          backgroundPosition: '0 0, 30px 30px',
          animation: 'meshFloat 20s ease-in-out infinite'
        }} />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 sticky top-0 z-50 backdrop-blur-xl shadow-sm">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Spleux Admin</h1>
                <p className="text-sm text-muted-foreground">Content Management Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile responsive buttons */}
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl border border-border/50 hover:bg-accent/50 transition-all backdrop-blur-sm"
                >
                  {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm hidden lg:inline">{previewMode ? 'Edit' : 'Preview'}</span>
                </button>
                
                <button
                  onClick={loadFreshContent}
                  disabled={contentLoading}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl border border-border/50 hover:bg-accent/50 transition-all disabled:opacity-50 backdrop-blur-sm"
                >
                  <RefreshCw className={`w-4 h-4 ${contentLoading ? 'animate-spin' : ''}`} />
                  <span className="text-sm hidden lg:inline">{contentLoading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
              
              {/* Mobile buttons */}
              <div className="flex sm:hidden space-x-1">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="p-2 rounded-xl border border-border/50 hover:bg-accent/50 transition-all"
                >
                  {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={loadFreshContent}
                  disabled={contentLoading}
                  className="p-2 rounded-xl border border-border/50 hover:bg-accent/50 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${contentLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <motion.button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-semibold flex items-center space-x-2 disabled:opacity-50 shadow-lg shadow-primary/25"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save Changes'}</span>
                <span className="sm:hidden">{saving ? '...' : 'Save'}</span>
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium hidden md:inline">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-accent/50 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-responsive py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
                             {/* Mobile tabs */}
               <div className="lg:hidden mb-6">
                 <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-2 shadow-lg">
                   <div className="grid grid-cols-5 gap-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex flex-col items-center space-y-1 px-3 py-3 rounded-xl text-center transition-all ${
                            activeTab === tab.id
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Desktop sidebar */}
              <nav className="hidden lg:block space-y-2">
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-3">Content Sections</h2>
                </div>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all group ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                          : 'hover:bg-accent/50 border border-transparent hover:border-border/50'
                      }`}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? '' : 'group-hover:text-primary'}`} />
                      <span className="font-medium">{tab.label}</span>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto w-2 h-2 bg-primary-foreground rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
                             className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 lg:p-8 shadow-xl"
             >
               {activeTab === 'statistics' && (
                 <StatisticsView analytics={analytics} loading={analyticsLoading} onRefresh={loadAnalytics} />
               )}
               {activeTab === 'hero' && (
                 <HeroEditor content={content} setContent={setContent} previewMode={previewMode} />
               )}
               {activeTab === 'pricing' && (
                 <PricingEditor content={content} setContent={setContent} previewMode={previewMode} />
               )}
               {activeTab === 'faq' && (
                 <FAQEditor content={content} setContent={setContent} previewMode={previewMode} />
               )}
               {activeTab === 'links' && (
                 <LinksEditor content={content} setContent={setContent} previewMode={previewMode} />
               )}
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pricing Editor Component
function PricingEditor({ content, setContent, previewMode }: {
  content: ContentData;
  setContent: (content: ContentData) => void;
  previewMode: boolean;
}) {
  const updatePricing = (field: string, value: unknown) => {
    setContent({
      ...content,
      pricing: {
        ...content.pricing,
        [field]: value
      }
    });
  };

  const updatePlan = (index: number, field: string, value: unknown) => {
    const newPlans = [...content.pricing.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    updatePricing('plans', newPlans);
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{content.pricing.title}</h2>
        <p className="text-muted-foreground">{content.pricing.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.pricing.plans.map((plan, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <h3 className="font-semibold">{plan.name}</h3>
              <div className="text-2xl font-bold text-primary">{plan.price}<span className="text-sm text-muted-foreground">{plan.period}</span></div>
              <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              <button className="w-full mt-4 py-2 px-4 bg-primary text-primary-foreground rounded-lg">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Pricing Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <input
            type="text"
            value={content.pricing.title}
            onChange={(e) => updatePricing('title', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Section Subtitle</label>
          <textarea
            value={content.pricing.subtitle}
            onChange={(e) => updatePricing('subtitle', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Pricing Plans</h3>
        {content.pricing.plans.map((plan, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-4">
            <h4 className="font-medium">Plan {index + 1}: {plan.name}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Plan Name</label>
                <input
                  type="text"
                  value={plan.name}
                  onChange={(e) => updatePlan(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="text"
                  value={plan.price}
                  onChange={(e) => updatePlan(index, 'price', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Period</label>
                <input
                  type="text"
                  value={plan.period}
                  onChange={(e) => updatePlan(index, 'period', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Original Price (optional)</label>
                <input
                  type="text"
                  value={plan.originalPrice || ''}
                  onChange={(e) => updatePlan(index, 'originalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={plan.description}
                onChange={(e) => updatePlan(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Text</label>
              <input
                type="text"
                value={plan.cta}
                onChange={(e) => updatePlan(index, 'cta', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FAQ Editor Component
function FAQEditor({ content, setContent, previewMode }: {
  content: ContentData;
  setContent: (content: ContentData) => void;
  previewMode: boolean;
}) {
  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const newFAQ = [...content.faq];
    newFAQ[index] = { ...newFAQ[index], [field]: value };
    setContent({ ...content, faq: newFAQ });
  };

  const addFAQ = () => {
    setContent({
      ...content,
      faq: [...content.faq, { question: '', answer: '' }]
    });
  };

  const removeFAQ = (index: number) => {
    const newFAQ = content.faq.filter((_, i) => i !== index);
    setContent({ ...content, faq: newFAQ });
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {content.faq.map((item, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">FAQ Management</h2>
        <button
          onClick={addFAQ}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium"
        >
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {content.faq.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">FAQ {index + 1}</h3>
              <button
                onClick={() => removeFAQ(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <input
                type="text"
                value={item.question}
                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Answer</label>
              <textarea
                value={item.answer}
                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Links Editor Component
function LinksEditor({ content, setContent, previewMode }: {
  content: ContentData;
  setContent: (content: ContentData) => void;
  previewMode: boolean;
}) {
  const updatePrimaryLink = (key: 'contact' | 'academy', value: string) => {
    setContent({
      ...content,
      links: {
        ...content.links,
        primary: {
          ...content.links.primary,
          [key]: value
        }
      }
    });
  };

  const updateFooterLink = (section: 'company' | 'legal', index: number, field: 'name' | 'url', value: string) => {
    const newLinks = [...content.links.footer[section]];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setContent({
      ...content,
      links: {
        ...content.links,
        footer: {
          ...content.links.footer,
          [section]: newLinks
        }
      }
    });
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Links Preview</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Primary Links</h3>
              <p>Contact: {content.links.primary.contact}</p>
              <p>Academy: {content.links.primary.academy}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Footer - Company</h3>
              {content.links.footer.company.map((link, index) => (
                <p key={index}>{link.name}: {link.url}</p>
              ))}
            </div>
            
            <div>
              <h3 className="font-semibold">Footer - Legal</h3>
              {content.links.footer.legal.map((link, index) => (
                <p key={index}>{link.name}: {link.url}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links Management</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Primary Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contact Link (Telegram)</label>
              <input
                type="url"
                value={content.links.primary.contact}
                onChange={(e) => updatePrimaryLink('contact', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Academy Link (Telegram)</label>
              <input
                type="url"
                value={content.links.primary.academy}
                onChange={(e) => updatePrimaryLink('academy', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Footer Links - Company</h3>
          <div className="space-y-4">
            {content.links.footer.company.map((link, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => updateFooterLink('company', index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateFooterLink('company', index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Footer Links - Legal</h3>
          <div className="space-y-4">
            {content.links.footer.legal.map((link, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => updateFooterLink('legal', index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateFooterLink('legal', index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Editor Component
function HeroEditor({ content, setContent, previewMode }: {
  content: ContentData;
  setContent: (content: ContentData) => void;
  previewMode: boolean;
}) {
  const updateHero = (field: string, value: unknown) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value
      }
    });
  };

  const updateStats = (key: string, value: string) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        stats: {
          ...content.hero.stats,
          [key]: value
        }
      }
    });
  };

  const updateCTA = (field: string, value: string) => {
    setContent({
      ...content,
      cta: {
        ...content.cta,
        [field]: value
      }
    });
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">{content.hero.title}</h2>
          <p className="text-muted-foreground mt-2">{content.hero.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{content.hero.stats.winRate}</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{content.hero.stats.members}</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{content.hero.stats.vip}</div>
            <div className="text-sm text-muted-foreground">VIP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{content.hero.stats.support}</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{content.hero.stats.experience}</div>
            <div className="text-sm text-muted-foreground">Years</div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">{content.cta.title}</h3>
          <p className="text-muted-foreground">{content.cta.subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hero & CTA Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Win Rate</label>
              <input
                type="text"
                value={content.hero.stats.winRate}
                onChange={(e) => updateStats('winRate', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Members</label>
              <input
                type="text"
                value={content.hero.stats.members}
                onChange={(e) => updateStats('members', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">VIP</label>
              <input
                type="text"
                value={content.hero.stats.vip}
                onChange={(e) => updateStats('vip', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Support</label>
              <input
                type="text"
                value={content.hero.stats.support}
                onChange={(e) => updateStats('support', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Experience</label>
              <input
                type="text"
                value={content.hero.stats.experience}
                onChange={(e) => updateStats('experience', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Call to Action Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">CTA Title</label>
              <input
                type="text"
                value={content.cta.title}
                onChange={(e) => updateCTA('title', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">CTA Subtitle</label>
              <textarea
                value={content.cta.subtitle}
                onChange={(e) => updateCTA('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Statistics View Component
function StatisticsView({ analytics, loading, onRefresh }: {
  analytics: AnalyticsStats | null;
  loading: boolean;
  onRefresh: () => void;
}) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Website Analytics</h2>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-accent/20 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-accent rounded mb-2"></div>
              <div className="h-8 bg-accent rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Website Analytics</h2>
          <motion.button
            onClick={onRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Load Analytics</span>
          </motion.button>
        </div>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No analytics data available</p>
          <p className="text-sm text-muted-foreground mt-2">Click "Load Analytics" to fetch data</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, trend, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend?: string;
    subtitle?: string;
  }) => (
    <motion.div
      className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl lg:text-3xl font-bold">{value.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground/70">{subtitle}</p>}
      </div>
    </motion.div>
  );

  const TopItemsList = ({ title, items, icon: Icon }: {
    title: string;
    items: { [key: string]: number };
    icon: React.ElementType;
  }) => {
    const sortedItems = Object.entries(items)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return (
      <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="space-y-3">
          {sortedItems.length > 0 ? sortedItems.map(([item, count], index) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' :
                  index === 2 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium truncate max-w-[150px] lg:max-w-[200px]" title={item}>
                  {item}
                </span>
              </div>
              <span className="text-sm font-semibold text-primary">{count}</span>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground">No data available</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Website Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(analytics.lastUpdated).toLocaleString()}
          </p>
        </div>
        <motion.button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium disabled:opacity-50"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </motion.button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Page Views"
          value={analytics.pageViews.total}
          icon={EyeIcon}
          subtitle="All time"
        />
        <StatCard
          title="Unique Visitors"
          value={analytics.visitors.total}
          icon={User}
          subtitle="All time"
        />
        <StatCard
          title="Button Clicks"
          value={analytics.buttonClicks.total}
          icon={MousePointer}
          subtitle="All time"
        />
        <StatCard
          title="Today's Views"
          value={analytics.pageViews.today}
          icon={Calendar}
          trend={analytics.pageViews.today > 0 ? '+' + analytics.pageViews.today : '0'}
        />
      </div>

      {/* Period Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span>Page Views</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Today</span>
              <span className="font-semibold">{analytics.pageViews.today}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="font-semibold">{analytics.pageViews.thisWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="font-semibold">{analytics.pageViews.thisMonth}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <User className="w-4 h-4 text-primary" />
            <span>Visitors</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Today</span>
              <span className="font-semibold">{analytics.visitors.today}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="font-semibold">{analytics.visitors.thisWeek}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="font-semibold">{analytics.visitors.thisMonth}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-4 lg:p-6 border border-border/50 shadow-sm">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <Settings className="w-4 h-4 text-primary" />
            <span>Device Stats</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Desktop</span>
              <span className="font-semibold">{analytics.deviceStats.desktop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Mobile</span>
              <span className="font-semibold">{analytics.deviceStats.mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tablet</span>
              <span className="font-semibold">{analytics.deviceStats.tablet}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopItemsList
          title="Most Visited Pages"
          items={analytics.pageViews.pages}
          icon={EyeIcon}
        />
        <TopItemsList
          title="Most Clicked Buttons"
          items={analytics.buttonClicks.buttons}
          icon={MousePointer}
        />
      </div>

      {/* Additional Stats */}
      {Object.keys(analytics.linkClicks.links).length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopItemsList
            title="Most Clicked Links"
            items={analytics.linkClicks.links}
            icon={Link2}
          />
          {Object.keys(analytics.topReferrers).length > 0 && (
            <TopItemsList
              title="Top Referrers"
              items={analytics.topReferrers}
              icon={TrendingUp}
            />
          )}
        </div>
      )}
    </div>
  );
}