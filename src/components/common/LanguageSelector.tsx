import React from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../../i18n';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC<{ variant?: 'minimal' | 'full' }> = ({ variant = 'minimal' }) => {
  const { language, setLanguage } = useApp();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      <Globe size={16} color="var(--primary-600)" />
      <div style={{ display: 'flex', background: 'var(--bg-app)', padding: '3px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code as SupportedLanguage)}
              style={{
                border: 'none',
                background: isSelected ? 'var(--primary-600)' : 'transparent',
                color: isSelected ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isSelected ? 600 : 500,
                fontSize: '0.82rem',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title={`Switch language to ${lang.name}`}
            >
              {lang.nativeName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
