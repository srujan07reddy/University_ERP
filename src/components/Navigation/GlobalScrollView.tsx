import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, Platform } from 'react-native';

export interface GlobalScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  paddingBottom?: number;
}

/**
 * GlobalScrollView serves as the single source of truth for scrolling behavior
 * across the entire ERP. It standardizes flex growth, padding, and indicators,
 * eliminating the need for inline style clutter across hundreds of files.
 */
export const GlobalScrollView: React.FC<GlobalScrollViewProps> = ({ 
  children, 
  paddingBottom = 24,
  contentContainerStyle,
  style,
  ...props 
}) => {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[
        styles.content, 
        { paddingBottom },
        contentContainerStyle
      ]}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: '100%',
  },
  content: {
    flexGrow: 1,
  }
});
