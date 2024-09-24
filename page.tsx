'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';

// impport sections from './sections/..' as needed


// example sections
const sections = [
  { name: 'HOME', Component: Home },
  { name: 'ABOUT', Component: aboutSection },
  { name: 'PROJECTS', Component: Projects },
  { name: 'CLIENTS', Component: Clients },
  { name: 'QUOTE', Component: Quote },
  { name: 'CONTACT', Component: Contact },
];


export default function Page() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0 && activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      } else if (event.deltaY < 0 && activeSection > 0) {
        setActiveSection(activeSection - 1);
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    sectionRefs.current[activeSection]?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="h-screen overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-[#40173d]">
        <div className="container mx-auto w-3/5 h-full flex items-center justify-center px-4">
          
          <div className="hidden md:flex space-x-4">
            {sections.map(({ name }, index) => (
              <button
                key={name}
                className={`text-md font-light ${
                  index === activeSection ? 'text-blue-600' : 'text-[#9cdca8] hover:text-pink-600 transition duration-200'
                }`}
                onClick={() => setActiveSection(index)}
              >
                {name}
              </button>
            ))}
          </div>
          <Menu className="md:hidden" />
        </div>
      </nav>

      <div className="mt-16">
        {sections.map(({ name, Component }, index) => (
          <div
            key={name}
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[index] = el;
            }}
            className="h-full"
          >
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}
