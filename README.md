# Weir

Internet without the firehose.

## Running locally

```zsh
pnpm i
pnpm dev
```

## Building and running the app

```zsh
pnpm i
pnpm build
pnpm start
```

## Running the app in production

You can use something like `pm2` to daemonize the app:

```zsh
pm2 start dist/app.js
```
