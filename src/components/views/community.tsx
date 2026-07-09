'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Plus,
  Radio,
  TrendingUp,
  Clock,
  Users,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

// ── Mock Data ────────────────────────────────────────────────────────────────

interface Comment {
  id: string
  author: string
  avatar: string
  role: string
  text: string
  timestamp: string
}

interface Post {
  id: string
  author: string
  avatar: string
  role: string
  roleColor: string
  timestamp: string
  content: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  hasImage: boolean
  imageGradient?: string
  commentList: Comment[]
  totalComments: number
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Alex Chen',
    avatar: 'AC',
    role: 'Pro Trader',
    roleColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    timestamp: '2h ago',
    content:
      'Just hit my first 1:10 R/R trade on GBP/JPY! The key was waiting for the breakout confirmation above the 4H supply zone and entering on the retracement to the FVG. Patience truly pays off in this game. Here\'s my analysis breakdown for anyone interested.',
    tags: ['#technical-analysis', '#forex', '#price-action'],
    likes: 142,
    comments: 38,
    shares: 24,
    hasImage: true,
    imageGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    commentList: [
      {
        id: 'c1',
        author: 'Sarah M.',
        avatar: 'SM',
        role: 'Instructor',
        text: 'Beautiful execution! That FVG entry was textbook. Congrats on the discipline.',
        timestamp: '1h ago',
      },
      {
        id: 'c2',
        author: 'Mike R.',
        avatar: 'MR',
        role: 'Student',
        text: 'This is inspiring. I keep jumping in too early. Need to work on my patience.',
        timestamp: '45m ago',
      },
    ],
    totalComments: 38,
  },
  {
    id: '2',
    author: 'Sarah Mitchell',
    avatar: 'SM',
    role: 'Instructor',
    roleColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    timestamp: '4h ago',
    content:
      'Weekly market recap: Key levels to watch next week. EUR/USD has formed a clean bullish order block at 1.0820. Gold is showing divergence on the daily RSI. NFP data could shake things up, so manage your risk accordingly. Full analysis in the course section.',
    tags: ['#market-recap', '#weekly-analysis', '#eurusd'],
    likes: 287,
    comments: 56,
    shares: 89,
    hasImage: false,
    commentList: [
      {
        id: 'c3',
        author: 'David K.',
        avatar: 'DK',
        role: 'Pro Trader',
        text: 'Great call on the EUR/USD OB. I\'ve been watching that same level all week.',
        timestamp: '3h ago',
      },
      {
        id: 'c4',
        author: 'Lisa P.',
        avatar: 'LP',
        role: 'Student',
        text: 'Thank you for the gold divergence tip! I wouldn\'t have caught that.',
        timestamp: '2h ago',
      },
    ],
    totalComments: 56,
  },
  {
    id: '3',
    author: 'James Wilson',
    avatar: 'JW',
    role: 'Student',
    roleColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    timestamp: '6h ago',
    content:
      'The psychology of revenge trading - my journey overcoming it. After blowing two accounts in 2023, I finally understand that the market doesn\'t owe me anything. Journaling every trade and working with the AI mentor helped me identify my emotional triggers. Down 3 trades? Walk away. It\'s that simple.',
    tags: ['#psychology', '#trading-journal', '#discipline'],
    likes: 423,
    comments: 94,
    shares: 156,
    hasImage: false,
    commentList: [
      {
        id: 'c5',
        author: 'Sarah M.',
        avatar: 'SM',
        role: 'Instructor',
        text: 'This is incredibly brave to share. Your story will help so many traders who are going through the same thing.',
        timestamp: '5h ago',
      },
      {
        id: 'c6',
        author: 'Tom B.',
        avatar: 'TB',
        role: 'Student',
        text: 'I\'m currently in the same boat. This post just gave me the push to start journaling properly.',
        timestamp: '4h ago',
      },
    ],
    totalComments: 94,
  },
  {
    id: '4',
    author: 'Emma Davis',
    avatar: 'ED',
    role: 'Student',
    roleColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    timestamp: '8h ago',
    content:
      'Question: How do you handle consecutive losses? I\'ve had 5 losing trades in a row this week and I\'m starting to doubt my strategy. My win rate is usually around 55-60% but this drawdown is testing my patience. Would love to hear how experienced traders manage these periods.',
    tags: ['#psychology', '#risk-management', '#ask-community'],
    likes: 89,
    comments: 67,
    shares: 12,
    hasImage: false,
    commentList: [
      {
        id: 'c7',
        author: 'Alex C.',
        avatar: 'AC',
        role: 'Pro Trader',
        text: '5 losses in a row is completely normal with a 55% win rate. Check if your losses are within your expected R:R. If yes, keep executing. If no, re-evaluate.',
        timestamp: '7h ago',
      },
      {
        id: 'c8',
        author: 'Sarah M.',
        avatar: 'SM',
        role: 'Instructor',
        text: 'Review our course on "Drawdown Management". The key metric is your max drawdown, not individual losses. Scale down size during losing streaks.',
        timestamp: '6h ago',
      },
    ],
    totalComments: 67,
  },
  {
    id: '5',
    author: 'Marcus Lee',
    avatar: 'ML',
    role: 'Pro Trader',
    roleColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    timestamp: '12h ago',
    content:
      'Free resource: My custom Price Action checklist that I use before every single trade. It covers market structure, key levels, confluence factors, and entry/exit criteria. I\'ve refined this over 3 years and it\'s been a game-changer for my consistency. Download link in the comments.',
    tags: ['#price-action', '#free-resource', '#checklist'],
    likes: 531,
    comments: 128,
    shares: 203,
    hasImage: true,
    imageGradient: 'from-emerald-500 via-green-500 to-lime-400',
    commentList: [
      {
        id: 'c9',
        author: 'Lisa P.',
        avatar: 'LP',
        role: 'Student',
        text: 'This is gold! Just downloaded it. The confluence section is exactly what I needed.',
        timestamp: '11h ago',
      },
      {
        id: 'c10',
        author: 'James W.',
        avatar: 'JW',
        role: 'Student',
        text: 'Incredible generosity. Adding this to my pre-trading routine starting today.',
        timestamp: '10h ago',
      },
    ],
    totalComments: 128,
  },
  {
    id: '6',
    author: 'Sarah Mitchell',
    avatar: 'SM',
    role: 'Instructor',
    roleColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    timestamp: '1d ago',
    content:
      'Live session recording: Smart Money Concepts deep dive. We covered institutional order flow, liquidity sweeps, and how to identify where smart money is likely positioned. The replay is now available for Pro and Elite members. Key takeaway: always trade in the direction of the higher timeframe bias.',
    tags: ['#smart-money', '#live-session', '#institutional-trading'],
    likes: 346,
    comments: 45,
    shares: 67,
    hasImage: true,
    imageGradient: 'from-teal-400 via-emerald-500 to-green-600',
    commentList: [
      {
        id: 'c11',
        author: 'Mike R.',
        avatar: 'MR',
        role: 'Student',
        text: 'The liquidity sweep section blew my mind. I\'ve been getting stopped out right before reversals.',
        timestamp: '20h ago',
      },
      {
        id: 'c12',
        author: 'David K.',
        avatar: 'DK',
        role: 'Pro Trader',
        text: 'Even as an experienced trader, I picked up new insights from the institutional flow section. Well done!',
        timestamp: '18h ago',
      },
    ],
    totalComments: 45,
  },
]

// ── Sub-components ───────────────────────────────────────────────────────────

function getAvatarColor(name: string): string {
  const colors = [
    'bg-emerald-600',
    'bg-teal-600',
    'bg-green-600',
    'bg-cyan-600',
    'bg-emerald-700',
    'bg-teal-700',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function PostCard({ post, index }: { post: Post; index: number }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [showAllComments, setShowAllComments] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Post Header */}
          <div className="flex items-start gap-3 p-4 pb-2">
            <Avatar className="size-10">
              <AvatarFallback
                className={`${getAvatarColor(post.author)} text-white text-sm font-semibold`}
              >
                {post.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{post.author}</span>
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0 ${post.roleColor}`}
                >
                  {post.role}
                </Badge>
                <span className="text-muted-foreground text-xs">
                  {post.timestamp}
                </span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-sm leading-relaxed text-foreground/90">
              {post.content}
            </p>
          </div>

          {/* Image Placeholder */}
          {post.hasImage && (
            <div className="mx-4 mb-3 rounded-lg overflow-hidden">
              <div
                className={`h-48 bg-gradient-to-br ${post.imageGradient} flex items-center justify-center`}
              >
                <div className="text-white/80 text-center">
                  <TrendingUp className="size-10 mx-auto mb-2 opacity-60" />
                  <span className="text-sm font-medium">Chart Analysis</span>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="px-4 pb-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800 cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="mx-4" />

          {/* Engagement Stats */}
          <div className="px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{likeCount} likes</span>
            <span>{post.totalComments} comments</span>
            <span>{post.shares} shares</span>
          </div>

          <Separator className="mx-4" />

          {/* Action Buttons */}
          <div className="px-4 py-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 h-8 px-3 ${
                liked
                  ? 'text-rose-500 hover:text-rose-600'
                  : 'text-muted-foreground hover:text-rose-500'
              }`}
              onClick={handleLike}
            >
              <motion.div
                whileTap={{ scale: 1.4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Heart
                  className="size-4"
                  fill={liked ? 'currentColor' : 'none'}
                />
              </motion.div>
              <span className="text-xs">Like</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 h-8 px-3 text-muted-foreground hover:text-emerald-600"
            >
              <MessageCircle className="size-4" />
              <span className="text-xs">Comment</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 h-8 px-3 text-muted-foreground hover:text-emerald-600"
            >
              <Share2 className="size-4" />
              <span className="text-xs">Share</span>
            </Button>
          </div>

          {/* Comments Preview */}
          {post.commentList.length > 0 && (
            <div className="mx-4 mb-4">
              <Separator className="mb-3" />
              {showAllComments
                ? post.commentList.map((comment) => (
                    <CommentBubble key={comment.id} comment={comment} />
                  ))
                : post.commentList.slice(0, 2).map((comment) => (
                    <CommentBubble key={comment.id} comment={comment} />
                  ))}
              {post.totalComments > 2 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline mt-1 cursor-pointer"
                >
                  {showAllComments
                    ? 'Show less'
                    : `View all ${post.totalComments} comments`}
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CommentBubble({ comment }: { comment: Comment }) {
  const roleColors: Record<string, string> = {
    Instructor:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    'Pro Trader':
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Student:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  }

  return (
    <div className="flex gap-2 py-1.5">
      <Avatar className="size-6 mt-0.5">
        <AvatarFallback
          className={`${getAvatarColor(comment.author)} text-white text-[10px] font-semibold`}
        >
          {comment.avatar}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold">{comment.author}</span>
          {comment.role && (
            <Badge
              variant="secondary"
              className={`text-[9px] px-1 py-0 h-4 ${
                roleColors[comment.role] || ''
              }`}
            >
              {comment.role}
            </Badge>
          )}
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed mt-0.5">
          {comment.text}
        </p>
        <span className="text-[10px] text-muted-foreground">
          {comment.timestamp}
        </span>
      </div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function CommunityView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('trending')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Community</h1>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Post</span>
          </Button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, tags, users..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-auto"
          >
            <TabsList className="h-9">
              <TabsTrigger value="trending" className="gap-1.5 text-xs px-3">
                <TrendingUp className="size-3.5" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="latest" className="gap-1.5 text-xs px-3">
                <Clock className="size-3.5" />
                Latest
              </TabsTrigger>
              <TabsTrigger value="following" className="gap-1.5 text-xs px-3">
                <Users className="size-3.5" />
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Live Session Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="mb-6 border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="size-10 rounded-full bg-emerald-600 flex items-center justify-center">
                      <Radio className="size-5 text-white" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                        Live
                      </span>
                    </div>
                    <p className="text-sm font-medium mt-0.5 truncate">
                      Scalping Masterclass with Sarah &mdash; 7:00 PM GMT
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tonight &bull; Free for all members
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                >
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Posts Feed */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {mockPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/50"
          >
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  )
}