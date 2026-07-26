import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, quiz, text, tip } from "../helpers";

export const gitTrack: Track = {
  slug: "git-github",
  name: "Git & GitHub",
  category: "foundation",
  color: "#94a3b8",
  icon: "🔀",
  tagline: L("Çalışmanı sürümle ve yayınla", "Version your work and publish it"),
  description: L(
    "Analiz kodunu Git ile sürümlemek, GitHub'da portföye çevirmek ve ekiple çalışmak. Bu patikayı bitirdiğinde her projen, işe alım görüşmesinde açıp gösterebileceğin bir depoya dönüşmüş olur.",
    "Version your analysis code with Git, turn it into a portfolio on GitHub and collaborate with a team. By the end, each of your projects is a repository you can open in an interview.",
  ),
  levels: [
    {
      id: "beginner",
      title: L("Başlangıç — Git temelleri", "Beginner — Git basics"),
      description: L(
        "Depo oluşturma, commit döngüsü ve GitHub'a ilk yükleme.",
        "Creating a repository, the commit loop and your first push to GitHub.",
      ),
      lessons: [
        lesson({
          slug: "git-temelleri",
          title: L("Commit döngüsü ve ilk depo", "The commit loop and your first repository"),
          summary: L(
            "Dört komutla başlıyorsun ve günlük işin %90'ı bu dört komut.",
            "You start with four commands, and they cover 90% of daily work.",
          ),
          minutes: 15,
          blocks: [
            text(
              "Git, dosyalarının **zaman içindeki her hâlini** saklar. `analiz_son_v3_GERÇEK_son.ipynb` gibi dosya adlarına ihtiyacın kalmaz; her sürüm bir commit'tir ve istediğin ana geri dönebilirsin.\n\nÜç alan vardır: **çalışma dizini** (düzenlediğin dosyalar) → **staging** (commit'e girecekler) → **depo** (kalıcı geçmiş).",
              "Git stores **every state your files have ever had**. You no longer need filenames like `analysis_final_v3_REALLY_final.ipynb`; each version is a commit and you can return to any moment.\n\nThere are three areas: your **working directory** (files you edit) → **staging** (what goes into the next commit) → the **repository** (permanent history).",
            ),
            code(
              "javascript",
              `git init                     # yeni depo başlat
git status                   # ne değişti?
git add analiz.py            # tek dosyayı stage'e al
git add .                    # her şeyi stage'e al
git commit -m "Aylık ciro hesabı eklendi"
git log --oneline --graph    # geçmişi gör

# GitHub'a bağlan ve yükle
git remote add origin https://github.com/kullanici/proje.git
git branch -M main
git push -u origin main`,
            ),
            info(
              "İyi commit mesajı nasıl yazılır?",
              "How to write a good commit message",
              "Mesajı **emir kipiyle** ve **neyi neden** değiştirdiğini söyleyecek şekilde yaz: `\"Aykırı değer filtresini IQR yöntemine çevir\"`. `\"güncelleme\"`, `\"düzeltme\"`, `\"asdf\"` gibi mesajlar altı ay sonra hiçbir işe yaramaz. İyi bir geçmiş, projenin ikinci dokümantasyonudur.",
              "Write in the **imperative** and say **what** changed and **why**: `\"Switch outlier filter to the IQR method\"`. Messages like `\"update\"`, `\"fix\"` or `\"asdf\"` are worthless six months later. A good history is your project's second documentation.",
            ),
            pitfall(
              "Veri ve gizli anahtarları asla commit'leme",
              "Never commit data or secrets",
              "Bir kez commit'lenen dosya geçmişte kalır; sonradan silmek yetmez. `.gitignore` dosyasını **ilk iş** olarak oluştur: `*.csv`, `*.xlsx`, `.env`, `data/`, `__pycache__/`, `.ipynb_checkpoints/`. Veritabanı şifresi veya API anahtarı GitHub'a çıktıysa doğru refleks, o anahtarı **iptal etmektir** — depoyu temizlemek değil.",
              "Once a file is committed it lives in history; deleting it later is not enough. Create `.gitignore` **first thing**: `*.csv`, `*.xlsx`, `.env`, `data/`, `__pycache__/`, `.ipynb_checkpoints/`. If a database password or API key reaches GitHub, the correct reflex is to **revoke that key**, not to clean the repo.",
            ),
            order({
              id: "o1",
              prompt: [
                "Yerel bir analiz projesini GitHub'da yayınlama adımlarını sıraya diz.",
                "Order the steps for publishing a local analysis project to GitHub.",
              ],
              lines: [
                "Proje klasöründe .gitignore dosyasını oluştur",
                "git init ile depoyu başlat",
                "README.md yaz: proje ne yapıyor, veri nereden, nasıl çalıştırılır",
                "git add . && git commit -m 'İlk sürüm'",
                "GitHub'da boş bir depo oluştur",
                "git remote add origin <depo-adresi>",
                "git push -u origin main",
              ],
            }),
            quiz({
              id: "q1",
              q: [
                "`git add` komutu tam olarak ne yapar?",
                "What exactly does `git add` do?",
              ],
              options: [
                [
                  "Değişiklikleri bir sonraki commit'e girecek şekilde staging alanına alır",
                  "Stages changes so they go into the next commit",
                ],
                ["Değişiklikleri kalıcı olarak kaydeder", "Permanently records the changes"],
                ["Dosyayı GitHub'a yükler", "Uploads the file to GitHub"],
                ["Yeni bir dal oluşturur", "Creates a new branch"],
              ],
              answer: 0,
              explain: [
                "`add` seçer, `commit` kaydeder, `push` yükler. Bu üç adımın ayrı olması, tek bir düzenleme oturumundan mantıklı ve ayrı commit'ler çıkarabilmeni sağlar.",
                "`add` selects, `commit` records, `push` uploads. Keeping the three separate is what lets you carve one editing session into several meaningful commits.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "intermediate",
      title: L("Orta — Dallar ve iş birliği", "Intermediate — Branches and collaboration"),
      description: L(
        "Branch, merge, pull request ve çatışma çözümü.",
        "Branching, merging, pull requests and resolving conflicts.",
      ),
      lessons: [
        lesson({
          slug: "dallar-ve-pr",
          title: L("Dallar, birleştirme ve pull request", "Branches, merging and pull requests"),
          summary: L(
            "Ana dalı bozmadan denemek ve ekiple aynı dosyada çalışmak.",
            "Experimenting without breaking main, and working with others in the same files.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Dal (branch)**, ana çizgiden ayrılan paralel bir çalışma hattıdır. `main` her zaman çalışır durumda kalır; yeni analiz, yeni özellik veya riskli bir deneme ayrı dalda yapılır.",
              "A **branch** is a parallel line of work split off from the main line. `main` always stays in a working state; a new analysis, feature or risky experiment happens on its own branch.",
            ),
            code(
              "javascript",
              `git switch -c feature/kohort-analizi   # dal oluştur ve geç
# ... çalış, commit'le ...
git push -u origin feature/kohort-analizi

# GitHub'da Pull Request aç, inceleme al, birleştir

git switch main
git pull                                # güncel main'i çek
git branch -d feature/kohort-analizi    # biten dalı sil

# Çatışma çıkarsa: dosyayı aç, <<<<<<< ======= >>>>>>> işaretlerini
# temizleyip doğru hâli bırak, sonra:
git add cakisan_dosya.py
git commit`,
            ),
            text(
              "**Pull request (PR)**, \"şu değişikliği ana dala almak istiyorum\" demenin yoludur. Değeri sadece birleştirme değil, **inceleme**dir: başka biri kodunu okur, soru sorar, hata yakalar. Tek kişilik projelerde bile PR açmak, değişikliğin özetini yazmaya zorladığı için işe yarar.",
              "A **pull request (PR)** is how you say \"I would like this merged into main\". Its value is not the merge but the **review**: someone else reads your code, asks questions, catches mistakes. Even on a solo project, opening a PR is useful because it forces you to summarise the change.",
            ),
            tip(
              "Jupyter not defterleri ve Git",
              "Jupyter notebooks and Git",
              "`.ipynb` dosyaları JSON'dur ve çıktı hücrelerini de içerir; bu yüzden Git'te korkunç `diff`'ler üretir. Commit etmeden önce `Kernel → Restart & Clear Output` yap ya da `nbstripout` aracını kur — depo hem küçülür hem incelenebilir hale gelir.",
              "`.ipynb` files are JSON and include output cells, which produces terrible diffs in Git. Run `Kernel → Restart & Clear Output` before committing, or install `nbstripout` — the repo gets smaller and reviewable at the same time.",
            ),
            quiz({
              id: "q1",
              q: [
                "Birleştirme çatışması (merge conflict) ne zaman oluşur?",
                "When does a merge conflict happen?",
              ],
              options: [
                [
                  "İki dal aynı dosyanın aynı satırlarını farklı şekilde değiştirdiğinde",
                  "When two branches change the same lines of the same file differently",
                ],
                ["Her birleştirmede", "On every merge"],
                ["İnternet bağlantısı koptuğunda", "When the connection drops"],
                ["Dosya çok büyük olduğunda", "When a file is too large"],
              ],
              answer: 0,
              explain: [
                "Git farklı dosyaları ve aynı dosyanın farklı bölgelerini kendisi birleştirir. Yalnızca **aynı satırlar** iki tarafta da değiştiğinde hangisinin doğru olduğuna karar veremez ve sana sorar.",
                "Git merges different files, and different regions of the same file, on its own. Only when the **same lines** changed on both sides can it not decide which is right, so it asks you.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "advanced",
      title: L("İleri — Portföy ve otomasyon", "Advanced — Portfolio and automation"),
      description: L(
        "Depoyu işe alım vitrinine çevirmek ve GitHub Actions ile otomasyon.",
        "Turning a repo into a hiring showcase, and automating with GitHub Actions.",
      ),
      lessons: [
        lesson({
          slug: "portfoy-deposu",
          title: L("Portföy deposu ve GitHub Actions", "Portfolio repos and GitHub Actions"),
          summary: L(
            "İşe alım yapan kişi depona 90 saniye bakar. O 90 saniyeyi tasarla.",
            "A hiring manager gives your repo 90 seconds. Design those 90 seconds.",
          ),
          minutes: 17,
          blocks: [
            text(
              "**İyi bir portföy deposunun README'si** şu sırayla ilerler:\n\n1. **Tek cümlelik özet** — bu proje hangi soruyu cevaplıyor?\n2. **Sonuç görseli** — grafiğin veya panonun ekran görüntüsü, en üstte\n3. **Bulgular** — 3–5 madde hâlinde, sayıyla\n4. **Veri** — kaynağı, boyutu, dönemi\n5. **Yöntem** — hangi adımlar, hangi araçlar\n6. **Nasıl çalıştırılır** — kurulum ve komut\n7. **Klasör yapısı**\n\nEn sık yapılan hata teknik detayla başlamaktır. Okuyan kişi önce **ne bulduğunu** merak eder, nasıl bulduğunu sonra.",
              "**A good portfolio README** runs in this order:\n\n1. **One-sentence summary** — which question does this answer?\n2. **A result image** — a screenshot of the chart or dashboard, right at the top\n3. **Findings** — 3–5 bullets, with numbers\n4. **Data** — source, size, period\n5. **Method** — the steps and tools\n6. **How to run it** — setup and command\n7. **Folder structure**\n\nThe most common mistake is opening with technical detail. The reader wants to know **what you found** first, and how you found it second.",
            ),
            code(
              "javascript",
              `proje-adi/
├── README.md              # vitrin: özet, görsel, bulgular
├── requirements.txt       # bağımlılıklar
├── .gitignore
├── data/
│   ├── raw/               # ham veri (genelde .gitignore'da)
│   └── processed/         # işlenmiş, küçük örnek commit'lenebilir
├── notebooks/
│   └── 01_kesif.ipynb     # numaralı, sıralı
├── src/
│   ├── temizlik.py
│   └── analiz.py
└── outputs/
    └── figures/           # README'de gösterilen grafikler`,
              "Tekrarlanabilir bir analiz projesinin klasör yapısı",
              "Folder structure of a reproducible analysis project",
            ),
            code(
              "javascript",
              `# .github/workflows/test.yml — her push'ta otomatik kontrol
name: Test
on: [push, pull_request]
jobs:
  kontrol:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: python -m pytest -q`,
              "GitHub Actions: her yüklemede testleri çalıştır",
              "GitHub Actions: run the tests on every push",
            ),
            tip(
              "Yeşil kare takıntısına kapılma",
              "Do not chase the green squares",
              "GitHub'ın katkı grafiği güzel görünür ama kimse \"kaç gün üst üste commit atmış\" diye bakmaz. Beş iyi anlatılmış proje, elli yarım kalmış depodan kıyaslanamayacak kadar değerlidir. Depolarını sabitlemeyi (pin) unutma — profil sayfanda en iyi altı projeni sen seçersin.",
              "GitHub's contribution graph looks nice, but nobody hires on \"days in a row\". Five well-documented projects beat fifty abandoned repos by a wide margin. And remember to pin them — your profile lets you choose the six projects people see first.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir portföy deposunda README'nin en üstünde ne olmalı?",
                "What belongs at the very top of a portfolio README?",
              ],
              options: [
                [
                  "Projenin cevapladığı soru ve sonucun görseli",
                  "The question the project answers and an image of the result",
                ],
                ["Kurulum talimatları", "Installation instructions"],
                ["Kullanılan kütüphanelerin listesi", "The list of libraries used"],
                ["Klasör yapısı", "The folder structure"],
              ],
              answer: 0,
              explain: [
                "Okuyucu önce \"bu ne işe yarıyor ve ne bulundu?\" sorusunun cevabını arar. Kurulum ve klasör yapısı gerekli ama onlar, ilgilenmeye karar vermiş kişinin okuyacağı bölümlerdir.",
                "The reader first looks for \"what is this and what did it find?\". Setup and structure matter, but they are for the person who has already decided to look closer.",
              ],
              xp: 20,
            }),
          ],
        }),
      ],
    },
  ],
};
