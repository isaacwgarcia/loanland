import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const data = {
      success: req.query.success,
      verification_jwt: req.query.verification_jwt,
    };

    res.setHeader("Content-Type", "application/json");

    res.send(data);

    //res.redirect(307, "/loans/[id]");Should redirect to loans/[id]
  } catch (e) {
    console.log("Error api VerifyWID", e);
    return res.json({ status: "error" });
  }
});
