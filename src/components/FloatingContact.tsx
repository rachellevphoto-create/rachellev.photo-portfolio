import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../i18n/LanguageContext';

const PHONE = '+972-55-672-0636';
const EMAIL = 'rachellev.photo@gmail.com';

interface FabItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isRTL: boolean;
  index: number;
}

function FabItem({ href, icon, label, isRTL, index }: FabItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="relative flex items-center"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: isRTL ? -8 : 8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: isRTL ? -8 : 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-teal-dark shadow-lg dark:bg-surface-dark dark:text-offwhite ${isRTL ? 'left-14' : 'right-14'}`}
            dir="ltr"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal shadow-lg transition-all hover:scale-110 hover:shadow-xl dark:bg-surface-dark dark:text-teal-light"
      >
        {icon}
      </a>
    </motion.div>
  );
}

export default function FloatingContact() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const isRTL = lang === 'he';

  const items = [
    { href: `tel:${PHONE.replace(/-/g, '')}`, icon: <Phone size={20} />, label: PHONE },
    { href: `mailto:${EMAIL}`, icon: <Mail size={20} />, label: EMAIL },
  ];

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 z-40 flex flex-col items-center gap-3 ${isRTL ? 'left-6' : 'right-6'}`}
    >
      <AnimatePresence>
        {open && items.map((item, i) => (
          <FabItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isRTL={isRTL}
            index={i}
          />
        ))}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-lg transition-all hover:bg-coral-light hover:shadow-xl active:scale-95"
        aria-label="Contact"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
