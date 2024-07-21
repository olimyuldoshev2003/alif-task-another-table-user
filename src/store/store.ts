import {
  configureStore,
  EnhancedStore,
  StoreEnhancer,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from "@reduxjs/toolkit";
import usersState, { IUsersState } from "../reducers/usersState";
// ...

export const store: EnhancedStore<
  {
    usersState: IUsersState;
  },
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<
          {
            usersState: IUsersState;
          },
          undefined,
          UnknownAction
        >;
      }>,
      StoreEnhancer
    ]
  >
> = configureStore({
  reducer: {
    usersState,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
