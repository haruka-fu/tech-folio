# Tech Folio - プロジェクト概要

## プロジェクト説明

Tech Folioは、個人向けのポートフォリオ管理ダッシュボードアプリケーションです。エンジニアが自身のプロジェクト実績を管理・可視化し、スキルセットを効果的にアピールできるツールです。

## 技術スタック

- **フレームワーク**: Next.js 16.0.3 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **アイコン**: Material Symbols Outlined
- **データ形式**: TOON (TOML-like形式)

## プロジェクト構成

### 主要ページ

- `/` - プロジェクト一覧ページ（無限スクロール対応）
- `/profile` - プロフィール画面（プロフィールビュー/ダッシュボードビュー切り替え）
- `/profile/settings` - 設定画面（プロフィール設定/技術タグ管理/Qiita連携）

### 主要コンポーネント

- `app/_components/AppHeader.tsx` - グローバルヘッダー（新規プロジェクト追加モーダル制御）
- `app/_components/NewProjectModal.tsx` - 新規プロジェクト登録モーダル
- `app/profile/settings/_components/TagManagement.tsx` - 技術タグ管理コンポーネント
- `app/profile/settings/_components/QiitaIntegration.tsx` - Qiita連携コンポーネント

### データ管理

- `lib/toon-parser.ts` - TOONファイルパーサー
- `public/data/projects.toon` - プロジェクトデータファイル

## 主要機能

### 1. プロジェクト管理

- プロジェクト一覧表示（無限スクロール）
- 検索・フィルタリング機能（技術タグ、役割）
- 新規プロジェクト登録（モーダル形式）
  - 必須項目: タイトル、概要、詳細説明、開始日、終了日
  - オプション項目: サムネイルURL、役割、技術タグ、成果・実績

### 2. プロフィール機能

- **プロフィールビュー**: 基本情報とスキルサマリー（棒グラフ）
- **ダッシュボードビュー**: グリッドレイアウトでスキル統計を表示
  - 2列（モバイル）/ 3列（タブレット）/ 4列（デスクトップ）
  - 上位スキルに視覚的な強調（透明度による階層表現）

### 3. 設定機能

- プロフィール編集
- 技術タグ管理（追加・編集・削除・検索）
- Qiita連携（記事一覧表示、ポートフォリオへの追加）

## データ形式（TOON）

```toml
[[projects]]
title = "プロジェクト名"
summary = "概要"
description = """
詳細説明
"""
thumbnail = "画像URL"
start_date = "2024-01-01"
end_date = "2024-12-31"
is_current = false
roles = ["役割1", "役割2"]
tags = ["タグ1", "タグ2"]
achievements = ["成果1", "成果2"]
```

## デザインシステム

### カラーパレット

- **プライマリー**: #2b6cee（青）
- **テキスト**: #111827（濃いグレー）、#6b7280（ミディアムグレー）
- **背景**: #f8f9fa（ライトグレー）、#ffffff（白）
- **ボーダー**: #e5e7eb（境界線）

### レイアウト

- **最大幅**: 1400px
- **レスポンシブ**: モバイルファースト設計
- **グリッド**: Tailwind CSS Grid System

### コンポーネントスタイル

- カード: 角丸（rounded-xl）、ボーダー、シャドウ
- ボタン: プライマリー（青背景）、セカンダリー（白背景）
- 入力フィールド: ボーダー、フォーカス時リング表示

## 実装の注意点

### パフォーマンス最適化

- **useMemo**: フィルタリング結果のメモ化（無限ループ防止）
- **useCallback**: イベントハンドラーの最適化
- **Intersection Observer**: 無限スクロールの効率的な実装

### 状態管理

- ローカル状態: useState（フォーム、モーダル、タブ切り替え）
- データフェッチ: useEffect + fetch API

### クライアントコンポーネント

以下のコンポーネントは"use client"ディレクティブが必要:

- インタラクティブなUI（ボタン、モーダル、タブ）
- ブラウザAPI使用（Intersection Observer）
- useState/useEffectを使用するコンポーネント

### メタデータ

- layout.tsxはサーバーコンポーネントとしてmetadataをエクスポート
- インタラクティブ機能は子コンポーネント（AppHeader）に分離

## ディレクトリ構造

```
tech-folio/
├── app/
│   ├── _components/          # 共有コンポーネント
│   │   ├── AppHeader.tsx
│   │   └── NewProjectModal.tsx
│   ├── profile/
│   │   ├── page.tsx          # プロフィール画面
│   │   └── settings/
│   │       ├── page.tsx      # 設定画面
│   │       └── _components/  # 設定専用コンポーネント
│   ├── layout.tsx            # ルートレイアウト
│   ├── page.tsx              # プロジェクト一覧
│   └── globals.css           # グローバルスタイル
├── lib/
│   └── toon-parser.ts        # TOONパーサー
├── public/
│   └── data/
│       └── projects.toon     # プロジェクトデータ
└── design/                   # デザインリファレンス
```

## コーディング規約

- コンポーネント名: PascalCase
- ファイル名: PascalCase（コンポーネント）、kebab-case（ユーティリティ）
- CSS: Tailwind CSS優先、カスタムCSSは最小限
- TypeScript: 厳格な型定義、any型の使用を避ける
- コメント: 複雑なロジックには日本語コメント
