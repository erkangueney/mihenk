import type { Localized } from "@/lib/types";

/**
 * SQL alıştırmalarının üzerinde çalıştığı hazır veritabanları.
 * Her çalıştırmada sıfırdan kurulur, böylece kullanıcı tabloyu bozamaz.
 */
export interface Dataset {
  key: string;
  title: Localized;
  /** Tablo adı -> sütun listesi. Şema panelinde gösterilir. */
  tables: { name: string; columns: string[] }[];
  schema: string;
}

/* ------------------------------------------------------------------ */
/* 1. E-ticaret                                                        */
/* ------------------------------------------------------------------ */

const shopSchema = `
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO categories (id, name) VALUES
 (1,'Elektronik'),(2,'Ev & Yaşam'),(3,'Spor'),(4,'Kitap'),(5,'Moda');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  price REAL NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO products (id, name, category_id, price, stock) VALUES
 (1,'Kablosuz Kulaklık',1,1899.00,120),
 (2,'Mekanik Klavye',1,2450.00,58),
 (3,'Akıllı Saat',1,4290.00,34),
 (4,'Robot Süpürge',2,7990.00,12),
 (5,'Kahve Makinesi',2,3150.00,45),
 (6,'Yoga Matı',3,549.00,210),
 (7,'Koşu Ayakkabısı',3,2790.00,76),
 (8,'Dambıl Seti',3,1250.00,40),
 (9,'Veri Bilimi 101',4,320.00,300),
 (10,'İstatistik El Kitabı',4,410.00,180),
 (11,'Deri Ceket',5,4990.00,22),
 (12,'Pamuklu Tişört',5,349.00,400);

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  segment TEXT NOT NULL,
  signup_date TEXT NOT NULL
);
INSERT INTO customers (id, name, city, segment, signup_date) VALUES
 (1,'Elif Kaya','İstanbul','bireysel','2023-01-14'),
 (2,'Mert Aydın','Ankara','bireysel','2023-02-03'),
 (3,'Zeynep Tuna','İzmir','kurumsal','2023-02-27'),
 (4,'Can Yılmaz','İstanbul','bireysel','2023-04-11'),
 (5,'Burak Sarı','Bursa','kurumsal','2023-05-06'),
 (6,'Deniz Öz','Ankara','bireysel','2023-06-19'),
 (7,'Selin Gür','İstanbul','bireysel','2023-07-22'),
 (8,'Ahmet Rüzgar','Antalya','kurumsal','2023-08-30'),
 (9,'Ece Demir','İzmir','bireysel','2023-09-15'),
 (10,'Kaan Polat','İstanbul','bireysel','2023-11-02'),
 (11,'Nazlı Ak','Bursa','bireysel','2024-01-08'),
 (12,'Onur Çelik','Ankara','kurumsal','2024-02-14'),
 -- Son üç müşterinin bilerek hiç siparişi yok: LEFT JOIN ve "eksik olanı bul"
 -- alıştırmalarının boş sonuç dönmemesi için gerekli.
 (13,'Sinem Kara','İzmir','bireysel','2024-03-05'),
 (14,'Tarık Gül','İstanbul','kurumsal','2024-04-18'),
 (15,'Melis Yaman','Antalya','bireysel','2024-05-27');

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_date TEXT NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO orders (id, customer_id, order_date, status) VALUES
 (1,1,'2024-01-05','teslim'),(2,2,'2024-01-09','teslim'),(3,1,'2024-01-21','teslim'),
 (4,3,'2024-02-02','teslim'),(5,4,'2024-02-11','iptal'),(6,5,'2024-02-18','teslim'),
 (7,6,'2024-03-01','teslim'),(8,1,'2024-03-07','teslim'),(9,7,'2024-03-15','iade'),
 (10,8,'2024-03-22','teslim'),(11,2,'2024-04-04','teslim'),(12,9,'2024-04-12','teslim'),
 (13,10,'2024-04-25','teslim'),(14,3,'2024-05-03','teslim'),(15,11,'2024-05-14','iptal'),
 (16,4,'2024-05-20','teslim'),(17,12,'2024-06-02','teslim'),(18,5,'2024-06-11','teslim'),
 (19,6,'2024-06-19','iade'),(20,1,'2024-07-01','teslim'),(21,7,'2024-07-08','teslim'),
 (22,9,'2024-07-16','teslim'),(23,10,'2024-08-02','teslim'),(24,12,'2024-08-13','teslim'),
 (25,8,'2024-08-27','teslim');

CREATE TABLE order_items (
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL
);
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
 (1,1,1,1899.00),(1,12,2,349.00),
 (2,9,3,320.00),(2,10,1,410.00),
 (3,3,1,4290.00),
 (4,4,1,7990.00),(4,5,1,3150.00),
 (5,7,1,2790.00),
 (6,2,2,2450.00),(6,1,1,1899.00),
 (7,6,4,549.00),
 (8,5,1,3150.00),(8,12,3,349.00),
 (9,11,1,4990.00),
 (10,3,2,4290.00),(10,9,2,320.00),
 (11,8,1,1250.00),(11,6,2,549.00),
 (12,1,1,1899.00),
 (13,7,2,2790.00),(13,12,1,349.00),
 (14,4,1,7990.00),
 (15,10,2,410.00),
 (16,2,1,2450.00),(16,9,1,320.00),
 (17,11,2,4990.00),(17,5,1,3150.00),
 (18,1,3,1899.00),
 (19,6,1,549.00),
 (20,3,1,4290.00),(20,8,1,1250.00),
 (21,12,5,349.00),
 (22,9,4,320.00),(22,10,2,410.00),
 (23,5,1,3150.00),(23,7,1,2790.00),
 (24,4,1,7990.00),(24,2,1,2450.00),
 (25,11,1,4990.00),(25,6,3,549.00);
`;

/* ------------------------------------------------------------------ */
/* 2. İnsan kaynakları                                                 */
/* ------------------------------------------------------------------ */

const hrSchema = `
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);
INSERT INTO departments (id, name, city) VALUES
 (1,'Veri','İstanbul'),(2,'Mühendislik','İstanbul'),(3,'Pazarlama','Ankara'),
 (4,'Satış','İzmir'),(5,'Finans','İstanbul');

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  title TEXT NOT NULL,
  hire_date TEXT NOT NULL,
  salary REAL NOT NULL,
  manager_id INTEGER REFERENCES employees(id)
);
INSERT INTO employees (id, name, department_id, title, hire_date, salary, manager_id) VALUES
 (1,'Aylin Şen',1,'Veri Direktörü','2019-03-01',195000,NULL),
 (2,'Emre Koç',1,'Kıdemli Veri Bilimci','2020-06-15',142000,1),
 (3,'Sıla Bak',1,'Veri Analisti','2022-01-10',82000,1),
 (4,'Tolga Er',1,'Veri Mühendisi','2021-09-01',118000,1),
 (5,'Merve Ateş',1,'Veri Analisti','2023-04-17',76000,1),
 (6,'Kerem Ulu',2,'Mühendislik Müdürü','2018-11-05',188000,NULL),
 (7,'Pınar Yaz',2,'Yazılım Mühendisi','2021-02-08',126000,6),
 (8,'Barış Tan',2,'Yazılım Mühendisi','2022-07-25',110000,6),
 (9,'Gizem Aslan',3,'Pazarlama Müdürü','2020-01-20',134000,NULL),
 (10,'Serkan Duru',3,'Dijital Pazarlama Uzmanı','2022-03-14',68000,9),
 (11,'Hande Kurt',3,'İçerik Uzmanı','2023-08-01',59000,9),
 (12,'Volkan Ada',4,'Satış Direktörü','2017-05-30',176000,NULL),
 (13,'Ceren Işık',4,'Satış Temsilcisi','2021-11-11',72000,12),
 (14,'Umut Bay',4,'Satış Temsilcisi','2023-02-06',65000,12),
 (15,'Leyla Naz',5,'Finans Müdürü','2019-08-19',152000,NULL),
 (16,'Sinan Kaya',5,'Finansal Analist','2022-10-03',88000,15);
`;

/* ------------------------------------------------------------------ */
/* 3. Web analitiği                                                    */
/* ------------------------------------------------------------------ */

const webSchema = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  country TEXT NOT NULL,
  device TEXT NOT NULL,
  signup_date TEXT
);
INSERT INTO users (id, country, device, signup_date) VALUES
 (1,'TR','mobil','2024-05-02'),(2,'TR','masaüstü','2024-05-03'),(3,'DE','mobil',NULL),
 (4,'TR','mobil','2024-05-06'),(5,'NL','masaüstü',NULL),(6,'TR','tablet','2024-05-09'),
 (7,'DE','masaüstü','2024-05-11'),(8,'TR','mobil',NULL),(9,'FR','mobil','2024-05-14'),
 (10,'TR','masaüstü','2024-05-15');

CREATE TABLE sessions (
  id INTEGER PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  started_at TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  source TEXT NOT NULL
);
INSERT INTO sessions (id, user_id, started_at, duration_sec, source) VALUES
 (1,1,'2024-05-02 09:12',185,'organik'),(2,1,'2024-05-04 20:41',420,'doğrudan'),
 (3,2,'2024-05-03 11:05',95,'reklam'),(4,3,'2024-05-05 14:22',60,'organik'),
 (5,4,'2024-05-06 08:30',540,'reklam'),(6,4,'2024-05-08 19:15',310,'e-posta'),
 (7,5,'2024-05-07 16:48',45,'organik'),(8,6,'2024-05-09 10:02',275,'sosyal'),
 (9,7,'2024-05-11 13:37',150,'organik'),(10,8,'2024-05-12 21:20',30,'sosyal'),
 (11,9,'2024-05-14 07:55',600,'reklam'),(12,10,'2024-05-15 18:10',225,'e-posta'),
 (13,1,'2024-05-16 12:00',380,'doğrudan'),(14,4,'2024-05-17 09:45',115,'organik'),
 (15,10,'2024-05-18 22:05',490,'doğrudan');

CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id),
  name TEXT NOT NULL,
  ts TEXT NOT NULL
);
INSERT INTO events (id, session_id, name, ts) VALUES
 (1,1,'sayfa_goruntuleme','2024-05-02 09:12'),(2,1,'urun_goruntuleme','2024-05-02 09:14'),
 (3,2,'sayfa_goruntuleme','2024-05-04 20:41'),(4,2,'sepete_ekle','2024-05-04 20:45'),
 (5,2,'satin_alma','2024-05-04 20:48'),(6,3,'sayfa_goruntuleme','2024-05-03 11:05'),
 (7,4,'sayfa_goruntuleme','2024-05-05 14:22'),(8,5,'sayfa_goruntuleme','2024-05-06 08:30'),
 (9,5,'urun_goruntuleme','2024-05-06 08:33'),(10,5,'sepete_ekle','2024-05-06 08:39'),
 (11,6,'sayfa_goruntuleme','2024-05-08 19:15'),(12,6,'satin_alma','2024-05-08 19:20'),
 (13,7,'sayfa_goruntuleme','2024-05-07 16:48'),(14,8,'sayfa_goruntuleme','2024-05-09 10:02'),
 (15,8,'urun_goruntuleme','2024-05-09 10:05'),(16,9,'sayfa_goruntuleme','2024-05-11 13:37'),
 (17,10,'sayfa_goruntuleme','2024-05-12 21:20'),(18,11,'sayfa_goruntuleme','2024-05-14 07:55'),
 (19,11,'urun_goruntuleme','2024-05-14 08:00'),(20,11,'sepete_ekle','2024-05-14 08:05'),
 (21,11,'satin_alma','2024-05-14 08:09'),(22,12,'sayfa_goruntuleme','2024-05-15 18:10'),
 (23,13,'sayfa_goruntuleme','2024-05-16 12:00'),(24,13,'sepete_ekle','2024-05-16 12:06'),
 (25,14,'sayfa_goruntuleme','2024-05-17 09:45'),(26,15,'sayfa_goruntuleme','2024-05-18 22:05'),
 (27,15,'urun_goruntuleme','2024-05-18 22:09'),(28,15,'sepete_ekle','2024-05-18 22:14'),
 (29,15,'satin_alma','2024-05-18 22:18');
`;

export const datasets: Record<string, Dataset> = {
  shop: {
    key: "shop",
    title: { tr: "E-ticaret veritabanı", en: "E-commerce database" },
    tables: [
      { name: "categories", columns: ["id", "name"] },
      { name: "products", columns: ["id", "name", "category_id", "price", "stock"] },
      { name: "customers", columns: ["id", "name", "city", "segment", "signup_date"] },
      { name: "orders", columns: ["id", "customer_id", "order_date", "status"] },
      { name: "order_items", columns: ["order_id", "product_id", "quantity", "unit_price"] },
    ],
    schema: shopSchema,
  },
  hr: {
    key: "hr",
    title: { tr: "İnsan kaynakları veritabanı", en: "HR database" },
    tables: [
      { name: "departments", columns: ["id", "name", "city"] },
      {
        name: "employees",
        columns: ["id", "name", "department_id", "title", "hire_date", "salary", "manager_id"],
      },
    ],
    schema: hrSchema,
  },
  web: {
    key: "web",
    title: { tr: "Web analitiği veritabanı", en: "Web analytics database" },
    tables: [
      { name: "users", columns: ["id", "country", "device", "signup_date"] },
      { name: "sessions", columns: ["id", "user_id", "started_at", "duration_sec", "source"] },
      { name: "events", columns: ["id", "session_id", "name", "ts"] },
    ],
    schema: webSchema,
  },
};

export function getDataset(key: string | undefined): Dataset | undefined {
  return key ? datasets[key] : undefined;
}
