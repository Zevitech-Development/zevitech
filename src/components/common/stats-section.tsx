import React from 'react'

import CountUp from "react-countup";

import { motion } from "framer-motion";

import { WebStatsData } from '../../content/home-page/home-page-content';

const StatsSection = () => {
  return (
    <>
        <section className="layout-standard grid md:grid-cols-3 gap-8 py-10 lg:py-16">
      {WebStatsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center p-4 "
        >
          <div className="text-3xl lg:text-5xl font-extrabold text-primary mb-2">
            <CountUp
              end={stat.number}
              duration={2.25}
              suffix={stat.suffix || ""}
            />
          </div>
          <div className="text-heading font-semibold font-inter md:max-w-[150px]">{stat.label}</div>
        </motion.div>
      ))}
    </section>
    </>
  )
}

export default StatsSection