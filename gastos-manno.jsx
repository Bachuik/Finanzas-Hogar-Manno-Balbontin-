import { useState, useEffect, useCallback } from "react";

// ── STORAGE KEYS ──────────────────────────────────────────────
const KEY_TX    = "manno_transactions";
const KEY_CUOTAS = "manno_cuotas";
const KEY_LISANDRO = "manno_lisandro";


// ── SEED DATA (migrado desde Excel) ───────────────────────────
const SEED_DATA = [{"id":1700000000000,"type":"expense","date":"2026-01-02","category":"transporte","amount":3080,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000001,"type":"income","date":"2026-01-07","category":"sueldo_sole","amount":969500,"detail":"Sueldo Sole (630)"},{"id":1700000000002,"type":"expense","date":"2026-01-02","category":"casa","amount":12000,"medio":"Efectivo","detail":"Palo Ducha"},{"id":1700000000003,"type":"income","date":"2026-01-08","category":"sueldo_martin","amount":1141086,"detail":"Sueldo Martin"},{"id":1700000000004,"type":"expense","date":"2026-01-02","category":"regalos","amount":19300,"medio":"Efectivo","detail":"Regalos Angel y Tuna"},{"id":1700000000005,"type":"income","date":"2026-01-09","category":"sueldo_sole","amount":847020,"detail":"Sueldo Sole (570)"},{"id":1700000000006,"type":"expense","date":"2026-01-03","category":"transporte","amount":3700,"medio":"Efectivo","detail":"Uber"},{"id":1700000000007,"type":"income","date":"2026-01-14","category":"banda_ingreso","amount":200000,"detail":"Show Menu"},{"id":1700000000008,"type":"expense","date":"2026-01-03","category":"comida","amount":19750,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000009,"type":"income","date":"2026-01-14","category":"devolucion","amount":61500,"detail":"Impuesto Lisandro"},{"id":1700000000010,"type":"expense","date":"2026-01-03","category":"mercado","amount":15100,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000011,"type":"income","date":"2026-01-19","category":"inversiones_rdo","amount":2869,"detail":"MercadoPago"},{"id":1700000000012,"type":"expense","date":"2026-01-03","category":"mercado","amount":15400,"medio":"Efectivo","detail":"Panaderia"},{"id":1700000000013,"type":"income","date":"2026-01-19","category":"inversiones_rdo","amount":35000,"detail":"Fci Cocos"},{"id":1700000000014,"type":"expense","date":"2026-01-04","category":"comida","amount":10400,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000015,"type":"income","date":"2026-01-19","category":"devolucion","amount":2261,"detail":"Reintegro Nafta"},{"id":1700000000016,"type":"expense","date":"2026-01-04","category":"mercado","amount":5000,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000017,"type":"income","date":"2026-01-19","category":"inversiones_rdo","amount":25000,"detail":"Cauciones Coco"},{"id":1700000000018,"type":"expense","date":"2026-01-04","category":"mercado","amount":40870,"medio":"Efectivo","detail":"Carniceria"},{"id":1700000000019,"type":"income","date":"2026-01-22","category":"devolucion","amount":12600,"detail":"Arca/Empre"},{"id":1700000000020,"type":"expense","date":"2026-01-05","category":"transporte","amount":18080,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000021,"type":"income","date":"2026-01-22","category":"devolucion","amount":35000,"detail":"Erika Pago Aro(2/3)"},{"id":1700000000022,"type":"expense","date":"2026-01-05","category":"ropa","amount":37000,"medio":"Efectivo","detail":"Regalos Mateo y Pedro"},{"id":1700000000023,"type":"income","date":"2026-01-22","category":"devolucion","amount":196000,"detail":"Percepciones"},{"id":1700000000024,"type":"expense","date":"2026-01-05","category":"regalos","amount":9850,"medio":"Efectivo","detail":"Reyes Dante"},{"id":1700000000025,"type":"income","date":"2026-02-07","category":"sueldo_sole","amount":650000,"detail":"Sueldo Sole(430)"},{"id":1700000000026,"type":"expense","date":"2026-01-05","category":"mercado","amount":9850,"medio":"Efectivo","detail":"Panaderia"},{"id":1700000000027,"type":"income","date":"2026-02-07","category":"sueldo_martin","amount":1200279,"detail":"Sueldo Martin"},{"id":1700000000028,"type":"expense","date":"2026-01-06","category":"inversiones","amount":53500,"medio":"Efectivo","detail":"S&P500"},{"id":1700000000029,"type":"income","date":"2026-02-07","category":"seguros","amount":180000,"detail":"Juan"},{"id":1700000000030,"type":"expense","date":"2026-01-06","category":"transporte","amount":4500,"medio":"Efectivo","detail":"Uber"},{"id":1700000000031,"type":"income","date":"2026-02-07","category":"sueldo_sole","amount":1100000,"detail":"Sueldo Sole"},{"id":1700000000032,"type":"expense","date":"2026-01-06","category":"transporte","amount":1580,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000033,"type":"income","date":"2026-02-18","category":"devolucion","amount":13270,"detail":"Arca Martin/Empre"},{"id":1700000000034,"type":"expense","date":"2026-01-06","category":"regalos","amount":16000,"medio":"Efectivo","detail":"Regalos Salita Pedro"},{"id":1700000000035,"type":"income","date":"2026-02-20","category":"devolucion","amount":105000,"detail":"Impuesto Lisandro"},{"id":1700000000036,"type":"expense","date":"2026-01-06","category":"casa","amount":3400,"medio":"Efectivo","detail":"Pilas"},{"id":1700000000037,"type":"income","date":"2026-02-21","category":"banda_ingreso","amount":150000,"detail":"Show Menu"},{"id":1700000000038,"type":"expense","date":"2026-01-06","category":"graciela","amount":220000,"medio":"Efectivo","detail":"Graciela"},{"id":1700000000039,"type":"income","date":"2026-02-21","category":"devolucion","amount":69450,"detail":"Erika Pago Aro(3/3)"},{"id":1700000000040,"type":"expense","date":"2026-01-07","category":"transporte","amount":6805,"medio":"Efectivo","detail":"Nafta Moto"},{"id":1700000000041,"type":"income","date":"2026-02-27","category":"devolucion","amount":25000,"detail":"Sabri Helado"},{"id":1700000000042,"type":"expense","date":"2026-01-07","category":"deporte","amount":189000,"medio":"Mastercard","detail":"Cuota Provincial"},{"id":1700000000043,"type":"income","date":"2026-02-28","category":"inversiones_rdo","amount":11000,"detail":"Cocos Inversion"},{"id":1700000000044,"type":"expense","date":"2026-01-07","category":"seguros_casa","amount":12400,"medio":"Mastercard","detail":"Auxilio Moto"},{"id":1700000000045,"type":"income","date":"2026-02-28","category":"inversiones_rdo","amount":7337,"detail":"Fiwind"},{"id":1700000000046,"type":"expense","date":"2026-01-07","category":"seguros_casa","amount":26973,"medio":"Mastercard","detail":"Seguro Moto"},{"id":1700000000047,"type":"income","date":"2026-02-28","category":"inversiones_rdo","amount":4100,"detail":"MercadoPago"},{"id":1700000000048,"type":"expense","date":"2026-01-07","category":"plataformas","amount":14400,"medio":"Mastercard","detail":"Google One"},{"id":1700000000049,"type":"income","date":"2026-03-05","category":"devolucion","amount":25000,"detail":"Zapas Mateo"},{"id":1700000000050,"type":"expense","date":"2026-01-07","category":"plataformas","amount":14400,"medio":"Mastercard","detail":"Youtube"},{"id":1700000000051,"type":"income","date":"2026-03-06","category":"sueldo_martin","amount":1364416,"detail":"Sueldo Martin"},{"id":1700000000052,"type":"expense","date":"2026-01-07","category":"ropa","amount":31333,"medio":"Mastercard","detail":"Juleriaque(3/6)"},{"id":1700000000053,"type":"income","date":"2026-03-06","category":"sueldo_sole","amount":569013,"detail":"Sueldo Sole"},{"id":1700000000054,"type":"expense","date":"2026-01-07","category":"ropa","amount":6000,"medio":"Mastercard","detail":"Juleriaque(3/6)"},{"id":1700000000055,"type":"income","date":"2026-03-09","category":"sueldo_sole","amount":1137000,"detail":"Sueldo Sole"},{"id":1700000000056,"type":"expense","date":"2026-01-07","category":"regalos","amount":6000,"medio":"Mastercard","detail":"Rozne(1/3)"},{"id":1700000000057,"type":"income","date":"2026-03-09","category":"trading","amount":426900,"detail":"Trading (300 USDT)"},{"id":1700000000058,"type":"expense","date":"2026-01-07","category":"casa","amount":121599,"medio":"Mastercard","detail":"Gs Computacion(1/6)"},{"id":1700000000059,"type":"income","date":"2026-03-09","category":"seguros","amount":190000,"detail":"Juan"},{"id":1700000000060,"type":"expense","date":"2026-01-07","category":"casa","amount":9445,"medio":"Mastercard","detail":"Harcore Comp.(1/3)"},{"id":1700000000061,"type":"income","date":"2026-03-09","category":"anses","amount":170000,"detail":"Anses Sole"},{"id":1700000000062,"type":"income","date":"2026-03-13","category":"devolucion","amount":10600,"detail":"Fotocopias"},{"id":1700000000063,"type":"expense","date":"2026-01-07","category":"imp_tarjeta","amount":28596,"medio":"Mastercard","detail":"Impuestos tarjeta"},{"id":1700000000064,"type":"income","date":"2026-03-19","category":"devolucion","amount":13200,"detail":"Arca Martin/Empre"},{"id":1700000000065,"type":"expense","date":"2026-01-07","category":"transporte","amount":3160,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000066,"type":"income","date":"2026-03-21","category":"devolucion","amount":104000,"detail":"Impuesto Lisandro"},{"id":1700000000067,"type":"expense","date":"2026-01-07","category":"salidas","amount":22000,"medio":"Efectivo","detail":"Chocotorta"},{"id":1700000000068,"type":"income","date":"2026-03-25","category":"devolucion","amount":6000,"detail":"Tarjeta Nafta"},{"id":1700000000069,"type":"expense","date":"2026-01-07","category":"transporte","amount":3300,"medio":"Efectivo","detail":"Uber"},{"id":1700000000070,"type":"income","date":"2026-03-31","category":"inversiones_rdo","amount":4643,"detail":"MercadoPago"},{"id":1700000000071,"type":"expense","date":"2026-01-07","category":"comida","amount":4000,"medio":"Efectivo","detail":"Empanadas"},{"id":1700000000072,"type":"income","date":"2026-04-01","category":"sueldo_martin","amount":1288350,"detail":"Sueldo Martin"},{"id":1700000000073,"type":"expense","date":"2026-01-07","category":"salidas","amount":10400,"medio":"Efectivo","detail":"Bar amigas"},{"id":1700000000074,"type":"expense","date":"2026-01-07","category":"mercado","amount":21700,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000075,"type":"expense","date":"2026-01-07","category":"mercado","amount":14800,"medio":"Efectivo","detail":"Polleria"},{"id":1700000000076,"type":"expense","date":"2026-01-07","category":"impuestos","amount":5000,"medio":"Efectivo","detail":"Pilas, gaseosa"},{"id":1700000000077,"type":"expense","date":"2026-01-07","category":"imp_tarjeta","amount":29727,"medio":"Visa","detail":"Impuestos tarjeta"},{"id":1700000000078,"type":"expense","date":"2026-01-07","category":"seguros_casa","amount":121776,"medio":"Visa","detail":"Seguros(casa, auto, Graciela)"},{"id":1700000000079,"type":"expense","date":"2026-01-08","category":"mercado","amount":407983,"medio":"Carrefour","detail":"Supermercado"},{"id":1700000000080,"type":"expense","date":"2026-01-08","category":"salud","amount":30000,"medio":"Efectivo","detail":"Psico Sole"},{"id":1700000000081,"type":"expense","date":"2026-01-08","category":"salidas","amount":43000,"medio":"Efectivo","detail":"Tortas"},{"id":1700000000082,"type":"expense","date":"2026-01-08","category":"mercado","amount":10000,"medio":"Efectivo","detail":"Supremas"},{"id":1700000000083,"type":"expense","date":"2026-01-08","category":"regalos","amount":60000,"medio":"Efectivo","detail":"Regalos amigas"},{"id":1700000000084,"type":"expense","date":"2026-01-08","category":"salidas","amount":5000,"medio":"Efectivo","detail":"Bolsitas cumple"},{"id":1700000000085,"type":"expense","date":"2026-01-08","category":"regalos","amount":9200,"medio":"Efectivo","detail":"Regalo Lucia"},{"id":1700000000086,"type":"expense","date":"2026-01-08","category":"salidas","amount":35700,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000087,"type":"expense","date":"2026-01-08","category":"salidas","amount":2000,"medio":"Efectivo","detail":"Propina bar"},{"id":1700000000088,"type":"expense","date":"2026-01-09","category":"plataformas","amount":3299,"medio":"Visa","detail":"Spotify"},{"id":1700000000089,"type":"expense","date":"2026-01-09","category":"plataformas","amount":20298,"medio":"Visa","detail":"Netflix"},{"id":1700000000090,"type":"expense","date":"2026-01-09","category":"plataformas","amount":7298,"medio":"Visa","detail":"MercadoLibre/Disney"},{"id":1700000000091,"type":"expense","date":"2026-01-09","category":"casa","amount":6799,"medio":"Visa","detail":"Google"},{"id":1700000000092,"type":"expense","date":"2026-01-09","category":"salud","amount":7050,"medio":"Visa","detail":"Optica Shellas(6/6)"},{"id":1700000000093,"type":"expense","date":"2026-01-09","category":"salud","amount":33884,"medio":"Visa","detail":"Optica Shellas(6/6)"},{"id":1700000000094,"type":"expense","date":"2026-01-09","category":"casa","amount":6944,"medio":"Visa","detail":"Rosario Papel(5/6)"},{"id":1700000000095,"type":"expense","date":"2026-01-09","category":"regalos","amount":4355,"medio":"Visa","detail":"Joyeria Fernandez(5/9)"},{"id":1700000000096,"type":"expense","date":"2026-01-09","category":"casa","amount":13888,"medio":"Visa","detail":"Lader(5/9)"},{"id":1700000000097,"type":"expense","date":"2026-01-09","category":"regalos","amount":12666,"medio":"Visa","detail":"Sport 78(3/3)"},{"id":1700000000098,"type":"expense","date":"2026-01-09","category":"regalos","amount":11300,"medio":"Visa","detail":"Cheeky(3/3)"},{"id":1700000000099,"type":"expense","date":"2026-01-09","category":"ropa","amount":7110,"medio":"Visa","detail":"Masoneria(3/3)"},{"id":1700000000100,"type":"expense","date":"2026-01-09","category":"ropa","amount":21666,"medio":"Visa","detail":"Cabo Andrea Elea(3/3)"},{"id":1700000000101,"type":"expense","date":"2026-01-09","category":"ropa","amount":10666,"medio":"Visa","detail":"Cabo Andrea Elea(2/3)"},{"id":1700000000102,"type":"expense","date":"2026-01-09","category":"regalos","amount":23200,"medio":"Visa","detail":"Magdala(1/3)"},{"id":1700000000103,"type":"expense","date":"2026-01-09","category":"regalos","amount":22333,"medio":"Visa","detail":"Merpago#Priet"},{"id":1700000000104,"type":"expense","date":"2026-01-09","category":"deporte","amount":16666,"medio":"Visa","detail":"Provin Colonia(1/3)"},{"id":1700000000105,"type":"expense","date":"2026-01-09","category":"deporte","amount":65000,"medio":"Visa","detail":"Provin Colonia(1/3)"},{"id":1700000000106,"type":"expense","date":"2026-01-09","category":"regalos","amount":13630,"medio":"Visa","detail":"Charco(1/3)"},{"id":1700000000107,"type":"expense","date":"2026-01-09","category":"casa","amount":17166,"medio":"Visa","detail":"Lader (1/6)"},{"id":1700000000108,"type":"expense","date":"2026-01-09","category":"casa","amount":13966,"medio":"Visa","detail":"MercadoPago(1/3)"},{"id":1700000000109,"type":"expense","date":"2026-01-09","category":"ropa","amount":10633,"medio":"Visa","detail":"Fit One(1/3)"},{"id":1700000000110,"type":"expense","date":"2026-01-09","category":"ropa","amount":10633,"medio":"Visa","detail":"Fit One(1/3)"},{"id":1700000000111,"type":"expense","date":"2026-01-09","category":"ropa","amount":33000,"medio":"Visa","detail":"Selu Portal"},{"id":1700000000112,"type":"expense","date":"2026-01-09","category":"ropa","amount":66150,"medio":"Visa","detail":"Mercadopago fever"},{"id":1700000000113,"type":"expense","date":"2026-01-09","category":"salud","amount":247672,"medio":"Visa","detail":"Medife"},{"id":1700000000114,"type":"expense","date":"2026-01-09","category":"salud","amount":14000,"medio":"Efectivo","detail":"Medico Vero"},{"id":1700000000115,"type":"expense","date":"2026-01-09","category":"salidas","amount":20600,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000116,"type":"expense","date":"2026-01-09","category":"salidas","amount":35600,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000117,"type":"expense","date":"2026-01-09","category":"comida","amount":4500,"medio":"Efectivo","detail":"Kiosko"},{"id":1700000000118,"type":"expense","date":"2026-01-09","category":"transporte","amount":3500,"medio":"Efectivo","detail":"Uber"},{"id":1700000000119,"type":"expense","date":"2026-01-09","category":"comida","amount":12000,"medio":"Efectivo","detail":"Comida Club"},{"id":1700000000120,"type":"expense","date":"2026-01-09","category":"ropa","amount":36000,"medio":"Efectivo","detail":"Peluqueria(Pedro Mateo)"},{"id":1700000000121,"type":"expense","date":"2026-01-10","category":"salidas","amount":12700,"medio":"Efectivo","detail":"Almuerzo Sole"},{"id":1700000000122,"type":"expense","date":"2026-01-10","category":"transporte","amount":1800,"medio":"Efectivo","detail":"Medido"},{"id":1700000000123,"type":"expense","date":"2026-01-10","category":"comida","amount":20800,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000124,"type":"expense","date":"2026-01-10","category":"salidas","amount":12000,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000125,"type":"expense","date":"2026-01-10","category":"regalos","amount":30000,"medio":"Efectivo","detail":"Regalo Pedro"},{"id":1700000000126,"type":"expense","date":"2026-01-12","category":"mercado","amount":34500,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000127,"type":"expense","date":"2026-01-12","category":"impuestos","amount":33936,"medio":"Efectivo","detail":"Aguas"},{"id":1700000000128,"type":"expense","date":"2026-01-12","category":"impuestos","amount":21879,"medio":"Efectivo","detail":"Tgi"},{"id":1700000000129,"type":"expense","date":"2026-01-12","category":"salidas","amount":53000,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000130,"type":"expense","date":"2026-01-12","category":"salidas","amount":31100,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000131,"type":"expense","date":"2026-01-13","category":"transporte","amount":6320,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000132,"type":"expense","date":"2026-01-13","category":"comida","amount":2400,"medio":"Efectivo","detail":"Empanadas"},{"id":1700000000133,"type":"expense","date":"2026-01-13","category":"salidas","amount":16320,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000134,"type":"expense","date":"2026-01-14","category":"impuestos","amount":28996,"medio":"Efectivo","detail":"Gas"},{"id":1700000000135,"type":"expense","date":"2026-01-14","category":"transporte","amount":3900,"medio":"Efectivo","detail":"Uber"},{"id":1700000000136,"type":"expense","date":"2026-01-14","category":"salud","amount":30000,"medio":"Efectivo","detail":"Psico Sole"},{"id":1700000000137,"type":"expense","date":"2026-01-14","category":"salidas","amount":300710,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000138,"type":"expense","date":"2026-01-15","category":"salidas","amount":56000,"medio":"Efectivo","detail":"Cumple Pedro"},{"id":1700000000139,"type":"expense","date":"2026-01-17","category":"mercado","amount":9000,"medio":"Efectivo","detail":"Tostados"},{"id":1700000000140,"type":"expense","date":"2026-01-17","category":"comida","amount":4600,"medio":"Efectivo","detail":"Bebidas Salida"},{"id":1700000000141,"type":"expense","date":"2026-01-17","category":"salidas","amount":12000,"medio":"Efectivo","detail":"Entradas Basquet"},{"id":1700000000142,"type":"expense","date":"2026-01-18","category":"comida","amount":9600,"medio":"Efectivo","detail":"Panaderia"},{"id":1700000000143,"type":"expense","date":"2026-01-18","category":"salidas","amount":53000,"medio":"Efectivo","detail":"Cumbion Parana"},{"id":1700000000144,"type":"expense","date":"2026-01-18","category":"comida","amount":7100,"medio":"Efectivo","detail":"Cosas para merienda"},{"id":1700000000145,"type":"expense","date":"2026-01-18","category":"salidas","amount":14000,"medio":"Efectivo","detail":"Entrada Bas+Tostado"},{"id":1700000000146,"type":"expense","date":"2026-01-19","category":"salidas","amount":24500,"medio":"Efectivo","detail":"Entrada Shakira"},{"id":1700000000147,"type":"expense","date":"2026-01-20","category":"transporte","amount":4300,"medio":"Efectivo","detail":"Uber"},{"id":1700000000148,"type":"expense","date":"2026-01-21","category":"ropa","amount":43000,"medio":"Efectivo","detail":"Perfumeria"},{"id":1700000000149,"type":"expense","date":"2026-01-21","category":"salud","amount":30000,"medio":"Efectivo","detail":"Psicologa"},{"id":1700000000150,"type":"expense","date":"2026-01-21","category":"comida","amount":3000,"medio":"Efectivo","detail":"Helado Club"},{"id":1700000000151,"type":"expense","date":"2026-01-21","category":"impuestos","amount":70862,"medio":"Efectivo","detail":"Epe"},{"id":1700000000152,"type":"expense","date":"2026-01-21","category":"impuestos","amount":7730,"medio":"Efectivo","detail":"Internet"},{"id":1700000000153,"type":"expense","date":"2026-01-21","category":"comida","amount":7400,"medio":"Efectivo","detail":"Mercado"},{"id":1700000000154,"type":"expense","date":"2026-01-21","category":"impuestos","amount":4182,"medio":"Efectivo","detail":"Monotributo"},{"id":1700000000155,"type":"expense","date":"2026-01-22","category":"comida","amount":6000,"medio":"Efectivo","detail":"Rifredo"},{"id":1700000000156,"type":"expense","date":"2026-01-23","category":"transporte","amount":21780,"medio":"Efectivo","detail":"Matafuego"},{"id":1700000000157,"type":"expense","date":"2026-01-23","category":"transporte","amount":13333,"medio":"MercadoPago","detail":"Funda Moto 1/3"},{"id":1700000000158,"type":"expense","date":"2026-01-23","category":"banda","amount":8490,"medio":"MercadoPago","detail":"Empretienda"},{"id":1700000000159,"type":"expense","date":"2026-01-23","category":"casa","amount":11244,"medio":"MercadoPago","detail":"Cam.Seguridad 1/3"},{"id":1700000000160,"type":"expense","date":"2026-01-23","category":"transporte","amount":71016,"medio":"MercadoPago","detail":"Nafta Auto"},{"id":1700000000161,"type":"expense","date":"2026-01-23","category":"transporte","amount":20000,"medio":"MercadoPago","detail":"Vtv 1/3"},{"id":1700000000162,"type":"expense","date":"2026-01-23","category":"transporte","amount":67562,"medio":"MercadoPago","detail":"Nafta Auto"},{"id":1700000000163,"type":"expense","date":"2026-01-23","category":"regalos","amount":83333,"medio":"MercadoPago","detail":"Aro Basquet 2/3"},{"id":1700000000164,"type":"expense","date":"2026-01-23","category":"casa","amount":5410,"medio":"MercadoPago","detail":"Caja Herramientas 2/3"},{"id":1700000000165,"type":"expense","date":"2026-01-23","category":"transporte","amount":7524,"medio":"MercadoPago","detail":"Nafta Moto"},{"id":1700000000166,"type":"expense","date":"2026-01-23","category":"comida","amount":25000,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000167,"type":"expense","date":"2026-01-23","category":"salud","amount":24000,"medio":"Efectivo","detail":"Farmacia"},{"id":1700000000168,"type":"expense","date":"2026-01-23","category":"casa","amount":10000,"medio":"Efectivo","detail":"Estacas"},{"id":1700000000169,"type":"expense","date":"2026-01-24","category":"salidas","amount":1460743,"medio":"Efectivo","detail":"Gastos Vacaciones"},{"id":1700000000170,"type":"expense","date":"2026-02-02","category":"comida","amount":3900,"medio":"Efectivo","detail":"Saladix"},{"id":1700000000171,"type":"expense","date":"2026-02-02","category":"mercado","amount":32999,"medio":"Efectivo","detail":"Burguer King"},{"id":1700000000172,"type":"expense","date":"2026-02-02","category":"mercado","amount":26200,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000173,"type":"expense","date":"2026-02-04","category":"salud","amount":10000,"medio":"Efectivo","detail":"Dentista"},{"id":1700000000174,"type":"expense","date":"2026-02-04","category":"mercado","amount":18622,"medio":"Efectivo","detail":"Pescado"},{"id":1700000000175,"type":"expense","date":"2026-02-05","category":"mercado","amount":23000,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000176,"type":"expense","date":"2026-02-05","category":"salidas","amount":15000,"medio":"Efectivo","detail":"Asado chicos"},{"id":1700000000177,"type":"expense","date":"2026-02-06","category":"mercado","amount":5800,"medio":"Efectivo","detail":"Pizza"},{"id":1700000000178,"type":"expense","date":"2026-02-07","category":"regalos","amount":17000,"medio":"Efectivo","detail":"Regalo Sol"},{"id":1700000000179,"type":"expense","date":"2026-02-07","category":"mercado","amount":10000,"medio":"Efectivo","detail":"Supermercado"},{"id":1700000000180,"type":"expense","date":"2026-02-07","category":"casa","amount":10000,"medio":"Efectivo","detail":"Dispenser Baño"},{"id":1700000000181,"type":"expense","date":"2026-02-07","category":"transporte","amount":3200,"medio":"Efectivo","detail":"Uber"},{"id":1700000000182,"type":"expense","date":"2026-02-07","category":"transporte","amount":1580,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000183,"type":"expense","date":"2026-02-07","category":"regalos","amount":8700,"medio":"Efectivo","detail":"Regalo Ambar"},{"id":1700000000184,"type":"expense","date":"2026-02-07","category":"graciela","amount":270000,"medio":"Efectivo","detail":"Graciela"},{"id":1700000000185,"type":"expense","date":"2026-02-07","category":"salidas","amount":23000,"medio":"Efectivo","detail":"Salida amigas"},{"id":1700000000186,"type":"expense","date":"2026-02-08","category":"transporte","amount":9600,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000187,"type":"expense","date":"2026-02-08","category":"deporte","amount":12000,"medio":"Efectivo","detail":"Partido Provin"},{"id":1700000000188,"type":"expense","date":"2026-02-08","category":"comida","amount":22000,"medio":"Efectivo","detail":"Comida Club"},{"id":1700000000189,"type":"expense","date":"2026-02-09","category":"mercado","amount":350999,"medio":"Carrefour","detail":"Carrefour"},{"id":1700000000190,"type":"expense","date":"2026-02-09","category":"ropa","amount":12000,"medio":"Efectivo","detail":"Peluqueria Martin"},{"id":1700000000191,"type":"expense","date":"2026-02-09","category":"mercado","amount":27000,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000192,"type":"expense","date":"2026-02-09","category":"salud","amount":36000,"medio":"Efectivo","detail":"Psico Sole"},{"id":1700000000193,"type":"expense","date":"2026-02-09","category":"salidas","amount":27500,"medio":"Efectivo","detail":"Lio Jump"},{"id":1700000000194,"type":"expense","date":"2026-02-09","category":"comida","amount":21000,"medio":"Efectivo","detail":"Shooping"},{"id":1700000000195,"type":"expense","date":"2026-02-09","category":"mercado","amount":11000,"medio":"Efectivo","detail":"Tarta"},{"id":1700000000196,"type":"expense","date":"2026-02-11","category":"deporte","amount":202600,"medio":"Mastercard","detail":"Cuota Provincial"},{"id":1700000000197,"type":"expense","date":"2026-02-11","category":"seguros_casa","amount":12700,"medio":"Mastercard","detail":"Auxilio Moto"},{"id":1700000000198,"type":"expense","date":"2026-02-11","category":"seguros_casa","amount":28464,"medio":"Mastercard","detail":"Seguro Moto"},{"id":1700000000199,"type":"expense","date":"2026-02-11","category":"plataformas","amount":14400,"medio":"Mastercard","detail":"Google One"},{"id":1700000000200,"type":"expense","date":"2026-02-11","category":"ropa","amount":31333,"medio":"Mastercard","detail":"Juleriaque(4/6)"},{"id":1700000000201,"type":"expense","date":"2026-02-11","category":"ropa","amount":6000,"medio":"Mastercard","detail":"Juleriaque(4/6)"},{"id":1700000000202,"type":"expense","date":"2026-02-11","category":"mercado","amount":6000,"medio":"Mastercard","detail":"Rozne(2/3)"},{"id":1700000000203,"type":"expense","date":"2026-02-11","category":"casa","amount":121599,"medio":"Mastercard","detail":"Gs Computacion(2/6)"},{"id":1700000000204,"type":"expense","date":"2026-02-11","category":"casa","amount":9444,"medio":"Mastercard","detail":"Harcore Comp.(2/3)"},{"id":1700000000205,"type":"expense","date":"2026-02-11","category":"imp_tarjeta","amount":22456,"medio":"Mastercard","detail":"Impuestos tarjeta"},{"id":1700000000206,"type":"expense","date":"2026-02-11","category":"transporte","amount":2516,"medio":"Mastercard","detail":"Peajes"},{"id":1700000000207,"type":"expense","date":"2026-02-11","category":"plataformas","amount":3299,"medio":"Visa","detail":"Spotify"},{"id":1700000000208,"type":"expense","date":"2026-02-11","category":"plataformas","amount":25398,"medio":"Visa","detail":"Netflix"},{"id":1700000000209,"type":"expense","date":"2026-02-11","category":"plataformas","amount":18399,"medio":"Visa","detail":"MercadoLibre/Disney"},{"id":1700000000210,"type":"expense","date":"2026-02-11","category":"plataformas","amount":6799,"medio":"Visa","detail":"Youtube"},{"id":1700000000211,"type":"expense","date":"2026-02-11","category":"imp_tarjeta","amount":33899,"medio":"Visa","detail":"Impuestos tarjeta"},{"id":1700000000212,"type":"expense","date":"2026-02-11","category":"seguros_casa","amount":123986,"medio":"Visa","detail":"Seguros(casa, auto, Graciela)"},{"id":1700000000213,"type":"expense","date":"2026-02-11","category":"casa","amount":6944,"medio":"Visa","detail":"rosario Papel(6/9)"},{"id":1700000000214,"type":"expense","date":"2026-02-11","category":"regalos","amount":4355,"medio":"Visa","detail":"joyeria Fernandez(6/9)"},{"id":1700000000215,"type":"expense","date":"2026-02-11","category":"casa","amount":13888,"medio":"Visa","detail":"Lader(6/9)"},{"id":1700000000216,"type":"expense","date":"2026-02-11","category":"ropa","amount":10666,"medio":"Visa","detail":"Cabo Andrea Elea(3/3)"},{"id":1700000000217,"type":"expense","date":"2026-02-11","category":"regalos","amount":23200,"medio":"Visa","detail":"magdala(2/3)"},{"id":1700000000218,"type":"expense","date":"2026-02-11","category":"regalos","amount":22333,"medio":"Visa","detail":"Merpago#Priet(2/3)"},{"id":1700000000219,"type":"expense","date":"2026-02-11","category":"deporte","amount":16666,"medio":"Visa","detail":"Provin Colonia(2/3)"},{"id":1700000000220,"type":"expense","date":"2026-02-11","category":"deporte","amount":65000,"medio":"Visa","detail":"Provin Colonia(2/3)"},{"id":1700000000221,"type":"expense","date":"2026-02-11","category":"regalos","amount":13629,"medio":"Visa","detail":"CHArco(2/3)"},{"id":1700000000222,"type":"expense","date":"2026-02-11","category":"casa","amount":17166,"medio":"Visa","detail":"Lader(2/6)"},{"id":1700000000223,"type":"expense","date":"2026-02-11","category":"casa","amount":13699,"medio":"Visa","detail":"MercadoPago(2/3)"},{"id":1700000000224,"type":"expense","date":"2026-02-11","category":"ropa","amount":10633,"medio":"Visa","detail":"Fit One(2/3)"},{"id":1700000000225,"type":"expense","date":"2026-02-11","category":"ropa","amount":10633,"medio":"Visa","detail":"Fit One(2/3)"},{"id":1700000000226,"type":"expense","date":"2026-02-11","category":"ropa","amount":29666,"medio":"Visa","detail":"La masoneria(1/3)"},{"id":1700000000227,"type":"expense","date":"2026-02-11","category":"regalos","amount":4033,"medio":"Visa","detail":"Lader(1/6)"},{"id":1700000000228,"type":"expense","date":"2026-02-11","category":"regalos","amount":14600,"medio":"Visa","detail":"Tio Tom(1/6)"},{"id":1700000000229,"type":"expense","date":"2026-02-11","category":"regalos","amount":11381,"medio":"Visa","detail":"Winstonjr(1/6)"},{"id":1700000000230,"type":"expense","date":"2026-02-11","category":"regalos","amount":18033,"medio":"Visa","detail":"MiSuelitoLindo"},{"id":1700000000231,"type":"expense","date":"2026-02-11","category":"salud","amount":7050,"medio":"Visa","detail":"Shellas(1/6)"},{"id":1700000000232,"type":"expense","date":"2026-02-13","category":"inversiones","amount":151000,"medio":"Efectivo","detail":"S&P500/Microsoft"},{"id":1700000000233,"type":"expense","date":"2026-02-13","category":"deporte","amount":15000,"medio":"Efectivo","detail":"Seguro Basquet"},{"id":1700000000234,"type":"expense","date":"2026-02-13","category":"comida","amount":9000,"medio":"Efectivo","detail":"Comida Club"},{"id":1700000000235,"type":"expense","date":"2026-02-14","category":"comida","amount":9500,"medio":"Efectivo","detail":"Comida Club"},{"id":1700000000236,"type":"expense","date":"2026-02-14","category":"comida","amount":9000,"medio":"Efectivo","detail":"Dietetica"},{"id":1700000000237,"type":"expense","date":"2026-02-14","category":"mercado","amount":11300,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000238,"type":"expense","date":"2026-02-14","category":"comida","amount":27000,"medio":"Efectivo","detail":"Sandwich"},{"id":1700000000239,"type":"expense","date":"2026-02-14","category":"comida","amount":30000,"medio":"Efectivo","detail":"Casagrande"},{"id":1700000000240,"type":"expense","date":"2026-02-14","category":"comida","amount":20000,"medio":"Efectivo","detail":"Pizza"},{"id":1700000000241,"type":"expense","date":"2026-02-14","category":"comida","amount":11300,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000242,"type":"expense","date":"2026-02-14","category":"comida","amount":32199,"medio":"Efectivo","detail":"Durum"},{"id":1700000000243,"type":"expense","date":"2026-02-17","category":"salud","amount":6000,"medio":"Efectivo","detail":"Apto fisico Mateo"},{"id":1700000000244,"type":"expense","date":"2026-02-18","category":"impuestos","amount":21879,"medio":"Efectivo","detail":"Tgi"},{"id":1700000000245,"type":"expense","date":"2026-02-18","category":"impuestos","amount":33936,"medio":"Efectivo","detail":"Agua"},{"id":1700000000246,"type":"expense","date":"2026-02-18","category":"impuestos","amount":27962,"medio":"Efectivo","detail":"Gas"},{"id":1700000000247,"type":"expense","date":"2026-02-18","category":"impuestos","amount":160535,"medio":"Efectivo","detail":"Epe"},{"id":1700000000248,"type":"expense","date":"2026-02-18","category":"impuestos","amount":7990,"medio":"Efectivo","detail":"Api"},{"id":1700000000249,"type":"expense","date":"2026-02-18","category":"impuestos","amount":5000,"medio":"Efectivo","detail":"Pasillo"},{"id":1700000000250,"type":"expense","date":"2026-02-18","category":"transporte","amount":3600,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000251,"type":"expense","date":"2026-02-18","category":"banda","amount":4780,"medio":"Efectivo","detail":"Monotributo Martin"},{"id":1700000000252,"type":"expense","date":"2026-02-18","category":"mercado","amount":28500,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000253,"type":"expense","date":"2026-02-18","category":"impuestos","amount":7419,"medio":"Efectivo","detail":"Internet"},{"id":1700000000254,"type":"expense","date":"2026-02-18","category":"comida","amount":2400,"medio":"Efectivo","detail":"Boris"},{"id":1700000000255,"type":"expense","date":"2026-02-18","category":"transporte","amount":8000,"medio":"Efectivo","detail":"Cochera"},{"id":1700000000256,"type":"expense","date":"2026-02-19","category":"comida","amount":5400,"medio":"Efectivo","detail":"Boris"},{"id":1700000000257,"type":"expense","date":"2026-02-20","category":"comida","amount":1750,"medio":"Efectivo","detail":"Boris"},{"id":1700000000258,"type":"expense","date":"2026-02-21","category":"mercado","amount":10000,"medio":"Efectivo","detail":"Milanesas"},{"id":1700000000259,"type":"expense","date":"2026-02-21","category":"comida","amount":33000,"medio":"Efectivo","detail":"Pizzas y Chipas"},{"id":1700000000260,"type":"expense","date":"2026-02-22","category":"salidas","amount":24000,"medio":"Efectivo","detail":"Cine"},{"id":1700000000261,"type":"expense","date":"2026-02-23","category":"impuestos","amount":160535,"medio":"Efectivo","detail":"Epe"},{"id":1700000000262,"type":"expense","date":"2026-02-23","category":"transporte","amount":3160,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000263,"type":"expense","date":"2026-02-23","category":"casa","amount":5410,"medio":"MercadoPago","detail":"Mercado Libre"},{"id":1700000000264,"type":"expense","date":"2026-02-23","category":"regalos","amount":83333,"medio":"MercadoPago","detail":"Aro Basquet 3/3"},{"id":1700000000265,"type":"expense","date":"2026-02-23","category":"plataformas","amount":13333,"medio":"MercadoPago","detail":"Disney"},{"id":1700000000266,"type":"expense","date":"2026-02-23","category":"banda","amount":8490,"medio":"MercadoPago","detail":"Empretienda"},{"id":1700000000267,"type":"expense","date":"2026-02-23","category":"transporte","amount":7801,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000268,"type":"expense","date":"2026-02-23","category":"casa","amount":11244,"medio":"MercadoPago","detail":"Camara Seguridad(2/3)"},{"id":1700000000269,"type":"expense","date":"2026-02-23","category":"transporte","amount":20000,"medio":"MercadoPago","detail":"Vtv (2/3)"},{"id":1700000000270,"type":"expense","date":"2026-02-23","category":"transporte","amount":7538,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000271,"type":"expense","date":"2026-02-23","category":"transporte","amount":67457,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000272,"type":"expense","date":"2026-02-23","category":"transporte","amount":38997,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000273,"type":"expense","date":"2026-02-23","category":"transporte","amount":50000,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000274,"type":"expense","date":"2026-02-23","category":"transporte","amount":48000,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000275,"type":"expense","date":"2026-02-23","category":"imp_tarjeta","amount":361,"medio":"MercadoPago","detail":"Impuestos tarjeta"},{"id":1700000000276,"type":"expense","date":"2026-02-23","category":"transporte","amount":1580,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000277,"type":"expense","date":"2026-02-23","category":"educacion","amount":23000,"medio":"Efectivo","detail":"Utiles"},{"id":1700000000278,"type":"expense","date":"2026-02-23","category":"comida","amount":2000,"medio":"Efectivo","detail":"Helado Club"},{"id":1700000000279,"type":"expense","date":"2026-02-24","category":"mercado","amount":4800,"medio":"Efectivo","detail":"Panaderia"},{"id":1700000000280,"type":"expense","date":"2026-02-24","category":"mercado","amount":33500,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000281,"type":"expense","date":"2026-02-25","category":"transporte","amount":3200,"medio":"Efectivo","detail":"Uber"},{"id":1700000000282,"type":"expense","date":"2026-02-25","category":"comida","amount":6700,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000283,"type":"expense","date":"2026-02-26","category":"impuestos","amount":7990,"medio":"Efectivo","detail":"Api"},{"id":1700000000284,"type":"expense","date":"2026-02-26","category":"transporte","amount":60226,"medio":"Efectivo","detail":"Patente Auto"},{"id":1700000000285,"type":"expense","date":"2026-02-26","category":"transporte","amount":8638,"medio":"Efectivo","detail":"Patente Moto"},{"id":1700000000286,"type":"expense","date":"2026-02-26","category":"comida","amount":7400,"medio":"Efectivo","detail":"Helado Club"},{"id":1700000000287,"type":"expense","date":"2026-02-26","category":"deporte","amount":14500,"medio":"Efectivo","detail":"Partido Provin"},{"id":1700000000288,"type":"expense","date":"2026-02-26","category":"regalos","amount":33000,"medio":"Efectivo","detail":"Regalos"},{"id":1700000000289,"type":"expense","date":"2026-02-26","category":"transporte","amount":19206,"medio":"Efectivo","detail":"Uber"},{"id":1700000000290,"type":"expense","date":"2026-02-26","category":"transporte","amount":1720,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000291,"type":"expense","date":"2026-02-26","category":"salud","amount":36000,"medio":"Efectivo","detail":"Psicologa"},{"id":1700000000292,"type":"expense","date":"2026-02-26","category":"comida","amount":2530,"medio":"Efectivo","detail":"Supermercado"},{"id":1700000000293,"type":"expense","date":"2026-02-26","category":"educacion","amount":1200,"medio":"Efectivo","detail":"Librería"},{"id":1700000000294,"type":"expense","date":"2026-02-26","category":"comida","amount":7700,"medio":"Efectivo","detail":"Club"},{"id":1700000000295,"type":"expense","date":"2026-02-27","category":"mercado","amount":25000,"medio":"Efectivo","detail":"Helado Tato"},{"id":1700000000296,"type":"expense","date":"2026-02-28","category":"salidas","amount":19000,"medio":"Efectivo","detail":"Salida Mateo y Pedro"},{"id":1700000000297,"type":"expense","date":"2026-02-28","category":"plataformas","amount":4000,"medio":"Efectivo","detail":"Barrilete Cosmico"},{"id":1700000000298,"type":"expense","date":"2026-03-01","category":"mercado","amount":4300,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000299,"type":"expense","date":"2026-03-01","category":"salidas","amount":34000,"medio":"Efectivo","detail":"Salida Sole"},{"id":1700000000300,"type":"expense","date":"2026-03-02","category":"ropa","amount":28000,"medio":"Efectivo","detail":"Peluqueria chicos"},{"id":1700000000301,"type":"expense","date":"2026-03-02","category":"transporte","amount":4250,"medio":"Efectivo","detail":"Taxi"},{"id":1700000000302,"type":"expense","date":"2026-03-02","category":"comida","amount":4700,"medio":"Efectivo","detail":"Tarta"},{"id":1700000000303,"type":"expense","date":"2026-03-02","category":"transporte","amount":3700,"medio":"Efectivo","detail":"uber"},{"id":1700000000304,"type":"expense","date":"2026-03-02","category":"salud","amount":36000,"medio":"Efectivo","detail":"Psicologa"},{"id":1700000000305,"type":"expense","date":"2026-03-02","category":"mercado","amount":12413,"medio":"Efectivo","detail":"Pescaderia"},{"id":1700000000306,"type":"expense","date":"2026-03-02","category":"casa","amount":9000,"medio":"Efectivo","detail":"Fotocopia"},{"id":1700000000307,"type":"expense","date":"2026-03-04","category":"salidas","amount":29295,"medio":"Efectivo","detail":"Juego 2k 26"},{"id":1700000000308,"type":"expense","date":"2026-03-04","category":"mercado","amount":11300,"medio":"Efectivo","detail":"Pechugas"},{"id":1700000000309,"type":"expense","date":"2026-03-06","category":"deporte","amount":12000,"medio":"Efectivo","detail":"Partido Provin"},{"id":1700000000310,"type":"expense","date":"2026-03-06","category":"comida","amount":22500,"medio":"Efectivo","detail":"Comida Club"},{"id":1700000000311,"type":"expense","date":"2026-03-07","category":"deporte","amount":15000,"medio":"Efectivo","detail":"Partido Mateo"},{"id":1700000000312,"type":"expense","date":"2026-03-07","category":"transporte","amount":3440,"medio":"Efectivo","detail":"Colectivo"},{"id":1700000000313,"type":"expense","date":"2026-03-07","category":"comida","amount":15000,"medio":"Efectivo","detail":"Almuerzo Sole"},{"id":1700000000314,"type":"expense","date":"2026-03-07","category":"graciela","amount":3500,"medio":"Efectivo","detail":"Colectivo Graciela"},{"id":1700000000315,"type":"expense","date":"2026-03-07","category":"transporte","amount":12000,"medio":"Efectivo","detail":"uber"},{"id":1700000000316,"type":"expense","date":"2026-03-07","category":"salidas","amount":30000,"medio":"Efectivo","detail":"Salida Cumple"},{"id":1700000000317,"type":"expense","date":"2026-03-07","category":"regalos","amount":15000,"medio":"Efectivo","detail":"Regalos"},{"id":1700000000318,"type":"expense","date":"2026-03-07","category":"comida","amount":12000,"medio":"Efectivo","detail":"Panaderia"},{"id":1700000000319,"type":"expense","date":"2026-03-07","category":"comida","amount":8500,"medio":"Efectivo","detail":"Panchos"},{"id":1700000000320,"type":"expense","date":"2026-03-07","category":"comida","amount":15750,"medio":"Efectivo","detail":"Helado"},{"id":1700000000321,"type":"expense","date":"2026-03-07","category":"plataformas","amount":3299,"medio":"Visa","detail":"Spotify"},{"id":1700000000322,"type":"expense","date":"2026-03-07","category":"plataformas","amount":25398,"medio":"Visa","detail":"Netflix"},{"id":1700000000323,"type":"expense","date":"2026-03-07","category":"plataformas","amount":18399,"medio":"Visa","detail":"MercadoLibre/Disney"},{"id":1700000000324,"type":"expense","date":"2026-03-07","category":"plataformas","amount":6799,"medio":"Visa","detail":"Youtube"},{"id":1700000000325,"type":"expense","date":"2026-03-07","category":"imp_tarjeta","amount":35534,"medio":"Visa","detail":"Impuestos tarjeta"},{"id":1700000000326,"type":"expense","date":"2026-03-07","category":"seguros_casa","amount":124557,"medio":"Visa","detail":"Seguros(casa, auto, Graciela)"},{"id":1700000000327,"type":"expense","date":"2026-03-07","category":"casa","amount":6944,"medio":"Visa","detail":"rosario Papel(7/9)"},{"id":1700000000328,"type":"expense","date":"2026-03-07","category":"regalos","amount":4355,"medio":"Visa","detail":"joyeria Fernandez(7/9)"},{"id":1700000000329,"type":"expense","date":"2026-03-07","category":"casa","amount":13888,"medio":"Visa","detail":"Lader(7/9)"},{"id":1700000000330,"type":"expense","date":"2026-03-07","category":"regalos","amount":23200,"medio":"Visa","detail":"magdala(3/3)"},{"id":1700000000331,"type":"expense","date":"2026-03-07","category":"regalos","amount":22333,"medio":"Visa","detail":"Merpago#Priet(3/3)"},{"id":1700000000332,"type":"expense","date":"2026-03-07","category":"deporte","amount":16666,"medio":"Visa","detail":"Provin Colonia(3/3)"},{"id":1700000000333,"type":"expense","date":"2026-03-07","category":"deporte","amount":65000,"medio":"Visa","detail":"Provin Colonia(3/3)"},{"id":1700000000334,"type":"expense","date":"2026-03-07","category":"regalos","amount":13629,"medio":"Visa","detail":"CHArco(3/3)"},{"id":1700000000335,"type":"expense","date":"2026-03-07","category":"casa","amount":17166,"medio":"Visa","detail":"Lader(3/6)"},{"id":1700000000336,"type":"expense","date":"2026-03-07","category":"casa","amount":13699,"medio":"Visa","detail":"MercadoPago(3/3)"},{"id":1700000000337,"type":"expense","date":"2026-03-07","category":"ropa","amount":10633,"medio":"Visa","detail":"Fit One(3/3)"},{"id":1700000000338,"type":"expense","date":"2026-03-07","category":"ropa","amount":10633,"medio":"Visa","detail":"Fit One(3/3)"},{"id":1700000000339,"type":"expense","date":"2026-03-07","category":"ropa","amount":29666,"medio":"Visa","detail":"La masoneria(2/3)"},{"id":1700000000340,"type":"expense","date":"2026-03-07","category":"regalos","amount":4033,"medio":"Visa","detail":"Lader(2/6)"},{"id":1700000000341,"type":"expense","date":"2026-03-07","category":"regalos","amount":14600,"medio":"Visa","detail":"Tio Tom(2/6)"},{"id":1700000000342,"type":"expense","date":"2026-03-07","category":"regalos","amount":11381,"medio":"Visa","detail":"Winstonjr(2/6)"},{"id":1700000000343,"type":"expense","date":"2026-03-07","category":"regalos","amount":18033,"medio":"Visa","detail":"MiSuelitoLindo(2/3)"},{"id":1700000000344,"type":"expense","date":"2026-03-07","category":"salud","amount":7050,"medio":"Visa","detail":"Shellas(2/6)"},{"id":1700000000345,"type":"expense","date":"2026-03-07","category":"regalos","amount":14333,"medio":"Visa","detail":"Black Sheep(1/3)"},{"id":1700000000346,"type":"expense","date":"2026-03-07","category":"educacion","amount":21516,"medio":"Visa","detail":"Lader(1/6)"},{"id":1700000000347,"type":"expense","date":"2026-03-07","category":"ropa","amount":54400,"medio":"Visa","detail":"Asociacion Educacionista"},{"id":1700000000348,"type":"expense","date":"2026-03-08","category":"deporte","amount":2000,"medio":"Efectivo","detail":"Partido Provin "},{"id":1700000000349,"type":"expense","date":"2026-03-08","category":"comida","amount":4000,"medio":"Efectivo","detail":"Sandwich"},{"id":1700000000350,"type":"expense","date":"2026-03-09","category":"mercado","amount":344263,"medio":"Carrefour","detail":"Supermercado"},{"id":1700000000351,"type":"expense","date":"2026-03-09","category":"educacion","amount":693000,"medio":"Efectivo","detail":"La Salle"},{"id":1700000000352,"type":"expense","date":"2026-03-09","category":"salud","amount":200000,"medio":"Efectivo","detail":"Medife"},{"id":1700000000353,"type":"expense","date":"2026-03-09","category":"deporte","amount":32000,"medio":"Efectivo","detail":"Gimnasio Sole"},{"id":1700000000354,"type":"expense","date":"2026-03-09","category":"comida","amount":20000,"medio":"Efectivo","detail":"Colacion Sole"},{"id":1700000000355,"type":"expense","date":"2026-03-09","category":"transporte","amount":1720,"medio":"Efectivo","detail":"colectivo"},{"id":1700000000356,"type":"expense","date":"2026-03-09","category":"mercado","amount":37900,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000357,"type":"expense","date":"2026-03-09","category":"impuestos","amount":38800,"medio":"Efectivo","detail":"Agua"},{"id":1700000000358,"type":"expense","date":"2026-03-09","category":"impuestos","amount":21879,"medio":"Efectivo","detail":"Tgi"},{"id":1700000000359,"type":"expense","date":"2026-03-10","category":"regalos","amount":16000,"medio":"Efectivo","detail":"Autitos"},{"id":1700000000360,"type":"expense","date":"2026-03-11","category":"inversiones","amount":158000,"medio":"Efectivo","detail":"Spy+Msrt"},{"id":1700000000361,"type":"expense","date":"2026-03-11","category":"impuestos","amount":5000,"medio":"Efectivo","detail":"Pasillo"},{"id":1700000000362,"type":"expense","date":"2026-03-11","category":"educacion","amount":6000,"medio":"Efectivo","detail":"Alfileres"},{"id":1700000000363,"type":"expense","date":"2026-03-11","category":"deporte","amount":202600,"medio":"Mastercard","detail":"Cuota Provincial"},{"id":1700000000364,"type":"expense","date":"2026-03-11","category":"seguros_casa","amount":13000,"medio":"Mastercard","detail":"Auxilio Moto"},{"id":1700000000365,"type":"expense","date":"2026-03-11","category":"seguros_casa","amount":30166,"medio":"Mastercard","detail":"Seguro Moto"},{"id":1700000000366,"type":"expense","date":"2026-03-11","category":"ropa","amount":31333,"medio":"Mastercard","detail":"Juleriaque(5/6)"},{"id":1700000000367,"type":"expense","date":"2026-03-11","category":"ropa","amount":6000,"medio":"Mastercard","detail":"Juleriaque(5/6)"},{"id":1700000000368,"type":"expense","date":"2026-03-11","category":"mercado","amount":6000,"medio":"Mastercard","detail":"Rozne(3/3)"},{"id":1700000000369,"type":"expense","date":"2026-03-11","category":"casa","amount":121599,"medio":"Mastercard","detail":"Gs Computacion(3/6)"},{"id":1700000000370,"type":"expense","date":"2026-03-11","category":"casa","amount":9444,"medio":"Mastercard","detail":"Harcore Comp.(3/3)"},{"id":1700000000371,"type":"expense","date":"2026-03-11","category":"imp_tarjeta","amount":14731,"medio":"Mastercard","detail":"Impuestos tarjeta"},{"id":1700000000372,"type":"expense","date":"2026-03-11","category":"transporte","amount":16444,"medio":"Mastercard","detail":"Peajes"},{"id":1700000000373,"type":"expense","date":"2026-03-11","category":"ropa","amount":49966,"medio":"Mastercard","detail":"Zapa Basquet Mateo(1/3)"},{"id":1700000000374,"type":"expense","date":"2026-03-12","category":"casa","amount":5000,"medio":"Efectivo","detail":"Pico pelota"},{"id":1700000000375,"type":"expense","date":"2026-03-12","category":"comida","amount":10500,"medio":"Efectivo","detail":"Colacion Sole"},{"id":1700000000376,"type":"expense","date":"2026-03-13","category":"salud","amount":14000,"medio":"Efectivo","detail":"Actron"},{"id":1700000000377,"type":"expense","date":"2026-03-13","category":"graciela","amount":3500,"medio":"Efectivo","detail":"Cole Graciela"},{"id":1700000000378,"type":"expense","date":"2026-03-13","category":"educacion","amount":7000,"medio":"Efectivo","detail":"Utiles Escolares"},{"id":1700000000379,"type":"expense","date":"2026-03-13","category":"comida","amount":3800,"medio":"Efectivo","detail":"Almuerzo Sole"},{"id":1700000000380,"type":"expense","date":"2026-03-13","category":"salidas","amount":12000,"medio":"Efectivo","detail":"Partido provin"},{"id":1700000000381,"type":"expense","date":"2026-03-13","category":"salidas","amount":14400,"medio":"Efectivo","detail":"Salida chicos"},{"id":1700000000382,"type":"expense","date":"2026-03-14","category":"mercado","amount":10400,"medio":"Efectivo","detail":"Polleria"},{"id":1700000000383,"type":"expense","date":"2026-03-14","category":"mercado","amount":30000,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000384,"type":"expense","date":"2026-03-14","category":"mercado","amount":15350,"medio":"Efectivo","detail":"Helados"},{"id":1700000000385,"type":"expense","date":"2026-03-15","category":"mercado","amount":8400,"medio":"Efectivo","detail":"Pizzas"},{"id":1700000000386,"type":"expense","date":"2026-03-16","category":"impuestos","amount":26976,"medio":"Efectivo","detail":"Gas"},{"id":1700000000387,"type":"expense","date":"2026-03-16","category":"casa","amount":13000,"medio":"Efectivo","detail":"cerrajero"},{"id":1700000000388,"type":"expense","date":"2026-03-16","category":"mercado","amount":13000,"medio":"Efectivo","detail":"Aceite Oliva"},{"id":1700000000389,"type":"expense","date":"2026-03-17","category":"salidas","amount":12000,"medio":"Efectivo","detail":"Partido Basquet"},{"id":1700000000390,"type":"expense","date":"2026-03-17","category":"transporte","amount":13350,"medio":"Efectivo","detail":"uber"},{"id":1700000000391,"type":"expense","date":"2026-03-17","category":"educacion","amount":91120,"medio":"Efectivo","detail":"Libro Ingles"},{"id":1700000000392,"type":"expense","date":"2026-03-17","category":"comida","amount":3500,"medio":"Efectivo","detail":"Quiosko"},{"id":1700000000393,"type":"expense","date":"2026-03-17","category":"regalos","amount":30000,"medio":"Efectivo","detail":"Regalo Beñat+Juanita"},{"id":1700000000394,"type":"expense","date":"2026-03-17","category":"mercado","amount":13000,"medio":"Efectivo","detail":"Dietetica"},{"id":1700000000395,"type":"expense","date":"2026-03-19","category":"regalos","amount":12900,"medio":"Efectivo","detail":"Regalo Erika"},{"id":1700000000396,"type":"expense","date":"2026-03-20","category":"mercado","amount":26500,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000397,"type":"expense","date":"2026-03-20","category":"banda","amount":4780,"medio":"Efectivo","detail":"Arca Martin"},{"id":1700000000398,"type":"expense","date":"2026-03-21","category":"mercado","amount":21700,"medio":"Efectivo","detail":"Pastas"},{"id":1700000000399,"type":"expense","date":"2026-03-23","category":"impuestos","amount":7502,"medio":"Efectivo","detail":"Internet"},{"id":1700000000400,"type":"expense","date":"2026-03-23","category":"comida","amount":23000,"medio":"Efectivo","detail":"Pizza"},{"id":1700000000401,"type":"expense","date":"2026-03-23","category":"regalos","amount":25000,"medio":"Efectivo","detail":"Regalo Pato"},{"id":1700000000402,"type":"expense","date":"2026-03-23","category":"impuestos","amount":160000,"medio":"Efectivo","detail":"Epe"},{"id":1700000000403,"type":"expense","date":"2026-03-23","category":"salidas","amount":30000,"medio":"Efectivo","detail":"Fiesta Helado"},{"id":1700000000404,"type":"expense","date":"2026-03-24","category":"comida","amount":12000,"medio":"Efectivo","detail":"Almacen"},{"id":1700000000405,"type":"expense","date":"2026-03-24","category":"salidas","amount":43400,"medio":"Efectivo","detail":"Rifreddo"},{"id":1700000000406,"type":"expense","date":"2026-03-25","category":"plataformas","amount":13333,"medio":"MercadoPago","detail":"Mercado+Disney"},{"id":1700000000407,"type":"expense","date":"2026-03-25","category":"banda","amount":8490,"medio":"MercadoPago","detail":"Empretienda"},{"id":1700000000408,"type":"expense","date":"2026-03-25","category":"transporte","amount":208993,"medio":"MercadoPago","detail":"Combustible"},{"id":1700000000409,"type":"expense","date":"2026-03-25","category":"salidas","amount":40999,"medio":"MercadoPago","detail":"Disco Rigido"},{"id":1700000000410,"type":"expense","date":"2026-03-25","category":"casa","amount":11244,"medio":"MercadoPago","detail":"Camara Seguridad(3/3)"},{"id":1700000000411,"type":"expense","date":"2026-03-25","category":"transporte","amount":20000,"medio":"MercadoPago","detail":"Vtv (3/3)"},{"id":1700000000412,"type":"expense","date":"2026-03-25","category":"mercado","amount":11000,"medio":"Efectivo","detail":"Supremas"},{"id":1700000000413,"type":"expense","date":"2026-03-25","category":"comida","amount":10100,"medio":"Efectivo","detail":"Boris"},{"id":1700000000414,"type":"expense","date":"2026-03-26","category":"regalos","amount":30000,"medio":"Efectivo","detail":"Regalos"},{"id":1700000000415,"type":"expense","date":"2026-03-26","category":"mercado","amount":8000,"medio":"Efectivo","detail":"Chipas"},{"id":1700000000416,"type":"expense","date":"2026-03-26","category":"transporte","amount":6095,"medio":"Efectivo","detail":"Uber"},{"id":1700000000417,"type":"expense","date":"2026-03-26","category":"comida","amount":3400,"medio":"Efectivo","detail":"McDonald´s"},{"id":1700000000418,"type":"expense","date":"2026-03-26","category":"salidas","amount":20000,"medio":"Efectivo","detail":"Salida Pizzas"},{"id":1700000000419,"type":"expense","date":"2026-03-27","category":"plataformas","amount":4000,"medio":"Efectivo","detail":"Barrilete Cosmico"},{"id":1700000000420,"type":"expense","date":"2026-03-27","category":"mercado","amount":2000,"medio":"Efectivo","detail":"Bar Provin"},{"id":1700000000421,"type":"expense","date":"2026-03-28","category":"salud","amount":150000,"medio":"Efectivo","detail":"Cirugia Martin"},{"id":1700000000422,"type":"expense","date":"2026-03-28","category":"salud","amount":20000,"medio":"Efectivo","detail":"Farmacia"},{"id":1700000000423,"type":"expense","date":"2026-03-29","category":"comida","amount":7700,"medio":"Efectivo","detail":"Quiosko"},{"id":1700000000424,"type":"expense","date":"2026-03-29","category":"mercado","amount":28400,"medio":"Efectivo","detail":"Carniceria"},{"id":1700000000425,"type":"expense","date":"2026-03-29","category":"mercado","amount":17000,"medio":"Efectivo","detail":"Verduleria"},{"id":1700000000426,"type":"expense","date":"2026-03-29","category":"mercado","amount":9484,"medio":"Efectivo","detail":"Fiambre"},{"id":1700000000427,"type":"expense","date":"2026-03-29","category":"comida","amount":3400,"medio":"Efectivo","detail":"Colacion Sole"},{"id":1700000000428,"type":"expense","date":"2026-03-29","category":"mercado","amount":2793,"medio":"Efectivo","detail":"Panaderia"},{"id":1700000000429,"type":"expense","date":"2026-03-30","category":"mercado","amount":18493,"medio":"Efectivo","detail":"Pescaderia"}];
const SEED_KEY  = "manno_seeded_v1";

// ── CATEGORIES ────────────────────────────────────────────────
const EXPENSE_CATS = [
  { id: "mercado",     label: "Mercado/Super",   emoji: "🛒", color: "#22c55e" },
  { id: "comida",      label: "Comida/Delivery", emoji: "🍔", color: "#f97316" },
  { id: "transporte",  label: "Transporte",      emoji: "🚗", color: "#3b82f6" },
  { id: "salud",       label: "Salud",           emoji: "💊", color: "#ec4899" },
  { id: "casa",        label: "Casa/Hogar",      emoji: "🏠", color: "#8b5cf6" },
  { id: "impuestos",   label: "Impuestos Casa",  emoji: "🏛️", color: "#7c3aed" },
  { id: "plataformas", label: "Plataformas",     emoji: "📺", color: "#0ea5e9" },
  { id: "seguros_casa",label: "Seguros",         emoji: "🛡️", color: "#64748b" },
  { id: "ropa",        label: "Ropa/Vestimenta", emoji: "👕", color: "#06b6d4" },
  { id: "salidas",     label: "Salidas/Ocio",    emoji: "🎉", color: "#eab308" },
  { id: "educacion",   label: "Educación",       emoji: "📚", color: "#14b8a6" },
  { id: "regalos",     label: "Regalos",         emoji: "🎁", color: "#f43f5e" },
  { id: "deporte",     label: "Deporte",         emoji: "🏀", color: "#84cc16" },
  { id: "graciela",    label: "Graciela",        emoji: "🧹", color: "#a78bfa" },
  { id: "banda",       label: "Banda",           emoji: "🎸", color: "#fb923c" },
  { id: "inversiones", label: "Inversiones",     emoji: "💰", color: "#10b981" },
];

const INCOME_CATS = [
  { id: "sueldo_martin",   label: "Sueldo Martín",     emoji: "💼" },
  { id: "sueldo_sole",     label: "Sueldo Sole",       emoji: "💼" },
  { id: "anses",           label: "Anses Sole",        emoji: "🏛️" },
  { id: "seguros",         label: "Seguros (Juan)",    emoji: "🛡️" },
  { id: "trading",         label: "Trading",           emoji: "📈" },
  { id: "devolucion",      label: "Devolución",        emoji: "↩️" },
  { id: "banda_ingreso",   label: "Devolución Banda",  emoji: "🎸" },
  { id: "inversiones_rdo", label: "Rdto. Inversiones", emoji: "💰" },
  { id: "otro_ingreso",    label: "Otro",              emoji: "➕" },
];

const MEDIOS = ["Efectivo", "Visa", "Mastercard", "MercadoPago", "Carrefour"];

// ── HELPERS ───────────────────────────────────────────────────
const todayStr   = () => new Date().toISOString().slice(0, 10);
const yesterdayStr = () => { const d = new Date(); d.setDate(d.getDate()-1); return d.toISOString().slice(0,10); };
const fmtDate    = (iso) => { if (!iso) return ""; const [y,m,d] = iso.split("-"); return `${d}/${m}/${y}`; };
const fmtMoney   = (n)   => "$" + Number(n).toLocaleString("es-AR", { minimumFractionDigits: 0 });
const monthKey   = (iso) => iso?.slice(0, 7);
const currentMonth = () => todayStr().slice(0, 7);
const addMonths  = (ym, n) => { const [y,m] = ym.split("-").map(Number); const d = new Date(y, m-1+n, 1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; };
const MONTH_NAMES = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const fmtMonth   = (ym) => { if (!ym) return ""; const [y,m] = ym.split("-"); return `${MONTH_NAMES[parseInt(m)-1]} ${y}`; };
const getCat     = (id) => EXPENSE_CATS.find(c => c.id === id);

// ── CUOTA HELPERS ─────────────────────────────────────────────
// Genera las cuotas activas para un mes dado
const getCuotasForMonth = (cuotas, ym) =>
  cuotas.flatMap(c => {
    const cuotaIdx = [];
    for (let i = 0; i < c.totalCuotas; i++) {
      if (addMonths(c.startMonth, i) === ym) cuotaIdx.push(i+1);
    }
    return cuotaIdx.map(n => ({
      ...c,
      cuotaNum: n,
      amount: Math.round(c.totalAmount / c.totalCuotas),
      type: "expense",
      isCuota: true,
    }));
  });

// ── MAIN APP ──────────────────────────────────────────────────
export default function App() {
  const [view, setView]             = useState("home");
  const [transactions, setTransactions] = useState([]);
  const [cuotas, setCuotas]         = useState([]);
  const [lisandroData, setLisandroData] = useState({}); // { "2026-05": { monto: 0 } }
  const [selMonth, setSelMonth]     = useState(currentMonth());

  useEffect(() => {
    (async () => {
      try {
        const r1 = await window.storage.get(KEY_TX);
        if (r1?.value) {
          // Storage tiene datos — puede tener nuevas tx además del seed
          const stored = JSON.parse(r1.value);
          // Merge: seed como base + cualquier tx nueva (id > seed range)
          const newTxs = stored.filter(t => t.id > 1700000000500);
          setTransactions([...SEED_DATA, ...newTxs]);
        } else {
          // Sin storage todavía, usar seed directo
          setTransactions(SEED_DATA);
        }
        const r2 = await window.storage.get(KEY_CUOTAS);
        if (r2?.value) setCuotas(JSON.parse(r2.value));
        const r3 = await window.storage.get(KEY_LISANDRO);
        if (r3?.value) setLisandroData(JSON.parse(r3.value));
      } catch (_) {
        setTransactions(SEED_DATA);
      }
    })();
  }, []);

  const saveTx = useCallback(async (txs) => {
    setTransactions(txs);
    // Only persist new transactions (seed data is always in SEED_DATA constant)
    const newTxs = txs.filter(t => t.id > 1700000000500);
    try { await window.storage.set(KEY_TX, JSON.stringify(newTxs)); } catch (_) {}
  }, []);

  const saveCuotas = useCallback(async (cs) => {
    setCuotas(cs);
    try { await window.storage.set(KEY_CUOTAS, JSON.stringify(cs)); } catch (_) {}
  }, []);

  const saveLisandro = useCallback(async (data) => {
    setLisandroData(data);
    try { await window.storage.set(KEY_LISANDRO, JSON.stringify(data)); } catch (_) {}
  }, []);

  const addTx     = useCallback((tx) => saveTx([...transactions, { ...tx, id: Date.now() }]), [transactions, saveTx]);
  const deleteTx  = useCallback((id) => saveTx(transactions.filter(t => t.id !== id)), [transactions, saveTx]);
  const addCuota  = useCallback((c)  => saveCuotas([...cuotas, { ...c, id: Date.now() }]), [cuotas, saveCuotas]);
  const deleteCuota = useCallback((id) => saveCuotas(cuotas.filter(c => c.id !== id)), [cuotas, saveCuotas]);

  // Months
  const allMonths = [...new Set([
    ...transactions.map(t => monthKey(t.date)),
    ...cuotas.flatMap(c => Array.from({length: c.totalCuotas}, (_,i) => addMonths(c.startMonth, i)))
  ])].filter(Boolean).sort().reverse();
  if (!allMonths.includes(currentMonth())) allMonths.unshift(currentMonth());

  // Month data
  const monthTxs    = transactions.filter(t => monthKey(t.date) === selMonth);
  const monthCuotas = getCuotasForMonth(cuotas, selMonth);

  const totalIncome  = monthTxs.filter(t => t.type === "income").reduce((s,t) => s+t.amount, 0);
  const totalCuotas  = monthCuotas.reduce((s,c) => s+c.amount, 0);
  const totalExpense = monthTxs.filter(t => t.type === "expense").reduce((s,t) => s+t.amount, 0) + totalCuotas;
  const balance      = totalIncome - totalExpense;

  // Category breakdown (gastos normales + cuotas distribuidas por cat)
  const catBreakdown = EXPENSE_CATS.map(c => {
    const fromTx     = monthTxs.filter(t => t.type==="expense" && t.category===c.id).reduce((s,t)=>s+t.amount,0);
    const fromCuotas = monthCuotas.filter(q => q.category===c.id).reduce((s,q)=>s+q.amount,0);
    return { ...c, total: fromTx + fromCuotas, fromCuotas };
  }).filter(c => c.total > 0).sort((a,b) => b.total - a.total);

  const props = { setView, balance, totalExpense, totalIncome, totalCuotas, monthTxs, monthCuotas, selMonth, setSelMonth, months: allMonths, catBreakdown, deleteTx, cuotas, deleteCuota, lisandroData, saveLisandro, impuestosTotal: monthTxs.filter(t=>t.type==='expense'&&t.category==='impuestos').reduce((s,t)=>s+t.amount,0) };

  return (
    <div style={S.app}>
      <style>{globalCss}</style>
      {view === "home"       && <HomeView       {...props} />}
      {view === "addExpense" && <AddExpenseView onSave={addTx}    onBack={() => setView("home")} />}
      {view === "addIncome"  && <AddIncomeView  onSave={addTx}    onBack={() => setView("home")} />}
      {view === "addCuota"   && <AddCuotaView   onSave={addCuota} onBack={() => setView("home")} />}
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────
function HomeView({ setView, balance, totalExpense, totalIncome, totalCuotas, monthTxs, monthCuotas, selMonth, setSelMonth, months, catBreakdown, deleteTx, cuotas, deleteCuota, lisandroData, saveLisandro, impuestosTotal }) {
  const [tab, setTab] = useState("resumen");

  const allMovements = [
    ...monthTxs.map(t => ({ ...t, isCuota: false })),
    ...monthCuotas.map(c => ({ ...c, date: selMonth+"-01", type:"expense" }))
  ].sort((a,b) => (b.id||0)-(a.id||0));

  // Cuotas activas globales (todas, no solo este mes)
  const activeCuotas = cuotas.filter(c => {
    const lastMonth = addMonths(c.startMonth, c.totalCuotas - 1);
    return lastMonth >= currentMonth();
  });

  return (
    <div style={S.screen}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.appTitle}>💸 Gastos Manno</span>
          <select value={selMonth} onChange={e=>setSelMonth(e.target.value)} style={S.monthPicker}>
            {months.map(m => <option key={m} value={m}>{fmtMonth(m)}</option>)}
          </select>
        </div>
        <div style={S.balanceCard}>
          <div style={S.balanceLabel}>Balance del mes</div>
          <div style={{...S.balanceAmount, color: balance>=0?"#4ade80":"#f87171"}}>{fmtMoney(balance)}</div>
          <div style={S.balanceRow}>
            <span style={S.incomeChip}>▲ {fmtMoney(totalIncome)}</span>
            <span style={S.expenseChip}>▼ {fmtMoney(totalExpense)}</span>
            {totalCuotas > 0 && <span style={S.cuotaChip}>🔁 {fmtMoney(totalCuotas)} cuotas</span>}
          </div>
        </div>
      </div>

      {/* FAB buttons */}
      <div style={S.fabRow}>
        <button style={{...S.fab, background:"#f87171"}}            onClick={()=>setView("addExpense")}>− Gasto</button>
        <button style={{...S.fab, background:"#4ade80",color:"#111"}} onClick={()=>setView("addIncome")}>+ Ingreso</button>
        <button style={{...S.fab, background:"#818cf8",color:"#111"}} onClick={()=>setView("addCuota")}>🔁 Cuotas</button>
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {["resumen","movimientos","cuotas"].map(t => (
          <button key={t} style={{...S.tab,...(tab===t?S.tabActive:{})}} onClick={()=>setTab(t)}>
            {t==="resumen"?"Resumen":t==="movimientos"?"Movimientos":"Mis Cuotas"}
          </button>
        ))}
      </div>

      <div style={S.content}>
        {tab==="resumen" && (
          <ResumenPanel catBreakdown={catBreakdown} totalExpense={totalExpense} monthTxs={monthTxs} monthCuotas={monthCuotas} lisandroData={lisandroData} saveLisandro={saveLisandro} selMonth={selMonth} impuestosTotal={impuestosTotal} />
        )}
        {tab==="movimientos" && (
          <MovimientosPanel allMovements={allMovements} deleteTx={deleteTx} />
        )}
        {tab==="cuotas" && (
          <CuotasPanel cuotas={cuotas} activeCuotas={activeCuotas} onDelete={deleteCuota} />
        )}
      </div>
    </div>
  );
}

// ── RESUMEN PANEL ─────────────────────────────────────────────
const MEDIO_COLORS = {
  "Efectivo":    "#4ade80",
  "Visa":        "#60a5fa",
  "Mastercard":  "#f97316",
  "MercadoPago": "#818cf8",
  "Carrefour":   "#fb7185",
};

function ResumenPanel({ catBreakdown, totalExpense, monthTxs, monthCuotas, lisandroData, saveLisandro, selMonth, impuestosTotal }) {
  const lisandroMonto = lisandroData[selMonth]?.monto || 0;
  const totalCompartido = impuestosTotal + lisandroMonto;
  const miParte = Math.round(totalCompartido / 2);
  const leMeDebe = impuestosTotal - miParte; // cuánto me debe (positivo = me debe a mí)

  const handleLisandroChange = (val) => {
    const n = parseInt(val) || 0;
    saveLisandro({ ...lisandroData, [selMonth]: { monto: n } });
  };
  // Breakdown por medio de pago
  const allExpenses = [
    ...monthTxs.filter(t => t.type === "expense"),
    ...monthCuotas.map(c => ({ ...c, medio: c.medio || "Otros" }))
  ];

  const medioTotals = {};
  allExpenses.forEach(t => {
    const m = t.medio || "Efectivo";
    medioTotals[m] = (medioTotals[m] || 0) + t.amount;
  });
  const medios = Object.entries(medioTotals).sort((a,b) => b[1]-a[1]);

  return (
    <div>
      {/* Por categoría */}
      {catBreakdown.length === 0 && <div style={S.empty}>Sin gastos este mes todavía</div>}
      {catBreakdown.map(c => <CatRow key={c.id} cat={c} total={totalExpense} />)}

      {/* Por medio de pago */}
      {medios.length > 0 && (
        <>
          <div style={S.medioSectionTitle}>Gasto por tarjeta / medio</div>
          <div style={S.medioSectionNote}>Incluye impuestos y cargos de cada tarjeta</div>
          <div style={S.medioTable}>
            {medios.map(([medio, total]) => (
              <div key={medio} style={S.medioTableRow}>
                <div style={S.medioTableLeft}>
                  <div style={{...S.medioDot, background: MEDIO_COLORS[medio]||"#94a3b8"}} />
                  <span style={S.medioTableName}>{medio}</span>
                </div>
                <div style={S.medioTableRight}>
                  <span style={S.medioTableAmount}>{fmtMoney(total)}</span>
                  <span style={S.medioTablePct}>{totalExpense > 0 ? Math.round(total/totalExpense*100) : 0}%</span>
                </div>
                <div style={S.barBg}>
                  <div style={{...S.barFill, width:`${totalExpense>0?Math.round(total/totalExpense*100):0}%`, background: MEDIO_COLORS[medio]||"#94a3b8"}} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── MOVIMIENTOS PANEL ─────────────────────────────────────────
function MovimientosPanel({ allMovements, deleteTx }) {
  const [sub, setSub] = useState("egresos");
  const egresos  = allMovements.filter(t => t.type === "expense");
  const ingresos = allMovements.filter(t => t.type === "income");
  const list     = sub === "egresos" ? egresos : ingresos;
  const totalEg  = egresos.reduce((s,t)  => s + t.amount, 0);
  const totalIng = ingresos.reduce((s,t) => s + t.amount, 0);

  return (
    <div>
      {/* Subtabs */}
      <div style={S.subTabs}>
        <button style={{...S.subTab,...(sub==="egresos"?S.subTabExpense:{})}} onClick={()=>setSub("egresos")}>
          Egresos · <span style={{fontWeight:800}}>{fmtMoney(totalEg)}</span>
        </button>
        <button style={{...S.subTab,...(sub==="ingresos"?S.subTabIncome:{})}} onClick={()=>setSub("ingresos")}>
          Ingresos · <span style={{fontWeight:800}}>{fmtMoney(totalIng)}</span>
        </button>
      </div>
      {list.length === 0
        ? <div style={S.empty}>Sin {sub} este mes</div>
        : list.map((tx,i) => <TxRow key={tx.id||i} tx={tx} onDelete={deleteTx} />)
      }
    </div>
  );
}

// ── CAT ROW ───────────────────────────────────────────────────
function CatRow({ cat, total }) {
  const pct = total > 0 ? Math.round((cat.total/total)*100) : 0;
  return (
    <div style={S.catRow}>
      <div style={S.catLeft}>
        <span style={S.catEmoji}>{cat.emoji}</span>
        <span style={S.catLabel}>{cat.label}</span>
        {cat.fromCuotas > 0 && <span style={S.cuotaTag}>🔁 {fmtMoney(cat.fromCuotas)} en cuotas</span>}
      </div>
      <div style={S.catRight}>
        <span style={S.catAmount}>{fmtMoney(cat.total)}</span>
        <span style={S.catPct}>{pct}%</span>
      </div>
      <div style={S.barBg}><div style={{...S.barFill, width:`${pct}%`, background:cat.color}} /></div>
    </div>
  );
}

// ── TX ROW ────────────────────────────────────────────────────
function TxRow({ tx, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  const cat = tx.type==="expense"
    ? EXPENSE_CATS.find(c=>c.id===tx.category)
    : INCOME_CATS.find(c=>c.id===tx.category);
  const label = tx.isCuota
    ? `${tx.detail||cat?.label} (${tx.cuotaNum}/${tx.totalCuotas})`
    : (tx.detail || cat?.label || tx.category);

  return (
    <div style={S.txRow}>
      <span style={S.txEmoji}>{tx.isCuota?"🔁":cat?.emoji||"💸"}</span>
      <div style={S.txInfo}>
        <span style={S.txLabel}>{label}</span>
        <span style={S.txMeta}>{fmtDate(tx.date)}{tx.medio?` · ${tx.medio}`:""}</span>
      </div>
      <div style={S.txAmountWrap}>
        <span style={{...S.txAmount, color:tx.type==="income"?"#4ade80":"#f87171"}}>
          {tx.type==="income"?"+":"−"}{fmtMoney(tx.amount)}
        </span>
        {!tx.isCuota && (
          !confirm
            ? <button style={S.delBtn} onClick={()=>setConfirm(true)}>🗑</button>
            : <button style={S.delBtnConfirm} onClick={()=>onDelete(tx.id)}>✓ Borrar</button>
        )}
      </div>
    </div>
  );
}

// ── CUOTAS PANEL ──────────────────────────────────────────────
function CuotasPanel({ cuotas, activeCuotas, onDelete }) {
  const [confirm, setConfirm] = useState(null);
  const totalMensual = activeCuotas.reduce((s,c) => s + Math.round(c.totalAmount/c.totalCuotas), 0);

  return (
    <div>
      {cuotas.length === 0 && <div style={S.empty}>No hay cuotas registradas</div>}

      {activeCuotas.length > 0 && (
        <div style={S.cuotasSummaryCard}>
          <div style={S.cuotasSummaryLabel}>Compromiso mensual en cuotas</div>
          <div style={S.cuotasSummaryAmount}>{fmtMoney(totalMensual)}/mes</div>
          <div style={S.cuotasSummaryLabel}>{activeCuotas.length} compras activas</div>
        </div>
      )}

      {cuotas.map(c => {
        const cat = getCat(c.category);
        const cuotaAmt = Math.round(c.totalAmount / c.totalCuotas);
        const lastMonth = addMonths(c.startMonth, c.totalCuotas-1);
        const isActive = lastMonth >= currentMonth();
        const paidCount = (() => {
          let n = 0;
          for (let i=0;i<c.totalCuotas;i++) if (addMonths(c.startMonth,i) < currentMonth()) n++;
          return n;
        })();

        return (
          <div key={c.id} style={{...S.cuotaCard, opacity: isActive?1:0.5}}>
            <div style={S.cuotaCardTop}>
              <span style={S.txEmoji}>{cat?.emoji||"🔁"}</span>
              <div style={S.txInfo}>
                <span style={S.txLabel}>{c.detail||cat?.label}</span>
                <span style={S.txMeta}>{cat?.label} · {c.medio}</span>
              </div>
              <div style={S.txAmountWrap}>
                <span style={{...S.txAmount,color:"#f87171"}}>{fmtMoney(cuotaAmt)}/mes</span>
                <span style={{fontSize:11,color:"#64748b"}}>{fmtMoney(c.totalAmount)} total</span>
              </div>
            </div>
            {/* Progress */}
            <div style={S.cuotaProgress}>
              <div style={S.cuotaProgressInfo}>
                <span style={{fontSize:12,color:"#94a3b8"}}>{paidCount}/{c.totalCuotas} cuotas</span>
                <span style={{fontSize:12,color:"#64748b"}}>hasta {fmtMonth(lastMonth)}</span>
              </div>
              <div style={S.barBg}>
                <div style={{...S.barFill, width:`${Math.round(paidCount/c.totalCuotas*100)}%`, background: cat?.color||"#6366f1"}} />
              </div>
            </div>
            {confirm===c.id
              ? <div style={S.cuotaDelRow}>
                  <span style={{fontSize:12,color:"#f87171"}}>¿Eliminás la compra completa?</span>
                  <button style={S.delBtnConfirm} onClick={()=>{onDelete(c.id);setConfirm(null);}}>Sí, borrar</button>
                  <button style={{...S.delBtn,fontSize:12}} onClick={()=>setConfirm(null)}>Cancelar</button>
                </div>
              : <button style={{...S.delBtn,alignSelf:"flex-end",marginTop:4}} onClick={()=>setConfirm(c.id)}>🗑 Eliminar</button>
            }
          </div>
        );
      })}
    </div>
  );
}

// ── ADD EXPENSE ───────────────────────────────────────────────
function AddExpenseView({ onSave, onBack }) {
  const [cat, setCat]           = useState(null);
  const [amount, setAmount]     = useState("");
  const [medio, setMedio]       = useState("Efectivo");
  const [detail, setDetail]     = useState("");
  const [dateMode, setDateMode] = useState("today");
  const [customDate, setCustomDate] = useState(todayStr());
  const [saved, setSaved]       = useState(false);

  const getDate = () => dateMode==="today"?todayStr():dateMode==="yesterday"?yesterdayStr():customDate;

  const handleSave = () => {
    if (!cat||!amount) return;
    onSave({ type:"expense", category:cat.id, amount:parseInt(amount), medio, detail, date:getDate() });
    setSaved(true);
    setTimeout(()=>{ setCat(null);setAmount("");setMedio("Efectivo");setDetail("");setSaved(false); }, 900);
  };

  return (
    <div style={S.screen}>
      <div style={S.formHeader}>
        <button style={S.backBtn} onClick={onBack}>← Volver</button>
        <span style={S.formTitle}>Nuevo Gasto</span>
      </div>
      {saved && <div style={S.savedBanner}>✓ Guardado</div>}
      <div style={S.formBody}>
        <FormDate dateMode={dateMode} setDateMode={setDateMode} customDate={customDate} setCustomDate={setCustomDate} />
        <div style={S.section}>
          <div style={S.sectionLabel}>¿En qué?</div>
          <div style={S.catGrid}>
            {EXPENSE_CATS.map(c=>(
              <button key={c.id} style={{...S.catBtn,...(cat?.id===c.id?{background:c.color+"33",borderColor:c.color,transform:"scale(1.05)"}:{})}} onClick={()=>setCat(c)}>
                <span style={S.catBtnEmoji}>{c.emoji}</span>
                <span style={S.catBtnLabel}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
        <AmountInput amount={amount} setAmount={setAmount} />
        <MedioInput medio={medio} setMedio={setMedio} />
        <DetailInput detail={detail} setDetail={setDetail} placeholder="ej: Carrefour, Farmacia..." />
        <button style={{...S.saveBtn,...(!cat||!amount?S.saveBtnDisabled:{})}} onClick={handleSave} disabled={!cat||!amount}>
          Guardar gasto
        </button>
      </div>
    </div>
  );
}

// ── ADD INCOME ────────────────────────────────────────────────
function AddIncomeView({ onSave, onBack }) {
  const [cat, setCat]     = useState(null);
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [dateMode, setDateMode] = useState("today");
  const [customDate, setCustomDate] = useState(todayStr());
  const [saved, setSaved] = useState(false);

  const getDate = () => dateMode==="today"?todayStr():dateMode==="yesterday"?yesterdayStr():customDate;

  const handleSave = () => {
    if (!cat||!amount) return;
    onSave({ type:"income", category:cat.id, amount:parseInt(amount), detail, date:getDate() });
    setSaved(true);
    setTimeout(()=>{ setCat(null);setAmount("");setDetail("");setSaved(false); }, 900);
  };

  return (
    <div style={S.screen}>
      <div style={{...S.formHeader,background:"#052e16"}}>
        <button style={S.backBtn} onClick={onBack}>← Volver</button>
        <span style={S.formTitle}>Nuevo Ingreso</span>
      </div>
      {saved && <div style={{...S.savedBanner,background:"#166534"}}>✓ Guardado</div>}
      <div style={S.formBody}>
        <FormDate dateMode={dateMode} setDateMode={setDateMode} customDate={customDate} setCustomDate={setCustomDate} />
        <div style={S.section}>
          <div style={S.sectionLabel}>¿Qué ingreso?</div>
          <div style={S.catGrid}>
            {INCOME_CATS.map(c=>(
              <button key={c.id} style={{...S.incomeCatBtn,...(cat?.id===c.id?S.incomeCatBtnActive:{})}} onClick={()=>setCat(c)}>
                <span style={S.catBtnEmoji}>{c.emoji}</span>
                <span style={S.catBtnLabel}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
        <AmountInput amount={amount} setAmount={setAmount} />
        <DetailInput detail={detail} setDetail={setDetail} placeholder="ej: Sueldo abril..." />
        <button style={{...S.saveBtn,background:"#16a34a",...(!cat||!amount?S.saveBtnDisabled:{})}} onClick={handleSave} disabled={!cat||!amount}>
          Guardar ingreso
        </button>
      </div>
    </div>
  );
}

// ── ADD CUOTA ─────────────────────────────────────────────────
function AddCuotaView({ onSave, onBack }) {
  const [cat, setCat]             = useState(null);
  const [total, setTotal]         = useState("");
  const [numCuotas, setNumCuotas] = useState(3);
  const [medio, setMedio]         = useState("Visa");
  const [detail, setDetail]       = useState("");
  const [startMonth, setStartMonth] = useState(currentMonth());
  const [saved, setSaved]         = useState(false);

  const cuotaAmt = total && numCuotas ? Math.round(parseInt(total)/numCuotas) : 0;

  const handleSave = () => {
    if (!cat||!total) return;
    onSave({ category:cat.id, totalAmount:parseInt(total), totalCuotas:numCuotas, medio, detail, startMonth });
    setSaved(true);
    setTimeout(()=>{ setCat(null);setTotal("");setNumCuotas(3);setMedio("Visa");setDetail("");setSaved(false); }, 900);
  };

  const CUOTA_OPTS = [2,3,4,5,6,9,12,18,24];

  return (
    <div style={S.screen}>
      <div style={{...S.formHeader,background:"#1e1b4b"}}>
        <button style={S.backBtn} onClick={onBack}>← Volver</button>
        <span style={S.formTitle}>Nueva Compra en Cuotas</span>
      </div>
      {saved && <div style={{...S.savedBanner,background:"#3730a3"}}>✓ Guardado</div>}
      <div style={S.formBody}>

        {/* Categoría */}
        <div style={S.section}>
          <div style={S.sectionLabel}>¿En qué?</div>
          <div style={S.catGrid}>
            {EXPENSE_CATS.map(c=>(
              <button key={c.id} style={{...S.catBtn,...(cat?.id===c.id?{background:c.color+"33",borderColor:c.color,transform:"scale(1.05)"}:{})}} onClick={()=>setCat(c)}>
                <span style={S.catBtnEmoji}>{c.emoji}</span>
                <span style={S.catBtnLabel}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Monto total */}
        <div style={S.section}>
          <div style={S.sectionLabel}>Monto total de la compra</div>
          <div style={S.amountWrap}>
            <span style={S.amountPrefix}>$</span>
            <input type="number" inputMode="numeric" placeholder="0" value={total} onChange={e=>setTotal(e.target.value)} style={S.amountInput} />
          </div>
        </div>

        {/* Cuotas */}
        <div style={S.section}>
          <div style={S.sectionLabel}>Cantidad de cuotas</div>
          <div style={S.cuotasGrid}>
            {CUOTA_OPTS.map(n=>(
              <button key={n} style={{...S.cuotaNumBtn,...(numCuotas===n?S.cuotaNumBtnActive:{})}} onClick={()=>setNumCuotas(n)}>
                {n}x
              </button>
            ))}
          </div>
          {cuotaAmt > 0 && (
            <div style={S.cuotaPreview}>
              <span style={{color:"#a5b4fc",fontWeight:700}}>{fmtMoney(cuotaAmt)}/mes</span>
              <span style={{color:"#64748b",fontSize:12}}> durante {numCuotas} meses</span>
            </div>
          )}
        </div>

        {/* Mes de inicio */}
        <div style={S.section}>
          <div style={S.sectionLabel}>Primera cuota en</div>
          <input
            type="month"
            value={startMonth}
            onChange={e=>setStartMonth(e.target.value)}
            style={S.dateInput}
          />
        </div>

        <MedioInput medio={medio} setMedio={setMedio} />
        <DetailInput detail={detail} setDetail={setDetail} placeholder="ej: Zapatillas Mateo, TV Samsung..." />

        <button style={{...S.saveBtn,background:"#4f46e5",...(!cat||!total?S.saveBtnDisabled:{})}} onClick={handleSave} disabled={!cat||!total}>
          Registrar cuotas
        </button>
      </div>
    </div>
  );
}

// ── SHARED FORM COMPONENTS ────────────────────────────────────
function FormDate({ dateMode, setDateMode, customDate, setCustomDate }) {
  return (
    <div style={S.section}>
      <div style={S.sectionLabel}>¿Cuándo?</div>
      <div style={S.dateRow}>
        {["today","yesterday","custom"].map(m=>(
          <button key={m} style={{...S.dateBtn,...(dateMode===m?S.dateBtnActive:{})}} onClick={()=>setDateMode(m)}>
            {m==="today"?"Hoy":m==="yesterday"?"Ayer":"Otra fecha"}
          </button>
        ))}
      </div>
      {dateMode==="custom" && <input type="date" value={customDate} onChange={e=>setCustomDate(e.target.value)} style={{...S.dateInput,marginTop:10}} />}
    </div>
  );
}

function AmountInput({ amount, setAmount }) {
  return (
    <div style={S.section}>
      <div style={S.sectionLabel}>¿Cuánto?</div>
      <div style={S.amountWrap}>
        <span style={S.amountPrefix}>$</span>
        <input type="number" inputMode="numeric" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} style={S.amountInput} />
      </div>
    </div>
  );
}

function MedioInput({ medio, setMedio }) {
  return (
    <div style={S.section}>
      <div style={S.sectionLabel}>¿Con qué?</div>
      <div style={S.medioRow}>
        {MEDIOS.map(m=>(
          <button key={m} style={{...S.medioBtn,...(medio===m?S.medioBtnActive:{})}} onClick={()=>setMedio(m)}>{m}</button>
        ))}
      </div>
    </div>
  );
}

function DetailInput({ detail, setDetail, placeholder }) {
  return (
    <div style={S.section}>
      <div style={S.sectionLabel}>Detalle <span style={S.optional}>(opcional)</span></div>
      <input type="text" placeholder={placeholder} value={detail} onChange={e=>setDetail(e.target.value)} style={S.detailInput} />
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────
const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
  button { -webkit-tap-highlight-color: transparent; }
`;

const S = {
  app:           { fontFamily:"'DM Sans',sans-serif", background:"#0f0f0f", minHeight:"100vh", maxWidth:430, margin:"0 auto", color:"#f1f5f9" },
  screen:        { minHeight:"100vh", display:"flex", flexDirection:"column", background:"#0f0f0f" },
  header:        { background:"linear-gradient(160deg,#1a1a2e 0%,#16213e 100%)", padding:"20px 16px 16px", borderBottom:"1px solid #1e293b" },
  headerTop:     { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 },
  appTitle:      { fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:"#f1f5f9", letterSpacing:"-0.5px" },
  monthPicker:   { background:"#1e293b", color:"#94a3b8", border:"1px solid #334155", borderRadius:8, padding:"6px 10px", fontSize:13, fontFamily:"'DM Sans',sans-serif", cursor:"pointer" },
  balanceCard:   { background:"rgba(255,255,255,0.04)", borderRadius:16, padding:"16px 20px", border:"1px solid rgba(255,255,255,0.08)" },
  balanceLabel:  { fontSize:12, color:"#64748b", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.5px" },
  balanceAmount: { fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, letterSpacing:"-1px", marginBottom:10 },
  balanceRow:    { display:"flex", gap:8, flexWrap:"wrap" },
  incomeChip:    { background:"rgba(74,222,128,0.12)",  color:"#4ade80", borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:600 },
  expenseChip:   { background:"rgba(248,113,113,0.12)", color:"#f87171", borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:600 },
  cuotaChip:     { background:"rgba(129,140,248,0.15)", color:"#a5b4fc", borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:600 },
  fabRow:        { display:"flex", gap:10, padding:"12px 16px", background:"#0f0f0f" },
  fab:           { flex:1, padding:"13px 6px", borderRadius:14, border:"none", fontSize:13, fontWeight:700, fontFamily:"'Syne',sans-serif", cursor:"pointer", letterSpacing:"-0.3px" },
  tabs:          { display:"flex", background:"#0f0f0f", padding:"0 16px", borderBottom:"1px solid #1e293b" },
  tab:           { flex:1, padding:"12px 4px", background:"transparent", border:"none", color:"#64748b", fontSize:13, fontWeight:600, cursor:"pointer", borderBottom:"2px solid transparent" },
  tabActive:     { color:"#f1f5f9", borderBottom:"2px solid #6366f1" },
  content:       { flex:1, overflowY:"auto", padding:"8px 16px 80px" },
  empty:         { color:"#475569", textAlign:"center", padding:"40px 0", fontSize:14 },
  catRow:        { padding:"12px 0", borderBottom:"1px solid #1e293b" },
  catLeft:       { display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" },
  catRight:      { display:"flex", justifyContent:"space-between", marginBottom:6 },
  catEmoji:      { fontSize:18 },
  catLabel:      { fontSize:14, color:"#cbd5e1", fontWeight:500 },
  catAmount:     { fontSize:15, fontWeight:700, color:"#f1f5f9" },
  catPct:        { fontSize:13, color:"#64748b" },
  cuotaTag:      { fontSize:11, color:"#a5b4fc", background:"rgba(129,140,248,0.12)", borderRadius:10, padding:"2px 8px" },
  barBg:         { height:4, background:"#1e293b", borderRadius:4, overflow:"hidden" },
  barFill:       { height:"100%", borderRadius:4, transition:"width 0.6s ease" },
  txRow:         { display:"flex", alignItems:"center", gap:10, padding:"12px 0", borderBottom:"1px solid #1a1a2e" },
  txEmoji:       { fontSize:22, width:32, textAlign:"center" },
  txInfo:        { flex:1, minWidth:0 },
  txLabel:       { display:"block", fontSize:14, fontWeight:500, color:"#e2e8f0", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" },
  txMeta:        { display:"block", fontSize:12, color:"#475569", marginTop:2 },
  txAmountWrap:  { display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 },
  txAmount:      { fontSize:14, fontWeight:700 },
  delBtn:        { background:"transparent", border:"none", fontSize:13, cursor:"pointer", color:"#475569", padding:"2px 4px" },
  delBtnConfirm: { background:"#7f1d1d", border:"none", color:"#fca5a5", fontSize:11, fontWeight:600, borderRadius:6, padding:"3px 7px", cursor:"pointer" },
  cuotaCard:     { background:"#13131f", border:"1px solid #1e293b", borderRadius:14, padding:"14px", marginBottom:10, display:"flex", flexDirection:"column", gap:8 },
  cuotaCardTop:  { display:"flex", alignItems:"center", gap:10 },
  cuotaProgress: { paddingTop:4 },
  cuotaProgressInfo: { display:"flex", justifyContent:"space-between", marginBottom:6 },
  cuotaDelRow:   { display:"flex", alignItems:"center", gap:8, marginTop:4 },
  lisandroSection: { marginTop:24, background:"#0f172a", border:"1px solid #1e3a5f", borderRadius:16, padding:"16px", borderTop:"2px solid #1e40af" },
  lisandroTitle:   { fontSize:13, fontWeight:700, color:"#60a5fa", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:14 },
  lisandroRow:     { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 },
  lisandroInputRow:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 },
  lisandroLabel:   { fontSize:14, color:"#94a3b8" },
  lisandroValue:   { fontSize:15, fontWeight:600, color:"#e2e8f0" },
  lisandroInputWrap: { display:"flex", alignItems:"center", gap:4, background:"#1e293b", borderRadius:8, padding:"6px 10px", border:"1px solid #334155" },
  lisandroInput:   { background:"transparent", border:"none", color:"#f1f5f9", fontSize:15, fontWeight:600, width:110, outline:"none", textAlign:"right", fontFamily:"'DM Sans',sans-serif" },
  lisandroDivider: { height:1, background:"#1e3a5f", margin:"10px 0" },
  cuotasSummaryCard: { background:"linear-gradient(135deg,#1e1b4b,#312e81)", borderRadius:14, padding:"16px", marginBottom:16, textAlign:"center" },
  cuotasSummaryLabel:  { fontSize:12, color:"#a5b4fc", marginBottom:4 },
  cuotasSummaryAmount: { fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:"#e0e7ff", marginBottom:4 },
  subTabs:       { display:"flex", gap:8, marginBottom:12, marginTop:4 },
  subTab:        { flex:1, padding:"10px 8px", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#64748b", fontSize:13, fontWeight:600, cursor:"pointer", textAlign:"center" },
  subTabExpense: { background:"rgba(248,113,113,0.12)", borderColor:"#f87171", color:"#f87171" },
  subTabIncome:  { background:"rgba(74,222,128,0.12)",  borderColor:"#4ade80", color:"#4ade80" },
  medioSectionTitle: { fontSize:13, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.5px", marginTop:24, marginBottom:4, paddingTop:16, borderTop:"1px solid #1e293b" },
  medioSectionNote: { fontSize:11, color:"#475569", marginBottom:12 },
  medioTable:    { display:"flex", flexDirection:"column", gap:0 },
  medioTableRow: { padding:"12px 0", borderBottom:"1px solid #1e293b" },
  medioTableLeft:  { display:"flex", alignItems:"center", gap:8, marginBottom:4 },
  medioTableRight: { display:"flex", justifyContent:"space-between", marginBottom:6 },
  medioDot:      { width:10, height:10, borderRadius:"50%", flexShrink:0 },
  medioTableName:   { fontSize:14, color:"#cbd5e1", fontWeight:500 },
  medioTableAmount: { fontSize:15, fontWeight:700, color:"#f1f5f9" },
  medioTablePct:    { fontSize:13, color:"#64748b" },
  formHeader:    { background:"#1a0a1e", padding:"16px", display:"flex", alignItems:"center", gap:12, borderBottom:"1px solid #2d1b3d" },
  backBtn:       { background:"transparent", border:"none", color:"#94a3b8", fontSize:14, cursor:"pointer", padding:"4px 0" },
  formTitle:     { fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:"#f1f5f9" },
  formBody:      { flex:1, overflowY:"auto", padding:"16px 16px 80px" },
  section:       { marginBottom:24 },
  sectionLabel:  { fontSize:13, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:10 },
  optional:      { fontWeight:400, textTransform:"none", color:"#475569", fontSize:12 },
  dateRow:       { display:"flex", gap:8 },
  dateBtn:       { flex:1, padding:"10px 6px", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#94a3b8", fontSize:13, fontWeight:600, cursor:"pointer" },
  dateBtnActive: { background:"#312e81", borderColor:"#6366f1", color:"#a5b4fc" },
  dateInput:     { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#f1f5f9", padding:"10px 12px", fontSize:14, fontFamily:"'DM Sans',sans-serif" },
  catGrid:       { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 },
  catBtn:        { padding:"10px 4px", background:"#1a1a2e", border:"1.5px solid #1e293b", borderRadius:12, display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer", transition:"all 0.15s" },
  catBtnEmoji:   { fontSize:22 },
  catBtnLabel:   { fontSize:10, color:"#94a3b8", fontWeight:600, textAlign:"center", lineHeight:1.2 },
  incomeCatBtn:      { padding:"10px 4px", background:"#0f2918", border:"1.5px solid #14532d", borderRadius:12, display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer" },
  incomeCatBtnActive:{ background:"#14532d", borderColor:"#16a34a", transform:"scale(1.05)" },
  amountWrap:    { display:"flex", alignItems:"center", background:"#1e293b", borderRadius:14, border:"1px solid #334155", padding:"4px 16px" },
  amountPrefix:  { fontSize:28, color:"#475569", fontWeight:700, marginRight:8 },
  amountInput:   { flex:1, background:"transparent", border:"none", color:"#f1f5f9", fontSize:32, fontFamily:"'Syne',sans-serif", fontWeight:800, outline:"none", width:"100%" },
  medioRow:      { display:"flex", flexWrap:"wrap", gap:8 },
  medioBtn:      { padding:"8px 14px", background:"#1e293b", border:"1px solid #334155", borderRadius:20, color:"#94a3b8", fontSize:13, fontWeight:600, cursor:"pointer" },
  medioBtnActive:{ background:"#312e81", borderColor:"#6366f1", color:"#a5b4fc" },
  detailInput:   { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#f1f5f9", padding:"12px 14px", fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none" },
  saveBtn:       { width:"100%", padding:"16px", background:"#dc2626", border:"none", borderRadius:14, color:"#fff", fontSize:16, fontWeight:700, fontFamily:"'Syne',sans-serif", cursor:"pointer", marginTop:8, letterSpacing:"-0.3px" },
  saveBtnDisabled: { opacity:0.35, cursor:"not-allowed" },
  savedBanner:   { background:"#14532d", color:"#4ade80", textAlign:"center", padding:"10px", fontSize:14, fontWeight:700 },
  cuotasGrid:    { display:"flex", flexWrap:"wrap", gap:8 },
  cuotaNumBtn:   { padding:"10px 16px", background:"#1e293b", border:"1px solid #334155", borderRadius:10, color:"#94a3b8", fontSize:14, fontWeight:700, cursor:"pointer" },
  cuotaNumBtnActive: { background:"#312e81", borderColor:"#6366f1", color:"#a5b4fc" },
  cuotaPreview:  { marginTop:12, background:"rgba(99,102,241,0.1)", border:"1px solid #312e81", borderRadius:10, padding:"10px 14px", textAlign:"center" },
};
