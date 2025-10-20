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
          <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-lg border-primary/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
              <CardTitle className="text-3xl flex items-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                <Calendar className="w-8 h-8 mr-3 text-primary drop-shadow-lg" />
                45-Day Daily Check-in Challenge
              </CardTitle>
              <CardDescription className="text-base">Check in daily to earn cumulative rewards and unlock exclusive bonuses</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* 45 Days Grid - Responsive: 2 columns on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: day * 0.01 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <Card 
                        className={`${
                          checkedDays.includes(day)
                            ? 'bg-gradient-to-br from-primary/30 to-primary/10 border-primary shadow-lg shadow-primary/20' 
                            : 'bg-gradient-to-br from-card to-secondary/30 border-border/50 hover:border-primary/40'
                        } transition-all duration-300 cursor-pointer relative overflow-hidden group`}
                        onClick={() => handleCheckIn(day)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-3 md:p-4 text-center relative z-10">
                          <div className="flex flex-col items-center space-y-1.5">
                            {checkedDays.includes(day) ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                              >
                                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-primary drop-shadow-lg" />
                              </motion.div>
                            ) : (
                              <Calendar className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                            <p className="text-xs md:text-sm font-bold">Day {day}</p>
                            <Badge variant="outline" className="text-xs border-primary/50 bg-primary/10">
                              {dailyReward} BIT
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Section - Below the grid */}
                <motion.div 
                  className="bg-gradient-to-br from-secondary/30 to-secondary/10 p-6 md:p-8 rounded-xl border border-primary/20 backdrop-blur-sm shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-base md:text-lg font-semibold text-muted-foreground mb-1">Current Streak</p>
                      <p className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                        {checkedDays.length} Days
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mt-2 flex items-center gap-2">
                        <Gift className="w-4 h-4 text-primary" />
                        Total earned: <span className="font-bold text-primary">{checkedDays.length * dailyReward} BIT</span>
                      </p>
                    </div>
                    <Button 
                      onClick={() => handleCheckIn(checkedDays.length + 1)}
                      disabled={checkedDays.length >= totalDays}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                    >
                      {checkedDays.length >= totalDays ? '🎉 Completed!' : '✓ Check In Today'}
                    </Button>
                  </div>
                  
                  <div className="w-full bg-secondary/50 rounded-full h-6 md:h-8 shadow-inner overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-primary via-primary/80 to-primary/70 rounded-full h-full transition-all flex items-center justify-end pr-3 shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${(checkedDays.length / totalDays) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-xs md:text-sm font-bold text-primary-foreground drop-shadow-md">
                        {Math.round((checkedDays.length / totalDays) * 100)}%
                      </span>
                    </motion.div>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground mt-3 text-center md:text-left">
                    <span className="font-semibold">{checkedDays.length}</span> of <span className="font-semibold">{totalDays}</span> days completed
                  </p>
                </motion.div>

                {/* Completion Bonus Card */}
                {checkedDays.length === totalDays && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <Card className="bg-gradient-to-br from-primary/40 via-primary/20 to-primary/10 border-2 border-primary shadow-2xl shadow-primary/30">
                      <CardContent className="p-6 md:p-8 text-center">
                        <motion.div
                          animate={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: 2 }}
                        >
                          <Trophy className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4 drop-shadow-2xl" />
                        </motion.div>
                        <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-3">
                          🎉 Challenge Complete!
                        </h3>
                        <p className="text-lg md:text-xl mb-3 text-foreground">You've earned a <span className="font-bold text-primary">50% bonus</span> reward!</p>
                        <p className="text-4xl md:text-5xl font-bold text-primary mb-2 drop-shadow-lg">+{bonusReward} BIT</p>
                        <p className="text-sm md:text-base text-muted-foreground">
                          Total rewards: <span className="font-bold text-primary">{(totalDays * dailyReward) + bonusReward} BIT</span>
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-xl p-4 md:p-5 backdrop-blur-sm">
                  <p className="text-sm md:text-base">
                    <strong className="text-primary">💡 How it works:</strong> Check in each day to earn {dailyReward} BIT. 
                    Complete all {totalDays} days to receive a bonus of <span className="font-bold text-primary">{bonusReward} BIT</span> (50% extra reward)!
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
