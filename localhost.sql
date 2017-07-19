-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 06 月 23 日 06:08
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `babydb`
--
DROP DATABASE `babydb`;
CREATE DATABASE `babydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `babydb`;

-- --------------------------------------------------------

--
-- 表的结构 `admininfo`
--

DROP TABLE IF EXISTS `admininfo`;
CREATE TABLE IF NOT EXISTS `admininfo` (
  `id` int(11) NOT NULL auto_increment,
  `number` varchar(20) collate utf8_unicode_ci NOT NULL,
  `password` varchar(20) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- 导出表中的数据 `admininfo`
--

INSERT INTO `admininfo` (`id`, `number`, `password`) VALUES
(1, '2013441403', '123456');

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL auto_increment,
  `product_id` varchar(255) collate utf8_unicode_ci NOT NULL,
  `phone` varchar(100) collate utf8_unicode_ci NOT NULL,
  `product_color` varchar(255) collate utf8_unicode_ci default NULL,
  `product_size` varchar(100) collate utf8_unicode_ci default NULL,
  `amount` int(11) default NULL,
  `src` varchar(200) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- 导出表中的数据 `cart`
--

INSERT INTO `cart` (`id`, `product_id`, `phone`, `product_color`, `product_size`, `amount`, `src`) VALUES
(3, '1138944', '13983834363', '粉色', '无', 1, 'http://localhost/baby/html/kind1-1.html'),
(4, '1020175', '13983834363', '白色', '12M(59-66cm)', 2, 'http://localhost/baby/html/kind1-1.html');

-- --------------------------------------------------------

--
-- 表的结构 `details`
--

DROP TABLE IF EXISTS `details`;
CREATE TABLE IF NOT EXISTS `details` (
  `id` int(11) NOT NULL auto_increment,
  `product_id` varchar(255) collate utf8_unicode_ci NOT NULL,
  `product_param` varchar(500) collate utf8_unicode_ci default NULL,
  `product_sizeInfo` varchar(500) collate utf8_unicode_ci default NULL,
  `product_details` varchar(500) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

--
-- 导出表中的数据 `details`
--

INSERT INTO `details` (`id`, `product_id`, `product_param`, `product_sizeInfo`, `product_details`) VALUES
(1, '1020171', '商品名称：2017夏季新款双鱼儿童T恤短袖套装宝宝纯棉童装薄;品牌：HTGGU;分类：儿童服饰套装;适用季节：夏季;风格：韩版;面料：纯棉（95%及以上）,锦纶,棉麻;厚薄：薄款;产地：浙江;领型：圆领;安全等级：B类;裤门襟：系绳', '尺码:S/M/L/XL;衣长:38/40/42/44;肩宽:23/24.5/26/27.5;胸围:28/29.5/31/32.5;腰围:38/38/40/40;袖长:10.7/11.4/12.1/12.8;建议身高:70-80/80-90/90-100/100-110', 'img/kind1-1_1.jpg&img/kind1-1_2.jpg&img/kind1-1_3.jpg&img/kind1-1_4.jpg&img/kind1-1_5.jpg&img/kind1-1_6.jpg&img/kind1-1_7.jpg&img/kind1-1_8.jpg&img/kind1-1_9.jpg&img/kind1-1_10.jpg'),
(2, '1020172', '商品名称：荷兰原装 Nutrilon 婴幼儿奶粉1段0~6M;品牌：荷兰原装 Nutrilon;分类：婴儿奶粉;适用年龄：0-6个月;包装类型：罐装;段位：1段;保质期：18个月;产地：荷兰;规格：850g/罐*2;储存方式：干燥阴凉', NULL, 'img/block1-1-1.jpg&img/block1-1-2.jpg&img/block1-1-3.jpg&img/block1-1-4.jpg&img/block1-1-5.jpg&img/block1-1-6.jpg&img/block1-1-7.jpg&img/block1-1-8.jpg&img/block1-1-9.jpg&img/block1-1-10.jpg&img/block1-1-11.jpg&img/block1-1-12.jpg&img/block1-1-13.jpg&img/block1-1-14.jpg&img/block1-1-15.jpg&img/block1-1-16.jpg'),
(3, '1020173', '商品名称：马克珍妮 Marc&Janie 女宝宝印花连衣裙16021;品牌：马克珍妮 Marc&Janie;分类：连衣裙/半身裙;适用年龄：1-3岁;产地：中国;参考身高：73cm,80cm,90cm,100cm,110cm;适用季节：夏季;面料：纯棉(95%及以上);类型风格：公主裙型，A字裙;流行元素：碎花;裙长：长款', NULL, 'img/block5-1-1.jpg&img/block5-1-2.jpg&img/block5-1-3.jpg&img/block5-1-4.jpg&img/block5-1-5.jpg&img/block5-1-6.jpg&img/block5-1-6.jpg&img/block5-1-7.jpg&img/block5-1-8.jpg&img/block5-1-9.jpg&img/block5-1-10.jpg&img/block5-1-11.jpg&img/block5-1-12.jpg&img/block5-1-13.jpg'),
(4, '1020174', '商品名称：马克珍妮 Marc&Janie 女童椰树印花遮阳帽;分类：帽子/围巾/手套;适用年龄：1-3岁 ;适用性别：女 ;面料：纯棉(95%及以上);帽顶款式：圆顶 ;品牌：马克珍妮 Marc&Janie ;产地：中国 ;适用季节：春季,夏季 ; 帽檐款式：平檐;适用场景：出游', NULL, 'img/block5-2-1.jpg&img/block5-2-2.jpg&img/block5-2-3.jpg&img/block5-2-4.jpg&img/block5-2-5.jpg'),
(5, '1020175', '商品名称：马克珍妮 Marc&Janie 女宝宝蕾丝公主裙13219;品牌：马克珍妮 Marc&Janie;分类：连衣裙/半身裙;产地：中国;参考身高：66cm;适用季节：春季,秋季', NULL, 'img/block5-3-1.jpg&img/block5-3-2.jpg&img/block5-3-3.jpg&img/block5-3-4.jpg&img/block5-3-5.jpg'),
(6, '1020176', '商品名称：荷兰原装 Nutrilon 婴幼儿奶粉1段0~6M;品牌：荷兰原装 Nutrilon;分类：婴儿奶粉;适用年龄：6-12个月;包装类型：罐装;段位：1段;保质期：18个月;产地：荷兰;规格：850g/罐*2;储存方式：干燥阴凉', NULL, 'img/block1-1-1.jpg&img/block1-1-2.jpg&img/block1-1-3.jpg&img/block1-1-4.jpg&img/block1-1-5.jpg&img/block1-1-6.jpg&img/block1-1-7.jpg&img/block1-1-8.jpg&img/block1-1-9.jpg&img/block1-1-10.jpg&img/block1-1-11.jpg&img/block1-1-12.jpg&img/block1-1-13.jpg&img/block1-1-14.jpg&img/block1-1-15.jpg&img/block1-1-16.jpg'),
(8, '1331665', '商品名称:：俏娃宝贝 儿童电子琴宝宝音乐培养益智玩具琴 粉;品牌：俏娃宝贝;分类：音乐玩具;适用年龄：1-3岁;包装规格：单件;产地：中国;材质类型：塑料', NULL, 'img/n2-1.jpg&img/n2-2.jpg&img/n2-3.jpg&img/n2-4.jpg&img/n2-5.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL auto_increment,
  `type_id` int(11) default NULL,
  `product_id` varchar(255) collate utf8_unicode_ci NOT NULL,
  `product_name` varchar(255) collate utf8_unicode_ci default NULL,
  `product_info` varchar(600) collate utf8_unicode_ci default NULL,
  `product_price` decimal(10,2) default NULL,
  `product_tax` decimal(10,2) default NULL,
  `product_img` varchar(255) collate utf8_unicode_ci default NULL,
  `product_color` varchar(255) collate utf8_unicode_ci default NULL,
  `product_size` varchar(100) collate utf8_unicode_ci default NULL,
  `product_gz` tinyint(1) default NULL,
  `sale_amount` int(11) default NULL,
  `fit_age` varchar(100) collate utf8_unicode_ci default NULL,
  `product_storage` varchar(255) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=13 ;

--
-- 导出表中的数据 `products`
--

INSERT INTO `products` (`id`, `type_id`, `product_id`, `product_name`, `product_info`, `product_price`, `product_tax`, `product_img`, `product_color`, `product_size`, `product_gz`, `sale_amount`, `fit_age`, `product_storage`) VALUES
(1, 1, '1020171', '2017夏季新款双鱼儿童T恤短袖套装宝宝纯棉童装薄', '清新印花带来夏天的味道，胸前经典图案是一大亮点。彰显活泼阳光气质，清凉舒爽，时尚百搭的款式是这个季节不可缺少的。', 42.00, NULL, 'img/kind1-1-1.jpg&img/kind1-1-1-big.jpg', '黄色', 'S&M&L&XL', 0, NULL, '1-3岁', '100&100&100&100'),
(2, 1, '1020171', '2017夏季新款双鱼儿童T恤短袖套装宝宝纯棉童装薄', '清新印花带来夏天的味道，胸前经典图案是一大亮点。彰显活泼阳光气质，清凉舒爽，时尚百搭的款式是这个季节不可缺少的。', 42.00, NULL, 'img/kind1-1-2.jpg&img/kind1-1-2-big.jpg', '蓝色', 'S&M&L&XL', 0, NULL, '1-3岁', '100&100&100&100'),
(3, 1, '1020171', '2017夏季新款双鱼儿童T恤短袖套装宝宝纯棉童装薄', '清新印花带来夏天的味道，胸前经典图案是一大亮点。彰显活泼阳光气质，清凉舒爽，时尚百搭的款式是这个季节不可缺少的。', 42.00, NULL, 'img/sp2.jpg&img/kind1-1-3-big.jpg', '粉色', 'S&M&L&XL', 0, NULL, '1-3岁', '100&100&100&100'),
(4, 1, '1020171', '2017夏季新款双鱼儿童T恤短袖套装宝宝纯棉童装薄', '清新印花带来夏天的味道，胸前经典图案是一大亮点。彰显活泼阳光气质，清凉舒爽，时尚百搭的款式是这个季节不可缺少的。', 42.00, NULL, 'img/kind1-1-4.jpg&img/kind1-1-4-big.jpg', '白色', 'S&M&L&XL', 0, NULL, '1-3岁', '100&100&100&100'),
(5, 2, '1020172', '荷兰原装 Nutrilon 婴幼儿奶粉1段0~6M 850g*2罐', '百年历史传承，荷兰黄金奶源地的馈赠，热销全球30多个国家，万千妈妈青睐。FOS/GOS益生元维持肠道健康；DHA/AA帮助宝宝智力视力发育更出色；多种天然抗氧化成分和核苷的添加有助宝宝健康发展。', 282.00, 25.00, 'img/block1-1.jpg&img/block1-1-big.jpg', NULL, NULL, 1, 2, '0-6个月', '100'),
(6, 1, '1020173', '马克珍妮 Marc&Janie 女宝宝印花连衣裙16021 红', '全棉面料 亲肤透气舒适 大红蝴蝶印花', 89.00, NULL, 'img/block5-1.jpg&img/block5-1-big.jpg', '红色', '110cm(5T)&80cm(24M)&90cm(3T)&100cm(4T)', 0, NULL, '1-3岁', '100'),
(7, 1, '1020174', '马克珍妮 Marc&Janie 女童椰树印花遮阳帽16018', '椰树印花系列 好似海风拂面 浓浓的夏天的味道', 39.00, NULL, 'img/block5-2.jpg&img/block5-2-big.jpg', '碎花', 'ONE&TWO', 0, NULL, '1-3岁', '50'),
(8, 1, '1020175', '马克珍妮 Marc&Janie 女宝宝蕾丝公主裙13219', '洁白刺绣蕾丝公主裙，精致的花蕾丝刺绣装点洁白的裙子，小飞袖设计和领口的蝴蝶结，衬托出小女孩儿的纯洁、可爱。全棉里层，细致柔软', 79.00, NULL, 'img/block5-3.jpg&img/block5-3-big.jpg', '白色', '4T(90-100cm)&18M(66-73cm)&5T(100-110cm)&3T(80-90cm)&24M(73-80cm)&12M(59-66cm)', 0, NULL, '1-3岁', '50'),
(9, 2, '1020176', '荷兰原装 Nutrilon 婴幼儿奶粉2段0~6M 850g*2罐', '百年历史传承，荷兰黄金奶源地的馈赠，热销全球30多个国家，万千妈妈青睐。FOS/GOS益生元维持肠道健康；DHA/AA帮助宝宝智力视力发育更出色；多种天然抗氧化成分和核苷的添加有助宝宝健康发展。', 282.00, 25.00, 'img/block1-3.jpg&img/block1-3.jpg', NULL, NULL, 1, 2, '6-12个月', '100'),
(11, 7, '1331665', '俏娃宝贝 儿童电子琴宝宝音乐培养益智玩具琴 粉', ' 颜色鲜艳 材质环保 边有圆滑 专为小童设计', 59.00, NULL, 'img/n2.jpg&img/n2.jpg', '粉色', '34*17', 0, NULL, '1-3岁', '100'),
(12, 7, '1331665', '俏娃宝贝 儿童电子琴宝宝音乐培养益智玩具琴 粉', ' 颜色鲜艳 材质环保 边有圆滑 专为小童设计', 59.00, NULL, 'img/n3.jpg&img/n3.jpg', '黄色', '34*17', 0, NULL, '1-3岁', '100');

-- --------------------------------------------------------

--
-- 表的结构 `today`
--

DROP TABLE IF EXISTS `today`;
CREATE TABLE IF NOT EXISTS `today` (
  `id` int(11) NOT NULL auto_increment,
  `kind` varchar(255) collate utf8_unicode_ci NOT NULL,
  `kind_img` varchar(255) collate utf8_unicode_ci default NULL,
  `product_id` varchar(255) collate utf8_unicode_ci NOT NULL,
  `product_name` varchar(255) collate utf8_unicode_ci NOT NULL,
  `product_info` varchar(255) collate utf8_unicode_ci default NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_tax` decimal(10,2) default NULL,
  `product_img` varchar(255) collate utf8_unicode_ci NOT NULL,
  `product_color` varchar(255) collate utf8_unicode_ci default NULL,
  `product_size` varchar(255) collate utf8_unicode_ci default NULL,
  `product_gz` tinyint(1) default NULL,
  `sale_amount` int(11) default NULL,
  `fit_age` varchar(255) collate utf8_unicode_ci default NULL,
  `product_storage` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=7 ;

--
-- 导出表中的数据 `today`
--

INSERT INTO `today` (`id`, `kind`, `kind_img`, `product_id`, `product_name`, `product_info`, `product_price`, `product_tax`, `product_img`, `product_color`, `product_size`, `product_gz`, `sale_amount`, `fit_age`, `product_storage`) VALUES
(1, '马克珍妮童装特卖', 'img/block5.jpg', '1020173', '马克珍妮 Marc&Janie  女宝宝印花连衣裙16021 红', '全棉面料 亲肤透气舒适 大红蝴蝶印花', 89.00, NULL, 'img/block5-1.jpg&img/block5-1-big.jpg', '红色', '110cm(5T)&90cm(3T)&80cm(24M)&73cm(18M)&100cm(4T)', 0, NULL, '1-3岁', 50),
(2, '马克珍妮童装特卖', 'img/block5.jpg', '1020174', '马克珍妮 Marc&Janie 女童椰树印花遮阳帽16018', '椰树印花系列 好似海风拂面 浓浓的夏天的味道', 39.00, NULL, 'img/block5-2.jpg&img/block5-2-big.jpg', '碎花', 'ONE&TWO', 0, NULL, '1-3岁', 50),
(3, '马克珍妮童装特卖', 'img/block5.jpg', '1020175', '马克珍妮 Marc&Janie 女宝宝蕾丝公主裙13219', '洁白刺绣蕾丝公主裙，精致的花蕾丝刺绣装点洁白的裙子，小飞袖设计和领口的蝴蝶结，衬托出小女孩儿的纯洁、可爱。全棉里层，细致柔软', 79.00, NULL, 'img/block5-3.jpg&img/block5-3-big.jpg', '白色', '4T(90-100cm)&18M(66-73cm)&5T(100-110cm)&3T(80-90cm)&24M(73-80cm)&12M(59-66cm)', 0, NULL, '1-3岁', 50),
(4, '荷兰奶粉', 'img/block1.jpg', '1020172', '荷兰原装 Nutrilon 婴幼儿奶粉1段0~6M 850g*2罐', '百年历史传承，荷兰黄金奶源地的馈赠，热销全球30多个国家，万千妈妈青睐。FOS/GOS益生元维持肠道健康；DHA/AA帮助宝宝智力视力发育更出色；多种天然抗氧化成分和核苷的添加有助宝宝健康发展。', 282.00, 25.00, 'img/block1-1.jpg&img/block1-1-big.jpg', NULL, NULL, 1, 2, '0-6个月', 100),
(5, '荷兰奶粉', 'img/block1.jpg', '1020172', '荷兰原装 Nutrilon 婴幼儿奶粉1段0~6M 850g*2罐', '百年历史传承，荷兰黄金奶源地的馈赠，热销全球30多个国家，万千妈妈青睐。FOS/GOS益生元维持肠道健康；DHA/AA帮助宝宝智力视力发育更出色；多种天然抗氧化成分和核苷的添加有助宝宝健康发展。', 510.00, 35.00, 'img/block1-2.jpg&img/block1-1-big.jpg', NULL, NULL, 1, 4, '0-6个月', 100),
(6, '荷兰奶粉', 'img/block1.jpg', '1020176', '荷兰原装 Nutrilon 婴幼儿奶粉2段0~6M 850g*2罐', '百年历史传承，荷兰黄金奶源地的馈赠，热销全球30多个国家，万千妈妈青睐。FOS/GOS益生元维持肠道健康；DHA/AA帮助宝宝智力视力发育更出色；多种天然抗氧化成分和核苷的添加有助宝宝健康发展。', 282.00, 25.00, 'img/block1-3.jpg&img/block1-3jpg', NULL, NULL, 1, 2, '6-12个月', 100);

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `id` int(11) NOT NULL auto_increment,
  `kind` varchar(100) collate utf8_unicode_ci default NULL,
  `url` varchar(100) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- 导出表中的数据 `type`
--

INSERT INTO `type` (`id`, `kind`, `url`) VALUES
(1, '儿童服饰套装', 'kind.html'),
(2, '奶粉', 'kind.html'),
(3, '纸尿裤', 'kind.html'),
(4, '童装', 'kind.html'),
(5, '儿童辅食', 'kind.html'),
(6, '面霜/乳液', 'kind.html'),
(7, '玩具', 'kind.html');

-- --------------------------------------------------------

--
-- 表的结构 `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE IF NOT EXISTS `userinfo` (
  `id` int(11) NOT NULL auto_increment,
  `phone` varchar(20) collate utf8_unicode_ci NOT NULL,
  `password` varchar(50) collate utf8_unicode_ci NOT NULL,
  `b_sex` varchar(10) collate utf8_unicode_ci default NULL,
  `b_birth` varchar(100) collate utf8_unicode_ci default NULL,
  `name` varchar(100) collate utf8_unicode_ci default NULL,
  `call` varchar(20) collate utf8_unicode_ci default NULL,
  `address` varchar(255) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `no` (`phone`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=6 ;

--
-- 导出表中的数据 `userinfo`
--

INSERT INTO `userinfo` (`id`, `phone`, `password`, `b_sex`, `b_birth`, `name`, `call`, `address`) VALUES
(1, '13983834363', '111111', '男', '2018/1/1', NULL, NULL, NULL),
(2, '15178712652', '111111', '男', '2016/5/6', NULL, NULL, NULL),
(3, '13983835262', '123456', '未知', '2017/9/1', NULL, NULL, NULL),
(4, '13856462312', '123456', '男', '2018/2/1', NULL, NULL, NULL),
(5, '13625254635', '654321', '女', '2017/2/6', NULL, NULL, NULL);
