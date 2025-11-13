import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
  category?: string;
}

export const useKeyboardShortcuts = (
  shortcuts: KeyboardShortcut[],
  options?: {
    enabled?: boolean;
    preventDefault?: boolean;
  }
) => {
  const { enabled = true, preventDefault = true } = options || {};

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow specific shortcuts like Escape even in inputs
        if (event.key !== 'Escape' && event.key !== '/') {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = !!shortcut.ctrlKey === event.ctrlKey;
        const shiftMatches = !!shortcut.shiftKey === event.shiftKey;
        const altMatches = !!shortcut.altKey === event.altKey;
        const metaMatches = !!shortcut.metaKey === event.metaKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
          if (preventDefault) {
            event.preventDefault();
          }
          shortcut.action();
          break;
        }
      }
    },
    [shortcuts, enabled, preventDefault]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};

// Predefined shortcuts configuration
export const defaultShortcuts = {
  SEARCH: { key: '/', description: 'Focus search', category: 'Navigation' },
  NEW_POST: { key: 'n', description: 'Create new post', category: 'Actions' },
  REFRESH: { key: 'r', description: 'Refresh feed', category: 'Actions' },
  HELP: { key: '?', shiftKey: true, description: 'Show help', category: 'General' },
  ESCAPE: { key: 'Escape', description: 'Close modal/dialog', category: 'General' },

  // Vim-style navigation
  NEXT_ITEM: { key: 'j', description: 'Next item', category: 'Navigation' },
  PREV_ITEM: { key: 'k', description: 'Previous item', category: 'Navigation' },

  // Additional shortcuts
  BOOKMARK: { key: 'b', description: 'Bookmark current item', category: 'Actions' },
  NOTIFICATIONS: { key: 'n', shiftKey: true, description: 'Toggle notifications', category: 'Navigation' },
  THEME: { key: 't', description: 'Toggle theme', category: 'Settings' },

  // With modifiers
  SAVE: { key: 's', ctrlKey: true, description: 'Save', category: 'Actions' },
  FIND: { key: 'f', ctrlKey: true, description: 'Find in page', category: 'Navigation' },
};
