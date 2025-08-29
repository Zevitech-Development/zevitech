import DailogLeadForm from '@/forms/dailog-lead-form';
import React from 'react';
import { Button } from '../ui/button';
import { FaArrowRightLong } from 'react-icons/fa6';
import Image from 'next/image';

const GlobalCTA: React.FC = () => {

  const teamMembers = [
    {
      id: 1,
      src: "https://randomuser.me/api/portraits/men/47.jpg",
      alt: "Team member 1",
      className: "absolute transform translate-x-24 ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"
    },
    {
      id: 2,
      src: "https://randomuser.me/api/portraits/men/49.jpg",
      alt: "Team member 2",
      className: "absolute transform -translate-x-24 -ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"
    },
    {
      id: 3,
      src: "https://randomuser.me/api/portraits/women/46.jpg",
      alt: "Team member 3",
      className: "absolute transform -translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"
    },
    {
      id: 4,
      src: "https://randomuser.me/api/portraits/men/48.jpg",
      alt: "Team member 4",
      className: "absolute transform translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"
    },
    {
      id: 5,
      src: "https://randomuser.me/api/portraits/women/43.jpg",
      alt: "Team member 5",
      className: "rounded-full w-20 h-20 md:w-24 md:h-24 border-4 border-white relative"
    }
  ];

  return (
    <section className="w-full flex ">
      <div className="max-w-7xl mx-auto px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center space-y-5">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Get started now
          </h2>

          <div className="inline-flex items-end justify-center w-full text-center mx-auto">
            {teamMembers.map((member) => (
              <Image
                key={member.id}
                src={member.src}
                alt={member.alt}
                className={member.className}
                loading="lazy"
              />
            ))}
          </div>

          <p className="mt-1 text-heading font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Discover your potential
            <span className="px-2 py-1 relative inline-block">
              <svg
                className="stroke-current bottom-0 absolute text-[#007afc] -translate-x-2"
                viewBox="0 0 410 18"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602"
                  strokeWidth="12"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                />
              </svg>
              <span className="relative">with us</span>
            </span>
          </p>

          <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
            Sign up now and experience the difference in just one week
          </p>
          <div className="flex-center">
            <DailogLeadForm
              trigger={
                <Button className="cta-button h-[60px] md:px-6 group lg:hover:scale-105 rounded-full lg:hover:bg-primary-hover md:text-xl text-base lg:!animation-standard font-bold">
                  Let&apos;s Get Started
                  <FaArrowRightLong className="group-hover:translate-x-[2px] animation-standard" />
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCTA;