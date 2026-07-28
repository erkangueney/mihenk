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
      id: "foundation",
      title: L("Sürüm kontrolüne giriş", "Introduction to version control"),
      description: L(
        "`analiz_final_v3_SON.xlsx` sorunu ve onu çözen fikir.",
        "The `analysis_final_v3_FINAL.xlsx` problem, and the idea that solves it.",
      ),
      lessons: [
        lesson({
          slug: "neden-surum-kontrolu",
          title: L("Neden sürüm kontrolü?", "Why version control?"),
          summary: L(
            "Dosya adına tarih yazmak neden çalışmaz ve Git bunun yerine ne yapar?",
            "Why does putting a date in the filename fail, and what does Git do instead?",
          ),
          minutes: 12,
          blocks: [
            text(
              "Her ekipte aynı klasör vardır:\n\n```\nanaliz.xlsx\nanaliz_v2.xlsx\nanaliz_final.xlsx\nanaliz_final_SON.xlsx\nanaliz_final_SON_erkan_düzeltme.xlsx\n```\n\nBu yaklaşımın dört sorunu vardır:\n\n1. **Hangisi güncel** belli değildir\n2. **Ne değişti** görülemez\n3. **İki kişinin değişikliği birleştirilemez**\n4. **Neden değiştiği** hiçbir yerde yazmaz\n\n**Git** dördünü birden çözer: her kaydın (commit) bir tarihi, bir yazarı, bir açıklaması ve bir öncekiyle **tam farkı** vardır. Tek bir dosya vardır; geçmiş onun içinde saklıdır.",
              "Every team has the same folder:\n\n```\nanalysis.xlsx\nanalysis_v2.xlsx\nanalysis_final.xlsx\nanalysis_final_FINAL.xlsx\nanalysis_final_FINAL_erkan_fix.xlsx\n```\n\nThis approach has four problems:\n\n1. **Which one is current** is unclear\n2. **What changed** cannot be seen\n3. **Two people's changes cannot be merged**\n4. **Why it changed** is written nowhere\n\n**Git** solves all four: every commit has a date, an author, a message and the **exact diff** from the one before. There is a single file, and the history lives inside it.",
            ),
            text(
              "**Git'in temel fikri: anlık görüntüler (snapshots).**\n\nGit dosyalarının farkını değil, her kayıtta projenin **tüm hâlini** saklar (değişmeyen dosyalar için önceki kopyaya işaret ederek). Bu yüzden herhangi bir ana geri dönmek anlıktır ve güvenlidir.\n\n**Üç alan** — Git'i anlamanın anahtarı budur:\n\n1. **Çalışma dizini** — Dosyaları düzenlediğin yer\n2. **Hazırlık alanı (staging)** — Bir sonraki kayda **girecek** değişiklikleri seçtiğin ara alan\n3. **Depo (repository)** — Kalıcı kayıtların tutulduğu yer\n\nHazırlık alanı ilk bakışta gereksiz görünür ama çok değerlidir: beş dosyayı değiştirmiş olsan bile yalnızca ilgili üçünü tek bir anlamlı kayda alabilirsin.",
              "**Git's core idea: snapshots.**\n\nGit stores not the differences between files but the **entire state** of the project at each commit (pointing at the previous copy for unchanged files). That is why returning to any point in time is instant and safe.\n\n**Three areas** — this is the key to understanding Git:\n\n1. **Working directory** — where you edit files\n2. **Staging area** — the intermediate space where you choose which changes go **into** the next commit\n3. **Repository** — where permanent commits are kept\n\nThe staging area looks unnecessary at first but is very valuable: even having changed five files, you can commit just the relevant three as one coherent change.",
            ),
            quiz({
              id: "q1",
              q: [
                "Git'te hazırlık alanının (staging) faydası nedir?",
                "What is the staging area good for in Git?",
              ],
              options: [
                [
                  "Değiştirdiğin dosyalardan yalnızca seçtiklerini tek bir anlamlı kayda alabilmek",
                  "Committing only the files you choose from those you changed, as one coherent change",
                ],
                ["Dosyaları yedeklemek", "Backing up files"],
                ["Dosyaları sıkıştırmak", "Compressing files"],
                ["Kodu çalıştırmak", "Running the code"],
              ],
              answer: 0,
              explain: [
                "Çalışırken genellikle birden çok işi aynı anda yaparsın: bir hata düzeltir, bir de yeni özellik eklersin. Hazırlık alanı bunları **ayrı kayıtlara** bölmeni sağlar. Ayrı kayıtlar geçmişi okunur kılar ve gerektiğinde yalnızca birini geri almanı mümkün kılar.",
                "While working you usually do several things at once: fix a bug and add a feature. The staging area lets you split those into **separate commits**. Separate commits keep the history readable and let you revert just one of them later.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "ilk-depo",
          title: L("İlk deponu kurmak", "Creating your first repository"),
          summary: L(
            "Beş komutla başla: init, status, add, commit, log.",
            "Start with five commands: init, status, add, commit, log.",
          ),
          minutes: 14,
          blocks: [
            text(
              "Git'in yüzlerce komutu vardır ama günlük işin **%90'ı** beş tanesiyle döner.",
              "Git has hundreds of commands, but **90%** of daily work runs on five of them.",
            ),
            code(
              "bash",
              `# Bir kez: kim olduğunu söyle (her kayda yazılır)
git config --global user.name "Erkan Güney"
git config --global user.email "erkan@ornek.com"

# Yeni depo başlat
git init

# Durumu gör — en çok kullanacağın komut, sık sık çalıştır
git status

# Değişiklikleri hazırlık alanına al
git add analiz.py            # tek dosya
git add .                    # tümü

# Kaydet — mesaj ne yaptığını DEĞİL neden yaptığını anlatmalı
git commit -m "Aylık ciro hesabına iade düzeltmesi ekle"

# Geçmişi gör
git log --oneline --graph`,
            ),
            tip(
              "İyi kayıt mesajı nasıl yazılır?",
              "How to write a good commit message",
              "Kötü mesaj: `düzeltme`, `güncelleme`, `asdf`, `çalışıyor artık`\n\nİyi mesaj: `Ciro hesabında iade edilen siparişleri hariç tut`\n\nKural: mesaj, **\"Bu kayıt uygulandığında …\"** cümlesini tamamlamalıdır. Emir kipi kullanılır (\"ekle\", \"düzelt\", \"kaldır\").\n\nNeden önemli? Altı ay sonra bir hatanın nereden geldiğini ararken `git log` çıktısını okuyacaksın. Elli tane \"güncelleme\" mesajı arasında aradığını bulmak imkânsızdır; anlamlı mesajlar ise geçmişi bir belgeye dönüştürür.\n\nUzun açıklama gerekiyorsa `-m` kullanmadan `git commit` yaz; editör açılır ve başlık + gövde yazabilirsin.",
              "Bad messages: `fix`, `update`, `asdf`, `works now`\n\nA good message: `Exclude returned orders from the revenue calculation`\n\nThe rule: the message should complete the sentence **\"When applied, this commit will …\"**. Use the imperative (\"add\", \"fix\", \"remove\").\n\nWhy does it matter? Six months from now you will read `git log` hunting for where a bug came from. Finding it among fifty \"update\" messages is impossible; meaningful messages turn the history into documentation.\n\nWhen you need a longer explanation, run `git commit` without `-m`; an editor opens and you can write a subject and a body.",
            ),
            pitfall(
              "Bu dosyaları asla depoya koyma",
              "Never commit these files",
              "Bir dosya Git'e girdikten sonra geçmişten silmek **çok zordur** — sildikten sonra bile eski kayıtlarda durur. Bu yüzden en baştan `.gitignore` dosyası yaz:\n\n```\n# Gizli bilgi — en kritik olan\n.env\n*.key\ncredentials.json\n\n# Büyük veri\n*.csv\ndata/raw/\n\n# Üretilen dosyalar\n__pycache__/\n.venv/\n.Rhistory\n\n# İşletim sistemi artıkları\n.DS_Store\n```\n\nEn tehlikelisi **parolalar ve API anahtarlarıdır**. Depo herkese açık hâle gelirse anahtarın da açılır — ve bunu botlar dakikalar içinde bulur. Yanlışlıkla anahtar kaydettiysen tek doğru yol anahtarı **iptal edip yenisini almaktır**; dosyayı silmek yetmez.",
              "Once a file enters Git it is **very hard** to remove from history — it stays in the old commits even after deletion. So write a `.gitignore` from the start:\n\n```\n# Secrets — the critical one\n.env\n*.key\ncredentials.json\n\n# Large data\n*.csv\ndata/raw/\n\n# Generated files\n__pycache__/\n.venv/\n.Rhistory\n\n# OS debris\n.DS_Store\n```\n\nThe most dangerous are **passwords and API keys**. If the repository ever becomes public, so does your key — and bots find it within minutes. If you committed a key by accident, the only correct response is to **revoke it and issue a new one**; deleting the file is not enough.",
            ),
            quiz({
              id: "q1",
              q: [
                "Yanlışlıkla API anahtarı içeren bir dosyayı kaydettin ve gönderdin. Ne yapmalısın?",
                "You accidentally committed and pushed a file containing an API key. What should you do?",
              ],
              options: [
                [
                  "Anahtarı hemen iptal edip yenisini almak — dosyayı silmek yetmez, geçmişte kalır",
                  "Revoke the key immediately and issue a new one — deleting the file is not enough, it remains in history",
                ],
                ["Dosyayı silip yeni kayıt atmak", "Delete the file and make a new commit"],
                ["`.gitignore`'a eklemek", "Add it to `.gitignore`"],
                ["Hiçbir şey; sorun değil", "Nothing; it is fine"],
              ],
              answer: 0,
              explain: [
                "Git geçmişi saklar: dosyayı silsen bile eski kayıtta anahtar durur ve `git log -p` ile herkes görebilir. `.gitignore` da yalnızca **bundan sonrasını** etkiler. Anahtar bir kez açığa çıktıysa artık güvenli değildir — tek çözüm iptal etmektir. Geçmişi temizlemek de mümkündür ama ikincil önceliktir.",
                "Git keeps history: delete the file and the key still sits in the old commit, visible to anyone via `git log -p`. `.gitignore` only affects what happens **from now on**. Once a key is exposed it is no longer safe — revoking is the only fix. Rewriting history is possible too but is the secondary priority.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "geri-alma",
          title: L("Hata yaptığında geri almak", "Undoing mistakes"),
          summary: L(
            "Git'in en çok korkulan yanı: yanlış şeyi geri almak. Hangi komut ne yapar?",
            "The scariest side of Git: undoing the wrong thing. Which command does what?",
          ),
          minutes: 14,
          blocks: [
            text(
              "Yeni başlayanları en çok korkutan şey geri alma komutlarıdır — çünkü birbirine benzeyen üç komut çok farklı işler yapar. Hangisinin ne zaman kullanılacağı:",
              "What frightens beginners most is the undo commands — because three similar-looking commands do very different things. Here is when to use which:",
            ),
            code(
              "bash",
              `# 1. Henüz kaydetmediğin değişikliği at (DİKKAT: geri gelmez)
git restore analiz.py

# 2. Hazırlık alanından çıkar (dosya değişikliği durur)
git restore --staged analiz.py

# 3. Son kaydın mesajını düzelt veya unuttuğun dosyayı ekle
git commit --amend

# 4. Bir kaydı GERİ ALAN yeni bir kayıt oluştur — güvenli, geçmiş korunur
git revert abc1234

# 5. Geçmişi geri sar — YALNIZCA paylaşmadığın kayıtlarda
git reset --soft HEAD~1    # kaydı geri al, değişiklikler hazırlıkta kalır
git reset --hard HEAD~1    # kaydı ve değişiklikleri sil (TEHLİKELİ)

# 6. Her şeyi berbat ettiysen: tüm hareketlerin kaydı
git reflog                 # buradan herhangi bir ana dönebilirsin`,
            ),
            info(
              "revert mi reset mi?",
              "revert or reset?",
              "Ayrım basittir ve tek bir soruya bağlıdır: **bu kaydı başkasıyla paylaştın mı?**\n\n**Paylaştıysan (push ettiysen) → `git revert`.** Eski kaydı silmez; onun etkisini ortadan kaldıran **yeni** bir kayıt ekler. Geçmiş korunur, kimsenin deposu bozulmaz.\n\n**Paylaşmadıysan → `git reset` kullanabilirsin.** Geçmişi gerçekten değiştirir ve yerelde temiz bir tarihçe bırakır.\n\nPaylaşılan bir dalda `reset` yapıp zorla göndermek, ekip arkadaşlarının deposunu bozar ve Git'te yapılabilecek en can sıkıcı hatalardan biridir.",
              "The distinction is simple and rests on one question: **have you shared this commit with anyone?**\n\n**If you have pushed it → `git revert`.** It does not delete the old commit; it adds a **new** one that undoes its effect. History is preserved and nobody's clone breaks.\n\n**If you have not → you may use `git reset`.** It genuinely rewrites history and leaves a clean local timeline.\n\nRunning `reset` on a shared branch and force-pushing corrupts your teammates' repositories, and is one of the most irritating mistakes possible in Git.",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir hafta önce gönderdiğin ve ekibin çektiği bir kaydı geri almak istiyorsun. Hangi komut?",
                "You want to undo a commit you pushed a week ago and the team has pulled. Which command?",
              ],
              options: [
                [
                  "`git revert` — etkiyi ortadan kaldıran yeni bir kayıt ekler, geçmiş bozulmaz",
                  "`git revert` — it adds a new commit undoing the effect without rewriting history",
                ],
                ["`git reset --hard`", "`git reset --hard`"],
                ["`git restore`", "`git restore`"],
                ["`git commit --amend`", "`git commit --amend`"],
              ],
              answer: 0,
              explain: [
                "Kayıt paylaşıldıysa geçmişi değiştiremezsin — ekip arkadaşlarının deposu o kayda dayanıyor. `revert`, tarihçeye dokunmadan ileriye doğru bir düzeltme ekler ve herkeste sorunsuz çalışır. Ayrıca \"bu değişiklik neden geri alındı?\" sorusunun cevabı da geçmişte kalır.",
                "Once a commit is shared you cannot rewrite history — your teammates' repositories are built on it. `revert` adds a forward correction without touching the timeline and works cleanly for everyone. It also leaves the answer to \"why was this reverted?\" in the history.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Git temelleri", "Git basics"),
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
      id: "mid",
      title: L("Dallar ve iş birliği", "Branches and collaboration"),
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
      id: "senior",
      title: L("Portföy ve otomasyon", "Portfolio and automation"),
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
    {
      id: "expert",
      title: L("Ekip iş akışı ve otomasyon", "Team workflow and automation"),
      description: L(
        "Dallanma stratejisi, kod incelemesi kültürü ve CI ile analizini otomatik denetlemek.",
        "Branching strategy, review culture, and checking your analysis automatically with CI.",
      ),
      lessons: [
        lesson({
          slug: "dallanma-stratejileri",
          title: L("Dallanma stratejileri", "Branching strategies"),
          summary: L(
            "Ekip büyüdüğünde dalları nasıl düzenlersin? Üç yaygın model.",
            "How do you organise branches as the team grows? Three common models.",
          ),
          minutes: 16,
          blocks: [
            text(
              "Tek başına çalışırken `main` dalında ilerlemek yeterlidir. İki kişi olunca bir düzen gerekir. Üç yaygın model:\n\n**1. GitHub Flow (en yaygın, en basit)**\n- `main` her zaman çalışır durumdadır ve yayınlanabilir\n- Her iş için `main`'den kısa ömürlü bir dal açılır\n- Dal, inceleme sonrası `main`'e birleşir ve **silinir**\n- Veri ekipleri ve küçük-orta takımlar için doğru tercih\n\n**2. Git Flow (daha karmaşık)**\n- `main`, `develop`, `feature/*`, `release/*`, `hotfix/*` dalları\n- Sürüm numarası olan, uzun destek dönemli ürünler için tasarlandı\n- Sürekli yayın yapan ekipler için gereksiz ağırdır\n\n**3. Trunk-based**\n- Herkes doğrudan `main`'e çok küçük kayıtlarla katkı verir\n- Yarım kalan işler özellik anahtarları (feature flags) ile kapalı tutulur\n- Güçlü otomatik test altyapısı gerektirir",
              "Working alone, staying on `main` is fine. With two people you need a convention. Three common models:\n\n**1. GitHub Flow (most common, simplest)**\n- `main` is always working and releasable\n- each piece of work gets a short-lived branch off `main`\n- the branch merges into `main` after review and is **deleted**\n- the right choice for data teams and small-to-medium groups\n\n**2. Git Flow (more elaborate)**\n- `main`, `develop`, `feature/*`, `release/*`, `hotfix/*` branches\n- designed for versioned products with long support windows\n- unnecessarily heavy for teams releasing continuously\n\n**3. Trunk-based**\n- everyone commits straight to `main` in very small increments\n- unfinished work is hidden behind feature flags\n- requires strong automated test coverage",
            ),
            code(
              "bash",
              `# GitHub Flow — günlük döngü
git switch main
git pull                                  # önce güncelle
git switch -c ozellik/kohort-analizi      # dal aç ve geç

# ... çalış, kaydet ...
git add . && git commit -m "Kohort analizi sorgusunu ekle"

git push -u origin ozellik/kohort-analizi # uzağa gönder
# GitHub'da pull request aç, inceleme al, birleştir

git switch main
git pull
git branch -d ozellik/kohort-analizi      # biten dalı sil`,
            ),
            tip(
              "Dalları kısa ömürlü tut",
              "Keep branches short-lived",
              "Bir dal ne kadar uzun yaşarsa `main`'den o kadar uzaklaşır ve birleştirme çakışması olasılığı **katlanarak** artar. İki hafta açık kalmış bir dalı birleştirmek genellikle yarım günlük bir acıdır.\n\nPratik hedef: bir dal **bir-üç gün** içinde birleşmeli. İş bundan büyükse parçalara böl ve her parçayı ayrı birleştir.\n\nAyrıca dalında çalışırken düzenli olarak `git pull origin main` ile güncellemeyi al — çakışmayı sonda topluca değil, azar azar çözmek çok daha kolaydır.",
              "The longer a branch lives, the further it drifts from `main` and the probability of merge conflicts rises **exponentially**. Merging a branch left open for two weeks is usually half a day of pain.\n\nA practical target: a branch should merge within **one to three days**. If the work is larger than that, split it and merge each piece separately.\n\nAlso pull `main` into your branch regularly with `git pull origin main` — resolving conflicts a little at a time is far easier than all at once at the end.",
            ),
            quiz({
              id: "q1",
              q: [
                "Üç kişilik bir veri ekibi için hangi dallanma modeli uygundur?",
                "Which branching model suits a three-person data team?",
              ],
              options: [
                [
                  "GitHub Flow — kısa ömürlü dallar ve pull request; basit ve yeterli",
                  "GitHub Flow — short-lived branches and pull requests; simple and sufficient",
                ],
                ["Git Flow", "Git Flow"],
                ["Dal kullanmamak", "Not using branches at all"],
                ["Herkesin kendi deposu", "A separate repository each"],
              ],
              answer: 0,
              explain: [
                "Git Flow, sürüm numarası olan ve eski sürümleri desteklemeye devam eden yazılım ürünleri için tasarlandı; bir veri ekibinde beş dal türünü yönetmek boşa harcanan zamandır. GitHub Flow, inceleme disiplinini korurken ek yük getirmez.",
                "Git Flow was designed for versioned software products that keep supporting older releases; managing five branch types in a data team is wasted effort. GitHub Flow preserves review discipline without the overhead.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "kod-incelemesi",
          title: L("Kod incelemesi ve pull request kültürü", "Code review and pull request culture"),
          summary: L(
            "İnceleme, hata bulmaktan çok bilgi yaymanın yoludur.",
            "Review is less about finding bugs and more about spreading knowledge.",
          ),
          minutes: 16,
          blocks: [
            text(
              "**Pull request (PR)**, \"şu dalımı `main`'e alır mısın?\" isteğidir. Ama asıl değeri teknik değildir; PR'ın üç işlevi vardır:\n\n1. **Hata yakalamak** — İkinci bir göz, gözden kaçanı görür\n2. **Bilgi yaymak** — Ekip, projenin nasıl çalıştığını öğrenir; tek kişiye bağımlılık azalır\n3. **Kayıt bırakmak** — \"Bu neden böyle yapıldı?\" sorusunun cevabı PR tartışmasında kalır\n\nVeri ekiplerinde en çok gözden kaçan ikinci maddedir: PR'lar sayesinde bir analistin yaptığı işi ekipteki herkes anlar ve o kişi izne çıktığında iş durmaz.",
              "A **pull request (PR)** is the request \"would you take my branch into `main`?\". But its real value is not technical; a PR serves three purposes:\n\n1. **Catching bugs** — a second pair of eyes sees what you missed\n2. **Spreading knowledge** — the team learns how the project works, reducing dependence on one person\n3. **Leaving a record** — the answer to \"why was this done this way?\" stays in the PR discussion\n\nIn data teams the second point is the most overlooked: PRs are how everyone comes to understand an analyst's work, so nothing stops when that person takes leave.",
            ),
            text(
              "**İyi bir PR nasıl açılır?**\n\n- **Küçük tut.** 400 satırdan büyük PR'lar gerçekten incelenmez; insanlar göz gezdirip onaylar. Küçük PR gerçek inceleme alır.\n- **Başlığı ve açıklamayı yaz.** Ne yaptığını, **neden** yaptığını ve nasıl test ettiğini yaz.\n- **Ekran görüntüsü ekle.** Rapor veya grafik değiştiyse öncesi-sonrası görüntüsü, on satır açıklamadan daha etkilidir.\n- **Kendi PR'ını önce kendin incele.** Göndermeden önce farkı okuduğunda hatalarının yarısını kendin bulursun.\n\n**İyi bir inceleme nasıl yapılır?**\n\n- **Koda yorum yap, kişiye değil.** \"Bu fonksiyon şu durumda hata verebilir\" ✅ / \"Neden böyle yazdın?\" ❌\n- **Zorunlu ile öneriyi ayır.** \"Bunu düzeltmek gerekir\" ile \"küçük öneri: şöyle de olabilir\" farklı ağırlıktadır; belirt.\n- **Beğendiğini de söyle.** İyi çözümü fark etmek, inceleme kültürünü sürdürülebilir kılar.\n- **Hızlı dön.** Bekleyen PR, ekibi bloke eder. Bir iş günü içinde cevap vermek iyi bir hedeftir.",
              "**How to open a good PR:**\n\n- **Keep it small.** PRs over 400 lines do not really get reviewed; people skim and approve. A small PR gets a real review.\n- **Write the title and description.** State what you did, **why**, and how you tested it.\n- **Add a screenshot.** If a report or chart changed, a before-and-after image beats ten lines of prose.\n- **Review your own PR first.** Reading the diff before sending it finds half your own mistakes.\n\n**How to review well:**\n\n- **Comment on the code, not the person.** \"This function could fail in that case\" ✅ / \"Why did you write it like this?\" ❌\n- **Separate must-fix from suggestion.** \"This needs fixing\" and \"minor idea: this could also work\" carry different weight; say which.\n- **Say what you liked.** Noticing a good solution is what makes a review culture sustainable.\n- **Respond quickly.** A waiting PR blocks the team. Replying within one working day is a good target.",
            ),
            quiz({
              id: "q1",
              q: [
                "1500 satırlık bir pull request neden sorunludur?",
                "Why is a 1,500-line pull request a problem?",
              ],
              options: [
                [
                  "Gerçekten incelenmez; inceleyen göz gezdirip onaylar ve hatalar geçer",
                  "It does not get genuinely reviewed; the reviewer skims, approves, and bugs slip through",
                ],
                ["Git birleştiremez", "Git cannot merge it"],
                ["Çok yer kaplar", "It takes up too much space"],
                ["Sorun değildir", "It is not a problem"],
              ],
              answer: 0,
              explain: [
                "İnsan dikkatinin sınırı vardır: araştırmalar 200-400 satırdan sonra hata bulma oranının hızla düştüğünü gösteriyor. Büyük PR, inceleme sürecini **tiyatroya** dönüştürür — onay alınır ama gerçek denetim olmaz. Büyük işi mantıklı parçalara bölmek hem daha hızlı hem daha güvenlidir.",
                "Human attention has limits: studies show defect-finding drops sharply past 200-400 lines. A large PR turns review into **theatre** — approval is granted but no real scrutiny happens. Splitting large work into sensible pieces is both faster and safer.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "ci-ile-otomatik-denetim",
          title: L("CI ile otomatik denetim", "Automated checks with CI"),
          summary: L(
            "Her kayıtta testler kendiliğinden koşsun; bozuk kod birleşemesin.",
            "Let tests run themselves on every commit, so broken code cannot merge.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Sürekli entegrasyon (CI)**, her kayıt veya PR geldiğinde otomatik olarak denetim çalıştıran sistemdir. GitHub Actions ile bu, depoya eklenen tek bir dosyadan ibarettir.\n\nVeri projelerinde CI'ın koşabileceği denetimler:\n\n- **Biçim ve linter** — Kod stili tutarlı mı (`ruff`, `black`, `lintr`)\n- **Birim testleri** — Fonksiyonlar beklendiği gibi mi çalışıyor (`pytest`, `testthat`)\n- **Veri testleri** — dbt testleri, şema doğrulama\n- **SQL biçimlendirme** — `sqlfluff` ile sorgu stili\n- **Gizli bilgi taraması** — Yanlışlıkla eklenmiş anahtar var mı\n- **Notebook çıktısı temizliği** — Notebook'lar çıktı gömülü gelmiş mi",
              "**Continuous integration (CI)** is a system that runs checks automatically on every commit or PR. With GitHub Actions it amounts to a single file added to the repository.\n\nChecks CI can run on a data project:\n\n- **Formatting and linting** — is the code style consistent (`ruff`, `black`, `lintr`)\n- **Unit tests** — do the functions behave as expected (`pytest`, `testthat`)\n- **Data tests** — dbt tests, schema validation\n- **SQL formatting** — query style with `sqlfluff`\n- **Secret scanning** — has a key been committed by accident\n- **Notebook output hygiene** — did notebooks arrive with outputs embedded",
            ),
            code(
              "yaml",
              `# .github/workflows/kontrol.yml
name: Kontroller

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Bağımlılıkları kur
        run: pip install -r requirements.txt

      - name: Linter
        run: ruff check .

      - name: Testler
        run: pytest -q

      - name: SQL biçimi
        run: sqlfluff lint models/ --dialect postgres`,
            ),
            text(
              "**Dal koruma kuralları (branch protection)** CI'ı zorunlu kılan parçadır. GitHub'da `main` dalı için şunları açarsın:\n\n- **PR olmadan doğrudan gönderim yapılamaz**\n- **CI kontrolleri geçmeden birleştirilemez**\n- **En az bir onay gerekir**\n- **Birleştirmeden önce `main` ile güncel olmalı**\n\nBu kurallar olmadan CI yalnızca bir **öneri**dir: kırmızı görünse bile biri birleştirebilir ve genelde acele bir günde tam olarak bu olur.\n\nKurallarla birlikte ise bozuk kodun `main`'e girmesi **teknik olarak imkânsız** hâle gelir. Bu, ekip disiplinini insan iradesinden mimariye taşımanın en somut örneğidir — ve tek seferlik bir ayardır.",
              "**Branch protection rules** are what make CI mandatory. On GitHub you enable these for `main`:\n\n- **no direct pushes without a PR**\n- **cannot merge until CI checks pass**\n- **at least one approval required**\n- **must be up to date with `main` before merging**\n\nWithout these rules CI is merely a **suggestion**: somebody can merge even when it is red, and on a rushed day that is exactly what happens.\n\nWith them, broken code entering `main` becomes **technically impossible**. It is the most concrete example of moving team discipline from human willpower into architecture — and it is a one-off setting.",
            ),
            quiz({
              id: "q1",
              q: [
                "CI kurdun ama testler kırmızıyken bile PR'lar birleşiyor. Eksik olan ne?",
                "You set up CI, but PRs still merge while tests are red. What is missing?",
              ],
              options: [
                [
                  "Dal koruma kuralları — kontroller geçmeden birleştirmeyi engelleyen ayar",
                  "Branch protection rules — the setting that blocks merging until checks pass",
                ],
                ["Daha fazla test", "More tests"],
                ["Daha hızlı CI", "Faster CI"],
                ["Farklı bir CI aracı", "A different CI tool"],
              ],
              answer: 0,
              explain: [
                "CI yalnızca **bilgi üretir**; o bilgiyi zorunlu kılan şey dal koruma kurallarıdır. \"Gerekli kontroller\" (required status checks) ayarını açmadan CI, görmezden gelinebilen bir uyarı olarak kalır. Bu ayar iki tıktır ve CI'a yapılan tüm yatırımın karşılığını almanın koşuludur.",
                "CI only **produces information**; branch protection is what makes that information binding. Without enabling required status checks, CI remains a warning that can be ignored. The setting takes two clicks and is the condition for getting any return on your CI investment.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
