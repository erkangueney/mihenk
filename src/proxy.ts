import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseEnabled } from "@/lib/supabase/config";

/**
 * Proxy — Next.js 16'da middleware'in adı budur (davranış aynı).
 *
 * İki işi var:
 *  1. Supabase oturum çerezini tazelemek. `getUser()` süresi dolmuş bir
 *     token'ı yeniler ve yeni çerezi yanıta yazmamız gerekir.
 *  2. /admin için iyimser kapı. Bu YETKİ KONTROLÜ DEĞİLDİR — yalnızca
 *     oturumu olmayanı boşuna panele sokmamak içindir. Gerçek kontrol
 *     `requireAdmin()` ile sunucu tarafında yapılır (src/lib/auth/dal.ts).
 *
 * Matcher dar tutuldu: içerik sayfaları statik üretiliyor, onların önüne
 * her istekte bir Supabase turu koymanın anlamı yok.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!supabaseEnabled) {
    // Supabase kapalıyken admin paneli de kapalıdır.
    if (request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/tr", request.url));
    }
    return response;
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(list) {
        for (const { name, value } of list) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of list) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Supabase'e ulaşılamazsa oturumu yok say: içerik sayfaları etkilenmez,
  // /admin ise girişe döner. Kesinti hiçbir koşulda paneli açmamalı.
  let user = null;
  try {
    ({
      data: { user },
    } = await supabase.auth.getUser());
  } catch {
    user = null;
  }

  const { pathname, search } = request.nextUrl;

  if (!user && pathname.startsWith("/admin")) {
    const target = new URL("/tr/giris", request.url);
    target.searchParams.set("next", pathname + search);
    return NextResponse.redirect(target);
  }

  // Girişliyken giriş/kayıt sayfasında oyalanma.
  if (user && /^\/(tr|en)\/(giris|kayit)$/.test(pathname)) {
    return NextResponse.redirect(new URL(pathname.slice(0, 3) + "/profile", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/(tr|en)/giris", "/(tr|en)/kayit", "/(tr|en)/profile"],
};
