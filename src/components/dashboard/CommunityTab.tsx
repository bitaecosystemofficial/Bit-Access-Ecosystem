import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Gift, Twitter, Facebook, Instagram, Youtube, Calendar, Video, MessageSquare, CheckCircle } from 'lucide-react';

const CommunityTab = () => {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const socialMediaTasks = [
    { platform: 'Twitter', icon: Twitter, task: 'Follow @BitAccess', reward: '50 BIT', color: 'text-blue-400' },
    { platform: 'Twitter', icon: Twitter, task: 'Retweet pinned post', reward: '30 BIT', color: 'text-blue-400' },
    { platform: 'Facebook', icon: Facebook, task: 'Like our page', reward: '40 BIT', color: 'text-blue-600' },
    { platform: 'Instagram', icon: Instagram, task: 'Follow us', reward: '40 BIT', color: 'text-pink-500' },
    { platform: 'Youtube', icon: Youtube, task: 'Subscribe channel', reward: '60 BIT', color: 'text-red-500' },
    { platform: 'Twitter', icon: Twitter, task: 'Share your referral link', reward: '100 BIT', color: 'text-blue-400' },
  ];

  const dailyCheckInRewards = [
    { day: 1, reward: '10 BIT' },
    { day: 7, reward: '50 BIT' },
    { day: 14, reward: '100 BIT' },
    { day: 21, reward: '150 BIT' },
    { day: 30, reward: '300 BIT' },
    { day: 45, reward: '500 BIT' },
  ];

  const zoomAttendance = [
    { event: 'Weekly Community Call', schedule: 'Every Monday 2PM UTC', reward: '75 BIT', type: 'Weekly' },
    { event: 'AMA Session', schedule: 'Every Wednesday 3PM UTC', reward: '100 BIT', type: 'Weekly' },
    { event: 'Trading Workshop', schedule: 'First Friday 4PM UTC', reward: '150 BIT', type: 'Monthly' },
    { event: 'Tech Deep Dive', schedule: 'Last Saturday 1PM UTC', reward: '200 BIT', type: 'Monthly' },
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
              <div className="grid md:grid-cols-2 gap-4">
                {socialMediaTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-secondary/20 border-border/50 hover:border-primary/50 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <task.icon className={`w-6 h-6 ${task.color} mt-1`} />
                            <div>
                              <p className="font-semibold">{task.task}</p>
                              <p className="text-sm text-muted-foreground">{task.platform}</p>
                            </div>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">{task.reward}</Badge>
                        </div>
                        <Button className="w-full mt-3" variant="outline" size="sm">
                          Complete Task
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
                {/* Milestone Rewards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {dailyCheckInRewards.map((milestone, index) => (
                    <Card 
                      key={index}
                      className={`bg-gradient-to-br ${
                        checkedDays.length >= milestone.day 
                          ? 'from-primary/20 to-primary/5 border-primary/30' 
                          : 'from-secondary/20 to-secondary/5 border-border/50'
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="flex justify-center mb-2">
                          {checkedDays.length >= milestone.day ? (
                            <CheckCircle className="w-8 h-8 text-primary" />
                          ) : (
                            <Calendar className="w-8 h-8 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Day {milestone.day}</p>
                        <p className="text-xl font-bold text-primary">{milestone.reward}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Check-in Progress */}
                <div className="bg-secondary/20 p-6 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg font-semibold">Current Streak</p>
                      <p className="text-3xl font-bold text-primary">{checkedDays.length} Days</p>
                    </div>
                    <Button 
                      onClick={() => handleCheckIn(checkedDays.length + 1)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Check In Today
                    </Button>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-3">
                    <div 
                      className="bg-primary rounded-full h-3 transition-all"
                      style={{ width: `${(checkedDays.length / 45) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {checkedDays.length}/45 days completed
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Rules:</strong> Check in every day to maintain your streak. 
                    Earn bonus rewards at milestone days. Missing a day resets your streak.
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
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CommunityTab;
