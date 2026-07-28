import type { Track } from "@/lib/types";
import { L, code, info, lesson, order, pitfall, pyTask, quiz, text, tip } from "../helpers";

export const mlTrack: Track = {
  slug: "machine-learning",
  name: "Makine Öğrenmesi",
  category: "advanced",
  color: "#f472b6",
  icon: "🤖",
  tagline: L("Tahmin eden modeller kurmak", "Building models that predict"),
  description: L(
    "scikit-learn ile denetimli öğrenmeden model değerlendirmeye ve üretime almaya. Bu patika algoritma ezberi değil, doğru problemi doğru metrikle çözmeyi öğretir.",
    "From supervised learning with scikit-learn to model evaluation and deployment. This track is not about memorising algorithms; it is about solving the right problem with the right metric.",
  ),
  levels: [
    {
      id: "foundation",
      title: L("Makine öğrenmesi nedir?", "What is machine learning?"),
      description: L(
        "Kural yazmakla örnekten öğrenmek arasındaki fark, ve bir modelin gerçekte ne yaptığı.",
        "The difference between writing rules and learning from examples, and what a model actually does.",
      ),
      lessons: [
        lesson({
          slug: "kural-mi-ogrenme-mi",
          title: L("Kural yazmak mı, öğrenmek mi?", "Writing rules or learning?"),
          summary: L(
            "Hangi problemler için makine öğrenmesi gerekir, hangileri için gereksizdir?",
            "Which problems need machine learning, and which do not?",
          ),
          minutes: 12,
          blocks: [
            text(
              "Klasik programlamada **kuralları sen yazarsın**: \"tutar 10.000'i geçerse ve müşteri yeniyse işaretle\". Makine öğrenmesinde ise **örnekleri verirsin, kuralları program bulur**: 100.000 geçmiş işlemi ve hangisinin dolandırıcılık olduğunu gösterirsin, model deseni kendisi çıkarır.\n\nMakine öğrenmesi şu üç koşul bir araya geldiğinde işe yarar:\n\n1. **Desen var** ama sen onu kurala dökemiyorsun (bir kedi fotoğrafını kelimelerle tanımlamayı dene)\n2. **Bol örnek var** — genellikle binlerce\n3. **Kesin doğruluk şart değil** — %95 yeterli, %100 gerekmiyor",
              "In classical programming **you write the rules**: \"flag it if the amount exceeds 10,000 and the customer is new\". In machine learning **you supply examples and the program finds the rules**: you show 100,000 past transactions and which were fraudulent, and the model works out the pattern itself.\n\nMachine learning pays off when three conditions hold together:\n\n1. **A pattern exists** but you cannot express it as a rule (try describing a photo of a cat in words)\n2. **Plenty of examples exist** — usually thousands\n3. **Perfect accuracy is not required** — 95% is enough, 100% is not needed",
            ),
            pitfall(
              "Çoğu problem makine öğrenmesi istemez",
              "Most problems do not want machine learning",
              "\"KDV'yi hesapla\" bir kuraldır, model değil. \"Stok 10'un altına inince uyar\" bir kuraldır. Bunları modelle çözmek, hem gereksiz karmaşıklık hem daha kötü sonuç demektir — çünkü kural %100 doğrudur, model olmayacaktır.\n\nSoru şu: **kuralı yazabiliyor musun?** Yazabiliyorsan yaz. Makine öğrenmesi, kuralı yazamadığın veya kuralın çok fazla istisna içerdiği durumlar için vardır.",
              "\"Compute the VAT\" is a rule, not a model. \"Alert when stock drops below 10\" is a rule. Solving these with a model means both needless complexity and worse results — because the rule is 100% correct and the model will not be.\n\nThe question is: **can you write the rule?** If you can, write it. Machine learning exists for cases where you cannot, or where the rule would carry too many exceptions.",
            ),
            text(
              "**Üç ana öğrenme türü:**\n\n- **Denetimli (supervised)** — Doğru cevabı bildiğin örneklerle öğretirsin. En yaygın olan budur.\n  - *Sınıflandırma* — kategori tahmini: bu müşteri ayrılacak mı? Bu e-posta spam mi?\n  - *Regresyon* — sayı tahmini: bu ev kaça satılır? Gelecek ay kaç adet satarız?\n- **Denetimsiz (unsupervised)** — Doğru cevap yok, yapıyı keşfedersin: müşteri segmentleri (kümeleme), anormallik tespiti.\n- **Pekiştirmeli (reinforcement)** — Deneme yanılma ve ödülle öğrenir: oyun oynayan, robot yönlendiren sistemler. Veri analizinde nadiren kullanılır.",
              "**Three main kinds of learning:**\n\n- **Supervised** — you teach with examples whose correct answer you know. This is by far the most common.\n  - *Classification* — predicting a category: will this customer churn? Is this email spam?\n  - *Regression* — predicting a number: what will this house sell for? How many units will we sell next month?\n- **Unsupervised** — there is no correct answer; you discover structure: customer segments (clustering), anomaly detection.\n- **Reinforcement** — learns by trial, error and reward: systems that play games or steer robots. Rarely used in data analytics.",
            ),
            quiz({
              id: "q1",
              q: [
                "\"Bu müşteri önümüzdeki ay aboneliğini iptal edecek mi?\" sorusu hangi türdür?",
                "\"Will this customer cancel their subscription next month?\" is which kind of problem?",
              ],
              options: [
                ["Denetimli öğrenme — sınıflandırma", "Supervised learning — classification"],
                ["Denetimli öğrenme — regresyon", "Supervised learning — regression"],
                ["Denetimsiz öğrenme — kümeleme", "Unsupervised learning — clustering"],
                ["Pekiştirmeli öğrenme", "Reinforcement learning"],
              ],
              answer: 0,
              explain: [
                "Cevap iki kategoriden biri (iptal eder / etmez), bu yüzden sınıflandırmadır. Ve geçmiş müşterilerin gerçekten iptal edip etmediğini bildiğin için denetimlidir. \"Kaç gün sonra iptal eder?\" sorusu ise regresyon olurdu.",
                "The answer is one of two categories (cancels / does not), so it is classification. And because you know whether past customers actually cancelled, it is supervised. \"How many days until they cancel?\" would have been regression.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "ozellik-ve-etiket",
          title: L("Özellik, etiket ve eğitim-test ayrımı", "Features, labels and the train/test split"),
          summary: L(
            "Modelin gördüğü şey nedir ve neden verinin bir kısmını ondan saklarız?",
            "What does a model actually see, and why do we hide part of the data from it?",
          ),
          minutes: 14,
          blocks: [
            text(
              "Denetimli öğrenmede veri iki parçaya ayrılır:\n\n- **Özellikler (features, X)** — modelin girdi olarak gördüğü sütunlar: yaş, harcama, şehir, son giriş tarihi\n- **Etiket (label, y)** — tahmin etmesini istediğin sütun: ayrıldı mı, fiyat kaç\n\nModel, X ile y arasındaki ilişkiyi öğrenir. Sonra yeni bir X gördüğünde y'yi tahmin eder.\n\nÖzellik seçimi, model seçiminden **daha önemlidir.** İyi özelliklerle basit bir model, kötü özelliklerle karmaşık bir modeli neredeyse her zaman yener.",
              "In supervised learning the data splits into two parts:\n\n- **Features (X)** — the columns the model sees as input: age, spend, city, last login date\n- **Label (y)** — the column you want predicted: did they churn, what is the price\n\nThe model learns the relationship between X and y. Then, given a new X, it predicts y.\n\nFeature choice matters **more than model choice.** A simple model with good features almost always beats a complex model with bad ones.",
            ),
            text(
              "**Eğitim-test ayrımı**, makine öğrenmesinin en temel kuralıdır. Veriyi ikiye bölersin:\n\n- **Eğitim kümesi (%70-80)** — model bunu görerek öğrenir\n- **Test kümesi (%20-30)** — model bunu **hiç görmez**; başarıyı burada ölçersin\n\nNeden? Çünkü bir modeli gördüğü veri üzerinde sınamak, öğrencinin sınavda tam olarak çalıştığı soruları sormak gibidir. Yüksek not alır ama hiçbir şey öğrenmemiş olabilir — sadece ezberlemiştir.\n\nGerçek soru şudur: model **daha önce görmediği** veride ne kadar iyi? Buna **genelleme** denir ve makine öğrenmesinin tek amacı budur.",
              "**The train/test split** is machine learning's most fundamental rule. You divide the data in two:\n\n- **Training set (70-80%)** — the model learns by looking at this\n- **Test set (20-30%)** — the model **never sees this**; you measure performance here\n\nWhy? Because testing a model on data it has already seen is like giving a student exactly the questions they revised. They score highly but may have learned nothing — they merely memorised.\n\nThe real question is: how good is the model on data it has **never seen**? This is called **generalisation**, and it is the only goal of machine learning.",
            ),
            code(
              "python",
              `from sklearn.model_selection import train_test_split

# X: özellikler, y: etiket
X = df[["yas", "harcama", "gun_sayisi"]]
y = df["ayrildi"]

X_egitim, X_test, y_egitim, y_test = train_test_split(
    X, y,
    test_size=0.2,        # %20 test
    random_state=42,      # tekrarlanabilirlik: aynı bölme her seferinde
    stratify=y,           # sınıf oranlarını iki kümede de koru
)

print(f"Eğitim: {len(X_egitim)} satır, Test: {len(X_test)} satır")`,
            ),
            pitfall(
              "Test kümesine sızıntı en yaygın ölümcül hatadır",
              "Leaking into the test set is the most common fatal error",
              "Test kümesi kutsal olmalıdır. En sık yapılan sızıntı hataları:\n\n- **Ölçeklemeyi bölmeden önce yapmak** — tüm verinin ortalamasını kullanarak normalleştirirsen, test kümesinin bilgisi eğitime karışır. Ölçekleyiciyi **yalnızca eğitimde** eğitip teste uygula.\n- **Zaman serisinde rastgele bölmek** — geleceği görüp geçmişi tahmin etmek olur. Zaman verisinde bölme **tarihe göre** yapılır.\n- **Test kümesine bakarak model seçmek** — testi 20 kez deneyip en iyisini seçerseniz, test kümesi artık bağımsız değildir. Bunun için ayrı bir **doğrulama kümesi** vardır.",
              "The test set must be sacred. The most common leakage mistakes:\n\n- **Scaling before splitting** — normalising with the mean of all the data mixes test-set information into training. Fit the scaler **on the training set only**, then apply it to the test set.\n- **Splitting time series randomly** — that amounts to seeing the future to predict the past. Time-based data must be split **by date**.\n- **Choosing a model by looking at the test set** — try the test set 20 times and pick the best, and it is no longer independent. That is what a separate **validation set** is for.",
            ),
            quiz({
              id: "q1",
              q: [
                "Model eğitim verisinde %99, test verisinde %62 doğruluk veriyor. Bu ne anlama gelir?",
                "A model scores 99% on training data and 62% on test data. What does that mean?",
              ],
              options: [
                [
                  "Aşırı öğrenme (overfitting) — model ezberledi, genelleme yapamıyor",
                  "Overfitting — the model memorised and cannot generalise",
                ],
                ["Model çok basit", "The model is too simple"],
                ["Test kümesi hatalı", "The test set is faulty"],
                ["Sonuç mükemmel", "The result is excellent"],
              ],
              answer: 0,
              explain: [
                "Eğitim ile test arasındaki büyük uçurum aşırı öğrenmenin imzasıdır: model veriyi değil gürültüyü öğrenmiştir. Çözümler: daha çok veri, daha basit model, düzenlileştirme (regularisation) veya daha az özellik.",
                "A large gap between training and test is the signature of overfitting: the model learned the noise rather than the signal. Remedies: more data, a simpler model, regularisation, or fewer features.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "ml-is-akisi",
          title: L("Bir makine öğrenmesi projesinin akışı", "The flow of a machine learning project"),
          summary: L(
            "Modeli eğitmek işin %10'u. Diğer %90 ne?",
            "Training the model is 10% of the work. What is the other 90%?",
          ),
          minutes: 12,
          blocks: [
            text(
              "Yeni başlayanlar makine öğrenmesini \"model seçip eğitmek\" sanır. Gerçek projede zamanın dağılımı şöyledir:\n\n1. **Problemi tanımlamak (%10)** — Neyi tahmin edeceğiz? Başarı nasıl ölçülecek? Tahmin ne zaman ve nasıl kullanılacak?\n2. **Veri toplamak ve temizlemek (%40)** — Eksik değerler, tutarsız kayıtlar, birleştirme, doğrulama.\n3. **Özellik mühendisliği (%25)** — Ham sütunlardan modelin anlayacağı bilgiyi çıkarmak.\n4. **Model eğitmek ve ayarlamak (%10)** — Asıl \"makine öğrenmesi\" kısmı. En kısa adım.\n5. **Değerlendirme ve yayına alma (%15)** — Metrik seçimi, izleme, yeniden eğitim planı.\n\nİlk adımı atlamak en pahalı hatadır: yanlış tanımlanmış bir problemin mükemmel modeli işe yaramaz.",
              "Beginners think machine learning is \"pick a model and train it\". In a real project the time actually splits like this:\n\n1. **Framing the problem (10%)** — What are we predicting? How is success measured? When and how will the prediction be used?\n2. **Collecting and cleaning data (40%)** — Missing values, inconsistent records, joins, validation.\n3. **Feature engineering (25%)** — Extracting information the model can use from raw columns.\n4. **Training and tuning (10%)** — The actual \"machine learning\" part. The shortest step.\n5. **Evaluation and deployment (15%)** — Metric choice, monitoring, a retraining plan.\n\nSkipping the first step is the costliest mistake: a perfect model of a badly framed problem is useless.",
            ),
            info(
              "Her zaman bir taban çizgisi kur",
              "Always build a baseline",
              "Karmaşık bir modele başlamadan önce en aptal çözümü dene ve puanını yaz:\n\n- Sınıflandırmada: \"her zaman en sık görülen sınıfı tahmin et\"\n- Regresyonda: \"her zaman ortalamayı tahmin et\"\n- Zaman serisinde: \"yarın bugünle aynı olacak\"\n\nBu taban çizgisi senin referansın olur. Modelin %85 doğruluk verdi diye sevinirken, veride sınıfların %85'i zaten aynıysa modelin hiçbir şey öğrenmemiş demektir. Bu kontrolü yapmayan ekipler aylarca değersiz modeller sunar.",
              "Before starting on a complex model, try the dumbest solution and write down its score:\n\n- Classification: \"always predict the most frequent class\"\n- Regression: \"always predict the mean\"\n- Time series: \"tomorrow will be the same as today\"\n\nThat baseline becomes your reference. If you are pleased your model hit 85% accuracy but 85% of the data is already one class, your model has learned nothing. Teams that skip this check present worthless models for months.",
            ),
            quiz({
              id: "q1",
              q: [
                "Dolandırıcılık verisinin %99'u temiz işlem. Modelin %99 doğruluk verdi. İlk tepkin ne olmalı?",
                "99% of your fraud data is legitimate. Your model scores 99% accuracy. What should your first reaction be?",
              ],
              options: [
                [
                  "Şüphelenmek: \"hepsi temiz\" diyen bir model de %99 alır; doğruluk burada yanlış metrik",
                  "Suspicion: a model that says \"all clean\" also scores 99%; accuracy is the wrong metric here",
                ],
                ["Modeli yayına almak", "Ship the model"],
                ["Daha çok özellik eklemek", "Add more features"],
                ["Modeli daha uzun eğitmek", "Train the model for longer"],
              ],
              answer: 0,
              explain: [
                "Dengesiz veride doğruluk (accuracy) neredeyse hiçbir şey söylemez. Bu tür problemlerde kesinlik (precision), duyarlılık (recall) ve F1 kullanılır — bir sonraki kademede tam olarak bunu çalışacaksın.",
                "On imbalanced data, accuracy tells you almost nothing. Such problems call for precision, recall and F1 — which is exactly what the next stage covers.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "junior",
      title: L("Temel kavramlar", "Core concepts"),
      description: L(
        "Denetimli/denetimsiz öğrenme, eğitim-test ayrımı ve ilk modelin.",
        "Supervised vs unsupervised learning, train/test split and your first model.",
      ),
      projectSlug: "ml-musteri-kaybi",
      lessons: [
        lesson({
          slug: "ml-temelleri",
          title: L("Makine öğrenmesi nedir, ne değildir?", "What machine learning is and is not"),
          summary: L(
            "Hangi problem ML problemidir, hangisi basit bir kuralla çözülür?",
            "Which problems are ML problems, and which are solved by a simple rule?",
          ),
          minutes: 15,
          blocks: [
            text(
              "**Denetimli öğrenme** — etiketli veriden öğrenir:\n\n- *Sınıflandırma*: kategori tahmini (müşteri ayrılacak mı, e-posta spam mi)\n- *Regresyon*: sayı tahmini (ev fiyatı, gelecek ay talep)\n\n**Denetimsiz öğrenme** — etiket yoktur, yapı bulunur:\n\n- *Kümeleme*: benzer müşterileri gruplama\n- *Boyut indirgeme*: PCA ile değişken sayısını azaltma\n- *Anomali tespiti*: sıra dışı işlemleri yakalama",
              "**Supervised learning** — learns from labelled data:\n\n- *Classification*: predict a category (will this customer churn, is this email spam)\n- *Regression*: predict a number (house price, next month's demand)\n\n**Unsupervised learning** — no labels, find structure:\n\n- *Clustering*: group similar customers\n- *Dimensionality reduction*: fewer variables with PCA\n- *Anomaly detection*: flag unusual transactions",
            ),
            info(
              "Önce basit çözümü dene",
              "Try the simple solution first",
              "Bir problemi çözmenin en iyi yolu genellikle makine öğrenmesi **değildir**. \"Son 90 gündür giriş yapmayan müşteri risklidir\" kuralı, çoğu zaman bir modelin yapacağı işin %80'ini sıfır bakım maliyetiyle yapar. Model kurmadan önce daima basit kural referansını (baseline) ölç — modelin onu geçtiğini gösteremiyorsan model gereksizdir.",
              "The best way to solve a problem is often **not** machine learning. A rule like \"a customer who has not logged in for 90 days is at risk\" often does 80% of a model's job at zero maintenance cost. Always measure that simple baseline first — if your model cannot beat it, the model is not worth having.",
            ),
            text(
              "**Eğitim / test ayrımı** makine öğrenmesinin en temel disiplinidir. Model, gördüğü veriyi ezberleyebilir; gerçek başarıyı ancak **hiç görmediği** veride ölçebilirsin.",
              "The **train/test split** is the most basic discipline in ML. A model can memorise what it has seen; you can only measure real performance on data it has **never seen**.",
            ),
            code(
              "python",
              `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

X = df.drop(columns=["ayrildi"])
y = df["ayrildi"]

X_egitim, X_test, y_egitim, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = LogisticRegression(max_iter=1000)
model.fit(X_egitim, y_egitim)

tahmin = model.predict(X_test)
print(classification_report(y_test, tahmin))`,
            ),
            quiz({
              id: "q1",
              q: [
                "`stratify=y` parametresi ne işe yarar?",
                "What does the `stratify=y` parameter do?",
              ],
              options: [
                [
                  "Sınıf oranlarını eğitim ve test kümesinde aynı tutar",
                  "It keeps the class proportions identical in the train and test sets",
                ],
                ["Veriyi karıştırır", "It shuffles the data"],
                ["Eksik değerleri doldurur", "It fills missing values"],
                ["Modeli hızlandırır", "It makes the model faster"],
              ],
              answer: 0,
              explain: [
                "Dengesiz veride (örneğin %5 ayrılan müşteri) rastgele bölme, test kümesine çok az pozitif örnek düşürebilir ve ölçümü güvenilmez kılar. `stratify` bunu engeller.",
                "With imbalanced data (say 5% churners) a random split can leave the test set with too few positives, making the measurement unreliable. `stratify` prevents that.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "regresyon-ve-siniflandirma-modelleri",
          title: L("Doğrusal ve lojistik regresyon", "Linear and logistic regression"),
          summary: L(
            "En basit iki model. Ve neden hâlâ ilk denenecek modeller onlar?",
            "The two simplest models. And why they are still the first ones to try?",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Doğrusal regresyon** bir sayı tahmin eder ve veriye en uygun düz çizgiyi (veya çok boyutlu düzlemi) bulur:\n\n`fiyat = 50.000 + 3.200 × metrekare + 15.000 × oda_sayisi`\n\n**Lojistik regresyon** ise kategori tahmin eder. Adı yanıltıcıdır — regresyon değil sınıflandırma yapar. Doğrusal bir hesap yapar, sonra sonucu **sigmoid** fonksiyonuyla 0-1 aralığına sıkıştırır ve olasılığa çevirir:\n\n`P(ayrılır) = sigmoid(−2,1 + 0,05 × gun_sayisi − 0,3 × giris_sayisi)`\n\nÇıktı 0,73 ise \"bu müşterinin ayrılma olasılığı %73\" demektir. Eşiği (genelde 0,5) sen belirlersin.",
              "**Linear regression** predicts a number by finding the straight line (or multi-dimensional plane) that best fits the data:\n\n`price = 50,000 + 3,200 × sqm + 15,000 × rooms`\n\n**Logistic regression** predicts a category. Its name misleads — it does classification, not regression. It computes a linear expression, then squeezes the result into 0-1 with the **sigmoid** function, turning it into a probability:\n\n`P(churn) = sigmoid(−2.1 + 0.05 × days − 0.3 × logins)`\n\nAn output of 0.73 means \"this customer has a 73% probability of churning\". You choose the threshold (usually 0.5).",
            ),
            code(
              "python",
              `from sklearn.linear_model import LinearRegression, LogisticRegression

# Sayı tahmini
reg = LinearRegression().fit(X_egitim, y_egitim)
print("Katsayılar:", reg.coef_)      # her özelliğin etkisi
print("R-kare:", reg.score(X_test, y_test))

# Kategori tahmini
clf = LogisticRegression(max_iter=1000).fit(X_egitim, y_egitim)
olasiliklar = clf.predict_proba(X_test)[:, 1]   # pozitif sınıf olasılığı
tahminler = (olasiliklar > 0.5).astype(int)     # eşiği sen seçersin
print("Doğruluk:", clf.score(X_test, y_test))`,
            ),
            tip(
              "Basit modelle başla — her zaman",
              "Start simple — always",
              "Deneyimli veri bilimcilerin ilk hamlesi neredeyse hiç derin öğrenme değildir. Doğrusal ve lojistik regresyonun üç büyük avantajı vardır:\n\n1. **Yorumlanabilir** — her katsayı hangi özelliğin ne kadar etkili olduğunu söyler. Yöneticiye açıklayabilirsin.\n2. **Hızlı ve az veriyle çalışır** — bin satırla bile makul sonuç verir.\n3. **Referans oluşturur** — karmaşık modelin bunu geçemiyorsa, karmaşıklık boşunadır.\n\nAncak bu modeller yetersiz kaldığında ağaç tabanlı yöntemlere geçilir.",
              "An experienced data scientist's first move is almost never deep learning. Linear and logistic regression have three big advantages:\n\n1. **Interpretable** — each coefficient tells you how much a feature matters. You can explain it to an executive.\n2. **Fast, and fine with little data** — they give sensible results on even a thousand rows.\n3. **They set a reference** — if your complex model cannot beat this, the complexity is pointless.\n\nOnly when these fall short do you move to tree-based methods.",
            ),
            pyTask({
              id: "t1",
              prompt: [
                "Lojistik regresyon çıktısı olan olasılıkları 0,5 eşiğiyle sınıfa çevir. `tahminler` listesi 0 ve 1'lerden oluşsun, `pozitif_sayisi` kaç tanesinin 1 olduğunu tutsun.",
                "Turn logistic regression probabilities into classes with a 0.5 threshold. `tahminler` must be a list of 0s and 1s, and `pozitif_sayisi` must hold how many are 1.",
              ],
              starter: `olasiliklar = [0.12, 0.73, 0.51, 0.49, 0.88, 0.05, 0.95, 0.34]

tahminler =
pozitif_sayisi = `,
              solution: `olasiliklar = [0.12, 0.73, 0.51, 0.49, 0.88, 0.05, 0.95, 0.34]

tahminler = [1 if p > 0.5 else 0 for p in olasiliklar]
pozitif_sayisi = sum(tahminler)
print(tahminler, pozitif_sayisi)`,
              hint: [
                "Liste kavraması kullan: `[1 if p > 0.5 else 0 for p in olasiliklar]`. Toplam için `sum()`.",
                "Use a list comprehension: `[1 if p > 0.5 else 0 for p in olasiliklar]`. Then `sum()`.",
              ],
              checks: [
                {
                  code: "tahminler == [0, 1, 1, 0, 1, 0, 1, 0]",
                  msg: [
                    "Tahminler [0,1,1,0,1,0,1,0] olmalı",
                    "The predictions must be [0,1,1,0,1,0,1,0]",
                  ],
                },
                {
                  code: "int(pozitif_sayisi) == 4",
                  msg: ["4 pozitif tahmin olmalı", "There must be 4 positive predictions"],
                },
              ],
              xp: 40,
            }),
          ],
        }),
        lesson({
          slug: "karar-agaclari",
          title: L("Karar ağaçları", "Decision trees"),
          summary: L(
            "İnsan gibi \"eğer şu, o hâlde bu\" diye düşünen, çizilebilen model.",
            "A model that reasons in \"if this, then that\" steps — and can be drawn.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Karar ağacı**, veriyi ardışık sorularla bölerek karar verir:\n\n```\nSon giriş > 30 gün mü?\n├── Evet: Harcama < 500 mü?\n│   ├── Evet  -> AYRILIR (%87)\n│   └── Hayır -> KALIR   (%64)\n└── Hayır: KALIR (%92)\n```\n\nModel her adımda \"hangi soru grupları en iyi ayırıyor?\" diye bakar ve en bilgilendirici bölmeyi seçer. Bunu ölçmek için **Gini** veya **entropi** kullanılır.\n\nEn büyük avantajı: **çizilebilir ve anlatılabilir.** Bir yöneticiye lojistik regresyonun katsayılarını anlatmak zordur; karar ağacını göstermek kolaydır.",
              "A **decision tree** decides by splitting the data with successive questions:\n\n```\nLast login > 30 days?\n├── Yes: Spend < 500?\n│   ├── Yes -> CHURNS (87%)\n│   └── No  -> STAYS  (64%)\n└── No: STAYS (92%)\n```\n\nAt each step the model asks \"which question separates the groups best?\" and picks the most informative split, measured by **Gini** or **entropy**.\n\nIts greatest advantage: it **can be drawn and explained**. Explaining logistic regression coefficients to an executive is hard; showing them a decision tree is easy.",
            ),
            text(
              "**Ağaçların iki güçlü yanı:**\n\n- **Doğrusal olmayan ilişkileri yakalar** — regresyon düz çizgi arar, ağaç aramaz. \"Yaş 25-35 arasında yüksek, dışında düşük\" gibi bir deseni ağaç bulur, doğrusal regresyon bulamaz.\n- **Ölçekleme gerektirmez** — özellikleri normalleştirmene gerek yok, çünkü ağaç yalnızca sıralamaya bakar.\n\n**Ve büyük zayıflığı:** sınırsız büyürse veriyi ezberler. Her satır için ayrı bir yaprak üretir, eğitimde %100 doğruluk verir, testte çöker.",
              "**Two strengths of trees:**\n\n- **They capture non-linear relationships** — regression looks for a straight line; a tree does not. A pattern like \"high between ages 25-35, low outside\" is found by a tree and missed by linear regression.\n- **No scaling required** — you need not normalise features, because a tree only looks at ordering.\n\n**And their big weakness:** left to grow without limit they memorise the data, producing a separate leaf for every row, scoring 100% in training and collapsing on the test set.",
            ),
            code(
              "python",
              `from sklearn.tree import DecisionTreeClassifier, export_text

# Aşırı öğrenmeyi engelleyen üç ayar — hepsi ağacı budar
agac = DecisionTreeClassifier(
    max_depth=4,             # en fazla 4 seviye derinlik
    min_samples_leaf=20,     # bir yaprakta en az 20 örnek olsun
    random_state=42,
).fit(X_egitim, y_egitim)

# Ağacı metin olarak yazdır — kararları okuyabilirsin
print(export_text(agac, feature_names=list(X.columns)))

# Hangi özellik ne kadar önemli?
for ad, onem in zip(X.columns, agac.feature_importances_):
    print(f"{ad:>15}: {onem:.3f}")`,
            ),
            quiz({
              id: "q1",
              q: [
                "Karar ağacında `max_depth` sınırı koymanın amacı nedir?",
                "What is the purpose of setting a `max_depth` limit on a decision tree?",
              ],
              options: [
                [
                  "Aşırı öğrenmeyi engellemek — sınırsız ağaç veriyi ezberler",
                  "To prevent overfitting — an unlimited tree memorises the data",
                ],
                ["Eğitimi hızlandırmak", "To speed up training"],
                ["Daha çok özellik kullanmak", "To use more features"],
                ["Doğruluğu artırmak", "To increase accuracy"],
              ],
              answer: 0,
              explain: [
                "Derinlik sınırı, modelin gürültüye değil genel desene odaklanmasını sağlar. Eğitim doğruluğu düşer ama **test** doğruluğu yükselir — ve önemli olan tek şey odur. Bu, düzenlileştirmenin (regularisation) en sezgisel örneğidir.",
                "A depth limit forces the model to focus on the general pattern rather than the noise. Training accuracy falls but **test** accuracy rises — and that is the only thing that matters. It is the most intuitive example of regularisation.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "mid",
      title: L("Model değerlendirme", "Model evaluation"),
      description: L(
        "Doğruluk yanıltır. Precision, recall, ROC-AUC ve çapraz doğrulama.",
        "Accuracy misleads. Precision, recall, ROC-AUC and cross-validation.",
      ),
      projectSlug: "ml-musteri-kaybi",
      lessons: [
        lesson({
          slug: "metrikler",
          title: L("Doğru metriği seçmek", "Choosing the right metric"),
          summary: L(
            "%99 doğruluk çoğu zaman kötü haberdir. Neden?",
            "99% accuracy is usually bad news. Why?",
          ),
          minutes: 18,
          blocks: [
            text(
              "1000 işlemden 10'u sahte olsun. \"Hiçbiri sahte değil\" diyen model **%99 doğruluk** alır ve tek bir dolandırıcılığı bile yakalamaz. Dengesiz veride doğruluk (accuracy) işe yaramaz.\n\n**Karışıklık matrisi** dört sayı verir: TP, FP, TN, FN. Tüm anlamlı metrikler bunlardan türer:\n\n- **Precision** = TP / (TP + FP) — \"pozitif dediklerimin ne kadarı gerçekten pozitif?\"\n- **Recall** = TP / (TP + FN) — \"gerçek pozitiflerin ne kadarını yakaladım?\"\n- **F1** — precision ve recall'un harmonik ortalaması",
              "Say 10 of 1000 transactions are fraudulent. A model that says \"none are fraud\" scores **99% accuracy** and catches nothing. On imbalanced data, accuracy is useless.\n\nThe **confusion matrix** gives four numbers: TP, FP, TN, FN. Every meaningful metric derives from them:\n\n- **Precision** = TP / (TP + FP) — \"of everything I flagged, how much was real?\"\n- **Recall** = TP / (TP + FN) — \"of everything real, how much did I catch?\"\n- **F1** — the harmonic mean of precision and recall",
            ),
            text(
              "Hangisini optimize edeceğin **hatanın maliyetine** bağlıdır:\n\n- **Kanser taraması** → recall önceliklidir; bir hastayı kaçırmak, yanlış alarmdan çok daha pahalıdır.\n- **Spam filtresi** → precision önceliklidir; önemli bir e-postayı spam'e atmak, birkaç spam'in geçmesinden kötüdür.\n- **Müşteri kaybı kampanyası** → bütçen kaç kişiye ulaşabildiğine göre eşiği ayarlarsın.",
              "Which one you optimise depends on the **cost of each error**:\n\n- **Cancer screening** → recall matters most; missing a patient is far costlier than a false alarm.\n- **Spam filter** → precision matters most; sending an important email to spam is worse than letting a few spams through.\n- **Churn campaign** → you tune the threshold to how many people your budget can reach.",
            ),
            code(
              "python",
              `from sklearn.metrics import (
    confusion_matrix, classification_report, roc_auc_score,
)
from sklearn.model_selection import cross_val_score

print(confusion_matrix(y_test, tahmin))
print(classification_report(y_test, tahmin, digits=3))

# Olasılık tahmini ile ROC-AUC: eşikten bağımsız genel başarı
olasilik = model.predict_proba(X_test)[:, 1]
print("ROC-AUC:", roc_auc_score(y_test, olasilik))

# Tek bir bölmeye güvenme: çapraz doğrulama
skorlar = cross_val_score(model, X, y, cv=5, scoring="roc_auc")
print(skorlar.mean().round(3), "±", skorlar.std().round(3))`,
            ),
            pitfall(
              "Veri sızıntısı (data leakage)",
              "Data leakage",
              "Ölçekleyiciyi (`StandardScaler`) tüm veri üzerinde `fit` edip sonra bölerseniz test kümesinin bilgisi eğitime sızar ve skorunuz gerçek dışı yükselir. Doğrusu: önce böl, sonra **sadece eğitim** üzerinde `fit`, teste `transform` uygula. En temizi tüm adımları bir `Pipeline` içine koymaktır — sızıntı yapısal olarak imkânsız hale gelir.",
              "Fitting a scaler like `StandardScaler` on the full dataset before splitting leaks test information into training and inflates your score. Correct order: split first, `fit` on **training only**, then `transform` the test set. The cleanest fix is putting every step in a `Pipeline`, which makes leakage structurally impossible.",
            ),
            quiz({
              id: "q1",
              q: [
                "Sahtecilik tespitinde 1000 işlemden 10'u sahte. Model hepsine \"normal\" diyor. Doğruluk ve recall nedir?",
                "In fraud detection 10 of 1000 transactions are fraudulent. The model labels everything \"normal\". What are accuracy and recall?",
              ],
              options: [
                ["Doğruluk %99, recall %0", "Accuracy 99%, recall 0%"],
                ["Doğruluk %99, recall %99", "Accuracy 99%, recall 99%"],
                ["Doğruluk %0, recall %0", "Accuracy 0%, recall 0%"],
                ["Doğruluk %50, recall %50", "Accuracy 50%, recall 50%"],
              ],
              answer: 0,
              explain: [
                "990 normali doğru bilir (%99 doğruluk), ama 10 sahtenin hiçbirini yakalamaz (recall %0). Bu, dengesiz veride doğruluk metriğinin neden tek başına anlamsız olduğunun en net örneğidir.",
                "It gets the 990 normal cases right (99% accuracy) but catches none of the 10 frauds (0% recall). This is the clearest example of why accuracy alone is meaningless on imbalanced data.",
              ],
              xp: 25,
            }),
            pyTask({
              id: "t1",
              prompt: [
                "Karışıklık matrisi değerleri verildi. `precision` ve `recall` değerlerini hesapla.\n\nTP=40, FP=10, FN=20, TN=930",
                "Given the confusion matrix values, compute `precision` and `recall`.\n\nTP=40, FP=10, FN=20, TN=930",
              ],
              starter: `TP, FP, FN, TN = 40, 10, 20, 930

precision =
recall = `,
              solution: `TP, FP, FN, TN = 40, 10, 20, 930

precision = TP / (TP + FP)
recall = TP / (TP + FN)
print(round(precision, 3), round(recall, 3))`,
              hint: [
                "precision = TP / (TP + FP), recall = TP / (TP + FN)",
                "precision = TP / (TP + FP), recall = TP / (TP + FN)",
              ],
              checks: [
                {
                  code: "abs(precision - 0.8) < 1e-9",
                  msg: ["precision 0.8 olmalı", "precision must be 0.8"],
                },
                {
                  code: "abs(recall - 0.6666666666666666) < 1e-9",
                  msg: ["recall ≈ 0.667 olmalı", "recall must be ≈ 0.667"],
                },
              ],
              xp: 35,
            }),
          ],
        }),
        lesson({
          slug: "asiri-ogrenme-ve-capraz-dogrulama",
          title: L("Aşırı öğrenme ve çapraz doğrulama", "Overfitting and cross-validation"),
          summary: L(
            "Model ezberliyor mu, öğreniyor mu? Ve tek bir test kümesi neden yetmez?",
            "Is the model memorising or learning? And why is a single test set not enough?",
          ),
          minutes: 20,
          blocks: [
            text(
              "Her modelin iki hata kaynağı vardır ve aralarında **denge** kurmak zorundasın:\n\n- **Yanlılık (bias)** — model fazla basit, deseni yakalayamıyor. Eğitimde de testte de kötü. Buna **yetersiz öğrenme (underfitting)** denir.\n- **Varyans (variance)** — model fazla karmaşık, gürültüyü de öğrenmiş. Eğitimde mükemmel, testte kötü. Buna **aşırı öğrenme (overfitting)** denir.\n\nModeli karmaşıklaştırdıkça yanlılık düşer ama varyans yükselir. En iyi model, ikisinin toplamının en küçük olduğu noktadadır — genelde ortada bir yerde.",
              "Every model has two sources of error, and you must **balance** them:\n\n- **Bias** — the model is too simple to capture the pattern. Poor on both training and test. This is **underfitting**.\n- **Variance** — the model is too complex and has learned the noise. Perfect on training, poor on test. This is **overfitting**.\n\nAs you make a model more complex, bias falls but variance rises. The best model sits where their sum is smallest — usually somewhere in the middle.",
            ),
            text(
              "**Çapraz doğrulama (cross-validation)**, tek bir test kümesinin şansa bağlı olması sorununu çözer. Veriyi k parçaya böler (genelde 5), sırayla her parçayı test olarak kullanır ve kalan k−1 parçayla eğitir. Sonuçta **k adet puan** alırsın.\n\nBunun iki büyük faydası vardır:\n\n1. **Ortalama puan** tek bir bölmeye göre çok daha güvenilirdir\n2. **Puanların standart sapması** modelin ne kadar kararlı olduğunu söyler. Puanlar 0,82 / 0,81 / 0,83 ise model kararlıdır; 0,71 / 0,88 / 0,79 ise modele güvenemezsin — bölme değişince sonuç değişiyor demektir.",
              "**Cross-validation** solves the problem of a single test set being a matter of luck. It splits the data into k folds (usually 5), uses each fold as the test set in turn, and trains on the remaining k−1. You end up with **k scores**.\n\nThis brings two big benefits:\n\n1. **The mean score** is far more reliable than one from a single split\n2. **The standard deviation of the scores** tells you how stable the model is. Scores of 0.82 / 0.81 / 0.83 mean a stable model; 0.71 / 0.88 / 0.79 means you cannot trust it — the result changes with the split.",
            ),
            code(
              "python",
              `from sklearn.model_selection import cross_val_score, StratifiedKFold

kf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
puanlar = cross_val_score(model, X, y, cv=kf, scoring="f1")

print("Puanlar :", puanlar.round(3))
print(f"Ortalama: {puanlar.mean():.3f} (± {puanlar.std():.3f})")

# Zaman serisinde ASLA rastgele bölme kullanma:
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5)   # daima geçmişle eğit, gelecekle test et`,
            ),
            pitfall(
              "Aşırı öğrenmeye karşı dört savunma",
              "Four defences against overfitting",
              "1. **Daha çok veri** — en etkili çözüm, ama genelde en pahalısı.\n2. **Daha basit model** — ağaç derinliğini azalt, özellik sayısını düşür.\n3. **Düzenlileştirme (regularisation)** — büyük katsayıları cezalandır. Lojistik regresyonda `C` parametresi, ağaçlarda budama bunu yapar.\n4. **Erken durdurma** — doğrulama puanı kötüleşmeye başladığında eğitimi kes.\n\nEn sık atlanan nokta ise şudur: **özellik sayısı, satır sayısına göre çok fazla olmamalı.** 200 satırlık veride 80 özellik varsa model kaçınılmaz olarak ezberler.",
              "1. **More data** — the most effective fix, though usually the most expensive.\n2. **A simpler model** — reduce tree depth, cut the number of features.\n3. **Regularisation** — penalise large coefficients. The `C` parameter in logistic regression and pruning in trees do this.\n4. **Early stopping** — halt training when the validation score starts getting worse.\n\nThe most commonly overlooked point: **the number of features must not be large relative to the number of rows.** With 80 features on 200 rows, the model will inevitably memorise.",
            ),
            quiz({
              id: "q1",
              q: [
                "5 katlı çapraz doğrulamada puanlar 0,71 / 0,89 / 0,76 / 0,92 / 0,68 çıktı. Ne düşünmelisin?",
                "5-fold cross-validation gives 0.71 / 0.89 / 0.76 / 0.92 / 0.68. What should you conclude?",
              ],
              options: [
                [
                  "Model kararsız; ortalamaya güvenmeden önce sebebini araştırmalısın",
                  "The model is unstable; investigate why before trusting the mean",
                ],
                ["Ortalama 0,79, model iyi", "The mean is 0.79, so the model is good"],
                ["Çapraz doğrulama hatalı yapılmış", "The cross-validation was done wrong"],
                ["Daha fazla kat kullanmak sorunu çözer", "Using more folds fixes the problem"],
              ],
              answer: 0,
              explain: [
                "0,68 ile 0,92 arasındaki fark çok büyük. Bu genellikle iki şeyden birini gösterir: veri az (her kat çok küçük) veya veri homojen değil (bazı katlarda farklı bir alt grup ağırlıkta). Ortalamayı raporlamadan önce bunu anlamak gerekir.",
                "The gap between 0.68 and 0.92 is very large. This usually points to one of two things: too little data (each fold is tiny) or heterogeneous data (some folds are dominated by a different subgroup). You need to understand this before reporting the mean.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "ozellik-muhendisligi",
          title: L("Özellik mühendisliği", "Feature engineering"),
          summary: L(
            "Modeli değiştirmek yerine veriyi zenginleştir — en çok kazanç buradan gelir.",
            "Enrich the data instead of swapping the model — this is where most of the gain lives.",
          ),
          minutes: 20,
          blocks: [
            text(
              "**Özellik mühendisliği**, ham sütunlardan modelin kullanabileceği bilgiyi çıkarmaktır. Kazanç sıralaması genellikle şöyledir: *iyi özellik > çok veri > iyi model > iyi hiperparametre.*\n\n**En çok işe yarayan dönüşümler:**\n\n- **Tarihten parça çıkarmak** — ham tarih işe yaramaz; ondan `ay`, `haftanın_günü`, `hafta_sonu_mu`, `tatil_mi` üretmek çok işe yarar\n- **Fark ve oran** — `son_giriş_gün_sayısı`, `bu_ay/geçen_ay`, `harcama/sipariş_sayısı`\n- **Toplulaştırma** — müşteri düzeyinde `toplam_sipariş`, `ortalama_sepet`, `farklı_kategori_sayısı`\n- **Kategorik kodlama** — metin sütunlarını sayıya çevirmek\n- **Log dönüşümü** — çarpık sayısal sütunları (gelir, tutar) sıkıştırmak",
              "**Feature engineering** means extracting information a model can use out of raw columns. The ranking of gains usually looks like this: *good features > lots of data > a good model > good hyperparameters.*\n\n**The transformations that pay off most:**\n\n- **Extracting parts of a date** — a raw date is useless; deriving `month`, `day_of_week`, `is_weekend`, `is_holiday` from it is very useful\n- **Differences and ratios** — `days_since_last_login`, `this_month/last_month`, `spend/order_count`\n- **Aggregations** — at customer level: `total_orders`, `average_basket`, `distinct_categories`\n- **Categorical encoding** — turning text columns into numbers\n- **Log transforms** — compressing skewed numeric columns (income, amounts)",
            ),
            text(
              "**Kategorik kodlama üç yolla yapılır:**\n\n- **One-hot** — her kategori için 0/1 sütunu. Az sayıda kategori varsa (< 15) en güvenli seçim. `sehir` sütunu 5 şehir içeriyorsa 5 sütun olur.\n- **Ordinal** — kategorileri sıralı sayıya çevirir. **Yalnızca gerçekten sıralıysa** kullan (küçük/orta/büyük). `sehir` için kullanmak, modele \"İzmir, Ankara'dan büyüktür\" gibi anlamsız bir bilgi verir.\n- **Target encoding** — her kategoriyi, o kategorideki ortalama etiket değeriyle değiştirir. Çok kategorili sütunlarda (5.000 ürün kodu) güçlüdür ama **sızıntı riski** taşır; mutlaka çapraz doğrulama içinde yapılmalıdır.",
              "**Categorical encoding comes in three forms:**\n\n- **One-hot** — a 0/1 column per category. With few categories (< 15) it is the safest choice. A `city` column with 5 cities becomes 5 columns.\n- **Ordinal** — maps categories to ordered numbers. Use it **only when the order is real** (small/medium/large). Using it for `city` tells the model something meaningless, like \"İzmir is greater than Ankara\".\n- **Target encoding** — replaces each category with the mean label value in that category. Powerful for high-cardinality columns (5,000 product codes) but carries a **leakage risk**; it must be done inside cross-validation.",
            ),
            pyTask({
              id: "t1",
              prompt: [
                "Tarih sütunundan özellik çıkar. `df` içinde `ay`, `hafta_gunu` (Pazartesi=0) ve `hafta_sonu` (0/1) sütunlarını oluştur.",
                "Extract features from a date column. Create `ay`, `hafta_gunu` (Monday=0) and `hafta_sonu` (0/1) columns in `df`.",
              ],
              starter: `import pandas as pd

df = pd.DataFrame({
    "tarih": pd.to_datetime([
        "2024-01-06", "2024-03-14", "2024-07-21", "2024-11-04",
    ]),
    "tutar": [120, 340, 90, 500],
})

df["ay"] =
df["hafta_gunu"] =
df["hafta_sonu"] = `,
              solution: `import pandas as pd

df = pd.DataFrame({
    "tarih": pd.to_datetime([
        "2024-01-06", "2024-03-14", "2024-07-21", "2024-11-04",
    ]),
    "tutar": [120, 340, 90, 500],
})

df["ay"] = df["tarih"].dt.month
df["hafta_gunu"] = df["tarih"].dt.dayofweek
df["hafta_sonu"] = (df["hafta_gunu"] >= 5).astype(int)
print(df)`,
              hint: [
                "`.dt.month`, `.dt.dayofweek` kullan. Hafta sonu, gün numarası 5 (Cumartesi) veya 6 (Pazar) olanlardır.",
                "Use `.dt.month` and `.dt.dayofweek`. Weekend means day number 5 (Saturday) or 6 (Sunday).",
              ],
              checks: [
                {
                  code: "list(df['ay']) == [1, 3, 7, 11]",
                  msg: ["Ay sütunu [1,3,7,11] olmalı", "The month column must be [1,3,7,11]"],
                },
                {
                  code: "list(df['hafta_sonu']) == [1, 0, 1, 0]",
                  msg: [
                    "6 Ocak Cumartesi, 21 Temmuz Pazar — ikisi hafta sonu",
                    "6 January is a Saturday and 21 July a Sunday — both weekend",
                  ],
                },
              ],
              xp: 45,
            }),
          ],
        }),
      ],
    },
    {
      id: "senior",
      title: L("Üretime alma", "Putting models in production"),
      description: L(
        "Pipeline, hiperparametre ayarı, model kayması ve izleme.",
        "Pipelines, hyperparameter tuning, model drift and monitoring.",
      ),
      projectSlug: "ml-talep-tahmini",
      lessons: [
        lesson({
          slug: "pipeline-ve-uretim",
          title: L("Pipeline, ayarlama ve izleme", "Pipelines, tuning and monitoring"),
          summary: L(
            "Not defterinde çalışan model ile üretimde çalışan model arasındaki mesafe.",
            "The distance between a model that works in a notebook and one that works in production.",
          ),
          minutes: 20,
          blocks: [
            code(
              "python",
              `from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

sayisal = ["yas", "aylik_harcama", "uyelik_suresi"]
kategorik = ["sehir", "paket"]

on_isleme = ColumnTransformer([
    ("say", Pipeline([
        ("doldur", SimpleImputer(strategy="median")),
        ("olcek", StandardScaler()),
    ]), sayisal),
    ("kat", Pipeline([
        ("doldur", SimpleImputer(strategy="most_frequent")),
        ("kodla", OneHotEncoder(handle_unknown="ignore")),
    ]), kategorik),
])

boru = Pipeline([
    ("hazirlik", on_isleme),
    ("model", RandomForestClassifier(random_state=42)),
])

izgara = {
    "model__n_estimators": [100, 300],
    "model__max_depth": [None, 10, 20],
    "model__min_samples_leaf": [1, 5],
}

arama = GridSearchCV(boru, izgara, cv=5, scoring="roc_auc", n_jobs=-1)
arama.fit(X_egitim, y_egitim)
print(arama.best_params_, arama.best_score_.round(3))`,
              "Tüm ön işleme adımları pipeline içinde — sızıntı yapısal olarak imkânsız",
              "Every preprocessing step inside the pipeline — leakage becomes structurally impossible",
            ),
            text(
              "**Model üretime alındıktan sonra** iş bitmez, asıl orada başlar:\n\n- **Veri kayması (data drift)** — girdi dağılımı zamanla değişir; 2020'de eğitilen bir model 2024 davranışını bilmez.\n- **Kavram kayması (concept drift)** — girdi ile çıktı arasındaki ilişkinin kendisi değişir.\n- **İzleme** — tahmin dağılımını, girdi istatistiklerini ve gerçek sonuç geldikçe performansı takip et.\n- **Yeniden eğitim** — bir takvim (aylık) veya bir eşik (AUC %5 düştüğünde) belirle ve otomatikleştir.",
              "**Shipping the model is not the end**, it is where the work starts:\n\n- **Data drift** — the input distribution shifts over time; a model trained in 2020 does not know 2024 behaviour.\n- **Concept drift** — the relationship between input and output itself changes.\n- **Monitoring** — track the prediction distribution, input statistics, and performance as ground truth arrives.\n- **Retraining** — set a schedule (monthly) or a trigger (AUC drops 5%) and automate it.",
            ),
            tip(
              "Modelin kararını açıklayabilmelisin",
              "You must be able to explain the model's decision",
              "Kredi, işe alım, sağlık gibi alanlarda \"model öyle dedi\" bir cevap değildir. `feature_importances_`, permütasyon önemi veya SHAP değerleriyle hangi değişkenin kararı nasıl etkilediğini gösterebilmelisin. Açıklanamayan model çoğu kurumda üretime hiç çıkamaz.",
              "In credit, hiring or healthcare, \"the model said so\" is not an answer. You need `feature_importances_`, permutation importance or SHAP values to show which variable pushed the decision and how. In many organisations an unexplainable model never ships at all.",
            ),
            order({
              id: "o1",
              prompt: [
                "Bir makine öğrenmesi projesinin adımlarını doğru sıraya diz.",
                "Order the steps of a machine learning project.",
              ],
              lines: [
                "İş problemini ve başarı metriğini tanımla",
                "Veriyi topla ve keşifsel analiz yap",
                "Basit kural referansını (baseline) ölç",
                "Eğitim / test ayrımını yap",
                "Pipeline içinde ön işleme ve modeli kur",
                "Çapraz doğrulama ile hiperparametreleri ayarla",
                "Test kümesinde son değerlendirmeyi yap",
                "Üretime al ve kayma için izlemeyi kur",
              ],
              xp: 30,
            }),
          ],
        }),
        lesson({
          slug: "toplu-yontemler",
          title: L("Topluluk yöntemleri: orman ve gradyan artırma", "Ensembles: forests and gradient boosting"),
          summary: L(
            "Yüz zayıf modelin oyu, tek güçlü modelden neden daha iyi?",
            "Why do a hundred weak models outvote one strong model?",
          ),
          minutes: 20,
          blocks: [
            text(
              "Tek bir karar ağacı kararsızdır: veriyi biraz değiştirsen tamamen farklı bir ağaç çıkar. **Topluluk (ensemble)** yöntemleri, çok sayıda ağacı birleştirerek bu kararsızlığı ortadan kaldırır. İki temel strateji vardır:\n\n**Torbalama (bagging) — Rastgele Orman**\nYüzlerce ağacı **paralel** olarak, verinin farklı rastgele alt kümeleriyle eğitir. Her ağaç her bölmede özelliklerin de rastgele bir alt kümesine bakar. Tahmin, ağaçların oyların ortalamasıdır.\n\n**Artırma (boosting) — XGBoost, LightGBM**\nAğaçları **sırayla** eğitir. Her yeni ağaç, önceki ağaçların **hata yaptığı** örneklere odaklanır. Böylece model adım adım kendini düzeltir.",
              "A single decision tree is unstable: change the data slightly and you get a completely different tree. **Ensemble** methods remove that instability by combining many trees. There are two basic strategies:\n\n**Bagging — Random Forest**\nTrains hundreds of trees **in parallel** on different random subsets of the data. Each tree also looks at a random subset of features at every split. The prediction is the average of the trees' votes.\n\n**Boosting — XGBoost, LightGBM**\nTrains trees **sequentially**. Each new tree focuses on the examples the previous trees got **wrong**. The model corrects itself step by step.",
            ),
            code(
              "python",
              `from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier

# Rastgele orman: ayarı kolay, aşırı öğrenmeye dayanıklı
orman = RandomForestClassifier(
    n_estimators=300,        # 300 ağaç
    max_depth=None,          # ormanda derinlik sınırı şart değil
    min_samples_leaf=5,
    n_jobs=-1,               # tüm çekirdekleri kullan
    random_state=42,
).fit(X_egitim, y_egitim)

# Gradyan artırma: genelde daha yüksek doğruluk, daha dikkatli ayar gerektirir
gbm = GradientBoostingClassifier(
    n_estimators=200,
    learning_rate=0.05,      # küçük adım + çok ağaç = daha iyi genelleme
    max_depth=3,             # artırmada ağaçlar SIĞ olmalı
    random_state=42,
).fit(X_egitim, y_egitim)`,
            ),
            info(
              "Hangisini seçmeli?",
              "Which should you choose?",
              "**Rastgele orman** — hızlı başlangıç için ideal. Varsayılan ayarlarla bile iyi çalışır, aşırı öğrenmeye dayanıklıdır, paralel eğitilir. Zaman kısıtlıysa veya modeli çok fazla ayarlayacak imkânın yoksa bunu seç.\n\n**Gradyan artırma (XGBoost / LightGBM)** — tablo verisinde bugün hâlâ **en yüksek doğruluğu** veren yöntem. Kaggle yarışmalarının çoğunu bu kazanır. Ama `learning_rate`, `max_depth`, `n_estimators` ayarlarına duyarlıdır ve dikkatsiz kullanılırsa aşırı öğrenir.\n\nÖnemli not: tablo verisinde bu iki yöntem genellikle derin öğrenmeyi **yener**. Sinir ağları görüntü, ses ve metinde üstündür; satır-sütun verisinde ağaçlar hâlâ kraldır.",
              "**Random forest** — ideal for a fast start. It works well even at default settings, resists overfitting and trains in parallel. Choose it when time is short or you cannot afford much tuning.\n\n**Gradient boosting (XGBoost / LightGBM)** — still the method that delivers the **highest accuracy** on tabular data today. It wins most Kaggle competitions. But it is sensitive to `learning_rate`, `max_depth` and `n_estimators`, and overfits if used carelessly.\n\nAn important note: on tabular data these two usually **beat** deep learning. Neural networks dominate images, audio and text; on rows and columns, trees are still king.",
            ),
            quiz({
              id: "q1",
              q: [
                "Gradyan artırmada ağaçlar neden sığ (max_depth=3 gibi) tutulur?",
                "Why are trees kept shallow (such as max_depth=3) in gradient boosting?",
              ],
              options: [
                [
                  "Her ağaç yalnızca küçük bir düzeltme yapmalı; derin ağaçlar hemen aşırı öğrenir",
                  "Each tree should make only a small correction; deep trees overfit immediately",
                ],
                ["Eğitimi hızlandırmak için", "To make training faster"],
                ["Bellek tasarrufu için", "To save memory"],
                ["Rastgele ormanla aynı olsun diye", "To match the random forest"],
              ],
              answer: 0,
              explain: [
                "Artırmada güç, tek bir ağaçtan değil yüzlerce küçük düzeltmenin toplamından gelir. Her ağaç \"zayıf öğrenici\" olmalıdır. Derin ağaç kullanırsan ilk ağaç veriyi ezberler ve sonrakilere düzeltecek bir şey kalmaz — topluluğun tüm avantajı kaybolur.",
                "In boosting the power comes not from one tree but from the sum of hundreds of small corrections. Each tree must be a \"weak learner\". Use deep trees and the first one memorises the data, leaving the rest nothing to correct — the whole advantage of the ensemble is lost.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "hiperparametre-optimizasyonu",
          title: L("Hiperparametre optimizasyonu", "Hyperparameter tuning"),
          summary: L(
            "Modelin ayarlarını sistematik olarak bulmak — el yordamıyla değil.",
            "Finding a model's settings systematically, not by trial and error.",
          ),
          minutes: 18,
          blocks: [
            text(
              "**Parametre**, modelin veriden **öğrendiği** şeydir (regresyon katsayıları gibi). **Hiperparametre** ise senin **önceden belirlediğin** ayardır: ağaç derinliği, öğrenme oranı, ağaç sayısı, düzenlileştirme gücü.\n\nBunları elle denemek üç sebeple kötüdür: yavaştır, kaçırdığın kombinasyonlar olur ve en önemlisi — test kümesine bakarak seçim yaparsan test kümesi kirlenir.\n\nDoğru yol, **çapraz doğrulama içinde otomatik arama** yapmaktır.",
              "A **parameter** is what the model **learns** from the data (such as regression coefficients). A **hyperparameter** is a setting **you** fix beforehand: tree depth, learning rate, number of trees, regularisation strength.\n\nTuning these by hand is bad for three reasons: it is slow, you miss combinations, and most importantly — if you select by looking at the test set, you contaminate it.\n\nThe right way is **automated search inside cross-validation**.",
            ),
            code(
              "python",
              `from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

izgara = {
    "n_estimators": [100, 300, 500],
    "max_depth": [3, 5, 8, None],
    "min_samples_leaf": [1, 5, 20],
}

# Izgara arama: tüm kombinasyonları dener (3 x 4 x 3 = 36 model x 5 kat = 180 eğitim)
arama = GridSearchCV(
    RandomForestClassifier(random_state=42),
    izgara,
    cv=5,
    scoring="f1",       # metriği İŞ hedefine göre seç, varsayılana bırakma
    n_jobs=-1,
).fit(X_egitim, y_egitim)

print("En iyi ayarlar:", arama.best_params_)
print(f"En iyi CV puanı: {arama.best_score_:.3f}")

# Test kümesine SADECE bir kez, en sonda bak
print(f"Test puanı: {arama.best_estimator_.score(X_test, y_test):.3f}")`,
            ),
            tip(
              "Rastgele arama genellikle ızgaradan iyidir",
              "Random search usually beats grid search",
              "Izgara arama tüm kombinasyonları dener ve arama uzayı büyüdükçe katlanarak yavaşlar. `RandomizedSearchCV` ise rastgele kombinasyonlar dener ve şaşırtıcı bir gerçek vardır: **aynı süre içinde genellikle daha iyi sonuç bulur.**\n\nSebep şu: hiperparametrelerin çoğu sonucu pek etkilemez, birkaçı çok etkiler. Izgara arama önemsiz parametrelerin tüm değerlerini denemek için zaman harcar; rastgele arama ise önemli parametrenin daha çok farklı değerini görür.\n\nDaha da iyisi için `Optuna` gibi Bayesçi optimizasyon kütüphanelerine bak — önceki denemelerden öğrenerek arama yaparlar.",
              "Grid search tries every combination and slows down exponentially as the space grows. `RandomizedSearchCV` tries random combinations instead, and there is a surprising fact: **it usually finds a better result in the same amount of time.**\n\nThe reason: most hyperparameters barely affect the outcome while a few affect it a lot. Grid search spends time trying every value of the irrelevant ones; random search sees more distinct values of the one that matters.\n\nFor better still, look at Bayesian optimisation libraries such as `Optuna` — they learn from previous trials as they search.",
            ),
            pitfall(
              "Metrik seçimi hiperparametreden önemlidir",
              "Metric choice matters more than hyperparameters",
              "`scoring=\"accuracy\"` bırakıp dengesiz veride arama yapmak, en iyi ayarları **yanlış hedefe göre** seçmek demektir. Dolandırıcılık tespitinde recall önemliyse `scoring=\"recall\"`, dengeli bir tercih istiyorsan `\"f1\"`, olasılık kalitesi önemliyse `\"roc_auc\"` kullan.\n\nHiperparametre ayarı modeli %2 iyileştirir; yanlış metrik seçimi modeli **tamamen işe yaramaz** kılar.",
              "Leaving `scoring=\"accuracy\"` while searching on imbalanced data means picking the best settings **against the wrong target**. If recall matters in fraud detection use `scoring=\"recall\"`; for a balanced trade-off use `\"f1\"`; if probability quality matters use `\"roc_auc\"`.\n\nHyperparameter tuning improves a model by 2%; choosing the wrong metric makes it **entirely useless**.",
            ),
            quiz({
              id: "q1",
              q: [
                "GridSearchCV kullanırken test kümesine kaç kez bakmalısın?",
                "When using GridSearchCV, how many times should you look at the test set?",
              ],
              options: [
                [
                  "Bir kez, en sonda — arama sırasında çapraz doğrulama puanı kullanılır",
                  "Once, at the very end — the search itself uses the cross-validation score",
                ],
                ["Her kombinasyondan sonra", "After every combination"],
                ["Hiç bakmamalı", "Never"],
                ["En az beş kez", "At least five times"],
              ],
              answer: 0,
              explain: [
                "Arama, eğitim verisi içindeki çapraz doğrulama puanına göre en iyiyi seçer. Test kümesi yalnızca son modelin gerçek dünyadaki performansını tahmin etmek için kullanılır. Testi arama sırasında kullanırsan, bulduğun puan gerçekte alacağından yüksek olur.",
                "The search picks the winner using the cross-validation score inside the training data. The test set is used only to estimate the final model's real-world performance. Use the test set during the search and the score you report will be higher than what you actually get.",
              ],
            }),
          ],
        }),
      ],
    },
    {
      id: "expert",
      title: L("Sorumlu ve sürdürülebilir modeller", "Responsible and sustainable models"),
      description: L(
        "Modeli açıklamak, kaymasını izlemek ve adaletsizliğini fark etmek: üretimde yaşayan model.",
        "Explaining a model, monitoring its drift and spotting its unfairness: the model that lives in production.",
      ),
      lessons: [
        lesson({
          slug: "model-yorumlanabilirligi",
          title: L("Model yorumlanabilirliği", "Model interpretability"),
          summary: L(
            "\"Model öyle dedi\" bir cevap değil. Kararın nedenini nasıl açıklarsın?",
            "\"The model said so\" is not an answer. How do you explain why a decision was made?",
          ),
          minutes: 20,
          blocks: [
            text(
              "Kredi başvurusu reddedilen bir müşteri \"neden?\" diye sorma hakkına sahiptir — birçok ülkede bu **yasal bir zorunluluktur**. Rastgele ormanın 300 ağacı \"çünkü öyle\" der. Bunu insanın anlayacağı bir cevaba çevirmek gerekir.\n\n**İki düzeyde açıklama vardır:**\n\n- **Küresel (global)** — Model genel olarak neye bakıyor? Hangi özellikler önemli?\n- **Yerel (local)** — Bu **tek** tahmin neden böyle çıktı? Müşteri X neden reddedildi?\n\nKüresel açıklama modeli anlamana yarar; yerel açıklama müşteriye cevap vermene yarar. İkisi farklı araçlar gerektirir.",
              "A customer whose loan application was rejected has the right to ask \"why?\" — in many countries this is a **legal requirement**. A random forest's 300 trees say \"because\". You have to turn that into an answer a human can understand.\n\n**Explanation comes at two levels:**\n\n- **Global** — what does the model look at in general? Which features matter?\n- **Local** — why did **this one** prediction come out this way? Why was customer X rejected?\n\nGlobal explanation helps you understand the model; local explanation lets you answer the customer. They need different tools.",
            ),
            text(
              "**Pratik yorumlanabilirlik araçları:**\n\n- **Özellik önemi (feature importance)** — Ağaç modellerinde hazır gelir. Ama dikkat: korelasyonlu özellikler arasında önemi keyfî böler, o yüzden tek başına yanıltıcıdır.\n- **Permütasyon önemi** — Bir sütunu rastgele karıştırıp modelin ne kadar kötüleştiğine bakar. Daha güvenilirdir çünkü modelin gerçekte o sütuna ne kadar dayandığını ölçer.\n- **SHAP değerleri** — Her tahmin için her özelliğin katkısını hesaplar: \"bu müşterinin skorunu son giriş tarihi −0,3 düşürdü, harcaması +0,1 yükseltti\". Bugünün standart aracıdır ve hem küresel hem yerel çalışır.\n- **Kısmi bağımlılık grafiği (PDP)** — Bir özellik değiştikçe tahmin nasıl değişiyor? Doğrusal olmayan ilişkileri görselleştirir.",
              "**Practical interpretability tools:**\n\n- **Feature importance** — comes built into tree models. But beware: it splits importance arbitrarily among correlated features, so it misleads on its own.\n- **Permutation importance** — shuffles one column at random and measures how much worse the model gets. More reliable, because it measures how much the model actually relies on that column.\n- **SHAP values** — compute each feature's contribution to each prediction: \"the last login date pushed this customer's score down 0.3, their spend pushed it up 0.1\". This is today's standard tool and works both globally and locally.\n- **Partial dependence plots (PDP)** — how does the prediction change as one feature varies? Visualises non-linear relationships.",
            ),
            pitfall(
              "Yorumlanabilirlik nedensellik değildir",
              "Interpretability is not causality",
              "SHAP \"son giriş tarihi bu tahmini en çok etkileyen faktör\" dediğinde, bu **modelin neye baktığını** anlatır — gerçek dünyada neyin sebep olduğunu değil.\n\nModel, ayrılacak müşterilerin giriş yapmayı bıraktığını öğrenmiştir. Ama müşteriyi zorla giriş yaptırmak onu tutmaz; giriş yapmaması ayrılmanın **sebebi değil belirtisidir**. Aksiyon almak için nedensel analiz gerekir.\n\nBu ayrımı kaçırmak, \"modele göre X önemli, o hâlde X'i değiştirelim\" gibi pahalı ve sonuçsuz kararlara yol açar.",
              "When SHAP says \"last login date is the biggest driver of this prediction\", it describes **what the model looks at** — not what causes the outcome in the real world.\n\nThe model has learned that customers about to churn stop logging in. But forcing a customer to log in will not retain them; not logging in is a **symptom of churn, not its cause**. Taking action requires causal analysis.\n\nMissing this distinction leads to expensive, fruitless decisions of the form \"the model says X matters, so let's change X\".",
            ),
            quiz({
              id: "q1",
              q: [
                "Bir müşteriye kredisinin neden reddedildiğini açıklamak için hangi araç uygundur?",
                "Which tool is appropriate for explaining to a customer why their loan was rejected?",
              ],
              options: [
                [
                  "SHAP gibi yerel açıklama — o tek tahmine hangi özelliğin ne kadar katkı yaptığını gösterir",
                  "A local explanation such as SHAP — it shows each feature's contribution to that single prediction",
                ],
                ["Küresel özellik önemi", "Global feature importance"],
                ["Modelin doğruluk oranı", "The model's accuracy"],
                ["Çapraz doğrulama puanları", "The cross-validation scores"],
              ],
              answer: 0,
              explain: [
                "Küresel önem \"model genelde gelire bakar\" der; müşteriye bu bir şey ifade etmez. Yerel açıklama ise \"sizin başvurunuzda kredi geçmişi −0,4 etki yaptı\" gibi kişiye özel ve eyleme dönüştürülebilir bir cevap üretir.",
                "Global importance says \"the model generally looks at income\", which means nothing to the customer. A local explanation produces a personal, actionable answer: \"in your application, credit history contributed −0.4\".",
              ],
            }),
          ],
        }),
        lesson({
          slug: "veri-kaymasi-ve-izleme",
          title: L("Veri kayması ve model izleme", "Data drift and model monitoring"),
          summary: L(
            "Bugün çalışan model altı ay sonra neden bozulur — ve bunu nasıl önceden görürsün?",
            "Why does a model that works today break in six months — and how do you see it coming?",
          ),
          minutes: 20,
          blocks: [
            text(
              "Model, eğitildiği dünyayı öğrenir. Dünya değişirse model **sessizce** bozulur — hata mesajı vermez, sadece yanlış tahmin etmeye başlar. Üç tür kayma vardır:\n\n- **Veri kayması (data drift)** — Girdi dağılımı değişir. Yeni bir pazarlama kampanyası tamamen farklı bir müşteri profili getirir; model bu profili hiç görmemiştir.\n- **Kavram kayması (concept drift)** — Girdi ile çıktı arasındaki **ilişki** değişir. Pandemide \"evden alışveriş\" davranışı normalleşti; eskiden anormal sayılan desen artık normaldi.\n- **Etiket gecikmesi** — Gerçeği çok sonra öğrenirsin. Bir müşterinin gerçekten ayrılıp ayrılmadığını 3 ay sonra bilirsin; o zamana kadar modelin ne kadar iyi olduğunu ölçemezsin.",
              "A model learns the world it was trained on. When the world changes, the model breaks **silently** — no error message, it just starts predicting wrongly. There are three kinds of drift:\n\n- **Data drift** — the input distribution changes. A new marketing campaign brings a completely different customer profile the model has never seen.\n- **Concept drift** — the **relationship** between input and output changes. During the pandemic \"shopping from home\" became normal; a pattern once flagged as anomalous no longer was.\n- **Label delay** — you learn the truth much later. You know whether a customer really churned three months on; until then you cannot measure how good the model is.",
            ),
            text(
              "**İzlenmesi gereken dört şey — bu sırayla:**\n\n1. **Girdi dağılımları** — Her özelliğin ortalaması, medyanı ve eksik oranı eğitim verisine göre nasıl? Bu, etiket beklemeden ölçebildiğin **tek** şeydir ve bu yüzden en değerlidir.\n2. **Tahmin dağılımı** — Model eskiden %5 \"ayrılır\" derken şimdi %30 diyorsa, bir şey değişmiştir. Etikete ihtiyaç duymadan alarm verir.\n3. **Performans metrikleri** — Etiket geldiğinde gerçek doğruluk. En kesin ama en gecikmeli sinyal.\n4. **İş metrikleri** — Modelin var olma sebebi. Tahmin doğruluğu aynı kalsa bile kâr düşüyorsa bir sorun var.\n\nPratik kural: **girdi kaymasını izle, performansı bekle.** Girdi kayması, performans düşüşünün erken habercisidir.",
              "**Four things to monitor, in this order:**\n\n1. **Input distributions** — how does each feature's mean, median and missing rate compare with the training data? This is the **only** thing you can measure without waiting for labels, which makes it the most valuable.\n2. **Prediction distribution** — if the model used to say \"churn\" 5% of the time and now says 30%, something has changed. It raises an alarm with no labels needed.\n3. **Performance metrics** — real accuracy once labels arrive. The most precise but most delayed signal.\n4. **Business metrics** — the reason the model exists. If profit falls while prediction accuracy holds, something is wrong.\n\nA practical rule: **monitor input drift, wait for performance.** Input drift is the early warning of a performance drop.",
            ),
            info(
              "Yeniden eğitim planını baştan yap",
              "Plan retraining from the start",
              "Model üretime alınırken şu üç soruya yazılı cevap vermelisin:\n\n1. **Ne sıklıkla yeniden eğitilecek?** Sabit takvim (her ay) mı, tetikleyiciye bağlı (kayma tespit edilince) mi?\n2. **Yeni model eskisiyle nasıl karşılaştırılacak?** Otomatik olarak mı yayına alınacak, yoksa onaydan mı geçecek?\n3. **Kötüleşirse ne olacak?** Eski sürüme dönüş yolu hazır mı?\n\nBu soruları modeli yazarken cevaplamak on dakika sürer; altı ay sonra kriz anında cevaplamak günler sürer.",
              "When a model goes to production you should have written answers to three questions:\n\n1. **How often will it be retrained?** On a fixed schedule (monthly) or triggered (when drift is detected)?\n2. **How will the new model be compared with the old?** Deployed automatically, or after review?\n3. **What happens if it gets worse?** Is the path back to the previous version ready?\n\nAnswering these while writing the model takes ten minutes; answering them six months later in the middle of an incident takes days.",
            ),
            quiz({
              id: "q1",
              q: [
                "Müşteri kaybı modelinin gerçek doğruluğunu ancak 3 ay sonra ölçebiliyorsun. Bu arada neyi izlemelisin?",
                "You can only measure your churn model's true accuracy three months later. What should you monitor meanwhile?",
              ],
              options: [
                [
                  "Girdi özelliklerinin ve tahmin dağılımının eğitim verisinden sapmasını",
                  "How far the input features and prediction distribution drift from the training data",
                ],
                ["Hiçbir şey; etiketleri beklemek gerekir", "Nothing; you have to wait for the labels"],
                ["Modelin eğitim doğruluğunu", "The model's training accuracy"],
                ["Kod kalitesini", "Code quality"],
              ],
              answer: 0,
              explain: [
                "Etiket gecikmesi olan sistemlerde girdi izleme tek erken uyarıdır. Girdi dağılımı eğitimdekine benziyorsa modelin hâlâ makul çalıştığını varsayabilirsin; belirgin şekilde saptıysa, performans ölçümünü beklemeden müdahale edebilirsin.",
                "In systems with label delay, input monitoring is the only early warning. If the input distribution still resembles training data you can assume the model is behaving sensibly; if it has clearly drifted you can intervene without waiting for the performance measurement.",
              ],
            }),
          ],
        }),
        lesson({
          slug: "adalet-ve-etik",
          title: L("Adalet, önyargı ve etik", "Fairness, bias and ethics"),
          summary: L(
            "Model geçmişi öğrenir. Geçmiş adaletsizse model de adaletsiz olur.",
            "A model learns the past. If the past was unfair, so is the model.",
          ),
          minutes: 20,
          blocks: [
            text(
              "Makine öğrenmesi modelleri geçmiş verideki desenleri öğrenir — **iyi ya da kötü.** Geçmişte belirli bir gruba sistematik olarak daha az kredi verilmişse, model bunu \"o grup daha risklidir\" diye öğrenir ve ayrımcılığı **ölçeklendirerek** sürdürür.\n\nBunun ünlü örnekleri var: bir teknoloji şirketinin işe alım modeli, geçmiş verideki erkek ağırlığı yüzünden kadın adayların özgeçmişlerini sistematik olarak düşük puanladı ve model kullanımdan kaldırıldı.\n\n**Kritik nokta:** hassas özelliği (cinsiyet, etnisite) modelden **çıkarmak yetmez.** Model onu vekil değişkenlerden yeniden öğrenir — semt, okul, isim, hatta alışveriş deseni bu bilgiyi taşır.",
              "Machine learning models learn the patterns in historical data — **good and bad alike.** If a particular group was systematically given less credit in the past, the model learns that as \"this group is riskier\" and perpetuates the discrimination **at scale**.\n\nThere are famous examples: one technology company's hiring model systematically scored women's CVs lower because of the male skew in its historical data, and the model was withdrawn.\n\n**The critical point:** **removing** the sensitive attribute (gender, ethnicity) from the model is not enough. The model relearns it from proxies — neighbourhood, school, name, even shopping patterns carry that information.",
            ),
            text(
              "**Adalet ölçütleri — ve neden hepsini birden sağlayamazsın:**\n\n- **Demografik eşitlik** — Her grupta pozitif tahmin oranı aynı olsun\n- **Eşit fırsat** — Gerçekten uygun olanlar arasında kabul oranı her grupta aynı olsun (eşit recall)\n- **Kalibrasyon** — \"%70 risk\" dendiğinde her grupta gerçekten %70 çıksın\n\nMatematiksel olarak kanıtlanmış bir sonuç var: **grupların temel oranları farklıysa bu ölçütler aynı anda sağlanamaz.** Birini seçmek zorundasın ve bu seçim teknik değil **etik ve hukuki** bir karardır — veri bilimcinin tek başına vereceği bir karar değildir.",
              "**Fairness criteria — and why you cannot satisfy them all at once:**\n\n- **Demographic parity** — the rate of positive predictions is the same in every group\n- **Equal opportunity** — among those genuinely qualified, the acceptance rate is the same in every group (equal recall)\n- **Calibration** — when the model says \"70% risk\", it really is 70% in every group\n\nThere is a mathematically proven result: **when the groups have different base rates, these criteria cannot all hold simultaneously.** You must pick one, and that choice is not technical but **ethical and legal** — not a decision for the data scientist alone.",
            ),
            text(
              "**Pratik kontrol listesi — her modelde:**\n\n1. **Eğitim verisi kimi temsil ediyor, kimi dışlıyor?** Veri hangi dönemden, hangi coğrafyadan, hangi kanaldan geliyor?\n2. **Performansı alt gruplara ayırarak ölç.** Toplam %85 doğruluk, bir grupta %92 diğerinde %61 olabilir — toplam sayı bunu gizler.\n3. **Hata maliyeti kimin üzerinde?** Yanlış pozitifin bedelini şirket mi, kullanıcı mı ödüyor?\n4. **Karar geri alınabilir mi?** İnsan itiraz edebiliyor mu, bir insana ulaşabiliyor mu?\n5. **Bu modeli kendi ailene uygulamak ister miydin?** Basit ama şaşırtıcı derecede iyi çalışan bir sınama.",
              "**A practical checklist for every model:**\n\n1. **Who does the training data represent, and who does it exclude?** Which period, which geography, which channel did it come from?\n2. **Measure performance broken down by subgroup.** An overall 85% accuracy may be 92% in one group and 61% in another — the aggregate hides it.\n3. **Who bears the cost of an error?** Does the company or the user pay for a false positive?\n4. **Is the decision reversible?** Can a person appeal, can they reach a human?\n5. **Would you be happy for this model to be applied to your own family?** A simple test that works surprisingly well.",
            ),
            quiz({
              id: "q1",
              q: [
                "Modelden cinsiyet sütununu çıkardın ama model hâlâ cinsiyete göre farklı davranıyor. Neden?",
                "You removed the gender column, yet the model still behaves differently by gender. Why?",
              ],
              options: [
                [
                  "Diğer özellikler cinsiyet bilgisini dolaylı olarak taşıyor (vekil değişkenler)",
                  "Other features carry gender information indirectly (proxy variables)",
                ],
                ["Model hatalı eğitilmiş", "The model was trained incorrectly"],
                ["Sütun tam silinmemiş", "The column was not fully deleted"],
                ["Bu mümkün değil", "This is not possible"],
              ],
              answer: 0,
              explain: [
                "Meslek, okul, harcama kategorileri, hatta ad gibi özellikler cinsiyetle korelasyonludur ve model bu bilgiyi onlardan çıkarır. Bu yüzden adaleti sağlamanın yolu hassas sütunu silmek değil, sonuçları alt gruplara ayırarak **ölçmek** ve gerekirse modeli açıkça kısıtlamaktır.",
                "Features like occupation, school, spending categories and even a first name correlate with gender, and the model recovers the information from them. This is why the route to fairness is not deleting the sensitive column but **measuring** outcomes by subgroup and, where necessary, constraining the model explicitly.",
              ],
            }),
          ],
        }),
      ],
    },
  ],
};
