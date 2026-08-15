import type { HowTo } from "@/lib/types";
import { biHowTos } from "./bi";
import { pythonHowTos } from "./python";
import { sqlHowTos } from "./sql";

/**
 * Nasıl-yapılır rehberleri.
 *
 * Her rehber tek bir soruya cevap verir ve arama sonucundan gelen kullanıcıyı
 * önce hızlı cevapla karşılar. Listede en yeniden eskiye sıralanır.
 */
export const howTos: HowTo[] = [...sqlHowTos, ...pythonHowTos, ...biHowTos];
