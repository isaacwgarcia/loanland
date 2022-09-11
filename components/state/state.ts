import { Profile, Session } from "../lib/types";

export interface AppState {
  session: Session;
  profile: Profile;
}

export const initialState: AppState = {
  session: {
    token: { accessToken: "", refreshToken: "" },
    address: "",
  },
  profile: {
    bio: "",
    ownedBy: "",
    handle: "",
    id: "",
    name: "",
    picture: {
      __typename: "",
      original: { __typename: "", mimeType: {} as JSON, url: "" },
    },
    coverPicture: {
      __typename: "",
      original: { __typename: "", mimeType: {} as JSON, url: "" },
    },

    __typename: "",

    dispatcher: {} as JSON,
    followModule: {} as JSON,

    stats: {
      __typename: "",
      totalCollects: 0,
      totalComments: 0,
      totalFollowers: 0,
      totalFollowing: 0,
      totalMirrors: 0,
      totalPosts: 0,
      totalPublications: 0,
    },
  },
};
