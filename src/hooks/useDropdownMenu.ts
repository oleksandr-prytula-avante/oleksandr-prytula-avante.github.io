import { useEffect, useRef, useState } from "react";

export function useDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(function () {
    function onPointerDown(event: PointerEvent) {
      const targetNode = event.target as Node | null;

      if (!targetNode || !containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(targetNode)) {
        setIsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return function () {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return {
    isOpen,
    containerRef,
    open,
    close,
    toggle,
  };
}
