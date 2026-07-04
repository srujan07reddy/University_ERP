import { useRef, useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface ScrollEventData {
  contentOffsetY: number;
  contentHeight: number;
  viewHeight: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollPercentage: number;
}

/**
 * Custom hook for tracking scroll events globally
 * Provides scroll position data and callback handlers
 */
export const useScrollEvents = (onScrollChange?: (data: ScrollEventData) => void) => {
  const scrollPositionRef = useRef<ScrollEventData>({
    contentOffsetY: 0,
    contentHeight: 0,
    viewHeight: 0,
    isAtTop: true,
    isAtBottom: false,
    scrollPercentage: 0,
  });

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const offsetY = contentOffset.y;
      const contentHeight = contentSize.height;
      const viewHeight = layoutMeasurement.height;

      const isAtTop = offsetY <= 0;
      const isAtBottom = offsetY + viewHeight >= contentHeight - 10; // 10px threshold
      const scrollPercentage = contentHeight > 0 ? (offsetY / (contentHeight - viewHeight)) * 100 : 0;

      const scrollData: ScrollEventData = {
        contentOffsetY: offsetY,
        contentHeight,
        viewHeight,
        isAtTop,
        isAtBottom,
        scrollPercentage: Math.max(0, Math.min(100, scrollPercentage)),
      };

      scrollPositionRef.current = scrollData;

      // Trigger callback if provided
      if (onScrollChange) {
        onScrollChange(scrollData);
      }
    },
    [onScrollChange]
  );

  const getScrollPosition = useCallback(() => scrollPositionRef.current, []);

  const resetScroll = useCallback(() => {
    scrollPositionRef.current = {
      contentOffsetY: 0,
      contentHeight: 0,
      viewHeight: 0,
      isAtTop: true,
      isAtBottom: false,
      scrollPercentage: 0,
    };
  }, []);

  return {
    handleScroll,
    getScrollPosition,
    resetScroll,
    scrollPosition: scrollPositionRef.current,
  };
};

/**
 * Global scroll event listener for analytics and performance monitoring
 */
export const ScrollEventLogger = {
  logScrollEvent: (screenName: string, scrollData: ScrollEventData) => {
    if (__DEV__) {
      console.log(`[ScrollEvent] ${screenName}:`, {
        offsetY: Math.round(scrollData.contentOffsetY),
        percentage: Math.round(scrollData.scrollPercentage),
        isAtTop: scrollData.isAtTop,
        isAtBottom: scrollData.isAtBottom,
      });
    }
  },

  logScrollStart: (screenName: string) => {
    if (__DEV__) {
      console.log(`[ScrollStart] ${screenName}`);
    }
  },

  logScrollEnd: (screenName: string, scrollData: ScrollEventData) => {
    if (__DEV__) {
      console.log(`[ScrollEnd] ${screenName}:`, {
        finalOffset: Math.round(scrollData.contentOffsetY),
        percentage: Math.round(scrollData.scrollPercentage),
      });
    }
  },
};
