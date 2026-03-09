export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    // Nếu là request cho file tĩnh (có dấu chấm trong path), trả thẳng từ ASSETS
    if (url.pathname.includes(".")) {
      return env.ASSETS.fetch(request);
    }

    // Với mọi route còn lại, luôn trả index.html (SPA fallback)
    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
  },
} satisfies ExportedHandler<{ ASSETS: Fetcher }>;
