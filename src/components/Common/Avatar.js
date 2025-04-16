import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

function Avatar({ isAI }) {
  // Random animation for AI avatar to make it more lively
  const aiAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "scale(1.05)", config: { duration: 2000 } });
        await next({ transform: "scale(1)", config: { duration: 2000 } });
      }
    },
  });

  // For user avatar, use initials or default
  const userInitial = useMemo(() => {
    // In a real app, you would get this from the user's name
    return "U";
  }, []);

  if (isAI) {
    return (
      <animated.div
        style={aiAnimation}
        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center overflow-hidden"
      >
        <img src="/logo.svg" alt="Jonny AI" className="w-6 h-6" />
      </animated.div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
      {userInitial}
    </div>
  );
}

export default Avatar;
