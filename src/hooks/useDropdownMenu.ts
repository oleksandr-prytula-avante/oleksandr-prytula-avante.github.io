import { useCallback, useEffect, useRef, useState } from "react";

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

  const open = useCallback(function () {
    setIsOpen(true);
  }, []);

  const close = useCallback(function () {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(function () {
    setIsOpen(function (prev) {
      return !prev;
    });
  }, []);

  return {
    isOpen,
    containerRef,
    open,
    close,
    toggle,
  };
}
