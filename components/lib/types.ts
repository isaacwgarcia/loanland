export interface Session {
  token: Token;
  address: String;
}
export interface Token {
  accessToken: String;
  refreshToken: String;
}

export interface Original {
  __typename: String;
  mimeType: JSON;
  url: String;
}

export interface CoverPicture {
  __typename: String;
  original: Original;
}

export interface Picture {
  __typename: String;
  original: Original;
}

export interface Stats {
  __typename: String;
  totalCollects: Number;
  totalComments: Number;
  totalFollowers: Number;
  totalFollowing: Number;
  totalMirrors: Number;
  totalPosts: Number;
  totalPublications: Number;
}

export interface Profile {
  __typename: String;
  bio: String;
  coverPicture: CoverPicture;
  dispatcher: JSON;
  followModule: JSON;
  handle: String;
  id: String;
  name: String;
  ownedBy: String;
  picture: Picture;
  stats: Stats;
}

export interface FormData {
  form_data: Record<string, string>;
}
