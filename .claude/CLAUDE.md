# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Primary Directive

Think in English, interact with the user in Japanese.

## Project Overview

Tech Folioは、個人向けのポートフォリオ管理ダッシュボードアプリケーションです。エンジニアが自身のプロジェクト実績を管理・可視化し、スキルセットを効果的にアピールできるツールです。

## Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript
- **Backend**: Supabase (Auth + Database + Storage)
- **Styling**: Tailwind CSS v4
- **Icons**: Material Symbols Outlined
- **Font**: Noto Sans JP (Google Fonts)

## Development Commands

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクション起動
npm start

# リント
npm run lint
```

## Architecture

### Application Structure

```
app/
├── (pages)           # ルートページ
│   ├── page.tsx                 # トップページ
│   ├── login/                   # ログインページ
│   ├── register/                # 新規登録ページ
│   ├── projects/                # プロジェクト一覧・詳細
│   ├── profile/                 # スキル一覧
│   └── profile/settings/        # 設定画面
├── _components/      # 共通コンポーネント
│   ├── AppHeader.tsx            # ヘッダー（ナビゲーション）
│   └── AppFooter.tsx            # フッター
├── api/              # API Routes
│   └── qiita/                   # Qiita連携API
├── globals.css       # グローバルスタイル
└── layout.tsx        # ルートレイアウト

lib/
├── supabase/         # Supabase設定
│   ├── client.ts                # クライアントサイド用
│   ├── server.ts                # サーバーサイド用
│   └── index.ts                 # 型定義エクスポート
├── hooks/            # カスタムフック
│   └── useAuth.ts               # 認証フック
├── types/            # 型定義
└── utils/            # ユーティリティ関数
```

### Database Schema (Supabase)

主要テーブル：
- **profiles**: ユーザープロフィール情報（display_name, bio, SNSリンク等）
- **projects**: プロジェクト情報（title, description, period_start/end等）
- **tags**: 技術タグ（name, category, color）
- **project_tags**: プロジェクトとタグの多対多リレーション
- **roles**: 担当工程（要件定義、設計、実装等）
- **auth_providers**: 認証プロバイダー情報

### Authentication Flow

1. Supabase Auth（Google OAuth）を使用
2. ログイン後、`profiles`テーブルにユーザー情報を作成
3. `useAuth`フックでクライアント側の認証状態を管理
4. Server ComponentsではcookieベースのSSR認証を使用

### State Management

- **認証状態**: `useAuth`フック（Supabase Auth）
- **ローカルステート**: React `useState`を各コンポーネントで使用
- グローバル状態管理ライブラリは使用していない

### Styling Approach

- **Tailwind CSS v4**を使用
- カスタムブレークポイント:
  - `tablet`: 860px
  - `laptop`: 1200px
- カスタムアニメーション: `app/globals.css`に定義
  - hover effects (underline-center, hover-scale, etc.)
  - slide-in/fade-in animations
  - button effects (btn-shimmer, btn-glow, etc.)

### Responsive Design Strategy

- **Desktop-first approach**
- ブレークポイント:
  - `~860px`: モバイル（縦並びレイアウト）
  - `860px~1200px`: タブレット（一部横並び）
  - `1200px~`: デスクトップ（フルレイアウト）

### Component Patterns

- **Server Components**: デフォルト（データフェッチ、静的コンテンツ）
- **Client Components**: `"use client"`を明示（インタラクション、フック使用時）
- **コンポーネント分割**: ページ配下に`_components/`フォルダを作成
- **共通コンポーネント**: `app/_components/`に配置

### API Routes

Qiita連携APIの実装:
- `/api/qiita/auth`: OAuth認証開始
- `/api/qiita/callback`: OAuth認証コールバック
- `/api/qiita/articles`: 記事一覧取得
- `/api/qiita/disconnect`: 連携解除

## Coding Conventions

- **コンポーネント名**: PascalCase
- **ファイル名**: PascalCase（コンポーネント）、kebab-case（ユーティリティ）
- **CSS**: Tailwind CSS優先、カスタムCSSは最小限
- **TypeScript**: 厳格な型定義、`any`型の使用を避ける
- **コメント**: 複雑なロジックには日本語コメント
- **エクスポート**: default exportを使用（Next.js規約に従う）

## Key Implementation Details

### Supabase Client Usage

```typescript
// Client Component
import { createClient } from "@/lib/supabase/client";
const supabase = createClient();

// Server Component / API Route
import { createClient } from "@/lib/supabase/server";
const supabase = await createClient();
```

### Demo Mode

- 未ログイン時は`lib/demo-data.ts`のデモデータを表示
- 実際のデータベース操作は行わない
- ログイン促進のバナーを表示

### Feature: Qiita Integration

- OAuth認証でQiitaアカウントと連携
- 記事データを取得してポートフォリオに表示
- アクセストークンは`profiles.qiita_access_token`に暗号化保存
