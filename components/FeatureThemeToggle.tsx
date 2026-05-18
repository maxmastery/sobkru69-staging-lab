import React from 'react';
import { Moon, Sun } from 'lucide-react';

export type FeatureTheme = 'light' | 'dark';

interface FeatureThemeToggleProps {
  theme: FeatureTheme;
  onToggle: () => void;
  className?: string;
}

const FeatureThemeToggle: React.FC<FeatureThemeToggleProps> = ({ theme, onToggle, className = '' }) => (
  <button
    type="button"
    aria-label={theme === 'dark' ? 'กำลังใช้ธีมมืด กดเพื่อเปลี่ยนเป็นธีมสว่าง' : 'กำลังใช้ธีมสว่าง กดเพื่อเปลี่ยนเป็นธีมมืด'}
    aria-pressed={theme === 'dark'}
    onClick={onToggle}
    className={`lesson-theme-toggle ${theme === 'dark' ? 'is-dark' : 'is-light'} ${className}`}
  >
    <span className="lesson-theme-toggle__label">
      {theme === 'dark' ? (
        <>
          Dark
          <br />
          Mode
        </>
      ) : (
        <>
          Light
          <br />
          Mode
        </>
      )}
    </span>
    <span className="lesson-theme-toggle__knob">
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5" />
      )}
    </span>
  </button>
);

export default FeatureThemeToggle;
