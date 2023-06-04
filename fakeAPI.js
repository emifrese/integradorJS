const products = [
    {
        id: 1,
        title: "Moto G5 Plus 32 Gb Oro Fino 2 Gb Ram",
        thumbnail: "http://http2.mlstatic.com/D_612199-MLA40645964413_022020-I.jpg",
        price: 65250,
        original_price: 80000,
        seller: {
            id: "aa1",
            nickname: "vendedorML1"
        }
    },
    {
        id: 2,
        title: "Celular Libre Motorola Moto G6 Play Xt1922 32gb Premium",
        thumbnail: "http://http2.mlstatic.com/D_676008-MLA41874659875_052020-O.jpg",
        price: 79999,
        original_price: null,
        seller: {
            id: "aa2",
            nickname: "vendedorML2"
        }
    },
    {
        id: 3,
        title: "Motorola Moto G6 Plus 64gb 4gb 12+8mpx 5.9´´ - Misa Movil -",
        thumbnail: "http://http2.mlstatic.com/D_698200-MLA29943336458_042019-O.jpg",
        price: 12899,
        original_price: null,
        seller: {
            id: "aa3",
            nickname: "vendedorML3"
        }
    },
    {
        id: 4,
        title: "Celular Motorola Moto G6 Play 32gb Azul Refabricado Liberado",
        thumbnail: "http://http2.mlstatic.com/D_868915-MLA45332026037_032021-O.jpg",
        price: 49999,
        original_price: null,
        seller: {
            id: "aa3",
            nickname: "vendedorML3"
        }
    },
    {
        id: 5,
        title: "Moto G6 Play 32 Gb Plata 3 Gb Ram Excelente",
        thumbnail: "http://http2.mlstatic.com/D_908996-MLA53441978993_012023-O.jpg",
        price: 42999,
        original_price: null,
        seller: {
            id: "aa4",
            nickname: "vendedorML4"
        }
    },
    {
        id: 6,
        title: "Celular Motorola Moto G6 Play 32gb 3gb Ram 13mpx Refabricado",
        thumbnail: "http://http2.mlstatic.com/D_975379-MLA47006784122_082021-O.jpg",
        price: 79999,
        original_price: null,
        seller: {
            id: "aa5",
            nickname: "vendedorML5"
        }
    },
    {
        id: 7,
        title: "Celular Motorola Moto G6 Play Xt1922 32gb Refabricado",
        thumbnail: "http://http2.mlstatic.com/D_808561-MLA47006672554_082021-O.jpg",
        price: 79999,
        original_price: null,
        seller: {
            id: "aa6",
            nickname: "vendedorML6"
        }
    },
    {
        id: 8,
        title: "Celular Motorola Moto G6 Play 32gb Refabricado Azul/dorado",
        thumbnail: "http://http2.mlstatic.com/D_925955-MLA45332134261_032021-O.jpg",
        price: 49999,
        original_price: null,
        seller: {
            id: "aa6",
            nickname: "vendedorML6"
        }
    },
    {
        id: 9,
        title: "Celular Motorola Moto G6 Play Xt1922 Refabricado Liberado",
        thumbnail: "http://http2.mlstatic.com/D_923971-MLA29039411792_122018-O.jpg",
        price: 49999,
        original_price: null,
        seller: {
            id: "aa6",
            nickname: "vendedorML6"
        }
    },
    {
        id: 10,
        title: "Celular Libre Motorola Moto G6 Play Reacondicionado Xt1922",
        thumbnail: "http://http2.mlstatic.com/D_722583-MLA29424044304_022019-O.jpg",
        price: 49999,
        original_price: null,
        seller: {
            id: "aa7",
            nickname: "vendedorML7"
        }
    },
    {
        id: 11,
        title: "Motorola Moto G6 Play 32gb Celular Liberado Refa Azul/dorado",
        thumbnail: "http://http2.mlstatic.com/D_866771-MLA45332169162_032021-O.jpg",
        price: 49999,
        original_price: null,
        seller: {
            id: "aa7",
            nickname: "vendedorML7"
        }
    },
    {
        id: 12,
        title: "Celular Motorola Moto G6 Play Xt1922 32gb Refabricado Azul",
        thumbnail: "http://http2.mlstatic.com/D_704285-MLA45331842260_032021-O.jpg",
        price: 49999,
        original_price: null,
        seller: {
            id: "aa8",
            nickname: "vendedorML8"
        }
    }
]

const categories = [
    {
      "id": "MLA5725",
      "name": "Accesorios para Vehículos"
    },
    {
      "id": "MLA1512",
      "name": "Agro"
    },
    {
      "id": "MLA1403",
      "name": "Alimentos y Bebidas"
    },
    {
      "id": "MLA1071",
      "name": "Animales y Mascotas"
    },
    {
      "id": "MLA1367",
      "name": "Antigüedades y Colecciones"
    },
    {
      "id": "MLA1368",
      "name": "Arte, Librería y Mercería"
    },
    {
      "id": "MLA1743",
      "name": "Autos, Motos y Otros"
    },
    {
      "id": "MLA1384",
      "name": "Bebés"
    },
    {
      "id": "MLA1246",
      "name": "Belleza y Cuidado Personal"
    },
    {
      "id": "MLA1039",
      "name": "Cámaras y Accesorios"
    },
    {
      "id": "MLA1051",
      "name": "Celulares y Teléfonos"
    },
    {
      "id": "MLA1648",
      "name": "Computación"
    },
    {
      "id": "MLA1144",
      "name": "Consolas y Videojuegos"
    },
    {
      "id": "MLA1500",
      "name": "Construcción"
    },
    {
      "id": "MLA1276",
      "name": "Deportes y Fitness"
    },
    {
      "id": "MLA5726",
      "name": "Electrodomésticos y Aires Ac."
    },
    {
      "id": "MLA1000",
      "name": "Electrónica, Audio y Video"
    },
    {
      "id": "MLA2547",
      "name": "Entradas para Eventos"
    },
    {
      "id": "MLA407134",
      "name": "Herramientas"
    },
    {
      "id": "MLA1574",
      "name": "Hogar, Muebles y Jardín"
    },
    {
      "id": "MLA1499",
      "name": "Industrias y Oficinas"
    },
    {
      "id": "MLA1459",
      "name": "Inmuebles"
    },
    {
      "id": "MLA1182",
      "name": "Instrumentos Musicales"
    },
    {
      "id": "MLA3937",
      "name": "Joyas y Relojes"
    },
    {
      "id": "MLA1132",
      "name": "Juegos y Juguetes"
    },
    {
      "id": "MLA3025",
      "name": "Libros, Revistas y Comics"
    },
    {
      "id": "MLA1168",
      "name": "Música, Películas y Series"
    },
    {
      "id": "MLA1430",
      "name": "Ropa y Accesorios"
    },
    {
      "id": "MLA409431",
      "name": "Salud y Equipamiento Médico"
    },
    {
      "id": "MLA1540",
      "name": "Servicios"
    },
    {
      "id": "MLA9304",
      "name": "Souvenirs, Cotillón y Fiestas"
    },
    {
      "id": "MLA1953",
      "name": "Otras categorías"
    }
  ]