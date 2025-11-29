import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker環境でのホットリロードを有効化
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // ファイル監視にpollingを使用（Docker環境で必須）
      config.watchOptions = {
        poll: 1000, // 1秒ごとにポーリング
        aggregateTimeout: 300, // 変更検知後の待機時間（ミリ秒）
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
