declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL?: string;
      KV_URL?: string;
      CLAUDE_API_KEY?: string;
      NODE_ENV?: 'development' | 'production';
    }
  }
}