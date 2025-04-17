import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useAuth } from "../../context/AuthContext";

function Avatar({ isAI, size = "md" }) {
  const { currentUser } = useAuth();

  // Size classes
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

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
    if (!currentUser) return "U";
    if (currentUser.displayName) {
      return currentUser.displayName.charAt(0).toUpperCase();
    }
    return currentUser.email.charAt(0).toUpperCase();
  }, [currentUser]);

  if (isAI) {
    return (
      <animated.div
        style={aiAnimation}
        className={`${sizeClasses[size]} rounded-full bg-secondary flex items-center justify-center overflow-hidden`}
      >
        <img src="/logo.svg" alt="Jonny AI" className="w-3/4 h-3/4" />
      </animated.div>
    );
  }

  // If user has a photo URL, use it
  if (currentUser?.photoURL) {
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden`}>
        <img
          src={currentUser.photoURL}
          alt={currentUser.displayName || "User"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer" // Important for Google profile images
        />
      </div>
    );
  }

  // Otherwise, show the initial with background
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-accent flex items-center justify-center text-white font-semibold`}
    >
      {userInitial}
    </div>
  );
}

export default Avatar;
