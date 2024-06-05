USE kiosk;

CREATE TABLE `category`
(
`category_id` BIGINT NOT NULL AUTO_INCREMENT,
`category_name` VARCHAR(50) NOT NULL,
PRIMARY KEY (`category_id`)
);

CREATE TABLE `product`
(
`product_id` BIGINT NOT NULL AUTO_INCREMENT,
`category_id` BIGINT NOT NULL,
`product_name` VARCHAR(50) NOT NULL,
`product_price` BIGINT NOT NULL,
`product_img_url` VARCHAR(200) NOT NULL,
`product_is_best` BOOL NULL,
`product_has_hot` BOOL NULL,
`product_has_ice` BOOL NULL,
`product_has_large` BOOL NULL,
`product_has_small` BOOL NULL,
PRIMARY KEY (`product_id`, `category_id`),
FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
);

CREATE TABLE `orders`
(
`order_id` BIGINT NOT NULL AUTO_INCREMENT,
`order_number` BIGINT NULL,
`order_datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`order_id`)
);

CREATE TABLE `payment`
(
`payment_id` BIGINT NOT NULL AUTO_INCREMENT,
`order_id` BIGINT NOT NULL,
`payment_method` VARCHAR(10) NOT NULL,
`payment_total_price` BIGINT NOT NULL,

    PRIMARY KEY (`payment_id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)

);

CREATE TABLE `order_product`
(
`order_product_id` BIGINT NOT NULL AUTO_INCREMENT,
`order_id` BIGINT NOT NULL,
`product_id` BIGINT NOT NULL,
`order_product_name` VARCHAR(50) NOT NULL,
`order_product_size` VARCHAR(50) NOT NULL,
`order_product_temperature` VARCHAR(10) NOT NULL,
`order_product_amount` BIGINT NOT NULL,
PRIMARY KEY (`order_product_id`, `order_id`, `product_id`),
FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
);

CREATE TABLE `order_log`
(
`product_id` BIGINT NOT NULL,
`category_id` BIGINT NOT NULL,
`sales_amount` BIGINT NOT NULL,
`sales_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

---

INSERT INTO category (category_name) VALUES ('COFFEE');
INSERT INTO category (category_name) VALUES ('LATTE');
INSERT INTO category (category_name) VALUES ('TEA');
INSERT INTO category (category_name) VALUES ('JUICE');
INSERT INTO category (category_name) VALUES ('SPARKLING');

INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (1, '아메리카노', 4900, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/COFFE/Americano.jpg', 1, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (1, '카라멜 마키아또', 5100, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/COFFE/CaramelMacchiato.jpg', 0, 1, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (1, '롱블랙', 5300, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/COFFE/LongBack.jpg', 0, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (1, '프렌치 아메리카노', 5500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/COFFE/FrenchAmericano.jpg', 0, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (1, '콜드브루', 5700, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/COFFE/ColdBrew.jpg', 0, 0, 1, 1, 0);

INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (2, '카페 라떼', 4500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/LATTE/CafeLatte.jpg', 1, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (2, '초콜릿 라떼', 5000, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/LATTE/ChocolateLatte.jpg', 0, 0, 1, 1, 0);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (2, '더 그린 쑥 크림 라떼', 5000, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/LATTE/TheGreenMugwortCreamLatte.jpg', 0, 1, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (2, '라벤더 카페 브레베', 5000, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/LATTE/LavenderCafeBrevet.png', 0, 1, 0, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (2, '바닐라 빈 라떼', 5000, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/LATTE/VanillaBeanLatte.jpg', 0, 1, 1, 1, 1);

INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (3, '민트 블렌드 티', 3500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/TEA/MintBlendTea.jpg', 1, 1, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (3, '블루밍 프루트 유스베리 티', 3500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/TEA/BloomingFruitYouthberryTea.jpg', 0, 1, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (3, '아이스 민트 블렌드 티', 3500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/TEA/IceMintBlendTea.jpg', 0, 0, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (3, '아이스 얼 그레이 티', 3500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/TEA/IceEarlGrayTea.jpg', 0, 0, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (3, '아이스 유스베리 티', 3500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/TEA/IceYouthVerity.jpg', 0, 0, 1, 1, 1);

INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (4, '딸기 주스', 5500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/JUICE/StrawberryJuice.jpg', 1, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (4, '필 더 그린', 5500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/JUICE/FeelTheGreen.jpg', 0, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (4, '필 더 레드', 5500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/JUICE/FeelTheRed.jpg', 0, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (4, '필 더 옐로우', 5500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/JUICE/FeelTheYellow.jpg', 0, 0, 1, 0, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (4, '망고 주스', 5500, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/JUICE/MangoJuice.jpg', 0, 0, 1, 0, 1);

INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (5, '사과 스파클링', 3900, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/SPARKLING/AppleSparkling.jpg', 1, 0, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (5, '오렌지 스파클링', 3900, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/SPARKLING/OrangeSparkling.jpg', 0, 0, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (5, '선셋 스파클링', 3900, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/SPARKLING/SunsetSparkling.jpg', 0, 0, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (5, '피치 스파클링', 3900, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/SPARKLING/PeachSparkling.jpg', 0, 0, 1, 1, 1);
INSERT INTO product (category_id, product_name, product_price, product_img_url, product_is_best, product_has_hot,
product_has_ice, product_has_large, product_has_small)
VALUES (5, '레몬 스파클링', 3900, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/public/img/SPARKLING/LemonSparkling.jpg', 0, 0, 1, 1, 1);
