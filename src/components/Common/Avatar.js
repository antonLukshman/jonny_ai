import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../context/AuthContext";

function Avatar({ isAI }) {
  const { currentUser } = useAuth();

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
    // Get initial from display name if available, otherwise from email
    if (currentUser?.displayName) {
      return currentUser.displayName.charAt(0).toUpperCase();
    } else if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return "U";
  }, [currentUser]);

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

  // If user has a photo URL, use it; otherwise, display initial
  if (currentUser?.photoURL) {
    return (
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src={currentUser.photoURL}
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
      {userInitial}
    </div>
  );
}

export default Avatar;
