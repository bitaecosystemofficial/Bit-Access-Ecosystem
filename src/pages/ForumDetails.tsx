import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Clock, User, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ForumDetails = () => {
  const navigate = useNavigate();
  
  const forumTopics = [
    {
      id: 1,
      title: 'Welcome to BIT ACCESS Community!',
      author: 'Admin',
      category: 'Announcements',
      replies: 45,
      views: 892,
      likes: 123,
      lastActive: '2 hours ago',
      isPinned: true,
      reward: 50
    },
    {
      id: 2,
      title: 'How to maximize staking rewards?',
      author: 'CryptoMaster88',
      category: 'Trading & Markets',
      replies: 28,
      views: 543,
      likes: 67,
      lastActive: '5 hours ago',
      isPinned: false,
      reward: 25
    },
    {
      id: 3,
      title: 'New merchant partnership announced in Cebu!',
      author: 'BitEnthusiast',
      category: 'General Discussion',
      replies: 34,
      views: 678,
      likes: 89,
      lastActive: '1 day ago',
      isPinned: false,
      reward: 30
    },
    {
      id: 4,
      title: 'Technical analysis: BIT price predictions',
      author: 'TraderPro',
      category: 'Trading & Markets',
      replies: 56,
      views: 1234,
      likes: 145,
      lastActive: '3 hours ago',
      isPinned: false,
      reward: 40
    },
    {
      id: 5,
      title: 'Beginner guide to Web3 wallets',
      author: 'HelpfulGuide',
      category: 'Guides & Tutorials',
      replies: 22,
      views: 456,
      likes: 78,
      lastActive: '6 hours ago',
      isPinned: false,
      reward: 35
    },
    {
      id: 6,
      title: 'Share your merchant payment experience',
      author: 'CommunityMod',
      category: 'Merchant Partners',
      replies: 41,
      views: 789,
      likes: 98,
      lastActive: '4 hours ago',
      isPinned: false,
      reward: 20
    }
  ];

  const leaderboard = [
    { rank: 1, user: 'CryptoKing', posts: 342, likes: 1567, reward: 500 },
    { rank: 2, user: 'BitMaster', posts: 298, likes: 1234, reward: 300 },
    { rank: 3, user: 'TraderPro', posts: 256, likes: 1089, reward: 200 },
    { rank: 4, user: 'WebGuru', posts: 234, likes: 987, reward: 150 },
    { rank: 5, user: 'CryptoNinja', posts: 198, likes: 876, reward: 100 }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-gold">Community Forum</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect, discuss, and earn rewards by contributing to the BIT ACCESS community
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Forum Topics */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Active Discussions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {forumTopics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`bg-gradient-to-r ${topic.isPinned ? 'from-primary/10 to-primary/5 border-primary/30' : 'from-card to-secondary/20'} hover:border-primary transition-all cursor-pointer`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {topic.isPinned && (
                                  <Badge className="bg-primary text-primary-foreground">Pinned</Badge>
                                )}
                                <Badge variant="outline">{topic.category}</Badge>
                              </div>
                              <h3 className="font-bold text-lg mb-1">{topic.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {topic.author}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {topic.lastActive}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-primary font-bold mb-1">+{topic.reward} BIT</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {topic.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {topic.likes} likes
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard Sidebar */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between p-3 bg-card/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-primary text-primary-foreground' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-secondary text-foreground'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <div className="font-bold">{user.user}</div>
                          <div className="text-xs text-muted-foreground">
                            {user.posts} posts · {user.likes} likes
                          </div>
                        </div>
                      </div>
                      <div className="text-primary font-bold">
                        {user.reward} BIT
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Forum Rewards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">New Topic:</span>
                    <span className="font-bold text-primary">10 BIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reply:</span>
                    <span className="font-bold text-primary">2 BIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Per Like Received:</span>
                    <span className="font-bold text-primary">1 BIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Answer:</span>
                    <span className="font-bold text-primary">25 BIT</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForumDetails;
