const resp = [
  {
    "id": 100,
    "children": [{
      "id": 110,
      "children": [],
      "positions": [{
        "id": 1100,
        "title": "Директор",
        "employee": {
          "inn": "1234668890",
          "firstName": "Ім`я1",
          "middleName": "По-батькові1",
          "lastName": "Прізвище1",
          "education": "Вища",
          "experience": "5",
          "driversLicence": "BC"
        }
      }, {"id": 1101, "title": "Заступник директора", "employee": null}, {
        "id": 1102,
        "title": "Водій",
        "employee": null
      }, {"id": 1103, "title": "Секретар", "employee": null}],
      "title": "Дирекція"
    }, {
      "id": 120,
      "children": [],
      "positions": [{"id": 1200, "title": "Старший економіст", "employee": null}, {
        "id": 1201,
        "title": "Економіст",
        "employee": null
      }, {"id": 1202, "title": "Економіст", "employee": null}, {
        "id": 1203,
        "title": "Економіст",
        "employee": null
      }, {"id": 1204, "title": "Помічник економіста", "employee": null}],
      "title": "Економічний відділ"
    }, {
      "id": 130,
      "children": [],
      "positions": [{"id": 1300, "title": "Старший маркетолог", "employee": null}, {
        "id": 1301,
        "title": "Маркетолог",
        "employee": null
      }],
      "title": "Маркетинговий відділ"
    }, {
      "id": 140,
      "children": [],
      "positions": [{"id": 1400, "title": "Начальник виробничого відділу", "employee": null}, {
        "id": 1401,
        "title": "Заступник начальника виробничого відділу",
        "employee": null
      }, {"id": 1402, "title": "Інженер з експлуатації обладнання", "employee": null}, {
        "id": 1403,
        "title": "Інженер з експлуатації будівель та споруд",
        "employee": null
      }, {"id": 1404, "title": "Архіваріус", "employee": null}],
      "title": "Виробничий відділ"
    }, {
      "id": 150,
      "children": [],
      "positions": [{"id": 1500, "title": "Начальник ремонтного відділу", "employee": null}, {
        "id": 1501,
        "title": "Заступник начальника ремонтного відділу",
        "employee": null
      }, {"id": 1502, "title": "Майстер-механік", "employee": null}, {
        "id": 1503,
        "title": "Майстер-електрик",
        "employee": null
      }, {"id": 1504, "title": "Майстер-електроник", "employee": null}, {
        "id": 1505,
        "title": "Слюсар",
        "employee": null
      }, {"id": 1506, "title": "Слюсар", "employee": null}, {"id": 1507, "title": "Слюсар", "employee": null}],
      "title": "Ремонтний відділ"
    }, {
      "id": 160,
      "children": [],
      "positions": [{"id": 1600, "title": "Старший лікар", "employee": null}, {
        "id": 1601,
        "title": "Фельдшер",
        "employee": null
      }],
      "title": "Медичний відділ"
    }, {
      "id": 170,
      "children": [],
      "positions": [{"id": 1700, "title": "Начальник логістичного відділу", "employee": null}, {
        "id": 1701,
        "title": "Заступник начальника логістичного відділу",
        "employee": null
      }, {"id": 1702, "title": "Старший логіст", "employee": null}, {
        "id": 1703,
        "title": "Логіст",
        "employee": null
      }, {"id": 1704, "title": "Логіст", "employee": null}, {
        "id": 1705,
        "title": "Водій вантажного автомобіля",
        "employee": null
      }, {"id": 1706, "title": "Водій вантажного автомобіля", "employee": null}, {
        "id": 1707,
        "title": "Водій вантажного автомобіля",
        "employee": null
      }, {"id": 1708, "title": "Водій вантажного автомобіля", "employee": null}, {
        "id": 1709,
        "title": "Водій чергової зміни",
        "employee": null
      }, {"id": 1710, "title": "Водій чергової зміни", "employee": null}, {
        "id": 1711,
        "title": "Водій чергової зміни",
        "employee": null
      }],
      "title": "Відділ логистики"
    }],
    "positions": [],
    "title": "Управління"
  },
  {
    "id": 200, "children": [{
      "id": 210,
      "children": [{
        "id": 211,
        "children": [],
        "positions": [{
          "id": 2110,
          "title": "Начальник цеху",
          "employee": {
            "inn": "1234668891",
            "firstName": "Ім`я2",
            "middleName": "По-батькові2",
            "lastName": "Прізвище2",
            "education": "Вища",
            "experience": "5",
            "driversLicence": "BC"
          }
        }, {"id": 2111, "title": "Заступник начальника цеха", "employee": null}],
        "title": "Управління цеху"
      }, {
        "id": 212,
        "children": [],
        "positions": [{"id": 2120, "title": "Начальник конвейера", "employee": null}, {
          "id": 2121,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2122, "title": "Робочий конвейера", "employee": null}, {
          "id": 2123,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2124, "title": "Робочий конвейера", "employee": null}, {
          "id": 2125,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2126, "title": "Різноробочий", "employee": null}],
        "title": "1ий конвейер"
      }, {
        "id": 213,
        "children": [],
        "positions": [{"id": 2130, "title": "Начальник конвейера", "employee": null}, {
          "id": 2131,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2132, "title": "Робочий конвейера", "employee": null}, {
          "id": 2133,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2134, "title": "Робочий конвейера", "employee": null}, {
          "id": 2135,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2136, "title": "Різноробочий", "employee": null}],
        "title": "2ий конвейер"
      }, {
        "id": 214,
        "children": [],
        "positions": [{"id": 2140, "title": "Начальник конвейера", "employee": null}, {
          "id": 2141,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2142, "title": "Робочий конвейера", "employee": null}, {
          "id": 2143,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2144, "title": "Робочий конвейера", "employee": null}, {
          "id": 2145,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2146, "title": "Різноробочий", "employee": null}],
        "title": "3ий конвейер"
      }],
      "positions": [],
      "title": "Перший цех"
    }, {
      "id": 220,
      "children": [{
        "id": 221,
        "children": [],
        "positions": [{
          "id": 2210,
          "title": "Начальник цеху",
          "employee": {
            "inn": "1234668892",
            "firstName": "Ім`я3",
            "middleName": "По-батькові3",
            "lastName": "Прізвище3",
            "education": "Вища",
            "experience": "1",
            "driversLicence": "B"
          }
        }, {"id": 2211, "title": "Заступник начальника цеха", "employee": null}],
        "title": "Управління цеху"
      }, {
        "id": 222,
        "children": [],
        "positions": [{
          "id": 2220,
          "title": "Начальник конвейера",
          "employee": {
            "inn": "1234668893",
            "firstName": "Ім`я4",
            "middleName": "По-батькові4",
            "lastName": "Прізвище4",
            "education": "Вища",
            "experience": "1",
            "driversLicence": "B"
          }
        }, {
          "id": 2221,
          "title": "Робочий конвейера",
          "employee": {
            "inn": "1234668894",
            "firstName": "Ім`я5",
            "middleName": "По-батькові5",
            "lastName": "Прізвище5",
            "education": "Середня",
            "experience": "1",
            "driversLicence": "B"
          }
        }, {"id": 2222, "title": "Робочий конвейера", "employee": null}, {
          "id": 2223,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2224, "title": "Робочий конвейера", "employee": null}, {
          "id": 2225,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2226, "title": "Різноробочий", "employee": null}],
        "title": "1ий конвейер"
      }, {
        "id": 223,
        "children": [],
        "positions": [{"id": 2230, "title": "Начальник конвейера", "employee": null}, {
          "id": 2231,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2232, "title": "Робочий конвейера", "employee": null}, {
          "id": 2233,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2234, "title": "Робочий конвейера", "employee": null}, {
          "id": 2235,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2236, "title": "Різноробочий", "employee": null}],
        "title": "2ий конвейер"
      }, {
        "id": 224,
        "children": [],
        "positions": [{"id": 2240, "title": "Начальник конвейера", "employee": null}, {
          "id": 2241,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2242, "title": "Робочий конвейера", "employee": null}, {
          "id": 2243,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2244, "title": "Робочий конвейера", "employee": null}, {
          "id": 2245,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2246, "title": "Різноробочий", "employee": null}],
        "title": "3ий конвейер"
      }],
      "positions": [],
      "title": "Другий цех"
    }, {
      "id": 230,
      "children": [{
        "id": 231,
        "children": [],
        "positions": [{"id": 2310, "title": "Начальник конвейера", "employee": null}, {
          "id": 2311,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2312, "title": "Робочий конвейера", "employee": null}, {
          "id": 2313,
          "title": "Робочий конвейера",
          "employee": null
        }],
        "title": "1ий конвейер"
      }, {
        "id": 232,
        "children": [],
        "positions": [{"id": 2320, "title": "Начальник конвейера", "employee": null}, {
          "id": 2321,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2322, "title": "Робочий конвейера", "employee": null}, {
          "id": 2323,
          "title": "Робочий конвейера",
          "employee": null
        }, {"id": 2324, "title": "Різноробочий", "employee": null}],
        "title": "2ий конвейер"
      }],
      "positions": [{"id": 2314, "title": "Різноробочий", "employee": null}],
      "title": "Цех упаковки"
    }, {
      "id": 240,
      "children": [],
      "positions": [{"id": 2400, "title": "Начальник складу", "employee": null}, {
        "id": 2401,
        "title": "Кладовщик",
        "employee": null
      }, {"id": 2402, "title": "Кладовщик", "employee": null}, {
        "id": 2403,
        "title": "Охоронець",
        "employee": null
      }, {"id": 2404, "title": "Охоронець", "employee": null}, {
        "id": 2405,
        "title": "Охоронець",
        "employee": null
      }, {"id": 2406, "title": "Охоронець", "employee": null}],
      "title": "Склад"
    }], "positions": [], "title": "Виробництво"
  }]
