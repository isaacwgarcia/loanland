import { NextApiRequest, NextApiResponse } from "next";
import { getLoans } from "../../../components/lib/api";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const loans = await getLoans();
    return res.json(loans);
  } catch (e) {
    console.log("error api", e);
    return res.json({ status: "error" });
  }
});
