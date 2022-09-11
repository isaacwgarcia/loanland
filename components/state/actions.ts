import { Session, Profile } from "../../components/lib/types";

export enum ActionType {
  LoadSession,
  LoadProfile,
}

export interface LoadSession {
  type: ActionType.LoadSession;
  payload: Session;
}

export interface LoadProfile {
  type: ActionType.LoadProfile;
  payload: Profile;
}
export type AppActions = LoadSession | LoadProfile;
