import { X, Keyboard } from 'lucide-react';

interface ShortcutGroup {
  category: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    category: 'Navigation',
    shortcuts: [
      { keys: ['/'], description: 'Focus search' },
      { keys: ['j'], description: 'Next item' },
      { keys: ['k'], description: 'Previous item' },
      { keys: ['Shift', 'N'], description: 'Toggle notifications' },
      { keys: ['Esc'], description: 'Close modal/dialog' },
    ],
  },
  {
    category: 'Actions',
    shortcuts: [
      { keys: ['n'], description: 'Create new post' },
      { keys: ['r'], description: 'Refresh feed' },
      { keys: ['b'], description: 'Bookmark current item' },
      { keys: ['Ctrl', 'S'], description: 'Save (where applicable)' },
    ],
  },
  {
    category: 'Settings',
    shortcuts: [
      { keys: ['t'], description: 'Toggle theme' },
      { keys: ['?'], description: 'Show this help' },
    ],
  },
];

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal = ({ isOpen, onClose }: KeyboardShortcutsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg">
                <Keyboard className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Keyboard Shortcuts
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {shortcutGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {group.category}
              </h3>
              <div className="space-y-3">
                {group.shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex} className="flex items-center gap-1">
                          <kbd className="px-2.5 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-gray-400">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">?</kbd> anytime to view this help
          </p>
        </div>
      </div>
    </div>
  );
};
