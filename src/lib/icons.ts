// ── src/lib/icons.ts ───────────────────────────────────────────────────────
// Resolves the icon-name strings stored by the backend (e.g. "TriangleAlert")
// to their lucide-react component, for both the public page and the admin
// CRUD forms' icon preview.

import {
  Shield, Globe, Phone, ArrowRight, BookOpen, Bot,
  Building2, Users, Award, TrendingUp, TriangleAlert, HardHat,
  FileCheck, GraduationCap, Scale, FileText, Download, ExternalLink,
  TrendingDown, CircleCheck, Activity, Clock, MapPin, Monitor, Star,
  Sparkles, Search, Calendar, Send, Menu, Play, ChevronRight, ChevronDown,
  Target, UserPlus, Newspaper, Megaphone, Bell, Layers, Badge, Circle,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Shield, Globe, Phone, ArrowRight, BookOpen, Bot, Building2, Users, Award,
  TrendingUp, TriangleAlert, HardHat, FileCheck, GraduationCap, Scale,
  FileText, Download, ExternalLink, TrendingDown, CircleCheck, Activity,
  Clock, MapPin, Monitor, Star, Sparkles, Search, Calendar, Send, Menu,
  Play, ChevronRight, ChevronDown, Target, UserPlus, Newspaper, Megaphone,
  Bell, Layers, Badge,
};

export function resolveIcon(name: string | null | undefined): LucideIcon {
  return (name && ICONS[name]) || Circle;
}
