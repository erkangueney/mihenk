import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/ad-slot";
import { ProfileView, type TrackProgressItem } from "@/components/profile-view";
import { lessonKeyOf } from "@/lib/content";
import { getProjects, getTracks } from "@/lib/content-docs/resolve";
import { isLocale, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Profilim" : "My Profile",
    // Kişisel ilerleme sayfası aramada görünmemeli.
    robots: { index: false, follow: false },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const [tracks, projects] = await Promise.all([getTracks(), getProjects()]);

  const items: TrackProgressItem[] = tracks.map((track) => ({
    slug: track.slug,
    name: track.name,
    icon: track.icon,
    color: track.color,
    lessonKeys: track.levels
      .flatMap((level) => level.lessons)
      .map((lesson) => lessonKeyOf(track.slug, lesson.slug)),
  }));

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="mb-8 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {ui("profile.title", locale)}
      </h1>
      <ProfileView tracks={items} totalProjects={projects.length} locale={locale} />

      <AdSlot placement="profile-sidebar" className="mt-8 hidden sm:block" />
    </div>
  );
}
