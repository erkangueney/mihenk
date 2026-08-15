import { entry, group, section } from "./helpers";

/** Git: veri ekiplerinin günlük olarak kullandığı komutlar. */
export const gitReference = group({
  slug: "git",
  name: "Git & GitHub",
  icon: "🔀",
  color: "hsl(14 89% 55%)",
  lang: "shell",
  trackSlug: "git",
  tagline: ["Günlük komutlar ve kurtarma yolları", "Everyday commands and ways out of trouble"],
  description: [
    "Analiz ve veri projelerinde gerçekten kullanılan Git komutları — ve bir şeyler ters gittiğinde geri dönüş yolları.",
    "The Git commands actually used in analytics and data projects — plus the ways back when something goes wrong.",
  ],
  sections: [
    section("gunluk", ["Günlük döngü", "The daily loop"], [
      entry({
        slug: "status-add-commit",
        name: "status / add / commit",
        summary: [
          "Değişiklikleri gözden geçirip kaydeder.",
          "Reviews and records your changes.",
        ],
        syntax:
          "git status\ngit add dosya.py        # ya da: git add -p\ngit commit -m \"kısa açıklama\"",
        description: [
          "`git add -p` değişiklikleri parça parça gösterip tek tek onaylatır — tek commit'e karışık işler girmesini engelleyen en iyi alışkanlık. Commit mesajını emir kipinde ve **neden**i anlatacak şekilde yaz.",
          "`git add -p` walks through changes hunk by hunk — the best habit for keeping unrelated work out of one commit. Write commit messages in the imperative and explain the **why**.",
        ],
        example: {
          code: "git add notebooks/temizlik.ipynb\ngit commit -m \"Eksik tarihleri ffill yerine medyanla doldur\"",
        },
        related: ["git/diff", "git/log"],
        keywords: ["status", "add", "commit", "kaydet", "değişiklik"],
      }),
      entry({
        slug: "diff",
        name: "diff",
        summary: ["Neyi değiştirdiğini gösterir.", "Shows what you changed."],
        syntax: "git diff            # kaydedilmemiş\ngit diff --staged   # add edilmiş\ngit diff main...HEAD",
        description: [
          "Commit'lemeden önce `git diff` çalıştırmak, yanlışlıkla eklenen anahtar/şifre ve hata ayıklama satırlarını yakalar. Not defteri (`.ipynb`) çıktıları diff'i şişirir — çıktıları temizleyip commit'lemek iyi bir alışkanlıktır.",
          "Running `git diff` before committing catches stray secrets and debug lines. Notebook (`.ipynb`) outputs bloat diffs — clearing outputs before committing is a good habit.",
        ],
        example: { code: "git diff --staged" },
        related: ["git/status-add-commit"],
        keywords: ["diff", "fark", "değişiklik", "karşılaştır"],
      }),
      entry({
        slug: "branch",
        name: "branch / switch",
        summary: ["Ayrı bir çalışma hattı açar.", "Opens a separate line of work."],
        syntax:
          "git switch -c ozellik/kohort-analizi\ngit switch main\ngit branch -a",
        description: [
          "Her iş için yeni dal aç: ana dal her zaman çalışır durumda kalsın. `git switch` modern komuttur; `git checkout` aynı işi yapar ama fazladan görevleri de olduğu için kafa karıştırır.",
          "Open a branch per task so the main branch always works. `git switch` is the modern command; `git checkout` does the same but carries extra duties that confuse.",
        ],
        example: { code: "git switch -c analiz/musteri-segmentasyonu" },
        related: ["git/merge", "git/pull-push"],
        keywords: ["branch", "switch", "dal", "checkout", "yeni özellik"],
      }),
      entry({
        slug: "pull-push",
        name: "pull / push",
        summary: ["Uzak depoyla eşitler.", "Syncs with the remote repository."],
        syntax:
          "git pull --rebase\ngit push -u origin dal-adi",
        description: [
          "`--rebase` gereksiz birleştirme commit'lerini önler ve geçmişi düz tutar. İlk gönderimde `-u` ile dalı uzak dala bağlarsın; sonrasında `git push` yeter.",
          "`--rebase` avoids noisy merge commits and keeps history linear. On the first push, `-u` links the branch to its remote; afterwards plain `git push` is enough.",
        ],
        example: { code: "git pull --rebase origin main" },
        related: ["git/branch", "git/merge"],
        keywords: ["pull", "push", "uzak", "remote", "senkron", "origin"],
      }),
      entry({
        slug: "log",
        name: "log",
        summary: ["Geçmişi okur.", "Reads the history."],
        syntax:
          "git log --oneline --graph --decorate -20\ngit log -p dosya.py\ngit log --author=\"ad\"",
        description: [
          "`--oneline --graph` dalların nerede ayrılıp birleştiğini tek ekranda gösterir. Tek bir dosyanın hikâyesini merak ediyorsan `git log -p dosya` her değişikliği içeriğiyle basar.",
          "`--oneline --graph` shows where branches split and merged on one screen. For a single file's story, `git log -p file` prints every change with its content.",
        ],
        example: { code: "git log --oneline --graph --decorate -20" },
        related: ["git/diff", "git/revert"],
        keywords: ["log", "geçmiş", "history", "graph"],
      }),
    ]),

    section("kurtarma", ["Bir şeyler ters gittiğinde", "When things go wrong"], [
      entry({
        slug: "restore",
        name: "restore",
        summary: [
          "Kaydedilmemiş değişiklikleri geri alır.",
          "Discards uncommitted changes.",
        ],
        syntax:
          "git restore dosya.py          # çalışma alanındaki değişikliği at\ngit restore --staged dosya.py # add'i geri al, değişikliği koru",
        description: [
          "`git restore dosya` o dosyadaki kaydedilmemiş emeği **geri dönüşsüz** siler. Emin değilsen önce `git stash` ile bir kenara koy.",
          "`git restore file` deletes uncommitted work in that file **irreversibly**. When unsure, park it with `git stash` first.",
        ],
        example: { code: "git restore --staged notebooks/deneme.ipynb" },
        related: ["git/stash", "git/reset"],
        keywords: ["restore", "geri al", "iptal", "unstage"],
      }),
      entry({
        slug: "stash",
        name: "stash",
        summary: [
          "Yarım işi bir kenara koyar.",
          "Parks work in progress.",
        ],
        syntax: "git stash push -m \"yarım kohort analizi\"\ngit stash list\ngit stash pop",
        description: [
          "Acil bir düzeltme için dal değiştirmen gerektiğinde yarım işi commit'lemeden saklar. `pop` geri getirip yığından siler, `apply` geri getirir ama yığında bırakır.",
          "Stores half-finished work without committing when you must switch branches for an urgent fix. `pop` restores and removes it from the stack; `apply` restores but keeps it.",
        ],
        example: { code: "git stash push -m \"yarım grafik\"\ngit switch main\n# ...\ngit switch -\ngit stash pop" },
        related: ["git/restore", "git/branch"],
        keywords: ["stash", "sakla", "yarım iş", "geçici"],
      }),
      entry({
        slug: "reset",
        name: "reset",
        summary: [
          "Son commit'leri geri sarar.",
          "Rewinds recent commits.",
        ],
        syntax:
          "git reset --soft HEAD~1   # commit'i çöz, değişiklikleri koru\ngit reset --hard HEAD~1   # commit'i ve değişiklikleri sil",
        description: [
          "`--soft` en güvenlisidir: yanlış mesajla ya da eksik dosyayla atılan commit'i çözer, emeğin durur. `--hard` **emeği de siler**. Ve ikisini de yalnızca **henüz push etmediğin** commit'lerde kullan — paylaşılmış geçmişi yeniden yazmak ekibi bozar.",
          "`--soft` is the safe one: it undoes a commit with a bad message or a missing file while keeping your work. `--hard` **destroys the work too**. Use either only on commits you **haven't pushed** — rewriting shared history breaks the team.",
        ],
        example: { code: "git reset --soft HEAD~1" },
        related: ["git/revert", "git/restore"],
        keywords: ["reset", "geri sar", "soft", "hard", "commit iptal"],
      }),
      entry({
        slug: "revert",
        name: "revert",
        summary: [
          "Bir commit'in etkisini yeni bir commit'le geri alır.",
          "Undoes a commit with a new commit.",
        ],
        syntax: "git revert <commit-hash>",
        description: [
          "Paylaşılmış geçmişte doğru yol budur: geçmişi silmez, tersini yapan yeni bir commit ekler. Ana dalda bir hata yayınlandıysa ilk refleksin `revert` olmalı, `reset` değil.",
          "This is the right tool on shared history: it doesn't erase anything, it adds a commit that does the opposite. If a mistake reached the main branch, reach for `revert`, not `reset`.",
        ],
        example: { code: "git revert 8b5ecac" },
        related: ["git/reset", "git/log"],
        keywords: ["revert", "geri al", "paylaşılan", "hata düzelt"],
      }),
      entry({
        slug: "merge",
        name: "merge ve çakışma çözme",
        summary: [
          "İki dalı birleştirir, çakışmaları çözer.",
          "Merges two branches and resolves conflicts.",
        ],
        syntax:
          "git merge main\n# çakışma: dosyayı düzelt, sonra\ngit add dosya\ngit merge --continue",
        description: [
          "Çakışma bir hata değil, iki kişinin aynı satıra dokunduğunun bildirimidir. Dosyadaki `<<<<<<<`, `=======`, `>>>>>>>` işaretlerini sil, doğru sonucu bırak. Vazgeçmek için `git merge --abort`.",
          "A conflict isn't an error; it's a notice that two people touched the same lines. Delete the `<<<<<<<`, `=======`, `>>>>>>>` markers and leave the correct result. To back out: `git merge --abort`.",
        ],
        example: { code: "git switch main\ngit pull --rebase\ngit merge analiz/segmentasyon" },
        related: ["git/branch", "git/pull-push"],
        keywords: ["merge", "birleştir", "çakışma", "conflict", "abort"],
      }),
      entry({
        slug: "gitignore",
        name: ".gitignore",
        summary: [
          "Depoya girmemesi gerekenleri dışarıda tutar.",
          "Keeps out what shouldn't be in the repo.",
        ],
        syntax: "*.csv\n.env\n.ipynb_checkpoints/\n__pycache__/\ndata/ham/",
        description: [
          "Veri projelerinde en kritik dosya budur: büyük veri setleri ve `.env` içindeki anahtarlar depoya girmemeli. **Dikkat**: `.gitignore` yalnızca henüz takip edilmeyen dosyalara etki eder. Bir dosya zaten commit'lendiyse `git rm --cached dosya` ile çıkarman gerekir.",
          "The most critical file in a data project: large datasets and the keys in `.env` must stay out. **Note**: `.gitignore` only affects untracked files. If a file is already committed, remove it with `git rm --cached file`.",
        ],
        example: { code: "git rm --cached data/musteriler.csv\ngit commit -m \"Ham veriyi depodan çıkar\"" },
        related: ["git/status-add-commit"],
        keywords: ["gitignore", "yoksay", "veri", "secret", "env", "büyük dosya"],
      }),
    ]),
  ],
});
