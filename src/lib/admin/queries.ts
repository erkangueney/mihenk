import "server-only";

import { getSupabaseServer } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/dal";
import type {
  AdminMemberRow,
  AdminOverview,
  AuditLogRow,
  ContentDocRow,
  ProgressRow,
} from "@/lib/supabase/types";

export const PAGE_SIZE = 25;

export type MemberSort = "recent" | "xp" | "name" | "active";

export interface MemberQuery {
  q?: string;
  role?: "member" | "admin";
  status?: "active" | "suspended";
  sort?: MemberSort;
  page?: number;
}

export interface MemberList {
  rows: AdminMemberRow[];
  total: number;
  page: number;
  pageCount: number;
}

/**
 * Üye listesi.
 *
 * Okuma normal kullanıcı istemcisiyle yapılır — RLS `is_admin()` sayesinde
 * tüm satırları döndürür. service_role'e yalnızca RLS'in yetmediği yerlerde
 * (auth kullanıcısı açma/silme) başvuruyoruz.
 */
export async function listMembers(query: MemberQuery = {}): Promise<MemberList> {
  await requireAdmin();
  const supabase = await getSupabaseServer();

  const page = Math.max(1, query.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;

  if (!supabase) return { rows: [], total: 0, page, pageCount: 0 };

  let builder = supabase.from("admin_members").select("*", { count: "exact" });

  const term = query.q?.trim();
  if (term) {
    // Arama terimindeki % ve , PostgREST filtre sözdizimini bozar; ayıklıyoruz.
    const safe = term.replace(/[%,()]/g, " ").trim();
    if (safe) builder = builder.or(`email.ilike.%${safe}%,display_name.ilike.%${safe}%`);
  }
  if (query.role) builder = builder.eq("role", query.role);
  if (query.status) builder = builder.eq("suspended", query.status === "suspended");

  switch (query.sort) {
    case "xp":
      builder = builder.order("xp", { ascending: false });
      break;
    case "name":
      builder = builder.order("display_name", { ascending: true });
      break;
    case "active":
      builder = builder.order("last_active", { ascending: false, nullsFirst: false });
      break;
    default:
      builder = builder.order("created_at", { ascending: false });
  }

  const { data, count, error } = await builder.range(from, from + PAGE_SIZE - 1);
  if (error) throw new Error(`Üye listesi alınamadı: ${error.message}`);

  const total = count ?? 0;
  return {
    rows: (data ?? []) as AdminMemberRow[],
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export interface MemberDetail {
  member: AdminMemberRow;
  progress: ProgressRow | null;
}

export async function getMember(id: string): Promise<MemberDetail | null> {
  await requireAdmin();
  const supabase = await getSupabaseServer();
  if (!supabase) return null;

  const { data: member } = await supabase
    .from("admin_members")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!member) return null;

  const { data: progress } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", id)
    .maybeSingle();

  return { member: member as AdminMemberRow, progress: (progress as ProgressRow) ?? null };
}

const EMPTY_OVERVIEW: AdminOverview = {
  members: 0,
  admins: 0,
  suspended: 0,
  active_today: 0,
  active_week: 0,
  total_xp: 0,
  lessons_done: 0,
  projects_done: 0,
  drafts: 0,
  overrides: 0,
};

export async function getOverview(): Promise<AdminOverview> {
  await requireAdmin();
  const supabase = await getSupabaseServer();
  if (!supabase) return EMPTY_OVERVIEW;

  const { data, error } = await supabase.rpc("admin_overview");
  if (error || !data) return EMPTY_OVERVIEW;
  return { ...EMPTY_OVERVIEW, ...(data as AdminOverview) };
}

/** Son kaydolan üyeler — gösterge panelindeki kısa liste. */
export async function recentMembers(limit = 6): Promise<AdminMemberRow[]> {
  await requireAdmin();
  const supabase = await getSupabaseServer();
  if (!supabase) return [];

  const { data } = await supabase
    .from("admin_members")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as AdminMemberRow[];
}

export async function listContentDocs(): Promise<ContentDocRow[]> {
  await requireAdmin();
  const supabase = await getSupabaseServer();
  if (!supabase) return [];

  const { data } = await supabase
    .from("content_docs")
    .select("*")
    .order("kind", { ascending: true })
    .order("slug", { ascending: true });

  return (data ?? []) as ContentDocRow[];
}

export async function getContentDoc(
  kind: "track" | "project",
  slug: string,
): Promise<ContentDocRow | null> {
  await requireAdmin();
  const supabase = await getSupabaseServer();
  if (!supabase) return null;

  const { data } = await supabase
    .from("content_docs")
    .select("*")
    .eq("kind", kind)
    .eq("slug", slug)
    .maybeSingle();

  return (data as ContentDocRow) ?? null;
}

export async function listAuditLog(limit = 100): Promise<AuditLogRow[]> {
  await requireAdmin();
  const supabase = await getSupabaseServer();
  if (!supabase) return [];

  const { data } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as AuditLogRow[];
}
