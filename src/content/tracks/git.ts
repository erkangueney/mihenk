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
            quiz({
              id: "q2",
              q: [
                "Dosya adına tarih/versiyon eklemenin (analiz_final_SON.xlsx gibi) en büyük sorunu nedir?",
                "What is the biggest problem with adding dates/versions to filenames (like analysis_final_FINAL.xlsx)?",
              ],
              options: [
                [
                  "İki kişinin yaptığı değişiklikler birleştirilemez",
                  "Two people's changes cannot be merged",
                ],
                ["Dosya adı çok uzun olur", "The filename becomes too long"],
                ["Excel dosyaları büyük olur", "Excel files become large"],
                ["Bilgisayarda yer kaplar", "It takes up disk space"],
              ],
              answer: 0,
              explain: [
                "Bir dosyanın tek kopyası olduğunda iki kişi aynı anda değişiklik yaparsa biri diğerinin üzerine yazar. Git her kaydı ayrı tutar ve değişiklikleri karşılaştırıp birleştirebilir; bu, düz dosya kopyalamayla mümkün değildir.",
                "With a single copy of a file, if two people change it at once, one overwrites the other. Git keeps every commit separate and can compare and merge changes — something plain file copying cannot do.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir commit'te aşağıdakilerden hangisi TUTULMAZ?",
                "Which of the following is NOT recorded in a commit?",
              ],
              options: [
                ["Kullanıcının IP adresi", "The user's IP address"],
                ["Kaydı yapan kişinin adı", "The name of the author"],
                ["Kayıt tarihi", "The commit date"],
                ["Bir önceki kayıtla tam fark", "The exact diff from the previous commit"],
              ],
              answer: 0,
              explain: [
                "Git yalnızca proje içeriğiyle ilgili bilgileri tutar: yazar, tarih, mesaj ve önceki kayıtla fark. Ağ bilgileri gibi şeyler hiç kaydedilmez.",
                "Git only keeps information tied to the project's content: author, date, message and the diff from the previous commit. Network details are never recorded.",
              ],
            }),
            text(
              "**Git'in temel fikri: anlık görüntüler (snapshots).**\n\nGit dosyalarının farkını değil, her kayıtta projenin **tüm hâlini** saklar (değişmeyen dosyalar için önceki kopyaya işaret ederek). Bu yüzden herhangi bir ana geri dönmek anlıktır ve güvenlidir.\n\n**Üç alan** — Git'i anlamanın anahtarı budur:\n\n1. **Çalışma dizini** — Dosyaları düzenlediğin yer\n2. **Hazırlık alanı (staging)** — Bir sonraki kayda **girecek** değişiklikleri seçtiğin ara alan\n3. **Depo (repository)** — Kalıcı kayıtların tutulduğu yer\n\nHazırlık alanı ilk bakışta gereksiz görünür ama çok değerlidir: beş dosyayı değiştirmiş olsan bile yalnızca ilgili üçünü tek bir anlamlı kayda alabilirsin.",
              "**Git's core idea: snapshots.**\n\nGit stores not the differences between files but the **entire state** of the project at each commit (pointing at the previous copy for unchanged files). That is why returning to any point in time is instant and safe.\n\n**Three areas** — this is the key to understanding Git:\n\n1. **Working directory** — where you edit files\n2. **Staging area** — the intermediate space where you choose which changes go **into** the next commit\n3. **Repository** — where permanent commits are kept\n\nThe staging area looks unnecessary at first but is very valuable: even having changed five files, you can commit just the relevant three as one coherent change.",
            ),
            quiz({
              id: "q4",
              q: [
                "Git bir commit sırasında tam olarak neyi saklar?",
                "What exactly does Git store at each commit?",
              ],
              options: [
                [
                  "Projenin o andaki tüm hâlini (anlık görüntü)",
                  "The entire state of the project at that moment (a snapshot)",
                ],
                ["Yalnızca değişen satırların farkını", "Only the diff of the changed lines"],
                ["Sadece dosya adlarını", "Only the file names"],
                ["Yalnızca son commit'i", "Only the most recent commit"],
              ],
              answer: 0,
              explain: [
                "Git dosyaların farkını değil, her kayıtta projenin tüm hâlini saklar. Bu, herhangi bir ana dönmeyi anlık ve güvenli kılar.",
                "Git stores the entire state of the project at each commit, not just diffs. That is what makes returning to any point instant and safe.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Değişmeyen bir dosya yeni bir commit'te nasıl saklanır?",
                "How is an unchanged file stored in a new commit?",
              ],
              options: [
                [
                  "Önceki commit'teki kopyasına işaret edilerek",
                  "By pointing to its copy in the previous commit",
                ],
                ["Yeniden tam olarak kopyalanarak", "By copying it in full again"],
                ["Silinerek", "By deleting it"],
                ["Sıkıştırılarak küçültülerek", "By compressing it"],
              ],
              answer: 0,
              explain: [
                "Git, değişmeyen dosyalar için önceki kopyaya işaret eder; böylece 'tüm hâli sakla' fikri pahalı bir tam kopyalamaya dönüşmez.",
                "Git points at the previous copy for unchanged files, so the 'store the whole state' idea never becomes an expensive full copy.",
              ],
            }),
            quiz({
              id: "q6",
              q: ["Çalışma dizini (working directory) nedir?", "What is the working directory?"],
              options: [
                ["Dosyaları düzenlediğin yer", "Where you edit files"],
                ["Kayıtların kalıcı tutulduğu yer", "Where commits are permanently stored"],
                ["GitHub'daki depo", "The repository on GitHub"],
                [
                  "Bir sonraki kayda girecek değişikliklerin seçildiği ara alan",
                  "The intermediate area where changes for the next commit are chosen",
                ],
              ],
              answer: 0,
              explain: [
                "Üç alan birbirinden ayrıdır: çalışma dizini düzenlediğin yerdir, staging seçtiğin ara alandır, depo ise kalıcı geçmiştir.",
                "The three areas are distinct: the working directory is where you edit, staging is the intermediate area you choose from, and the repository is permanent history.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Üç alan arasındaki doğru akış hangisidir?",
                "Which is the correct flow among the three areas?",
              ],
              options: [
                [
                  "Çalışma dizini → Hazırlık alanı → Depo",
                  "Working directory → Staging area → Repository",
                ],
                [
                  "Depo → Hazırlık alanı → Çalışma dizini",
                  "Repository → Staging area → Working directory",
                ],
                [
                  "Hazırlık alanı → Depo → Çalışma dizini",
                  "Staging area → Repository → Working directory",
                ],
                [
                  "Çalışma dizini → Depo → Hazırlık alanı",
                  "Working directory → Repository → Staging area",
                ],
              ],
              answer: 0,
              explain: [
                "Değişiklik önce çalışma dizininde yapılır, sonra staging'e seçilerek alınır, en sonunda commit ile depoya kalıcı olarak girer.",
                "A change is made in the working directory first, then chosen into staging, and finally enters the repository permanently via commit.",
              ],
            }),
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
            quiz({
              id: "q8",
              q: [
                "Beş dosya değiştirdin ama yalnızca ikisini bir sonraki kayda dahil etmek istiyorsun. Hangi alan bunu sağlar?",
                "You changed five files but want only two in the next commit. Which area makes that possible?",
              ],
              options: [
                ["Hazırlık alanı (staging)", "The staging area"],
                ["Çalışma dizini", "The working directory"],
                ["Depo (repository)", "The repository"],
                ["GitHub", "GitHub"],
              ],
              answer: 0,
              explain: [
                "Staging, çalışma dizinindeki değişikliklerin hangilerinin bir sonraki commit'e gireceğini seçmeni sağlayan ara alandır.",
                "Staging is the intermediate area that lets you choose which changes from the working directory go into the next commit.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Hazırlık alanı olmadan Git nasıl çalışırdı?",
                "How would Git work without a staging area?",
              ],
              options: [
                [
                  "Değiştirdiğin her şey tek commit'e girerdi, işleri ayrı kayıtlara bölemezdin",
                  "Everything you changed would go into one commit; you couldn't split work into separate commits",
                ],
                ["Hiçbir fark olmazdı", "There would be no difference at all"],
                ["Commit'ler daha hızlı olurdu", "Commits would be faster"],
                ["Git çalışmazdı", "Git wouldn't work"],
              ],
              answer: 0,
              explain: [
                "Staging olmasaydı seçici olamazdın; çalışma dizinindeki her şey tek bir kayda girerdi ve anlamlı, ayrı commit'ler yazmak zorlaşırdı.",
                "Without staging you couldn't be selective; everything in the working directory would go into one commit, making meaningful, separate commits much harder.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir ekip aynı klasörde `analiz_final_SON_erkan_düzeltme.xlsx` gibi dosyalar biriktiriyor. Git bu duruma göre en çok hangi sorunu çözer?",
                "A team keeps piling up files like `analysis_final_FINAL_erkan_fix.xlsx` in the same folder. Which problem does Git solve best here?",
              ],
              options: [
                [
                  "Hangisinin güncel ve neden değiştiğinin belirsizliğini",
                  "The ambiguity of which one is current and why it changed",
                ],
                ["Dosyaların büyüklüğünü", "The size of the files"],
                ["Excel'in yavaş açılmasını", "Excel opening slowly"],
                ["İnternet hızını", "Internet speed"],
              ],
              answer: 0,
              explain: [
                "Bu tam olarak dosya adına tarih yazmanın çözemediği dört sorundur: Git her kayda tarih, yazar, mesaj ve fark ekleyerek hepsini çözer.",
                "This is exactly the set of four problems that putting a date in a filename cannot solve; Git fixes all of them by attaching a date, author, message and diff to every commit.",
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
            quiz({
              id: "q2",
              q: [
                "`git config --global user.name` neden gereklidir?",
                "Why is `git config --global user.name` necessary?",
              ],
              options: [
                [
                  "Her commit'e kimin yaptığı bilgisi yazılsın diye",
                  "So every commit records who made it",
                ],
                ["GitHub'a giriş yapmak için", "To log into GitHub"],
                ["Deponun adını belirlemek için", "To name the repository"],
                ["İnternet bağlantısını kurmak için", "To set up the internet connection"],
              ],
              answer: 0,
              explain: [
                "Kod bloğundaki yorum açık: 'kim olduğunu söyle (her kayda yazılır)'. Bu bilgi olmadan commit'lerin yazarı belirsiz kalır.",
                "The code comment says it plainly: 'say who you are (it's written into every commit)'. Without it, a commit's author would be unknown.",
              ],
            }),
            quiz({
              id: "q3",
              q: ["`git status` komutu ne işe yarar?", "What does `git status` do?"],
              options: [
                [
                  "Hangi dosyaların değiştiğini ve hangi aşamada olduğunu gösterir",
                  "Shows which files changed and what stage they're at",
                ],
                ["Değişiklikleri kaydeder", "Records the changes"],
                ["Değişiklikleri sunucuya gönderir", "Sends changes to the server"],
                ["Yeni depo oluşturur", "Creates a new repository"],
              ],
              answer: 0,
              explain: [
                "`status` yalnızca mevcut durumu gösterir, hiçbir şeyi değiştirmez — bu yüzden en çok kullanacağın komuttur, sık sık çalıştırman güvenlidir.",
                "`status` only reports the current state and changes nothing — that is why it is the command you'll run most, safely and often.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`git add analiz.py` ile `git add .` arasındaki fark nedir?",
                "What's the difference between `git add analiz.py` and `git add .`?",
              ],
              options: [
                [
                  "Biri tek dosyayı, diğeri tüm değişiklikleri hazırlık alanına alır",
                  "One stages a single file, the other stages all changes",
                ],
                ["İkisi de aynı şeyi yapar", "They do the exact same thing"],
                ["İkincisi dosyayı siler", "The second one deletes the file"],
                ["Birincisi GitHub'a yükler", "The first one uploads to GitHub"],
              ],
              answer: 0,
              explain: [
                "Kod bloğundaki yorumlar bunu gösterir: `git add analiz.py` tek dosya, `git add .` tümü demektir.",
                "The code comments show this: `git add analiz.py` means a single file, `git add .` means everything.",
              ],
            }),
            tip(
              "İyi kayıt mesajı nasıl yazılır?",
              "How to write a good commit message",
              "Kötü mesaj: `düzeltme`, `güncelleme`, `asdf`, `çalışıyor artık`\n\nİyi mesaj: `Ciro hesabında iade edilen siparişleri hariç tut`\n\nKural: mesaj, **\"Bu kayıt uygulandığında …\"** cümlesini tamamlamalıdır. Emir kipi kullanılır (\"ekle\", \"düzelt\", \"kaldır\").\n\nNeden önemli? Altı ay sonra bir hatanın nereden geldiğini ararken `git log` çıktısını okuyacaksın. Elli tane \"güncelleme\" mesajı arasında aradığını bulmak imkânsızdır; anlamlı mesajlar ise geçmişi bir belgeye dönüştürür.\n\nUzun açıklama gerekiyorsa `-m` kullanmadan `git commit` yaz; editör açılır ve başlık + gövde yazabilirsin.",
              "Bad messages: `fix`, `update`, `asdf`, `works now`\n\nA good message: `Exclude returned orders from the revenue calculation`\n\nThe rule: the message should complete the sentence **\"When applied, this commit will …\"**. Use the imperative (\"add\", \"fix\", \"remove\").\n\nWhy does it matter? Six months from now you will read `git log` hunting for where a bug came from. Finding it among fifty \"update\" messages is impossible; meaningful messages turn the history into documentation.\n\nWhen you need a longer explanation, run `git commit` without `-m`; an editor opens and you can write a subject and a body.",
            ),
            quiz({
              id: "q5",
              q: [
                "Aşağıdakilerden hangisi iyi bir commit mesajıdır?",
                "Which of these is a good commit message?",
              ],
              options: [
                [
                  "\"Ciro hesabında iade edilen siparişleri hariç tut\"",
                  "\"Exclude returned orders from the revenue calculation\"",
                ],
                ["\"güncelleme\"", "\"update\""],
                ["\"asdf\"", "\"asdf\""],
                ["\"çalışıyor artık\"", "\"works now\""],
              ],
              answer: 0,
              explain: [
                "İyi bir mesaj neyi neden değiştirdiğini söyler. 'güncelleme' veya 'asdf' gibi mesajlar altı ay sonra hiçbir işe yaramaz.",
                "A good message says what changed and why. Messages like 'update' or 'asdf' are worthless six months later.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "İyi bir commit mesajı hangi kipte yazılır?",
                "In which grammatical mood should a good commit message be written?",
              ],
              options: [
                ["Emir kipi (\"ekle\", \"düzelt\")", "Imperative (\"add\", \"fix\")"],
                ["Soru kipi", "Interrogative"],
                ["Geçmiş zaman hikaye anlatımı", "Past-tense storytelling"],
                ["Şart kipi", "Conditional"],
              ],
              answer: 0,
              explain: [
                "Kural, mesajın 'Bu kayıt uygulandığında …' cümlesini tamamlaması gerektiğidir; bu da doğal olarak emir kipini gerektirir.",
                "The rule is that the message should complete 'When applied, this commit will …' — which naturally calls for the imperative mood.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kısa bir başlık yetmiyorsa, uzun açıklamalı bir commit mesajı nasıl yazılır?",
                "If a short title isn't enough, how do you write a commit message with a longer description?",
              ],
              options: [
                [
                  "`-m` kullanmadan `git commit` yazıp açılan editörde başlık ve gövde yazarak",
                  "Run `git commit` without `-m` and write a subject and body in the editor that opens",
                ],
                [
                  "`git commit -m` içine çok uzun bir cümle yazarak",
                  "By writing a very long sentence inside `git commit -m`",
                ],
                ["İki kere `git commit` çalıştırarak", "By running `git commit` twice"],
                ["`git log` kullanarak", "By using `git log`"],
              ],
              answer: 0,
              explain: [
                "`-m` olmadan çalıştırılan `git commit` bir editör açar; orada kısa bir başlık ve altına daha uzun bir gövde yazılabilir.",
                "Running `git commit` without `-m` opens an editor where you can write a short subject line followed by a longer body.",
              ],
            }),
            pitfall(
              "Bu dosyaları asla depoya koyma",
              "Never commit these files",
              "Bir dosya Git'e girdikten sonra geçmişten silmek **çok zordur** — sildikten sonra bile eski kayıtlarda durur. Bu yüzden en baştan `.gitignore` dosyası yaz:\n\n```\n# Gizli bilgi — en kritik olan\n.env\n*.key\ncredentials.json\n\n# Büyük veri\n*.csv\ndata/raw/\n\n# Üretilen dosyalar\n__pycache__/\n.venv/\n.Rhistory\n\n# İşletim sistemi artıkları\n.DS_Store\n```\n\nEn tehlikelisi **parolalar ve API anahtarlarıdır**. Depo herkese açık hâle gelirse anahtarın da açılır — ve bunu botlar dakikalar içinde bulur. Yanlışlıkla anahtar kaydettiysen tek doğru yol anahtarı **iptal edip yenisini almaktır**; dosyayı silmek yetmez.",
              "Once a file enters Git it is **very hard** to remove from history — it stays in the old commits even after deletion. So write a `.gitignore` from the start:\n\n```\n# Secrets — the critical one\n.env\n*.key\ncredentials.json\n\n# Large data\n*.csv\ndata/raw/\n\n# Generated files\n__pycache__/\n.venv/\n.Rhistory\n\n# OS debris\n.DS_Store\n```\n\nThe most dangerous are **passwords and API keys**. If the repository ever becomes public, so does your key — and bots find it within minutes. If you committed a key by accident, the only correct response is to **revoke it and issue a new one**; deleting the file is not enough.",
            ),
            quiz({
              id: "q8",
              q: [
                ".gitignore dosyasına aşağıdakilerden hangisi genellikle EKLENMEZ?",
                "Which of the following would you usually NOT add to .gitignore?",
              ],
              options: [
                ["Proje kaynak kodu (`analiz.py` gibi)", "Project source code (like `analiz.py`)"],
                ["`.env`", "`.env`"],
                ["`__pycache__/`", "`__pycache__/`"],
                ["`.DS_Store`", "`.DS_Store`"],
              ],
              answer: 0,
              explain: [
                ".gitignore, gizli bilgi, büyük veri, üretilen dosyalar ve işletim sistemi artıkları içindir. Kaynak kodu ise tam tersine Git'te tutmak istediğin şeydir.",
                ".gitignore is for secrets, large data, generated files and OS debris. Source code is the opposite — it's exactly what you want Git to track.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir dosya bir kez commit'lendikten sonra .gitignore'a eklenirse ne olur?",
                "If a file is added to .gitignore after it has already been committed once, what happens?",
              ],
              options: [
                [
                  "Geçmiş kayıtlardan silinmez, hâlâ oradadır",
                  "It is not removed from past commits — it's still there",
                ],
                ["Otomatik olarak geçmişten de silinir", "It is automatically removed from history too"],
                ["Depo bozulur", "The repository breaks"],
                [
                  "Hiçbir şey olmaz, dosya hiç var olmamış gibi olur",
                  "Nothing happens, it's as if the file never existed",
                ],
              ],
              answer: 0,
              explain: [
                "Bir dosya Git'e girdikten sonra geçmişten silmek çok zordur — sildikten sonra bile eski kayıtlarda durur. .gitignore yalnızca bundan sonrasını etkiler.",
                "Once a file enters Git it is very hard to remove from history — it stays in old commits even after deletion. .gitignore only affects what happens from now on.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "En tehlikeli dosya türü hangisidir ve neden?",
                "Which type of file is most dangerous to commit, and why?",
              ],
              options: [
                [
                  "Parolalar ve API anahtarları — depo açık hâle gelirse botlar dakikalar içinde bulur",
                  "Passwords and API keys — if the repo becomes public, bots find them within minutes",
                ],
                ["CSV dosyaları — çok yer kaplar", "CSV files — they take up space"],
                ["`.DS_Store` — Mac'e özeldir", "`.DS_Store` — it's Mac-specific"],
                ["`__pycache__` — Python'a özeldir", "`__pycache__` — it's Python-specific"],
              ],
              answer: 0,
              explain: [
                "Parolalar ve API anahtarları en tehlikeli olandır çünkü depo herkese açık hâle gelirse anahtar da açığa çıkar ve bunu botlar dakikalar içinde bulur.",
                "Passwords and API keys are the most dangerous because if the repository becomes public, so does the key — and bots find it within minutes.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "`git restore analiz.py` çalıştırdığında ne olur?",
                "What happens when you run `git restore analiz.py`?",
              ],
              options: [
                [
                  "Henüz kaydedilmemiş değişiklikler geri alınır ve GERİ GELMEZ",
                  "Uncommitted changes are discarded and CANNOT be recovered",
                ],
                ["Dosya hazırlık alanından çıkar", "The file is removed from staging"],
                ["Son commit mesajı değişir", "The last commit's message changes"],
                ["Yeni bir commit oluşur", "A new commit is created"],
              ],
              answer: 0,
              explain: [
                "Kod bloğundaki uyarı açık: bu, henüz kaydetmediğin değişikliği atar ve DİKKAT, geri gelmez.",
                "The code's warning is explicit: this discards changes you haven't committed yet, and it CANNOT be undone.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`git restore --staged analiz.py` ne yapar?",
                "What does `git restore --staged analiz.py` do?",
              ],
              options: [
                [
                  "Dosyayı hazırlık alanından çıkarır ama değişiklikleri çalışma dizininde bırakır",
                  "Removes the file from staging but leaves the changes in the working directory",
                ],
                ["Dosyanın tüm değişikliklerini siler", "Deletes all changes to the file"],
                ["Dosyayı GitHub'a gönderir", "Pushes the file to GitHub"],
                ["Son commit'i geri alır", "Undoes the last commit"],
              ],
              answer: 0,
              explain: [
                "`--staged` yalnızca hazırlık alanından çıkarır, değişikliği silmez — bu, üstündeki plain `restore` komutundan farkıdır.",
                "`--staged` only unstages the file; it doesn't discard the change — that's what distinguishes it from plain `restore` above it.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`git commit --amend` ne için kullanılır?",
                "What is `git commit --amend` used for?",
              ],
              options: [
                [
                  "Son kaydın mesajını düzeltmek veya unutulan bir dosyayı eklemek",
                  "Fixing the last commit's message or adding a forgotten file",
                ],
                ["Beş commit öncesine dönmek", "Going back five commits"],
                ["Bir dalı silmek", "Deleting a branch"],
                ["Uzak depoya bağlanmak", "Connecting to a remote repository"],
              ],
              answer: 0,
              explain: [
                "`--amend`, yalnızca en son kaydı düzeltir: mesajı değiştirebilir ya da unutulan bir dosyayı ekleyip aynı kayda dahil edebilirsin.",
                "`--amend` only touches the most recent commit: you can fix its message or fold in a forgotten file.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "`git reset --soft HEAD~1` ile `git reset --hard HEAD~1` arasındaki fark nedir?",
                "What's the difference between `git reset --soft HEAD~1` and `git reset --hard HEAD~1`?",
              ],
              options: [
                [
                  "`--soft` değişiklikleri hazırlık alanında bırakır, `--hard` değişiklikleri de siler",
                  "`--soft` keeps the changes staged, `--hard` deletes the changes too",
                ],
                ["İkisi de aynı şeyi yapar", "They do exactly the same thing"],
                ["`--hard` daha güvenlidir", "`--hard` is safer"],
                ["`--soft` uzak depoyu değiştirir", "`--soft` changes the remote repository"],
              ],
              answer: 0,
              explain: [
                "Kod yorumları farkı gösterir: `--soft` kaydı geri alır ama değişiklikler hazırlıkta kalır; `--hard` kaydı ve değişiklikleri siler.",
                "The code comments show the difference: `--soft` undoes the commit but keeps changes staged; `--hard` deletes the commit and the changes.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Neden `git reset --hard` \"TEHLİKELİ\" olarak işaretlenmiştir?",
                "Why is `git reset --hard` marked as \"DANGEROUS\"?",
              ],
              options: [
                [
                  "Kaydı ve o kayıttaki değişiklikleri kalıcı olarak siler",
                  "It permanently deletes the commit and its changes",
                ],
                ["Yavaş çalışır", "It runs slowly"],
                ["İnternet gerektirir", "It requires internet access"],
                ["Yalnızca Windows'ta çalışır", "It only works on Windows"],
              ],
              answer: 0,
              explain: [
                "`--hard`, `--soft`'un aksine değişiklikleri hazırlıkta bırakmaz; hem kaydı hem çalışma dizinindeki değişiklikleri kalıcı olarak siler.",
                "Unlike `--soft`, `--hard` doesn't leave changes staged — it permanently deletes both the commit and the working-directory changes.",
              ],
            }),
            quiz({
              id: "q7",
              q: ["`git reflog` ne işe yarar?", "What is `git reflog` for?"],
              options: [
                [
                  "Tüm hareketlerin kaydını gösterir; buradan herhangi bir ana dönülebilir",
                  "Shows a log of every action taken; you can return to any point from here",
                ],
                ["Uzak depodaki dalları listeler", "Lists branches on the remote repository"],
                ["Dosya farklarını gösterir", "Shows file diffs"],
                ["Yeni bir depo oluşturur", "Creates a new repository"],
              ],
              answer: 0,
              explain: [
                "`reflog` bu listedeki son güvenlik ağıdır: her şeyi berbat ettiysen bile buradan herhangi bir ana dönebilirsin.",
                "`reflog` is the safety net at the end of this list: even if you've made a mess, you can return to any point from here.",
              ],
            }),
            info(
              "revert mi reset mi?",
              "revert or reset?",
              "Ayrım basittir ve tek bir soruya bağlıdır: **bu kaydı başkasıyla paylaştın mı?**\n\n**Paylaştıysan (push ettiysen) → `git revert`.** Eski kaydı silmez; onun etkisini ortadan kaldıran **yeni** bir kayıt ekler. Geçmiş korunur, kimsenin deposu bozulmaz.\n\n**Paylaşmadıysan → `git reset` kullanabilirsin.** Geçmişi gerçekten değiştirir ve yerelde temiz bir tarihçe bırakır.\n\nPaylaşılan bir dalda `reset` yapıp zorla göndermek, ekip arkadaşlarının deposunu bozar ve Git'te yapılabilecek en can sıkıcı hatalardan biridir.",
              "The distinction is simple and rests on one question: **have you shared this commit with anyone?**\n\n**If you have pushed it → `git revert`.** It does not delete the old commit; it adds a **new** one that undoes its effect. History is preserved and nobody's clone breaks.\n\n**If you have not → you may use `git reset`.** It genuinely rewrites history and leaves a clean local timeline.\n\nRunning `reset` on a shared branch and force-pushing corrupts your teammates' repositories, and is one of the most irritating mistakes possible in Git.",
            ),
            quiz({
              id: "q8",
              q: [
                "revert ile reset arasında hangi soru belirleyicidir?",
                "Which question decides between revert and reset?",
              ],
              options: [
                [
                  "Bu kaydı başkasıyla paylaştın mı (push ettin mi)?",
                  "Have you shared this commit with anyone (pushed it)?",
                ],
                ["Kayıt kaç satır değiştirdi?", "How many lines did the commit change?"],
                ["Kayıt ne kadar eski?", "How old is the commit?"],
                ["Dal adı ne?", "What is the branch name?"],
              ],
              answer: 0,
              explain: [
                "Ayrım tek bir soruya dayanır: paylaştıysan `revert` kullan, çünkü geçmişi değiştirmez. Paylaşmadıysan `reset` de kullanabilirsin.",
                "The distinction rests on one question: if you've shared it, use `revert` because it doesn't rewrite history. If not, `reset` is also fine.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Paylaşılmış (push edilmiş) bir dalda `reset` yapıp zorla göndermenin sonucu ne olur?",
                "What happens if you `reset` a shared (pushed) branch and force-push it?",
              ],
              options: [
                ["Ekip arkadaşlarının deposu bozulur", "Your teammates' repositories break"],
                ["Hiçbir sorun çıkmaz", "Nothing goes wrong"],
                ["GitHub otomatik olarak engeller", "GitHub blocks it automatically"],
                ["Sadece kendi deponuz etkilenir", "Only your own repository is affected"],
              ],
              answer: 0,
              explain: [
                "Ekip arkadaşlarının klonu, sildiğin kayda dayanır. Zorla gönderim onların geçmişiyle senin geçmişini uyuşmaz hâle getirir ve depolarını bozar.",
                "Your teammates' clones are built on the commit you deleted. Force-pushing makes their history diverge from yours and corrupts their repository.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "`git revert`, eski kaydı nasıl geri alır?",
                "How does `git revert` undo an old commit?",
              ],
              options: [
                [
                  "Eski kaydı silmez; etkisini ortadan kaldıran yeni bir kayıt ekler",
                  "It doesn't delete the old commit; it adds a new one that undoes its effect",
                ],
                ["Eski kaydı geçmişten tamamen siler", "It completely erases the old commit from history"],
                ["Dalı yeniden adlandırır", "It renames the branch"],
                ["Uzak depoyu sıfırlar", "It resets the remote repository"],
              ],
              answer: 0,
              explain: [
                "`revert` geçmişe dokunmaz; sadece ileriye doğru, etkiyi tersine çeviren yeni bir kayıt ekler. Bu yüzden paylaşılan dallarda güvenlidir.",
                "`revert` never touches history; it only adds a new forward commit that reverses the effect. That's what makes it safe on shared branches.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Git'te bir dosya değişikliği hangi sırayla ilerler?",
                "In what order does a file change progress in Git?",
              ],
              options: [
                ["Çalışma dizini → staging → depo", "Working directory → staging → repository"],
                ["Depo → staging → çalışma dizini", "Repository → staging → working directory"],
                ["Staging → çalışma dizini → depo", "Staging → working directory → repository"],
                ["Depo → çalışma dizini → staging", "Repository → working directory → staging"],
              ],
              answer: 0,
              explain: [
                "Düzenlediğin dosyalar çalışma dizinindedir, seçtiklerin staging'e girer, commit ile depoya kalıcı olarak geçer.",
                "Files you edit live in the working directory, the ones you choose go into staging, and a commit moves them permanently into the repository.",
              ],
            }),
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
            quiz({
              id: "q3",
              q: [
                "`git remote add origin <adres>` ne yapar?",
                "What does `git remote add origin <address>` do?",
              ],
              options: [
                [
                  "Yerel depoyu uzaktaki (GitHub'daki) bir depoya bağlar",
                  "Links the local repository to a remote one (on GitHub)",
                ],
                ["Yeni bir dal oluşturur", "Creates a new branch"],
                ["Dosyaları hazırlık alanına alır", "Stages files"],
                ["Commit mesajını değiştirir", "Changes the commit message"],
              ],
              answer: 0,
              explain: [
                "Bu komut ilk kez çalıştırıldığında yerel depoya, `push` yaparken hedef alacağı uzak depronun adresini tanıtır.",
                "This command, run once, tells the local repository the address of the remote it will push to.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`git push -u origin main` içindeki `-u` bayrağı ne işe yarar?",
                "What does the `-u` flag do in `git push -u origin main`?",
              ],
              options: [
                [
                  "Yerel dalı uzak dala bağlar, sonraki push'larda hedef belirtmene gerek kalmaz",
                  "Links the local branch to the remote branch, so future pushes don't need the target specified",
                ],
                ["Depoyu siler", "Deletes the repository"],
                ["Kullanıcı adını değiştirir", "Changes the username"],
                ["Dosyaları sıkıştırır", "Compresses the files"],
              ],
              answer: 0,
              explain: [
                "`-u` bir kez kullanılır; ardından yalnızca `git push` yazman yeterli olur çünkü Git hangi uzak dala göndereceğini hatırlar.",
                "`-u` is used once; afterward, plain `git push` is enough because Git remembers which remote branch to send to.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`git branch -M main` komutu ne yapar?",
                "What does the `git branch -M main` command do?",
              ],
              options: [
                [
                  "Mevcut dalın adını `main` olarak değiştirir/zorlar",
                  "Renames/forces the current branch to be named `main`",
                ],
                ["Yeni bir dal oluşturur ve siler", "Creates and deletes a new branch"],
                ["Uzak depoyu siler", "Deletes the remote repository"],
                ["Commit geçmişini temizler", "Clears the commit history"],
              ],
              answer: 0,
              explain: [
                "Kod bloğunda `push` yapmadan hemen önce çalışır: dalın `main` adını almasını sağlayıp GitHub'a öyle gönderir.",
                "It runs right before `push` in the code block: it makes sure the branch is named `main` before pushing it to GitHub.",
              ],
            }),
            info(
              "İyi commit mesajı nasıl yazılır?",
              "How to write a good commit message",
              "Mesajı **emir kipiyle** ve **neyi neden** değiştirdiğini söyleyecek şekilde yaz: `\"Aykırı değer filtresini IQR yöntemine çevir\"`. `\"güncelleme\"`, `\"düzeltme\"`, `\"asdf\"` gibi mesajlar altı ay sonra hiçbir işe yaramaz. İyi bir geçmiş, projenin ikinci dokümantasyonudur.",
              "Write in the **imperative** and say **what** changed and **why**: `\"Switch outlier filter to the IQR method\"`. Messages like `\"update\"`, `\"fix\"` or `\"asdf\"` are worthless six months later. A good history is your project's second documentation.",
            ),
            quiz({
              id: "q5",
              q: [
                "İyi bir commit mesajı hangi ikisini anlatmalıdır?",
                "A good commit message should convey which two things?",
              ],
              options: [
                ["Neyin ve neden değiştiğini", "What changed and why"],
                ["Kim yazdığını ve ne zaman yazdığını", "Who wrote it and when"],
                ["Dosya boyutunu ve türünü", "File size and type"],
                ["Kaç satır değiştiğini", "How many lines changed"],
              ],
              answer: 0,
              explain: [
                "Mesaj, emir kipiyle ve neyi neden değiştirdiğini söyleyecek şekilde yazılır — kim/ne zaman zaten commit'in kendisinde saklıdır.",
                "The message should be imperative and state what changed and why — who/when is already stored by the commit itself.",
              ],
            }),
            pitfall(
              "Veri ve gizli anahtarları asla commit'leme",
              "Never commit data or secrets",
              "Bir kez commit'lenen dosya geçmişte kalır; sonradan silmek yetmez. `.gitignore` dosyasını **ilk iş** olarak oluştur: `*.csv`, `*.xlsx`, `.env`, `data/`, `__pycache__/`, `.ipynb_checkpoints/`. Veritabanı şifresi veya API anahtarı GitHub'a çıktıysa doğru refleks, o anahtarı **iptal etmektir** — depoyu temizlemek değil.",
              "Once a file is committed it lives in history; deleting it later is not enough. Create `.gitignore` **first thing**: `*.csv`, `*.xlsx`, `.env`, `data/`, `__pycache__/`, `.ipynb_checkpoints/`. If a database password or API key reaches GitHub, the correct reflex is to **revoke that key**, not to clean the repo.",
            ),
            quiz({
              id: "q6",
              q: [
                "Bu derse göre .gitignore dosyasını ne zaman oluşturmalısın?",
                "According to this lesson, when should you create .gitignore?",
              ],
              options: [
                ["İlk iş olarak, proje başlar başlamaz", "As the very first thing, right when the project starts"],
                ["Proje bittikten sonra", "After the project is finished"],
                ["Sadece hata çıkarsa", "Only if a problem occurs"],
                ["GitHub'a yüklerken", "While uploading to GitHub"],
              ],
              answer: 0,
              explain: [
                "Metin açık: '.gitignore dosyasını ilk iş olarak oluştur.' Sonradan eklemek, o ana kadar commit'lenmiş dosyaları kurtarmaz.",
                "The text is explicit: create `.gitignore` first thing. Adding it later doesn't rescue files already committed by then.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "API anahtarı GitHub'a çıktıysa doğru refleks nedir?",
                "If an API key leaks to GitHub, what is the correct reflex?",
              ],
              options: [
                ["Anahtarı iptal etmek", "Revoke the key"],
                ["Depoyu silmek", "Delete the repository"],
                ["Sadece dosyayı silmek", "Just delete the file"],
                ["Beklemek", "Wait"],
              ],
              answer: 0,
              explain: [
                "Doğru refleks, o anahtarı iptal etmektir — depoyu temizlemek değil. Dosyayı silmek anahtarı geçmişten çıkarmaz.",
                "The correct reflex is to revoke that key, not to clean the repo. Deleting the file doesn't remove the key from history.",
              ],
            }),
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
              id: "q8",
              q: [
                "Yayınlama sırasında README.md'yi ne zaman yazmak mantıklıdır?",
                "In the publishing sequence, when does it make sense to write README.md?",
              ],
              options: [
                [
                  ".gitignore ve init'ten sonra, ilk commit'ten önce",
                  "After .gitignore and init, before the first commit",
                ],
                [
                  "GitHub'a push ettikten sonra hiç yazmadan",
                  "Never — after pushing to GitHub",
                ],
                ["Sadece proje bitince", "Only once the project is finished"],
                [
                  "İlk commit'ten sonra asla değiştirmeden",
                  "After the first commit, and never touched again",
                ],
              ],
              answer: 0,
              explain: [
                "Sıradaki adımlara bak: .gitignore, init, README, sonra add & commit. README ilk commit'e girsin diye ondan önce yazılır.",
                "Look at the sequence: .gitignore, init, README, then add & commit. README is written before the first commit so it's included in it.",
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
            quiz({
              id: "q2",
              q: ["Bir dal (branch) nedir?", "What is a branch?"],
              options: [
                [
                  "Ana çizgiden ayrılan paralel bir çalışma hattı",
                  "A parallel line of work split off from the main line",
                ],
                ["Bir commit'in yedeği", "A backup of a commit"],
                ["GitHub'daki bir depo", "A repository on GitHub"],
                ["Bir .gitignore kuralı", "A .gitignore rule"],
              ],
              answer: 0,
              explain: [
                "Dal, ana çizgiden ayrılan ve kendi kaydını tutan paralel bir çalışma hattıdır; ana dalı etkilemeden ilerlemeni sağlar.",
                "A branch is a parallel line of work with its own history, split off from the main line, letting you progress without affecting it.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Yeni bir özellik üzerinde çalışırken neden ayrı bir dal açılır?",
                "Why do you open a separate branch when working on a new feature?",
              ],
              options: [
                [
                  "`main` her zaman çalışır durumda kalsın diye",
                  "So that `main` always stays in a working state",
                ],
                ["Daha hızlı commit atmak için", "To commit faster"],
                ["Disk alanı kazanmak için", "To save disk space"],
                [
                  "GitHub'ın zorunlu kıldığı bir kural olduğu için",
                  "Because GitHub requires it",
                ],
              ],
              answer: 0,
              explain: [
                "`main`'in her zaman çalışır durumda kalması gerekir; riskli veya yarım kalmış işler bu yüzden ayrı bir dala taşınır.",
                "`main` needs to stay in a working state at all times; risky or unfinished work is therefore kept off on its own branch.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "`git switch -c feature/kohort-analizi` komutu ne yapar?",
                "What does `git switch -c feature/kohort-analizi` do?",
              ],
              options: [
                [
                  "Yeni bir dal oluşturur ve o dala geçer",
                  "Creates a new branch and switches to it",
                ],
                ["Yalnızca mevcut bir dala geçer", "Only switches to an existing branch"],
                ["Dalı siler", "Deletes the branch"],
                ["Dalı GitHub'a gönderir", "Pushes the branch to GitHub"],
              ],
              answer: 0,
              explain: [
                "`-c` bayrağı 'create' anlamına gelir: kod yorumunda da yazdığı gibi dal oluşturur ve hemen ona geçer.",
                "The `-c` flag means 'create': as the code comment notes, it creates the branch and switches to it right away.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Birleştirilen bir dalı `git branch -d feature/kohort-analizi` ile silmenin amacı nedir?",
                "What's the point of deleting a merged branch with `git branch -d feature/kohort-analizi`?",
              ],
              options: [
                [
                  "İşi biten dalları temizleyip depo tarihçesini düzenli tutmak",
                  "Cleaning up finished branches to keep the repo tidy",
                ],
                ["Commit geçmişini silmek", "Deleting commit history"],
                ["GitHub deposunu silmek", "Deleting the GitHub repository"],
                ["main dalını yeniden adlandırmak", "Renaming the main branch"],
              ],
              answer: 0,
              explain: [
                "Dal zaten main'e birleşti, içeriği kayıtlıdır. Dalı silmek yalnızca artık gereksiz olan işaretçiyi kaldırır, commit'leri değil.",
                "The branch has already merged into main, so its content is preserved. Deleting it only removes the now-unneeded pointer, not the commits.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir dosyada çatışma çıktığında `<<<<<<<`, `=======`, `>>>>>>>` işaretleri ne anlama gelir?",
                "When a file has a conflict, what do the `<<<<<<<`, `=======`, `>>>>>>>` markers mean?",
              ],
              options: [
                [
                  "İki taraftaki çakışan değişiklikleri birbirinden ayırırlar; doğru hâl elle seçilir",
                  "They separate the conflicting changes from each side; you manually pick the correct version",
                ],
                ["Dosyanın bozuk olduğunu gösterirler", "They indicate the file is corrupted"],
                [
                  "Git'in otomatik olarak sildiği satırlardır",
                  "Lines Git automatically deletes",
                ],
                ["Yorum satırlarıdır", "They are comment lines"],
              ],
              answer: 0,
              explain: [
                "Kod yorumu bunu anlatır: dosyayı açıp işaretleri temizleyip doğru hâli bırakman gerekir — Git hangisinin doğru olduğuna karar veremez.",
                "The code comment says exactly this: open the file, clear the markers and keep the correct version — Git cannot decide which side is right.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Çatışmayı elle çözdükten sonra hangi adımlar gelir?",
                "After manually resolving a conflict, which steps come next?",
              ],
              options: [
                [
                  "`git add` ile dosyayı işaretle, sonra `git commit`",
                  "Mark the file with `git add`, then `git commit`",
                ],
                ["Doğrudan `git push`", "Directly `git push`"],
                ["`git init` ile yeniden başlat", "Restart with `git init`"],
                ["Hiçbir şey, otomatik biter", "Nothing, it finishes automatically"],
              ],
              answer: 0,
              explain: [
                "Kod bloğunun son iki satırı bunu gösterir: çözülen dosya `add` ile işaretlenir, sonra birleştirme `commit` ile tamamlanır.",
                "The last two lines of the code block show this: the resolved file is staged with `add`, then the merge is completed with `commit`.",
              ],
            }),
            text(
              "**Pull request (PR)**, \"şu değişikliği ana dala almak istiyorum\" demenin yoludur. Değeri sadece birleştirme değil, **inceleme**dir: başka biri kodunu okur, soru sorar, hata yakalar. Tek kişilik projelerde bile PR açmak, değişikliğin özetini yazmaya zorladığı için işe yarar.",
              "A **pull request (PR)** is how you say \"I would like this merged into main\". Its value is not the merge but the **review**: someone else reads your code, asks questions, catches mistakes. Even on a solo project, opening a PR is useful because it forces you to summarise the change.",
            ),
            quiz({
              id: "q8",
              q: [
                "Metne göre pull request'in asıl değeri nedir?",
                "According to the text, what is the real value of a pull request?",
              ],
              options: [
                [
                  "İnceleme — başkasının kodu okuyup soru sorması, hata yakalaması",
                  "Review — someone else reading the code, asking questions, catching mistakes",
                ],
                [
                  "Sadece birleştirme işlemini otomatikleştirmesi",
                  "Just automating the merge",
                ],
                ["Dosyaları yedeklemesi", "Backing up files"],
                ["Kod hızını artırması", "Making the code run faster"],
              ],
              answer: 0,
              explain: [
                "Metin açık: 'Değeri sadece birleştirme değil, incelemedir.' PR'ın asıl işi bir başkasının gözünden geçirilmesidir.",
                "The text is explicit: 'Its value is not the merge but the review.' A PR's real job is getting a second pair of eyes on the code.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Tek kişilik bir projede bile PR açmak neden faydalıdır?",
                "Why is opening a PR useful even on a solo project?",
              ],
              options: [
                [
                  "Değişikliğin özetini yazmaya zorladığı için",
                  "Because it forces you to summarize the change",
                ],
                ["Zorunlu olduğu için", "Because it's mandatory"],
                ["Daha hızlı commit sağladığı için", "Because it makes commits faster"],
                ["Depoyu küçülttüğü için", "Because it shrinks the repository"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Tek kişilik projelerde bile PR açmak, değişikliğin özetini yazmaya zorladığı için işe yarar.'",
                "The text: 'Even on a solo project, opening a PR is useful because it forces you to summarise the change.'",
              ],
            }),
            tip(
              "Jupyter not defterleri ve Git",
              "Jupyter notebooks and Git",
              "`.ipynb` dosyaları JSON'dur ve çıktı hücrelerini de içerir; bu yüzden Git'te korkunç `diff`'ler üretir. Commit etmeden önce `Kernel → Restart & Clear Output` yap ya da `nbstripout` aracını kur — depo hem küçülür hem incelenebilir hale gelir.",
              "`.ipynb` files are JSON and include output cells, which produces terrible diffs in Git. Run `Kernel → Restart & Clear Output` before committing, or install `nbstripout` — the repo gets smaller and reviewable at the same time.",
            ),
            quiz({
              id: "q10",
              q: [
                ".ipynb dosyaları Git'te neden kötü `diff`'ler üretir?",
                "Why do .ipynb files produce ugly diffs in Git?",
              ],
              options: [
                [
                  "JSON formatındadırlar ve çıktı hücrelerini de içerirler",
                  "They are JSON and include output cells too",
                ],
                ["Çok küçük dosyalardır", "They are very small files"],
                ["Git notebook'ları desteklemez", "Git doesn't support notebooks"],
                ["Şifrelidirler", "They are encrypted"],
              ],
              answer: 0,
              explain: [
                "Çıktı hücreleri her çalıştırmada değişebilir ve JSON içinde büyük yer kaplar; bu yüzden `Restart & Clear Output` veya `nbstripout` önerilir.",
                "Output cells can change on every run and take up a lot of space inside the JSON, which is why `Restart & Clear Output` or `nbstripout` is recommended.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "README'de 'Bulgular' bölümü nasıl yazılmalıdır?",
                "How should the 'Findings' section of a README be written?",
              ],
              options: [
                ["3-5 madde hâlinde, sayıyla", "As 3-5 bullets, with numbers"],
                ["Tek uzun paragraf hâlinde", "As one long paragraph"],
                ["Yalnızca grafik olarak, yazı olmadan", "Only as a chart, without text"],
                ["Kod bloğu içinde", "Inside a code block"],
              ],
              answer: 0,
              explain: [
                "Liste maddesi açıkça belirtir: 'Bulgular — 3–5 madde hâlinde, sayıyla.' Sayılarla desteklenen kısa maddeler hızla taranabilir.",
                "The list item states it plainly: 'Findings — 3–5 bullets, with numbers.' Short, numbered bullets are quick to scan.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "En sık yapılan README hatası nedir?",
                "What is the most common README mistake?",
              ],
              options: [
                ["Teknik detayla başlamak", "Starting with technical detail"],
                ["Çok kısa olması", "Being too short"],
                ["Görsel içermemesi", "Not including any images"],
                ["İngilizce yazılması", "Being written in English"],
              ],
              answer: 0,
              explain: [
                "Metin: 'En sık yapılan hata teknik detayla başlamaktır. Okuyan kişi önce ne bulduğunu merak eder, nasıl bulduğunu sonra.'",
                "The text: 'The most common mistake is opening with technical detail. The reader wants to know what you found first, and how second.'",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "README'de 'Veri' bölümünde ne belirtilmelidir?",
                "What should the 'Data' section of a README specify?",
              ],
              options: [
                ["Kaynağı, boyutu, dönemi", "Its source, size, and period"],
                ["Kullanılan renk paleti", "The color palette used"],
                ["Yazarın özgeçmişi", "The author's résumé"],
                ["Lisans anlaşması", "The license agreement"],
              ],
              answer: 0,
              explain: [
                "Sıradaki 4. madde bunu söyler: 'Veri — kaynağı, boyutu, dönemi.' Okuyucu verinin nereden geldiğini ve ne kadar güvenilir olduğunu merak eder.",
                "List item 4 says this: 'Data — source, size, period.' The reader wants to know where the data came from and how reliable it is.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Örnek klasör yapısına göre `data/raw/` genellikle ne durumdadır?",
                "According to the example folder structure, what's typically true of `data/raw/`?",
              ],
              options: [
                [
                  "Genelde .gitignore'dadır, commit'lenmez",
                  "It's usually in .gitignore and not committed",
                ],
                [
                  "En üstte README ile birlikte durur",
                  "It sits at the top alongside README",
                ],
                ["GitHub Actions tarafından silinir", "GitHub Actions deletes it"],
                ["Her zaman boş kalır", "It always stays empty"],
              ],
              answer: 0,
              explain: [
                "Klasör ağacındaki yorum bunu söyler: '# ham veri (genelde .gitignore'da)'. İşlenmiş küçük örnek ise commit'lenebilir.",
                "The comment in the folder tree says this: '# raw data (usually in .gitignore)'. The small processed sample can be committed instead.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`notebooks/01_kesif.ipynb` gibi bir adlandırma neden tercih edilir?",
                "Why is a naming pattern like `notebooks/01_kesif.ipynb` preferred?",
              ],
              options: [
                [
                  "Numaralı ve sıralı olduğu için analiz akışını takip etmek kolaylaşır",
                  "Being numbered and ordered makes the analysis flow easy to follow",
                ],
                ["Dosya boyutunu küçülttüğü için", "Because it shrinks the file size"],
                [
                  "Git'in zorunlu kıldığı bir format olduğu için",
                  "Because Git requires this format",
                ],
                [
                  "Rastgele bir gelenek, hiçbir faydası yok",
                  "It's just a random convention with no benefit",
                ],
              ],
              answer: 0,
              explain: [
                "Klasör ağacındaki yorum: '# numaralı, sıralı'. Bu, birden çok defter olduğunda hangisinin önce geldiğini belli eder.",
                "The comment in the folder tree: '# numbered, ordered'. This makes it clear which notebook comes first when there are several.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "Verilen `.github/workflows/test.yml` dosyasına göre iş akışı ne zaman tetiklenir?",
                "According to the given `.github/workflows/test.yml`, when is the workflow triggered?",
              ],
              options: [
                ["Her push ve pull request'te", "On every push and pull request"],
                ["Yalnızca haftada bir", "Only once a week"],
                ["Yalnızca elle başlatıldığında", "Only when manually triggered"],
                ["Yalnızca `main` silindiğinde", "Only when `main` is deleted"],
              ],
              answer: 0,
              explain: [
                "Yaml dosyasındaki `on: [push, pull_request]` satırı, iş akışının her push ve her PR'da çalışacağını belirtir.",
                "The `on: [push, pull_request]` line in the yaml means the workflow runs on every push and every PR.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Örnek iş akışında testler hangi komutla çalıştırılıyor?",
                "In the example workflow, which command runs the tests?",
              ],
              options: [
                ["`python -m pytest -q`", "`python -m pytest -q`"],
                ["`npm test`", "`npm test`"],
                ["`git test`", "`git test`"],
                ["`make check`", "`make check`"],
              ],
              answer: 0,
              explain: [
                "Yaml'ın son adımı `run: python -m pytest -q` komutunu çalıştırır — bağımlılıklar kurulduktan sonraki adım.",
                "The yaml's final step runs `python -m pytest -q` — the step after dependencies are installed.",
              ],
            }),
            tip(
              "Yeşil kare takıntısına kapılma",
              "Do not chase the green squares",
              "GitHub'ın katkı grafiği güzel görünür ama kimse \"kaç gün üst üste commit atmış\" diye bakmaz. Beş iyi anlatılmış proje, elli yarım kalmış depodan kıyaslanamayacak kadar değerlidir. Depolarını sabitlemeyi (pin) unutma — profil sayfanda en iyi altı projeni sen seçersin.",
              "GitHub's contribution graph looks nice, but nobody hires on \"days in a row\". Five well-documented projects beat fifty abandoned repos by a wide margin. And remember to pin them — your profile lets you choose the six projects people see first.",
            ),
            quiz({
              id: "q9",
              q: [
                "Metne göre işe alım açısından ne daha değerlidir?",
                "According to the text, which is more valuable when it comes to hiring?",
              ],
              options: [
                ["Beş iyi anlatılmış proje", "Five well-documented projects"],
                ["Elli yarım kalmış depo", "Fifty abandoned repositories"],
                [
                  "Yüksek katkı grafiği (contribution graph)",
                  "A high contribution graph",
                ],
                ["Üst üste commit atma serisi", "A long streak of consecutive commits"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Beş iyi anlatılmış proje, elli yarım kalmış depodan kıyaslanamayacak kadar değerlidir.'",
                "The text: 'Five well-documented projects beat fifty abandoned repos by a wide margin.'",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "GitHub profilinde depoları 'sabitlemek' (pin) ne işe yarar?",
                "What is the point of 'pinning' repositories on a GitHub profile?",
              ],
              options: [
                [
                  "En iyi altı projeni profilinin en üstünde seçip göstermeni sağlar",
                  "Lets you choose and show your best six projects at the top of your profile",
                ],
                ["Depoyu siler", "Deletes the repository"],
                ["Otomatik test ekler", "Adds automated tests"],
                ["Commit geçmişini gizler", "Hides the commit history"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Depolarını sabitlemeyi unutma — profil sayfanda en iyi altı projeni sen seçersin.'",
                "The text: 'remember to pin them — your profile lets you choose the six projects people see first.'",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "GitHub Flow modelinde bir dal işi bitince ne olur?",
                "In the GitHub Flow model, what happens to a branch once its work is done?",
              ],
              options: [
                [
                  "İnceleme sonrası main'e birleşir ve silinir",
                  "It merges into main after review and gets deleted",
                ],
                ["Sonsuza kadar açık kalır", "It stays open forever"],
                ["develop dalına birleşir", "It merges into a develop branch"],
                ["Yeni bir sürüm numarası alır", "It gets a new version number"],
              ],
              answer: 0,
              explain: [
                "GitHub Flow'da dal, inceleme sonrası main'e birleşir ve silinir — Git Flow'daki gibi ayrı bir develop dalı yoktur.",
                "In GitHub Flow, the branch merges into main after review and is deleted — there is no separate develop branch like in Git Flow.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Git Flow modeli hangi tür projeler için tasarlanmıştır?",
                "What kind of projects was the Git Flow model designed for?",
              ],
              options: [
                [
                  "Sürüm numarası olan, uzun destek dönemli ürünler",
                  "Versioned products with long support windows",
                ],
                ["Tek kişilik küçük scriptler", "Small solo scripts"],
                ["Veri analiz projeleri", "Data analysis projects"],
                ["Statik web siteleri", "Static websites"],
              ],
              answer: 0,
              explain: [
                "Metin: Git Flow 'sürüm numarası olan, uzun destek dönemli ürünler için tasarlandı' ve sürekli yayın yapan ekipler için gereksiz ağırdır.",
                "The text says Git Flow was 'designed for versioned products with long support windows' and is unnecessarily heavy for continuously-releasing teams.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Trunk-based modelde yarım kalan işler nasıl gizlenir?",
                "In trunk-based development, how is unfinished work hidden?",
              ],
              options: [
                ["Özellik anahtarları (feature flags) ile", "With feature flags"],
                ["Ayrı bir depo açarak", "By opening a separate repository"],
                ["Dalı silerek", "By deleting the branch"],
                ["Commit'i gizli tutarak", "By keeping the commit private"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Yarım kalan işler özellik anahtarları (feature flags) ile kapalı tutulur.' Kod main'e girer ama özellik henüz kullanıcıya görünmez.",
                "The text: 'unfinished work is hidden behind feature flags.' The code lands in main but the feature isn't visible to users yet.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Trunk-based geliştirme hangi altyapıyı gerektirir?",
                "What infrastructure does trunk-based development require?",
              ],
              options: [
                ["Güçlü otomatik test altyapısı", "Strong automated test coverage"],
                ["Beş farklı dal türü", "Five different branch types"],
                ["Sürüm numaralandırma sistemi", "A version numbering system"],
                ["Ayrı bir hotfix ekibi", "A dedicated hotfix team"],
              ],
              answer: 0,
              explain: [
                "Herkes doğrudan main'e commit attığı için hataları hızla yakalayacak güçlü otomatik testler olmadan bu model risklidir.",
                "Since everyone commits straight to main, this model is risky without strong automated tests to catch mistakes quickly.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "GitHub Flow günlük döngüsünde dal açmadan önce hangi adım önerilir?",
                "In the GitHub Flow daily cycle, which step is recommended before opening a branch?",
              ],
              options: [
                [
                  "`git switch main` ve `git pull` ile main'i güncellemek",
                  "Running `git switch main` and `git pull` to update main",
                ],
                ["Doğrudan `git push` yapmak", "Directly running `git push`"],
                ["`git init` çalıştırmak", "Running `git init`"],
                ["`.gitignore` yazmak", "Writing `.gitignore`"],
              ],
              answer: 0,
              explain: [
                "Kod bloğunun yorumu 'önce güncelle' der: dal, main'in en güncel hâlinden açılmalı ki gereksiz çakışma çıkmasın.",
                "The code comment says 'update first': the branch should be opened from the latest main to avoid unnecessary conflicts.",
              ],
            }),
            tip(
              "Dalları kısa ömürlü tut",
              "Keep branches short-lived",
              "Bir dal ne kadar uzun yaşarsa `main`'den o kadar uzaklaşır ve birleştirme çakışması olasılığı **katlanarak** artar. İki hafta açık kalmış bir dalı birleştirmek genellikle yarım günlük bir acıdır.\n\nPratik hedef: bir dal **bir-üç gün** içinde birleşmeli. İş bundan büyükse parçalara böl ve her parçayı ayrı birleştir.\n\nAyrıca dalında çalışırken düzenli olarak `git pull origin main` ile güncellemeyi al — çakışmayı sonda topluca değil, azar azar çözmek çok daha kolaydır.",
              "The longer a branch lives, the further it drifts from `main` and the probability of merge conflicts rises **exponentially**. Merging a branch left open for two weeks is usually half a day of pain.\n\nA practical target: a branch should merge within **one to three days**. If the work is larger than that, split it and merge each piece separately.\n\nAlso pull `main` into your branch regularly with `git pull origin main` — resolving conflicts a little at a time is far easier than all at once at the end.",
            ),
            quiz({
              id: "q7",
              q: [
                "Bir dal ne kadar uzun süre açık kalırsa çakışma olasılığı nasıl değişir?",
                "The longer a branch stays open, how does the chance of conflicts change?",
              ],
              options: [
                ["Katlanarak artar", "It rises exponentially"],
                ["Değişmez", "It stays the same"],
                ["Azalır", "It decreases"],
                ["Sıfıra iner", "It drops to zero"],
              ],
              answer: 0,
              explain: [
                "Dal ne kadar uzun yaşarsa main'den o kadar uzaklaşır ve birleştirme çakışması olasılığı katlanarak artar.",
                "The longer a branch lives, the further it drifts from main, and the probability of merge conflicts rises exponentially.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre pratik hedef bir dalın ne kadar sürede birleşmesidir?",
                "According to the text, what is the practical target for how quickly a branch should merge?",
              ],
              options: [
                ["Bir-üç gün içinde", "Within one to three days"],
                ["Bir ay içinde", "Within a month"],
                ["Aynı gün, saatler içinde", "The same day, within hours"],
                ["Süre önemli değildir", "The duration doesn't matter"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Pratik hedef: bir dal bir-üç gün içinde birleşmeli.' Bu, çakışma riskini yönetilebilir tutar.",
                "The text: 'A practical target: a branch should merge within one to three days.' This keeps conflict risk manageable.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "İş, hedeflenen süreden büyükse ne yapılmalıdır?",
                "If the work is bigger than the target duration, what should you do?",
              ],
              options: [
                [
                  "Parçalara bölüp her parçayı ayrı birleştirmek",
                  "Split it and merge each piece separately",
                ],
                ["Dalı hiç birleştirmemek", "Never merge the branch"],
                ["main dalını silmek", "Delete the main branch"],
                ["Git Flow'a geçmek", "Switch to Git Flow"],
              ],
              answer: 0,
              explain: [
                "Metin: 'İş bundan büyükse parçalara böl ve her parçayı ayrı birleştir.' Böylece her parça hâlâ kısa ömürlü kalır.",
                "The text: 'If the work is larger than that, split it and merge each piece separately.' This keeps each piece short-lived.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Dal üzerinde çalışırken düzenli olarak `git pull origin main` yapmanın faydası nedir?",
                "What's the benefit of regularly running `git pull origin main` while working on a branch?",
              ],
              options: [
                [
                  "Çakışmaları sonda topluca değil, azar azar çözmek",
                  "Resolving conflicts gradually instead of all at once at the end",
                ],
                ["Dalı otomatik silmek", "Automatically deleting the branch"],
                ["Commit mesajlarını değiştirmek", "Changing commit messages"],
                ["main dalını silmek", "Deleting the main branch"],
              ],
              answer: 0,
              explain: [
                "Metnin son cümlesi: 'çakışmayı sonda topluca değil, azar azar çözmek çok daha kolaydır.'",
                "The text's final sentence: 'resolving conflicts a little at a time is far easier than all at once at the end.'",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "PR'ın 'bilgi yaymak' işlevi ne anlama gelir?",
                "What does the PR's 'spreading knowledge' purpose mean?",
              ],
              options: [
                [
                  "Ekip projenin nasıl çalıştığını öğrenir, tek kişiye bağımlılık azalır",
                  "The team learns how the project works, reducing dependence on one person",
                ],
                ["Herkes aynı anda kod yazar", "Everyone writes code at the same time"],
                ["Kod otomatik belgelenir", "Code documents itself automatically"],
                ["Testler otomatik yazılır", "Tests are written automatically"],
              ],
              answer: 0,
              explain: [
                "Metnin ikinci maddesi: 'Ekip, projenin nasıl çalıştığını öğrenir; tek kişiye bağımlılık azalır.'",
                "The text's second point: 'the team learns how the project works, reducing dependence on one person.'",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "PR'ın 'kayıt bırakmak' işlevi neyi sağlar?",
                "What does the PR's 'leaving a record' purpose provide?",
              ],
              options: [
                [
                  "'Bu neden böyle yapıldı?' sorusunun cevabının PR tartışmasında kalmasını",
                  "The answer to 'why was this done this way?' staying in the PR discussion",
                ],
                ["Kodun otomatik test edilmesini", "The code being tested automatically"],
                ["Commit mesajlarının silinmesini", "Commit messages being deleted"],
                ["Dalın otomatik silinmesini", "The branch being deleted automatically"],
              ],
              answer: 0,
              explain: [
                "Metnin üçüncü maddesi: 'Kayıt bırakmak — \"Bu neden böyle yapıldı?\" sorusunun cevabı PR tartışmasında kalır.'",
                "The text's third point: 'Leaving a record — the answer to \"why was this done this way?\" stays in the PR discussion.'",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Veri ekiplerinde PR'ın en çok gözden kaçan faydası hangisidir?",
                "In data teams, which PR benefit is most often overlooked?",
              ],
              options: [
                [
                  "Bilgi yayma — bir analistin işini herkesin anlaması",
                  "Spreading knowledge — everyone understanding an analyst's work",
                ],
                ["Hata yakalama", "Catching bugs"],
                ["Kayıt bırakma", "Leaving a record"],
                ["Otomatik birleştirme", "Automatic merging"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Veri ekiplerinde en çok gözden kaçan ikinci maddedir' — yani bilgi yayma, çünkü tek kişiye bağımlılığı azaltır.",
                "The text: 'In data teams the second point is the most overlooked' — spreading knowledge, because it reduces dependence on one person.",
              ],
            }),
            text(
              "**İyi bir PR nasıl açılır?**\n\n- **Küçük tut.** 400 satırdan büyük PR'lar gerçekten incelenmez; insanlar göz gezdirip onaylar. Küçük PR gerçek inceleme alır.\n- **Başlığı ve açıklamayı yaz.** Ne yaptığını, **neden** yaptığını ve nasıl test ettiğini yaz.\n- **Ekran görüntüsü ekle.** Rapor veya grafik değiştiyse öncesi-sonrası görüntüsü, on satır açıklamadan daha etkilidir.\n- **Kendi PR'ını önce kendin incele.** Göndermeden önce farkı okuduğunda hatalarının yarısını kendin bulursun.\n\n**İyi bir inceleme nasıl yapılır?**\n\n- **Koda yorum yap, kişiye değil.** \"Bu fonksiyon şu durumda hata verebilir\" ✅ / \"Neden böyle yazdın?\" ❌\n- **Zorunlu ile öneriyi ayır.** \"Bunu düzeltmek gerekir\" ile \"küçük öneri: şöyle de olabilir\" farklı ağırlıktadır; belirt.\n- **Beğendiğini de söyle.** İyi çözümü fark etmek, inceleme kültürünü sürdürülebilir kılar.\n- **Hızlı dön.** Bekleyen PR, ekibi bloke eder. Bir iş günü içinde cevap vermek iyi bir hedeftir.",
              "**How to open a good PR:**\n\n- **Keep it small.** PRs over 400 lines do not really get reviewed; people skim and approve. A small PR gets a real review.\n- **Write the title and description.** State what you did, **why**, and how you tested it.\n- **Add a screenshot.** If a report or chart changed, a before-and-after image beats ten lines of prose.\n- **Review your own PR first.** Reading the diff before sending it finds half your own mistakes.\n\n**How to review well:**\n\n- **Comment on the code, not the person.** \"This function could fail in that case\" ✅ / \"Why did you write it like this?\" ❌\n- **Separate must-fix from suggestion.** \"This needs fixing\" and \"minor idea: this could also work\" carry different weight; say which.\n- **Say what you liked.** Noticing a good solution is what makes a review culture sustainable.\n- **Respond quickly.** A waiting PR blocks the team. Replying within one working day is a good target.",
            ),
            quiz({
              id: "q5",
              q: [
                "Metne göre neden PR'lar küçük tutulmalıdır?",
                "According to the text, why should PRs be kept small?",
              ],
              options: [
                [
                  "400 satırdan büyük PR'lar gerçekten incelenmez, göz gezdirilip onaylanır",
                  "PRs over 400 lines don't really get reviewed; people skim and approve",
                ],
                ["GitHub büyük PR'ları kabul etmez", "GitHub doesn't accept large PRs"],
                ["Küçük PR'lar daha hızlı çalışır", "Small PRs run faster"],
                ["Küçük PR'lar otomatik birleşir", "Small PRs merge automatically"],
              ],
              answer: 0,
              explain: [
                "Metin: '400 satırdan büyük PR'lar gerçekten incelenmez; insanlar göz gezdirip onaylar. Küçük PR gerçek inceleme alır.'",
                "The text: 'PRs over 400 lines do not really get reviewed; people skim and approve. A small PR gets a real review.'",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "PR açıklamasında ne yazılmalıdır?",
                "What should the PR description contain?",
              ],
              options: [
                [
                  "Ne yapıldığı, neden yapıldığı ve nasıl test edildiği",
                  "What was done, why, and how it was tested",
                ],
                ["Yalnızca dosya adları", "Only the file names"],
                ["Yazarın özgeçmişi", "The author's résumé"],
                ["Hiçbir şey, başlık yeterlidir", "Nothing, the title is enough"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Ne yaptığını, neden yaptığını ve nasıl test ettiğini yaz.'",
                "The text: 'State what you did, why, and how you tested it.'",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kendi PR'ını göndermeden önce kendin incelemenin faydası nedir?",
                "What's the benefit of reviewing your own PR before sending it?",
              ],
              options: [
                [
                  "Farkı okuduğunda hatalarının yarısını kendin bulursun",
                  "Reading the diff, you find half your own mistakes",
                ],
                ["PR otomatik onaylanır", "The PR gets auto-approved"],
                ["İnceleme süresi uzar", "The review time gets longer"],
                ["Hiçbir faydası yoktur", "It has no benefit"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Göndermeden önce farkı okuduğunda hatalarının yarısını kendin bulursun.'",
                "The text: 'Reading the diff before sending it finds half your own mistakes.'",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "İyi bir inceleme yorumu nasıl olmalıdır?",
                "What should a good review comment look like?",
              ],
              options: [
                ["Koda yorum yapmalı, kişiye değil", "It should comment on the code, not the person"],
                ["Kişinin yeteneğini sorgulamalı", "It should question the person's skill"],
                ["Kısa ve sert olmalı", "It should be short and harsh"],
                ["Yalnızca emoji ile yanıtlanmalı", "It should only reply with emoji"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Koda yorum yap, kişiye değil.' Örnek: 'Bu fonksiyon şu durumda hata verebilir' ✅ / 'Neden böyle yazdın?' ❌",
                "The text: 'Comment on the code, not the person.' Example: 'This function could fail in that case' ✅ / 'Why did you write it like this?' ❌",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Zorunlu düzeltme ile öneriyi ayırmak neden önemlidir?",
                "Why is it important to separate a must-fix from a suggestion?",
              ],
              options: [
                [
                  "İki farklı ağırlık taşıdıkları için, hangisi olduğunu belirtmek gerekir",
                  "They carry different weight, so it must be clear which is which",
                ],
                ["GitHub bunu zorunlu kıldığı için", "Because GitHub requires it"],
                [
                  "Hepsi aynı önemde olduğu için ayrım gereksizdir",
                  "They're equally important so the distinction is unnecessary",
                ],
                [
                  "Öneriler her zaman görmezden gelinmelidir",
                  "Suggestions should always be ignored",
                ],
              ],
              answer: 0,
              explain: [
                "Metin: '\"Bunu düzeltmek gerekir\" ile \"küçük öneri: şöyle de olabilir\" farklı ağırlıktadır; belirt.'",
                "The text: '\"This needs fixing\" and \"minor idea: this could also work\" carry different weight; say which.'",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bekleyen bir PR'a hızlı dönmenin önerilen hedefi nedir?",
                "What's the recommended target for responding quickly to a waiting PR?",
              ],
              options: [
                ["Bir iş günü içinde", "Within one working day"],
                ["Bir ay içinde", "Within a month"],
                ["Hiçbir zaman sınırı yok", "There's no time limit"],
                ["Yalnızca Cuma günleri", "Only on Fridays"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Bekleyen PR, ekibi bloke eder. Bir iş günü içinde cevap vermek iyi bir hedeftir.'",
                "The text: 'A waiting PR blocks the team. Replying within one working day is a good target.'",
              ],
            }),
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
            quiz({
              id: "q2",
              q: ["Sürekli entegrasyon (CI) nedir?", "What is continuous integration (CI)?"],
              options: [
                [
                  "Her kayıt veya PR geldiğinde otomatik denetim çalıştıran sistem",
                  "A system that runs checks automatically on every commit or PR",
                ],
                ["Kodun elle her gün incelenmesi", "Manually reviewing code every day"],
                ["Dosyaları yedekleyen bir servis", "A service that backs up files"],
                ["Bir sürüm kontrol sistemi", "A version control system"],
              ],
              answer: 0,
              explain: [
                "Metnin tanımı açık: CI, her kayıt veya PR geldiğinde otomatik olarak denetim çalıştıran sistemdir.",
                "The text's definition is explicit: CI is a system that runs checks automatically on every commit or PR.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "GitHub Actions ile CI kurmak pratikte ne gerektirir?",
                "In practice, what does setting up CI with GitHub Actions require?",
              ],
              options: [
                ["Depoya eklenen tek bir dosya", "A single file added to the repository"],
                ["Ayrı bir sunucu kiralamak", "Renting a separate server"],
                ["Yeni bir programlama dili öğrenmek", "Learning a new programming language"],
                ["GitHub Enterprise aboneliği", "A GitHub Enterprise subscription"],
              ],
              answer: 0,
              explain: [
                "Metin: 'GitHub Actions ile bu, depoya eklenen tek bir dosyadan ibarettir.'",
                "The text: 'With GitHub Actions it amounts to a single file added to the repository.'",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Metinde sayılan denetimlerden hangisi 'gizli bilgi taraması' kategorisine girer?",
                "Which of the checks listed in the text falls under 'secret scanning'?",
              ],
              options: [
                [
                  "Yanlışlıkla eklenmiş anahtar var mı kontrolü",
                  "Checking whether a key was accidentally committed",
                ],
                ["Kod stilinin tutarlılığı", "Code style consistency"],
                ["Fonksiyonların beklendiği gibi çalışması", "Functions behaving as expected"],
                ["Notebook çıktısı temizliği", "Notebook output hygiene"],
              ],
              answer: 0,
              explain: [
                "Liste maddesi açık: 'Gizli bilgi taraması — Yanlışlıkla eklenmiş anahtar var mı.'",
                "The list item is explicit: 'Secret scanning — has a key been committed by accident.'",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Örnek iş akışında testlerden önce hangi adım çalışıyor?",
                "In the example workflow, which step runs before the tests?",
              ],
              options: [
                [
                  "Bağımlılıkları kurmak (`pip install -r requirements.txt`)",
                  "Installing dependencies (`pip install -r requirements.txt`)",
                ],
                ["SQL biçimini kontrol etmek", "Checking SQL formatting"],
                ["Depoyu silmek", "Deleting the repository"],
                ["Yeni bir dal oluşturmak", "Creating a new branch"],
              ],
              answer: 0,
              explain: [
                "Yaml sırası: checkout, python kurulumu, bağımlılıkları kurma, linter, testler, SQL biçimi. Testler bağımlılıklardan sonra gelir.",
                "The yaml order is: checkout, python setup, install dependencies, linter, tests, SQL formatting. Tests come after dependencies.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Örnek iş akışında linter hangi araçla çalıştırılıyor?",
                "In the example workflow, which tool runs the linter?",
              ],
              options: [
                ["`ruff check .`", "`ruff check .`"],
                ["`black .`", "`black .`"],
                ["`eslint .`", "`eslint .`"],
                ["`flake8 .`", "`flake8 .`"],
              ],
              answer: 0,
              explain: [
                "Yaml'daki 'Linter' adımı `run: ruff check .` komutunu çalıştırır.",
                "The yaml's 'Linter' step runs the `ruff check .` command.",
              ],
            }),
            text(
              "**Dal koruma kuralları (branch protection)** CI'ı zorunlu kılan parçadır. GitHub'da `main` dalı için şunları açarsın:\n\n- **PR olmadan doğrudan gönderim yapılamaz**\n- **CI kontrolleri geçmeden birleştirilemez**\n- **En az bir onay gerekir**\n- **Birleştirmeden önce `main` ile güncel olmalı**\n\nBu kurallar olmadan CI yalnızca bir **öneri**dir: kırmızı görünse bile biri birleştirebilir ve genelde acele bir günde tam olarak bu olur.\n\nKurallarla birlikte ise bozuk kodun `main`'e girmesi **teknik olarak imkânsız** hâle gelir. Bu, ekip disiplinini insan iradesinden mimariye taşımanın en somut örneğidir — ve tek seferlik bir ayardır.",
              "**Branch protection rules** are what make CI mandatory. On GitHub you enable these for `main`:\n\n- **no direct pushes without a PR**\n- **cannot merge until CI checks pass**\n- **at least one approval required**\n- **must be up to date with `main` before merging**\n\nWithout these rules CI is merely a **suggestion**: somebody can merge even when it is red, and on a rushed day that is exactly what happens.\n\nWith them, broken code entering `main` becomes **technically impossible**. It is the most concrete example of moving team discipline from human willpower into architecture — and it is a one-off setting.",
            ),
            quiz({
              id: "q7",
              q: [
                "Dal koruma kuralları olmadan CI ne hâle gelir?",
                "Without branch protection rules, what does CI become?",
              ],
              options: [
                [
                  "Sadece bir öneri; kırmızı olsa bile biri birleştirebilir",
                  "Just a suggestion; someone can merge even when it's red",
                ],
                ["Otomatik olarak zorunlu hâle gelir", "It automatically becomes mandatory"],
                ["Hiç çalışmaz", "It doesn't run at all"],
                ["Depoyu siler", "It deletes the repository"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Bu kurallar olmadan CI yalnızca bir öneridir: kırmızı görünse bile biri birleştirebilir.'",
                "The text: 'Without these rules CI is merely a suggestion: somebody can merge even when it is red.'",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre `main` dalı için hangi dal koruma kuralı önerilir?",
                "According to the text, which branch protection rule is recommended for `main`?",
              ],
              options: [
                [
                  "PR olmadan doğrudan gönderim yapılamaması",
                  "No direct pushes without a PR",
                ],
                [
                  "Herkesin doğrudan main'e commit atabilmesi",
                  "Anyone being able to commit directly to main",
                ],
                ["Testlerin isteğe bağlı olması", "Tests being optional"],
                ["Onay gerekmemesi", "No approval being required"],
              ],
              answer: 0,
              explain: [
                "Metindeki dört kuraldan biri: 'PR olmadan doğrudan gönderim yapılamaz.' Diğer seçenekler bu kuralların tam tersidir.",
                "One of the four rules in the text: 'no direct pushes without a PR.' The other options are the opposite of these rules.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Dal koruma kuralları etkinleştirildiğinde bozuk kodun main'e girmesi nasıl olur?",
                "Once branch protection rules are enabled, what happens to broken code entering main?",
              ],
              options: [
                ["Teknik olarak imkânsız hâle gelir", "It becomes technically impossible"],
                ["Daha kolay hâle gelir", "It becomes easier"],
                ["Değişmez", "It stays the same"],
                [
                  "Yalnızca yöneticiler için imkânsız olur",
                  "It only becomes impossible for admins",
                ],
              ],
              answer: 0,
              explain: [
                "Metin: 'Bozuk kodun main'e girmesi teknik olarak imkânsız hâle gelir.' Kurallar, disiplini insan iradesinden mimariye taşır.",
                "The text: 'broken code entering main becomes technically impossible.' The rules move discipline from willpower into architecture.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metne göre dal koruma kuralı ayarlamak ne kadar sürer ve önemi nedir?",
                "According to the text, how long does setting branch protection take, and why does it matter?",
              ],
              options: [
                [
                  "İki tık sürer ve CI yatırımının karşılığını almanın koşuludur",
                  "It takes two clicks and is the condition for getting a return on the CI investment",
                ],
                ["Günler sürer ve gereksizdir", "It takes days and is unnecessary"],
                ["Ücretli bir GitHub özelliğidir", "It's a paid GitHub feature"],
                ["Yalnızca büyük ekipler için gereklidir", "It's only needed for large teams"],
              ],
              answer: 0,
              explain: [
                "Metin: 'Bu ayar iki tıktır ve CI'a yapılan tüm yatırımın karşılığını almanın koşuludur.'",
                "The text: 'The setting takes two clicks and is the condition for getting any return on your CI investment.'",
              ],
            }),
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
        lesson({
          slug: "interaktif-rebase",
          title: L("İnteraktif rebase: commit geçmişini temizlemek", "Interactive rebase: cleaning up commit history"),
          summary: L(
            "'wip', 'düzeltme', 'tekrar düzeltme' gibi 8 dağınık commit'i, incelemesi kolay 2 anlamlı commit'e dönüştürmek.",
            "Turning 8 messy commits like 'wip', 'fix', 'fix again' into 2 meaningful commits that are easy to review.",
          ),
          minutes: 17,
          premium: true,
          blocks: [
            text(
              "Bir özellik üzerinde çalışırken commit'lerin genelde düzensizdir: \"wip\", \"düzeltme\", \"typo\", \"gerçekten düzeltme\". Bunları PR açmadan önce temizlemek, inceleyen kişiye çok daha okunur bir geçmiş sunar. **`git rebase -i`** (interactive rebase) tam bunun için var:\n\n```bash\ngit rebase -i HEAD~5   # son 5 commit'i düzenlemeye aç\n```\n\nBu, bir metin editöründe her commit'in yanında bir komutla bir liste açar:\n\n- **pick** — commit'i olduğu gibi bırak\n- **squash (s)** — bu commit'i bir öncekiyle birleştir\n- **reword (r)** — yalnızca commit mesajını değiştir\n- **drop (d)** — commit'i tamamen sil\n\nSekiz \"wip\"li commit'i `squash` ile birleştirip tek bir anlamlı mesajla (\"CSV'den müşteri verisi içe aktarma eklendi\") bırakabilirsin.",
              "While working on a feature, commits are usually messy: \"wip\", \"fix\", \"typo\", \"actually fix\". Cleaning these up before opening a PR gives the reviewer a far more readable history. **`git rebase -i`** (interactive rebase) exists exactly for this:\n\n```bash\ngit rebase -i HEAD~5   # open the last 5 commits for editing\n```\n\nThis opens a list in a text editor, with a command next to each commit:\n\n- **pick** — leave the commit as is\n- **squash (s)** — merge this commit into the one before it\n- **reword (r)** — change only the commit message\n- **drop (d)** — remove the commit entirely\n\nYou can `squash` eight \"wip\" commits together and leave a single meaningful message (\"add customer data import from CSV\").",
            ),
            quiz({
              id: "q1",
              q: [
                "İnteraktif rebase listesinde bir commit'in yanına `squash` yazmak ne yapar?",
                "What does writing `squash` next to a commit in the interactive rebase list do?",
              ],
              options: [
                ["O commit'i bir öncekiyle birleştirir", "It merges that commit into the one before it"],
                ["O commit'i tamamen siler", "It deletes that commit entirely"],
                ["O commit'i yeni bir dala taşır", "It moves that commit to a new branch"],
                ["Yalnızca commit mesajını değiştirir, içeriği etkilemez", "It only changes the commit message, not the content"],
              ],
              answer: 0,
              explain: [
                "`squash`, o commit'in değişikliklerini bir önceki commit'e katar ve ikisi tek bir commit hâline gelir; mesajları birleştirmen istenir. Yalnızca mesajı değiştirmek istiyorsan doğru komut `reword`'dür, içeriği tamamen atmak istiyorsan `drop`'tur.",
                "`squash` folds that commit's changes into the previous one, and the two become a single commit; you're prompted to combine their messages. If you only want to change the message, the right command is `reword`; to discard the content entirely, it's `drop`.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "`git rebase -i` ile geçmişi temizlemenin en önemli kısıtı nedir?",
                "What's the most important restriction on cleaning up history with `git rebase -i`?",
              ],
              options: [
                [
                  "Zaten başkalarıyla paylaşılmış (push edilmiş, PR'a bağlı) commit'lerde yapılmamalıdır — geçmişi değiştirir ve başkalarının kopyasıyla çakışır",
                  "It shouldn't be done on commits already shared with others (pushed, part of an open PR) — it rewrites history and conflicts with everyone else's copy",
                ],
                ["Yalnızca main dalında çalışır", "It only works on the main branch"],
                ["En fazla 2 commit'i aynı anda düzenleyebilirsin", "You can only edit 2 commits at a time"],
                ["Hiçbir kısıtı yoktur, her zaman güvenlidir", "There's no restriction, it's always safe"],
              ],
              answer: 0,
              explain: [
                "Rebase, commit'lerin kimliğini (hash'ini) değiştirir. Bu commit'ler zaten push edilip başkaları onların üzerine kendi işlerini kurduysa, geçmişi değiştirmek onların dalını bozar. Altın kural: yalnızca henüz kimseyle paylaşmadığın, kendi dalındaki commit'leri rebase et.",
                "Rebase changes commits' identity (hash). If those commits were already pushed and others have built work on top of them, rewriting history breaks their branch. The golden rule: only rebase commits on your own branch that you haven't shared with anyone yet.",
              ],
            }),
            pitfall(
              "Push edilmiş bir dalı rebase ettikten sonra normal push çalışmaz",
              "After rebasing an already-pushed branch, a normal push won't work",
              "Rebase commit geçmişini yeniden yazdığı için, uzak sunucudaki eski geçmişle uyuşmaz ve `git push` reddedilir. Yalnızca **kendi** dalındaysan ve kimse üzerine iş kurmadıysa `git push --force-with-lease` kullanılabilir — `--force` değil, `--force-with-lease`: bu, aradan biri push etmişse seni uyarıp durur, kör bir üzerine yazmayı önler.",
              "Because rebase rewrites commit history, it no longer matches the old history on the remote, and a plain `git push` gets rejected. Only if it's **your own** branch and nobody has built on it can you use `git push --force-with-lease` — not `--force`, but `--force-with-lease`: it warns and stops if someone else pushed in the meantime, preventing a blind overwrite.",
            ),
          ],
        }),
        lesson({
          slug: "git-bisect-ile-hata-avi",
          title: L("git bisect ile hatayı bulmak", "Finding the bug with git bisect"),
          summary: L(
            "200 commit içinde hangisi bir şeyi bozdu? Elle her birine bakmak yerine ikili aramayla bulmak.",
            "Which of 200 commits broke something? Finding it with binary search instead of checking each one by hand.",
          ),
          minutes: 14,
          premium: true,
          blocks: [
            text(
              "\"Bu rapor geçen ay doğruydu, şimdi yanlış — ama hangi commit'te bozuldu bilmiyorum\" durumu tanıdıktır. 200 commit'in her birini elle kontrol etmek saatler alır. **`git bisect`**, ikili arama mantığıyla bunu birkaç adıma indirir:\n\n```bash\ngit bisect start\ngit bisect bad              # şu an bozuk (HEAD)\ngit bisect good v1.2.0      # bu etiket/commit'te iyiydi\n# Git seni ortadaki bir commit'e atar; test edip sonucu bildirirsin:\ngit bisect good   # ya da\ngit bisect bad\n# Git aralığı yarıya indirir, süreç tekrarlanır\ngit bisect reset             # bitince normale dön\n```\n\n200 commit'lik bir aralık, ikili arama sayesinde yalnızca ~8 testte (log₂200 ≈ 7,6) tek bir suçlu commit'e iner.",
              "\"This report was correct last month, it's wrong now — but I don't know which commit broke it\" is a familiar situation. Checking each of 200 commits by hand takes hours. **`git bisect`** reduces this to a handful of steps using binary search:\n\n```bash\ngit bisect start\ngit bisect bad              # currently broken (HEAD)\ngit bisect good v1.2.0      # this tag/commit was fine\n# Git checks out a commit in the middle; you test it and report back:\ngit bisect good   # or\ngit bisect bad\n# Git halves the range, the process repeats\ngit bisect reset             # back to normal when done\n```\n\nA range of 200 commits narrows to a single guilty commit in only ~8 tests (log₂200 ≈ 7.6), thanks to binary search.",
            ),
            quiz({
              id: "q1",
              q: [
                "git bisect neden 200 commit'i tek tek değil, yalnızca ~8 adımda tarayabilir?",
                "Why can git bisect scan 200 commits in only ~8 steps, instead of one by one?",
              ],
              options: [
                [
                  "İkili arama yapar — her adımda aralığı yarıya indirir, doğrusal değil logaritmik sayıda test gerekir",
                  "It performs binary search — each step halves the range, requiring a logarithmic, not linear, number of tests",
                ],
                ["Yalnızca son 8 commit'i kontrol eder, gerisini yok sayar", "It only checks the last 8 commits and ignores the rest"],
                ["Testleri otomatik olarak paralel çalıştırır", "It automatically runs the tests in parallel"],
                ["Yapay zeka ile hangi commit'in bozuk olduğunu tahmin eder", "It uses AI to guess which commit is broken"],
              ],
              answer: 0,
              explain: [
                "Her `good`/`bad` cevabından sonra bisect aralığı yarıya indirir — tıpkı sıralı bir listede ikili arama gibi. 200 commit için gereken test sayısı log₂(200) ≈ 7,6'ya, yani pratikte 8 teste iner; tek tek kontrol 200 test gerektirirdi.",
                "After every `good`/`bad` answer, bisect halves the range — exactly like binary search on a sorted list. For 200 commits the number of tests needed drops to log₂(200) ≈ 7.6, roughly 8 in practice; checking one by one would need 200 tests.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "git bisect'in çalışması için başlangıçta ne belirtmen gerekir?",
                "What do you need to specify at the start for git bisect to work?",
              ],
              options: [
                [
                  "Şu anki (bozuk) durumu ve geçmişte bilinen iyi bir noktayı (`bisect bad` / `bisect good`)",
                  "The current (broken) state and a known-good point in the past (`bisect bad` / `bisect good`)",
                ],
                ["Hangi dosyanın bozuk olduğunu", "Which file is broken"],
                ["Kaç kişinin projede çalıştığını", "How many people work on the project"],
                ["Hiçbir şey, bisect otomatik başlar", "Nothing, bisect starts automatically"],
              ],
              answer: 0,
              explain: [
                "Bisect'in ikili arama yapabilmesi için bir aralığa ihtiyacı vardır: 'şu an kötü' ve 'şurada iyiydi'. Bu iki uç nokta olmadan Git nereden nereye arama yapacağını bilemez.",
                "For bisect to run its binary search it needs a range: \"currently bad\" and \"was good at this point\". Without these two endpoints, Git has no idea where to search from and to.",
              ],
            }),
            tip(
              "Test adımını bir betiğe bağlarsan bisect tamamen otomatikleşir",
              "Wire the test step to a script and bisect runs fully automatically",
              "Her adımda elle `good`/`bad` yazmak yerine, doğru/yanlışı otomatik tespit eden bir komut dosyası verebilirsin: `git bisect run pytest test_rapor.py`. Git, betiğin çıkış koduna (0 = iyi, sıfırdan farklı = kötü) bakarak süreci baştan sona otomatik tamamlar — sen kahveni içerken.",
              "Instead of typing `good`/`bad` by hand at every step, you can hand bisect a script that detects right/wrong automatically: `git bisect run pytest test_report.py`. Git reads the script's exit code (0 = good, non-zero = bad) and runs the whole process to completion on its own — while you get coffee.",
            ),
          ],
        }),
        lesson({
          slug: "cherry-pick-ile-secici-tasima",
          title: L("Cherry-pick: bir commit'i başka bir dala taşımak", "Cherry-pick: moving a single commit to another branch"),
          summary: L(
            "Bütün dalı birleştirmeden, yalnızca ihtiyacın olan tek bir commit'i alıp başka bir dala uygulamak.",
            "Without merging a whole branch, taking just the one commit you need and applying it to another branch.",
          ),
          minutes: 13,
          premium: true,
          blocks: [
            text(
              "Bir hata düzeltmesini `main`'de yaptın ama aynı hata, henüz birleşmemiş eski bir `release/1.2` dalında da var — o dalın **tamamını** `main`'den birleştirmek istemiyorsun, çünkü içinde henüz yayınlanmaya hazır olmayan başka değişiklikler de var. **`git cherry-pick`**, tek bir commit'i **kendi hash'iyle** seçip başka bir dala uygular:\n\n```bash\ngit checkout release/1.2\ngit cherry-pick a1b2c3d      # yalnızca bu commit'i buraya da uygula\n```\n\nBu, o commit'in değişikliklerini alır ve şu anki dala **yeni bir commit** olarak (farklı bir hash'le) ekler — orijinal commit'in kendisi taşınmaz, bir kopyası oluşturulur.",
              "You fixed a bug on `main`, but the same bug also exists on an old, not-yet-merged `release/1.2` branch — you don't want to merge **all** of `main` into it, because it contains other changes not ready to ship yet. **`git cherry-pick`** picks a single commit **by its own hash** and applies it to another branch:\n\n```bash\ngit checkout release/1.2\ngit cherry-pick a1b2c3d      # apply just this one commit here too\n```\n\nThis takes that commit's changes and adds them to the current branch as a **new commit** (with a different hash) — the original commit itself isn't moved, a copy of it is created.",
            ),
            quiz({
              id: "q1",
              q: [
                "Cherry-pick edilen bir commit, hedef daldaki hâliyle orijinaliyle aynı hash'e mi sahiptir?",
                "Does a cherry-picked commit share the same hash as the original, once it's on the target branch?",
              ],
              options: [
                [
                  "Hayır — aynı değişikliği taşıyan ama farklı bir hash'e sahip YENİ bir commit oluşturulur",
                  "No — a NEW commit is created carrying the same change but with a different hash",
                ],
                ["Evet, commit birebir aynı hash ile iki dalda birden bulunur", "Yes, the commit exists identically, with the same hash, on both branches"],
                ["Hash yalnızca merge'de değişir, cherry-pick'te değişmez", "The hash only changes on merge, not on cherry-pick"],
                ["Cherry-pick commit'i taşır, kopyalamaz — orijinalinden kaybolur", "Cherry-pick moves the commit rather than copying it — it disappears from the original"],
              ],
              answer: 0,
              explain: [
                "Cherry-pick, commit'in içeriğini (diff'ini) alıp hedef daldaki mevcut geçmişin üzerine yeni bir commit olarak uygular. Bu yeni commit'in ebeveyni farklı olduğu için hash'i de orijinalinden farklıdır — aynı değişiklik, iki farklı kimlikle iki yerde durur.",
                "Cherry-pick takes the commit's content (its diff) and applies it as a new commit on top of the target branch's existing history. Because that new commit's parent differs, its hash differs from the original too — the same change ends up living in two places under two different identities.",
              ],
            }),
            pitfall(
              "Cherry-pick'i düzenli birleştirmenin yerine kullanma",
              "Don't use cherry-pick as a substitute for regular merging",
              "Cherry-pick, tek seferlik ve istisnai bir araçtır (bir hotfix'i geriye taşımak gibi). Onu sürekli iki dalı senkronize tutmak için kullanmak, aynı değişikliğin farklı hash'lerle birden fazla yerde durmasına ve gelecekte gerçek bir birleştirmede kafa karıştırıcı çakışmalara yol açar. Sürekli senkronizasyon için doğru araç düzenli `merge` veya `rebase`'dir.",
              "Cherry-pick is a one-off, exceptional tool (like backporting a hotfix). Using it to keep two branches continuously in sync leads to the same change living in multiple places under different hashes, and confusing conflicts down the line when a real merge eventually happens. For ongoing synchronization, the right tool is a regular `merge` or `rebase`.",
            ),
          ],
        }),
      ],
    },
  ],
};
