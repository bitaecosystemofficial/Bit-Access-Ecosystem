import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'rejected' | 'pending';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  endDate: string;
  category: string;
  requiredBIT: number;
}

const GovernanceTab = () => {
  const navigate = useNavigate();
  const [proposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Increase Staking Rewards by 2%',
      description: 'Proposal to increase annual staking rewards from 8% to 10% for BIT token holders.',
      status: 'active',
      votesFor: 12500000,
      votesAgainst: 3200000,
      totalVotes: 15700000,
      endDate: '2025-11-05',
      category: 'Economic',
      requiredBIT: 100
    },
    {
      id: '2',
      title: 'Add New Merchant Category: Healthcare',
      description: 'Expand the BIT ecosystem to include healthcare providers and medical services.',
      status: 'active',
      votesFor: 8900000,
      votesAgainst: 5100000,
      totalVotes: 14000000,
      endDate: '2025-11-10',
      category: 'Ecosystem',
      requiredBIT: 100
    },
    {
      id: '3',
      title: 'Launch BIT Grants Program',
      description: 'Allocate 5M BIT tokens for community development grants over the next year.',
      status: 'passed',
      votesFor: 18500000,
      votesAgainst: 2100000,
      totalVotes: 20600000,
      endDate: '2025-10-15',
      category: 'Development',
      requiredBIT: 100
    },
    {
      id: '4',
      title: 'Reduce Transaction Fees',
      description: 'Lower platform transaction fees from 0.5% to 0.3% for all BIT transactions.',
      status: 'active',
      votesFor: 10200000,
      votesAgainst: 7800000,
      totalVotes: 18000000,
      endDate: '2025-11-20',
      category: 'Economic',
      requiredBIT: 100
    },
    {
      id: '5',
      title: 'Partnership with Major Retail Chain',
      description: 'Approve strategic partnership to onboard 5,000+ retail locations.',
      status: 'pending',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      endDate: '2025-12-01',
      category: 'Partnership',
      requiredBIT: 100
    }
  ]);

  const getStatusBadge = (status: Proposal['status']) => {
    const variants: Record<Proposal['status'], { variant: any; icon: any }> = {
      active: { variant: 'default', icon: Clock },
      passed: { variant: 'default', icon: CheckCircle },
      rejected: { variant: 'destructive', icon: XCircle },
      pending: { variant: 'secondary', icon: Clock }
    };
    
    const { variant, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const calculatePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Vote className="w-6 h-6 text-primary" />
            BIT Governance
          </CardTitle>
          <CardDescription className="text-base">
            Vote on proposals to shape the future of the BIT ecosystem. 100 BIT tokens required to vote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Active Proposals</div>
              <div className="text-3xl font-bold text-primary">
                {proposals.filter(p => p.status === 'active').length}
              </div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Participants</div>
              <div className="text-3xl font-bold text-primary">12.4K</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Your Voting Power</div>
              <div className="text-3xl font-bold text-primary">500 BIT</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card 
            key={proposal.id} 
            className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer"
            onClick={() => navigate(`/governance/${proposal.id}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(proposal.status)}
                    <Badge variant="outline">{proposal.category}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                  <CardDescription className="text-sm">{proposal.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.status !== 'pending' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      For: {calculatePercentage(proposal.votesFor, proposal.totalVotes)}%
                    </span>
                    <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <XCircle className="w-4 h-4" />
                      Against: {calculatePercentage(proposal.votesAgainst, proposal.totalVotes)}%
                    </span>
                  </div>
                  <Progress 
                    value={calculatePercentage(proposal.votesFor, proposal.totalVotes)} 
                    className="h-2"
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {(proposal.totalVotes / 1000000).toFixed(1)}M votes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Ends: {new Date(proposal.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
              
              {proposal.status === 'pending' && (
                <div className="text-center text-sm text-muted-foreground py-4">
                  Voting starts soon
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {proposal.status === 'active' && (
                  <>
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/governance/${proposal.id}`);
                      }}
                    >
                      Vote For
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/governance/${proposal.id}`);
                      }}
                    >
                      Vote Against
                    </Button>
                  </>
                )}
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/governance/${proposal.id}`);
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GovernanceTab;
