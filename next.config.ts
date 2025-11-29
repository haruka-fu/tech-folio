import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16でTurbopackがデフォルトで有効
  // 空の設定を追加してwebpack設定との競合を回避
  turbopack: {},

  // Docker環境でのホットリロードを有効化（開発環境のみ）
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
