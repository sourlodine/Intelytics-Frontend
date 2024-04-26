/** @type {import('next').NextConfig} */
import withTM from "next-transpile-modules";
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withTM([
  "react-financial-charts",
  "@react-financial-charts/annotations",
  "@react-financial-charts/axes",
  "@react-financial-charts/coordinates",
  "@react-financial-charts/core",
  "@react-financial-charts/indicators",
  "@react-financial-charts/interactive",
  "@react-financial-charts/scales",
  "@react-financial-charts/series",
  "@react-financial-charts/tooltip",
  "@react-financial-charts/utils",
])(nextConfig);
