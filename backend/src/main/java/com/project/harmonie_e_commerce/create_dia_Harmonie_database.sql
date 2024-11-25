DROP DATABASE IF EXISTS Harmonie;

CREATE DATABASE IF NOT EXISTS Harmonie;

USE Harmonie;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	citizen_id      VARCHAR(12)     UNIQUE                      NOT NULL,
	fname           VARCHAR(20)	                                NOT NULL,
	lname           VARCHAR(20)                                 NOT NULL,
	dob             DATE                                        NOT NULL,
	sex 	        ENUM('M', 'F', 'Other')                     NOT NULL,
	phone           VARCHAR(10)     UNIQUE                      NOT NULL,
	email           VARCHAR(50)    	UNIQUE                      NOT NULL,
	creation_date   TIMESTAMP        							NOT NULL,
	password 		VARCHAR(65) 								NOT NULL
);


DROP TABLE IF EXISTS social_accounts;
CREATE TABLE IF NOT EXISTS social_accounts (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	user_id         INT                                         NOT NULL,
	provider_id     VARCHAR(255)                                NOT NULL,
	provider        ENUM('Facebook', 'Google', 'Twitter')       NOT NULL,
	email           VARCHAR(50)                                 NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS tokens;
CREATE TABLE IF NOT EXISTS tokens (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	user_id         INT                                         NOT NULL,
	token           VARCHAR(255)                                NOT NULL,
	type 			ENUM('Access', 'Refresh')                   NOT NULL,
	revoked		 	BOOLEAN                                     NOT NULL,
	expiration_date TIMESTAMP                                   NOT NULL,
	expired 	    BOOLEAN                                     NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS bank_accounts;
CREATE TABLE IF NOT EXISTS bank_accounts (
	id				INT 			AUTO_INCREMENT              PRIMARY KEY,
	user_id		 	INT                                         NOT NULL,
	bank_name       VARCHAR(20)	                                NOT NULL,
	account_number  VARCHAR(50)                                 NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

	UNIQUE (user_id, bank_name, account_number)
);


DROP TABLE IF EXISTS sellers;
CREATE TABLE IF NOT EXISTS sellers ( -- Inheritance of users
	id              INT             							PRIMARY KEY,
    tax_id          VARCHAR(15)     UNIQUE                      NOT NULL,

	FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS stores;
CREATE TABLE IF NOT EXISTS stores (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	seller_id       INT             UNIQUE                      NOT NULL,
    name            VARCHAR(20)  	                            NOT NULL,
    address         VARCHAR(100)                                NOT NULL,
	creation_date   TIMESTAMP,
	description     TEXT,

    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	name            VARCHAR(20)                                 NOT NULL
);

DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
	id              INT             AUTO_INCREMENT				PRIMARY KEY,
	seller_id       INT                                         NOT NULL,
	store_id		INT                                         NOT NULL,
	name            VARCHAR(20)                                 NOT NULL,
	brand           VARCHAR(20),
	price           DECIMAL(10,2)                               NOT NULL,
	quantity        INT                                         NOT NULL,
	description     TEXT,
	views           INT,
	buying_count    INT,
	rating_count    INT,
    avg_rating      DECIMAL(5,2),
	category_id     INT,


	FOREIGN KEY (seller_id, store_id) REFERENCES stores(seller_id, id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id)
);



DROP TABLE IF EXISTS product_images;
CREATE TABLE IF NOT EXISTS product_images (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
    product_id      INT				                            NOT NULL,
    url	  	   	    VARCHAR(255)                                NOT NULL,

	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    
	UNIQUE (product_id, url)
);


DROP TABLE IF EXISTS carts;
CREATE TABLE IF NOT EXISTS carts (
	id              INT             AUTO_INCREMENT          	PRIMARY KEY,
	total_items     INT                             	NOT NULL
);


DROP TABLE IF EXISTS buyers;
CREATE TABLE IF NOT EXISTS buyers ( -- Inheritance of users
    id              INT             			                PRIMARY KEY,
    cart_id         INT             UNIQUE                      NOT NULL,

    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES carts(id)
);


DROP TABLE IF EXISTS delivery_phones;
CREATE TABLE IF NOT EXISTS delivery_phones (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	buyer_id		INT                                         NOT NULL,
	phone_number	VARCHAR(10)                                 NOT NULL,

	FOREIGN KEY (buyer_id) REFERENCES buyers(id) ON DELETE CASCADE,
	UNIQUE (buyer_id, phone_number),
	UNIQUE (buyer_id, id)
);


DROP TABLE IF EXISTS delivery_addresses;
CREATE TABLE IF NOT EXISTS delivery_addresses (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
    buyer_id        INT                                         NOT NULL,
	road_number     VARCHAR(20)                                 NOT NULL,
	ward			VARCHAR(50)                                 NOT NULL,
	district		VARCHAR(50)                                 NOT NULL,
	city			VARCHAR(50)                                 NOT NULL,

    FOREIGN KEY (buyer_id) REFERENCES buyers(id) ON DELETE CASCADE,

    UNIQUE (buyer_id, road_number, ward, district, city),
	UNIQUE (buyer_id, id)
);


DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
	id				INT             AUTO_INCREMENT              PRIMARY KEY, 
	buyer_id        INT             			              	NOT NULL,
	product_id      INT                                         NOT NULL,
	rating          INT              							NOT NULL,
	text     		TEXT,
	time 		  	TIMESTAMP           NOT NULL,

	CHECK(rating BETWEEN 1 AND 5),

	FOREIGN KEY (buyer_id) REFERENCES buyers(id),
	FOREIGN KEY (product_id) REFERENCES products(id),
	
	UNIQUE (buyer_id, product_id, time) -- for foreign key reference in review_images
);


DROP TABLE IF EXISTS review_images;
CREATE TABLE IF NOT EXISTS review_images (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	buyer_id        INT                                         NOT NULL,
	product_id      INT                                         NOT NULL,
	url	  	   	    VARCHAR(255)                                NOT NULL,

	FOREIGN KEY (buyer_id, product_id) REFERENCES reviews(buyer_id, product_id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS products_in_carts;
CREATE TABLE IF NOT EXISTS products_in_carts (
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	cart_id         INT                                         NOT NULL,
    product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,

	FOREIGN KEY (cart_id) REFERENCES carts(id),
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE (product_id, cart_id)
);


DROP TABLE IF EXISTS discounts;
CREATE TABLE IF NOT EXISTS discounts (
    id              INT             AUTO_INCREMENT              PRIMARY KEY,
	code            VARCHAR(50)                                 NOT NULL,
	quantity        INT                                         NOT NULL,
	release_date    TIMESTAMP           NOT NULL,
	start_date      DATETIME                                    NOT NULL,
    expiration_date DATETIME                                    NOT NULL
);


DROP TABLE IF EXISTS store_discounts;
CREATE TABLE IF NOT EXISTS store_discounts (
	id			  INT             								PRIMARY KEY,
	amount        DECIMAL(10,2)                               	NOT NULL,
	store_id      INT                                         	NOT NULL,

	FOREIGN KEY (id) REFERENCES discounts(id) ON DELETE CASCADE,
	FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS system_discounts;
CREATE TABLE IF NOT EXISTS system_discounts (
	id			  INT             								PRIMARY KEY,
	max_amount    DECIMAL(10,2)                               	NOT NULL,
	percentage    DECIMAL(5,2)                                	NOT NULL,
	min_bill_amt  DECIMAL(10,2)		                   	NOT NULL,

	CHECK (percentage BETWEEN 0 AND 100),

	FOREIGN KEY (id) REFERENCES discounts(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS shipping_discounts;
CREATE TABLE IF NOT EXISTS shipping_discounts (
	id			  INT             								PRIMARY KEY,
	max_amount    DECIMAL(10,2)                               	NOT NULL,

	FOREIGN KEY (id) REFERENCES discounts(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS shipping_partners;
CREATE TABLE IF NOT EXISTS shipping_partners (
	id              INT             AUTO_INCREMENT              PRIMARY KEY,
	name            VARCHAR(30)	                                NOT NULL,
	join_date       TIMESTAMP           NOT NULL
);


DROP TABLE IF EXISTS discount_for_shipping_partners;
CREATE TABLE IF NOT EXISTS discount_for_shipping_partners (
	id			    		INT             AUTO_INCREMENT              PRIMARY KEY,
	discount_id     		INT             							NOT NULL,
	shipping_partner_id     INT                                         NOT NULL,

	FOREIGN KEY (discount_id) REFERENCES shipping_discounts(id),
	FOREIGN KEY (shipping_partner_id) REFERENCES shipping_partners(id),

	UNIQUE (discount_id, shipping_partner_id)
);



DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
	id               		INT             AUTO_INCREMENT              PRIMARY KEY,
	buyer_id         		INT                                         NOT NULL,
	consignee_name   		VARCHAR(50)                                 NOT NULL,
	consignee_phone_id  	INT                                 		NOT NULL,
	consignee_address_id 	INT                               			NOT NULL,
	creation_date    		TIMESTAMP        ,
	total_price     	 	DECIMAL(10,2)                               NOT NULL,
	system_discount_id		INT              NULL,
	pay_method       		ENUM('Cash', 'Credit', 'Debit')             NOT NULL,


	FOREIGN KEY (buyer_id, consignee_phone_id) REFERENCES delivery_phones(buyer_id, id),
	FOREIGN KEY (buyer_id, consignee_address_id) REFERENCES delivery_addresses(buyer_id, id),
	FOREIGN KEY (system_discount_id) REFERENCES system_discounts(id)
);


-- ///////// NO NEED FOR THIS TABLE //////////
-- DROP TABLE IF EXISTS products_in_orders;
-- CREATE TABLE IF NOT EXISTS products_in_orders (
-- 	id				INT             AUTO_INCREMENT              PRIMARY KEY,
-- 	order_id        INT                                         NOT NULL,
-- 	product_id      INT                                         NOT NULL,
-- 	quantity        INT                                         NOT NULL,
-- 	pay_price       DECIMAL(10,2)                               NOT NULL,

-- 	FOREIGN KEY (order_id) REFERENCES orders(id),
-- 	FOREIGN KEY (product_id) REFERENCES products(id),
-- 	UNIQUE (order_id, product_id)
-- );


DROP TABLE IF EXISTS boxes;
CREATE TABLE IF NOT EXISTS boxes ( -- each store in one order has a box of their products
	id               		INT             AUTO_INCREMENT              PRIMARY KEY,

	storeDiscount_id 		INT              NULL,
	shippingDiscount_id 	INT              NULL,

	shippingPartner_id 		INT                                       	NOT NULL,
	shipper_name	 		VARCHAR(50)                                 NOT NULL,
	shipper_phone	 		VARCHAR(10)                                 NOT NULL,

	total_price      		DECIMAL(10,2)                               NOT NULL,

	predicted_delivery_date DATETIME		 NULL,
	caution          		TEXT,
	packing_date	 		TIMESTAMP        ,
	status           		ENUM('Pending', 'Shipped', 'Delivered')     NOT NULL,


	FOREIGN KEY (storeDiscount_id) REFERENCES store_discounts(id),
	FOREIGN KEY (shippingDiscount_id) REFERENCES shipping_discounts(id) ,
	FOREIGN KEY (shippingPartner_id) REFERENCES shipping_partners(id) 
);


DROP TABLE IF EXISTS products_in_boxes;
CREATE TABLE IF NOT EXISTS products_in_boxes ( -- ternary relationship between products, boxes and orders
	id				INT             AUTO_INCREMENT              PRIMARY KEY,
	order_id		INT                                         NOT NULL,
	box_id          INT                                         NOT NULL,
	product_id      INT                                         NOT NULL,
	quantity        INT                                         NOT NULL,
	total_price     DECIMAL(10,2)                               NOT NULL, -- euqal to quantity * price

	FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
	FOREIGN KEY (box_id) REFERENCES boxes(id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
	UNIQUE (order_id, product_id)
);



-- count number of tables
SELECT COUNT(*) AS 'Number of Tables' FROM information_schema.tables WHERE table_schema = 'Harmonie';