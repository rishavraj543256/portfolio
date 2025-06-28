import React from "react";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";

interface Props {
  username: string;
}

const CustomGitHubCalendar = ({ username }: Props) => {
  return (
    <div className="w-full glass-card p-4 md:p-6 lg:p-8 shadow-2xl">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 gradient-text"
      >
        GitHub Calendar
      </motion.h2>
      
      <div className="flex flex-col items-center">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] md:min-w-0">
            <GitHubCalendar
              username={username}
              blockSize={12}
              blockMargin={4}
              colorScheme="dark"
              fontSize={14}
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>
        
        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View my GitHub profile →
        </motion.a>
      </div>
    </div>
  );
};

export default CustomGitHubCalendar;