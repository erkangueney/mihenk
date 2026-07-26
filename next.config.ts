import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Üst klasörlerde başka bir package-lock.json olduğunda Next yanlış kökü
   * seçip uyarı veriyor; kökü açıkça bu projeye sabitliyoruz.
   */
  outputFileTracingRoot: path.join(__dirname),

  // Statik dışa aktarım gerekmediği için varsayılan (sunucu) çıktıyı koruyoruz;
  // tüm sayfalar zaten derleme anında üretiliyor (SSG).
};

export default nextConfig;
