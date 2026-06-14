'use client';

import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

// Map icon names to actual icon components
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  map: LucideIcons.Map,
  'file-text': LucideIcons.FileText,
  mic: LucideIcons.Mic,
  'trending-up': LucideIcons.TrendingUp,
  compass: LucideIcons.Compass,
  code: LucideIcons.Code,
  briefcase: LucideIcons.Briefcase,
  award: LucideIcons.Award,
  'user-square': LucideIcons.UserSquare,
  users: LucideIcons.Users,
  target: LucideIcons.Target,
  'calendar-check': LucideIcons.CalendarCheck,
  'mail-plus': LucideIcons.MailPlus,
  'clipboard-list': LucideIcons.ClipboardList,
  'pen-square': LucideIcons.PenSquare,
  flag: LucideIcons.Flag,
  lightbulb: LucideIcons.Lightbulb,
  'graduation-cap': LucideIcons.GraduationCap,
  'shield-check': LucideIcons.ShieldCheck,
  network: LucideIcons.Network,
  'heart-pulse': LucideIcons.HeartPulse,
  'piggy-bank': LucideIcons.PiggyBank,
  megaphone: LucideIcons.Megaphone,
  recycle: LucideIcons.Recycle,
  activity: LucideIcons.Activity,
  'dollar-sign': LucideIcons.DollarSign,
  presentation: LucideIcons.Presentation,
  'shield-half': LucideIcons.ShieldHalf,
  'drafting-compass': LucideIcons.DraftingCompass,
  'book-key': LucideIcons.BookKey,
  waypoints: LucideIcons.Waypoints,
  sitemap: LucideIcons.CircuitBoard,
  route: LucideIcons.Route,
  'message-circle': LucideIcons.MessageCircle,
  wrench: LucideIcons.Wrench,
  'refresh-cw': LucideIcons.RefreshCw,
  'bar-chart-3': LucideIcons.BarChart3,
  'satellite-dish': LucideIcons.SatelliteDish,
  brain: LucideIcons.Brain,
  workflow: LucideIcons.Workflow,
  sparkles: LucideIcons.Sparkles,
  'git-branch': LucideIcons.GitBranch,
  repeat: LucideIcons.Repeat,
  'user-check': LucideIcons.UserCheck,
  gauge: LucideIcons.Gauge,
  plug: LucideIcons.Plug,
  'arrow-right': LucideIcons.ArrowRight,
  zap: LucideIcons.Zap,
  check: LucideIcons.Check,
  'check-circle': LucideIcons.CheckCircle2,
  'chevron-down': LucideIcons.ChevronDown,
  quote: LucideIcons.Quote,
  star: LucideIcons.Star,
  rocket: LucideIcons.Rocket,
  'line-chart': LucideIcons.LineChart,
  clock: LucideIcons.Clock,
  play: LucideIcons.Play,
  layers: LucideIcons.Layers,
  globe: LucideIcons.Globe,
  'badge-check': LucideIcons.BadgeCheck,
  infinity: LucideIcons.Infinity,
  radar: LucideIcons.Radar,
  shield: LucideIcons.Shield,
  bell: LucideIcons.Bell,
  'git-merge': LucideIcons.GitMerge,
  'shield-alert': LucideIcons.ShieldAlert,
  headset: LucideIcons.Headset,
  'book-open': LucideIcons.BookOpen,
  bot: LucideIcons.Bot,
  'folder-kanban': LucideIcons.FolderKanban,
  lock: LucideIcons.Lock,
  'credit-card': LucideIcons.CreditCard,
  crown: LucideIcons.Crown,
  building: LucideIcons.Building2,
  'layout-dashboard': LucideIcons.LayoutDashboard,
  'key-round': LucideIcons.KeyRound,
  send: LucideIcons.Send,
  mail: LucideIcons.Mail,
  'mail-check': LucideIcons.MailCheck,
  'message-square': LucideIcons.MessageSquare,
  'calendar-clock': LucideIcons.CalendarClock,
  'calendar-days': LucideIcons.CalendarDays,
  'phone-call': LucideIcons.PhoneCall,
  'life-buoy': LucideIcons.LifeBuoy,
  'map-pin': LucideIcons.MapPin,
  handshake: LucideIcons.Handshake,
  'arrow-up-right': LucideIcons.ArrowUpRight,
  'trending-down': LucideIcons.TrendingDown,
  'circle-help': LucideIcons.CircleHelp,
  'app-window': LucideIcons.AppWindow,
  database: LucideIcons.Database,
  'eye-off': LucideIcons.EyeOff,
  'file-check-2': LucideIcons.FileCheck2,
  'scroll-text': LucideIcons.ScrollText,
  'clock-3': LucideIcons.Clock3,
  server: LucideIcons.Server,
  'lock-keyhole': LucideIcons.LockKeyhole,
  fingerprint: LucideIcons.Fingerprint,
  'scan-eye': LucideIcons.ScanEye,
  siren: LucideIcons.Siren,
  'server-cog': LucideIcons.ServerCog,
  'file-lock-2': LucideIcons.FileLock2,
  'lock-open': LucideIcons.LockOpen,
};

export default function IconRenderer({ name, className = '', size = 24 }: IconRendererProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback to a default icon or empty div
    return <div className={className} style={{ width: size, height: size }} />;
  }

  return <IconComponent className={className} size={size} />;
}

