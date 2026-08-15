/**
 * Veritabanı şemasının TypeScript karşılığı — `supabase/migrations/0001_init.sql`
 * ile elle eşlenir. Şemayı değiştirdiğinde burayı da güncelle; sorgular
 * tipini buradan alır, uyuşmazlık derlemede yakalanır.
 */

export type UserRole = "member" | "admin";
export type ContentKind = "track" | "project";

export type Plan = "free" | "premium";
export type PlanSource = "none" | "trial" | "iyzico" | "manual";

export type ProfileRow = {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  hidden_from_leaderboard: boolean;
  suspended: boolean;
  note: string;
  created_at: string;
  plan: Plan;
  plan_expires_at: string | null;
  plan_source: PlanSource;
  trial_used: boolean;
  free_track_choice: string | null;
  free_track_choice_changed_at: string | null;
};

export type ProgressRow = {
  user_id: string;
  xp: number;
  tasks: Record<string, number>;
  lessons: string[];
  projects: string[];
  badges: string[];
  active_days: string[];
  display_name: string;
  /** Avatar seçimi ve açılan parçalar — `AvatarState` şeklinde jsonb. */
  avatar: unknown;
  updated_at: string;
};

export type ContentDocRow = {
  id: string;
  kind: ContentKind;
  slug: string;
  data: unknown;
  published: boolean;
  updated_at: string;
  updated_by: string | null;
};

export type AuditLogRow = {
  id: number;
  actor_id: string | null;
  actor_email: string;
  action: string;
  target: string;
  detail: Record<string, unknown>;
  created_at: string;
};

export type LeaderboardRow = {
  rank: number;
  display_name: string;
  xp: number;
  is_you: boolean;
  /** `AvatarState` şeklinde jsonb — `normalizeAvatar` ile güvene alınır. */
  avatar: unknown;
};

/** Gösterge panelindeki sayılar — `admin_overview()` fonksiyonunun çıktısı. */
export type AdminOverview = {
  members: number;
  admins: number;
  suspended: number;
  active_today: number;
  active_week: number;
  total_xp: number;
  lessons_done: number;
  projects_done: number;
  drafts: number;
  overrides: number;
};

/** `admin_members` görünümü — profil + ilerleme özeti tek satırda. */
export type AdminMemberRow = {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  hidden_from_leaderboard: boolean;
  suspended: boolean;
  note: string;
  created_at: string;
  plan: Plan;
  plan_expires_at: string | null;
  plan_source: PlanSource;
  trial_used: boolean;
  free_track_choice: string | null;
  xp: number;
  lessons_done: number;
  projects_done: number;
  badges_count: number;
  active_days_count: number;
  last_active: string | null;
};

type Table<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

/**
 * `interface` DEĞİL `type` olmalı.
 *
 * postgrest-js şemayı `Record<string, GenericTable>` bekliyor. TypeScript
 * örtük indeks imzasını yalnızca tip takma adlarına verir; interface'e
 * vermez. Interface olarak yazılırsa tüm tablolar `never`'a düşer ve
 * sorgular "'user_id' does not exist in type 'never[]'" gibi hatalar verir.
 */
export type Database = {
  public: {
    Tables: {
      profiles: Table<ProfileRow>;
      progress: Table<ProgressRow, Partial<ProgressRow> & { user_id: string }>;
      content_docs: Table<
        ContentDocRow,
        Omit<Partial<ContentDocRow>, "kind" | "slug" | "data"> & {
          kind: ContentKind;
          slug: string;
          data: unknown;
        }
      >;
      audit_log: Table<AuditLogRow, Omit<Partial<AuditLogRow>, "action"> & { action: string }>;
    };
    Views: {
      // Yalnızca okunur: yazma her zaman profiles/progress tablolarına yapılır.
      admin_members: { Row: AdminMemberRow; Relationships: [] };
    };
    Functions: {
      is_admin: { Args: { uid?: string }; Returns: boolean };
      leaderboard_top: { Args: { row_limit?: number }; Returns: LeaderboardRow[] };
      leaderboard_rank_of: { Args: { uid?: string }; Returns: number };
      admin_overview: { Args: Record<string, never>; Returns: AdminOverview };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
