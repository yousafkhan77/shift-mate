import React, { useState } from "react";
import { ScrollView } from "react-native";

const ConditionalScrollView = ({ children }: any) => {
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const isScrollEnabled = contentHeight > containerHeight;

  return (
    <ScrollView
      scrollEnabled={isScrollEnabled}
      onContentSizeChange={(w, h) => setContentHeight(h)}
      showsVerticalScrollIndicator={false}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      {children}
    </ScrollView>
  );
};

export default ConditionalScrollView;
