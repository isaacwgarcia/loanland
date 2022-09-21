import { create } from "ipfs-http-client";
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  "base64"
)}`;
const options = {
  host: "ipfs.infura.io",
  protocol: "https",
  port: 5001,
  apiPath: "/api/v0",
  headers: {
    authorization: auth,
  },
};

export const IPFS_CLIENT = create(options);

export const uploadIpfs = async <T>(data: T) => {
  const result = await IPFS_CLIENT.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result;
};
