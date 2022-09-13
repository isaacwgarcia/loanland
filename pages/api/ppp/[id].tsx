import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const proof = req.body.proof;
  const nullifier_hash = req.body.nullifier_hash;
  const merkle_root = req.body.merkle_root;

  const options = {
    method: `POST`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action_id: "wid_staging_8d03e4abe36eb721fdb8eaea4f8589b5",
      signal: "loginUser",
      proof,
      nullifier_hash,
      merkle_root,
    }),
  };

  fetch(`https://developer.worldcoin.org/api/v1/verify`, options)
    .then((response) => {
      if (response.status == 200) {
        return response.json().then((data) => {
          return res.json(data);
        });
      }
      throw new Error("Api is not available");
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
});
