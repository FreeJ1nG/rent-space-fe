import { combineReducers } from "@reduxjs/toolkit";

import api from "@/common/services/api";

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

export default reducer;
