"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CursorState {
  isHovering: boolean;
  hoverType: "default" | "link" | "project" | "button" | "text";
  projectImage: string | null;
  projectTitle: string | null;
}

interface CursorContextType {
  cursorState: CursorState;
  setHovering: (type: CursorState["hoverType"]) => void;
  clearHovering: () => void;
  setProjectPreview: (image: string, title: string) => void;
  clearProjectPreview: () => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return context;
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    hoverType: "default",
    projectImage: null,
    projectTitle: null,
  });

  const setHovering = useCallback((type: CursorState["hoverType"]) => {
    setCursorState((prev) => ({ ...prev, isHovering: true, hoverType: type }));
  }, []);

  const clearHovering = useCallback(() => {
    setCursorState((prev) => ({
      ...prev,
      isHovering: false,
      hoverType: "default",
    }));
  }, []);

  const setProjectPreview = useCallback((image: string, title: string) => {
    setCursorState((prev) => ({
      ...prev,
      isHovering: true,
      hoverType: "project",
      projectImage: image,
      projectTitle: title,
    }));
  }, []);

  const clearProjectPreview = useCallback(() => {
    setCursorState((prev) => ({
      ...prev,
      isHovering: false,
      hoverType: "default",
      projectImage: null,
      projectTitle: null,
    }));
  }, []);

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setHovering,
        clearHovering,
        setProjectPreview,
        clearProjectPreview,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function ContextAwareCursor() {
  const { cursorState } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      // Smooth lerp for cursor
      position.current.x += (targetPosition.current.x - position.current.x) * 0.15;
      position.current.y += (targetPosition.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${position.current.x + 20}px, ${position.current.y + 20}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Cursor size based on state
  const getCursorSize = () => {
    switch (cursorState.hoverType) {
      case "link":
        return 60;
      case "button":
        return 80;
      case "project":
        return 16;
      case "text":
        return 4;
      default:
        return cursorState.isHovering ? 40 : 12;
    }
  };

  const size = getCursorSize();

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ marginLeft: -size / 2, marginTop: -size / 2 }}
        animate={{
          width: size,
          height: size,
          backgroundColor:
            cursorState.hoverType === "project"
              ? "transparent"
              : "rgb(255, 255, 255)",
          borderRadius: "50%",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* View label for links */}
        <AnimatePresence>
          {cursorState.hoverType === "link" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-black uppercase tracking-wider"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Project image preview */}
      <AnimatePresence>
        {cursorState.projectImage && (
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 pointer-events-none z-[9998] w-[300px] h-[200px] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src={cursorState.projectImage}
              alt={cursorState.projectTitle || "Project preview"}
              fill
              className="object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {/* Title */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold text-lg">
                {cursorState.projectTitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
