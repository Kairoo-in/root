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
};

export default function IconRenderer({ name, className = '', size = 24 }: IconRendererProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback to a default icon or empty div
    return <div className={className} style={{ width: size, height: size }} />;
  }

  return <IconComponent className={className} size={size} />;
}

