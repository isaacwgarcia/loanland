import omitDeep from "omit-deep";

export const omit = (object: any, name: string) => {
  return omitDeep(object, name);
};
export const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
