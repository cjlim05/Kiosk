use capps;
show tables;

drop table dessert;

CREATE TABLE coffee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY, -- 기본 키, 자동 증가
    name VARCHAR(255) NOT NULL,          -- 커피 이름
    description TEXT,                    -- 커피 설명
    price DECIMAL(10, 2) NOT NULL,        -- 커피 가격
    imagefile VARCHAR(255)
);

INSERT INTO coffee (name, description, price, imagefile) VALUES 
('아메리카노', '진한 에스프레소와 물로 만든 커피', 3000.00, 'americano.png'),
('카푸치노', '에스프레소에 스팀 밀크와 우유 거품을 더한 커피', 4500.00, 'cappuccino.png'),
('라떼', '에스프레소와 스팀 밀크로 만든 부드러운 커피', 4000.00,'latte.png'),
('자바칩 프라포치노', '자바칩과 초고시럽이 들어간 달달한 프라포치노', 6000.00,'javachip.png'),
('바닐라 라떼', '바닐라 시럽을 추가한 라떼', 5000.00,'banilalatte.png');

INSERT INTO coffee (name, description, price, imagefile) VALUES 
('콜드브루', '서서히 우려낸 깊고 부드러운 아이스 커피', 4500.00, 'coldbrew.png'),
('카라멜 마키아토', '카라멜 시럽과 우유, 에스프레소를 조화롭게 섞은 커피', 5500.00, 'caramelmacchiato.png'),
('에스프레소', '진한 맛을 자랑하는 작은 한 잔의 커피', 2500.00, 'espresso.png'),
('아포가토', '바닐라 아이스크림 위에 에스프레소를 부은 디저트 커피', 6000.00, 'affogato.png'),
('헤이즐넛 라떼', '헤이즐넛 시럽을 더해 고소한 풍미를 가진 라떼', 5000.00, 'hazelnutlatte.png'),
('모카', '초콜릿과 에스프레소, 스팀 밀크로 만든 달콤한 커피', 5500.00, 'mocha.png'),
('티라미수 라떼', '티라미수 향과 맛을 담은 크리미한 라떼', 5800.00, 'tiramisu_latte.png');


SELECT * FROM dessert;

CREATE TABLE dessert (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,          
    description TEXT,                    
    price DECIMAL(10, 2) NOT NULL,
    imagefile VARCHAR(255)
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tableNumber INT NOT NULL,
    itemName VARCHAR(255) NOT NULL DEFAULT 'Unknown',
    quantity INT NOT NULL,
    price INT NOT NULL
);

SELECT * from orders;
drop table orders;

INSERT INTO dessert (name, description, price,imagefile) VALUES 
('초코케이크', '진한 초코릿과 케이크', 5400.00, "chococake.png"),
('치즈케이크', '꾸덕한 치즈와 케이크', 5500.00, "cheesecake.png"),
('소금빵', '바삭하고 짭짤한 소금빵', 3400.00,"saltbread.png"),
('마들렌', '폭신폭신 마들렌', 3000.00,"madeleine.png"),
('식빵', '부들부들 식빵', 5000.00,"bread.png");

drop table user;
SELECT * from user;


CREATE TABLE user (
    tableNumber INT NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

INSERT INTO user (tableNumber, password) VALUES (2, 'qwe123');

