import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";
import { updateToastMessage } from "../slices/common";

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if ((action.payload as any).data) {
        api.dispatch(
          updateToastMessage({
            message: (action.payload as any).data.error,
            type: "error",
          })
        );
      }
    }
    return next(action);
  };

export default rtkQueryErrorLogger;
