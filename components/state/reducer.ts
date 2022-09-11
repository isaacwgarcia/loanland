import { AppState } from "./state";
import { ActionType, AppActions, LoadProfile, LoadSession } from "./actions";
import { Session, Profile } from "../lib/types";

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.LoadSession:
      state.session = action.payload;
      return { ...state };
    case ActionType.LoadProfile:
      state.profile = action.payload;
      return { ...state };
    default:
      return state;
  }
}

export const loadSession = (session: Session): LoadSession => ({
  type: ActionType.LoadSession,
  payload: session,
});

export const loadProfile = (profile: Profile): LoadProfile => ({
  type: ActionType.LoadProfile,
  payload: profile,
});
