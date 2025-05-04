import React, {forwardRef, useMemo} from 'react';
import {ViewProps} from 'react-native';
import ActionSheet, {ActionSheetProps} from 'react-native-actions-sheet';

const BottomSheet = forwardRef(
  (
    {
      children,
      snapPoints,
      gestureHandlerProps,
      ...props
    }: ActionSheetProps & {gestureHandlerProps?: ViewProps},
    ref: any,
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, []);

    return (
      <ActionSheet
        gestureEnabled
        headerAlwaysVisible
        {...props}
        snapPoints={memoizedSnapPoints}
        ref={ref}>
        {children}
      </ActionSheet>
    );
  },
);

export default BottomSheet;
