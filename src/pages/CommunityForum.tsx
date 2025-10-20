import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, User, Clock, ThumbsUp, MessageCircle, Pin, TrendingUp } from 'lucide-react';

const CommunityForum = () => {
  const categories = [
    { name: 'General Discussion', topics: 1234, posts: 5678, color: 'bg-blue-500/10 border-blue-500/30' },
    { name: 'Trading & Markets', topics: 892, posts: 3456, color: 'bg-green-500/10 border-green-500/30' },
    { name: 'Technical Support', topics: 456, posts: 1890, color: 'bg-orange-500/10 border-orange-500/30' },
    { name: 'Announcements', topics: 89, posts: 432, color: 'bg-purple-500/10 border-purple-500/30' },
    { name: 'Feature Requests', topics: 234, posts: 987, color: 'bg-pink-500/10 border-pink-500/30' },
    { name: 'Community Events', topics: 145, posts: 678, color: 'bg-yellow-500/10 border-yellow-500/30' },
  ];

  const popularTopics = [
    {
      title: 'How to maximize BIT staking rewards?',
      author: 'CryptoEnthusiast',
      replies: 45,
      likes: 123,
      category: 'Trading & Markets',
      isPinned: true,
      lastActivity: '2 hours ago'
    },
    {
      title: 'BIT Access roadmap 2025 - What to expect',
      author: 'BitAccessTeam',
      replies: 78,
      likes: 256,
      category: 'Announcements',
      isPinned: true,
      lastActivity: '5 hours ago'
    },
    {
      title: 'Question about wallet connection',
      author: 'NewUser123',
      replies: 12,
      likes: 34,
      category: 'Technical Support',
      isPinned: false,
      lastActivity: '1 hour ago'
    },
    {
      title: 'Merchant integration success story',
      author: 'MerchantJohn',
      replies: 23,
      likes: 89,
      category: 'General Discussion',
      isPinned: false,
      lastActivity: '3 hours ago'
    },
    {
      title: 'Feature request: Mobile app development',
      author: 'TechGuru',
      replies: 56,
      likes: 167,
      category: 'Feature Requests',
      isPinned: false,
      lastActivity: '4 hours ago'
    },
  ];

  const topContributors = [
    { name: 'CryptoMaster', posts: 456, reputation: 2340 },
    { name: 'BlockchainPro', posts: 389, reputation: 1890 },
    { name: 'DeFiExpert', posts: 312, reputation: 1567 },
    { name: 'BitEnthusiast', posts: 287, reputation: 1423 },
    { name: 'TokenTrader', posts: 245, reputation: 1298 },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-gold">Community Forum</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect, discuss, and grow with the BIT Access community
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full text-left p-3 rounded-lg ${category.color} border hover:border-primary/50 transition-all`}
                    >
                      <p className="font-semibold text-sm">{category.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.topics} topics • {category.posts} posts
                      </p>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">{contributor.reputation}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Forum Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-10 h-10 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-primary">3,050</p>
                  <p className="text-sm text-muted-foreground">Total Topics</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-500">13,121</p>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
                <CardContent className="p-6 text-center">
                  <User className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-500">8,542</p>
                  <p className="text-sm text-muted-foreground">Active Members</p>
                </CardContent>
              </Card>
            </div>

            {/* Create New Topic Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              + Create New Topic
            </Button>

            {/* Popular Topics */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Popular Topics</CardTitle>
                <CardDescription>Most active discussions in the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularTopics.map((topic, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-secondary/20 border-border hover:border-primary/50 transition-all cursor-pointer">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-primary" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                  {topic.isPinned && <Pin className="w-4 h-4 text-primary" />}
                                  {topic.title}
                                </h3>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {topic.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {topic.lastActivity}
                                </span>
                                <Badge variant="outline" className="text-xs">{topic.category}</Badge>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-sm">
                                  <MessageCircle className="w-4 h-4 text-primary" />
                                  <span className="font-semibold">{topic.replies}</span>
                                  <span className="text-muted-foreground">replies</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <ThumbsUp className="w-4 h-4 text-primary" />
                                  <span className="font-semibold">{topic.likes}</span>
                                  <span className="text-muted-foreground">likes</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  Load More Topics
                </Button>
              </CardContent>
            </Card>

            {/* Forum Rules */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl">Forum Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Be respectful and courteous to all community members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Stay on topic and avoid spam or promotional content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Use proper formatting and clear language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Search before posting to avoid duplicate topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Report inappropriate content to moderators</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;