import React from "react";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";

interface Props {
  username: string;
}

const CustomGitHubCalendar = ({ username }: Props) => {
  return (
    <div className="w-full bg-[#0d1117] rounded-lg p-6 shadow-lg">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-center mb-6 text-[#4eeaac]"
      >
        GitHub Calendar
      </motion.h2>
      <div className="flex flex-col items-center">
        <GitHubCalendar
          username={username}
          blockSize={16}
          blockMargin={5}
          colorScheme="dark"
          fontSize={16}
        />
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm text-gray-400 hover:text-[#4eeaac] transition-colors"
        >
          View my GitHub profile
        </a>
      </div>
    </div>
  );
};

export default CustomGitHubCalendar; 