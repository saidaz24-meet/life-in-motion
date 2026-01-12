import { useEffect } from "react";
import { scrollLockManager } from "../utils/scrollLockManager";

/**
 * Hook to lock/unlock the internal scroll container (data-scroll-container)
 * Uses centralized ScrollLockManager with ref-counting for safe multi-modal support.
 * 
 * @param isLocked - Whether to lock the scroll container
 */
export function useScrollContainerLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      scrollLockManager.lock();
    } else {
      scrollLockManager.unlock();
    }

    // Cleanup on unmount - always unlock if component unmounts while locked
    return () => {
      if (isLocked) {
        scrollLockManager.unlock();
      }
    };
  }, [isLocked]);
}

