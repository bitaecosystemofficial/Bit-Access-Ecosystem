import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Share2, 
  PartyPopper, 
  Video, 
  MessageSquare,
  Check,
  Clock,
  Trophy,
  Coins,
  Facebook,
  Twitter,
  Youtube,
  Users,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBITBalance } from '@/contexts/BITBalanceContext';
import { useCountdown } from '@/hooks/useCountdown';
import bitLogo from '@/assets/bit-token-logo.png';

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  category: 'check-in' | 'social' | 'events' | 'webinar' | 'forum';
  icon: any;
  color: string;
  link?: string;
  requiresInvites?: boolean;
  inviteReward?: number;
  inviteCount?: string;
  activationDate?: number; // Timestamp for when link becomes active
  linkVisited?: boolean; // Track if link was visited
}

const CommunityTab = () => {
  const { toast } = useToast();
  const { addBalance, formatBalance } = useBITBalance();
  const [checkInStreak, setCheckInStreak] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'daily-check',
      title: 'Daily Check-In (30 Days)',
      description: 'Check in daily to earn 100 BIT tokens. Complete all 30 days! (Once per unique wallet)',
      reward: 100,
      completed: false,
      category: 'check-in',
      icon: Calendar,
      color: 'from-blue-500/20 to-blue-500/5',
    },
    {
      id: 'facebook-like',
      title: 'Like Us on Facebook',
      description: 'Like our official Facebook page (Once per unique wallet)',
      reward: 250,
      completed: false,
      category: 'social',
      icon: Facebook,
      color: 'from-cyan-500/20 to-cyan-500/5',
      link: 'https://facebook.com',
    },
    {
      id: 'twitter-follow',
      title: 'Follow Us on Twitter (X)',
      description: 'Follow our Twitter account (Once per unique wallet)',
      reward: 250,
      completed: false,
      category: 'social',
      icon: Twitter,
      color: 'from-cyan-500/20 to-cyan-500/5',
      link: 'https://twitter.com',
    },
    {
      id: 'youtube-subscribe',
      title: 'Subscribe to YouTube',
      description: 'Subscribe to our YouTube channel (Once per unique wallet)',
      reward: 250,
      completed: false,
      category: 'social',
      icon: Youtube,
      color: 'from-cyan-500/20 to-cyan-500/5',
      link: 'https://youtube.com',
    },
    {
      id: 'telegram-join',
      title: 'Join Telegram Group',
      description: 'Join our official Telegram community (Once per unique wallet)',
      reward: 250,
      completed: false,
      category: 'social',
      icon: MessageSquare,
      color: 'from-cyan-500/20 to-cyan-500/5',
      link: 'https://t.me',
    },
    {
      id: 'web3-seminar',
      title: 'Attend Web3 Education & Orientation Seminar',
      description: 'Join our comprehensive Web3 education seminar',
      reward: 1000,
      completed: false,
      category: 'events',
      icon: PartyPopper,
      color: 'from-purple-500/20 to-purple-500/5',
      link: 'https://meet.google.com',
      activationDate: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days from now
      linkVisited: false,
    },
    {
      id: 'daily-zoom',
      title: 'Attend Daily Zoom Webinar',
      description: 'Join our daily Zoom webinar session',
      reward: 250,
      completed: false,
      category: 'webinar',
      icon: Video,
      color: 'from-green-500/20 to-green-500/5',
      link: 'https://zoom.us',
      activationDate: Date.now() + (3 * 24 * 60 * 60 * 1000), // 3 days from now
      linkVisited: false,
    },
    {
      id: 'webinar-invite',
      title: 'Invite Participants to Webinar',
      description: 'Invite 3-5 participants to join the webinar',
      reward: 5000,
      completed: false,
      category: 'webinar',
      icon: Users,
      color: 'from-green-500/20 to-green-500/5',
      requiresInvites: true,
      inviteCount: '3-5',
    },
    {
      id: 'forum-attend',
      title: 'Attend Daily Forum',
      description: 'Join our daily forum session',
      reward: 2000,
      completed: false,
      category: 'forum',
      icon: MessageSquare,
      color: 'from-orange-500/20 to-orange-500/5',
      link: 'https://maps.google.com',
      activationDate: Date.now() + (1 * 24 * 60 * 60 * 1000), // 1 day from now
      linkVisited: false,
    },
    {
      id: 'forum-invite',
      title: 'Invite Participants to Forum',
      description: 'Invite 2-3 participants to the daily forum',
      reward: 5000,
      completed: false,
      category: 'forum',
      icon: Users,
      color: 'from-orange-500/20 to-orange-500/5',
      requiresInvites: true,
      inviteCount: '2-3',
    },
  ]);

  const handleTaskAction = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    // Check if task has activation date and if it's active
    if (task.activationDate && Date.now() < task.activationDate) {
      toast({
        title: 'Link Not Active Yet',
        description: 'This link will be available soon. Please check the timer.',
        variant: 'destructive',
      });
      return;
    }

    // If task has a link, open it in new tab and mark as visited
    if (task.link) {
      window.open(task.link, '_blank');
      
      // Mark link as visited
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, linkVisited: true } : t
      ));

      // Auto-complete after visiting the link
      setTimeout(() => {
        completeTask(taskId);
      }, 2000); // Give user 2 seconds to see the external link opened
      
      return;
    }

    // Complete the task immediately if no link required
    completeTask(taskId);
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));

    if (task.category === 'check-in') {
      const newStreak = checkInStreak + 1;
      setCheckInStreak(newStreak);
      
      if (newStreak === 30) {
        toast({
          title: '🎉 30-Day Streak Complete!',
          description: 'Congratulations! You completed the 30-day check-in challenge!',
        });
      }
    }

    setTotalPoints(prev => prev + task.reward);
    addBalance(task.reward);

    toast({
      title: 'Task Completed! 🎉',
      description: `You earned ${task.reward} BIT tokens! Keep it up!`,
    });
  };

  const categories = [
    { 
      id: 'check-in', 
      name: 'Daily Check-In (30 Days)', 
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      description: 'Once per unique wallet address'
    },
    { 
      id: 'social', 
      name: 'Social Tasks', 
      icon: Share2,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      description: 'Once per unique wallet and account'
    },
    { 
      id: 'events', 
      name: 'Events', 
      icon: PartyPopper,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      description: 'Earn BIT by attending events'
    },
    { 
      id: 'webinar', 
      name: 'Webinars', 
      icon: Video,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 border-green-500/30',
      description: 'Daily Zoom sessions with bonus rewards'
    },
    { 
      id: 'forum', 
      name: 'Forum Activity', 
      icon: MessageSquare,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 border-orange-500/30',
      description: 'Daily forums and discussions'
    },
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                <div className="flex items-center gap-2">
                  <img src={bitLogo} alt="BIT Token" className="w-8 h-8" />
                  <p className="text-3xl font-bold text-primary">{formatBalance(totalPoints)}</p>
                </div>
              </div>
              <Trophy className="w-12 h-12 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Check-In Streak</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{checkInStreak}/30</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
              <Calendar className="w-12 h-12 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tasks Completed</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {completedTasks}/{tasks.length}
                </p>
                <Progress value={progressPercentage} className="mt-2 h-2" />
              </div>
              <Check className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Categories */}
      {categories.map((category) => {
        const categoryTasks = tasks.filter(t => t.category === category.id);
        const CategoryIcon = category.icon;

        return (
          <Card key={category.id} className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.bgColor}`}>
                  <CategoryIcon className={`w-6 h-6 ${category.color}`} />
                </div>
                {category.name}
              </CardTitle>
              <CardDescription>
                {category.description} • {categoryTasks.filter(t => t.completed).length} of {categoryTasks.length} completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryTasks.map((task) => {
                const TaskIcon = task.icon;
                const isLinkActive = !task.activationDate || Date.now() >= task.activationDate;
                const timeLeft = task.activationDate ? useCountdown(task.activationDate) : null;
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-gradient-to-r ${task.color} border border-border/50 rounded-xl p-4`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          <TaskIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base mb-1">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <Coins className="w-4 h-4 text-primary" />
                              <span className="font-bold text-primary">+{task.reward} BIT</span>
                            </div>
                            {task.requiresInvites && (
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                {task.inviteCount} invites needed
                              </Badge>
                            )}
                            {!isLinkActive && timeLeft && (
                              <Badge variant="outline" className="text-xs bg-orange-500/10">
                                <Clock className="w-3 h-3 mr-1" />
                                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                              </Badge>
                            )}
                            {task.linkVisited && !task.completed && (
                              <Badge variant="outline" className="text-xs bg-blue-500/10">
                                <Check className="w-3 h-3 mr-1" />
                                Link Visited
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {task.completed ? (
                          <Badge className="bg-green-500 text-white whitespace-nowrap">
                            <Check className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        ) : task.link ? (
                          <>
                            <Button
                              onClick={() => handleTaskAction(task.id)}
                              size="sm"
                              className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                              disabled={!isLinkActive}
                            >
                              {isLinkActive ? (
                                <>
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Visit Link
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Locked
                                </>
                              )}
                            </Button>
                            {task.linkVisited && (
                              <Badge className="bg-blue-500 text-white whitespace-nowrap text-xs">
                                Auto-completing...
                              </Badge>
                            )}
                          </>
                        ) : (
                          <Button
                            onClick={() => completeTask(task.id)}
                            size="sm"
                            className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {/* Info Banner */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Trophy className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Earn More BIT Tokens!</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete community tasks to earn BIT tokens and build your reputation. 
                Daily check-ins help you maintain your streak for bonus rewards. 
                Engage with our community through social media, forums, events, and educational webinars 
                to maximize your earnings and stay informed about the latest updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityTab;
