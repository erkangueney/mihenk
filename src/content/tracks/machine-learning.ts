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
            quiz({
              id: "q2",
              q: [
                "Aşağıdakilerden hangisi metinde geçen, makine öğrenmesinin işe yaradığı üç koşuldan biri DEĞİLDİR?",
                "Which of the following is NOT one of the three conditions the lesson gives for machine learning to pay off?",
              ],
              options: [
                [
                  "Verinin hatasız ve eksiksiz olması",
                  "The data being error-free and complete",
                ],
                ["Desen var ama kurala dökülemiyor", "A pattern exists but cannot be expressed as a rule"],
                ["Bol örnek var", "Plenty of examples exist"],
                ["Kesin doğruluk şart değil", "Perfect accuracy is not required"],
              ],
              answer: 0,
              explain: [
                "Metinde sayılan üç koşul desenin varlığı, örnek bolluğu ve mükemmellik gerekmemesidir. Verinin kusursuz olması hiç sayılmaz — zaten gerçek veri neredeyse hiçbir zaman kusursuz değildir.",
                "The three listed conditions are the existence of a pattern, plenty of examples, and not needing perfection. Flawless data is never listed — real data is almost never flawless anyway.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir kedi fotoğrafını kelimelerle tam olarak tanımlamanın zor olması hangi koşula örnektir?",
                "Why is it hard to describe a cat photo in words a good example of which condition?",
              ],
              options: [
                ["Desen var ama kurala dökülemiyor", "A pattern exists but cannot be expressed as a rule"],
                ["Bol örnek var", "Plenty of examples exist"],
                ["Kesin doğruluk şart değil", "Perfect accuracy is not required"],
                ["Etiketli veri gerekmiyor", "Labelled data is not needed"],
              ],
              answer: 0,
              explain: [
                "Bir kediyi görünce tanırsın ama bunu adım adım kurallara dökemezsin — tam da modelin, senin yazamadığın deseni örneklerden çıkardığı durum budur.",
                "You recognise a cat instantly but cannot break that down into step-by-step rules — this is exactly the case where a model extracts from examples the pattern you cannot write down.",
              ],
            }),
            pitfall(
              "Çoğu problem makine öğrenmesi istemez",
              "Most problems do not want machine learning",
              "\"KDV'yi hesapla\" bir kuraldır, model değil. \"Stok 10'un altına inince uyar\" bir kuraldır. Bunları modelle çözmek, hem gereksiz karmaşıklık hem daha kötü sonuç demektir — çünkü kural %100 doğrudur, model olmayacaktır.\n\nSoru şu: **kuralı yazabiliyor musun?** Yazabiliyorsan yaz. Makine öğrenmesi, kuralı yazamadığın veya kuralın çok fazla istisna içerdiği durumlar için vardır.",
              "\"Compute the VAT\" is a rule, not a model. \"Alert when stock drops below 10\" is a rule. Solving these with a model means both needless complexity and worse results — because the rule is 100% correct and the model will not be.\n\nThe question is: **can you write the rule?** If you can, write it. Machine learning exists for cases where you cannot, or where the rule would carry too many exceptions.",
            ),
            quiz({
              id: "q4",
              q: [
                "\"KDV'yi hesapla\" örneğini makine öğrenmesiyle çözmek neden anlamsızdır?",
                "Why does it make no sense to solve \"compute the VAT\" with machine learning?",
              ],
              options: [
                [
                  "Zaten %100 doğru bir kural olarak yazılabilir; model bunu geçemez",
                  "It can already be written as a 100%-correct rule, which a model cannot beat",
                ],
                ["Çünkü çok fazla veri gerekir", "Because it needs too much data"],
                ["Çünkü KDV oranları gizlidir", "Because VAT rates are confidential"],
                ["Çünkü hesaplama çok yavaş olur", "Because the calculation would be too slow"],
              ],
              answer: 0,
              explain: [
                "Kural %100 doğrudur; bir model bunu yalnızca yaklaşık tahmin edebilir. Kuralı yazabildiğin her yerde model kurmak gereksiz karmaşıklık ve daha kötü sonuç demektir.",
                "The rule is 100% correct; a model can only approximate it. Wherever you can write the rule, building a model instead means needless complexity and a worse result.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Pitfall metnine göre \"kuralı yazabiliyor musun?\" sorusunun cevabı \"evet\" ise ne yapmalısın?",
                "According to the pitfall block, if the answer to \"can you write the rule?\" is yes, what should you do?",
              ],
              options: [
                ["Kuralı yaz — makine öğrenmesine gerek yok", "Write the rule — you do not need machine learning"],
                ["Yine de bir model eğit, daha güvenli olur", "Train a model anyway, it is safer"],
                ["Hem kuralı yaz hem modeli eğit", "Write the rule and train a model"],
                ["Kuralı yazma, veri toplamaya başla", "Do not write the rule, start collecting data instead"],
              ],
              answer: 0,
              explain: [
                "Metin açık: \"Yazabiliyorsan yaz.\" Makine öğrenmesi yalnızca kuralı yazamadığın veya kuralın çok fazla istisna taşıdığı durumlar için vardır.",
                "The lesson is explicit: \"if you can, write it.\" Machine learning exists only for cases where you cannot write the rule, or where it would carry too many exceptions.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "\"Bu ev kaça satılır?\" sorusu hangi öğrenme türüdür?",
                "\"What will this house sell for?\" is which kind of problem?",
              ],
              options: [
                ["Denetimli öğrenme — regresyon", "Supervised learning — regression"],
                ["Denetimli öğrenme — sınıflandırma", "Supervised learning — classification"],
                ["Denetimsiz öğrenme — kümeleme", "Unsupervised learning — clustering"],
                ["Pekiştirmeli öğrenme", "Reinforcement learning"],
              ],
              answer: 0,
              explain: [
                "Cevap bir kategori değil bir sayıdır (fiyat), bu yüzden regresyondur. Geçmiş satış fiyatlarını bildiğin için de denetimlidir.",
                "The answer is a number (a price), not a category, so it is regression. And because you know past sale prices, it is supervised.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Benzer müşterileri gruplara ayırmak (müşteri segmentleri bulmak) hangi öğrenme türüne girer?",
                "Grouping similar customers into segments falls under which kind of learning?",
              ],
              options: [
                ["Denetimsiz öğrenme — kümeleme", "Unsupervised learning — clustering"],
                ["Denetimli öğrenme — sınıflandırma", "Supervised learning — classification"],
                ["Denetimli öğrenme — regresyon", "Supervised learning — regression"],
                ["Pekiştirmeli öğrenme", "Reinforcement learning"],
              ],
              answer: 0,
              explain: [
                "Burada doğru cevap yoktur — kimin hangi gruba ait olduğunu önceden bilmiyorsun, model yapıyı kendisi keşfeder. Bu denetimsiz öğrenmenin tanımıdır.",
                "There is no correct answer here — you do not know in advance who belongs to which group; the model discovers the structure itself. That is the definition of unsupervised learning.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Anormallik tespiti (anomaly detection) metne göre hangi öğrenme türüne örnektir?",
                "According to the lesson, anomaly detection is an example of which kind of learning?",
              ],
              options: [
                ["Denetimsiz öğrenme", "Unsupervised learning"],
                ["Denetimli öğrenme", "Supervised learning"],
                ["Pekiştirmeli öğrenme", "Reinforcement learning"],
                ["Bunların hiçbiri, ayrı bir kategoridir", "None of these, it is a separate category"],
              ],
              answer: 0,
              explain: [
                "Metin, anomali tespitini kümelemeyle birlikte denetimsiz öğrenmenin örnekleri arasında sayar: sıra dışı işlemleri, önceden etiketlenmiş \"doğru cevap\" olmadan yapı içinden bulursun.",
                "The lesson lists anomaly detection alongside clustering as an example of unsupervised learning: you flag unusual cases from the structure itself, without a pre-labelled \"correct answer\".",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Oyun oynayan veya robot yönlendiren sistemler hangi öğrenme türünü kullanır ve veri analizinde ne sıklıkla kullanılır?",
                "Systems that play games or steer robots use which kind of learning, and how often is it used in data analytics?",
              ],
              options: [
                ["Pekiştirmeli öğrenme; veri analizinde nadiren kullanılır", "Reinforcement learning; rarely used in data analytics"],
                ["Denetimli öğrenme; veri analizinde çok sık kullanılır", "Supervised learning; very commonly used in data analytics"],
                ["Denetimsiz öğrenme; hiç kullanılmaz", "Unsupervised learning; never used"],
                ["Pekiştirmeli öğrenme; her veri analizi projesinde zorunludur", "Reinforcement learning; mandatory in every data analytics project"],
              ],
              answer: 0,
              explain: [
                "Metin açıkça belirtir: pekiştirmeli öğrenme deneme-yanılma ve ödülle çalışır, oyun/robotik gibi alanlarda kullanılır ve veri analizinde nadirdir.",
                "The lesson states this directly: reinforcement learning works by trial, error and reward, is used in areas like games and robotics, and is rare in data analytics.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bir e-postanın spam olup olmadığını tahmin etmek hangi öğrenme türüdür?",
                "Predicting whether an email is spam is which kind of learning problem?",
              ],
              options: [
                ["Denetimli öğrenme — sınıflandırma", "Supervised learning — classification"],
                ["Denetimli öğrenme — regresyon", "Supervised learning — regression"],
                ["Denetimsiz öğrenme", "Unsupervised learning"],
                ["Pekiştirmeli öğrenme", "Reinforcement learning"],
              ],
              answer: 0,
              explain: [
                "Metinde bu tam olarak sınıflandırma örneği olarak verilir: cevap iki kategoriden biridir (spam / spam değil) ve geçmiş e-postaların etiketi bilinir.",
                "The lesson gives this exact example for classification: the answer is one of two categories (spam / not spam) and the labels of past emails are known.",
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
            quiz({
              id: "q2",
              q: [
                "Bir müşteri kaybı modelinde \"ayrıldı mı?\" sütunu X mi, y mi?",
                "In a churn model, is the \"did they leave?\" column X or y?",
              ],
              options: [
                ["y — çünkü tahmin etmesini istediğimiz etikettir", "y — because it is the label we want predicted"],
                ["X — çünkü modelin girdisidir", "X — because it is the model's input"],
                ["Ne X ne y, ayrı bir sütundur", "Neither X nor y, it is a separate column"],
                ["İkisi de olabilir, fark etmez", "It could be either, it does not matter"],
              ],
              answer: 0,
              explain: [
                "Etiket (y), modelin tahmin etmeyi öğrendiği sütundur. Yaş, harcama, şehir gibi girdi sütunları X'i oluşturur; \"ayrıldı mı?\" ise tahmin hedefi olduğu için y'dir.",
                "The label (y) is the column the model learns to predict. Input columns like age, spend and city form X; \"did they leave?\" is the prediction target, so it is y.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre model başarısını en çok ne belirler?",
                "According to the lesson, what matters most for a model's success?",
              ],
              options: [
                ["Özellik seçimi — model seçiminden daha önemlidir", "Feature choice — it matters more than model choice"],
                ["Model seçimi — özellik seçiminden daha önemlidir", "Model choice — it matters more than feature choice"],
                ["Yalnızca eğitim süresi", "Training time alone"],
                ["Yalnızca donanım gücü", "Hardware power alone"],
              ],
              answer: 0,
              explain: [
                "Metin açık: iyi özelliklerle basit bir model, kötü özelliklerle karmaşık bir modeli neredeyse her zaman yener. Bu yüzden zaman genelde özellik kalitesine yatırılmalı.",
                "The lesson is explicit: a simple model with good features almost always beats a complex model with bad ones. Time is usually better invested in feature quality.",
              ],
            }),
            text(
              "**Eğitim-test ayrımı**, makine öğrenmesinin en temel kuralıdır. Veriyi ikiye bölersin:\n\n- **Eğitim kümesi (%70-80)** — model bunu görerek öğrenir\n- **Test kümesi (%20-30)** — model bunu **hiç görmez**; başarıyı burada ölçersin\n\nNeden? Çünkü bir modeli gördüğü veri üzerinde sınamak, öğrencinin sınavda tam olarak çalıştığı soruları sormak gibidir. Yüksek not alır ama hiçbir şey öğrenmemiş olabilir — sadece ezberlemiştir.\n\nGerçek soru şudur: model **daha önce görmediği** veride ne kadar iyi? Buna **genelleme** denir ve makine öğrenmesinin tek amacı budur.",
              "**The train/test split** is machine learning's most fundamental rule. You divide the data in two:\n\n- **Training set (70-80%)** — the model learns by looking at this\n- **Test set (20-30%)** — the model **never sees this**; you measure performance here\n\nWhy? Because testing a model on data it has already seen is like giving a student exactly the questions they revised. They score highly but may have learned nothing — they merely memorised.\n\nThe real question is: how good is the model on data it has **never seen**? This is called **generalisation**, and it is the only goal of machine learning.",
            ),
            quiz({
              id: "q4",
              q: [
                "Test kümesini modelden neden tamamen saklarız?",
                "Why do we hide the test set from the model entirely?",
              ],
              options: [
                [
                  "Görmediği veride ne kadar başarılı olduğunu (genellemeyi) ölçmek için",
                  "To measure how well it performs on data it has never seen (generalisation)",
                ],
                ["Eğitim süresini kısaltmak için", "To shorten training time"],
                ["Modelin bellek kullanımını azaltmak için", "To reduce the model's memory usage"],
                ["Test kümesi zaten kullanılamaz durumdadır", "Because the test set is unusable anyway"],
              ],
              answer: 0,
              explain: [
                "Gördüğü veride sınamak, öğrenciyi tam çalıştığı sorularla sınamak gibidir — yüksek not alır ama bir şey öğrenmemiş olabilir. Gerçek başarı ancak hiç görmediği veride ölçülür.",
                "Testing on data it has seen is like examining a student on exactly the questions they revised — a high score that may reflect nothing learned. Real performance can only be measured on unseen data.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metindeki \"genelleme\" (generalisation) kavramı neyi ifade eder?",
                "What does the lesson's concept of \"generalisation\" refer to?",
              ],
              options: [
                [
                  "Modelin daha önce görmediği veride ne kadar iyi tahmin yaptığı",
                  "How well the model predicts on data it has never seen",
                ],
                ["Modelin eğitim verisindeki doğruluğu", "The model's accuracy on the training data"],
                ["Modelin kaç özellik kullandığı", "How many features the model uses"],
                ["Modelin eğitim süresi", "How long the model takes to train"],
              ],
              answer: 0,
              explain: [
                "Metin genellemeyi makine öğrenmesinin tek amacı olarak tanımlar: modelin görmediği veride ne kadar iyi olduğu. Eğitim verisindeki başarı bunun bir göstergesi bile değildir.",
                "The lesson defines generalisation as the sole goal of machine learning: how good the model is on data it has not seen. Success on the training data is not even an indicator of this.",
              ],
            }),
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
            quiz({
              id: "q6",
              q: [
                "Koddaki `random_state=42` parametresinin amacı nedir?",
                "What is the purpose of `random_state=42` in the code?",
              ],
              options: [
                [
                  "Bölmeyi tekrarlanabilir yapmak — kod her çalıştığında aynı bölme çıksın",
                  "To make the split reproducible — the same split every time the code runs",
                ],
                ["Test kümesini büyütmek", "To enlarge the test set"],
                ["Modelin doğruluğunu artırmak", "To increase the model's accuracy"],
                ["Sınıf oranlarını dengelemek", "To balance the class proportions"],
              ],
              answer: 0,
              explain: [
                "`train_test_split` veriyi rastgele karıştırır. `random_state` olmadan her çalıştırmada farklı bir bölme çıkar ve sonuçlar karşılaştırılamaz olur; sabit bir değer aynı bölmeyi garanti eder.",
                "`train_test_split` shuffles the data randomly. Without `random_state`, each run produces a different split and results become incomparable; a fixed value guarantees the same split every time.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`test_size=0.2` yerine `test_size=0.05` kullanırsan ne olur?",
                "What happens if you use `test_size=0.05` instead of `test_size=0.2`?",
              ],
              options: [
                [
                  "Eğitim için daha çok veri kalır ama test kümesi küçüldüğü için başarı ölçümü daha az güvenilir olur",
                  "More data is left for training, but the smaller test set makes the performance measurement less reliable",
                ],
                ["Model otomatik olarak daha doğru olur", "The model automatically becomes more accurate"],
                ["Aşırı öğrenme tamamen ortadan kalkar", "Overfitting disappears entirely"],
                ["Hiçbir şey değişmez", "Nothing changes"],
              ],
              answer: 0,
              explain: [
                "Test kümesi küçüldükçe ondan çıkan puan az sayıda örneğe dayanır ve şansa daha bağımlı hâle gelir. %20-30 aralığı, eğitim verisini fazla azaltmadan güvenilir bir ölçüm arasında bir denge kurar.",
                "A smaller test set means the resulting score rests on fewer examples and becomes more a matter of luck. The 20-30% range balances a reliable measurement against not starving the training set.",
              ],
            }),
            pitfall(
              "Test kümesine sızıntı en yaygın ölümcül hatadır",
              "Leaking into the test set is the most common fatal error",
              "Test kümesi kutsal olmalıdır. En sık yapılan sızıntı hataları:\n\n- **Ölçeklemeyi bölmeden önce yapmak** — tüm verinin ortalamasını kullanarak normalleştirirsen, test kümesinin bilgisi eğitime karışır. Ölçekleyiciyi **yalnızca eğitimde** eğitip teste uygula.\n- **Zaman serisinde rastgele bölmek** — geleceği görüp geçmişi tahmin etmek olur. Zaman verisinde bölme **tarihe göre** yapılır.\n- **Test kümesine bakarak model seçmek** — testi 20 kez deneyip en iyisini seçerseniz, test kümesi artık bağımsız değildir. Bunun için ayrı bir **doğrulama kümesi** vardır.",
              "The test set must be sacred. The most common leakage mistakes:\n\n- **Scaling before splitting** — normalising with the mean of all the data mixes test-set information into training. Fit the scaler **on the training set only**, then apply it to the test set.\n- **Splitting time series randomly** — that amounts to seeing the future to predict the past. Time-based data must be split **by date**.\n- **Choosing a model by looking at the test set** — try the test set 20 times and pick the best, and it is no longer independent. That is what a separate **validation set** is for.",
            ),
            quiz({
              id: "q8",
              q: [
                "Ölçekleyiciyi (scaler) bölmeden önce tüm veriye `fit` etmek neden bir sızıntıdır?",
                "Why is fitting a scaler on all the data before splitting a form of leakage?",
              ],
              options: [
                [
                  "Test kümesinin ortalama/varyans bilgisi eğitime karışır",
                  "The test set's mean/variance information mixes into training",
                ],
                ["Ölçekleme işlemi çok yavaşlar", "Scaling becomes too slow"],
                ["Sınıf oranları bozulur", "The class proportions get distorted"],
                ["Model artık çalışmaz", "The model no longer works"],
              ],
              answer: 0,
              explain: [
                "Ölçekleyici tüm veriden hesaplanan ortalama ve varyansı kullanır; bu değerler test kümesinin bilgisini taşır. Doğrusu ölçekleyiciyi yalnızca eğitim kümesinde `fit` edip test kümesine `transform` uygulamaktır.",
                "The scaler's mean and variance are computed from all the data, so they carry information from the test set. The correct order is to `fit` the scaler on the training set only, then `transform` the test set with it.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Zaman serisi verisini rastgele bölmek neden yanlıştır?",
                "Why is it wrong to split time-series data randomly?",
              ],
              options: [
                [
                  "Geleceği görüp geçmişi tahmin etmiş olursun",
                  "It amounts to seeing the future in order to predict the past",
                ],
                ["Rastgele bölme her zaman daha yavaştır", "Random splitting is always slower"],
                ["Zaman serisinde test kümesi gerekmez", "Time series does not need a test set"],
                ["Sadece stratify parametresi eksik kalır", "Only the stratify parameter would be missing"],
              ],
              answer: 0,
              explain: [
                "Rastgele bölme, eğitim kümesine gelecekteki tarihlerden satırlar sokabilir. Model, aslında bilemeyeceği geleceğe bakarak öğrenmiş olur. Zaman verisi daima **tarihe göre** bölünmelidir.",
                "A random split can put rows from future dates into the training set. The model then effectively learns by peeking at a future it could not really know. Time-based data must always be split **by date**.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Test kümesini 20 kez deneyip en iyi sonucu veren modeli seçmek neden sorunludur?",
                "Why is trying the test set 20 times and picking the best result a problem?",
              ],
              options: [
                [
                  "Test kümesi artık bağımsız değildir; onun için ayrı bir doğrulama kümesi kullanılmalıdır",
                  "The test set is no longer independent; a separate validation set should be used instead",
                ],
                ["Test kümesi otomatik olarak büyür", "The test set automatically grows"],
                ["Bu, sadece eğitim süresini uzatır", "This only makes training take longer"],
                ["Hiçbir sorun yoktur, en iyi sonuç güvenilirdir", "There is no problem, the best result is reliable"],
              ],
              answer: 0,
              explain: [
                "Test kümesine bakarak seçim yapmak, dolaylı olarak modeli o kümeye göre ayarlamak demektir — kümenin bağımsızlığı bozulur. Model seçimi için ayrı bir **doğrulama kümesi** kullanılmalı, test kümesi yalnızca en sonda bir kez görülmelidir.",
                "Choosing by looking at the test set indirectly tunes the model to that set — its independence is broken. Model selection should use a separate **validation set**; the test set should be looked at only once, at the very end.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Gerçek bir projede en çok zaman hangi adıma gider?",
                "In a real project, which stage consumes the most time?",
              ],
              options: [
                ["Veri toplamak ve temizlemek (%40)", "Collecting and cleaning data (40%)"],
                ["Model eğitmek ve ayarlamak (%10)", "Training and tuning (10%)"],
                ["Problemi tanımlamak (%10)", "Framing the problem (10%)"],
                ["Değerlendirme ve yayına alma (%15)", "Evaluation and deployment (15%)"],
              ],
              answer: 0,
              explain: [
                "Metindeki dağılıma göre veri toplama ve temizleme en büyük payı (%40) alır — eksik değerler, tutarsız kayıtlar, birleştirme ve doğrulama zaman ister.",
                "Per the lesson's breakdown, collecting and cleaning data takes the biggest share (40%) — missing values, inconsistent records, joins and validation all take time.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Yeni başlayanların \"asıl makine öğrenmesi\" sandığı model eğitme ve ayarlama adımı gerçekte projenin ne kadarını kaplar?",
                "The training-and-tuning step beginners think of as \"the real machine learning\" actually takes up how much of the project?",
              ],
              options: [
                ["%10 — en kısa adım", "10% — the shortest step"],
                ["%40 — en uzun adım", "40% — the longest step"],
                ["%60 — projenin çoğu", "60% — most of the project"],
                ["%90 — neredeyse tamamı", "90% — almost all of it"],
              ],
              answer: 0,
              explain: [
                "Metin tam olarak bunu vurgular: modeli eğitmek işin yalnızca %10'u, en kısa adımdır. Zamanın çoğu veri ve özellik mühendisliğine gider.",
                "This is exactly the lesson's point: training the model is only 10% of the work, the shortest step. Most of the time goes into data and feature engineering.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Metne göre bir ML projesinde en pahalı hata hangisidir?",
                "According to the lesson, what is the costliest mistake in an ML project?",
              ],
              options: [
                [
                  "Problemi tanımlama adımını atlamak",
                  "Skipping the problem-framing step",
                ],
                ["Modeli çok uzun eğitmek", "Training the model for too long"],
                ["Çok fazla özellik kullanmak", "Using too many features"],
                ["Veriyi fazla temizlemek", "Cleaning the data too much"],
              ],
              answer: 0,
              explain: [
                "Metin açık: \"yanlış tanımlanmış bir problemin mükemmel modeli işe yaramaz.\" İlk adımı atlamak, sonraki tüm adımların yanlış hedefe çalışmasına yol açar.",
                "The lesson is explicit: \"a perfect model of a badly framed problem is useless.\" Skipping the first step means every later step optimises for the wrong target.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "\"Problemi tanımlamak\" adımında hangi sorular cevaplanır?",
                "What questions does the \"framing the problem\" step answer?",
              ],
              options: [
                [
                  "Neyi tahmin edeceğiz, başarı nasıl ölçülecek, tahmin nasıl kullanılacak",
                  "What are we predicting, how is success measured, how will the prediction be used",
                ],
                ["Hangi model kütüphanesi kullanılacak", "Which model library will be used"],
                ["Hangi hiperparametreler denenecek", "Which hyperparameters will be tried"],
                ["Sunucu ne kadar RAM'e sahip olmalı", "How much RAM the server needs"],
              ],
              answer: 0,
              explain: [
                "Metin bu adımı tam olarak bu üç soruyla tanımlar. Model veya hiperparametre seçimi çok daha sonraki, çok daha küçük paya sahip adımlardır.",
                "The lesson defines this step with exactly these three questions. Model or hyperparameter choice belongs to much later steps with a much smaller share of the time.",
              ],
            }),
            info(
              "Her zaman bir taban çizgisi kur",
              "Always build a baseline",
              "Karmaşık bir modele başlamadan önce en aptal çözümü dene ve puanını yaz:\n\n- Sınıflandırmada: \"her zaman en sık görülen sınıfı tahmin et\"\n- Regresyonda: \"her zaman ortalamayı tahmin et\"\n- Zaman serisinde: \"yarın bugünle aynı olacak\"\n\nBu taban çizgisi senin referansın olur. Modelin %85 doğruluk verdi diye sevinirken, veride sınıfların %85'i zaten aynıysa modelin hiçbir şey öğrenmemiş demektir. Bu kontrolü yapmayan ekipler aylarca değersiz modeller sunar.",
              "Before starting on a complex model, try the dumbest solution and write down its score:\n\n- Classification: \"always predict the most frequent class\"\n- Regression: \"always predict the mean\"\n- Time series: \"tomorrow will be the same as today\"\n\nThat baseline becomes your reference. If you are pleased your model hit 85% accuracy but 85% of the data is already one class, your model has learned nothing. Teams that skip this check present worthless models for months.",
            ),
            quiz({
              id: "q6",
              q: [
                "Sınıflandırma problemlerinde önerilen taban çizgisi (baseline) nedir?",
                "What is the recommended baseline for classification problems?",
              ],
              options: [
                ["Her zaman en sık görülen sınıfı tahmin et", "Always predict the most frequent class"],
                ["Her zaman ortalamayı tahmin et", "Always predict the mean"],
                ["Yarın bugünle aynı olacak de", "Say tomorrow will be the same as today"],
                ["Rastgele bir sınıf seç", "Pick a random class"],
              ],
              answer: 0,
              explain: [
                "Metin sınıflandırma için bu taban çizgiyi önerir: en sık sınıfı her zaman tahmin etmek. Modelin bunu geçemiyorsa hiçbir şey öğrenmemiş demektir.",
                "The lesson gives this baseline for classification: always predicting the most frequent class. If your model cannot beat it, it has learned nothing.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Regresyon problemlerinde önerilen taban çizgisi nedir?",
                "What is the recommended baseline for regression problems?",
              ],
              options: [
                ["Her zaman ortalamayı tahmin et", "Always predict the mean"],
                ["Her zaman en sık görülen sınıfı tahmin et", "Always predict the most frequent class"],
                ["Yarın bugünle aynı olacak de", "Say tomorrow will be the same as today"],
                ["Sıfır tahmin et", "Predict zero"],
              ],
              answer: 0,
              explain: [
                "Regresyonda taban çizgisi ortalamayı tahmin etmektir. Model bu basit tahminden daha iyi sonuç vermiyorsa değişkenler arasında öğrenilebilir bir ilişki yakalayamamış demektir.",
                "The regression baseline is predicting the mean. If the model does no better than this simple guess, it has failed to capture any learnable relationship in the variables.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Zaman serisi problemlerinde önerilen taban çizgisi nedir?",
                "What is the recommended baseline for time-series problems?",
              ],
              options: [
                ["Yarın bugünle aynı olacak", "Tomorrow will be the same as today"],
                ["Her zaman ortalamayı tahmin et", "Always predict the mean"],
                ["Her zaman en sık görülen sınıfı tahmin et", "Always predict the most frequent class"],
                ["Geçen yılın aynı ayını tahmin et", "Predict the same month from last year"],
              ],
              answer: 0,
              explain: [
                "Zaman serisinde en aptal ama şaşırtıcı derecede güçlü taban çizgisi \"yarın bugünle aynı olacak\" varsayımıdır. Birçok karmaşık model bunu geçmekte zorlanır.",
                "For time series, the dumbest yet surprisingly strong baseline is assuming \"tomorrow will be the same as today\". Many complex models struggle to beat it.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Taban çizgisi (baseline) kurmanın asıl amacı nedir?",
                "What is the real purpose of building a baseline?",
              ],
              options: [
                [
                  "Modelin gerçekten bir şey öğrenip öğrenmediğini anlamak için bir referans noktası kurmak",
                  "To set a reference point for telling whether the model has actually learned anything",
                ],
                ["Modeli hızlandırmak", "To speed up the model"],
                ["Veri toplamayı bitirmiş saymak", "To consider data collection finished"],
                ["Hiperparametre aramayı atlamak", "To skip hyperparameter search"],
              ],
              answer: 0,
              explain: [
                "Baseline olmadan yüksek görünen bir puan (örneğin %85 doğruluk) yanıltıcı olabilir. Referans olmadan modelin gerçekten öğrenip öğrenmediğini ayırt edemezsin.",
                "Without a baseline, a score that looks high (say 85% accuracy) can be misleading. Without a reference you cannot tell whether the model has actually learned anything.",
              ],
            }),
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
            quiz({
              id: "q10",
              q: [
                "Taban çizgisi kontrolünü atlayan ekipler için metin ne söylüyor?",
                "What does the lesson say happens to teams that skip the baseline check?",
              ],
              options: [
                [
                  "Aylarca değersiz modeller sunarlar",
                  "They present worthless models for months",
                ],
                ["Modelleri her zaman daha hızlı olur", "Their models are always faster"],
                ["Hiçbir olumsuz sonuç olmaz", "There is no downside at all"],
                ["Veri temizleme adımını atlayabilirler", "They can skip the data-cleaning step"],
              ],
              answer: 0,
              explain: [
                "Metin uyarır: bu kontrolü yapmayan ekipler, yüksek görünen ama aslında hiçbir şey öğrenmemiş modelleri aylarca sunmaya devam edebilir — çünkü karşılaştıracak bir referansları yoktur.",
                "The lesson warns that teams skipping this check can keep presenting models that look good but have learned nothing, for months on end — because they have no reference to compare against.",
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
            quiz({
              id: "q2",
              q: [
                "PCA ile değişken sayısını azaltmak hangi kategoriye girer?",
                "Reducing the number of variables with PCA falls into which category?",
              ],
              options: [
                ["Denetimsiz öğrenme — boyut indirgeme", "Unsupervised learning — dimensionality reduction"],
                ["Denetimli öğrenme — sınıflandırma", "Supervised learning — classification"],
                ["Denetimli öğrenme — regresyon", "Supervised learning — regression"],
                ["Denetimsiz öğrenme — kümeleme", "Unsupervised learning — clustering"],
                ],
              answer: 0,
              explain: [
                "Metin PCA'yı boyut indirgemenin örneği olarak verir; etiket gerektirmeyen, yapıyı keşfeden bir denetimsiz öğrenme yöntemidir.",
                "The lesson gives PCA as the example of dimensionality reduction; it needs no labels and is an unsupervised technique for discovering structure.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Gelecek ay talep ne kadar olacak?\" sorusu hangi tür problemdir?",
                "\"What will next month's demand be?\" is which kind of problem?",
              ],
              options: [
                ["Denetimli öğrenme — regresyon", "Supervised learning — regression"],
                ["Denetimli öğrenme — sınıflandırma", "Supervised learning — classification"],
                ["Denetimsiz öğrenme — kümeleme", "Unsupervised learning — clustering"],
                ["Denetimsiz öğrenme — anomali tespiti", "Unsupervised learning — anomaly detection"],
              ],
              answer: 0,
              explain: [
                "Metinde \"gelecek ay talep\" doğrudan regresyon örneği olarak geçer — tahmin edilen şey bir sayıdır, kategori değildir.",
                "The lesson gives \"next month's demand\" directly as a regression example — the thing being predicted is a number, not a category.",
              ],
            }),
            info(
              "Önce basit çözümü dene",
              "Try the simple solution first",
              "Bir problemi çözmenin en iyi yolu genellikle makine öğrenmesi **değildir**. \"Son 90 gündür giriş yapmayan müşteri risklidir\" kuralı, çoğu zaman bir modelin yapacağı işin %80'ini sıfır bakım maliyetiyle yapar. Model kurmadan önce daima basit kural referansını (baseline) ölç — modelin onu geçtiğini gösteremiyorsan model gereksizdir.",
              "The best way to solve a problem is often **not** machine learning. A rule like \"a customer who has not logged in for 90 days is at risk\" often does 80% of a model's job at zero maintenance cost. Always measure that simple baseline first — if your model cannot beat it, the model is not worth having.",
            ),
            quiz({
              id: "q4",
              q: [
                "\"Son 90 gündür giriş yapmayan müşteri risklidir\" örneği metinde neyi göstermek için verilmiştir?",
                "What does the \"a customer who has not logged in for 90 days is at risk\" example illustrate?",
              ],
              options: [
                [
                  "Basit bir kuralın çoğu zaman modelin işinin %80'ini sıfır maliyetle yapabildiğini",
                  "That a simple rule can often do 80% of a model's job at zero cost",
                ],
                ["Makine öğrenmesinin her zaman gerekli olduğunu", "That machine learning is always necessary"],
                ["90 günün evrensel bir eşik olduğunu", "That 90 days is a universal threshold"],
                ["Kuralların modellerden daha yavaş çalıştığını", "That rules run slower than models"],
              ],
              answer: 0,
              explain: [
                "Metin bunu, model kurmadan önce basit bir kuralın ne kadar iş gördüğünü ölçmenin önemini göstermek için verir — bakım maliyeti sıfırdır ve çoğu zaman yeterlidir.",
                "The lesson uses it to show why you should measure how much a simple rule already achieves before building a model — it has zero maintenance cost and is often good enough.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre model kurmadan önce ne yapmalısın?",
                "According to the lesson, what should you do before building a model?",
              ],
              options: [
                [
                  "Basit kural referansını (baseline) ölç",
                  "Measure the simple rule baseline",
                ],
                ["Doğrudan en karmaşık modeli dene", "Go straight to the most complex model available"],
                ["Tüm özellikleri sil", "Delete all the features"],
                ["Test kümesini eğitime dahil et", "Merge the test set into training"],
              ],
              answer: 0,
              explain: [
                "Metin açıkça söyler: \"model kurmadan önce daima basit kural referansını (baseline) ölç.\" Modelin bunu geçtiğini gösteremiyorsan model gereksizdir.",
                "The lesson states it plainly: \"always measure that simple baseline first.\" If you cannot show the model beats it, the model is not worth having.",
              ],
            }),
            text(
              "**Eğitim / test ayrımı** makine öğrenmesinin en temel disiplinidir. Model, gördüğü veriyi ezberleyebilir; gerçek başarıyı ancak **hiç görmediği** veride ölçebilirsin.",
              "The **train/test split** is the most basic discipline in ML. A model can memorise what it has seen; you can only measure real performance on data it has **never seen**.",
            ),
            quiz({
              id: "q6",
              q: [
                "Bir modeli sadece gördüğü veride sınamak neden yanıltıcıdır?",
                "Why is it misleading to test a model only on data it has already seen?",
              ],
              options: [
                [
                  "Model veriyi ezberlemiş olabilir; gerçek başarı ancak hiç görmediği veride ölçülür",
                  "The model may have memorised the data; real performance can only be measured on data it has never seen",
                ],
                ["Gördüğü veride test etmek yasaktır", "Testing on seen data is technically forbidden"],
                ["Bu, eğitimi yavaşlatır", "This slows down training"],
                ["Gördüğü veride test etmek imkânsızdır", "Testing on seen data is impossible"],
              ],
              answer: 0,
              explain: [
                "Model gördüğü veriyi ezberleyebilir. Bu yüzden metin, gerçek başarının ancak hiç görülmemiş veride ölçülebileceğini vurgular.",
                "A model can memorise what it has seen. That is why the lesson stresses that real performance can only be measured on data it has never encountered.",
              ],
            }),
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
              id: "q7",
              q: [
                "Koddaki `X = df.drop(columns=[\"ayrildi\"])` satırı ne yapar?",
                "What does `X = df.drop(columns=[\"ayrildi\"])` do in the code?",
              ],
              options: [
                [
                  "Etiket sütununu çıkararak geri kalan tüm sütunları özellik (X) yapar",
                  "It removes the label column, leaving the remaining columns as features (X)",
                ],
                ["Veri çerçevesini tamamen siler", "It deletes the whole dataframe"],
                ["Eksik değerleri doldurur", "It fills in missing values"],
                ["\"ayrildi\" sütununu ikiye böler", "It splits the \"ayrildi\" column in two"],
              ],
              answer: 0,
              explain: [
                "`drop` etiket sütununu (`ayrildi`) veri çerçevesinden çıkarır; geri kalan tüm sütunlar modelin göreceği özellikler (X) olur. Etiketin kendisi ayrı olarak `y`'ye atanır.",
                "`drop` removes the label column (`ayrildi`) from the dataframe; every remaining column becomes the features (X) the model will see. The label itself is assigned separately to `y`.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`classification_report(y_test, tahmin)` çağrısı ne üretir?",
                "What does the call `classification_report(y_test, tahmin)` produce?",
              ],
              options: [
                [
                  "Precision, recall, F1 gibi sınıflandırma metriklerini özetleyen bir rapor",
                  "A report summarising classification metrics such as precision, recall and F1",
                ],
                ["Modelin katsayılarını", "The model's coefficients"],
                ["Eksik değer sayısını", "The number of missing values"],
                ["Veri setinin boyutunu", "The size of the dataset"],
              ],
              answer: 0,
              explain: [
                "`classification_report`, gerçek etiketler (`y_test`) ile tahminleri (`tahmin`) karşılaştırarak her sınıf için precision, recall ve F1 gibi metrikleri özetler.",
                "`classification_report` compares the true labels (`y_test`) with the predictions (`tahmin`) and summarises metrics like precision, recall and F1 for each class.",
              ],
            }),
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
            quiz({
              id: "q9",
              q: [
                "Koddaki `model.fit(X_egitim, y_egitim)` satırı ne yapar?",
                "What does `model.fit(X_egitim, y_egitim)` do in the code?",
              ],
              options: [
                [
                  "Modeli yalnızca eğitim verisi üzerinde eğitir",
                  "It trains the model using only the training data",
                ],
                ["Modeli test verisi üzerinde değerlendirir", "It evaluates the model on the test data"],
                ["Veriyi eğitim ve test olarak böler", "It splits the data into training and test sets"],
                ["Tahminleri ekrana yazdırır", "It prints the predictions"],
              ],
              answer: 0,
              explain: [
                "`.fit()` modelin X_egitim ve y_egitim arasındaki ilişkiyi öğrendiği adımdır. Test verisi bu aşamada hiç kullanılmaz — o yalnızca `predict` ile sonradan görülür.",
                "`.fit()` is the step where the model learns the relationship between X_egitim and y_egitim. The test data is not touched here at all — it is only seen later, via `predict`.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Bu derste denetimli öğrenmenin iki alt türü nedir?",
                "What are the two subtypes of supervised learning covered in this lesson?",
              ],
              options: [
                ["Sınıflandırma ve regresyon", "Classification and regression"],
                ["Kümeleme ve boyut indirgeme", "Clustering and dimensionality reduction"],
                ["Torbalama ve artırma", "Bagging and boosting"],
                ["Küresel ve yerel açıklama", "Global and local explanation"],
              ],
              answer: 0,
              explain: [
                "Ders, denetimli öğrenmeyi kategori tahmin eden sınıflandırma ve sayı tahmin eden regresyon olarak ikiye ayırır; kümeleme ve boyut indirgeme ise denetimsiz öğrenmeye aittir.",
                "The lesson splits supervised learning into classification (predicting a category) and regression (predicting a number); clustering and dimensionality reduction belong to unsupervised learning instead.",
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
            quiz({
              id: "q1",
              q: [
                "Doğrusal regresyon ile lojistik regresyon arasındaki temel fark nedir?",
                "What is the fundamental difference between linear and logistic regression?",
              ],
              options: [
                [
                  "Doğrusal regresyon sayı tahmin eder, lojistik regresyon kategori/olasılık tahmin eder",
                  "Linear regression predicts a number, logistic regression predicts a category/probability",
                ],
                ["İkisi de aynı şeyi yapar, sadece isimleri farklıdır", "They do the same thing, only the names differ"],
                ["Lojistik regresyon yalnızca metin verisinde çalışır", "Logistic regression only works on text data"],
                ["Doğrusal regresyon yalnızca iki özellikle çalışır", "Linear regression only works with two features"],
              ],
              answer: 0,
              explain: [
                "Doğrusal regresyon fiyat gibi bir sayı çıktısı üretir; lojistik regresyon ise sigmoid ile bir olasılığa, oradan da bir kategoriye (ayrılır/kalır) çevrilen bir çıktı üretir.",
                "Linear regression outputs a number, like a price; logistic regression outputs something squeezed by sigmoid into a probability, which is then turned into a category (churns/stays).",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Lojistik regresyonun ismi neden yanıltıcıdır?",
                "Why is the name \"logistic regression\" misleading?",
              ],
              options: [
                [
                  "Adında \"regresyon\" geçmesine rağmen aslında sınıflandırma yapar",
                  "Despite having \"regression\" in its name, it actually does classification",
                ],
                ["Aslında kümeleme yapar", "It actually does clustering"],
                ["Doğrusal olmayan bir model değildir", "It is not a non-linear model"],
                ["Sadece görüntü verisinde çalışır", "It only works on image data"],
              ],
              answer: 0,
              explain: [
                "Metin açıkça belirtir: \"adı yanıltıcıdır — regresyon değil sınıflandırma yapar.\" Doğrusal bir hesabı sigmoid ile olasılığa çevirip kategori tahmin eder.",
                "The lesson states it plainly: \"its name misleads — it does classification, not regression.\" It turns a linear expression into a probability via sigmoid, then predicts a category.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Sigmoid fonksiyonunun lojistik regresyondaki rolü nedir?",
                "What role does the sigmoid function play in logistic regression?",
              ],
              options: [
                [
                  "Doğrusal hesabın sonucunu 0-1 aralığına sıkıştırıp olasılığa çevirir",
                  "It squeezes the result of the linear calculation into the 0-1 range, turning it into a probability",
                ],
                ["Eksik verileri doldurur", "It fills in missing data"],
                ["Özellikleri normalize eder", "It normalises the features"],
                ["Ağaç derinliğini sınırlar", "It limits tree depth"],
              ],
              answer: 0,
              explain: [
                "Doğrusal hesabın çıktısı herhangi bir sayı olabilir; sigmoid bunu 0 ile 1 arasına sıkıştırarak yorumlanabilir bir olasılığa dönüştürür.",
                "The output of the linear calculation can be any number; sigmoid compresses it into the 0-1 range, turning it into an interpretable probability.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Lojistik regresyon çıktısı 0,73 olduğunda ve eşik 0,5 olarak seçildiğinde tahmin ne olur?",
                "If the logistic regression output is 0.73 and the threshold is set to 0.5, what is the prediction?",
              ],
              options: [
                [
                  "Pozitif sınıf (örn. ayrılır) — çünkü 0,73, 0,5 eşiğini geçiyor",
                  "The positive class (e.g. churns) — because 0.73 exceeds the 0.5 threshold",
                ],
                ["Negatif sınıf — çünkü 0,73 düşük bir olasılıktır", "The negative class — because 0.73 is a low probability"],
                ["Belirsiz, model karar veremez", "Undetermined, the model cannot decide"],
                ["Eşik her zaman 0,73 olmalıdır", "The threshold must always be 0.73"],
              ],
              answer: 0,
              explain: [
                "Eşik sen belirlersin, genelde 0,5. 0,73 bu eşiği geçtiği için model pozitif sınıfı (\"ayrılma olasılığı %73\") tahmin eder.",
                "You choose the threshold, usually 0.5. Since 0.73 exceeds it, the model predicts the positive class (\"73% probability of churning\").",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Koddaki `reg.coef_` çıktısı sana ne söyler?",
                "What does the `reg.coef_` output in the code tell you?",
              ],
              options: [
                [
                  "Her özelliğin fiyatı ne kadar etkilediğini",
                  "How much each feature affects the price",
                ],
                ["Modelin doğruluğunu", "The model's accuracy"],
                ["Kaç satır veri kullanıldığını", "How many rows of data were used"],
                ["Eğitimin ne kadar sürdüğünü", "How long training took"],
              ],
              answer: 0,
              explain: [
                "Doğrusal regresyonun katsayıları (`coef_`), her özelliğin tahmini nasıl etkilediğini gösterir — metrekare katsayısı 3.200 ise, bir metrekare artışı fiyatı ortalama 3.200 artırır demektir.",
                "A linear regression's coefficients (`coef_`) show how each feature affects the prediction — a coefficient of 3,200 for square metres means one extra square metre raises the price by 3,200 on average.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "`reg.score(X_test, y_test)` doğrusal regresyonda hangi metriği döndürür?",
                "What metric does `reg.score(X_test, y_test)` return for linear regression?",
              ],
              options: [
                ["R-kare", "R-squared"],
                ["Precision", "Precision"],
                ["Recall", "Recall"],
                ["ROC-AUC", "ROC-AUC"],
              ],
              answer: 0,
              explain: [
                "Kod bunu doğrudan yorum satırında belirtir: `reg.score` R-kare döndürür — modelin varyansın ne kadarını açıkladığını gösteren bir regresyon metriğidir. Precision/recall gibi metrikler sınıflandırmaya özgüdür.",
                "The code's own comment says it: `reg.score` returns R-squared — a regression metric showing how much variance the model explains. Metrics like precision/recall are classification-specific.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Koddaki `clf.predict_proba(X_test)[:, 1]` ifadesi ne döndürür?",
                "What does `clf.predict_proba(X_test)[:, 1]` return in the code?",
              ],
              options: [
                [
                  "Her satır için pozitif sınıfa ait olma olasılığı",
                  "The probability of belonging to the positive class, for each row",
                ],
                ["Doğrudan 0/1 sınıf tahminleri", "Direct 0/1 class predictions"],
                ["Modelin katsayıları", "The model's coefficients"],
                ["Eğitim verisinin boyutu", "The size of the training data"],
              ],
              answer: 0,
              explain: [
                "`predict_proba` her sınıf için olasılık döndürür (iki sütunlu bir dizi); `[:, 1]` bunlardan pozitif sınıfa ait olanı seçer. `predict` ise doğrudan sınıf verir, olasılık değil.",
                "`predict_proba` returns a probability for each class (a two-column array); `[:, 1]` selects the positive class's column. `predict` returns the class directly, not a probability.",
              ],
            }),
            tip(
              "Basit modelle başla — her zaman",
              "Start simple — always",
              "Deneyimli veri bilimcilerin ilk hamlesi neredeyse hiç derin öğrenme değildir. Doğrusal ve lojistik regresyonun üç büyük avantajı vardır:\n\n1. **Yorumlanabilir** — her katsayı hangi özelliğin ne kadar etkili olduğunu söyler. Yöneticiye açıklayabilirsin.\n2. **Hızlı ve az veriyle çalışır** — bin satırla bile makul sonuç verir.\n3. **Referans oluşturur** — karmaşık modelin bunu geçemiyorsa, karmaşıklık boşunadır.\n\nAncak bu modeller yetersiz kaldığında ağaç tabanlı yöntemlere geçilir.",
              "An experienced data scientist's first move is almost never deep learning. Linear and logistic regression have three big advantages:\n\n1. **Interpretable** — each coefficient tells you how much a feature matters. You can explain it to an executive.\n2. **Fast, and fine with little data** — they give sensible results on even a thousand rows.\n3. **They set a reference** — if your complex model cannot beat this, the complexity is pointless.\n\nOnly when these fall short do you move to tree-based methods.",
            ),
            quiz({
              id: "q8",
              q: [
                "Doğrusal/lojistik regresyonun \"yorumlanabilir\" olması ne anlama gelir?",
                "What does it mean for linear/logistic regression to be \"interpretable\"?",
              ],
              options: [
                [
                  "Her katsayı hangi özelliğin ne kadar etkili olduğunu gösterir, bu bir yöneticiye açıklanabilir",
                  "Each coefficient shows how much a given feature matters, which can be explained to an executive",
                ],
                ["Modelin kodu çok kısa olur", "The model's code is very short"],
                ["Model hiç hata yapmaz", "The model never makes mistakes"],
                ["Model otomatik olarak belgelenir", "The model documents itself automatically"],
              ],
              answer: 0,
              explain: [
                "Yorumlanabilirlik, katsayıların doğrudan \"bu özellik sonucu şu kadar etkiliyor\" diye okunabilmesi anlamına gelir — karmaşık modellerde bu açıklık kolay elde edilmez.",
                "Interpretability means the coefficients can be read directly as \"this feature affects the outcome by this much\" — that clarity is not easily available in more complex models.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metne göre karmaşık bir model neden önce basit bir modelle karşılaştırılmalı?",
                "According to the lesson, why should a complex model first be compared with a simple one?",
              ],
              options: [
                [
                  "Basit model bir referans oluşturur; karmaşık model bunu geçemiyorsa karmaşıklık boşunadır",
                  "The simple model sets a reference; if the complex model cannot beat it, the complexity is pointless",
                ],
                ["Basit modeller her zaman daha doğrudur", "Simple models are always more accurate"],
                ["Karmaşık modeller eğitilemez", "Complex models cannot be trained"],
                ["Bu bir zorunluluk değildir, tercihe bağlıdır", "It is not necessary, it is just a preference"],
              ],
              answer: 0,
              explain: [
                "Basit modeller hızlı kurulur ve bir referans puanı verir. Karmaşık bir model bu referansı belirgin biçimde geçmiyorsa, ek karmaşıklığın maliyetine değmez.",
                "Simple models are quick to build and give a reference score. If a complex model does not clearly beat that reference, the added complexity is not worth its cost.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Karar ağacı her adımda hangi bölmeyi seçer?",
                "At each step, which split does a decision tree choose?",
              ],
              options: [
                [
                  "Gini veya entropi ile ölçülen, grupları en iyi ayıran en bilgilendirici bölmeyi",
                  "The most informative split, measured by Gini or entropy, that separates the groups best",
                ],
                ["Alfabetik olarak ilk özelliği", "The alphabetically first feature"],
                ["Rastgele seçilen bir özelliği", "A randomly chosen feature"],
                ["Sayısal değeri en büyük olan özelliği", "The feature with the largest numeric value"],
              ],
              answer: 0,
              explain: [
                "Metin açık: model her adımda \"hangi soru grupları en iyi ayırıyor?\" diye bakar ve bunu Gini veya entropi ile ölçerek en bilgilendirici bölmeyi seçer.",
                "The lesson is explicit: at each step the model asks \"which question separates the groups best?\" and measures this with Gini or entropy to pick the most informative split.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre karar ağaçlarının en büyük avantajı nedir?",
                "According to the lesson, what is the greatest advantage of decision trees?",
              ],
              options: [
                [
                  "Çizilebilir ve bir yöneticiye kolayca anlatılabilir olması",
                  "It can be drawn and easily explained to an executive",
                ],
                ["Her zaman en yüksek doğruluğu vermesi", "It always gives the highest accuracy"],
                ["Hiç veri gerektirmemesi", "It requires no data at all"],
                ["Ölçekleme gerektirmesi", "It requires scaling"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: lojistik regresyonun katsayılarını yöneticiye anlatmak zordur, ama bir karar ağacını göstermek kolaydır — bu en büyük avantajıdır.",
                "The lesson says this directly: explaining logistic regression coefficients to an executive is hard, but showing them a decision tree is easy — this is its greatest advantage.",
              ],
            }),
            text(
              "**Ağaçların iki güçlü yanı:**\n\n- **Doğrusal olmayan ilişkileri yakalar** — regresyon düz çizgi arar, ağaç aramaz. \"Yaş 25-35 arasında yüksek, dışında düşük\" gibi bir deseni ağaç bulur, doğrusal regresyon bulamaz.\n- **Ölçekleme gerektirmez** — özellikleri normalleştirmene gerek yok, çünkü ağaç yalnızca sıralamaya bakar.\n\n**Ve büyük zayıflığı:** sınırsız büyürse veriyi ezberler. Her satır için ayrı bir yaprak üretir, eğitimde %100 doğruluk verir, testte çöker.",
              "**Two strengths of trees:**\n\n- **They capture non-linear relationships** — regression looks for a straight line; a tree does not. A pattern like \"high between ages 25-35, low outside\" is found by a tree and missed by linear regression.\n- **No scaling required** — you need not normalise features, because a tree only looks at ordering.\n\n**And their big weakness:** left to grow without limit they memorise the data, producing a separate leaf for every row, scoring 100% in training and collapsing on the test set.",
            ),
            quiz({
              id: "q4",
              q: [
                "\"Yaş 25-35 arasında yüksek, dışında düşük\" gibi bir deseni hangi model daha kolay yakalar?",
                "Which model more easily captures a pattern like \"high between ages 25-35, low outside\"?",
              ],
              options: [
                ["Karar ağacı — doğrusal olmayan ilişkileri yakalar", "A decision tree — it captures non-linear relationships"],
                ["Doğrusal regresyon — düz çizgi arar", "Linear regression — it looks for a straight line"],
                ["İkisi de aynı derecede kolay yakalar", "Both capture it equally easily"],
                ["Hiçbiri bu deseni yakalayamaz", "Neither can capture this pattern"],
              ],
              answer: 0,
              explain: [
                "Doğrusal regresyon düz bir çizgi aradığı için bu tür \"ortada yüksek, kenarlarda düşük\" desenleri kaçırır; karar ağacı ise ardışık bölmelerle bu deseni doğal olarak yakalar.",
                "Linear regression looks for a straight line, so it misses this \"high in the middle, low at the edges\" shape; a decision tree naturally captures it through successive splits.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Karar ağaçları neden özellik ölçeklemeye (scaling) ihtiyaç duymaz?",
                "Why do decision trees not need feature scaling?",
              ],
              options: [
                [
                  "Çünkü ağaç yalnızca değerlerin sıralamasına bakar, mutlak büyüklüğe değil",
                  "Because a tree only looks at the ordering of values, not their absolute magnitude",
                ],
                ["Çünkü ağaçlar sayısal veriyle çalışmaz", "Because trees do not work with numeric data"],
                ["Çünkü ölçekleme her zaman modeli bozar", "Because scaling always breaks the model"],
                ["Çünkü ağaçlar veriyi otomatik ölçekler", "Because trees scale the data automatically"],
              ],
              answer: 0,
              explain: [
                "Ağaç bir eşiğe göre böler (\"harcama < 500 mü?\"); bu karşılaştırma değerlerin ölçeğinden değil sırasından etkilenir, bu yüzden normalleştirme gereksizdir.",
                "A tree splits against a threshold (\"is spend < 500?\"); that comparison depends on the ordering of values, not their scale, so normalisation is unnecessary.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Bir karar ağacı sınırsız büyürse ne olur?",
                "What happens if a decision tree is allowed to grow without limit?",
              ],
              options: [
                [
                  "Her satır için ayrı bir yaprak üretip veriyi ezberler; eğitimde %100, testte kötü sonuç verir",
                  "It produces a separate leaf for every row and memorises the data; 100% on training, poor on test",
                ],
                ["Otomatik olarak budanır ve dengeli kalır", "It automatically prunes itself and stays balanced"],
                ["Eğitim hızı artar", "Training speeds up"],
                ["Ölçekleme gerektirmeye başlar", "It starts requiring scaling"],
              ],
              answer: 0,
              explain: [
                "Metin bunu ağacın büyük zayıflığı olarak tanımlar: sınırsız büyüme, her satıra özel bir yaprak üretir — bu aşırı öğrenmenin klasik bir örneğidir.",
                "The lesson names this the tree's big weakness: unlimited growth produces a leaf tailored to every single row — a textbook case of overfitting.",
              ],
            }),
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
              id: "q7",
              q: [
                "Koddaki `min_samples_leaf=20` parametresinin amacı nedir?",
                "What is the purpose of `min_samples_leaf=20` in the code?",
              ],
              options: [
                [
                  "Bir yaprakta en az 20 örnek olmasını zorunlu kılarak aşırı öğrenmeyi sınırlar",
                  "It requires at least 20 samples in a leaf, limiting overfitting",
                ],
                ["Ağacın en fazla 20 dal açmasını sağlar", "It limits the tree to at most 20 branches"],
                ["Eğitim verisinin %20'sini kullanır", "It uses 20% of the training data"],
                ["Test kümesini 20 parçaya böler", "It splits the test set into 20 parts"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum satırı bunu doğrudan açıklar: bu, `max_depth` gibi ağacı budayan ve tek satırlık aşırı özel yaprakların oluşmasını engelleyen bir ayardır.",
                "The code's own comment explains it directly: like `max_depth`, this is a setting that prunes the tree and prevents overly specific single-row leaves from forming.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Koddaki `export_text(agac, ...)` çağrısı ne işe yarar?",
                "What does the `export_text(agac, ...)` call do in the code?",
              ],
              options: [
                [
                  "Ağacın karar kurallarını okunabilir metin olarak yazdırır",
                  "It prints the tree's decision rules as readable text",
                ],
                ["Modeli diske kaydeder", "It saves the model to disk"],
                ["Modelin doğruluğunu hesaplar", "It computes the model's accuracy"],
                ["Eksik verileri doldurur", "It fills in missing values"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu belirtir: \"ağacı metin olarak yazdır — kararları okuyabilirsin.\" Bu, ağacın yorumlanabilirlik avantajını doğrudan kullanmanın bir yoludur.",
                "The code comment says it: \"print the tree as text — you can read the decisions.\" This is a direct way of using the tree's interpretability advantage.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "`agac.feature_importances_` sana ne söyler?",
                "What does `agac.feature_importances_` tell you?",
              ],
              options: [
                [
                  "Hangi özelliğin ağacın kararlarında ne kadar etkili olduğunu",
                  "How influential each feature was in the tree's decisions",
                ],
                ["Kaç yaprak olduğunu", "How many leaves there are"],
                ["Eğitim setinin büyüklüğünü", "The size of the training set"],
                ["Modelin eğitim süresini", "The model's training time"],
              ],
              answer: 0,
              explain: [
                "Kod bunu \"hangi özellik ne kadar önemli?\" yorumuyla belirtir. Bu değerler, hangi sütunların bölmelerde en çok kullanıldığını ve dolayısıyla kararı en çok etkilediğini gösterir.",
                "The code marks this with the comment \"which feature matters how much?\". These values show which columns were used most in splits and therefore influenced the decision the most.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Örnek ağaç diyagramındaki \"AYRILIR (%87)\" ifadesi ne anlama gelir?",
                "What does \"CHURNS (87%)\" mean in the example tree diagram?",
              ],
              options: [
                [
                  "O yaprağa düşen örneklerin %87'si gerçekten ayrılmıştır",
                  "87% of the samples that land in that leaf actually churned",
                ],
                ["Modelin genel doğruluğu %87'dir", "The model's overall accuracy is 87%",],
                ["Ağacın derinliği 87'dir", "The tree's depth is 87"],
                ["Eğitim verisinin %87'si kullanılmıştır", "87% of the training data was used"],
              ],
              answer: 0,
              explain: [
                "Bir yapraktaki yüzde, o yaprağa düşen eğitim örnekleri arasında ilgili sınıfın oranını gösterir — burada \"son giriş > 30 gün ve harcama < 500\" koşulunu sağlayan müşterilerin %87'si gerçekten ayrılmış.",
                "A leaf's percentage shows the share of that class among the training examples that land there — here, 87% of customers meeting \"last login > 30 days and spend < 500\" actually churned.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Karışıklık matrisinde FP (false positive) neyi ifade eder?",
                "In the confusion matrix, what does FP (false positive) represent?",
              ],
              options: [
                [
                  "Modelin pozitif dediği ama gerçekte negatif olan örnekler",
                  "Cases the model flagged as positive but that were actually negative",
                ],
                ["Modelin negatif dediği ama gerçekte pozitif olan örnekler", "Cases the model flagged as negative but that were actually positive"],
                ["Modelin doğru bildiği pozitif örnekler", "Cases the model correctly identified as positive"],
                ["Modelin doğru bildiği negatif örnekler", "Cases the model correctly identified as negative"],
              ],
              answer: 0,
              explain: [
                "FP, modelin yanlış alarm verdiği durumdur: \"pozitif\" dedi ama gerçek etiket negatifti. Precision formülünün paydasında (TP + FP) bu yüzden yer alır.",
                "FP is a false alarm: the model said \"positive\" but the true label was negative. That is why it appears in the denominator of precision (TP + FP).",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Precision (kesinlik) hangi soruyu cevaplar?",
                "Which question does precision answer?",
              ],
              options: [
                [
                  "Pozitif dediklerimin ne kadarı gerçekten pozitif?",
                  "Of everything I flagged as positive, how much was truly positive?",
                ],
                ["Gerçek pozitiflerin ne kadarını yakaladım?", "Of everything truly positive, how much did I catch?"],
                ["Genel doğruluk oranım nedir?", "What is my overall accuracy?"],
                ["Kaç tane FN var?", "How many FNs are there?"],
              ],
              answer: 0,
              explain: [
                "Metindeki tanım tam olarak budur: precision, \"pozitif dediklerimin ne kadarı gerçekten pozitif?\" sorusunu cevaplar. \"Gerçek pozitiflerin ne kadarını yakaladım?\" ise recall'dur.",
                "This is exactly the lesson's definition: precision answers \"of everything I flagged, how much was real?\" — \"how much of the real ones did I catch?\" is recall instead.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "F1 skoru neyi ifade eder?",
                "What does the F1 score represent?",
              ],
              options: [
                ["Precision ve recall'un harmonik ortalaması", "The harmonic mean of precision and recall"],
                ["Yalnızca precision", "Precision alone"],
                ["Yalnızca recall", "Recall alone"],
                ["TP sayısının toplam satır sayısına oranı", "The ratio of TP count to total row count"],
              ],
              answer: 0,
              explain: [
                "Metin F1'i precision ve recall'un harmonik ortalaması olarak tanımlar. Bu, iki metriği tek bir sayıda dengelemek istediğinde kullanılır.",
                "The lesson defines F1 as the harmonic mean of precision and recall. It is used when you want to balance the two metrics into a single number.",
              ],
            }),
            text(
              "Hangisini optimize edeceğin **hatanın maliyetine** bağlıdır:\n\n- **Kanser taraması** → recall önceliklidir; bir hastayı kaçırmak, yanlış alarmdan çok daha pahalıdır.\n- **Spam filtresi** → precision önceliklidir; önemli bir e-postayı spam'e atmak, birkaç spam'in geçmesinden kötüdür.\n- **Müşteri kaybı kampanyası** → bütçen kaç kişiye ulaşabildiğine göre eşiği ayarlarsın.",
              "Which one you optimise depends on the **cost of each error**:\n\n- **Cancer screening** → recall matters most; missing a patient is far costlier than a false alarm.\n- **Spam filter** → precision matters most; sending an important email to spam is worse than letting a few spams through.\n- **Churn campaign** → you tune the threshold to how many people your budget can reach.",
            ),
            quiz({
              id: "q5",
              q: [
                "Kanser taramasında neden recall precision'dan daha önceliklidir?",
                "Why does recall take priority over precision in cancer screening?",
              ],
              options: [
                [
                  "Bir hastayı kaçırmak (FN), yanlış alarmdan (FP) çok daha pahalıdır",
                  "Missing a patient (FN) is far costlier than a false alarm (FP)",
                ],
                ["Precision hesaplamak teknik olarak imkânsızdır", "Precision is technically impossible to compute"],
                ["Kanser taramasında FP hiç olmaz", "There are never any FPs in cancer screening"],
                ["Recall her zaman precision'dan yüksek çıkar", "Recall is always numerically higher than precision"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan açıklar: yanlış alarm (bir hastayı gereksiz yere endişelendirmek) kötüdür ama gerçek bir hastayı kaçırmak çok daha kötüdür — bu yüzden recall önceliklenir.",
                "The lesson explains this directly: a false alarm (needlessly worrying a healthy patient) is bad, but missing a real patient is far worse — hence recall is prioritised.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Spam filtresinde neden precision önceliklidir?",
                "Why does precision take priority in a spam filter?",
              ],
              options: [
                [
                  "Önemli bir e-postayı spam'e atmak (FP), birkaç spam'in geçmesinden (FN) daha kötüdür",
                  "Sending an important email to spam (FP) is worse than letting a few spam emails through (FN)",
                ],
                ["Spam filtrelerinde recall ölçülemez", "Recall cannot be measured in spam filters"],
                ["Precision her zaman daha kolay hesaplanır", "Precision is always easier to compute"],
                ["Spam e-postalar hiçbir zaman FP olmaz", "Spam emails can never be FPs"],
              ],
              answer: 0,
              explain: [
                "Metin burada hata maliyetinin yönünü değiştirir: bir FP (gerçek e-postayı spam'e atmak) kullanıcı için birkaç spam'i görmekten çok daha kötüdür, bu yüzden precision önceliklenir.",
                "Here the lesson flips the direction of error cost: an FP (flagging a real email as spam) is much worse for the user than seeing a few spam emails, so precision is prioritised.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "ROC-AUC metriğinin diğer metriklerden farkı nedir?",
                "What distinguishes the ROC-AUC metric from the others?",
              ],
              options: [
                [
                  "Belirli bir eşikten bağımsız olarak modelin genel ayırt etme başarısını ölçer",
                  "It measures the model's overall ability to discriminate, independent of any specific threshold",
                ],
                ["Yalnızca dengesiz veride kullanılabilir", "It can only be used on imbalanced data"],
                ["Precision ile tamamen aynı şeydir", "It is exactly the same thing as precision"],
                ["Karışıklık matrisi gerektirmez", "It requires no confusion matrix"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu belirtir: \"eşikten bağımsız genel başarı.\" Precision ve recall belirli bir eşiğe (genelde 0,5) bağlıyken, ROC-AUC olasılık sıralamasının kalitesini eşikten bağımsız ölçer.",
                "The code's comment marks this: \"overall performance independent of the threshold.\" Precision and recall depend on a specific threshold (usually 0.5), while ROC-AUC measures the quality of the probability ranking regardless of it.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Koddaki `cross_val_score(model, X, y, cv=5, ...)` çağrısının tek bir `train_test_split`e göre avantajı nedir?",
                "What is the advantage of `cross_val_score(model, X, y, cv=5, ...)` over a single `train_test_split`?",
              ],
              options: [
                [
                  "Tek bir bölmenin şansa bağlı olma riskini azaltır, birden fazla puan ve bunların dağılımını verir",
                  "It reduces the risk of a single split being a matter of luck, giving multiple scores and their spread",
                ],
                ["Modeli otomatik olarak daha karmaşık hale getirir", "It automatically makes the model more complex"],
                ["Eğitim süresini kısaltır", "It shortens training time"],
                ["Test kümesine ihtiyacı ortadan kaldırır", "It eliminates the need for a test set"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu açıklar: \"tek bir bölmeye güvenme.\" Çapraz doğrulama, veriyi k parçaya bölüp her birini sırayla test olarak kullanarak daha güvenilir bir ortalama ve bir güven aralığı (standart sapma) verir.",
                "The code's comment explains it: \"do not rely on a single split.\" Cross-validation splits the data into k folds, tests on each in turn, and gives a more reliable mean plus a measure of confidence (standard deviation).",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "1000 işlemden 10'unun sahte olduğu örnekte, \"hiçbiri sahte değil\" diyen modelin recall'u kaçtır?",
                "In the example with 10 fraudulent transactions out of 1000, what is the recall of a model that says \"none are fraud\"?",
              ],
              options: [
                ["%0 — gerçek sahtekarlıkların hiçbirini yakalamıyor", "0% — it catches none of the real frauds"],
                ["%99 — çünkü doğruluğu %99", "99% — because its accuracy is 99%"],
                ["%100 — çünkü hiç yanlış alarm vermiyor", "100% — because it raises no false alarms"],
                ["Hesaplanamaz", "It cannot be computed"],
              ],
              answer: 0,
              explain: [
                "Recall = TP / (TP + FN). Model hiçbir işlemi pozitif demediği için TP = 0'dır, dolayısıyla recall de %0'dır — doğruluğun yüksek olması bunu gizler, tam da metnin vurguladığı nokta budur.",
                "Recall = TP / (TP + FN). Since the model never flags anything positive, TP = 0, so recall is 0% — high accuracy hides this completely, which is exactly the lesson's point.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Bir model hem eğitimde hem testte kötü sonuç veriyor. Bu hangi durumun işaretidir?",
                "A model performs poorly on both training and test. What does this signal?",
              ],
              options: [
                ["Yanlılık (bias) — yetersiz öğrenme (underfitting)", "Bias — underfitting"],
                ["Varyans (variance) — aşırı öğrenme (overfitting)", "Variance — overfitting"],
                ["Mükemmel bir model", "A perfect model"],
                ["Veri sızıntısı", "Data leakage"],
              ],
              answer: 0,
              explain: [
                "Metne göre eğitimde de testte de kötü sonuç, modelin deseni yakalayamayacak kadar basit olduğunu gösterir — bu yanlılık (bias) kaynaklı yetersiz öğrenmedir.",
                "Per the lesson, poor performance on both training and test shows the model is too simple to capture the pattern — this is bias-driven underfitting.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Bir model eğitimde mükemmel, testte kötü sonuç veriyor. Bu hangi durumun işaretidir?",
                "A model is perfect on training but poor on test. What does this signal?",
              ],
              options: [
                ["Varyans (variance) — aşırı öğrenme (overfitting)", "Variance — overfitting"],
                ["Yanlılık (bias) — yetersiz öğrenme (underfitting)", "Bias — underfitting"],
                ["Model yeterince karmaşık değil", "The model is not complex enough"],
                ["Test kümesi çok büyük", "The test set is too large"],
              ],
              answer: 0,
              explain: [
                "Bu, tam olarak metindeki varyans tanımıdır: model fazla karmaşık, gürültüyü de öğrenmiştir. Eğitimde mükemmel, testte kötü — aşırı öğrenmenin klasik imzası.",
                "This is exactly the lesson's definition of variance: the model is too complex and has learned the noise. Perfect on training, poor on test — the classic signature of overfitting.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Model karmaşıklığı arttıkça yanlılık ve varyans nasıl değişir?",
                "As model complexity increases, how do bias and variance change?",
              ],
              options: [
                ["Yanlılık düşer, varyans yükselir", "Bias falls, variance rises"],
                ["Her ikisi de düşer", "Both fall"],
                ["Her ikisi de yükselir", "Both rise"],
                ["Yanlılık yükselir, varyans düşer", "Bias rises, variance falls"],
              ],
              answer: 0,
              explain: [
                "Metin bu değiş tokuşu (trade-off) tanımlar: karmaşıklık arttıkça model deseni daha iyi yakalar (yanlılık düşer) ama gürültüyü de öğrenmeye başlar (varyans yükselir). En iyi nokta ikisinin toplamının en küçük olduğu yerdedir.",
                "The lesson describes this trade-off: as complexity rises, the model captures the pattern better (bias falls) but also starts learning the noise (variance rises). The best point is where their sum is smallest.",
              ],
            }),
            text(
              "**Çapraz doğrulama (cross-validation)**, tek bir test kümesinin şansa bağlı olması sorununu çözer. Veriyi k parçaya böler (genelde 5), sırayla her parçayı test olarak kullanır ve kalan k−1 parçayla eğitir. Sonuçta **k adet puan** alırsın.\n\nBunun iki büyük faydası vardır:\n\n1. **Ortalama puan** tek bir bölmeye göre çok daha güvenilirdir\n2. **Puanların standart sapması** modelin ne kadar kararlı olduğunu söyler. Puanlar 0,82 / 0,81 / 0,83 ise model kararlıdır; 0,71 / 0,88 / 0,79 ise modele güvenemezsin — bölme değişince sonuç değişiyor demektir.",
              "**Cross-validation** solves the problem of a single test set being a matter of luck. It splits the data into k folds (usually 5), uses each fold as the test set in turn, and trains on the remaining k−1. You end up with **k scores**.\n\nThis brings two big benefits:\n\n1. **The mean score** is far more reliable than one from a single split\n2. **The standard deviation of the scores** tells you how stable the model is. Scores of 0.82 / 0.81 / 0.83 mean a stable model; 0.71 / 0.88 / 0.79 means you cannot trust it — the result changes with the split.",
            ),
            quiz({
              id: "q5",
              q: [
                "Çapraz doğrulamada ortalama puanın tek bir bölmenin puanından daha güvenilir olmasının sebebi nedir?",
                "Why is the mean score from cross-validation more reliable than the score from a single split?",
              ],
              options: [
                [
                  "k farklı bölmenin sonucunu birleştirdiği için tek bir bölmenin şansına bağlı kalmaz",
                  "It combines the results of k different splits, so it is not at the mercy of one split's luck",
                ],
                ["Her zaman daha yüksek bir sayı verdiği için", "Because it always gives a higher number"],
                ["Test kümesini büyüttüğü için", "Because it enlarges the test set"],
                ["Modeli otomatik olarak iyileştirdiği için", "Because it automatically improves the model"],
              ],
              answer: 0,
              explain: [
                "Tek bir bölme şansa bağlıdır — o bölmede kolay veya zor bir alt küme test kümesine düşmüş olabilir. k bölmenin ortalaması bu şans faktörünü büyük ölçüde ortalar.",
                "A single split is a matter of luck — an easy or hard subset may have ended up in that particular test fold. Averaging over k folds largely cancels out that luck factor.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Çapraz doğrulama puanlarının standart sapması sana ne söyler?",
                "What does the standard deviation of cross-validation scores tell you?",
              ],
              options: [
                [
                  "Modelin ne kadar kararlı olduğunu — bölme değiştikçe sonucun ne kadar değiştiğini",
                  "How stable the model is — how much the result changes as the split changes",
                ],
                ["Modelin eğitim süresini", "The model's training time"],
                ["Kaç özellik kullanıldığını", "How many features were used"],
                ["Verinin toplam büyüklüğünü", "The total size of the dataset"],
              ],
              answer: 0,
              explain: [
                "Metindeki örnek bunu net gösterir: puanlar 0,82/0,81/0,83 ise küçük standart sapma kararlı bir model demektir; 0,71/0,88/0,79 gibi büyük bir yayılma ise sonuca güvenilemeyeceğini gösterir.",
                "The lesson's example makes this clear: scores of 0.82/0.81/0.83 with low spread mean a stable model; a wide spread like 0.71/0.88/0.79 means the result cannot be trusted.",
              ],
            }),
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
            quiz({
              id: "q7",
              q: [
                "Kodda `KFold` yerine `StratifiedKFold` kullanılmasının sebebi nedir?",
                "Why does the code use `StratifiedKFold` instead of plain `KFold`?",
              ],
              options: [
                [
                  "Her kattaki sınıf oranlarını orijinal veriyle aynı tutar",
                  "It keeps the class proportions in every fold the same as in the original data",
                ],
                ["Eğitimi hızlandırır", "It speeds up training"],
                ["Kat sayısını otomatik seçer", "It automatically chooses the number of folds"],
                ["Zaman serisi verisi için gereklidir", "It is required for time-series data"],
              ],
              answer: 0,
              explain: [
                "Sınıf dengesizliği olan verilerde rastgele bölme bazı katlara çok az pozitif örnek düşürebilir. `StratifiedKFold`, tıpkı `train_test_split`teki `stratify` gibi, her kattaki sınıf oranını korur.",
                "On imbalanced data, a random split can leave some folds with very few positive examples. `StratifiedKFold`, like `stratify` in `train_test_split`, keeps the class proportion consistent across folds.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Zaman serisi verisinde `TimeSeriesSplit` neden gerekir, sıradan çapraz doğrulama yerine?",
                "Why is `TimeSeriesSplit` needed for time-series data, instead of ordinary cross-validation?",
              ],
              options: [
                [
                  "Her zaman geçmiş veriyle eğitip gelecekteki veriyle test etmeyi garanti eder",
                  "It guarantees that you always train on past data and test on future data",
                ],
                ["Daha az bellek kullanır", "It uses less memory"],
                ["Daha fazla kat oluşturur", "It creates more folds"],
                ["Sınıf dengesizliğini otomatik düzeltir", "It automatically fixes class imbalance"],
              ],
              answer: 0,
              explain: [
                "Sıradan çapraz doğrulama katları rastgele karıştırır ve geleceğin verisiyle geçmişi tahmin etmiş olursun. `TimeSeriesSplit` her katta yalnızca geçmişi eğitim, sonrasını test olarak kullanır.",
                "Ordinary cross-validation shuffles folds randomly, which means predicting the past using future data. `TimeSeriesSplit` always uses only the past for training and what follows it for testing, in every fold.",
              ],
            }),
            pitfall(
              "Aşırı öğrenmeye karşı dört savunma",
              "Four defences against overfitting",
              "1. **Daha çok veri** — en etkili çözüm, ama genelde en pahalısı.\n2. **Daha basit model** — ağaç derinliğini azalt, özellik sayısını düşür.\n3. **Düzenlileştirme (regularisation)** — büyük katsayıları cezalandır. Lojistik regresyonda `C` parametresi, ağaçlarda budama bunu yapar.\n4. **Erken durdurma** — doğrulama puanı kötüleşmeye başladığında eğitimi kes.\n\nEn sık atlanan nokta ise şudur: **özellik sayısı, satır sayısına göre çok fazla olmamalı.** 200 satırlık veride 80 özellik varsa model kaçınılmaz olarak ezberler.",
              "1. **More data** — the most effective fix, though usually the most expensive.\n2. **A simpler model** — reduce tree depth, cut the number of features.\n3. **Regularisation** — penalise large coefficients. The `C` parameter in logistic regression and pruning in trees do this.\n4. **Early stopping** — halt training when the validation score starts getting worse.\n\nThe most commonly overlooked point: **the number of features must not be large relative to the number of rows.** With 80 features on 200 rows, the model will inevitably memorise.",
            ),
            quiz({
              id: "q9",
              q: [
                "Düzenlileştirme (regularisation) aşırı öğrenmeyi nasıl azaltır?",
                "How does regularisation reduce overfitting?",
              ],
              options: [
                [
                  "Büyük katsayıları cezalandırarak modelin gürültüye aşırı uyum sağlamasını engeller",
                  "By penalising large coefficients, preventing the model from over-fitting to noise",
                ],
                ["Veri setine yeni satırlar ekleyerek", "By adding new rows to the dataset"],
                ["Modeli daha karmaşık hale getirerek", "By making the model more complex"],
                ["Test kümesini büyüterek", "By enlarging the test set"],
              ],
              answer: 0,
              explain: [
                "Metin, lojistik regresyondaki `C` parametresini ve ağaçlardaki budamayı düzenlileştirme örneği verir — ikisi de aşırı büyük veya aşırı özel katsayı/dal oluşumunu cezalandırarak modeli sadeleştirir.",
                "The lesson gives the `C` parameter in logistic regression and pruning in trees as regularisation examples — both simplify the model by penalising overly large or overly specific coefficients/branches.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "200 satırlık bir veri setinde 80 özellik kullanmak neden risklidir?",
                "Why is using 80 features on a 200-row dataset risky?",
              ],
              options: [
                [
                  "Özellik sayısı satır sayısına göre çok fazla olduğunda model kaçınılmaz olarak ezberler",
                  "When the feature count is too large relative to row count, the model inevitably memorises",
                ],
                ["Bu, hesaplama gücünün yetersiz olduğu anlamına gelir", "It means the computing power is insufficient"],
                ["80 özellik hiçbir zaman yeterli bilgi taşımaz", "80 features never carry enough information"],
                ["Bu, yalnızca ağaç modellerinde bir sorundur", "This is only a problem for tree models"],
              ],
              answer: 0,
              explain: [
                "Metin bunu en sık atlanan nokta olarak vurgular: satır sayısına göre aşırı fazla özellik, modelin veriyi ezberlemesi için yeterli \"serbestlik derecesi\" verir — düzenlileştirme veya daha az özellik gerekir.",
                "The lesson highlights this as the most commonly overlooked point: too many features relative to rows gives the model enough \"degrees of freedom\" to memorise the data — it needs regularisation or fewer features.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: [
                "Metindeki kazanç sıralamasına göre model başarısını en çok ne belirler?",
                "According to the lesson's ranking of gains, what matters most for model success?",
              ],
              options: [
                ["İyi özellikler", "Good features"],
                ["Çok veri", "Lots of data"],
                ["İyi model seçimi", "A good model choice"],
                ["İyi hiperparametreler", "Good hyperparameters"],
              ],
              answer: 0,
              explain: [
                "Metindeki sıralama şöyledir: iyi özellik > çok veri > iyi model > iyi hiperparametre. Özellik mühendisliği listenin en tepesindedir çünkü ham veriden çıkarılan bilgi, model veya ayar seçiminden daha büyük fark yaratır.",
                "The lesson's ranking is: good features > lots of data > good model > good hyperparameters. Feature engineering tops the list because the information extracted from raw data makes a bigger difference than model or tuning choices.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Ham bir tarih sütunu neden tek başına işe yaramaz?",
                "Why is a raw date column useless on its own?",
              ],
              options: [
                [
                  "Model onu doğrudan kullanamaz; ondan ay, haftanın günü gibi anlamlı parçalar çıkarmak gerekir",
                  "The model cannot use it directly; meaningful parts like month or day-of-week must be derived from it",
                ],
                ["Tarihler her zaman hatalı girilir", "Dates are always entered incorrectly"],
                ["Modeller tarih veri tipini desteklemez", "Models do not support the date data type"],
                ["Tarih sütunu her zaman eksik olur", "The date column is always missing"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: ham tarih işe yaramaz, ama ondan `ay`, `haftanın_günü`, `hafta_sonu_mu`, `tatil_mi` üretmek çok işe yarar — model desenleri bu türetilmiş parçalarda bulur.",
                "The lesson states this directly: a raw date is useless, but deriving `month`, `day_of_week`, `is_weekend`, `is_holiday` from it is very useful — the model finds patterns in these derived parts.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "`son_giriş_gün_sayısı` gibi bir özellik hangi dönüşüm kategorisine girer?",
                "A feature like `days_since_last_login` belongs to which transformation category?",
              ],
              options: [
                ["Fark ve oran", "Differences and ratios"],
                ["Tarihten parça çıkarma", "Extracting parts of a date"],
                ["Toplulaştırma", "Aggregation"],
                ["Log dönüşümü", "Log transform"],
              ],
              answer: 0,
              explain: [
                "Metin bu özelliği tam olarak fark/oran örneği olarak verir — iki zaman noktası (bugün ve son giriş) arasındaki farkı bir sayıya indirger.",
                "The lesson gives this exact feature as an example of differences and ratios — it reduces the gap between two points in time (today and last login) to a single number.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "`toplam_sipariş`, `ortalama_sepet` gibi müşteri düzeyinde özellikler hangi dönüşüm kategorisine girer?",
                "Customer-level features like `total_orders`, `average_basket` belong to which transformation category?",
              ],
              options: [
                ["Toplulaştırma", "Aggregation"],
                ["Tarihten parça çıkarma", "Extracting parts of a date"],
                ["Fark ve oran", "Differences and ratios"],
                ["Kategorik kodlama", "Categorical encoding"],
              ],
              answer: 0,
              explain: [
                "Bunlar birçok sipariş satırını tek bir müşteri özetine indirger — metindeki toplulaştırma örneğinin tam karşılığı budur.",
                "These collapse many order rows down into a single per-customer summary — exactly the lesson's example of aggregation.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Gelir veya tutar gibi çarpık (skewed) sayısal sütunlarda log dönüşümünün amacı nedir?",
                "What is the purpose of a log transform on skewed numeric columns like income or amounts?",
              ],
              options: [
                [
                  "Sütunu sıkıştırarak aşırı büyük değerlerin modeli baskılamasını azaltır",
                  "It compresses the column, reducing how much extreme values dominate the model",
                ],
                ["Sütundaki eksik değerleri doldurur", "It fills in missing values in the column"],
                ["Sütunu kategorik hale getirir", "It turns the column into a categorical one"],
                ["Sütunu tamamen siler", "It deletes the column entirely"],
              ],
              answer: 0,
              explain: [
                "Metin log dönüşümünü \"çarpık sayısal sütunları sıkıştırmak\" için önerir — birkaç aşırı büyük değerin (örneğin çok yüksek bir gelir) modelin öğrenmesini domine etmesini engeller.",
                "The lesson recommends the log transform for \"compressing skewed numeric columns\" — it stops a handful of extreme values (say, a very high income) from dominating what the model learns.",
              ],
            }),
            text(
              "**Kategorik kodlama üç yolla yapılır:**\n\n- **One-hot** — her kategori için 0/1 sütunu. Az sayıda kategori varsa (< 15) en güvenli seçim. `sehir` sütunu 5 şehir içeriyorsa 5 sütun olur.\n- **Ordinal** — kategorileri sıralı sayıya çevirir. **Yalnızca gerçekten sıralıysa** kullan (küçük/orta/büyük). `sehir` için kullanmak, modele \"İzmir, Ankara'dan büyüktür\" gibi anlamsız bir bilgi verir.\n- **Target encoding** — her kategoriyi, o kategorideki ortalama etiket değeriyle değiştirir. Çok kategorili sütunlarda (5.000 ürün kodu) güçlüdür ama **sızıntı riski** taşır; mutlaka çapraz doğrulama içinde yapılmalıdır.",
              "**Categorical encoding comes in three forms:**\n\n- **One-hot** — a 0/1 column per category. With few categories (< 15) it is the safest choice. A `city` column with 5 cities becomes 5 columns.\n- **Ordinal** — maps categories to ordered numbers. Use it **only when the order is real** (small/medium/large). Using it for `city` tells the model something meaningless, like \"İzmir is greater than Ankara\".\n- **Target encoding** — replaces each category with the mean label value in that category. Powerful for high-cardinality columns (5,000 product codes) but carries a **leakage risk**; it must be done inside cross-validation.",
            ),
            quiz({
              id: "q6",
              q: [
                "`sehir` sütunu 5 farklı şehir içeriyorsa, one-hot kodlama kaç sütun üretir ve ne zaman güvenlidir?",
                "If a `city` column has 5 distinct cities, how many columns does one-hot encoding produce, and when is it safe?",
              ],
              options: [
                ["5 sütun; az sayıda kategori (< 15) varken güvenlidir", "5 columns; safe when there are few categories (< 15)"],
                ["1 sütun; her zaman güvenlidir", "1 column; always safe"],
                ["5 sütun; yalnızca sıralı kategorilerde güvenlidir", "5 columns; safe only for ordered categories"],
                ["25 sütun; hiçbir zaman önerilmez", "25 columns; never recommended"],
              ],
              answer: 0,
              explain: [
                "Metin örneği tam olarak verir: 5 şehir 5 sütun olur. Az sayıda kategori varken (<15) bu en güvenli seçenektir; kategori sayısı çok artınca sütun sayısı da patlar.",
                "The lesson gives this exact example: 5 cities become 5 columns. With few categories (<15) this is the safest choice; once the category count grows a lot, the column count explodes too.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "`sehir` sütununa ordinal kodlama uygulamak neden yanlıştır?",
                "Why is it wrong to apply ordinal encoding to a `city` column?",
              ],
              options: [
                [
                  "Şehirler arasında gerçek bir sıralama yoktur; ordinal kodlama modele \"İzmir Ankara'dan büyüktür\" gibi anlamsız bir bilgi verir",
                  "There is no real order among cities; ordinal encoding tells the model something meaningless, like \"İzmir is greater than Ankara\"",
                ],
                ["Ordinal kodlama yalnızca sayısal sütunlarda çalışır", "Ordinal encoding only works on numeric columns"],
                ["Şehir sütunu her zaman eksik veri içerir", "The city column always contains missing data"],
                ["Ordinal kodlama one-hot'tan daha fazla sütun üretir", "Ordinal encoding produces more columns than one-hot"],
              ],
              answer: 0,
              explain: [
                "Ordinal kodlama yalnızca gerçekten sıralı kategorilerde (küçük/orta/büyük) anlamlıdır. Şehir gibi sıralı olmayan bir kategoride kullanmak, modele var olmayan bir büyüklük ilişkisi öğretir.",
                "Ordinal encoding only makes sense for genuinely ordered categories (small/medium/large). Using it on an unordered category like city teaches the model a magnitude relationship that does not exist.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Target encoding hangi durumda özellikle güçlüdür?",
                "In which situation is target encoding especially powerful?",
              ],
              options: [
                [
                  "5.000 ürün kodu gibi çok kategorili (yüksek kardinaliteli) sütunlarda",
                  "On high-cardinality columns, such as 5,000 product codes",
                ],
                ["Yalnızca iki kategorisi olan sütunlarda", "On columns with only two categories"],
                ["Sayısal sütunlarda", "On numeric columns"],
                ["Tarih sütunlarında", "On date columns"],
              ],
              answer: 0,
              explain: [
                "One-hot kodlama 5.000 kategori için 5.000 sütun üretirdi — kullanılamaz. Target encoding her kategoriyi tek bir sayıya (ortalama etiket değeri) indirger, bu yüzden yüksek kardinalitede güçlüdür.",
                "One-hot encoding would produce 5,000 columns for 5,000 categories — unusable. Target encoding collapses each category to a single number (the mean label value), which is why it is powerful at high cardinality.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Target encoding neden mutlaka çapraz doğrulama içinde yapılmalıdır?",
                "Why must target encoding always be done inside cross-validation?",
              ],
              options: [
                [
                  "Her kategorinin ortalama etiketini hesaplamak, o kategorinin gerçek etiketinden bilgi sızdırır",
                  "Computing each category's mean label leaks information from that category's true label",
                ],
                ["Yalnızca hızı artırmak için", "Only to speed things up"],
                ["Çünkü sklearn bunu zorunlu kılar", "Because scikit-learn requires it"],
                ["Target encoding zaten sızıntıdan tamamen bağışıktır", "Target encoding is already completely immune to leakage"],
              ],
              answer: 0,
              explain: [
                "Metin bunu \"sızıntı riski\" olarak adlandırır: bir satırın kodlanmış değeri, o satırın kendi etiketinden hesaplanan bir ortalamayı içerebilir. Bunu önlemek için kodlama yalnızca eğitim katlarında, çapraz doğrulama içinde yapılmalıdır.",
                "The lesson calls this a \"leakage risk\": a row's encoded value can be computed partly from that same row's own label. To prevent this, encoding must be done only on the training folds, inside cross-validation.",
              ],
            }),
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
            quiz({
              id: "q1",
              q: [
                "Koddaki `ColumnTransformer` ne işe yarar?",
                "What does `ColumnTransformer` do in the code?",
              ],
              options: [
                [
                  "Sayısal ve kategorik sütunlara farklı ön işleme adımlarını aynı anda uygular",
                  "It applies different preprocessing steps to numeric and categorical columns at the same time",
                ],
                ["Yalnızca sayısal sütunları siler", "It only deletes numeric columns"],
                ["Modeli eğitir", "It trains the model"],
                ["Test kümesini oluşturur", "It creates the test set"],
              ],
              answer: 0,
              explain: [
                "Kodda sayısal sütunlar (`sayisal`) doldurulup ölçeklenirken, kategorik sütunlar (`kategorik`) doldurulup one-hot kodlanır — `ColumnTransformer` bu iki farklı işlemi tek bir adımda birleştirir.",
                "In the code, numeric columns (`sayisal`) are imputed and scaled while categorical columns (`kategorik`) are imputed and one-hot encoded — `ColumnTransformer` combines these two different operations into a single step.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Kodda sayısal sütunlar için `SimpleImputer(strategy=\"median\")`, kategorik sütunlar için `strategy=\"most_frequent\"` kullanılmasının sebebi nedir?",
                "Why does the code use `SimpleImputer(strategy=\"median\")` for numeric columns but `strategy=\"most_frequent\"` for categorical ones?",
              ],
              options: [
                [
                  "Medyan sayısal eksikleri doldurmak için, en sık görülen değer ise kategorik eksikleri doldurmak için anlamlıdır",
                  "The median makes sense for filling numeric gaps, the most frequent value for filling categorical gaps",
                ],
                ["İkisi de aynı sonucu verir, fark etmez", "Both give the same result, it does not matter"],
                ["Kategorik sütunlarda eksik değer olmaz", "Categorical columns never have missing values"],
                ["Medyan yalnızca kategorik sütunlarda çalışır", "The median only works on categorical columns"],
              ],
              answer: 0,
              explain: [
                "\"En sık görülen kategori\" bir sayısal sütunda anlamsız olabilir; \"medyan\" ise bir kategorik sütunda hesaplanamaz. Her veri tipine uygun doldurma stratejisi seçilir.",
                "\"Most frequent category\" may not make sense for a numeric column, and a \"median\" cannot be computed for a categorical one. Each data type gets the imputation strategy that fits it.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Ön işleme adımlarını `Pipeline` içine koymanın en büyük faydası kod başlığına göre nedir?",
                "According to the code's caption, what is the biggest benefit of putting preprocessing steps inside a `Pipeline`?",
              ],
              options: [
                [
                  "Sızıntının yapısal olarak imkânsız hale gelmesi",
                  "Leakage becomes structurally impossible",
                ],
                ["Modelin daha hızlı eğitilmesi", "The model trains faster"],
                ["Daha az hiperparametre gerekmesi", "Fewer hyperparameters are needed"],
                ["Kodun daha kısa olması", "The code being shorter"],
              ],
              answer: 0,
              explain: [
                "Kod başlığı bunu tam olarak söyler. Her adım pipeline içinde olduğundan `fit` her zaman yalnızca eğitim verisine uygulanır — ölçekleme veya kodlamayı bölmeden önce yapma hatası yapısal olarak imkânsız hale gelir.",
                "The code's caption states this directly. Because every step lives inside the pipeline, `fit` is always applied to training data only — the mistake of scaling or encoding before the split becomes structurally impossible.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Koddaki `GridSearchCV(boru, izgara, cv=5, ...)` çağrısı neyi arar?",
                "What does `GridSearchCV(boru, izgara, cv=5, ...)` search for in the code?",
              ],
              options: [
                [
                  "Çapraz doğrulama içinde en iyi performansı veren hiperparametre kombinasyonunu",
                  "The hyperparameter combination that gives the best performance under cross-validation",
                ],
                ["En iyi özellik alt kümesini", "The best feature subset"],
                ["En iyi eksik değer doldurma stratejisini", "The best missing-value imputation strategy"],
                ["Modelin çalışacağı en iyi sunucuyu", "The best server to run the model on"],
              ],
              answer: 0,
              explain: [
                "`izgara` sözlüğünde `n_estimators`, `max_depth`, `min_samples_leaf` kombinasyonları listelenmiş. `GridSearchCV` bunların hepsini `cv=5` ile dener ve `roc_auc` ortalamasına göre en iyisini seçer.",
                "The `izgara` dictionary lists combinations of `n_estimators`, `max_depth`, `min_samples_leaf`. `GridSearchCV` tries every one of them with `cv=5` and picks the best by mean `roc_auc`.",
              ],
            }),
            text(
              "**Model üretime alındıktan sonra** iş bitmez, asıl orada başlar:\n\n- **Veri kayması (data drift)** — girdi dağılımı zamanla değişir; 2020'de eğitilen bir model 2024 davranışını bilmez.\n- **Kavram kayması (concept drift)** — girdi ile çıktı arasındaki ilişkinin kendisi değişir.\n- **İzleme** — tahmin dağılımını, girdi istatistiklerini ve gerçek sonuç geldikçe performansı takip et.\n- **Yeniden eğitim** — bir takvim (aylık) veya bir eşik (AUC %5 düştüğünde) belirle ve otomatikleştir.",
              "**Shipping the model is not the end**, it is where the work starts:\n\n- **Data drift** — the input distribution shifts over time; a model trained in 2020 does not know 2024 behaviour.\n- **Concept drift** — the relationship between input and output itself changes.\n- **Monitoring** — track the prediction distribution, input statistics, and performance as ground truth arrives.\n- **Retraining** — set a schedule (monthly) or a trigger (AUC drops 5%) and automate it.",
            ),
            quiz({
              id: "q5",
              q: [
                "Veri kayması (data drift) ile kavram kayması (concept drift) arasındaki fark nedir?",
                "What is the difference between data drift and concept drift?",
              ],
              options: [
                [
                  "Veri kaymasında girdi dağılımı değişir; kavram kaymasında girdi-çıktı ilişkisinin kendisi değişir",
                  "In data drift the input distribution changes; in concept drift the input-output relationship itself changes",
                ],
                ["İkisi de tamamen aynı şeydir", "They are exactly the same thing"],
                ["Veri kayması yalnızca metin verisinde olur", "Data drift only happens with text data"],
                ["Kavram kayması yalnızca eğitim sırasında olur", "Concept drift only happens during training"],
              ],
              answer: 0,
              explain: [
                "Metin bu ikisini ayrı ayrı tanımlar: veri kayması girdilerin nasıl dağıldığıyla ilgilidir; kavram kayması ise aynı girdinin artık farklı bir çıktıya karşılık gelmesiyle ilgilidir.",
                "The lesson defines them separately: data drift is about how the inputs are distributed; concept drift is about the same input now corresponding to a different output.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Metne göre üretimdeki bir modelde neler izlenmelidir?",
                "According to the lesson, what should be monitored for a model in production?",
              ],
              options: [
                [
                  "Tahmin dağılımı, girdi istatistikleri ve gerçek sonuç geldikçe performans",
                  "The prediction distribution, input statistics, and performance as ground truth arrives",
                ],
                ["Yalnızca kod satır sayısı", "Only the number of lines of code"],
                ["Yalnızca sunucu maliyeti", "Only the server cost"],
                ["Yalnızca modelin dosya boyutu", "Only the model's file size"],
              ],
              answer: 0,
              explain: [
                "Metin izlemeyi tam olarak bu üç unsurla tanımlar — bunlar modelin sessizce bozulup bozulmadığını erken fark etmeni sağlar.",
                "The lesson defines monitoring with exactly these three elements — they let you catch silent model degradation early.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Metne göre yeniden eğitim nasıl tetiklenebilir?",
                "According to the lesson, how can retraining be triggered?",
              ],
              options: [
                [
                  "Sabit bir takvimle (örn. aylık) veya bir eşikle (örn. AUC %5 düşünce)",
                  "On a fixed schedule (e.g. monthly) or by a threshold (e.g. AUC drops 5%)",
                ],
                ["Yalnızca yöneticinin sözlü onayıyla", "Only with a manager's verbal approval"],
                ["Yalnızca yeni bir kütüphane çıktığında", "Only when a new library is released"],
                ["Asla, model bir kez eğitilir ve değiştirilmez", "Never — a model is trained once and left unchanged"],
              ],
              answer: 0,
              explain: [
                "Metin iki yöntem sayar: bir takvim (her ay) veya bir tetikleyici (kayma tespit edilince). İkisinin de amacı, süreci otomatikleştirip insan hatasına bağımlı olmamaktır.",
                "The lesson lists two approaches: a schedule (monthly) or a trigger (when drift is detected). Both aim to automate the process so it does not depend on someone remembering to act.",
              ],
            }),
            tip(
              "Modelin kararını açıklayabilmelisin",
              "You must be able to explain the model's decision",
              "Kredi, işe alım, sağlık gibi alanlarda \"model öyle dedi\" bir cevap değildir. `feature_importances_`, permütasyon önemi veya SHAP değerleriyle hangi değişkenin kararı nasıl etkilediğini gösterebilmelisin. Açıklanamayan model çoğu kurumda üretime hiç çıkamaz.",
              "In credit, hiring or healthcare, \"the model said so\" is not an answer. You need `feature_importances_`, permutation importance or SHAP values to show which variable pushed the decision and how. In many organisations an unexplainable model never ships at all.",
            ),
            quiz({
              id: "q8",
              q: [
                "Kredi, işe alım veya sağlık gibi alanlarda \"model öyle dedi\" cevabı neden yeterli değildir?",
                "Why is \"the model said so\" not a sufficient answer in domains like credit, hiring or healthcare?",
              ],
              options: [
                [
                  "Bu alanlarda kararların hangi değişkene dayandığının gösterilebilmesi gerekir",
                  "In these domains you must be able to show which variable a decision was based on",
                ],
                ["Bu alanlarda model kullanmak yasaktır", "Using a model is illegal in these domains"],
                ["Bu alanlarda modeller her zaman hatalıdır", "Models are always wrong in these domains"],
                ["Bu, yalnızca teknik bir tercih meselesidir, önemi yoktur", "It is purely a technical preference with no real importance"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: bu alanlarda açıklanamayan bir model çoğu kurumda üretime hiç çıkamaz — kararın gerekçesi gösterilebilir olmalıdır.",
                "The lesson states this directly: in many organisations an unexplainable model never ships at all in these domains — the reasoning behind a decision must be demonstrable.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metne göre bir modelin kararını açıklamak için hangi araçlar kullanılabilir?",
                "According to the lesson, which tools can be used to explain a model's decision?",
              ],
              options: [
                [
                  "`feature_importances_`, permütasyon önemi veya SHAP değerleri",
                  "`feature_importances_`, permutation importance, or SHAP values",
                ],
                ["Yalnızca modelin doğruluk skoru", "Only the model's accuracy score"],
                ["Yalnızca çapraz doğrulama sonucu", "Only the cross-validation result"],
                ["Yalnızca eğitim süresi", "Only the training time"],
              ],
              answer: 0,
              explain: [
                "Metin bu üç aracı sayar. Doğruluk skoru veya eğitim süresi gibi metrikler, modelin genel performansını gösterir ama tek bir kararın nedenini açıklamaz.",
                "The lesson lists these three tools. Metrics like accuracy or training time show overall model performance but do not explain the reasoning behind a single decision.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Tek bir karar ağacı neden kararsızdır?",
                "Why is a single decision tree unstable?",
              ],
              options: [
                [
                  "Veriyi biraz değiştirdiğinde tamamen farklı bir ağaç ortaya çıkar",
                  "Change the data slightly and you get a completely different tree",
                ],
                ["Her zaman aşırı basittir", "It is always too simple"],
                ["Yalnızca sayısal veriyle çalışır", "It only works with numeric data"],
                ["Eğitimi çok uzun sürer", "It takes too long to train"],
              ],
              answer: 0,
              explain: [
                "Metin bunu topluluk yöntemlerinin motivasyonu olarak verir: tek bir ağaç, verideki küçük değişikliklere aşırı duyarlıdır. Çok sayıda ağacı birleştirmek bu kararsızlığı ortadan kaldırır.",
                "The lesson gives this as the motivation for ensembles: a single tree is highly sensitive to small changes in the data. Combining many trees removes that instability.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Torbalama (bagging) stratejisinde ağaçlar nasıl eğitilir ve nihai tahmin nasıl elde edilir?",
                "In the bagging strategy, how are the trees trained and how is the final prediction obtained?",
              ],
              options: [
                [
                  "Paralel olarak, farklı rastgele alt kümelerle eğitilir; tahmin ağaçların oylarının ortalamasıdır",
                  "Trained in parallel on different random subsets; the prediction is the average of the trees' votes",
                ],
                ["Sırayla eğitilir, her ağaç öncekinin hatasına odaklanır", "Trained sequentially, each tree focusing on the previous one's errors"],
                ["Tek bir ağaç eğitilir, sonra kopyalanır", "A single tree is trained and then copied"],
                ["Ağaçlar birbirinin verisini paylaşmaz, tamamen bağımsızdır", "The trees share no data at all and are completely independent"],
              ],
              answer: 0,
              explain: [
                "Metin bagging'i (Random Forest) tam olarak böyle tanımlar: yüzlerce ağaç paralel olarak farklı rastgele alt kümelerle eğitilir, sonuç oyların ortalamasıdır.",
                "The lesson defines bagging (Random Forest) exactly this way: hundreds of trees trained in parallel on different random subsets, with the result being the average of the votes.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Artırma (boosting) stratejisinde her yeni ağaç neye odaklanır?",
                "In the boosting strategy, what does each new tree focus on?",
              ],
              options: [
                [
                  "Önceki ağaçların hata yaptığı örneklere",
                  "The examples the previous trees got wrong",
                ],
                ["Rastgele seçilen bir alt kümeye", "A randomly chosen subset"],
                ["Yalnızca en kolay örneklere", "Only the easiest examples"],
                ["Tüm veriye eşit ağırlıkla", "All the data with equal weight"],
              ],
              answer: 0,
              explain: [
                "Metin artırmayı sıralı bir düzeltme süreci olarak tanımlar: her yeni ağaç, önceki ağaçların yanlış tahmin ettiği örneklere odaklanarak modeli adım adım düzeltir.",
                "The lesson describes boosting as a sequential correction process: each new tree focuses on the examples the previous trees predicted wrongly, correcting the model step by step.",
              ],
            }),
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
            quiz({
              id: "q5",
              q: [
                "Koddaki `RandomForestClassifier`'da `n_jobs=-1` parametresi ne işe yarar?",
                "What does `n_jobs=-1` do for `RandomForestClassifier` in the code?",
              ],
              options: [
                ["Eğitim için tüm işlemci çekirdeklerini kullanır", "It uses all CPU cores for training"],
                ["Yalnızca bir çekirdek kullanır", "It uses only one core"],
                ["Ağaç sayısını sınırlar", "It limits the number of trees"],
                ["Modelin doğruluğunu artırır", "It increases the model's accuracy"],
              ],
              answer: 0,
              explain: [
                "Kod yorumu bunu belirtir: \"tüm çekirdekleri kullan.\" Rastgele ormandaki ağaçlar birbirinden bağımsız (paralel) eğitildiği için, bu paralelliği donanımda gerçek hıza çevirir.",
                "The code comment says it: \"use all cores.\" Because a random forest's trees are trained independently (in parallel), this turns that parallelism into real hardware speed.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "Gradyan artırmada `learning_rate` küçük tutulup `n_estimators` yüksek tutulduğunda ne olur?",
                "What happens when `learning_rate` is kept small and `n_estimators` high in gradient boosting?",
              ],
              options: [
                [
                  "Daha iyi genelleme sağlanır — küçük adım + çok ağaç kombinasyonu",
                  "Better generalisation is achieved — the combination of small steps and many trees",
                ],
                ["Eğitim anında biter", "Training finishes instantly"],
                ["Model kesinlikle yetersiz öğrenir (underfit)", "The model is guaranteed to underfit"],
                ["Hiçbir etkisi yoktur", "It has no effect at all"],
              ],
              answer: 0,
              explain: [
                "Kod yorumu tam bunu söyler: \"küçük adım + çok ağaç = daha iyi genelleme.\" Her ağaç yalnızca küçük bir düzeltme yaptığından, model gürültüye hızlı uyum sağlamak yerine kademeli ve dengeli öğrenir.",
                "The code comment says exactly this: \"small step + many trees = better generalisation.\" Since each tree makes only a small correction, the model learns gradually and steadily rather than rapidly fitting the noise.",
              ],
            }),
            info(
              "Hangisini seçmeli?",
              "Which should you choose?",
              "**Rastgele orman** — hızlı başlangıç için ideal. Varsayılan ayarlarla bile iyi çalışır, aşırı öğrenmeye dayanıklıdır, paralel eğitilir. Zaman kısıtlıysa veya modeli çok fazla ayarlayacak imkânın yoksa bunu seç.\n\n**Gradyan artırma (XGBoost / LightGBM)** — tablo verisinde bugün hâlâ **en yüksek doğruluğu** veren yöntem. Kaggle yarışmalarının çoğunu bu kazanır. Ama `learning_rate`, `max_depth`, `n_estimators` ayarlarına duyarlıdır ve dikkatsiz kullanılırsa aşırı öğrenir.\n\nÖnemli not: tablo verisinde bu iki yöntem genellikle derin öğrenmeyi **yener**. Sinir ağları görüntü, ses ve metinde üstündür; satır-sütun verisinde ağaçlar hâlâ kraldır.",
              "**Random forest** — ideal for a fast start. It works well even at default settings, resists overfitting and trains in parallel. Choose it when time is short or you cannot afford much tuning.\n\n**Gradient boosting (XGBoost / LightGBM)** — still the method that delivers the **highest accuracy** on tabular data today. It wins most Kaggle competitions. But it is sensitive to `learning_rate`, `max_depth` and `n_estimators`, and overfits if used carelessly.\n\nAn important note: on tabular data these two usually **beat** deep learning. Neural networks dominate images, audio and text; on rows and columns, trees are still king.",
            ),
            quiz({
              id: "q7",
              q: [
                "Zaman kısıtlıysa ve modeli çok fazla ayarlayacak imkânın yoksa metne göre hangisini seçmelisin?",
                "According to the lesson, which should you choose if time is short and you cannot tune much?",
              ],
              options: [
                ["Rastgele orman", "Random forest"],
                ["Gradyan artırma", "Gradient boosting"],
                ["İkisi de aynı çabayı gerektirir", "Both require the same effort"],
                ["Hiçbiri, tek bir karar ağacı yeterlidir", "Neither, a single decision tree is enough"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan önerir: rastgele orman varsayılan ayarlarla bile iyi çalışır ve aşırı öğrenmeye dayanıklıdır — hızlı başlangıç için ideal seçimdir.",
                "The lesson recommends this directly: random forest works well even at default settings and resists overfitting — it is the ideal choice for a fast start.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Gradyan artırma neden dikkatli kullanılmalıdır?",
                "Why must gradient boosting be used carefully?",
              ],
              options: [
                [
                  "`learning_rate`, `max_depth`, `n_estimators` gibi ayarlara duyarlıdır ve dikkatsiz kullanılırsa aşırı öğrenir",
                  "It is sensitive to settings like `learning_rate`, `max_depth`, `n_estimators`, and overfits if used carelessly",
                ],
                ["Yalnızca görüntü verisinde çalışır", "It only works on image data"],
                ["Paralel eğitilemez", "It cannot be trained in parallel"],
                ["Hiçbir ayarı yoktur", "It has no settings at all"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: en yüksek doğruluğu verse de dikkatsiz kullanımda aşırı öğrenmeye eğilimlidir; bu yüzden rastgele ormandan daha fazla ayar gerektirir.",
                "The lesson states this plainly: although it delivers the highest accuracy, careless use makes it prone to overfitting — so it needs more tuning than a random forest.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Tablo (satır-sütun) verisinde topluluk ağaçları ile derin öğrenme karşılaştırıldığında metne göre ne söylenebilir?",
                "According to the lesson, how do ensemble trees compare with deep learning on tabular data?",
              ],
              options: [
                [
                  "Ağaç yöntemleri tablo verisinde genellikle derin öğrenmeyi yener",
                  "Tree methods usually beat deep learning on tabular data",
                ],
                ["Derin öğrenme her zaman üstündür", "Deep learning is always superior"],
                ["İkisi tablo verisinde birbirinin aynısıdır", "The two are identical on tabular data"],
                ["Derin öğrenme tablo verisinde kullanılamaz", "Deep learning cannot be used on tabular data at all"],
              ],
              answer: 0,
              explain: [
                "Metin bunu önemli bir not olarak ekler: sinir ağları görüntü, ses ve metinde üstündür ama satır-sütun verisinde ağaçlar hâlâ kraldır.",
                "The lesson adds this as an important note: neural networks dominate images, audio and text, but on rows and columns, trees are still king.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Rastgele ormanda her ağacın her bölmede özelliklerin de rastgele bir alt kümesine bakması neyi sağlar?",
                "What does it achieve when each tree in a random forest also looks at a random subset of features at every split?",
              ],
              options: [
                [
                  "Ağaçlar arasında ek bir çeşitlilik kaynağı ekler; sadece veri değil özellikler de rastgele olur",
                  "It adds an extra source of diversity among the trees; not just the data but the features are randomised too",
                ],
                ["Eğitim verisini büyütür", "It enlarges the training data"],
                ["Sınıf dengesizliğini düzeltir", "It fixes class imbalance"],
                ["Ağaçların derinliğini otomatik ayarlar", "It automatically tunes tree depth"],
              ],
              answer: 0,
              explain: [
                "Metin bunu bagging tanımının içinde belirtir: rastgele veri alt kümelerinin yanına, her bölmede rastgele özellik alt kümesi de eklenir — bu, ağaçların birbirinden daha da farklılaşmasını sağlayarak topluluğun gücünü artırır.",
                "The lesson notes this within the bagging definition: alongside random data subsets, a random feature subset is used at every split too — this makes the trees even more different from each other, strengthening the ensemble.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Regresyon katsayıları parametre midir yoksa hiperparametre midir?",
                "Are regression coefficients a parameter or a hyperparameter?",
              ],
              options: [
                ["Parametre — modelin veriden öğrendiği şeydir", "A parameter — it is what the model learns from the data"],
                ["Hiperparametre — senin önceden belirlediğin ayardır", "A hyperparameter — a setting you fix beforehand"],
                ["İkisi de değildir", "Neither"],
                ["Duruma göre değişir", "It depends on the situation"],
              ],
              answer: 0,
              explain: [
                "Metin parametreyi \"modelin veriden öğrendiği şey\" olarak tanımlar ve regresyon katsayılarını doğrudan örnek verir. Ağaç derinliği veya öğrenme oranı gibi ayarlar ise hiperparametredir.",
                "The lesson defines a parameter as \"what the model learns from the data\" and gives regression coefficients as the direct example. Settings like tree depth or learning rate are hyperparameters instead.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metne göre hiperparametreleri elle denemek neden kötüdür?",
                "According to the lesson, why is tuning hyperparameters by hand a bad idea?",
              ],
              options: [
                [
                  "Yavaştır, kombinasyonlar kaçırılır ve test kümesine bakarak seçim yaparsan kümeyi kirletirsin",
                  "It is slow, you miss combinations, and selecting by looking at the test set contaminates it",
                ],
                ["Yalnızca büyük veri setlerinde kötüdür", "It is only bad on large datasets"],
                ["Elle denemek her zaman en iyi sonucu verir", "Manual tuning always gives the best result"],
                ["Hiçbir sakıncası yoktur", "There is no downside at all"],
              ],
              answer: 0,
              explain: [
                "Metin bu üç sebebi sıralar. En önemlisi son madde: test kümesine bakarak seçim yapmak, o kümenin bağımsızlığını bozar ve raporlanan başarıyı yapay olarak yükseltir.",
                "The lesson lists exactly these three reasons. The most important is the last: selecting by looking at the test set breaks its independence and artificially inflates the reported score.",
              ],
            }),
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
            quiz({
              id: "q4",
              q: [
                "Koddaki ızgarada `n_estimators` için 3, `max_depth` için 4, `min_samples_leaf` için 3 değer var ve `cv=5`. Toplam kaç model eğitilir?",
                "The grid in the code has 3 values for `n_estimators`, 4 for `max_depth`, 3 for `min_samples_leaf`, with `cv=5`. How many models get trained in total?",
              ],
              options: [
                ["180 — (3×4×3=36 kombinasyon) × 5 kat", "180 — (3×4×3=36 combinations) × 5 folds"],
                ["36 — yalnızca kombinasyon sayısı kadar", "36 — just the number of combinations"],
                ["5 — yalnızca kat sayısı kadar", "5 — just the number of folds"],
                ["12 — parametre sayılarının toplamı kadar", "12 — the sum of the parameter counts"],
              ],
              answer: 0,
              explain: [
                "Koddaki yorum bunu hesaplar: 3×4×3 = 36 kombinasyon, her biri 5 katla çapraz doğrulanır, toplamda 180 eğitim yapılır. Bu, ızgara aramanın neden yavaşladığını gösterir.",
                "The code's comment does this arithmetic: 3×4×3 = 36 combinations, each cross-validated across 5 folds, for 180 trainings in total. This shows exactly why grid search gets slow.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Koddaki `scoring=\"f1\"` parametresi neden `\"accuracy\"` yerine seçilmiş olabilir?",
                "Why might `scoring=\"f1\"` have been chosen over `\"accuracy\"` in the code?",
              ],
              options: [
                [
                  "Metrik iş hedefine göre seçilmeli; dengesiz veri gibi durumlarda F1 daha anlamlıdır",
                  "The metric must fit the business goal; F1 is more meaningful on imbalanced data, for instance",
                ],
                ["F1 her zaman daha hızlı hesaplanır", "F1 is always faster to compute"],
                ["Accuracy sklearn'de artık desteklenmiyor", "Accuracy is no longer supported by scikit-learn"],
                ["Fark etmez, ikisi aynı sayıyı verir", "It does not matter, both give the same number"],
              ],
              answer: 0,
              explain: [
                "Kod yorumu bunu vurgular: \"metriği İŞ hedefine göre seç, varsayılana bırakma.\" F1, precision ve recall'u dengelediği için dengesiz sınıflarda accuracy'den daha bilgilendiricidir.",
                "The code comment stresses this: \"pick the metric to match the business goal, do not leave it at the default.\" F1 balances precision and recall, making it more informative than accuracy on imbalanced classes.",
              ],
            }),
            tip(
              "Rastgele arama genellikle ızgaradan iyidir",
              "Random search usually beats grid search",
              "Izgara arama tüm kombinasyonları dener ve arama uzayı büyüdükçe katlanarak yavaşlar. `RandomizedSearchCV` ise rastgele kombinasyonlar dener ve şaşırtıcı bir gerçek vardır: **aynı süre içinde genellikle daha iyi sonuç bulur.**\n\nSebep şu: hiperparametrelerin çoğu sonucu pek etkilemez, birkaçı çok etkiler. Izgara arama önemsiz parametrelerin tüm değerlerini denemek için zaman harcar; rastgele arama ise önemli parametrenin daha çok farklı değerini görür.\n\nDaha da iyisi için `Optuna` gibi Bayesçi optimizasyon kütüphanelerine bak — önceki denemelerden öğrenerek arama yaparlar.",
              "Grid search tries every combination and slows down exponentially as the space grows. `RandomizedSearchCV` tries random combinations instead, and there is a surprising fact: **it usually finds a better result in the same amount of time.**\n\nThe reason: most hyperparameters barely affect the outcome while a few affect it a lot. Grid search spends time trying every value of the irrelevant ones; random search sees more distinct values of the one that matters.\n\nFor better still, look at Bayesian optimisation libraries such as `Optuna` — they learn from previous trials as they search.",
            ),
            quiz({
              id: "q6",
              q: [
                "Rastgele arama (RandomizedSearchCV) genellikle ızgara aramadan (GridSearchCV) neden daha iyi sonuç bulur?",
                "Why does random search (RandomizedSearchCV) usually find a better result than grid search (GridSearchCV)?",
              ],
              options: [
                [
                  "Aynı sürede, gerçekten önemli olan hiperparametrenin daha çok farklı değerini dener",
                  "In the same amount of time, it tries more distinct values of the hyperparameter that actually matters",
                ],
                ["Rastgele arama her zaman tüm kombinasyonları dener", "Random search always tries every combination"],
                ["Izgara arama artık desteklenmiyor", "Grid search is no longer supported"],
                ["Rastgele arama hiçbir kombinasyonu kaçırmaz", "Random search never misses a combination"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıklar: ızgara arama önemsiz parametrelerin tüm değerlerini denemeye zaman harcarken, rastgele arama önemli parametrenin daha fazla farklı değerini görür.",
                "The lesson explains this: grid search wastes time trying every value of irrelevant parameters, while random search sees more distinct values of the parameter that actually matters.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Rastgele aramanın işe yaramasının altında yatan sebep metne göre nedir?",
                "According to the lesson, what is the underlying reason random search works?",
              ],
              options: [
                [
                  "Hiperparametrelerin çoğu sonucu pek etkilemez, sadece birkaçı çok etkiler",
                  "Most hyperparameters barely affect the outcome; only a few affect it a lot",
                ],
                ["Rastgele arama daha az bellek kullanır", "Random search uses less memory"],
                ["Tüm hiperparametreler eşit derecede önemlidir", "All hyperparameters matter equally"],
                ["Rastgele arama çapraz doğrulama kullanmaz", "Random search does not use cross-validation"],
              ],
              answer: 0,
              explain: [
                "Metin bu gerçeği açıkça vurgular: eğer tüm parametreler eşit derecede önemli olsaydı ızgara arama en iyisi olurdu, ama gerçekte birkaç parametre baskındır ve rastgele arama onlara daha çok örnek ayırır.",
                "The lesson stresses this fact directly: if all parameters mattered equally, grid search would be best, but in reality a few parameters dominate, and random search allocates more samples to them.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "`Optuna` gibi Bayesçi optimizasyon kütüphaneleri rastgele aramadan farklı olarak ne yapar?",
                "Unlike random search, what do Bayesian optimisation libraries such as `Optuna` do?",
              ],
              options: [
                [
                  "Önceki denemelerden öğrenerek bir sonraki denemeyi daha akıllıca seçer",
                  "They learn from previous trials to choose the next trial more intelligently",
                ],
                ["Yalnızca sabit bir ızgara kullanır", "They only use a fixed grid"],
                ["Çapraz doğrulamayı devre dışı bırakır", "They disable cross-validation"],
                ["Yalnızca derin öğrenme modellerinde çalışır", "They only work with deep learning models"],
              ],
              answer: 0,
              explain: [
                "Metin bunu belirtir: Bayesçi kütüphaneler önceki denemelerden öğrenerek arama yapar — rastgele veya ızgara aramanın aksine, bir sonraki denemeyi kör seçmezler.",
                "The lesson states this: Bayesian libraries search by learning from previous trials — unlike random or grid search, they do not pick the next trial blindly.",
              ],
            }),
            pitfall(
              "Metrik seçimi hiperparametreden önemlidir",
              "Metric choice matters more than hyperparameters",
              "`scoring=\"accuracy\"` bırakıp dengesiz veride arama yapmak, en iyi ayarları **yanlış hedefe göre** seçmek demektir. Dolandırıcılık tespitinde recall önemliyse `scoring=\"recall\"`, dengeli bir tercih istiyorsan `\"f1\"`, olasılık kalitesi önemliyse `\"roc_auc\"` kullan.\n\nHiperparametre ayarı modeli %2 iyileştirir; yanlış metrik seçimi modeli **tamamen işe yaramaz** kılar.",
              "Leaving `scoring=\"accuracy\"` while searching on imbalanced data means picking the best settings **against the wrong target**. If recall matters in fraud detection use `scoring=\"recall\"`; for a balanced trade-off use `\"f1\"`; if probability quality matters use `\"roc_auc\"`.\n\nHyperparameter tuning improves a model by 2%; choosing the wrong metric makes it **entirely useless**.",
            ),
            quiz({
              id: "q9",
              q: [
                "Dengesiz veride `scoring=\"accuracy\"` bırakarak hiperparametre araması yapmanın sorunu nedir?",
                "What is the problem with leaving `scoring=\"accuracy\"` while searching hyperparameters on imbalanced data?",
              ],
              options: [
                [
                  "En iyi ayarlar yanlış hedefe göre seçilir",
                  "The best settings get picked against the wrong target",
                ],
                ["Arama çok daha yavaş olur", "The search becomes much slower"],
                ["Çapraz doğrulama çalışmaz", "Cross-validation stops working"],
                ["Model artık eğitilemez", "The model can no longer be trained"],
              ],
              answer: 0,
              explain: [
                "Metin bunu net söyler: dengesiz veride accuracy neredeyse anlamsızdır, o yüzden bu metrikle yapılan arama, işe gerçekten yarayan ayarları değil, yanıltıcı bir sayıyı en üste çıkaran ayarları bulur.",
                "The lesson states it plainly: accuracy is nearly meaningless on imbalanced data, so a search using that metric surfaces the settings that maximise a misleading number, not the ones that actually work.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Metne göre hiperparametre ayarı ile metrik seçimi arasındaki önem farkı nedir?",
                "According to the lesson, how does the importance of hyperparameter tuning compare with metric choice?",
              ],
              options: [
                [
                  "Hiperparametre ayarı modeli ~%2 iyileştirir; yanlış metrik seçimi modeli tamamen işe yaramaz kılar",
                  "Hyperparameter tuning improves a model by ~2%; the wrong metric choice makes it entirely useless",
                ],
                ["İkisi de eşit derecede önemsizdir", "Both are equally unimportant"],
                ["Hiperparametre ayarı her zaman metrik seçiminden daha önemlidir", "Hyperparameter tuning always matters more than metric choice"],
                ["Metrik seçimi sadece raporlamayı etkiler, sonucu etkilemez", "Metric choice only affects reporting, not the result"],
              ],
              answer: 0,
              explain: [
                "Metnin son cümlesi bunu tam olarak söyler: küçük bir kazanç için hiperparametre ayarına odaklanıp yanlış metrikle arama yapmak, çok daha büyük ve gizli bir hataya yol açar.",
                "The lesson's closing line says this exactly: focusing on hyperparameter tuning for a small gain while searching with the wrong metric leads to a much larger, hidden mistake.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Kredi başvurusu reddedilen bir müşterinin \"neden?\" diye sorma hakkı metne göre nereden gelir?",
                "According to the lesson, where does a rejected customer's right to ask \"why?\" come from?",
              ],
              options: [
                ["Birçok ülkede yasal bir zorunluluktur", "In many countries it is a legal requirement"],
                ["Yalnızca şirket politikasıdır, zorunlu değildir", "It is only company policy, not mandatory"],
                ["Yalnızca teknik bir öneridir", "It is only a technical suggestion"],
                ["Modelin kendisinin bir özelliğidir", "It is a built-in feature of the model itself"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça belirtir: birçok ülkede bu yasal bir zorunluluktur, bu yüzden modelin \"öyle dedi\" cevabını insanın anlayacağı bir açıklamaya çevirmek isteğe bağlı değildir.",
                "The lesson states this directly: in many countries this is a legal requirement, so turning the model's \"because\" into a human-understandable answer is not optional.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "\"Model genel olarak neye bakıyor, hangi özellikler önemli?\" sorusu hangi düzeyde açıklamadır?",
                "\"What does the model look at in general, which features matter?\" is which level of explanation?",
              ],
              options: [
                ["Küresel (global)", "Global"],
                ["Yerel (local)", "Local"],
                ["Ne küresel ne yerel", "Neither global nor local"],
                ["İkisi birden, ayrım yok", "Both at once, there is no distinction"],
              ],
              answer: 0,
              explain: [
                "Metin küresel açıklamayı modelin genel eğilimini anlamak için tanımlar. Belirli bir müşterinin neden reddedildiği ise yerel açıklamanın alanına girer.",
                "The lesson defines global explanation as understanding the model's overall tendencies. Why one specific customer was rejected falls under local explanation instead.",
              ],
            }),
            text(
              "**Pratik yorumlanabilirlik araçları:**\n\n- **Özellik önemi (feature importance)** — Ağaç modellerinde hazır gelir. Ama dikkat: korelasyonlu özellikler arasında önemi keyfî böler, o yüzden tek başına yanıltıcıdır.\n- **Permütasyon önemi** — Bir sütunu rastgele karıştırıp modelin ne kadar kötüleştiğine bakar. Daha güvenilirdir çünkü modelin gerçekte o sütuna ne kadar dayandığını ölçer.\n- **SHAP değerleri** — Her tahmin için her özelliğin katkısını hesaplar: \"bu müşterinin skorunu son giriş tarihi −0,3 düşürdü, harcaması +0,1 yükseltti\". Bugünün standart aracıdır ve hem küresel hem yerel çalışır.\n- **Kısmi bağımlılık grafiği (PDP)** — Bir özellik değiştikçe tahmin nasıl değişiyor? Doğrusal olmayan ilişkileri görselleştirir.",
              "**Practical interpretability tools:**\n\n- **Feature importance** — comes built into tree models. But beware: it splits importance arbitrarily among correlated features, so it misleads on its own.\n- **Permutation importance** — shuffles one column at random and measures how much worse the model gets. More reliable, because it measures how much the model actually relies on that column.\n- **SHAP values** — compute each feature's contribution to each prediction: \"the last login date pushed this customer's score down 0.3, their spend pushed it up 0.1\". This is today's standard tool and works both globally and locally.\n- **Partial dependence plots (PDP)** — how does the prediction change as one feature varies? Visualises non-linear relationships.",
            ),
            quiz({
              id: "q4",
              q: [
                "Ağaç modellerinde hazır gelen özellik önemi (feature importance) neden tek başına yanıltıcı olabilir?",
                "Why can built-in feature importance from tree models be misleading on its own?",
              ],
              options: [
                [
                  "Korelasyonlu özellikler arasında önemi keyfî böler",
                  "It splits importance arbitrarily among correlated features",
                ],
                ["Yalnızca sayısal özelliklerde çalışır", "It only works for numeric features"],
                ["Hiçbir zaman hesaplanamaz", "It can never actually be computed"],
                ["Yalnızca lojistik regresyonda bulunur", "It only exists in logistic regression"],
              ],
              answer: 0,
              explain: [
                "Metin bu uyarıyı açıkça verir: iki özellik birbiriyle korelasyonluysa (örn. yaş ve deneyim yılı), önem aralarında keyfî bölünür ve gerçek etkiyi tek başına yansıtmaz.",
                "The lesson gives this warning directly: if two features correlate (e.g. age and years of experience), importance is split between them arbitrarily and does not reflect the true effect on its own.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Permütasyon önemi nasıl hesaplanır ve neden özellik önemine göre daha güvenilirdir?",
                "How is permutation importance computed, and why is it more reliable than built-in feature importance?",
              ],
              options: [
                [
                  "Bir sütunu rastgele karıştırıp modelin ne kadar kötüleştiğini ölçer; modelin sütuna gerçek bağımlılığını yansıtır",
                  "It shuffles a column at random and measures how much worse the model gets; it reflects the model's real reliance on that column",
                ],
                ["Sütunu tamamen siler ve modeli yeniden eğitir", "It deletes the column entirely and retrains the model"],
                ["Yalnızca korelasyon katsayısına bakar", "It only looks at the correlation coefficient"],
                ["Sadece eğitim verisinde çalışır, test verisinde çalışmaz", "It only works on training data, not test data"],
              ],
              answer: 0,
              explain: [
                "Metin bunu tam olarak tanımlar: bir sütunu rastgele karıştırıp modelin performansındaki düşüşü ölçmek, modelin o sütuna gerçekte ne kadar dayandığını gösterir — korelasyondan etkilenmeyen doğrudan bir ölçüdür.",
                "The lesson defines this precisely: shuffling a column at random and measuring the drop in model performance shows how much the model actually relies on that column — a direct measure unaffected by correlation.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "SHAP değerleri neyi hesaplar ve bugünün standart aracı olarak neden öne çıkar?",
                "What do SHAP values compute, and why do they stand out as today's standard tool?",
              ],
              options: [
                [
                  "Her tahmin için her özelliğin katkısını hesaplar; hem küresel hem yerel çalışır",
                  "They compute each feature's contribution to each prediction; they work both globally and locally",
                ],
                ["Yalnızca modelin genel doğruluğunu hesaplar", "They only compute the model's overall accuracy"],
                ["Yalnızca ağaç modellerinde çalışır", "They only work with tree models"],
                ["Verideki eksik değerleri hesaplar", "They compute the missing values in the data"],
              ],
              answer: 0,
              explain: [
                "Metin SHAP'ı hem küresel hem yerel çalışan tek araç olarak öne çıkarır: her özelliğin her tek tahmindeki katkısını sayısal olarak verir, bu da onu bugünün standardı yapar.",
                "The lesson highlights SHAP as the one tool that works both globally and locally: it gives a numeric contribution for every feature in every single prediction, which is why it is today's standard.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Kısmi bağımlılık grafiği (PDP) neyi gösterir?",
                "What does a partial dependence plot (PDP) show?",
              ],
              options: [
                [
                  "Bir özellik değiştikçe tahminin nasıl değiştiğini, doğrusal olmayan ilişkileri görselleştirerek",
                  "How the prediction changes as one feature varies, visualising non-linear relationships",
                ],
                ["Modelin eğitim süresini", "The model's training time"],
                ["Özellikler arasındaki korelasyonu", "The correlation between features"],
                ["Eksik veri oranını", "The proportion of missing data"],
              ],
              answer: 0,
              explain: [
                "Metin PDP'yi tam olarak bu şekilde tanımlar: bir özelliği değiştirip tahminin nasıl tepki verdiğini çizerek doğrusal olmayan ilişkileri görsel olarak ortaya koyar.",
                "The lesson defines a PDP exactly this way: it varies one feature and plots how the prediction responds, making non-linear relationships visible.",
              ],
            }),
            pitfall(
              "Yorumlanabilirlik nedensellik değildir",
              "Interpretability is not causality",
              "SHAP \"son giriş tarihi bu tahmini en çok etkileyen faktör\" dediğinde, bu **modelin neye baktığını** anlatır — gerçek dünyada neyin sebep olduğunu değil.\n\nModel, ayrılacak müşterilerin giriş yapmayı bıraktığını öğrenmiştir. Ama müşteriyi zorla giriş yaptırmak onu tutmaz; giriş yapmaması ayrılmanın **sebebi değil belirtisidir**. Aksiyon almak için nedensel analiz gerekir.\n\nBu ayrımı kaçırmak, \"modele göre X önemli, o hâlde X'i değiştirelim\" gibi pahalı ve sonuçsuz kararlara yol açar.",
              "When SHAP says \"last login date is the biggest driver of this prediction\", it describes **what the model looks at** — not what causes the outcome in the real world.\n\nThe model has learned that customers about to churn stop logging in. But forcing a customer to log in will not retain them; not logging in is a **symptom of churn, not its cause**. Taking action requires causal analysis.\n\nMissing this distinction leads to expensive, fruitless decisions of the form \"the model says X matters, so let's change X\".",
            ),
            quiz({
              id: "q8",
              q: [
                "SHAP \"son giriş tarihi en etkili faktör\" dediğinde, bu ne anlama gelir?",
                "When SHAP says \"last login date is the biggest driver\", what does that actually mean?",
              ],
              options: [
                [
                  "Modelin neye baktığını gösterir, gerçek dünyada neyin sebep olduğunu değil",
                  "It describes what the model looks at, not what causes the outcome in the real world",
                ],
                ["Giriş tarihinin ayrılmanın gerçek nedeni olduğunu kanıtlar", "It proves login date is the true cause of churn"],
                ["Modelin hatalı olduğunu gösterir", "It shows the model is faulty"],
                ["Bu özelliğin verisetinden çıkarılması gerektiğini gösterir", "It shows this feature should be removed from the dataset"],
              ],
              answer: 0,
              explain: [
                "Metin bu ayrımı net çizer: SHAP modelin dikkatini nereye verdiğini gösterir, ama bu bir nedensellik iddiası değildir. Nedensellik için ayrı bir analiz gerekir.",
                "The lesson draws this distinction clearly: SHAP shows where the model's attention goes, but that is not a causal claim. Establishing causality requires separate analysis.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Bir müşteriyi zorla giriş yaptırmak neden onu tutmaz, pitfall metnine göre?",
                "Why won't forcing a customer to log in retain them, according to the pitfall block?",
              ],
              options: [
                [
                  "Giriş yapmama ayrılmanın belirtisidir, sebebi değildir",
                  "Not logging in is a symptom of churn, not its cause",
                ],
                ["Giriş yapmak teknik olarak imkânsızdır", "Logging in is technically impossible"],
                ["Model bu müşteriler için hiç çalışmaz", "The model does not work for these customers at all"],
                ["Giriş sıklığı hiçbir tahminle ilişkili değildir", "Login frequency is unrelated to any prediction"],
              ],
              answer: 0,
              explain: [
                "Metin bunu doğrudan söyler: ayrılacak müşteriler zaten giriş yapmayı bırakıyor, ama bu bir belirtidir — giriş yaptırmak, ayrılmalarının altındaki gerçek sebebi (memnuniyetsizlik, ihtiyaç değişimi vb.) çözmez.",
                "The lesson says this directly: customers about to churn already stop logging in, but that is a symptom — forcing logins does not address the real underlying cause of their churn (dissatisfaction, changed needs, etc.).",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "\"Modele göre X önemli, o hâlde X'i değiştirelim\" mantığı pitfall metnine göre neden tehlikelidir?",
                "Why is the logic \"the model says X matters, so let's change X\" dangerous, according to the pitfall block?",
              ],
              options: [
                [
                  "Yorumlanabilirlik nedensellik değildir; bu mantık pahalı ve sonuçsuz kararlara yol açar",
                  "Interpretability is not causality; this reasoning leads to expensive, fruitless decisions",
                ],
                ["X'i değiştirmek her zaman modelin doğruluğunu düşürür", "Changing X always lowers the model's accuracy"],
                ["Bu mantık yalnızca SHAP için değil, hiçbir araç için geçerli değildir", "This reasoning is invalid for any tool, not just SHAP"],
                ["X değişkeni asla ölçülemez", "The X variable can never be measured"],
              ],
              answer: 0,
              explain: [
                "Metnin son cümlesi bu tam olarak budur: yorumlanabilirlik aracının önemli dediği bir değişkeni değiştirmek, nedensel bir etkiye sahip olmayabilir ve kaynakları boşa harcatır.",
                "This is exactly the lesson's closing point: changing a variable an interpretability tool flags as important may have no causal effect, wasting resources for nothing.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Yeni bir pazarlama kampanyasının tamamen farklı bir müşteri profili getirmesi hangi kayma türüne örnektir?",
                "A new marketing campaign bringing a completely different customer profile is an example of which kind of drift?",
              ],
              options: [
                ["Veri kayması (data drift)", "Data drift"],
                ["Kavram kayması (concept drift)", "Concept drift"],
                ["Etiket gecikmesi", "Label delay"],
                ["Hiçbiri, bu normal bir durumdur", "None of these, it is a normal situation"],
              ],
              answer: 0,
              explain: [
                "Metin bu örneği tam olarak veri kayması için verir: girdi dağılımı değişir, model daha önce hiç görmediği bir profille karşılaşır.",
                "The lesson gives this exact example for data drift: the input distribution changes, and the model encounters a profile it has never seen before.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Pandemide \"evden alışveriş\" davranışının normalleşmesi hangi kayma türüne örnektir?",
                "The normalisation of \"shopping from home\" during the pandemic is an example of which kind of drift?",
              ],
              options: [
                ["Kavram kayması (concept drift)", "Concept drift"],
                ["Veri kayması (data drift)", "Data drift"],
                ["Etiket gecikmesi", "Label delay"],
                ["Hiçbiri", "None of these"],
              ],
              answer: 0,
              explain: [
                "Metin bunu kavram kayması örneği olarak verir: girdi-çıktı ilişkisinin kendisi değişmiştir — eskiden anormal sayılan bir desen artık normal hale gelmiştir.",
                "The lesson gives this as an example of concept drift: the input-output relationship itself changed — a pattern once flagged as anomalous is no longer abnormal.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Bir müşterinin gerçekten ayrılıp ayrılmadığını ancak 3 ay sonra öğrenmek metinde hangi kavramla adlandırılır?",
                "Learning whether a customer truly churned only three months later is what the lesson calls which concept?",
              ],
              options: [
                ["Etiket gecikmesi", "Label delay"],
                ["Veri kayması", "Data drift"],
                ["Kavram kayması", "Concept drift"],
                ["Model kararsızlığı", "Model instability"],
              ],
              answer: 0,
              explain: [
                "Metin bunu \"etiket gecikmesi\" olarak adlandırır ve şu sorunu vurgular: gerçek etiket gelene kadar modelin ne kadar iyi olduğunu doğrudan ölçemezsin.",
                "The lesson names this \"label delay\" and highlights the problem it creates: until the true label arrives, you cannot directly measure how good the model is.",
              ],
            }),
            quiz({
              id: "q5",
              q: [
                "Metne göre bir model dünya değiştiğinde nasıl bozulur?",
                "According to the lesson, how does a model break when the world changes?",
              ],
              options: [
                ["Sessizce — hata mesajı vermeden yanlış tahmin etmeye başlar", "Silently — it starts predicting wrongly without any error message"],
                ["Hemen çökerek programı durdurur", "It immediately crashes and stops the program"],
                ["Otomatik olarak kendini yeniden eğitir", "It automatically retrains itself"],
                ["Kullanıcıya uyarı mesajı gösterir", "It shows a warning message to the user"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça vurgular: model \"sessizce\" bozulur, hata mesajı vermez — sadece yanlış tahmin etmeye başlar. Bu yüzden izleme olmadan bozulmayı fark etmek zordur.",
                "The lesson stresses this explicitly: the model breaks \"silently\", it gives no error message — it just starts predicting wrongly. That is why, without monitoring, the breakage is hard to notice.",
              ],
            }),
            text(
              "**İzlenmesi gereken dört şey — bu sırayla:**\n\n1. **Girdi dağılımları** — Her özelliğin ortalaması, medyanı ve eksik oranı eğitim verisine göre nasıl? Bu, etiket beklemeden ölçebildiğin **tek** şeydir ve bu yüzden en değerlidir.\n2. **Tahmin dağılımı** — Model eskiden %5 \"ayrılır\" derken şimdi %30 diyorsa, bir şey değişmiştir. Etikete ihtiyaç duymadan alarm verir.\n3. **Performans metrikleri** — Etiket geldiğinde gerçek doğruluk. En kesin ama en gecikmeli sinyal.\n4. **İş metrikleri** — Modelin var olma sebebi. Tahmin doğruluğu aynı kalsa bile kâr düşüyorsa bir sorun var.\n\nPratik kural: **girdi kaymasını izle, performansı bekle.** Girdi kayması, performans düşüşünün erken habercisidir.",
              "**Four things to monitor, in this order:**\n\n1. **Input distributions** — how does each feature's mean, median and missing rate compare with the training data? This is the **only** thing you can measure without waiting for labels, which makes it the most valuable.\n2. **Prediction distribution** — if the model used to say \"churn\" 5% of the time and now says 30%, something has changed. It raises an alarm with no labels needed.\n3. **Performance metrics** — real accuracy once labels arrive. The most precise but most delayed signal.\n4. **Business metrics** — the reason the model exists. If profit falls while prediction accuracy holds, something is wrong.\n\nA practical rule: **monitor input drift, wait for performance.** Input drift is the early warning of a performance drop.",
            ),
            quiz({
              id: "q6",
              q: [
                "Metne göre dört izleme sinyalinden hangisi etiket beklemeden ölçülebilen tek şeydir?",
                "According to the lesson, which of the four monitoring signals is the only one you can measure without waiting for labels?",
              ],
              options: [
                ["Girdi dağılımları", "Input distributions"],
                ["Tahmin dağılımı", "Prediction distribution"],
                ["Performans metrikleri", "Performance metrics"],
                ["İş metrikleri", "Business metrics"],
              ],
              answer: 0,
              explain: [
                "Metin girdi dağılımlarını \"etiket beklemeden ölçebildiğin tek şey\" olarak tanımlar ve bu yüzden en değerli sinyal olduğunu söyler.",
                "The lesson defines input distributions as \"the only thing you can measure without waiting for labels\", which is why it calls this the most valuable signal.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Model eskiden %5 \"ayrılır\" derken şimdi %30 diyor, ama gerçek etiketler henüz gelmedi. Metne göre bu neyin örneğidir?",
                "The model used to predict \"churn\" 5% of the time and now says 30%, but the true labels have not arrived yet. According to the lesson, this is an example of what?",
              ],
              options: [
                ["Tahmin dağılımının etiket olmadan alarm vermesi", "The prediction distribution raising an alarm without labels"],
                ["Performans metriğinin düşmesi", "A drop in a performance metric"],
                ["İş metriğinin bozulması", "A business metric breaking down"],
                ["Etiket gecikmesinin sona ermesi", "The end of label delay"],
              ],
              answer: 0,
              explain: [
                "Metin tam bu örneği tahmin dağılımı için verir: yüzdenin 5'ten 30'a çıkması, hiç etikete ihtiyaç duymadan bir şeyin değiştiğine dair alarm verir.",
                "The lesson gives exactly this example for the prediction distribution: the jump from 5% to 30% raises an alarm that something changed, with no labels needed at all.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Tahmin doğruluğu aynı kalırken kâr düşüyorsa, metne göre bu hangi izleme sinyalinin sorun işaret ettiğini gösterir?",
                "If prediction accuracy holds steady while profit falls, which monitoring signal does the lesson say is flagging a problem?",
              ],
              options: [
                ["İş metrikleri", "Business metrics"],
                ["Girdi dağılımları", "Input distributions"],
                ["Tahmin dağılımı", "Prediction distribution"],
                ["Etiket gecikmesi", "Label delay"],
              ],
              answer: 0,
              explain: [
                "Metin iş metriklerini \"modelin var olma sebebi\" olarak tanımlar: tahmin doğruluğu aynı kalsa bile kâr düşüyorsa bir sorun vardır.",
                "The lesson defines business metrics as \"the reason the model exists\": if profit falls even while prediction accuracy holds, something is wrong.",
              ],
            }),
            quiz({
              id: "q9",
              q: [
                "Metindeki pratik kural nedir?",
                "What is the practical rule given in the lesson?",
              ],
              options: [
                ["Girdi kaymasını izle, performansı bekle", "Monitor input drift, wait for performance"],
                ["Sadece performans metriğini izle, gerisini boşver", "Only monitor the performance metric, ignore the rest"],
                ["İş metriklerini izlemek yeterlidir", "Monitoring business metrics alone is enough"],
                ["Etiket gecikmesi önemsizdir", "Label delay is unimportant"],
              ],
              answer: 0,
              explain: [
                "Metin bu kuralı kalın harflerle verir: girdi kayması, performans düşüşünün erken habercisidir; bu yüzden önce girdi kaymasını izlersin.",
                "The lesson states this rule in bold: input drift is the early warning of a performance drop, which is why you monitor input drift first.",
              ],
            }),
            info(
              "Yeniden eğitim planını baştan yap",
              "Plan retraining from the start",
              "Model üretime alınırken şu üç soruya yazılı cevap vermelisin:\n\n1. **Ne sıklıkla yeniden eğitilecek?** Sabit takvim (her ay) mı, tetikleyiciye bağlı (kayma tespit edilince) mi?\n2. **Yeni model eskisiyle nasıl karşılaştırılacak?** Otomatik olarak mı yayına alınacak, yoksa onaydan mı geçecek?\n3. **Kötüleşirse ne olacak?** Eski sürüme dönüş yolu hazır mı?\n\nBu soruları modeli yazarken cevaplamak on dakika sürer; altı ay sonra kriz anında cevaplamak günler sürer.",
              "When a model goes to production you should have written answers to three questions:\n\n1. **How often will it be retrained?** On a fixed schedule (monthly) or triggered (when drift is detected)?\n2. **How will the new model be compared with the old?** Deployed automatically, or after review?\n3. **What happens if it gets worse?** Is the path back to the previous version ready?\n\nAnswering these while writing the model takes ten minutes; answering them six months later in the middle of an incident takes days.",
            ),
            quiz({
              id: "q10",
              q: [
                "Metne göre bu üç soruyu (yeniden eğitim sıklığı, karşılaştırma, geri dönüş) ne zaman cevaplamak on dakika sürer?",
                "According to the lesson, when does answering these three questions (retraining frequency, comparison, rollback) take only ten minutes?",
              ],
              options: [
                ["Model üretime alınırken, yazılırken", "When the model goes to production, while it is being written"],
                ["Altı ay sonra bir kriz anında", "Six months later, in the middle of a crisis"],
                ["Hiçbir zaman kısa sürmez", "It never takes a short time"],
                ["Model silindikten sonra", "After the model is deleted"],
              ],
              answer: 0,
              explain: [
                "Metin bu karşıtlığı doğrudan kurar: soruları modeli yazarken cevaplamak on dakika sürer, altı ay sonra kriz anında cevaplamaksa günler sürer.",
                "The lesson draws this contrast directly: answering while writing the model takes ten minutes, while answering six months later during an incident takes days.",
              ],
            }),
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
            quiz({
              id: "q2",
              q: [
                "Geçmiş veride belirli bir gruba sistematik olarak daha az kredi verilmişse, model bunu ne olarak öğrenir?",
                "If a particular group was systematically given less credit in the past data, what does the model learn from that?",
              ],
              options: [
                ["\"O grup daha risklidir\" diye öğrenir ve ayrımcılığı ölçeklendirerek sürdürür", "It learns \"this group is riskier\" and perpetuates the discrimination at scale"],
                ["Bu deseni fark eder ve otomatik olarak düzeltir", "It notices the pattern and automatically corrects for it"],
                ["Krediyle ilgisiz olduğu için bu deseni yok sayar", "It ignores the pattern because it is irrelevant to credit"],
                ["Sadece o grubun verisini eğitimden çıkarır", "It simply excludes that group's data from training"],
              ],
              answer: 0,
              explain: [
                "Metin bunu açıkça söyler: model geçmişteki iyi ya da kötü desenleri öğrenir; sistematik olarak az kredi verilen bir grup için bunu \"daha risklidir\" diye öğrenir ve ayrımcılığı ölçeklendirerek sürdürür.",
                "The lesson states this directly: the model learns the good and bad patterns in the past alike; for a systematically under-credited group it learns \"this group is riskier\" and perpetuates the discrimination at scale.",
              ],
            }),
            quiz({
              id: "q3",
              q: [
                "Metindeki işe alım modeli örneğinde ne oldu?",
                "In the lesson's hiring-model example, what happened?",
              ],
              options: [
                [
                  "Geçmiş verideki erkek ağırlığı yüzünden kadın özgeçmişlerini düşük puanladı ve kullanımdan kaldırıldı",
                  "It scored women's CVs lower because of the male skew in the historical data, and was withdrawn",
                ],
                ["Model hiçbir zaman kadın adayları değerlendirmedi", "The model never evaluated female candidates at all"],
                ["Şirket modeli düzelterek kullanmaya devam etti", "The company fixed the model and kept using it"],
                ["Model cinsiyeti hiç dikkate almadı", "The model never took gender into account"],
              ],
              answer: 0,
              explain: [
                "Metin bu ünlü örneği tam olarak verir: geçmiş verideki erkek ağırlığı yüzünden kadın adayların özgeçmişleri sistematik olarak düşük puanlandı ve model kullanımdan kaldırıldı.",
                "The lesson gives this famous example exactly: because of the male skew in the historical data, women's CVs were systematically scored lower, and the model was withdrawn.",
              ],
            }),
            quiz({
              id: "q4",
              q: [
                "Modelden cinsiyet ve etnisite sütununu çıkarmak neden yeterli değildir?",
                "Why is removing the gender and ethnicity columns from the model not enough?",
              ],
              options: [
                [
                  "Model bu bilgiyi semt, okul, isim gibi vekil değişkenlerden yeniden öğrenir",
                  "The model relearns that information from proxies like neighbourhood, school, or name",
                ],
                ["Bu sütunlar zaten modele hiç etki etmiyor", "Those columns had no effect on the model anyway"],
                ["Bu işlem teknik olarak imkânsızdır", "This operation is technically impossible"],
                ["Sütunu çıkarmak modelin doğruluğunu bozar", "Removing the column breaks the model's accuracy"],
              ],
              answer: 0,
              explain: [
                "Metin bunu \"kritik nokta\" olarak vurgular: hassas özelliği çıkarmak yetmez, çünkü model onu semt, okul, isim, hatta alışveriş deseni gibi vekil değişkenlerden yeniden öğrenir.",
                "The lesson highlights this as \"the critical point\": removing the sensitive attribute is not enough, because the model relearns it from proxies like neighbourhood, school, name, even shopping patterns.",
              ],
            }),
            text(
              "**Adalet ölçütleri — ve neden hepsini birden sağlayamazsın:**\n\n- **Demografik eşitlik** — Her grupta pozitif tahmin oranı aynı olsun\n- **Eşit fırsat** — Gerçekten uygun olanlar arasında kabul oranı her grupta aynı olsun (eşit recall)\n- **Kalibrasyon** — \"%70 risk\" dendiğinde her grupta gerçekten %70 çıksın\n\nMatematiksel olarak kanıtlanmış bir sonuç var: **grupların temel oranları farklıysa bu ölçütler aynı anda sağlanamaz.** Birini seçmek zorundasın ve bu seçim teknik değil **etik ve hukuki** bir karardır — veri bilimcinin tek başına vereceği bir karar değildir.",
              "**Fairness criteria — and why you cannot satisfy them all at once:**\n\n- **Demographic parity** — the rate of positive predictions is the same in every group\n- **Equal opportunity** — among those genuinely qualified, the acceptance rate is the same in every group (equal recall)\n- **Calibration** — when the model says \"70% risk\", it really is 70% in every group\n\nThere is a mathematically proven result: **when the groups have different base rates, these criteria cannot all hold simultaneously.** You must pick one, and that choice is not technical but **ethical and legal** — not a decision for the data scientist alone.",
            ),
            quiz({
              id: "q5",
              q: [
                "\"Her grupta pozitif tahmin oranı aynı olsun\" ilkesi metinde hangi adalet ölçütüdür?",
                "The principle \"the rate of positive predictions is the same in every group\" is which fairness criterion in the lesson?",
              ],
              options: [
                ["Demografik eşitlik", "Demographic parity"],
                ["Eşit fırsat", "Equal opportunity"],
                ["Kalibrasyon", "Calibration"],
                ["Etiket gecikmesi", "Label delay"],
              ],
              answer: 0,
              explain: [
                "Metin demografik eşitliği tam olarak bu şekilde tanımlar: her grupta pozitif tahmin oranı aynı olsun.",
                "The lesson defines demographic parity exactly this way: the rate of positive predictions is the same in every group.",
              ],
            }),
            quiz({
              id: "q6",
              q: [
                "\"Gerçekten uygun olanlar arasında kabul oranı her grupta aynı olsun\" tanımı hangi adalet ölçütüne aittir?",
                "The definition \"among those genuinely qualified, the acceptance rate is the same in every group\" belongs to which fairness criterion?",
              ],
              options: [
                ["Eşit fırsat (eşit recall)", "Equal opportunity (equal recall)"],
                ["Demografik eşitlik", "Demographic parity"],
                ["Kalibrasyon", "Calibration"],
                ["Vekil değişken kısıtlaması", "Proxy variable restriction"],
              ],
              answer: 0,
              explain: [
                "Metin eşit fırsatı tam bu şekilde tanımlar: gerçekten uygun olanlar arasında kabul oranı her grupta aynı olsun — yani eşit recall.",
                "The lesson defines equal opportunity exactly this way: among those genuinely qualified, the acceptance rate is the same in every group — that is, equal recall.",
              ],
            }),
            quiz({
              id: "q7",
              q: [
                "Model \"%70 risk\" dediğinde bu oranın her grupta gerçekten %70 çıkması hangi adalet ölçütüdür?",
                "The requirement that when the model says \"70% risk\" it really is 70% in every group is which fairness criterion?",
              ],
              options: [
                ["Kalibrasyon", "Calibration"],
                ["Demografik eşitlik", "Demographic parity"],
                ["Eşit fırsat", "Equal opportunity"],
                ["Veri kayması", "Data drift"],
              ],
              answer: 0,
              explain: [
                "Metin kalibrasyonu tam bu şekilde tanımlar: \"%70 risk\" dendiğinde her grupta gerçekten %70 çıksın.",
                "The lesson defines calibration exactly this way: when the model says \"70% risk\", it really is 70% in every group.",
              ],
            }),
            quiz({
              id: "q8",
              q: [
                "Metne göre üç adalet ölçütü (demografik eşitlik, eşit fırsat, kalibrasyon) neden aynı anda sağlanamaz — ve bunlardan birini seçmek kimin kararıdır?",
                "According to the lesson, why can the three fairness criteria (demographic parity, equal opportunity, calibration) not all hold at once — and whose decision is it to pick one?",
              ],
              options: [
                [
                  "Gruplar farklı temel oranlara sahipse matematiksel olarak birlikte sağlanamazlar; seçim etik ve hukuki bir karardır, sadece veri bilimcinin değil",
                  "When groups have different base rates they cannot mathematically hold together; the choice is an ethical and legal decision, not the data scientist's alone",
                ],
                ["Bu üçü zaten her zaman birlikte sağlanabilir", "All three can actually always be satisfied together"],
                ["Seçim tamamen veri bilimcinin teknik tercihidir", "The choice is purely the data scientist's technical preference"],
                ["Kalibrasyon diğer ikisinden matematiksel olarak daha üstündür", "Calibration is mathematically superior to the other two"],
              ],
              answer: 0,
              explain: [
                "Metin bunu \"matematiksel olarak kanıtlanmış bir sonuç\" olarak verir: gruplar farklı temel oranlara sahipse bu ölçütler aynı anda sağlanamaz, ve hangisinin seçileceği teknik değil etik ve hukuki bir karardır.",
                "The lesson presents this as \"a mathematically proven result\": when groups have different base rates these criteria cannot all hold at once, and which one to pick is an ethical and legal decision, not a technical one.",
              ],
            }),
            text(
              "**Pratik kontrol listesi — her modelde:**\n\n1. **Eğitim verisi kimi temsil ediyor, kimi dışlıyor?** Veri hangi dönemden, hangi coğrafyadan, hangi kanaldan geliyor?\n2. **Performansı alt gruplara ayırarak ölç.** Toplam %85 doğruluk, bir grupta %92 diğerinde %61 olabilir — toplam sayı bunu gizler.\n3. **Hata maliyeti kimin üzerinde?** Yanlış pozitifin bedelini şirket mi, kullanıcı mı ödüyor?\n4. **Karar geri alınabilir mi?** İnsan itiraz edebiliyor mu, bir insana ulaşabiliyor mu?\n5. **Bu modeli kendi ailene uygulamak ister miydin?** Basit ama şaşırtıcı derecede iyi çalışan bir sınama.",
              "**A practical checklist for every model:**\n\n1. **Who does the training data represent, and who does it exclude?** Which period, which geography, which channel did it come from?\n2. **Measure performance broken down by subgroup.** An overall 85% accuracy may be 92% in one group and 61% in another — the aggregate hides it.\n3. **Who bears the cost of an error?** Does the company or the user pay for a false positive?\n4. **Is the decision reversible?** Can a person appeal, can they reach a human?\n5. **Would you be happy for this model to be applied to your own family?** A simple test that works surprisingly well.",
            ),
            quiz({
              id: "q9",
              q: [
                "Toplam doğruluk %85 çıkan bir modelin bir grupta %92, diğerinde %61 doğrulukla çalışması neden önemlidir?",
                "Why does it matter if a model with an overall 85% accuracy actually runs at 92% in one group and 61% in another?",
              ],
              options: [
                [
                  "Toplam sayı bu farkı gizler; performansı alt gruplara ayırmadan adaletsizliği göremezsin",
                  "The aggregate number hides this gap; without breaking performance down by subgroup you cannot see the unfairness",
                ],
                ["Bu fark modelin genel başarısını etkilemez", "This gap does not affect the model's overall success"],
                ["Bu, modelin mükemmel çalıştığının kanıtıdır", "This is proof the model is working perfectly"],
                ["Toplam doğruluk zaten alt grupları da gösterir", "The aggregate accuracy already shows the subgroups too"],
              ],
              answer: 0,
              explain: [
                "Metin bu örneği kontrol listesindeki ikinci maddede verir: toplam %85 doğruluk bir grupta %92, diğerinde %61 olabilir — toplam sayı bunu gizler, bu yüzden performansı alt gruplara ayırarak ölçmek gerekir.",
                "The lesson gives this exact example in the checklist's second item: an overall 85% accuracy may be 92% in one group and 61% in another — the aggregate hides it, which is why you must measure performance broken down by subgroup.",
              ],
            }),
            quiz({
              id: "q10",
              q: [
                "Kontrol listesindeki \"bu modeli kendi ailene uygulamak ister miydin?\" sorusu metne göre nedir?",
                "According to the lesson, what is the checklist question \"would you be happy for this model to be applied to your own family?\"",
              ],
              options: [
                ["Basit ama şaşırtıcı derecede iyi çalışan bir sınama", "A simple test that works surprisingly well"],
                ["Hukuki olarak zorunlu bir belge", "A legally mandatory document"],
                ["Model doğruluğunu ölçen istatistiksel bir formül", "A statistical formula that measures model accuracy"],
                ["Sadece kredi modelleri için geçerli bir kural", "A rule that only applies to credit models"],
              ],
              answer: 0,
              explain: [
                "Metin bunu kontrol listesinin son maddesi olarak verir ve \"basit ama şaşırtıcı derecede iyi çalışan bir sınama\" olarak tanımlar.",
                "The lesson gives this as the checklist's final item and describes it as \"a simple test that works surprisingly well.\"",
              ],
            }),
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
        lesson({
          slug: "kumeleme-k-means",
          title: L("Kümeleme: K-Means ile örüntü bulma", "Clustering: finding patterns with K-Means"),
          summary: L(
            "Etiket yokken bile veri kendini gruplara ayırabilir — gözetimsiz öğrenmenin en temel algoritması.",
            "Even with no labels, data can sort itself into groups — the most fundamental unsupervised learning algorithm.",
          ),
          minutes: 18,
          premium: true,
          blocks: [
            text(
              "Bu patikadaki her model şimdiye kadar **gözetimliydi**: bir `y` etiketin vardı (churn oldu mu, fiyat ne). **Gözetimsiz öğrenmede** etiket yoktur — amaç, verinin kendi içindeki doğal grupları bulmaktır. \"Müşterilerimi nasıl segmentlere ayırırım?\" sorusunun cevabı genelde budur.\n\n**K-Means** en yaygın kümeleme algoritmasıdır ve üç adımı tekrar eder:\n\n1. `k` tane rastgele merkez (centroid) seç\n2. Her noktayı **en yakın** merkeze ata\n3. Her merkezi, kendisine atanan noktaların **ortalamasına** taşı\n\nMerkezler artık yer değiştirmeyene kadar 2-3 tekrarlanır.",
              "Every model in this track so far has been **supervised**: you had a `y` label (did they churn, what's the price). In **unsupervised learning** there is no label — the goal is to find the natural groups already inside the data. \"How do I segment my customers?\" is usually answered this way.\n\n**K-Means** is the most common clustering algorithm and repeats three steps:\n\n1. Pick `k` random centers (centroids)\n2. Assign every point to its **nearest** center\n3. Move each center to the **mean** of the points assigned to it\n\nSteps 2-3 repeat until the centers stop moving.",
            ),
            code(
              "python",
              `from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

X = df[["yillik_harcama", "ziyaret_sikligi"]]
X_olcekli = StandardScaler().fit_transform(X)  # bkz. aşağıdaki tuzak

model = KMeans(n_clusters=3, random_state=42, n_init=10)
df["segment"] = model.fit_predict(X_olcekli)

print(df.groupby("segment")[["yillik_harcama", "ziyaret_sikligi"]].mean())`,
            ),
            quiz({
              id: "q1",
              q: [
                "K-Means'in \"gözetimsiz\" olması ne anlama gelir?",
                "What does it mean that K-Means is \"unsupervised\"?",
              ],
              options: [
                ["Veride doğru cevabı (etiket/y) gösteren bir sütun yoktur; algoritma grupları kendisi bulur", "There's no column showing the right answer (a label/y) in the data; the algorithm finds the groups itself"],
                ["Algoritma hiç veri görmeden çalışır", "The algorithm runs without seeing any data"],
                ["İnsan gözetimi olmadan asla çalıştırılamaz", "It can never be run without human supervision"],
                ["Yalnızca metin verisinde çalışır", "It only works on text data"],
              ],
              answer: 0,
              explain: [
                "Gözetimli öğrenmede model, doğru cevabı (etiket) örneklerden görüp öğrenir. Gözetimsiz öğrenmede öyle bir etiket yoktur — K-Means yalnızca noktalar arası uzaklığa bakarak grupları kendisi keşfeder.",
                "In supervised learning the model learns by seeing the right answer (label) in examples. In unsupervised learning there is no such label — K-Means discovers the groups itself, purely from distances between points.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "K-Means'in TEK bir adımını elle uygula. `noktalar` listesindeki her noktayı, en yakın `merkezler`e (Öklid uzaklığıyla) ata — sonucu `atamalar` listesine (her nokta için 0 veya 1) yaz. Sonra her grubun yeni merkezini (atanan noktaların ortalaması) hesapla ve `yeni_merkezler` listesine yaz.",
                "Manually implement a SINGLE step of K-Means. Assign each point in `noktalar` to its nearest `merkezler` (by Euclidean distance) — write the result into `atamalar` (0 or 1 per point). Then compute each group's new center (the mean of its assigned points) into `yeni_merkezler`.",
              ],
              starter: `import math

noktalar = [(1, 1), (1, 2), (8, 8), (9, 9)]
merkezler = [(0, 0), (10, 10)]

def uzaklik(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

atamalar = []
for p in noktalar:
    # en yakın merkezin indeksini (0 veya 1) atamalar'a ekle
    pass

yeni_merkezler = []
for k in range(2):
    grup = [noktalar[i] for i in range(len(noktalar)) if atamalar[i] == k]
    # grup'un ortalamasını (x, y) olarak yeni_merkezler'e ekle
    pass

print(atamalar, yeni_merkezler)`,
              solution: `import math

noktalar = [(1, 1), (1, 2), (8, 8), (9, 9)]
merkezler = [(0, 0), (10, 10)]

def uzaklik(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

atamalar = []
for p in noktalar:
    uzakliklar = [uzaklik(p, m) for m in merkezler]
    atamalar.append(uzakliklar.index(min(uzakliklar)))

yeni_merkezler = []
for k in range(2):
    grup = [noktalar[i] for i in range(len(noktalar)) if atamalar[i] == k]
    ort_x = sum(p[0] for p in grup) / len(grup)
    ort_y = sum(p[1] for p in grup) / len(grup)
    yeni_merkezler.append((ort_x, ort_y))

print(atamalar, yeni_merkezler)`,
              hint: [
                "`uzakliklar = [uzaklik(p, m) for m in merkezler]` sonra `uzakliklar.index(min(uzakliklar))` en yakın merkezin indeksini verir.",
                "`uzakliklar = [uzaklik(p, m) for m in merkezler]` then `uzakliklar.index(min(uzakliklar))` gives the nearest center's index.",
              ],
              checks: [
                { code: "atamalar == [0, 0, 1, 1]", msg: ["İlk iki nokta merkez 0'a, son iki nokta merkez 1'e atanmalı", "The first two points must be assigned to center 0, the last two to center 1"] },
                { code: "abs(yeni_merkezler[0][0] - 1.0) < 1e-9 and abs(yeni_merkezler[0][1] - 1.5) < 1e-9", msg: ["İlk grubun yeni merkezi (1.0, 1.5) olmalı", "The first group's new center must be (1.0, 1.5)"] },
                { code: "abs(yeni_merkezler[1][0] - 8.5) < 1e-9 and abs(yeni_merkezler[1][1] - 8.5) < 1e-9", msg: ["İkinci grubun yeni merkezi (8.5, 8.5) olmalı", "The second group's new center must be (8.5, 8.5)"] },
              ],
              xp: 45,
            }),
            pitfall(
              "Ölçeklendirmeden K-Means, büyük sayılı sütunun kölesi olur",
              "Without scaling, K-Means becomes a slave to whichever column has bigger numbers",
              "K-Means uzaklığa dayanır. \"Yıllık harcama\" 0-50.000 arasında, \"ziyaret sıklığı\" 0-30 arasındaysa, uzaklık hesabına neredeyse tamamen harcama hakim olur — ziyaret sıklığının kümelemeye hiç etkisi kalmaz. Kümelemeden ÖNCE her sütunu `StandardScaler` ile aynı ölçeğe getirmek zorunludur, isteğe bağlı değildir.",
              "K-Means is distance-based. If \"annual spend\" ranges 0-50,000 and \"visit frequency\" ranges 0-30, the distance calculation is almost entirely dominated by spend — visit frequency barely affects the clustering at all. Scaling every column to the same range with `StandardScaler` BEFORE clustering is mandatory, not optional.",
            ),
          ],
        }),
        lesson({
          slug: "boyut-indirgeme-pca",
          title: L("Boyut indirgeme: PCA ile karmaşıklığı azaltmak", "Dimensionality reduction: simplifying with PCA"),
          summary: L(
            "50 sütunlu bir veri setini gözle görebileceğin 2 boyuta indirmenin (bilgiyi mümkün olduğunca koruyarak) yolu.",
            "How to compress a 50-column dataset down to 2 dimensions you can actually see — while keeping as much information as possible.",
          ),
          minutes: 16,
          premium: true,
          blocks: [
            text(
              "Birçok gerçek veri setinde onlarca sayısal sütun vardır ve çoğu birbiriyle **korelasyonludur** (\"oda sayısı\" ile \"metrekare\" gibi) — yani gerçek bilgi, sütun sayısından daha az \"boyut\"ta gizlidir. **Temel Bileşen Analizi (PCA)**, orijinal sütunları, verideki **varyansın en çoğunu** taşıyan yeni birkaç sütuna (temel bileşenlere) sıkıştırır.\n\nBu iki işe yarar: (1) 50 boyutlu veriyi 2-3 temel bileşene indirip **gözle görebilirsin** (scatter plot), (2) modele vermeden önce gürültüyü ve fazlalığı (korelasyonlu sütunları) azaltabilirsin.\n\nPCA'dan önce **her zaman ölçeklendirme** yapılır (K-Means'teki gibi) — çünkü PCA da varyansa, dolayısıyla ölçeğe duyarlıdır.",
              "Many real datasets have dozens of numeric columns, and most are **correlated** with each other (like \"number of rooms\" and \"square meters\") — meaning the real information hides in fewer \"dimensions\" than there are columns. **Principal Component Analysis (PCA)** compresses the original columns into a handful of new columns (principal components) that carry **most of the variance** in the data.\n\nThis is useful for two things: (1) you can shrink 50-dimensional data down to 2-3 principal components and actually **look at it** (a scatter plot), (2) you can reduce noise and redundancy (correlated columns) before feeding data to a model.\n\nPCA is **always preceded by scaling** (just like K-Means) — because PCA is also sensitive to variance, and therefore to scale.",
            ),
            code(
              "python",
              `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

X_olcekli = StandardScaler().fit_transform(df.select_dtypes("number"))

pca = PCA(n_components=2)
bilesenler = pca.fit_transform(X_olcekli)

print("Açıklanan varyans oranı:", pca.explained_variance_ratio_)
# örn. [0.62, 0.18] -> ilk 2 bileşen verinin %80'ini açıklıyor`,
            ),
            quiz({
              id: "q1",
              q: [
                "PCA'nın \"açıklanan varyans oranı\" (explained variance ratio) sana ne söyler?",
                "What does PCA's \"explained variance ratio\" tell you?",
              ],
              options: [
                ["Her bir temel bileşenin, orijinal veedeki bilginin/varyansın ne kadarını taşıdığını", "How much of the original data's information/variance each principal component carries"],
                ["Modelin doğruluğunu", "The model's accuracy"],
                ["Kaç satır veri olduğunu", "How many rows of data there are"],
                ["Hangi sütunun eksik değer içerdiğini", "Which column contains missing values"],
              ],
              answer: 0,
              explain: [
                "Her bileşenin açıkladığı varyans oranı, o bileşenin orijinal verideki 'ne kadar bilgi' taşıdığını gösterir. İlk birkaç bileşenin toplamı %80-90'a ulaşıyorsa, veriyi birkaç boyuta indirmek çok az bilgi kaybettirir demektir.",
                "Each component's explained-variance ratio shows how much 'information' from the original data that component carries. If the first few components add up to 80-90%, reducing to just those dimensions loses very little information.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "PCA'dan önce sütunları neden ölçeklendirmen (StandardScaler) gerekir?",
                "Why do you need to scale columns (StandardScaler) before PCA?",
              ],
              options: [
                [
                  "PCA en yüksek varyanslı yönleri arar; ölçeksiz veride bu yalnızca en büyük sayılı sütunun varyansı olurdu, gerçek örüntü değil",
                  "PCA looks for the directions of highest variance; on unscaled data that would just be whichever column has the biggest numbers, not the real pattern",
                ],
                ["Ölçeklendirme yalnızca görselleştirme için gerekir", "Scaling is only needed for visualization"],
                ["PCA metin sütunlarını sayıya çevirmek için ölçeklendirme ister", "PCA needs scaling to convert text columns to numbers"],
                ["Aslında hiç gerekmez, isteğe bağlı bir adımdır", "It's actually never needed, it's an optional step"],
              ],
              answer: 0,
              explain: [
                "K-Means gibi PCA da varyansa/uzaklığa dayanır. Ölçeklenmemiş bir sütun (ör. 0-100.000 arası gelir) diğerlerini (ör. 0-10 arası puan) tamamen gölgede bırakır ve 'birinci bileşen' aslında yalnızca o tek sütunu yansıtır.",
                "Like K-Means, PCA is variance/distance-based. An unscaled column (say, income ranging 0-100,000) drowns out others (a score ranging 0-10), and the 'first component' ends up reflecting just that one column.",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "PCA'dan önceki zorunlu adımı uygula: `veri` sözlüğündeki her sütunu standartlaştır (`(x - ortalama) / standart_sapma`, popülasyon standart sapması). Sonucu `standart` sözlüğüne, her değeri 2 ondalığa yuvarlayarak yaz.",
                "Do the mandatory step before PCA: standardize each column in `veri` (`(x - mean) / std`, population standard deviation). Write the result into `standart`, rounding each value to 2 decimals.",
              ],
              starter: `import statistics

veri = {
    "gelir": [10, 20, 30, 40],
    "puan": [100, 300, 200, 400],
}

standart = {}
for sutun, degerler in veri.items():
    # ortalama ve standart sapmayı hesapla, standartlaştırılmış listeyi standart[sutun]'a yaz
    pass

print(standart)`,
              solution: `import statistics

veri = {
    "gelir": [10, 20, 30, 40],
    "puan": [100, 300, 200, 400],
}

standart = {}
for sutun, degerler in veri.items():
    ortalama = statistics.mean(degerler)
    std = statistics.pstdev(degerler)
    standart[sutun] = [round((x - ortalama) / std, 2) for x in degerler]

print(standart)`,
              hint: [
                "`statistics.mean(degerler)` ve `statistics.pstdev(degerler)` (popülasyon standart sapması) kullan.",
                "Use `statistics.mean(degerler)` and `statistics.pstdev(degerler)` (population standard deviation).",
              ],
              checks: [
                { code: "standart['gelir'] == [-1.34, -0.45, 0.45, 1.34]", msg: ["'gelir' sütunu [-1.34, -0.45, 0.45, 1.34] olmalı", "'gelir' column must be [-1.34, -0.45, 0.45, 1.34]"] },
              ],
              xp: 40,
            }),
          ],
        }),
        lesson({
          slug: "basit-oneri-sistemi",
          title: L("Basit bir öneri sistemi: birlikte satın alınanlar", "A simple recommender: frequently bought together"),
          summary: L(
            "Kullanıcı puanı olmadan bile, hangi ürünlerin birlikte alındığını sayarak bir öneri motoru kurabilirsin.",
            "Even without user ratings, you can build a recommender just by counting which items get bought together.",
          ),
          minutes: 15,
          premium: true,
          blocks: [
            text(
              "Öneri sistemlerinin \"gerçek\" hâli genelde kullanıcı-ürün puan matrisi ve kosinüs benzerliği gibi tekniklere dayanır. Ama en basit, en açıklanabilir ve genelde ilk kurulan versiyon **birlikte satın alma sayımı**dır (market basket): hangi ürünler aynı siparişte ne sıklıkla birlikte görünüyor?\n\nBir ürün için öneri üretmek şu kadar basittir: o ürünün geçtiği tüm siparişlere bak, aynı siparişlerde geçen diğer ürünleri say, en sık geçeni öner. Bu, Amazon'un \"bunu alanlar şunu da aldı\" özelliğinin ilkel ama gerçek bir versiyonudur.",
              "The \"real\" version of recommender systems usually relies on a user-item rating matrix and techniques like cosine similarity. But the simplest, most explainable, and usually the first version anyone ships is **co-purchase counting** (market basket): how often do items show up together in the same order?\n\nGenerating a recommendation for an item is this simple: look at every order containing that item, count the other items appearing in those same orders, and recommend whichever appears most. This is a primitive but genuine version of Amazon's \"customers who bought this also bought\" feature.",
            ),
            code(
              "python",
              `from itertools import combinations
from collections import Counter

ciftler = Counter()
for siparis in siparisler:                      # siparis: {"ekmek", "süt", ...}
    for a, b in combinations(sorted(siparis), 2):
        ciftler[(a, b)] += 1

en_sik_ciftler = ciftler.most_common(10)
print(en_sik_ciftler)`,
            ),
            quiz({
              id: "q1",
              q: [
                "Birlikte-satın-alma (co-purchase) tabanlı öneri, klasik kullanıcı-puanı tabanlı işbirlikçi filtrelemeden hangi açıdan farklıdır?",
                "How does co-purchase-based recommendation differ from classic rating-based collaborative filtering?",
              ],
              options: [
                [
                  "Kullanıcı puanına ihtiyaç duymaz; yalnızca hangi ürünlerin aynı siparişte birlikte geçtiğini sayar",
                  "It needs no user ratings; it only counts which items co-occur in the same order",
                ],
                ["Yalnızca tek bir kullanıcı için çalışır", "It only works for a single user"],
                ["Yapay zeka kullanmaz, bu yüzden hiç öneri üretemez", "It doesn't use AI, so it can't produce recommendations at all"],
                ["Yalnızca metin verisinde çalışır", "It only works on text data"],
              ],
              answer: 0,
              explain: [
                "Kullanıcı-puan matrisi genelde seyrektir (çoğu kullanıcı çoğu ürünü hiç puanlamamıştır) ve toplaması zordur. Sipariş verisi zaten var ve puan gerektirmez — bu yüzden co-purchase sayımı genelde ilk kurulan, en ucuz öneri sistemidir.",
                "A rating matrix is usually sparse (most users never rate most items) and expensive to collect. Order data already exists and needs no ratings — which is why co-purchase counting is usually the first, cheapest recommender a team ships.",
              ],
            }),
            quiz({
              id: "q2",
              q: [
                "Ham co-purchase sayımının en büyük zaafı nedir?",
                "What's the biggest weakness of raw co-purchase counting?",
              ],
              options: [
                [
                  "Popülerlik yanlılığı — zaten çok satan bir ürün, gerçek bir ilişki olmasa bile her şeyle 'birlikte sık görülür'",
                  "Popularity bias — an already best-selling item 'co-occurs often' with almost everything, even with no real relationship",
                ],
                ["Hiçbir zaafı yoktur, her zaman doğru öneri verir", "It has no weakness, it always gives the correct recommendation"],
                ["Yalnızca 2 üründen fazlasında çalışmaz", "It doesn't work with more than 2 products"],
                ["Kod olarak yazılamaz", "It cannot be written as code"],
              ],
              answer: 0,
              explain: [
                "Herkesin aldığı bir ürün (ör. poşet), hemen her siparişte geçtiği için neredeyse her şeyle 'en sık birlikte satın alınan' çıkar — bu bir ilişki değil, popülerliktir. Gerçek sistemler bunu düzeltmek için ortak geçme sayısını her iki ürünün ayrı ayrı popülerliğine göre normalize eder (ör. 'lift' ölçüsü).",
                "An item everyone buys (like a bag) co-occurs with almost everything simply because it's in nearly every order — that's popularity, not a relationship. Real systems correct for this by normalizing the co-occurrence count against each item's individual popularity (e.g. the 'lift' measure).",
              ],
            }),
            pyTask({
              id: "t1",
              prompt: [
                "`sepetler` listesindeki her sepet, bir siparişte geçen ürün adlarından oluşan bir küme (`set`). `hedef` ürünüyle birlikte en sık geçen ürünü bul: sonucu `en_iyi_oneri` (ürün adı) ve `en_iyi_sayi` (kaç siparişte birlikte geçtiği) değişkenlerine yaz.",
                "Each basket in `sepetler` is a `set` of item names from one order. Find the item that co-occurs most often with `hedef`: write the result into `en_iyi_oneri` (item name) and `en_iyi_sayi` (how many orders it co-occurred in).",
              ],
              starter: `sepetler = [
    {"ekmek", "sut", "yumurta"},
    {"ekmek", "sut"},
    {"ekmek", "recel"},
    {"sut", "yumurta"},
    {"ekmek", "sut", "recel"},
]
hedef = "ekmek"

sayac = {}
for sepet in sepetler:
    if hedef in sepet:
        for urun in sepet:
            if urun != hedef:
                # sayac[urun]'u 1 artır (yoksa 0'dan başlat)
                pass

en_iyi_oneri =
en_iyi_sayi =
print(en_iyi_oneri, en_iyi_sayi)`,
              solution: `sepetler = [
    {"ekmek", "sut", "yumurta"},
    {"ekmek", "sut"},
    {"ekmek", "recel"},
    {"sut", "yumurta"},
    {"ekmek", "sut", "recel"},
]
hedef = "ekmek"

sayac = {}
for sepet in sepetler:
    if hedef in sepet:
        for urun in sepet:
            if urun != hedef:
                sayac[urun] = sayac.get(urun, 0) + 1

en_iyi_oneri = max(sayac, key=sayac.get)
en_iyi_sayi = sayac[en_iyi_oneri]
print(en_iyi_oneri, en_iyi_sayi)`,
              hint: [
                "`sayac[urun] = sayac.get(urun, 0) + 1` ile sayaç sözlüğünü güncelle; en yüksek değerli anahtarı bulmak için `max(sayac, key=sayac.get)`.",
                "Update the counter dict with `sayac[urun] = sayac.get(urun, 0) + 1`; find the highest-value key with `max(sayac, key=sayac.get)`.",
              ],
              checks: [
                { code: "en_iyi_oneri == 'sut'", msg: ["En iyi öneri 'sut' olmalı", "The best recommendation must be 'sut'"] },
                { code: "en_iyi_sayi == 3", msg: ["'sut', 'ekmek' ile 3 siparişte birlikte geçmeli", "'sut' must co-occur with 'ekmek' in 3 orders"] },
              ],
              xp: 40,
            }),
          ],
        }),
      ],
    },
  ],
};
