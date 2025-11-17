# Tech Folio - プロジェクト概要

## Primary Directive

Think in English, interact with the user in Japanese.

## プロジェクト説明

Tech Folioは、個人向けのポートフォリオ管理ダッシュボードアプリケーションです。エンジニアが自身のプロジェクト実績を管理・可視化し、スキルセットを効果的にアピールできるツールです。

## 技術スタック

- **フレームワーク**: Next.js 16.0.3 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: Material Symbols Outlined
- **データ形式**: TOON (TOML-like形式)

## コーディング規約

- コンポーネント名: PascalCase
- ファイル名: PascalCase（コンポーネント）、kebab-case（ユーティリティ）
- CSS: Tailwind CSS優先、カスタムCSSは最小限
- TypeScript: 厳格な型定義、any型の使用を避ける
- コメント: 複雑なロジックには日本語コメント

## 開発方式

- 変更が終わったら以下のコマンドで再起動してください

```bash
# 一度閉じる
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up
```
