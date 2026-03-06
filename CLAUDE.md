# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

静的なポートフォリオサイト。フレームワークやビルドツールを使用せず、HTML/CSS/JavaScriptで構築。GitHub Pagesでホストされている。

## Commands

ビルドシステムは存在しない。ローカルでの確認は任意のHTTPサーバーを使用:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code Live Server拡張機能でも可
```

デプロイは `master` ブランチへのpushでGitHub Pagesが自動的に反映。

## Architecture

### File Structure
```
├── index.html          # メインHTML（全セクション含む）
├── css/style.css       # 全スタイル（CSS変数 + BEM）
├── js/main.js          # インタラクション
├── assets/images/      # 画像・ファビコン
└── site.webmanifest    # PWA manifest
```

### CSS Architecture
- **CSS変数**: `:root`でカラーパレット、タイポグラフィ、スペーシングを一元管理
- **BEM命名**: `.block__element--modifier`形式
- **10段階グレースケール**: `--color-gray-50` 〜 `--color-gray-900`
- **8pxベーススペーシング**: `--space-1`(4px) 〜 `--space-32`(128px)
- **ブレークポイント**: 768px（タブレット）、480px（モバイル）

### JavaScript Features
- Intersection Observer APIによるフェードインアニメーション
- スムーズスクロール（ナビゲーションリンク）
- スクロールプログレスバー
- モバイルメニュー（ハンバーガー）
- パララックス効果（reduced-motion対応）
- アクティブセクションのハイライト

### Accessibility
- Skip link（メインコンテンツへスキップ）
- `prefers-reduced-motion`対応
- WAI-ARIA属性
- フォーカススタイル（`:focus-visible`）

### SEO Implementation
- OGP / Twitter Card メタタグ
- JSON-LD構造化データ（Person型）
- セマンティックHTML

## Design Decisions

- 「洗練ミニマル」デザインシステム
- グラデーション背景は避け、単色ベース
- カードホバー時は `translateY(-4px)` + `box-shadow`
- アニメーションは控えめ（`0.25s cubic-bezier`）
