import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Vote, CheckCircle, XCircle, Clock, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GovernanceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  // Mock data - in real app, fetch by ID
  const proposal = {
    id: id,
    title: 'Increase Staking Rewards by 2%',
    description: 'Proposal to increase annual staking rewards from 8% to 10% for BIT token holders to incentivize long-term holding and network security.',
    fullDescription: `This proposal aims to increase the annual staking rewards for BIT token holders from the current 8% to 10%. The increase is designed to:

1. **Incentivize Long-term Holding**: Higher rewards encourage token holders to stake their BIT, reducing circulating supply and increasing token value.

2. **Enhance Network Security**: More staked tokens mean a more secure and decentralized network.

3. **Competitive Positioning**: Align our rewards with industry standards to remain competitive with other major DeFi platforms.

4. **Sustainable Growth**: The treasury can support this increase while maintaining healthy reserves for future development.

**Financial Impact**: 
- Estimated additional annual cost: 2M BIT tokens
- Current treasury reserves: 50M BIT tokens
- Projected increase in staked tokens: 15-20%

**Implementation Timeline**:
- Phase 1 (Week 1-2): Smart contract updates and testing
- Phase 2 (Week 3): Community notification and preparation
- Phase 3 (Week 4): Reward rate increase activation

**Risk Assessment**:
- Low risk to treasury sustainability
- Potential for increased token value due to reduced circulation
- Enhanced community engagement and loyalty`,
    status: 'active',
    votesFor: 12500000,
    votesAgainst: 3200000,
    totalVotes: 15700000,
    endDate: '2025-11-05',
    startDate: '2025-10-22',
    category: 'Economic',
    proposer: '0x742d...a9f4',
    requiredBIT: 100,
    quorum: 20000000,
    comments: [
      {
        id: 1,
        author: '0x123...456',
        content: 'This is a great proposal! Higher rewards will definitely attract more holders.',
        timestamp: '2025-10-23',
        vote: 'for'
      },
      {
        id: 2,
        author: '0x789...abc',
        content: 'I support this, but we should monitor treasury impact closely.',
        timestamp: '2025-10-24',
        vote: 'for'
      },
      {
        id: 3,
        author: '0xdef...123',
        content: 'Concerned about long-term sustainability. Need more data on treasury projections.',
        timestamp: '2025-10-25',
        vote: 'against'
      }
    ]
  };

  const calculatePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  const handleVote = (voteType: 'for' | 'against') => {
    toast({
      title: `Vote ${voteType === 'for' ? 'For' : 'Against'} Recorded`,
      description: `Your vote has been successfully recorded. Thank you for participating in BIT governance!`,
    });
    setHasVoted(true);
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: 'Comment Posted',
      description: 'Your comment has been added to the discussion.',
    });
    setComment('');
  };

  const quorumPercentage = Math.round((proposal.totalVotes / proposal.quorum) * 100);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Active
                  </Badge>
                  <Badge variant="outline">{proposal.category}</Badge>
                  <Badge variant="outline" className="ml-auto">
                    ID: #{proposal.id}
                  </Badge>
                </div>
                <CardTitle className="text-3xl mb-2">{proposal.title}</CardTitle>
                <CardDescription className="text-base flex items-center gap-4">
                  <span>Proposed by {proposal.proposer}</span>
                  <span>•</span>
                  <span>{new Date(proposal.startDate).toLocaleDateString()}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-line text-foreground">
                    {proposal.fullDescription}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Discussion ({proposal.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposal.comments.map((comment) => (
                  <div key={comment.id} className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-muted-foreground">{comment.author}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={comment.vote === 'for' ? 'default' : 'destructive'} className="text-xs">
                          {comment.vote === 'for' ? 'Voted For' : 'Voted Against'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}

                <div className="pt-4 space-y-3">
                  <Textarea
                    placeholder="Share your thoughts on this proposal..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-24"
                  />
                  <Button onClick={handleComment} className="w-full sm:w-auto">
                    Post Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Voting Sidebar */}
          <div className="space-y-6">
            <Card className="border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  Voting Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      For
                    </span>
                    <span className="text-2xl font-bold">
                      {calculatePercentage(proposal.votesFor, proposal.totalVotes)}%
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(proposal.votesFor, proposal.totalVotes)} 
                    className="h-3"
                  />
                  <div className="text-sm text-muted-foreground">
                    {(proposal.votesFor / 1000000).toFixed(2)}M BIT votes
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                      <XCircle className="w-5 h-5" />
                      Against
                    </span>
                    <span className="text-2xl font-bold">
                      {calculatePercentage(proposal.votesAgainst, proposal.totalVotes)}%
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(proposal.votesAgainst, proposal.totalVotes)} 
                    className="h-3 [&>div]:bg-destructive"
                  />
                  <div className="text-sm text-muted-foreground">
                    {(proposal.votesAgainst / 1000000).toFixed(2)}M BIT votes
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Votes</span>
                    <span className="font-semibold">{(proposal.totalVotes / 1000000).toFixed(2)}M BIT</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quorum</span>
                    <span className="font-semibold">{quorumPercentage}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      Participants
                    </span>
                    <span className="font-semibold">3,142</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Voting Ends
                    </span>
                    <span className="font-semibold">{new Date(proposal.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {!hasVoted ? (
                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleVote('for')}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Vote For
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => handleVote('against')}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Vote Against
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Required: {proposal.requiredBIT} BIT tokens to vote
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-100 dark:bg-green-900/20 border border-green-500/50 rounded-lg p-4 text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                    <p className="font-semibold text-green-800 dark:text-green-300">
                      Vote Recorded
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      Thank you for participating!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  Your Voting Power
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">500</div>
                  <div className="text-sm text-muted-foreground">BIT Tokens</div>
                  <Badge variant="outline" className="mt-2">Eligible to Vote</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceDetail;
