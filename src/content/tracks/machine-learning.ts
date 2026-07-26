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
      id: "beginner",
      title: L("Başlangıç — Temel kavramlar", "Beginner — Core concepts"),
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
      ],
    },
    {
      id: "intermediate",
      title: L("Orta — Model değerlendirme", "Intermediate — Model evaluation"),
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
      ],
    },
    {
      id: "advanced",
      title: L("İleri — Üretime alma", "Advanced — Putting models in production"),
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
      ],
    },
  ],
};
