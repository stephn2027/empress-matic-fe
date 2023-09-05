import { useState, useEffect } from 'react';
import STACKS from '../../../assets/constants/stacks';
import Icon from '../../Icons';

export default function TechStacks() {
  const [width, setWidth] = useState(window.innerWidth);
  const [openTab, setOpenTab] = useState('WEB');

  const windowSizeSm = 420;

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [width]);

  return (
    <div className="stacks-container xl:h-96">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ul className="stacks-header flex gap-4 md:w-96 justify-center">
          {STACKS.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setOpenTab(tab.title)}
                style={{
                  fontSize: 'clamp(.3rem, .5rem + 1vw, 1.6rem)',
                  fontWeight: '600',
                  pointerEvents: 'auto',
                }}
                className={`py-2 border-b-4 transition-colors duration-500 ${
                  tab.title === openTab
                    ? 'border-purple-500'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="p-3 mt-5 bg-white">
          {STACKS.map((tab) => (
            <div
              key={tab.id}
              className={
                tab.title === openTab
                  ? 'open-tab tab-content tab-content-show flex flex-wrap gap-4 '
                  : 'hidden'
              }
            >
              {tab.tech.map((icon) => (
                <Icon
                  IconName={icon}
                  key={icon}
                  style={{
                    size: width < windowSizeSm ? '1.3rem' : '2.4rem',
                    color: '#0e0e12',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
