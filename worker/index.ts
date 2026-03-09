import { serveStatic } from "wrangler";

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    // Luôn trả index.html cho route SPA
    if (url.pathname === "/" || !url.pathname.includes(".")) {
      return await serveStatic(request, env.ASSETS, {
        mapRequestToAsset: (req) => {
          const u = new URL(req.url);
          u.pathname = "/index.html";
          return new Request(u.toString(), req);
        },
      });
    }

    // File tĩnh (JS/CSS/png/svg, ...)
    const asset = await serveStatic(request, env.ASSETS);
    if (asset.status === 404) {
      // fallback về SPA nếu asset không tồn tại
      const u = new URL(request.url);
      u.pathname = "/index.html";
      return await serveStatic(new Request(u.toString(), request), env.ASSETS);
    }

    return asset;
  },
} satisfies ExportedHandler<{ ASSETS: Fetcher }>;

