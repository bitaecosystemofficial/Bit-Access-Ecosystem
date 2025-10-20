import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Gift, Twitter, Facebook, Instagram, Youtube, Calendar, Video, MessageSquare, CheckCircle, Send, ThumbsUp, Share2, Star, MessageCircle } from 'lucide-react';

const CommunityTab = () => {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const socialMediaTasks = [
    { platform: 'Facebook', icon: Facebook, task: 'Like our FB page', reward: '50 BIT', color: 'text-blue-600' },
    { platform: 'Facebook', icon: ThumbsUp, task: 'Leave review on FB page', reward: '75 BIT', color: 'text-blue-600' },
    { platform: 'Twitter', icon: Twitter, task: 'Follow us on Twitter', reward: '50 BIT', color: 'text-blue-400' },
    { platform: 'Twitter', icon: Twitter, task: 'Retweet our post', reward: '40 BIT', color: 'text-blue-400' },
    { platform: 'Youtube', icon: Youtube, task: 'Subscribe to YouTube channel', reward: '60 BIT', color: 'text-red-500' },
    { platform: 'Youtube', icon: ThumbsUp, task: 'React to YouTube videos', reward: '30 BIT', color: 'text-red-500' },
    { platform: 'Telegram', icon: Send, task: 'Join Telegram group', reward: '50 BIT', color: 'text-blue-400' },
    { platform: 'Telegram', icon: Send, task: 'Subscribe Telegram channel', reward: '50 BIT', color: 'text-blue-400' },
    { platform: 'Referral', icon: Share2, task: 'Share your Referral Link', reward: '100 BIT', color: 'text-green-500' },
    { platform: 'Instagram', icon: Instagram, task: 'Follow us on Instagram', reward: '40 BIT', color: 'text-pink-500' },
    { platform: 'Discord', icon: MessageCircle, task: 'Join our Discord server', reward: '50 BIT', color: 'text-purple-500' },
    { platform: 'Community', icon: Star, task: 'Write a review on Trustpilot', reward: '80 BIT', color: 'text-yellow-500' },
  ];

  const totalDays = 45;
  const dailyReward = 100;
  const bonusReward = 2250; // 50% of total (45 days * 100 BIT = 4500, bonus = 2250)

  const zoomAttendance = [
    { event: 'Weekly Community Call', schedule: 'Every Monday 2PM UTC', reward: '75 BIT', type: 'Weekly' },
    { event: 'AMA Session', schedule: 'Every Wednesday 3PM UTC', reward: '100 BIT', type: 'Weekly' },
    { event: 'Trading Workshop', schedule: 'First Friday 4PM UTC', reward: '150 BIT', type: 'Monthly' },
    { event: 'Tech Deep Dive', schedule: 'Last Saturday 1PM UTC', reward: '200 BIT', type: 'Monthly' },
  ];

  const forumCategories = [
    { name: 'General Discussion', topics: 1234, posts: 5678 },
    { name: 'Trading & Markets', topics: 892, posts: 3456 },
    { name: 'Technical Support', topics: 456, posts: 1890 },
    { name: 'Announcements', topics: 89, posts: 432 },
    { name: 'Feature Requests', topics: 234, posts: 987 },
    { name: 'Community Events', topics: 145, posts: 678 },
  ];

  const forumActivities = [
    { activity: 'Create quality post', reward: '20 BIT', description: 'Share insights or ask questions' },
    { activity: 'Helpful reply', reward: '10 BIT', description: 'Provide valuable answers' },
    { activity: 'Top contributor (weekly)', reward: '500 BIT', description: 'Most helpful member' },
    { activity: 'Topic starter', reward: '50 BIT', description: 'Start engaging discussions' },
  ];

  const handleCheckIn = (day: number) => {
    if (!checkedDays.includes(day)) {
      setCheckedDays([...checkedDays, day]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-card/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="social" className="font-semibold">
            <Twitter className="w-4 h-4 mr-2" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="checkin" className="font-semibold">
            <Calendar className="w-4 h-4 mr-2" />
            Daily Check-in
          </TabsTrigger>
          <TabsTrigger value="zoom" className="font-semibold">
            <Video className="w-4 h-4 mr-2" />
            Zoom Events
          </TabsTrigger>
          <TabsTrigger value="forum" className="font-semibold">
            <MessageSquare className="w-4 h-4 mr-2" />
            Forums
          </TabsTrigger>
        </TabsList>

        {/* Social Media Tasks Tab */}
        <TabsContent value="social">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-primary" />
                Social Media Tasks
              </CardTitle>
              <CardDescription>Complete tasks to earn BIT rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {socialMediaTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-secondary/20 border-border/50 hover:border-primary/50 transition-all">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center space-y-2">
                          <task.icon className={`w-8 h-8 ${task.color}`} />
                          <div>
                            <p className="font-semibold text-sm">{task.task}</p>
                            <p className="text-xs text-muted-foreground">{task.platform}</p>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">{task.reward}</Badge>
                        </div>
                        <Button className="w-full mt-3" variant="outline" size="sm">
                          Complete
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Check-in Tab */}
        <TabsContent value="checkin">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-primary" />
                45-Day Daily Check-in Challenge
              </CardTitle>
              <CardDescription>Check in daily to earn cumulative rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 45 Days Grid - 4 per row */}
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: day * 0.01 }}
                    >
                      <Card 
                        className={`${
                          checkedDays.includes(day)
                            ? 'bg-primary/20 border-primary/50' 
                            : 'bg-secondary/20 border-border/50'
                        } hover:border-primary/50 transition-all cursor-pointer`}
                        onClick={() => handleCheckIn(day)}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="flex flex-col items-center space-y-1">
                            {checkedDays.includes(day) ? (
                              <CheckCircle className="w-6 h-6 text-primary" />
                            ) : (
                              <Calendar className="w-6 h-6 text-muted-foreground" />
                            )}
                            <p className="text-xs font-semibold">Day {day}</p>
                            <p className="text-xs text-primary font-bold">{dailyReward} BIT</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Section - Below the grid */}
                <div className="bg-secondary/20 p-6 rounded-lg border border-border/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">Current Streak</p>
                      <p className="text-3xl font-bold text-primary">{checkedDays.length} Days</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Total earned: {checkedDays.length * dailyReward} BIT
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleCheckIn(checkedDays.length + 1)}
                      disabled={checkedDays.length >= totalDays}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {checkedDays.length >= totalDays ? 'Completed!' : 'Check In Today'}
                    </Button>
                  </div>
                  
                  <div className="w-full bg-secondary/50 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary/70 rounded-full h-4 transition-all flex items-center justify-end pr-2"
                      style={{ width: `${(checkedDays.length / totalDays) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-primary-foreground">
                        {Math.round((checkedDays.length / totalDays) * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {checkedDays.length}/{totalDays} days completed
                  </p>
                </div>

                {/* Completion Bonus Card */}
                {checkedDays.length === totalDays && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-gradient-to-br from-primary/30 to-primary/10 border-primary">
                      <CardContent className="p-6 text-center">
                        <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-primary mb-2">Challenge Complete!</h3>
                        <p className="text-lg mb-2">You've earned a 50% bonus reward!</p>
                        <p className="text-3xl font-bold text-primary">+{bonusReward} BIT</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Total rewards: {(totalDays * dailyReward) + bonusReward} BIT
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>How it works:</strong> Check in each day to earn {dailyReward} BIT. 
                    Complete all {totalDays} days to receive a bonus of {bonusReward} BIT (50% extra reward)!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zoom Attendance Tab */}
        <TabsContent value="zoom">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Video className="w-6 h-6 mr-3 text-primary" />
                Zoom Event Attendance
              </CardTitle>
              <CardDescription>Join live events and earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zoomAttendance.map((event, index) => (
                  <Card key={index} className="bg-secondary/20 border-border/50">
                    <CardContent className="p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <Video className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-lg">{event.event}</h3>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              {event.schedule}
                            </p>
                            <Badge variant="outline" className="mt-2">{event.type}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className="bg-primary text-primary-foreground text-base px-4 py-1">
                            {event.reward}
                          </Badge>
                          <Button variant="outline" size="sm">Get Link</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-6">
                <p className="text-sm">
                  <strong>How it works:</strong> Register for events and attend the full session to earn rewards. 
                  Rewards are automatically credited after verified attendance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Forums Tab */}
        <TabsContent value="forum">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar - Categories */}
            <Card className="lg:col-span-1 bg-card/50 backdrop-blur-sm border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {forumCategories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg bg-secondary/20 hover:bg-primary/10 border border-border/50 hover:border-primary/50 transition-all"
                    >
                      <p className="font-semibold text-sm">{category.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.topics} topics • {category.posts} posts
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="w-6 h-6 mr-3 text-primary" />
                    Community Forums
                  </CardTitle>
                  <CardDescription>Engage with the community and earn rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {forumActivities.map((activity, index) => (
                      <Card key={index} className="bg-secondary/20 border-border/50">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{activity.activity}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                            </div>
                            <Badge className="bg-primary text-primary-foreground text-base px-4 py-1 ml-4">
                              {activity.reward}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 mt-6">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Trophy className="w-10 h-10 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-lg mb-2">Leaderboard Rewards</h3>
                          <ul className="space-y-1 text-sm">
                            <li>🥇 Top 1: 2,000 BIT monthly</li>
                            <li>🥈 Top 2-5: 1,000 BIT monthly</li>
                            <li>🥉 Top 6-10: 500 BIT monthly</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 h-12 text-lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Visit Community Forum
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CommunityTab;
