@AGENTS.md

## Deployment

### Environment Variables

`.env.local` は dotenvx で暗号化済み（Git コミット対象）。復号鍵は `.env.keys` に保存（Git 除外）。

**ローカル開発:**
```bash
npx @dotenvx/dotenvx run -- next dev
```

**Vercel デプロイ:**
Vercel は暗号化された `.env.local` を復号できないため、以下の環境変数を Vercel ダッシュボードに直接設定すること：

| Variable | Scope | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | All | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Supabase anon key (公開可) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service_role key (秘密) |
| `ADMIN_USERNAME` | Server only | 管理画面 Basic Auth ユーザー名 |
| `ADMIN_PASSWORD` | Server only | 管理画面 Basic Auth パスワード |
