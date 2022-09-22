/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APIURL: process.env.APIURL,
    ACTION_ID: process.env.ACTION_ID,
    LENS_HUB_CONTRACT: process.env.LENS_HUB_CONTRACT,
    LENS_PERIPHERY_CONTRACT: process.env.LENS_PERIPHERY_CONTRACT,
    INFURA_IPFS: process.env.INFURA_IPFS,
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
    INFURA_PROJECT_SECRET: process.env.INFURA_PROJECT_SECRET,
    INFURA_ENDPOINT: process.env.INFURA_ENDPOINT,
    LOANFACTORY_DEPLOYED_ADDRESS: process.env.LOANFACTORY_DEPLOYED_ADDRESS,
    SCORING__DEPLOYED_ADDRESS: process.env.SCORING__DEPLOYED_ADDRESS,
    MUMBAI_URL: process.env.MUMBAI_URL,
    WORLDID_DEPLOYED: process.env.WORLDID_DEPLOYED,
    WORLDID_ONCHAIN: process.env.WORLDID_ONCHAIN,
  },
};

module.exports = nextConfig;
