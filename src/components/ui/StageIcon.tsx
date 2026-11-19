import {
  Rocket, Boxes, Layers, GitBranch, FunctionSquare, FileCode2, Box,
  Sparkles, Trophy, type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Rocket, Boxes, Layers, GitBranch, FunctionSquare, FileCode2, Box, Sparkles, Trophy,
}

export function StageIcon({ name, size = 22, className }: { name: string; size?: number; className?: string }) {
  const Icon = map[name] || Rocket
  return <Icon size={size} className={className} strokeWidth={1.8} />
}
