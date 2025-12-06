import React from 'react';
import { Shape, ColorTheme } from './types';
import { 
  FileText, Star, Heart, Zap, Coffee, Sun, Moon, Cloud, 
  Music, Camera, MapPin, Smile, Folder as FolderIcon,
  Book, Anchor, Feather, Key, Gift, Bell, Crown, 
  Gamepad, Headphones, Umbrella, Scissors,
  // Science & Academic
  Atom, FlaskConical, Dna, Microscope, Calculator, 
  Sigma, Brain, Globe, Hourglass, Compass, Telescope, GraduationCap
} from 'lucide-react';

export const LIGHT_COLORS: Record<ColorTheme, string> = {
  rose: 'bg-rose-100 text-rose-950 border-rose-300',
  blue: 'bg-blue-100 text-blue-950 border-blue-300',
  green: 'bg-green-100 text-green-950 border-green-300',
  yellow: 'bg-amber-100 text-amber-950 border-amber-300',
  violet: 'bg-violet-100 text-violet-950 border-violet-300',
  orange: 'bg-orange-100 text-orange-950 border-orange-300',
  slate: 'bg-slate-100 text-slate-950 border-slate-300',
  teal: 'bg-teal-100 text-teal-950 border-teal-300',
  cyan: 'bg-cyan-100 text-cyan-950 border-cyan-300',
  lime: 'bg-lime-100 text-lime-950 border-lime-300',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-950 border-fuchsia-300',
  emerald: 'bg-emerald-100 text-emerald-950 border-emerald-300',
  indigo: 'bg-indigo-100 text-indigo-950 border-indigo-300',
  stone: 'bg-stone-100 text-stone-950 border-stone-300',
  neutral: 'bg-neutral-100 text-neutral-950 border-neutral-300',
  // New
  mint: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  graphite: 'bg-zinc-200 text-zinc-900 border-zinc-400',
  cherry: 'bg-red-100 text-red-900 border-red-300',
  gold: 'bg-yellow-100 text-yellow-900 border-yellow-300',
  lavender: 'bg-purple-100 text-purple-900 border-purple-300',
  sky: 'bg-sky-100 text-sky-900 border-sky-300',
  salmon: 'bg-red-50 text-red-900 border-red-200',
  charcoal: 'bg-gray-200 text-gray-900 border-gray-400',
  coffee: 'bg-amber-100 text-amber-950 border-amber-300',
  lilac: 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200',
};

// SOLID COLORS for Dark Mode (Performance Optimization)
export const DARK_COLORS: Record<ColorTheme, string> = {
  rose: 'bg-rose-950 text-rose-100 border-rose-800',
  blue: 'bg-blue-950 text-blue-100 border-blue-800',
  green: 'bg-green-950 text-green-100 border-green-800',
  yellow: 'bg-amber-950 text-amber-100 border-amber-800',
  violet: 'bg-violet-950 text-violet-100 border-violet-800',
  orange: 'bg-orange-950 text-orange-100 border-orange-800',
  slate: 'bg-slate-900 text-slate-200 border-slate-700',
  teal: 'bg-teal-950 text-teal-100 border-teal-800',
  cyan: 'bg-cyan-950 text-cyan-100 border-cyan-800',
  lime: 'bg-lime-950 text-lime-100 border-lime-800',
  fuchsia: 'bg-fuchsia-950 text-fuchsia-100 border-fuchsia-800',
  emerald: 'bg-emerald-950 text-emerald-100 border-emerald-800',
  indigo: 'bg-indigo-950 text-indigo-100 border-indigo-800',
  stone: 'bg-stone-900 text-stone-200 border-stone-700',
  neutral: 'bg-neutral-900 text-neutral-200 border-neutral-700',
  // New
  mint: 'bg-emerald-900 text-emerald-100 border-emerald-700',
  graphite: 'bg-zinc-800 text-zinc-100 border-zinc-600',
  cherry: 'bg-red-950 text-red-100 border-red-800',
  gold: 'bg-yellow-950 text-yellow-100 border-yellow-800',
  lavender: 'bg-purple-950 text-purple-100 border-purple-800',
  sky: 'bg-sky-950 text-sky-100 border-sky-800',
  salmon: 'bg-red-900 text-red-100 border-red-700',
  charcoal: 'bg-gray-800 text-gray-100 border-gray-600',
  coffee: 'bg-amber-950 text-amber-100 border-amber-800',
  lilac: 'bg-fuchsia-950 text-fuchsia-100 border-fuchsia-800',
};

export const SHAPES: Shape[] = [
  'rounded-3xl', 
  'rounded-t-[3rem] rounded-b-2xl', 
  'rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-xl rounded-br-xl', 
  'rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl', 
  'rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl', 
  'rounded-t-xl rounded-b-[4rem]', 
  'rounded-l-xl rounded-r-[4rem]', 
  'rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md', 
  'rounded-[2rem] rounded-tr-none', 
  'rounded-[2.5rem] rounded-bl-none', 
  'rounded-[3rem] rounded-t-lg', 
  'rounded-[1.5rem] rounded-tr-[5rem]', 
  'rounded-2xl', 
  'rounded-none rounded-tr-3xl rounded-bl-3xl',
  // New
  'rounded-[4rem] rounded-tr-none rounded-bl-none',
  'rounded-t-full rounded-b-lg',
  'rounded-b-full rounded-t-lg',
  'rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-none rounded-bl-none',
  'rounded-[2rem] rounded-tl-none rounded-br-none',
  'rounded-l-[3rem] rounded-r-lg',
  'rounded-r-[3rem] rounded-l-lg',
  'rounded-[3rem] rounded-br-lg',
  'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-[4rem]',
  'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-[4rem]',
  'rounded-lg',
  'rounded-[50px]'
];

export const ICONS: Record<string, React.ElementType> = {
  'file-text': FileText, 'star': Star, 'heart': Heart, 'zap': Zap, 'coffee': Coffee, 
  'sun': Sun, 'moon': Moon, 'cloud': Cloud, 'music': Music, 'camera': Camera, 
  'map-pin': MapPin, 'smile': Smile, 'folder': FolderIcon, 'book': Book, 
  'anchor': Anchor, 'feather': Feather, 'key': Key, 'gift': Gift, 'bell': Bell, 
  'crown': Crown, 'gamepad': Gamepad, 'headphones': Headphones, 'umbrella': Umbrella, 
  'scissors': Scissors,
  // Science & Academic
  'atom': Atom, 'flask': FlaskConical, 'dna': Dna, 'microscope': Microscope, 
  'calculator': Calculator, 'sigma': Sigma, 'brain': Brain, 'globe': Globe, 
  'hourglass': Hourglass, 'compass': Compass, 'telescope': Telescope, 
  'grad-cap': GraduationCap
};
