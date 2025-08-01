'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, User, LogOut, Settings, DollarSign, HelpCircle, Link2, Home, Lock, RefreshCw } from 'lucide-react';
import { getContent, type ContentData, type PricingPlan, type FAQItem, type LinkItem } from '@/lib/content';

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
        } else {
          localStorage.removeItem('admin_token');
        }
        setLoading(false);
      })
      .catch(() => {
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Spleux Admin</h1>
            <p className="text-muted-foreground">Sign in to manage your website content</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {loginForm.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {loginForm.error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="admin@example.com"
                required
                disabled={loginForm.isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                required
                disabled={loginForm.isLoading}
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={loginForm.isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-3 transition-colors disabled:opacity-50"
              whileHover={{ scale: loginForm.isLoading ? 1 : 1.02 }}
              whileTap={{ scale: loginForm.isLoading ? 1 : 0.98 }}
            >
              {loginForm.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'links', label: 'Links', icon: Link2 },
    { id: 'hero', label: 'Hero', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold">Spleux Admin</h1>
                <p className="text-sm text-muted-foreground">Content Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
              
              <button
                onClick={loadFreshContent}
                disabled={contentLoading}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-accent transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${contentLoading ? 'animate-spin' : ''}`} />
                <span className="text-sm">{contentLoading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              <motion.button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-responsive py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border border-border p-6">
              {activeTab === 'pricing' && (
                <PricingEditor content={content} setContent={setContent} previewMode={previewMode} />
              )}
              {activeTab === 'faq' && (
                <FAQEditor content={content} setContent={setContent} previewMode={previewMode} />
              )}
              {activeTab === 'links' && (
                <LinksEditor content={content} setContent={setContent} previewMode={previewMode} />
              )}
              {activeTab === 'hero' && (
                <HeroEditor content={content} setContent={setContent} previewMode={previewMode} />
              )}
            </div>
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
  const updatePricing = (field: string, value: any) => {
    setContent({
      ...content,
      pricing: {
        ...content.pricing,
        [field]: value
      }
    });
  };

  const updatePlan = (index: number, field: string, value: any) => {
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
  const updateHero = (field: string, value: any) => {
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