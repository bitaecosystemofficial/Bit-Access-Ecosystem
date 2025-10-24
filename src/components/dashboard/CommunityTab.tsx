import { useState } from 'react';
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
  Coins
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBITBalance } from '@/contexts/BITBalanceContext';
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
}

const CommunityTab = () => {
  const { toast } = useToast();
  const { addBalance, formatBalance } = useBITBalance();
  const [checkInStreak, setCheckInStreak] = useState(3);
  const [totalPoints, setTotalPoints] = useState(450);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'daily-check',
      title: 'Daily Check-In',
      description: 'Check in daily to earn rewards and maintain your streak',
      reward: 10,
      completed: false,
      category: 'check-in',
      icon: Calendar,
      color: 'from-blue-500/20 to-blue-500/5',
    },
    {
      id: 'share-twitter',
      title: 'Share on Twitter',
      description: 'Share BIT token on your Twitter account',
      reward: 25,
      completed: false,
      category: 'social',
      icon: Share2,
      color: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      id: 'join-telegram',
      title: 'Join Telegram Group',
      description: 'Join our official Telegram community',
      reward: 20,
      completed: false,
      category: 'social',
      icon: MessageSquare,
      color: 'from-cyan-500/20 to-cyan-500/5',
    },
    {
      id: 'attend-ama',
      title: 'Attend AMA Session',
      description: 'Join our monthly Ask Me Anything session',
      reward: 50,
      completed: false,
      category: 'events',
      icon: PartyPopper,
      color: 'from-purple-500/20 to-purple-500/5',
    },
    {
      id: 'watch-webinar',
      title: 'Watch Educational Webinar',
      description: 'Complete our crypto education webinar',
      reward: 30,
      completed: false,
      category: 'webinar',
      icon: Video,
      color: 'from-green-500/20 to-green-500/5',
    },
    {
      id: 'forum-post',
      title: 'Create Forum Post',
      description: 'Share your thoughts in our community forum',
      reward: 15,
      completed: false,
      category: 'forum',
      icon: MessageSquare,
      color: 'from-orange-500/20 to-orange-500/5',
    },
    {
      id: 'forum-reply',
      title: 'Reply to Forum Thread',
      description: 'Engage with other community members',
      reward: 10,
      completed: false,
      category: 'forum',
      icon: MessageSquare,
      color: 'from-orange-500/20 to-orange-500/5',
    },
  ]);

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));

    if (task.category === 'check-in') {
      setCheckInStreak(prev => prev + 1);
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
      name: 'Daily Check-In', 
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/30'
    },
    { 
      id: 'social', 
      name: 'Social Tasks', 
      icon: Share2,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30'
    },
    { 
      id: 'events', 
      name: 'Events', 
      icon: PartyPopper,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 border-purple-500/30'
    },
    { 
      id: 'webinar', 
      name: 'Webinars', 
      icon: Video,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 border-green-500/30'
    },
    { 
      id: 'forum', 
      name: 'Forum Activity', 
      icon: MessageSquare,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 border-orange-500/30'
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
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{checkInStreak}</p>
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
                {categoryTasks.filter(t => t.completed).length} of {categoryTasks.length} tasks completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryTasks.map((task) => {
                const TaskIcon = task.icon;
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
                          <div className="flex items-center gap-2">
                            <Coins className="w-4 h-4 text-primary" />
                            <span className="font-bold text-primary">+{task.reward} BIT</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        {task.completed ? (
                          <Badge className="bg-green-500 text-white">
                            <Check className="w-3 h-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Button
                            onClick={() => handleCompleteTask(task.id)}
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Clock className="w-3 h-3 mr-1" />
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
