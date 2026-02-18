'use client';

import { Menu, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TOOL_ROUTES } from '@/lib/tool-catalog';
import { useUiStore } from '@/store/useUiStore';
import { useThemeStore } from '@/store/useThemeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdSlot } from '@/components/ads/AdSlot';
import { cn } from '@/lib/utils';

type AppShellProps = {
  children: ReactNode;
};

const PREFETCH_ROUTES = [
  '/json-tools',
  '/html-tools',
  '/css-tools',
  '/encode-decode',
  '/text-tools',
  '/sql-formatter',
  '/diff-checker',
  '/text-diff-checker',
  '/json-formatter',
  '/json-validator',
  '/json-to-typescript',
  '/json-to-csv',
  '/html-minifier',
  '/html-beautifier',
  '/css-minifier',
  '/css-beautifier',
  '/base64-encode-decode',
  '/url-encoder',
  '/url-decoder'
] as const;

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { sidebarCollapsed, toggleSidebar, searchQuery, setSearchQuery } = useUiStore();
  const { mode, toggleMode } = useThemeStore();

  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      return TOOL_ROUTES;
    }
    return TOOL_ROUTES.filter((tool) =>
      `${tool.label} ${tool.description}`.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const currentTool =
    TOOL_ROUTES.find((tool) => tool.path === pathname) ??
    TOOL_ROUTES.find((tool) => {
      if (pathname?.startsWith('/json-')) {
        return tool.path === '/json-tools';
      }
      if (pathname?.startsWith('/html-')) {
        return tool.path === '/html-tools';
      }
      if (pathname?.startsWith('/css-')) {
        return tool.path === '/css-tools';
      }
      if (pathname?.startsWith('/text-') || pathname?.startsWith('/diff-')) {
        return tool.path === '/text-tools';
      }
      if (pathname?.startsWith('/url-') || pathname?.startsWith('/base64-')) {
        return tool.path === '/encode-decode';
      }
      return false;
    });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'light-filter');
    root.classList.add(mode === 'dark' ? 'dark' : 'light');
  }, [mode]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const route of PREFETCH_ROUTES) {
        router.prefetch(route);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen">
      <motion.aside
        animate={{ width: sidebarCollapsed ? 84 : 300 }}
        className={cn('fixed inset-y-0 z-40 hidden border-r border-border bg-card/95 p-3 backdrop-blur-xl lg:block')}
      >
        <SidebarContent
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          filteredTools={filteredTools}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          currentPath={pathname ?? '/'}
        />
      </motion.aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside
            className="h-full w-72 border-r border-border bg-card p-3"
            onClick={(event) => event.stopPropagation()}
          >
            <SidebarContent
              collapsed={false}
              onToggleCollapse={() => setMobileOpen(false)}
              filteredTools={filteredTools}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              currentPath={pathname ?? '/'}
            />
          </aside>
        </div>
      )}

      <div
        className={cn(
          'w-full transition-all duration-300',
          sidebarCollapsed ? 'lg:pl-[84px]' : 'lg:pl-[300px]'
        )}
      >
        <header className="sticky top-0 z-30 border-b border-border/80 bg-card/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3">
            <Button className="lg:hidden" variant="secondary" size="icon" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">DevFormat - all in one toolkit</p>
              <h1 className="text-xl font-semibold">
                {currentTool?.label ?? 'DevFormat - all in one toolkit'}
              </h1>
            </div>
            <Button variant="outline" size="sm" className="ml-auto" onClick={toggleMode}>
              {mode === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
            <div className="text-xs text-slate-300">
              Shortcut: <span className="font-mono">Ctrl+Enter</span>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 lg:px-8">{children}</main>
        <div className="px-4 pb-10 lg:px-8">
          <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER ?? ''} className="mx-auto max-w-4xl" format="horizontal" />
        </div>
      </div>
    </div>
  );
}

type SidebarContentProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  filteredTools: typeof TOOL_ROUTES;
  searchQuery: string;
  onSearch: (value: string) => void;
  currentPath: string;
};

function SidebarContent({
  collapsed,
  onToggleCollapse,
  filteredTools,
  searchQuery,
  onSearch,
  currentPath
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        {!collapsed && (
          <Link href="/" className="text-lg font-semibold tracking-tight">
            DevFormat
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      {!collapsed && (
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search tools"
            className="pl-9"
          />
        </div>
      )}

      <ScrollArea className="h-[calc(100vh-180px)]">
        <nav className="space-y-1 pr-2">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.path}
                href={tool.path}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                  currentPath === tool.path
                    ? 'bg-accent/20 text-accent'
                    : 'text-slate-300 hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && (
                  <div className="min-w-0">
                    <p className="truncate font-medium">{tool.label}</p>
                    <p className="truncate text-xs text-slate-400">{tool.description}</p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
