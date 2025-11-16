# TechFolio

このプロジェクトは [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) で作成した [Next.js](https://nextjs.org) アプリケーションです。

## 開発環境の起動

まず開発サーバーを起動します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと結果を確認できます。

`app/page.tsx` を編集するとページが自動でリロードされます。

このプロジェクトでは Vercel の新しいフォントファミリーである [Geist](https://vercel.com/font) を [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) で最適化して読み込んでいます。

## さらに学ぶ

Next.js について学ぶには以下のリソースを参照してください。

- [Next.js ドキュメント](https://nextjs.org/docs) – フレームワークの機能や API を網羅。
- [Learn Next.js](https://nextjs.org/learn) – 対話型のチュートリアル。

また、[Next.js の GitHub リポジトリ](https://github.com/vercel/next.js) ではフィードバックやコントリビュートも歓迎されています。

## Vercel へのデプロイ

Next.js アプリをデプロイする最も簡単な方法は、Next.js の開発元が提供する [Vercel プラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を利用することです。

詳しくは [Next.js のデプロイメントガイド](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## Docker で実行する

ローカルで本番用イメージをビルドするには次を実行します。

```bash
docker build -t tech-folio .
```

続いてコンテナを起動し、ポート 3000 を公開します。

```bash
docker run --rm -p 3000:3000 tech-folio
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、Docker 上で稼働しているアプリを確認できます。イメージは Next.js の standalone 出力を利用しているため、コードを変更した際は再ビルドが必要です。

## Docker で開発する

ホットリロード対応の開発環境を Docker で立ち上げたい場合は、付属の `docker-compose.dev.yml` を利用します。ソースコードはボリュームとしてコンテナにマウントし、ローカルの変更が即座に反映されます。

```bash
docker compose -f docker-compose.dev.yml up
```

初回起動時に依存関係をインストールし、その後 `npm run dev` が実行されます。開発サーバーは [http://localhost:3000](http://localhost:3000) で利用できます。終了するには `Ctrl + C` でコンテナを停止してください。
