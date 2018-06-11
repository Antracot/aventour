var rezOnForm = function (form, o) {
    rezOnForm.prototype._form = undefined;
    rezOnForm.prototype._aviaForm = undefined;
    rezOnForm.prototype._railwayForm = undefined;

    rezOnForm.prototype._locale = {};
    rezOnForm.prototype._o = {
        statesInCountries: ['US', 'CA', 'BR', 'AU', 'AR'],
        animationDelay: 300,
        dates: {
            plusDaysShift: -1,
            today: null,
            airMinDate: null,
            airMaxDate: null,
            trainsMinDate: null,
            trainsMaxDate: null
        },
        
        projectUrl: "https://demo.galileo.com.ua/",
        defaultLang: "ru",
        formType: "all", //avia|railway|all
        formTarget: "_blank",
        defaultFormTab: undefined,
        avia: {
            recAirportsFrom: [ "TLV" ],
            recAirportsTo: [],
            defaultRouteType: null,   // [oneway/roundtrip/multy]
            defaultAirportFrom: null, // IATA code, ex. IEV
            defaultAirportTo: null,   // IATA code, ex. IEV
            defaultDateThere: null,   // dd.MM.yyyy
            defaultDateBack: null,    // dd.MM.yyyy
            plusDaysShift: null       // -1 - 10
        },
        railway: {
            recStationsFrom: [],
            recStationsTo: []
        }

    }
    rezOnForm.prototype._initialized = false;

    //-----------------------------------------
    // Конструктор
    //-----------------------------------------
    rezOnForm.prototype.constructor = function (form, o) {
        this._form = form;
        this._aviaForm = this._form.find("#avia-form-shoot");
        this._railwayForm = this._form.find("#railway-form-shoot");

        for (var optionKey in (o || {})) {
            if (this._o.hasOwnProperty(optionKey)) {
                this._o[optionKey] = o[optionKey];
            }
        }
        if (this._o.avia) for (var optionKey in this._o.avia) {
            if (this._aviaForm.attr("data-" + optionKey)) this._o.avia[optionKey] = this._aviaForm.attr("data-" + optionKey);
        }
        if (this._o.railway) for (var optionKey in this._o.railway) {
            if (this._railwayForm.attr("data-" + optionKey)) this._o.railway[optionKey] = this._railwayForm.attr("data-" + optionKey);
        }
        this._locale = {
            ru: {
                "ONE_WAY": "В одну сторону",
                "ROUND_TRIP": "Туда и обратно",
                "MULTY_ROUTE": "Сложный маршрут",
                "JANUARY": "Январь",
                "FEBRUARY": "Февраль",
                "MARCH": "Март",
                "APRIL": "Апрель",
                "MAY": "Май",
                "JUNE": "Июнь",
                "JULY": "Июль",
                "AUGUST": "Август",
                "SEPTEMPER": "Сентябрь",
                "OCTOBER": "Октябрь",
                "NOVEMBER": "Ноябрь",
                "DECEMBER": "Декабрь",
                "JANUARY_SHORT": "Янв",
                "FEBRUARY_SHORT": "Фев",
                "MARCH_SHORT": "Мар",
                "APRIL_SHORT": "Апр",
                "MAY_SHORT": "Май",
                "JUNE_SHORT": "Июн",
                "JULY_SHORT": "Июл",
                "AUGUST_SHORT": "Авг",
                "SEPTEMPER_SHORT": "Сен",
                "OCTOBER_SHORT": "Окт",
                "NOVEMBER_SHORT": "Ноя",
                "DECEMBER_SHORT": "Дек",
                "SUNDAY": "воскресенье",
                "MONDAY": "понедельник",
                "TUESDAY": "вторник",
                "WEDNESDAY": "среда",
                "THURSDAY": "четверг",
                "FRIDAY": "пятница",
                "SATURDAY": "суббота",
                "SUNDAY_SHORT": "вск",
                "MONDAY_SHORT": "пнд",
                "TUESDAY_SHORT": "втр",
                "WEDNESDAY_SHORT": "срд",
                "THURSDAY_SHORT": "чтв",
                "FRIDAY_SHORT": "птн",
                "SATURDAY_SHORT": "сбт",
                "SUNDAY_MIN": "Вс",
                "MONDAY_MIN": "Пн",
                "TUESDAY_MIN": "Вт",
                "WEDNESDAY_MIN": "Ср",
                "THURSDAY_MIN": "Чт",
                "FRIDAY_MIN": "Пт",
                "SATURDAY_MIN": "Сб",
                "CLOSE_TEXT": "Закрыть",
                "TODAY_TEXT": "Сегодня",
                "WEEK_HEADER": "Нед",
                "FIRST_DAY": "1",
                "AIRTICKETS": "Авиабилеты",
                "RAILWAYTICKETS": "ЖД билеты",
                "PLACEHOLDER_AIRPORT2": "Введите аэропорт, город или код ИАТА",
                "SELECT_AIRPORT": "Выбрать аэропорт",
                "COUNTRY": "Страна",
                "SELECT_COUNTRY": "Выберите страну...",
                "AIRPORT": "Аэропорт",
                "SELECT_AIRPORT2": "Выберите аэропорт...",
                "REMOVE_LEG": "Удалить перелет",
                "BY_EXACT_DATE": "по точной дате",
                "FIND": "Найти",
                "RAILWAY_PLACEHOLDER": "Введите название города или станции",
                "SELECT_AIRPORT_FROM_LIST": "Выберите аэропорт из списка...",
                "NEED_TO_SELECT_DIFFERENT_AIRPORTS": "Необходимо указать разные аэропорты для пунктов вылета и прилета...",
                "SELECT_STATION_FROM_LIST": "Выберите станцию из списка...",
                "NEED_TO_SELECT_DIFFERENT_STATIONS": "Необходимо указать разные станции для пунктов отправления и прибытия...",
                "NOTHING_FOUND": "Ничего не найдено",
                "PASS_CAT_INF": "Младенец",
                "PASS_CAT_INF_NS_DESC": "без места до 2 лет",
                "PASS_CAT_INF_NS_1": "младенец б.м.",
                "PASS_CAT_INF_NS_0": "младенецов б.м.",
                "PASS_CAT_INF_NS_4": "младенца б.м.",
                "PASS_CAT_INF_WS_DESC": "с местом до 2 лет",
                "PASS_CAT_INF_WS_1": "младенец",
                "PASS_CAT_INF_WS_0": "младенецов",
                "PASS_CAT_INF_WS_4": "младенца",
                "PASS_CAT_CNN": "Дети",
                "PASS_CAT_CNN_DESC": "2 – 11",
                "PASS_CAT_CNN_1": "ребенок",
                "PASS_CAT_CNN_0": "детей",
                "PASS_CAT_CNN_4": "ребенка",
                "PASS_CAT_YTH": "Молодежь",
                "PASS_CAT_YTH_DESC": "12 – 25",
                "PASS_CAT_YTH_1": "молодежный",
                "PASS_CAT_YTH_0": "молодежи",
                "PASS_CAT_ADT": "Взрослые",
                "PASS_CAT_ADT_DESC": "26 – 60",
                "PASS_CAT_ADT_1": "взрослый",
                "PASS_CAT_ADT_0": "взрослых",
                "PASS_CAT_SNN": "Пожилые",
                "PASS_CAT_SNN_DESC": "старше 60",
                "PASS_CAT_SNN_1": "пожилой",
                "PASS_CAT_SNN_0": "пожилых",
                "SPECIFY_PASSENGERS": "Укажите пассажиров...",
                "FORM_CLASS_ANY": "Любой",
                "FORM_CLASS_E": "Эконом",
                "FORM_CLASS_B": "Бизнес",
                "FORM_CLASS_F": "Первый",
                "C_PASSENGER": "пассажир",
                "C_PASSENGERS": "пассажиров",
                "C_PASSEGNERS2": "пассажира",
                "DAY": "день",
                "DAYS": "дня",
                "CLASS": "Класс",
                "AIRCOMPANY": "Авиакомпания",
                "ANY_AVIACOMPANY": "Любая авиакомпания",
                "SELECT_AVIACOMPANY": "Выберите авиакомпанию",
                "ONLY_DIRECT_FLIGHTS": "только прямые рейсы",
                "VALIDATE_FORM_SEARCH_MESSAGE_2": "Кто-то все же должен лететь.",
                "VALIDATE_FORM_SEARCH_MESSAGE_3": "Младенцев не должно быть больше, чем молодежи, взрослых и пожилых в сумме.",
                "SELECT_STATE_PROVINCE": "Выберите штат/провинцию",
                "HIDE": "Скрыть",
                "AT_ANY_TIME": "В любое время",
                "IN_THE_MORNING": "Утром",
                "IN_THE_AFTERNOON": "Днем",
                "IN_THE_EVENING": "Вечером",
                "FROM": "Откуда",
                "TO": "Куда",
                "CONTINUE_ROUTE": "Продолжить маршрут",
                "PASSENGERS": "Пассажиры",
                "CLEAR_ALL": "Очистить все",
                "SEARCH": "Поиск",
                "OR": "или",
                "STATE": "Штат",
                "FORM_CLASS_W": "Премиум эконом"
            },
            en: {
                "ONE_WAY": "One way",
                "ROUND_TRIP": "Round trip",
                "MULTY_ROUTE": "Multiple destinations",
                "JANUARY": "January",
                "FEBRUARY": "February",
                "MARCH": "March",
                "APRIL": "April",
                "MAY": "May",
                "JUNE": "June",
                "JULY": "July",
                "AUGUST": "August",
                "SEPTEMPER": "September",
                "OCTOBER": "October",
                "NOVEMBER": "November",
                "DECEMBER": "December",
                "JANUARY_SHORT": "Jan",
                "FEBRUARY_SHORT": "Feb",
                "MARCH_SHORT": "Mar",
                "APRIL_SHORT": "Apr",
                "MAY_SHORT": "May",
                "JUNE_SHORT": "Jun",
                "JULY_SHORT": "Jul",
                "AUGUST_SHORT": "Aug",
                "SEPTEMPER_SHORT": "Sep",
                "OCTOBER_SHORT": "Oct",
                "NOVEMBER_SHORT": "Nov",
                "DECEMBER_SHORT": "Dec",
                "SUNDAY": "Sunday",
                "MONDAY": "Monday",
                "TUESDAY": "Tuesday",
                "WEDNESDAY": "Wednesday",
                "THURSDAY": "Thursday",
                "FRIDAY": "Friday",
                "SATURDAY": "Saturday",
                "SUNDAY_SHORT": "Sun",
                "MONDAY_SHORT": "Mon",
                "TUESDAY_SHORT": "Tue",
                "WEDNESDAY_SHORT": "Wed",
                "THURSDAY_SHORT": "Thu",
                "FRIDAY_SHORT": "Fri",
                "SATURDAY_SHORT": "Sat",
                "SUNDAY_MIN": "Su",
                "MONDAY_MIN": "Mo",
                "TUESDAY_MIN": "Tu",
                "WEDNESDAY_MIN": "We",
                "THURSDAY_MIN": "Th",
                "FRIDAY_MIN": "Fr",
                "SATURDAY_MIN": "Sa",
                "CLOSE_TEXT": "Done",
                "TODAY_TEXT": "Today",
                "WEEK_HEADER": "Wk",
                "FIRST_DAY": "0",
                "AIRTICKETS": "Airtickets",
                "RAILWAYTICKETS": "Railway tickets",
                "PLACEHOLDER_AIRPORT2": "Enter the airport, city or IATA code",
                "SELECT_AIRPORT": "Select airport",
                "COUNTRY": "Country",
                "SELECT_COUNTRY": "Select country...",
                "AIRPORT": "Airport",
                "SELECT_AIRPORT2": "Select airport...",
                "REMOVE_LEG": "Remove flight",
                "BY_EXACT_DATE": "by exact date",
                "FIND": "Find",
                "RAILWAY_PLACEHOLDER": "Enter the name of the city or station",
                "SELECT_AIRPORT_FROM_LIST": "Select an airport from the list...",
                "NEED_TO_SELECT_DIFFERENT_AIRPORTS": "You must specify different airports for departure and arrival points...",
                "SELECT_STATION_FROM_LIST": "Select a station from the list...",
                "NEED_TO_SELECT_DIFFERENT_STATIONS": "You must specify different stations for departure and arrival points...",
                "NOTHING_FOUND": "Nothing found",
                "PASS_CAT_INF": "Infant",
                "PASS_CAT_INF_NS_DESC": "without seat, up to 2 years",
                "PASS_CAT_INF_NS_1": "infant w./s.",
                "PASS_CAT_INF_NS_0": "infants w./s.",
                "PASS_CAT_INF_NS_4": "infants w./s.",
                "PASS_CAT_INF_WS_DESC": "with place, up to 2 years",
                "PASS_CAT_INF_WS_1": "infant",
                "PASS_CAT_INF_WS_0": "infants",
                "PASS_CAT_INF_WS_4": "infants",
                "PASS_CAT_CNN": "Children",
                "PASS_CAT_CNN_DESC": "2 – 11",
                "PASS_CAT_CNN_1": "child",
                "PASS_CAT_CNN_0": "children",
                "PASS_CAT_CNN_4": "children",
                "PASS_CAT_YTH": "Youth",
                "PASS_CAT_YTH_DESC": "12 – 25",
                "PASS_CAT_YTH_1": "youth",
                "PASS_CAT_YTH_0": "youth",
                "PASS_CAT_ADT": "Adults",
                "PASS_CAT_ADT_DESC": "26 – 60",
                "PASS_CAT_ADT_1": "adult",
                "PASS_CAT_ADT_0": "adults",
                "PASS_CAT_SNN": "Elderly",
                "PASS_CAT_SNN_DESC": "over 60",
                "PASS_CAT_SNN_1": "elderly",
                "PASS_CAT_SNN_0": "elderly",
                "SPECIFY_PASSENGERS": "Specify the passengers ...",
                "FORM_CLASS_ANY": "Any",
                "FORM_CLASS_E": "Economy",
                "FORM_CLASS_B": "Business",
                "FORM_CLASS_F": "First",
                "C_PASSENGER": "passenger",
                "C_PASSENGERS": "passengers",
                "C_PASSEGNERS2": "passengers",
                "DAY": "day",
                "DAYS": "days",
                "CLASS": "Class",
                "AIRCOMPANY": "Carrier",
                "ANY_AVIACOMPANY": "Any airline",
                "SELECT_AVIACOMPANY": "Select carrier",
                "ONLY_DIRECT_FLIGHTS": "only direct flights",
                "VALIDATE_FORM_SEARCH_MESSAGE_2": "Someone still should fly.",
                "VALIDATE_FORM_SEARCH_MESSAGE_3": "There should not be more infants than youths, adults and seniors in total.",
                "SELECT_STATE_PROVINCE": "Select state/province",
                "HIDE": "Hide",
                "AT_ANY_TIME": "At any time",
                "IN_THE_MORNING": "In the morning",
                "IN_THE_AFTERNOON": "In the afternoon",
                "IN_THE_EVENING": "In the evening",
                "FROM": "From",
                "TO": "To",
                "CONTINUE_ROUTE": "Continue route",
                "PASSENGERS": "Passengers",
                "CLEAR_ALL": "Clear all",
                "SEARCH": "Search",
                "OR": "or",
                "STATE": "State",
                "FORM_CLASS_W": "Premium economy"
            },
            ua : {
                "ONE_WAY": "В одну сторону",
                "ROUND_TRIP": "Туди і назад",
                "MULTY_ROUTE": "Складний маршрут",
                "JANUARY": "Січень",
                "FEBRUARY": "Лютий",
                "MARCH": "Березень",
                "APRIL": "Квітень",
                "MAY": "Травень",
                "JUNE": "Червень",
                "JULY": "Липень",
                "AUGUST": "Серпень",
                "SEPTEMPER": "Вересень",
                "OCTOBER": "Жовтень",
                "NOVEMBER": "Листопад",
                "DECEMBER": "Грудень",
                "JANUARY_SHORT": "Січ",
                "FEBRUARY_SHORT": "Лют",
                "MARCH_SHORT": "Бер",
                "APRIL_SHORT": "Кві",
                "MAY_SHORT": "Тра",
                "JUNE_SHORT": "Чер",
                "JULY_SHORT": "Лип",
                "AUGUST_SHORT": "Сер",
                "SEPTEMPER_SHORT": "Вер",
                "OCTOBER_SHORT": "Жов",
                "NOVEMBER_SHORT": "Лис",
                "DECEMBER_SHORT": "Гру",
                "SUNDAY": "Неділя",
                "MONDAY": "Понеділок",
                "TUESDAY": "Вівторок",
                "WEDNESDAY": "Середа",
                "THURSDAY": "Четвер",
                "FRIDAY": "П`ятниця",
                "SATURDAY": "Субота",
                "SUNDAY_SHORT": "нед",
                "MONDAY_SHORT": "пнд",
                "TUESDAY_SHORT": "втр",
                "WEDNESDAY_SHORT": "срд",
                "THURSDAY_SHORT": "чтв",
                "FRIDAY_SHORT": "птн",
                "SATURDAY_SHORT": "сбт",
                "SUNDAY_MIN": "Нд",
                "MONDAY_MIN": "Пн",
                "TUESDAY_MIN": "Вт",
                "WEDNESDAY_MIN": "Ср",
                "THURSDAY_MIN": "Чт",
                "FRIDAY_MIN": "Пт",
                "SATURDAY_MIN": "Сб",
                "CLOSE_TEXT": "Закрити",
                "TODAY_TEXT": "Сьогодні",
                "WEEK_HEADER": "Тижд",
                "FIRST_DAY": "1",
                "AIRTICKETS": "Авіаквитки",
                "RAILWAYTICKETS": "ЖД квитки",
                "PLACEHOLDER_AIRPORT2": "Введіть аеропорт, місто або код ІАТА",
                "SELECT_AIRPORT": "Вибрати аеропорт",
                "COUNTRY": "Країна",
                "SELECT_COUNTRY": "Оберіть країну...    ",
                "AIRPORT": "Аеропорт",
                "SELECT_AIRPORT2": "Оберіть аеропорт...",
                "REMOVE_LEG": "Видалити переліт",
                "BY_EXACT_DATE": "за точною датою",
                "FIND": "Знайти",
                "RAILWAY_PLACEHOLDER": "Введіть назву міста або станції",
                "SELECT_AIRPORT_FROM_LIST": "Виберіть аеропорт зі списку...",
                "NEED_TO_SELECT_DIFFERENT_AIRPORTS": "Необхідно вказати різні аеропорти для пунктів вильоту і прильоту...",
                "SELECT_STATION_FROM_LIST": "Виберіть станцію зі списку...",
                "NEED_TO_SELECT_DIFFERENT_STATIONS": "Необхідно вказати різні станції для пунктів відправлення та прибуття...",
                "NOTHING_FOUND": "Нічого не знайдено",
                "PASS_CAT_INF": "Немовля",
                "PASS_CAT_INF_NS_DESC": "без місця до 2 років",
                "PASS_CAT_INF_NS_1": "немовля б.м.",
                "PASS_CAT_INF_NS_0": "немовлят б.м.",
                "PASS_CAT_INF_NS_4": "немовлят б.м.",
                "PASS_CAT_INF_WS_DESC": "з місцем до 2 років",
                "PASS_CAT_INF_WS_1": "немовля",
                "PASS_CAT_INF_WS_0": "немовлят",
                "PASS_CAT_INF_WS_4": "немовлят",
                "PASS_CAT_CNN": "Діти",
                "PASS_CAT_CNN_DESC": "2 – 11",
                "PASS_CAT_CNN_1": "дитина",
                "PASS_CAT_CNN_0": "дітей",
                "PASS_CAT_CNN_4": "дитини",
                "PASS_CAT_YTH": "Молодь",
                "PASS_CAT_YTH_DESC": "12 – 25",
                "PASS_CAT_YTH_1": "молодіжний",
                "PASS_CAT_YTH_0": "молодіжних",
                "PASS_CAT_ADT": "Дорослі",
                "PASS_CAT_ADT_DESC": "26 – 60",
                "PASS_CAT_ADT_1": "дорослий",
                "PASS_CAT_ADT_0": "дорослих",
                "PASS_CAT_SNN": "Літні",
                "PASS_CAT_SNN_DESC": "старші 60",
                "PASS_CAT_SNN_1": "літній",
                "PASS_CAT_SNN_0": "літніх",
                "SPECIFY_PASSENGERS": "Вкажіть пасажирів...",
                "FORM_CLASS_ANY": "Будь який",
                "FORM_CLASS_E": "Економ",
                "FORM_CLASS_B": "Бізнес",
                "FORM_CLASS_F": "Перший",
                "C_PASSENGER": "пасажир",
                "C_PASSENGERS": "пасажирів",
                "C_PASSEGNERS2": "пасажира",
                "DAY": "день",
                "DAYS": "дня",
                "CLASS": "Клас",
                "AIRCOMPANY": "Авіакомпанія",
                "ANY_AVIACOMPANY": "Будь-яка авіакомпанія",
                "SELECT_AVIACOMPANY": "Виберіть авіакомпанію",
                "ONLY_DIRECT_FLIGHTS": "Прямі рейси в першу чергу",
                "VALIDATE_FORM_SEARCH_MESSAGE_2": "Хтось все ж повинен летіти.",
                "VALIDATE_FORM_SEARCH_MESSAGE_3": "Немовлят не повинно бути більше, ніж молоді, дорослих і літніх в сумі.",
                "SELECT_STATE_PROVINCE": "Виберіть штат / провінцію",
                "HIDE": "Сховати",
                "AT_ANY_TIME": "У будь-який час",
                "IN_THE_MORNING": "Вранці",
                "IN_THE_AFTERNOON": "Вдень",
                "IN_THE_EVENING": "Ввечері",
                "FROM": "Звідки",
                "TO": "Куди",
                "CONTINUE_ROUTE": "Продовжити маршрут",
                "PASSENGERS": "Пасажири",
                "CLEAR_ALL": "Очистити все",
                "SEARCH": "Пошук",
                "OR": "або",
                "STATE": "Штат",
                "FORM_CLASS_W" : "Преміум економ"
            }
        };
        if (typeof (window.rezOnFormAddLanguages) != 'undefined' && window.rezOnFormAddLanguages.length > 0) {
            while (window.rezOnFormAddLanguages.length) {
                var addLang = window.rezOnFormAddLanguages.pop();
                this._locale[addLang.lang] = addLang.dict;
            }
        }

        this._o.dates.today = new Date();
        this._o.dates.today.setHours(0, 0, 0, 0);

        if (this._o.avia && this._o.avia.plusDaysShift) this._o.dates.plusDaysShift = parseInt(this._o.avia.plusDaysShift);

        this._o.dates.airMinDate = new Date(this._o.dates.today.getTime());
        this._o.dates.airMinDate.setDate(this._o.dates.airMinDate.getDate() + (this._o.dates.plusDaysShift + 1));
        this._o.dates.airMaxDate = new Date(this._o.dates.today.getTime());
        this._o.dates.airMaxDate.setDate(this._o.dates.airMaxDate.getDate() + 365);

        this._o.dates.trainsMinDate = new Date(this._o.dates.today.getTime());
        this._o.dates.trainsMaxDate = new Date(this._o.dates.today.getTime());
        this._o.dates.trainsMaxDate.setDate(this._o.dates.trainsMaxDate.getDate() + 44); //+ 29
        return this;
    }
    var it = this.constructor(form, o);


    //-----------------------------------------
    // Дополнительные методы
    //-----------------------------------------
    rezOnForm.prototype.extra = {};

    rezOnForm.prototype.extra.parseDateTime = function (strs) {
        if (strs == undefined || strs.len < 10) return undefined;
        var dateParts = strs.split(".");
        return dateParts.length > 2 ? new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]) : undefined;
    };

    rezOnForm.prototype.extra.dateTimeToString = function (dateTime) {
        if (!dateTime) return "";
        var dd = dateTime.getDate();
        var mm = dateTime.getMonth() + 1;

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + dateTime.getFullYear();
    };

    rezOnForm.prototype.extra.remoteUrl = function () {
        return it._o.projectUrl + it._o.defaultLang;
    }

    rezOnForm.prototype.extra.locale = function (str, locale) {
        if (locale == undefined && window.main != undefined && window.main.locale != undefined) return window.main.locale(str);
        locale = locale || it._o.defaultLang;
        if (it._locale.hasOwnProperty(locale) && typeof it._locale[locale] == 'object') {
            if (it._locale[locale].hasOwnProperty(str)) {
                return it._locale[locale][str];
            }
        }
        return str;
    };

    //-----------------------------------------
    // Работа с данными
    //-----------------------------------------
    rezOnForm.prototype.dataWork = {};

    rezOnForm.prototype.dataWork.airporFinderData = function() {
        return new Bloodhound({
            datumTokenizer: function(datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: it.extra.remoteUrl() + '/HelperAsync/Lookup?query=',
                rateLimitWait: 10,
                replace: function (url, query) {
                    return url + encodeURIComponent(query.replace(/[^a-zA-Zа-яА-ЯіїІЇ0-9\s,]{1}/g, "_"));
                },
                filter: function(data) {
                    return data;
                }
            }
        });
    };

    rezOnForm.prototype.dataWork.countriesData = function () {
        return rezOnForm.staticCountriesData(it.extra.remoteUrl());
    }

    rezOnForm.prototype.dataWork.carriersData = function() {
        return new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.label + " " + datum.code);
            },
            limit: 1000,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: {
                url: it.extra.remoteUrl() + '/HelperAsync/GetAirCompanies?v=2',
                filter: function (list) {
                    return list;
                }
            }
        });
    }

    rezOnForm.prototype.dataWork.stationsFinderData = function () {
        return new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            remote: {
                url: it.extra.remoteUrl() + '/HelperAsync/LookupStations?query=',
                rateLimitWait: 10,
                replace: function (url, query) {
                    return url + encodeURIComponent(query.replace(/[^a-zA-Zа-яА-ЯіїІЇ0-9]{1}/g, "_"));
                },
                filter: function (data) {
                    return data;
                }
            }
        });
    };

    //Подгрузка аэропортов штата / страны
    rezOnForm.prototype.dataWork.refreshAirportFinder = function(item) {
        var country = item.find(".galileo-country-select.tt-input").data("selected");
        var state = item.find(".galileo-state-select.tt-input").data("selected");
        var airportsLink = it.extra.remoteUrl() + "/HelperAsync/LookupAirports?country=" + country.code + (state && state.code ? ("&state=" + state.code) : "");
        
        $.ajax({
            cache: false,
            url: airportsLink,
            dataType: "JSON",
            success: function (json) {
                item.find(".galileo-airport-select.tt-hint").length > 0 && item.find(".galileo-airport-select").typeahead('destroy').val("");
                item.find(".galileo-airport-select").typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 0,
                    isSelectPicker: true
                },
                {
                    name: 'finderAirports-' + it._o.defaultLang,
                    displayKey: 'Name',
                    display: function(data) {
                        return data.Name + " [" + data.IataCode + "]";
                    },
                    source: rezOnForm.staticGalSubstringMatcher(json),
                    templates: {
                        suggestion: function(data) {
                            return data.Name + " <small class='iata-code'>" + data.IataCode + "</small>";
                        }
                    }
                }).on("typeahead:selected typeahead:autocompleted", function (e, datum) {
                    if (datum && item) {
                        item.find(".inside .tt-input").typeahead('val', datum.Name).trigger("keyup");
                        item.find(".inside .iata").html(datum.IataCode).removeClass("no-visiblity");
                        item.find(".inside input[type='hidden']").val(datum.IataCode);
                        item.find(".inside .country").html(datum.CountryName + " " + datum.CountryCode).removeClass("no-visiblity");
                        item.find(".inside .delete").removeClass("no-visiblity");
                        item.find(".inside .airport-finder-link").addClass("no-visiblity");

                        item.find(".tt-dropdown-menu").hide(function() {
                            item.find(".avia-airport-finder").slideUp(it._o.animationDelay, function () {
                                $(this).addClass("g-hide");
                                if (item.find("input.tt-input:focus").length == 0)  item.removeClass("focused");
                            });
                        });

                    }
                    $(this).typeahead('val', "").trigger("keyup");
                }).removeAttr("disabled");
            }
        });
    };

    //Установка значений по-умолчанию
    rezOnForm.prototype.dataWork.setDefaults = function(o) {
        o = o || {};

        /* Смысл метода в том, что бы установить флаг об успешной инициализации
         * формы только после того, как подгрузятся все значения по-умолчанию,
         * а они могут подгружаться с некоторой задержкой
         */
        var setInitializedProperty = function() {
            it._initialized = true;
        }

        if (o.avia)
        {
            o.avia.defaultRouteType && it._aviaForm.find("[name='book_type'][value='" + o.avia.defaultRouteType + "']").closest("label").trigger("click");

            //Вынесено в отдельную функцию т.к. нельзя одновременно отправлять 2 запроса, они перекрывают друг друга. Поэтому вынесли подгрущку втророго аэропорта
            var setAirportTo = function() {
                if (o.avia.defaultAirportTo) {
                    var twitterTypeahead2 = it._aviaForm.find("[name='to_iata']").siblings(".twitter-typeahead").find(".tt-input").eq(0).val(o.avia.defaultAirportTo).trigger("input").trigger("paste.tt").trigger("keyup");
                    var updatefunc2 = function () {
                        twitterTypeahead2.off("typeahead:dropdown", updatefunc2);
                        var data = twitterTypeahead2.data().ttTypeahead.dropdown;
                        data.datasets[data.datasets.length - 1].$el.find(".tt-suggestion").eq(0).trigger("click");

                        setInitializedProperty();
                    };
                    twitterTypeahead2.on("typeahead:dropdown", updatefunc2);
                } else setInitializedProperty();
            }

            if (o.avia.defaultAirportFrom) {
                var twitterTypeahead = it._aviaForm.find("[name='from_iata']").siblings(".twitter-typeahead").find(".tt-input").eq(0).val(o.avia.defaultAirportFrom).trigger("input").trigger("paste.tt").trigger("keyup");
                var updatefunc = function() {
                    twitterTypeahead.off("typeahead:dropdown", updatefunc);
                    var data = twitterTypeahead.data().ttTypeahead.dropdown;
                    data.datasets[data.datasets.length - 1].$el.find(".tt-suggestion").eq(0).trigger("click");

                    setAirportTo();
                };
                twitterTypeahead.on("typeahead:dropdown", updatefunc);
            } else setAirportTo();

            if (o.avia.defaultDateThere) it._aviaForm.find("[name='book_from_date']").val(o.avia.defaultDateThere).trigger("keyup");
            if (o.avia.defaultDateBack) it._aviaForm.find("[name='book_to_date']").val(o.avia.defaultDateBack).trigger("keyup");
            
        }else setInitializedProperty();
    }

    //-----------------------------------------
    // Валидации
    //-----------------------------------------
    rezOnForm.prototype.validation = {};

    //Валидация формы поиска авиабилетов
    rezOnForm.prototype.validation.airForm = function () {
        var ret = it.validation.departure_arrival();
        ret = rezOnForm.prototype.validation.dateRange(it._aviaForm) && ret;
        ret = rezOnForm.static.pass_selectPicker.validate(undefined, it.extra.locale) && ret;
        if (ret && typeof main !== 'undefined' && main.airtickets != undefined && main.airtickets.searchForm != undefined && main.airtickets.searchForm.send != undefined) return main.airtickets.searchForm.send(it._aviaForm);
        return ret;
    }

    //Проверка пунктов вылета / прилета
    rezOnForm.prototype.validation.departure_arrival = function() {
        var ret = true;
            
        it._aviaForm.find(".book-from").closest(".row, .multy-leg").not(".not-in-use").each(function () {
                
            var inpFrom = $(this).find(".book-from").parent().siblings("input[type='hidden']").first();
            var inpTo = $(this).find(".book-to").parent().siblings("input[type='hidden']").first();

            if ($.trim(inpFrom.val()) == "" || inpFrom.val() == "&nbsp;") {
                inpFrom.closest(".item").addClass("has-error").find(".error-box").text(it.extra.locale("SELECT_AIRPORT_FROM_LIST")).append($("<span/>").addClass("close")).slideDown(it._o.animationDelay);
                ret = false;
            }

            if ($.trim(inpTo.val()) == "" || inpTo.val() == "&nbsp;") {
                inpTo.closest(".item").addClass("has-error").find(".error-box").text(it.extra.locale("SELECT_AIRPORT_FROM_LIST")).append($("<span/>").addClass("close")).slideDown(it._o.animationDelay);
                ret = false;
            }else if ($.trim(inpFrom.val()) == $.trim(inpTo.val())) {
                inpTo.closest(".item").addClass("has-error").find(".error-box").text(it.extra.locale("NEED_TO_SELECT_DIFFERENT_AIRPORTS")).append($("<span/>").addClass("close")).slideDown(it._o.animationDelay);
                ret = false;
            }

        });
        return ret;
    };

    //Проверка даты вылета туда / обратно
    rezOnForm.prototype.validation.dateRange = function(form) {
        var ret = true;
        form.find(".book-date-wrapper.with-error").removeClass("with-error");
        form.find(".book-date").each(function () {
            if ($(this).closest(".book-date-wrapper").length === 0) return;
            if ($(this).closest(".book-date-wrapper").is(".no-visiblity")) return;
            if ($(this).closest(".multy-leg").is(".not-in-use")) return;
            if ($.trim($(this).val()) === "" || $(this).val() === "__.__.201_") {
                $(this).closest(".book-date-wrapper").addClass("with-error");
                ret = false;
            }
        });
        return ret;
    }

    //Валидация формы поиска ЖД билетов
    rezOnForm.prototype.validation.railForm = function () {
        var ret = it.validation.stations();
        ret = rezOnForm.prototype.validation.dateRange(it._railwayForm) && ret;
        if (ret && typeof main !== 'undefined' && main.traintickets != undefined && main.traintickets.searchForm != undefined && main.traintickets.searchForm.send != undefined) return main.traintickets.searchForm.send(it._railwayForm);
        return ret;
    }

    //Проверка станций отправления / прибытия
    rezOnForm.prototype.validation.stations = function() {
        var ret = true;

        var inpFrom = it._railwayForm.find("input[name='tshi_station_from']").first();
        var inpTo = it._railwayForm.find("input[name='tshi_station_to']").first();

        if ($.trim(inpFrom.val()) == "" || inpFrom.val() == "&nbsp;") {
            inpFrom.closest(".item").addClass("has-error").find(".error-box").text(it.extra.locale("SELECT_STATION_FROM_LIST")).append($("<span/>").addClass("close")).slideDown(it._o.animationDelay);
            ret = false;
        }

        if ($.trim(inpTo.val()) == "" || inpTo.val() == "&nbsp;") {
            inpTo.closest(".item").addClass("has-error").find(".error-box").text(it.extra.locale("SELECT_STATION_FROM_LIST")).append($("<span/>").addClass("close")).slideDown(it._o.animationDelay);
            ret = false;
        } else if ($.trim(inpFrom.val()) == $.trim(inpTo.val())) {
            inpTo.closest(".item").addClass("has-error").find(".error-box").text(it.extra.locale("NEED_TO_SELECT_DIFFERENT_STATIONS")).append($("<span/>").addClass("close")).slideDown(it._o.animationDelay);
            ret = false;
        }

        return ret;
    }

    //-----------------------------------------
    // Методы пересчета и перерисовки полей
    //-----------------------------------------
    rezOnForm.prototype.redraw = {};

    rezOnForm.prototype.redraw.refreshAircompanies = function () {
        var carriers = it._aviaForm.find(".carriers");
        var inside = carriers.find(".item .inside").html("");
        var nextIsDisable = false;
        $(".galileo-aircompany-select.tt-input").removeAttr("disabled").each(function() {
            var wrapper = $("<div/>").addClass('aircompany-item');
            if (nextIsDisable) {
                $(this).prop("disabled", true);
            } else if ($(this).val() != "") {
                inside.append(wrapper.html($(this).val()));
            } else {
                nextIsDisable = true;
                var next = $(this).closest(".twitter-typeahead").nextAll(".twitter-typeahead").first().find(".galileo-aircompany-select.tt-input");
                if (next && next.val() != "") {
                    $(this).typeahead('val', next.val()).val(next.val());
                    next.val('').typeahead('val', '');
                    inside.append(wrapper.html($(this).val()));

                    var itIata = $(this).closest(".twitter-typeahead").next();
                    var itIataValue = itIata.val();
                    var nextIata = next.closest(".twitter-typeahead").next();

                    itIata.val(nextIata.val());
                    nextIata.val(itIataValue);

                    nextIsDisable = false;
                }
            }
        });
        if (inside.is(":empty")) inside.append($("<div/>").addClass('aircompany-item').html(it.extra.locale("ANY_AVIACOMPANY")));
    };

    rezOnForm.prototype.redraw.setBriefCallback = function (selectAge) {
        var str = it.redraw.passengersString(selectAge);
        selectAge.siblings(".switch-box").find(".passengers-text").text(str);
    }

    // Формирование краткого перечня пассажиров на основе выбранных
    rezOnForm.prototype.redraw.passengersString = function(selectAge) {
        var str = "";
        var oneCategory = true;
        var cat = "";
        var count = 0;
        selectAge.find("input[type='hidden']").each(function() {
            if ($(this).val() != 0) {
                count += parseInt($(this).val());
                if (cat == "") {
                    cat = $(this).attr("name");
                } else {
                    oneCategory = cat === $(this).attr("name");
                }
            }
        });
        str = count + " ";
        var oneNumber = cat, zeroNumber = cat, fourNumber = cat;
        if (oneCategory) {
            switch (cat)
            {
                case "psgInfantsCnt":
                    oneNumber = it.extra.locale("PASS_CAT_INF_NS_1");
                    zeroNumber = it.extra.locale("PASS_CAT_INF_NS_0");
                    fourNumber = it.extra.locale("PASS_CAT_INF_NS_4");
                    break;
                case "psgInfantsNSCnt":
                    oneNumber = it.extra.locale("PASS_CAT_INF_WS_1");
                    zeroNumber = it.extra.locale("PASS_CAT_INF_WS_0");
                    fourNumber = it.extra.locale("PASS_CAT_INF_WS_4");
                    break;
                case "psgKidsCnt":
                    oneNumber = it.extra.locale("PASS_CAT_CNN_1");
                    zeroNumber = it.extra.locale("PASS_CAT_CNN_0");
                    fourNumber = it.extra.locale("PASS_CAT_CNN_4");
                    break;
                case "psgYouthCnt":
                    oneNumber = it.extra.locale("PASS_CAT_YTH_1");
                    zeroNumber = it.extra.locale("PASS_CAT_YTH_0");
                    fourNumber = it.extra.locale("PASS_CAT_YTH_0");
                    break;
                case "psgAdultsCnt":
                    oneNumber = it.extra.locale("PASS_CAT_ADT_1");
                    zeroNumber = it.extra.locale("PASS_CAT_ADT_0");
                    fourNumber = it.extra.locale("PASS_CAT_ADT_0");
                    break;
                case "psgOldCnt":
                    oneNumber = it.extra.locale("PASS_CAT_SNN_1");
                    zeroNumber = it.extra.locale("PASS_CAT_SNN_0");
                    fourNumber = it.extra.locale("PASS_CAT_SNN_0");
                    break;
            }
        } else {
            oneNumber = it.extra.locale("C_PASSENGER");
            zeroNumber = it.extra.locale("C_PASSENGERS");
            fourNumber = it.extra.locale("C_PASSEGNERS2");
        }
        if (count == 0 || (count >= 5 && count <= 20)) {
            //вариантов
            str += zeroNumber;
        } else {
            switch (count % 10) {
            case 1:
                //вариант
                str += oneNumber;
                break;
            case 2:
            case 3:
            case 4:
                //варианта
                str += fourNumber;
                break;
            default:
                str += zeroNumber;
                break;
            }
        }
        if (count == 0) {
            str = it.extra.locale("SPECIFY_PASSENGERS");
        }
        return str;
    };

    // Обновление индекса сегментов для сложного маршрута
    rezOnForm.prototype.redraw.routeRefresh = function () {            
        var cnt = it._aviaForm.find("input[name='book_type']:checked").first().val() == "route" ?  it._aviaForm.find(".multy-leg:not(.not-in-use)").length : 1;
        if (cnt == 3) {
            it._aviaForm.find(".add_segment").slideUp(it._o.animationDelay, function() {
                $(this).addClass("g-hide");
                typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
            });
        } else {
                
            if (it._aviaForm.find("input[name='book_type']:checked").first().val() == "route") {
                it._aviaForm.find(".add_segment").slideDown(it._o.animationDelay, function() {
                    $(this).removeClass("g-hide");
                    typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
                });
            }
        }

        it._aviaForm.find(".remove-leg").addClass("g-hide");
        it._aviaForm.find(".multy-leg:not(.not-in-use) .remove-leg").last().removeClass("g-hide");

        it._aviaForm.find("input[name='segmentsCount']").val(cnt + 1);

    };
        
    //-----------------------------------------
    // Вешаем события
    //-----------------------------------------

    rezOnForm.prototype.bindDateRange_forForm = function (forForm) {
        forForm.find("input.datepicker").filter("[name='book_from_date'],[name='book_from_date2'],[name='book_from_date3'],[name='book_from_date4']").each(function () {
            var location = forForm.find("." + $(this).attr("name") + "-datapicker");
            var datepicker = $(this);

            var inputDate = it.extra.parseDateTime(datepicker.val());
            if (inputDate == undefined || isNaN(inputDate.getTime())) {
                inputDate = new Date(it._o.dates.today.getTime());
                inputDate.setDate((it._o.dates.today.getDate() + (forForm.is("#avia-form-shoot") ? 7 : 0)));

                datepicker.val(it.extra.dateTimeToString(inputDate));
            }

            datepicker.DatePicker({
                format: 'd.m.Y',
                date: inputDate,
                flat: location.length > 0,
                current: new Date(inputDate.getTime()),
                starts: 1,
                calendars: 3,
                position: location.length > 0 ? location : 'bottom',
                minDate: forForm.is("#avia-form-shoot")
                    ? it._o.dates.airMinDate
                    : it._o.dates.trainsMinDate,
                maxDate: forForm.is("#avia-form-shoot")
                    ? it._o.dates.airMaxDate
                    : it._o.dates.trainsMaxDate,
                mode: 'single', // 'range',
                onChange: function (formatted, dates) {
                    if (Object.prototype.toString.call(formatted) === '[object Array]') {
                        datepicker.val(formatted[0]);
                        forForm.find("input[name='" + datepicker.attr("data-rangeItemName") + "']").first().val(formatted[1]).trigger("change");
                    } else {
                        datepicker.val(formatted).trigger("change");

                        //Для одиночного календаря скрываем календарь при выборе
                        setTimeout(function () {
                            forForm.find(".book-date:focus, .dates-item:focus").first().blur();
                        }, 10);
                        return;
                    }
                },
                onFocusChange: function (newVal) {
                    if ($(window).width() < 600) {
                        //Для маленких экранов убираем автоматические переход
                        return;
                    }

                    datepicker.closest(".row").find(".book-date-wrapper.active").removeClass("active");
                    datepicker.closest(".row").find(".column.calendar-dropdown").removeClass("calendar-dropdown");
                    if (newVal) {
                        forForm.find("input[name='" + datepicker.attr("data-rangeItemName") + "']").first().closest(".book-date-wrapper").addClass("active").closest(".column").addClass("calendar-dropdown");
                    } else {
                        datepicker.closest(".book-date-wrapper").addClass("active").closest(".column").addClass("calendar-dropdown");
                    }
                },
                locale: {
                    days: [it.extra.locale("SUNDAY"), it.extra.locale("MONDAY"), it.extra.locale("TUESDAY"), it.extra.locale("WEDNESDAY"), it.extra.locale("THURSDAY"), it.extra.locale("FRIDAY"), it.extra.locale("SATURDAY"), it.extra.locale("SUNDAY")],
                    daysShort: [it.extra.locale("SUNDAY_SHORT"), it.extra.locale("MONDAY_SHORT"), it.extra.locale("TUESDAY_SHORT"), it.extra.locale("WEDNESDAY_SHORT"), it.extra.locale("THURSDAY_SHORT"), it.extra.locale("FRIDAY_SHORT"), it.extra.locale("SATURDAY_SHORT"), it.extra.locale("SUNDAY_SHORT")],
                    daysMin: [it.extra.locale("SUNDAY_MIN"), it.extra.locale("MONDAY_MIN"), it.extra.locale("TUESDAY_MIN"), it.extra.locale("WEDNESDAY_MIN"), it.extra.locale("THURSDAY_MIN"), it.extra.locale("FRIDAY_MIN"), it.extra.locale("SATURDAY_MIN"), it.extra.locale("SUNDAY_MIN")],
                    months: [it.extra.locale("JANUARY"), it.extra.locale("FEBRUARY"), it.extra.locale("MARCH"), it.extra.locale("APRIL"), it.extra.locale("MAY"), it.extra.locale("JUNE"), it.extra.locale("JULY"), it.extra.locale("AUGUST"), it.extra.locale("SEPTEMPER"), it.extra.locale("OCTOBER"), it.extra.locale("NOVEMBER"), it.extra.locale("DECEMBER")],
                    monthsShort: [it.extra.locale("JANUARY_SHORT"), it.extra.locale("FEBRUARY_SHORT"), it.extra.locale("MARCH_SHORT"), it.extra.locale("APRIL_SHORT"), it.extra.locale("MAY_SHORT"), it.extra.locale("JUNE_SHORT"), it.extra.locale("JULY_SHORT"), it.extra.locale("AUGUST_SHORT"), it.extra.locale("SEPTEMPER_SHORT"), it.extra.locale("OCTOBER_SHORT"), it.extra.locale("NOVEMBER_SHORT"), it.extra.locale("DECEMBER_SHORT")],
                    weekMin: it.extra.locale("WEEK_HEADER")
                }
            }).keyup(function (e, name) {
                var pairItem = datepicker.attr("data-rangeItemName") != undefined
                    ? forForm.find("input[name='" + datepicker.attr("data-rangeItemName") + "']").first()
                    : undefined;
                var d1 = it.extra.parseDateTime($(this).val());
                if (!d1) d1 = new Date();
                if (pairItem != undefined && pairItem.length != 0 && !pairItem.parent().is(".no-visiblity")) {
                    var d2 = it.extra.parseDateTime(pairItem.val()) || new Date(d1.valueOf());
                    d2.setHours(23, 59, 59, 0);
                    if (name == datepicker.attr("data-rangeItemName")) {
                        if (d2.valueOf() - (1000 * 60 * 60 * 24) < d1.valueOf()) {
                            d1 = new Date(d2.getTime());
                            d1.setHours(0, 0, 0);
                            d1.setDate(d1.getDate() - 1);
                            $(this).val(it.extra.dateTimeToString(d1));
                        }
                    }
                    else {
                        if (d1.valueOf() > d2.valueOf()) {
                            d2 = new Date(d1.getTime());
                            d2.setDate(d2.getDate() + 7);
                            pairItem.val(it.extra.dateTimeToString(d2));
                        }
                    }
                    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) datepicker.DatePickerSetDate([d1, d2], true);
                } else {
                    if (!isNaN(d1.getTime())) datepicker.DatePickerSetDate(d1, true);
                }
            }).change(function () {
                // Корректировка дат для сегментов сложного маршрута
                if (forForm.find("input[name='book_type']:checked").first().val() == "route") {
                    var setDate = it.extra.parseDateTime($(this).val());
                    $(this).closest(".multy-leg, .row").nextAll(".multy-leg").find(".book-date").each(function () {
                        $(this).DatePickerSetMinDate(setDate);
                        setDate = it.extra.parseDateTime($(this).val());
                    });
                }
            });

        });

        forForm.find("input[name='book_to_date'].datepicker").keyup(function (e) {
            forForm.find("input[name='book_from_date'].datepicker").trigger("keyup", $(this).attr("name"));
        });

        forForm.find("input.book-date").mask("~#.$#.2019");

        forForm.find(".dates-item *").click(function (e) {
            $(this).closest(".dates-item").focus();
        });
        forForm.find(".book-date, .dates-item").focus(function () {
            var datesItem = $(this).closest(".row").find(".dates-item");
            if (datesItem.data('focusTimer')) clearTimeout(datesItem.data('focusTimer'));

            datesItem.filter(".g-hide").addClass("z-100").slideDown(it._o.animationDelay, function () {
                $(this).removeClass("g-hide z-100");
            });

            $(this).closest(".row").find(".item").addClass("calendar-dropdown");
            
            if ($(this).is(".book-date")) {
                $(this).closest(".book-date-wrapper").addClass("active").removeClass("with-error");
                $(this).closest(".column").addClass("calendar-dropdown");
                if ($(this).is("input[name='book_from_date']") || $(this).is("input[name='book_to_date']")) {
                    var item = $(!$(this).is("input[name='book_to_date']")
                        ? this
                        : forForm.find("input[name='book_from_date'].datepicker")
                    );
                    if(item.length && item.DatePickerSetClickedItem) item.DatePickerSetClickedItem($(this).attr("data-rangeitemname") === undefined);
                }
            }
        }).blur(function () {
            var datesItem = $(this).closest(".row").find(".dates-item");
            var _this = $(this);
            datesItem.data('focusTimer', setTimeout(function () {
                datesItem.slideUp(it._o.animationDelay, function () {
                    $(this).addClass("g-hide");
                });
                if (_this.is(".book-date")) {
                    _this.closest(".book-date-wrapper").removeClass("active");
                    _this.closest(".column").removeClass("calendar-dropdown");
                } else {
                    _this.closest(".row").find(".book-date-wrapper, .column").removeClass("active calendar-dropdown");
                }
            }, 100));
            $(this).closest(".row").find(".item").removeClass("calendar-dropdown");
        });
        forForm.find(".datepicker-button").click(function () {
            if ($(this).closest(".row").find(".dates-item.g-hide").length > 0)
                $(this).siblings(".book-date").focus();
            else $(this).closest(".dates-item").blur();
            return false;
        });
        //Скрыть календарь
        forForm.find(".dates-item .button-hide").click(function (e) {
            $(this).closest(".dates-item").blur();
            return false;
        });
    }

    rezOnForm.prototype.bind = function() {
        //Если это не страница проекта (т.е. форма не внешнем ресурсе, не подключен файл main.js)
        if (window.main == undefined) {
            it._form.find(".selectpicker").on("click", ".option, .selected-value", function () {
                var selectpicker = $(this).closest(".selectpicker");
                if (selectpicker.is(".opened")) {
                    if ($(this).is(".option")) {
                        selectpicker.find(".selected-value:first").find("span:first").html(
                            $(this).find("span:first").text()
                        );
                        $(this).find("input:radio").prop("checked", true);
                        $(this).siblings(".option").find("input:radio:checked").removeAttr("checked");
                    }
                    selectpicker.find(".options").slideUp(it._o.animationDelay, function () {
                        selectpicker.removeClass("opened");
                    });
                } else {
                    selectpicker.addClass("opened");
                    selectpicker.find(".options").addClass("z-100").slideDown(it._o.animationDelay, function () {
                        $(this).removeClass("z-100");
                    });
                }
                return false;
            });

            it._form.on("blur", ".selectpicker.opened", function () {
                var selectpicker = $(this);
                selectpicker.find(".options").slideUp(it._o.animationDelay, function () {
                    selectpicker.removeClass("opened");
                });
                return false;
            });

            it._form.find(".selectpicker").each(function () {
                $(this).attr("tabindex", "-1");
                var radio = $(this).find("input:radio:checked");
                if (radio.length == 0) radio = $(this).find("input:radio:first");

                $("<div/>").prependTo($(this)).addClass("selected-value").append($("<span/>").html(radio.prev("span").html()));
            });
        }

        //$(document).off("click", ".radio-group > label, .radio-group > label > input[type='radio']");
        it._form.find(".radio-group > label").click(function () {
            if ($(this).is("active")) return false;

            $(this).addClass("active").find("input:radio").prop("checked", true).trigger("change");
            $(this).siblings(".active").removeClass("active").find("input:checked").removeAttr("checked");
            return false;
        }).filter(".active").first().trigger("click");

        it._form.find(".checkbox-item").click(function () {
            //Если это не страница проекта (т.е. форма не внешнем ресурсе, не подключен файл main.js)
            if (window.main == undefined) {
                if ($(this).is(".active")) {
                    $(this).removeClass("active");
                    $(this).find("input:checkbox").removeAttr("checked");
                } else {
                    $(this).addClass("active");
                    $(this).find("input:checkbox").prop("checked", true);
                }
                return false;
            }
        });

        it._form.find(".rez-forms-links a.rez-form-link").click(function () {
            if (!$(this).is(".active")) {
                $(this).siblings(".rez-form-link.active").each(function() {
                    $(this).removeClass("active");
                    it._form.find($(this).attr("href")).addClass("g-hide");
                });

                $(this).addClass("active");
                it._form.find($(this).attr("href")).removeClass("g-hide");
            }
            return false;
        });

        //Очистить аэропорт|cтанцию отправления/прибытия
        it._form.find(".item .delete").click(function () {
            $(this).closest(".item").find(".inside .tt-input").typeahead('val', "").trigger("typeahead:queryChanged").trigger("keyup").focus();
            return false;
        });

        //Клик по затухающему градиенту должен вести на инпут (просто градиент выше по наложению)
        it._form.find(".item .text-fade").click(function() {
            $(this).closest(".item").find(".tt-input").select();
        });

        typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм

        $(document).ajaxStart(function () {
            it._form.find(".item.focused .twitter-typeahead").addClass("loading");
        });
        $(document).ajaxComplete(function () {
            it._form.find(".item.focused .twitter-typeahead.loading").removeClass("loading");
        });
    }
    
    rezOnForm.prototype.aviaBind = function () {

        //Отправка формы поиска авиабилетов
        it._aviaForm.submit(function() {
            return it.validation.airForm();
        });

        // Поиск аэропортов / городов в основной форме
        it._aviaForm.find('.book-from, .book-to').typeahead({
            minLength: 2
        }, {
            name: "airports-" + it._o.defaultLang,
            displayKey: 'value',
            source: it.dataWork.airporFinderData.ttAdapter(),
            display: function (data) {
                return data != undefined ? data.Name : null;
            },
            templates: {
                empty: [
                    '<div class="templ-message">',
                    it.extra.locale("NOTHING_FOUND") + '...',
                    '</div>'
                ].join('\n'),
                suggestion: function (data) {
                    var ret = [];
                    ret.push(
                    {
                        key: $("<span class='country-separator'><small>" + data.countryName + " (" + data.countryCode + ")</small><span>"),
                        value: undefined
                    });
                    for (var airpIt = 0; airpIt < data.airports.length; airpIt++) {
                        ret.push({
                            key: data.airports[airpIt].airpName + (data.airports[airpIt].airpStateCode ? (", [" + data.airports[airpIt].airpStateCode + "]") : "") + " <small class='iata-code'>" + data.airports[airpIt].airpCode + "</small>",
                            value: {
                                IataCode: data.airports[airpIt].airpCode,
                                Name: data.airports[airpIt].airpName,
                                CountryCode: data.countryCode,
                                CountryName: data.countryName
                            }
                        });
                        if (data.airports[airpIt].includeItems && data.airports[airpIt].includeItems.length > 0)
                            for (var inclAirp = 0; inclAirp < data.airports[airpIt].includeItems.length; inclAirp++) {
                                ret.push(
                                {
                                    key: "<span class='item-child" + (inclAirp == 0 ? '-first' : '') + "'></span>" +
                                        "<span class='item-text'>" + data.airports[airpIt].includeItems[inclAirp].inclName + "</span>" +
                                        " <small class='iata-code'>" + data.airports[airpIt].includeItems[inclAirp].inclCode + "</small>",
                                    value: {
                                        IataCode: data.airports[airpIt].includeItems[inclAirp].inclCode,
                                        Name: data.airports[airpIt].includeItems[inclAirp].inclName,
                                        CountryCode: data.countryCode,
                                        CountryName: data.countryName
                                    }
                                });
                            }
                    }
                    return ret;
                }
            }
        }).keyup(function (e) {
            if ($.trim($(this).val()) == "") {
                $(this).addClass("isEmpty");
                $(this).closest('.item').find(".delete").addClass("no-visiblity");
            }
            else {
                $(this).removeClass("isEmpty");
                $(this).closest('.item').find(".delete.no-visiblity").removeClass("no-visiblity");
            }
        }).focus(function () {
            var item = $(this).closest('.item');
            item.addClass('focused').removeClass("has-error").find(".error-box").slideUp(it._o.animationDelay);
            item.closest(".column").siblings(".column").find(".item").removeClass("has-error").find(".error-box").slideUp(it._o.animationDelay);
            item.find(".avia-airport-finder:not(.g-hide)").slideUp(it._o.animationDelay, function () {
                $(this).addClass("g-hide");
            });
        }).click(function() {
            $(this).select();
        }).blur(function () {
            $(this).closest('.item.focused').removeClass('focused');
            if ($.trim($(this).val()) == "") $(this).trigger("typeahead:queryChanged");
        }).on("typeahead:selected typeahead:autocompleted", function (e, datum, e2) {
            if (datum != undefined) {
                var item = $(this).closest(".item");
                item.find(".inside .iata").html(datum.IataCode).removeClass("no-visiblity");
                item.find(".inside input[type='hidden']").val(datum.IataCode);
                item.find(".inside .country").html(datum.CountryName + " " + datum.CountryCode).removeClass("no-visiblity");
                item.find(".inside .delete").removeClass("no-visiblity");
                item.find(".inside .airport-finder-link").addClass("no-visiblity");

                //Меняем фокус только когда форма инициализирована (что бы фокус не плясал при инициализации полей по-умолчанию)
                if (it._initialized)
                {
                    //Меняем фокус
                    if ($(this).is(".book-from")) {
                        $(this).closest(".from").siblings(".to").find(".book-to.tt-input").trigger("click");
                    } else if ($(this).is(".book-to")) {
                        $(this).closest(".to").siblings(".from").find(".calendar .book-date").focus();
                    }
                }
            }
        }).on("typeahead:dropdown", function (it) {
            var item = $(this).closest('.item');
            item.addClass('opened');
        }).on("typeahead:dropup", function (it) {
            $(this).closest('.item.opened').removeClass('opened');
        }).on("typeahead:queryChanged", function (it, query) {
            var item = $(this).closest('.item');
            item.find(".inside .iata").addClass("no-visiblity");
            item.find(".inside input[type='hidden']").val("");
            item.find(".inside .country").addClass("no-visiblity");
            item.find(".inside .airport-finder-link.no-visiblity").removeClass("no-visiblity");
        });


        // Клик по "Выбрать аэропорт"
        it._aviaForm.find(".airport-finder-link").click(function () {
            $(this).addClass("no-visible");
            var finderDestination = $(this).closest(".item");
            finderDestination.removeClass("has-error").find(".error-box").slideUp(it._o.animationDelay);
            finderDestination.addClass("focused z-100").find(".avia-airport-finder").slideDown(it._o.animationDelay, function () {
                $(this).removeClass("g-hide");
                $(this).focus();
                $(this).closest(".item").removeClass("z-100");
            });
            return false;
        });

        //Список стран
        it._aviaForm.find(".galileo-country-select").typeahead({
            hint: true,
            highlight: true,
            minLength: 0,
            isSelectPicker: true
        },
        {
            name: 'countries-' + it._o.defaultLang,
            source: it.dataWork.countriesData.ttAdapter(),
            valueKey: 'label',
            display: function (data) {
                return data.label + " [" + data.code + "]";
            },
            templates: {
                suggestion: function (data) {
                    return data.label + " <small class='iata-code'>" + data.code + "</small>";
                }
            }
        }).on("typeahead:selected typeahead:autocompleted", function (e, datum) {
            var item = $(this).closest(".item");
            if (datum != undefined) {
                $(this).data("selected", datum);
                item.find(".galileo-state-select.tt-hint").length > 0 && item.find(".galileo-state-select").typeahead('destroy').val("");

                var selectedCountryHasState = false;
                for (var c = 0; c < it._o.statesInCountries.length; c++)
                    if (it._o.statesInCountries[c] == datum.code) {
                        selectedCountryHasState = true;
                        break;
                    }
                if (selectedCountryHasState) {
                    //Страна имеет штаты
                    $.ajax({
                        cache: false,
                        url: it.extra.remoteUrl() + "/HelperAsync/LookupStatesForCountry?country=" + datum.code,
                        dataType: "JSON",
                        success: function (json) {
                            //Список штатов
                            item.find(".galileo-state-select").typeahead({
                                hint: true,
                                highlight: true,
                                minLength: 0,
                                isSelectPicker: true
                            },
                            {
                                name: 'states-' + it._o.defaultLang,
                                displayKey: 'label',
                                display: function (data) {
                                    return data.label + " [" + data.code + "]";
                                },
                                source: rezOnForm.staticGalSubstringMatcher(json),
                                templates: {
                                    suggestion: function (data) {
                                        return data.label + " <small class='iata-code'>" + data.code + "</small>";
                                    }
                                }
                            }).on("typeahead:selected typeahead:autocompleted", function (e, datum) {
                                $(this).data("selected", datum);
                                it.dataWork.refreshAirportFinder(item);
                            }).on("typeahead:queryChanged", function (it, query) {
                                item.find(".galileo-airport-select.tt-input").prop("disabled", true).typeahead('val', "").trigger("typeahead:queryChanged");
                            });
                            item.find(".finder-state.g-hide").removeClass("g-hide");
                        }
                    });
                } else {
                    //У страны нет штатов
                    item.find(".finder-state").addClass("g-hide");
                    it.dataWork.refreshAirportFinder(item);
                }
            }
        }).on("typeahead:queryChanged", function (it, query) {
            var item = $(this).closest(".item");
            item.find(".finder-state").addClass("g-hide");
            item.find(".galileo-state-select").data("selected", undefined);
            item.find(".galileo-airport-select.tt-input").prop("disabled", true).typeahead('val', "").trigger("typeahead:queryChanged");
        });

        //Список авиакомпаний
        it._aviaForm.find(".galileo-aircompany-select").typeahead({
            hint: true,
            highlight: true,
            minLength: 0,
            isSelectPicker: true
        },
        {
            name: 'carriers-' + it._o.defaultLang,
            source: it.dataWork.carriersData.ttAdapter(),
            valueKey: 'label',
            display: function (data) {
                return data.label; //+ " [" + data.code + "]";
            },
            templates: {
                suggestion: function (data) {
                    return data.label + " <small class='iata-code' data-iata='" + data.code + "'>" + data.code + "</small>";
                }
            }
        }).on("typeahead:selected typeahead:autocompleted", function (e, datum) {
            //Выбор элемента - подставляем иата код
            if (datum != undefined) {
                $(this).closest(".twitter-typeahead").next().val(datum.code);
            }
            $(this).trigger("change");
        }).on("typeahead:opened", function (e, datum) {
            //Открыли
            $(this).trigger("typeahead:queryChanged");
        }).on("typeahead:queryCleared", function (e, datum) {
            //Очистили поле - кнопка Х.
            var item = $(this);
            item.closest(".twitter-typeahead").next().val('');
            item.trigger("typeahead:filterIt");
            setTimeout(function () {
                //После очистки, находим первый пестой элемент и устанавливаем на него фокус. 
                //Ищем т.к. все значения съезжают к верхнему
                item.closest(".carriers-finder").find("input[type='hidden']").filter(function () { return this.value == ""; }).first().prev().find(".tt-input").focus();
            }, 100);
        }).on("typeahead:selected typeahead:queryChanged", function (e, datum) {
            //Изменили строку запроса
            $(this).trigger("typeahead:filterIt");
        }).on("typeahead:filterIt", function () {
            //Фильтрация выпадающего меню. Не отображаем выбранные в других меню значения
            var dropDown = $(this).siblings(".tt-dropdown-menu");
            dropDown.find(".tt-suggestion.g-hide").removeClass("g-hide");

            setTimeout(function () {
                var values = $.map(it._aviaForm.find(".carriers .carriers-finder input[type='hidden']"), function (val, i) {
                    return ".iata-code[data-iata='" + $(val).val() + "']";
                });
                dropDown.find(values.join(", ")).each(function () {
                    $(this).closest(".tt-suggestion").addClass("g-hide");
                });
            }, 100);
        }).change(function () {
            setTimeout(function () {
                it.redraw.refreshAircompanies();
            }, 50);
        }).first().trigger("change");

        // Смена типа маршрута // oneway|roundtrip|route
        it._aviaForm.find("input[name='book_type']").change(function() {
            var value = it._aviaForm.find("input[name='book_type']:checked").first().val();

            var fromDt = it.extra.parseDateTime(it._aviaForm.find("input[name='book_from_date'].datepicker").val());
            switch (value) {
            case "oneway":
                it._aviaForm.find("input[name='book_to_date']").parent().addClass('no-visiblity');
                it._aviaForm.find("input[name='book_to_time']").first().closest(".selectpicker").addClass('no-visiblity');
                it._aviaForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('single').DatePickerSetDate(fromDt).val(it.extra.dateTimeToString(fromDt));

                it._aviaForm.find(".add_segment").slideUp(it._o.animationDelay, function() {
                    $(this).addClass("g-hide");
                });
                it._aviaForm.find(".multy-leg").addClass("not-in-use").slideUp(it._o.animationDelay, function() {
                    $(this).addClass("g-hide");
                    typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
                });

                it._aviaForm.find(".book-range.g-hide").removeClass("g-hide");
                break;
            case "roundtrip":
                var toDt = it.extra.parseDateTime(it._aviaForm.find("input[name='book_to_date']").val());
                if (fromDt == undefined) fromDt = new Date();
                if (toDt == undefined || fromDt.valueOf() > toDt.valueOf()) {
                    toDt = new Date(fromDt.getTime());
                    toDt.setDate(toDt.getDate() + 7);
                    it._aviaForm.find("input[name='book_to_date']").val(it.extra.dateTimeToString(toDt));
                }

                it._aviaForm.find("input[name='book_to_date']").parent().removeClass('no-visiblity');
                it._aviaForm.find("input[name='book_to_time']").first().closest(".selectpicker.no-visiblity").removeClass('no-visiblity');
                it._aviaForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('range').DatePickerSetDate([fromDt, toDt]);

                it._aviaForm.find(".add_segment").slideUp(it._o.animationDelay, function() {
                    $(this).addClass("g-hide");
                    typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
                });
                it._aviaForm.find(".multy-leg").addClass("not-in-use").slideUp(it._o.animationDelay, function() {
                    $(this).addClass("g-hide");
                    typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
                });

                it._aviaForm.find(".book-range.g-hide").removeClass("g-hide");
                break;
            case "route":
                it._aviaForm.find("input[name='book_to_date']").parent().addClass('no-visiblity');
                it._aviaForm.find("input[name='book_to_time']").first().closest(".selectpicker").addClass('no-visiblity');
                it._aviaForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('single').DatePickerSetDate(fromDt).val(it.extra.dateTimeToString(fromDt)).trigger("change");

                it._aviaForm.find(".add_segment.g-hide").slideDown(it._o.animationDelay, function () {
                    $(this).removeClass("g-hide");
                    typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
                });

                it._aviaForm.find(".book-range").addClass("g-hide");
                break;
            }
            it.redraw.routeRefresh();
            typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
        });//.first().trigger("change");
        
        it._aviaForm.find(".avia-airport-finder").focusin(function () {
            if ($(this).data('focusTimer')) clearTimeout($(this).data('focusTimer'));
        }).focusout(function () {
            var finder = $(this);
            $(this).data('focusTimer', setTimeout(function () {
                finder.slideUp(it._o.animationDelay, function () {
                    $(this).addClass("g-hide");
                    var item = $(this).closest(".item");
                    if (item.find("input.tt-input:focus").length == 0) item.removeClass("focused");
                });
            }, 100));
        });
        it._aviaForm.find(".avia-airport-finder .button-hide").click(function () {
            $(this).closest(".avia-airport-finder").blur();
            return false;
        });

        it._aviaForm.find(".passengers > .switch-box .switch").click(function () {
            var selectAge = it._aviaForm.find(".select-age");
            if ($(this).is(".opened")) {
                $(this).removeClass("opened");
                selectAge.slideUp(it._o.animationDelay, function () {
                    $(this).addClass("g-hide");
                });
            } else {
                $(this).addClass("opened");
                selectAge.slideDown(it._o.animationDelay, function () {
                    $(this).removeClass("g-hide");
                    $(this).focus();
                });
            }
            return false;
        });

        it._aviaForm.find(".select-age").focusin(function () {
            if ($(this).data('focusTimer')) clearTimeout($(this).data('focusTimer'));
        }).focusout(function () {
            var selectAge = $(this);
            $(this).data('focusTimer', setTimeout(function () {
                selectAge.slideUp(it._o.animationDelay, function () {
                    $(this).addClass("g-hide").siblings(".switch-box").find(".switch.opened").removeClass("opened");
                });
            }, 100));
        });
        it._aviaForm.find(".select-age .button-hide").click(function (e) {
            $(this).closest(".select-age").focus().blur();
            return false;
        });

        it._aviaForm.find(".carriers").focusin(function () {
            var carriersItem = $(this).is(".carriers") ? $(this) : $(this).closest(".carriers");

            if (carriersItem.data('focusTimer')) clearTimeout(carriersItem.data('focusTimer'));

            carriersItem.find(".item").addClass("opened");
            if (carriersItem.find(".carriers-finder.g-hide").length > 0) {
                carriersItem.addClass("z-100").find(".carriers-finder.g-hide").slideDown(it._o.animationDelay, function() {
                    $(this).removeClass("g-hide").closest(".carriers").removeClass("z-100");
                });
            }
        }).focusout(function () {
            var carriersItem = $(this).is(".carriers") ? $(this) : $(this).closest(".carriers");
            carriersItem.data('focusTimer', setTimeout(function () {
                carriersItem.find(".carriers-finder").slideUp(it._o.animationDelay, function () {
                    $(this).addClass("g-hide").siblings(".item").removeClass("opened");
                });
            }, 100));
        }).find(".inside").click(function () {
            var carriersItem = $(this).closest(".carriers");
            if (!carriersItem.find(".carriers-finder").is(".g-hide")) {
                carriersItem.blur();
            }
        });
        it._aviaForm.find(".carriers .button-hide").click(function () {
            $(this).closest(".carriers").blur();
            return false;
        });

        rezOnForm.static.pass_selectPicker.bind(it._aviaForm, it.redraw.setBriefCallback, it.extra.locale);

        //Кнопка продолжить маршрут
        it._aviaForm.find(".add_segment button").click(function () {
            var addingSegment = it._aviaForm.find(".multy-leg.g-hide").first();

            addingSegment.removeClass("not-in-use").slideDown(it._o.animationDelay, function() {
                $(this).removeClass("g-hide");
                typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
            });
            it.redraw.routeRefresh();
                
            var prevSegment = addingSegment.prev();

            //Аэропорт вылета
            if (addingSegment.find(".book-from.tt-input").val() == "") {
                var addingSegmentItem = addingSegment.find(".book-from.tt-input").closest(".item");
                var prevSegmentItem = prevSegment.find(".book-to.tt-input").closest(".item");

                addingSegmentItem.find(".book-from.tt-input").val(
                    prevSegmentItem.find(".book-to.tt-input").first().val()
                );
                if ($.trim(addingSegmentItem.find(".book-from.tt-input").val()) == "") addingSegmentItem.find(".book-from.tt-input").addClass("isEmpty");
                else addingSegmentItem.find(".book-from.tt-input").removeClass("isEmpty");

                addingSegmentItem.find("input[type='hidden']").val(prevSegmentItem.find("input[type='hidden']").val());
                addingSegmentItem.find(".country").html(prevSegmentItem.find(".country").html()).attr("class", prevSegmentItem.find(".country").attr("class"));
                addingSegmentItem.find(".iata").html(prevSegmentItem.find(".iata").html()).attr("class", prevSegmentItem.find(".iata").attr("class"));
                addingSegmentItem.find(".delete").attr("class", prevSegmentItem.find(".delete").attr("class"));
                addingSegmentItem.find(".airport-finder-link ").attr("class", prevSegmentItem.find(".airport-finder-link ").attr("class"));
                    
            }
            return false;
        });

        //Кнопка удалить перелет
        it._aviaForm.find(".remove-leg").click(function () {
            it._aviaForm.find(".multy-leg:not(.g-hide)").last().addClass("not-in-use").slideUp(it._o.animationDelay, function () {
                $(this).addClass("g-hide");
                typeof (updatingHeight) !== 'undefined' && updatingHeight(); //Обновление высоты, если фрейм
            });
            it.redraw.routeRefresh();

            return false;
        });

        //Кнопка Очистить форму
        it._aviaForm.find(".clear_form").click(function () {
            it._aviaForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('single').DatePickerSetDate(new Date()).val(it.extra.dateTimeToString(new Date()));

            it._aviaForm.find("input[name='book_type'][value='roundtrip']").closest("label").trigger("click");
            it._aviaForm.find("input[name='from_iata'],input[name='to_iata']").siblings(".delete").trigger("click");

            it._aviaForm.find(".selectpicker").each(function() {
                $(this).addClass("opened").find(".option").first().trigger("click");
                $(this).removeClass("opened");
            });

            it._aviaForm.find(".passengers .select-age input[type='hidden']").val("0");
            it._aviaForm.find(".passengers .select-age input[type='hidden'][name='psgAdultsCnt']").val("1");

            rezOnForm.static.pass_selectPicker.reset(undefined, it.redraw.setBriefCallback, it.extra.locale);

            it._aviaForm.find(".book-class .gal-btn-group").each(function () {
                $(this).find("label").first().trigger("click");
            });

            it._aviaForm.find(".carriers-finder-inside input[type='hidden'], .carriers-finder-inside .tt-input").val("");
            rezOnForm.prototype.redraw.refreshAircompanies();

            if (it._aviaForm.find("input[name='onlyDirect']:checked").length > 0) it._aviaForm.find("input[name='onlyDirect']").closest("label").trigger("click");

            it._aviaForm.find("input[type='hidden'][name='from_iata']").siblings(".twitter-typeahead").find(".tt-input").focus();

            return false;
        });

        //Кнопка Х на сообщении с ошибкой
        it._aviaForm.off("click", ".item.has-error .error-box .close")
        it._aviaForm.on("click", ".item.has-error .error-box .close", function () {
            $(this).closest(".error-box").slideUp(it._o.animationDelay, function() {
                $(this).html("").closest(".has-error").removeClass("has-error");
            });
            return false;
        });
    }

    rezOnForm.prototype.railwayBind = function() {
        // Поиск аэропортов / городов в основной форме
        it._railwayForm.find('.book-from, .book-to').typeahead({
            minLength: 2
        }, {
            name: "stations-" + it._o.defaultLang,
            displayKey: 'value',
            source: it.dataWork.stationsFinderData.ttAdapter(),
            display: function (data) {
                return data != undefined ? data.Name : null;
            },
            templates: {
                empty: [
                    '<div class="templ-message">',
                    it.extra.locale("NOTHING_FOUND") + '...',
                    '</div>'
                ].join('\n'),
                suggestion: function (data) {
                    var ret = [];
                    if (!!data.countryName && !!data.countryCode) {
                        ret.push(
                        {
                            key: $("<span class='country-separator'><small>" + data.countryName + " (" + data.countryCode + ")</small><span>"),
                            value: undefined
                        });
                    }
                    for (var stationIt = 0; stationIt < data.stations.length; stationIt++) {
                        ret.push({
                            key: data.stations[stationIt].stationName + " <small class='express-code'>" + data.stations[stationIt].stationCode + "</small>",
                            value: {
                                ExpressCode: data.stations[stationIt].stationCode,
                                Name: data.stations[stationIt].stationName,
                                CountryCode: data.countryCode,
                                CountryName: data.countryName
                            }
                        });
                        if (data.stations[stationIt].includeItems && data.stations[stationIt].includeItems.length > 0)
                            for (var inclStat = 0; inclStat < data.stations[stationIt].includeItems.length; inclStat++) {
                                ret.push(
                                {
                                    key: "<span class='item-child" + (inclStat == 0 ? '-first' : '') + "'></span>" +
                                        "<span class='item-text'>" + data.stations[stationIt].includeItems[inclStat].inclName + "</span>" +
                                        " <small class='express-code'>" + data.stations[stationIt].includeItems[inclStat].inclCode + "</small>",
                                    value: {
                                        ExpressCode: data.stations[stationIt].includeItems[inclStat].inclCode,
                                        Name: data.stations[stationIt].includeItems[inclStat].inclName,
                                        CountryCode: data.countryCode,
                                        CountryName: data.countryName
                                    }
                                });
                            }
                    }
                    return ret;
                }
            }
        }).keyup(function (e) {
            if ($.trim($(this).val()) == "") {
                $(this).addClass("isEmpty");
                $(this).closest('.item').find(".delete").addClass("no-visiblity");
            }
            else {
                $(this).removeClass("isEmpty");
                $(this).closest('.item').find(".delete.no-visiblity").removeClass("no-visiblity");
            }
        }).focus(function () {
            var item = $(this).closest('.item');
            item.addClass('focused').removeClass("has-error").find(".error-box").slideUp(it._o.animationDelay);
            item.closest(".column").siblings(".column").find(".item").removeClass("has-error").find(".error-box").slideUp(it._o.animationDelay);
            if ($(this).is(".book-to") && $(this).val() === "") {
                var fromStation = it._railwayForm.find("[name='tshi_station_from']").val();
                $.trim(fromStation) !== "" && $(this).typeahead('query', "fromstation_" + fromStation);
            }
        }).click(function () {
            $(this).select();
        }).blur(function () {
            $(this).closest('.item.focused').removeClass('focused');
            if ($.trim($(this).val()) == "") $(this).trigger("typeahead:queryChanged");
        }).on("typeahead:selected typeahead:autocompleted", function (e, datum) {
            if (datum != undefined) {
                var item = $(this).closest(".item");
                item.find(".inside .express").html(datum.ExpressCode).removeClass("no-visiblity");
                item.find(".inside .delete").removeClass("no-visiblity");

                switch (item.find(".inside input[type='hidden']").val(datum.ExpressCode).attr("name")) {
                    case "tshi_station_from":
                        var sib = item.closest("form").find("input[name='tshi_station_to']");
                        if(sib.val() == "") sib.siblings(".twitter-typeahead").find(".tt-input").focus();
                        break;
                    case "tshi_station_to":
                        item.closest("form").find("input[name='book_from_date']").focus();
                        break;
                }
            }
        }).on("typeahead:dropdown", function (it) {
            var item = $(this).closest('.item');
            item.addClass('opened');
        }).on("typeahead:dropup", function (it) {
            $(this).closest('.item.opened').removeClass('opened');
        }).on("typeahead:queryChanged", function (it, query) {
            var item = $(this).closest('.item');
            item.find(".inside .express").addClass("no-visiblity");
            item.find(".inside input[type='hidden']").val("");
        });

        // Смена типа маршрута // oneway|roundtrip|route
        it._railwayForm.find("input[name='book_type']").change(function () {
            var value = it._railwayForm.find("input[name='book_type']:checked").first().val();

            var fromDt = it.extra.parseDateTime(it._railwayForm.find("input[name='book_from_date'].datepicker").val());
            switch (value) {
                case "oneway":
                    it._railwayForm.find("input[name='book_to_date']").parent().addClass('no-visiblity');
                    it._railwayForm.find("input[name='book_to_time']").first().closest(".selectpicker").addClass('no-visiblity');
                    it._railwayForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('single').DatePickerSetDate(fromDt).val(it.extra.dateTimeToString(fromDt));
                    break;
                case "roundtrip":
                    var toDt = it.extra.parseDateTime(it._railwayForm.find("input[name='book_to_date']").val());
                    if (!fromDt) fromDt = new Date();
                    if (toDt == undefined || fromDt.valueOf() > toDt.valueOf()) {
                        toDt = new Date(fromDt.getTime());
                        toDt.setDate(toDt.getDate() + 2);
                        it._railwayForm.find("input[name='book_to_date']").val(it.extra.dateTimeToString(toDt));
                    }

                    it._railwayForm.find("input[name='book_to_date']").parent().removeClass('no-visiblity');
                    it._railwayForm.find("input[name='book_to_time']").first().closest(".selectpicker.no-visiblity").removeClass('no-visiblity');
                    it._railwayForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('range').DatePickerSetDate([fromDt, toDt]);

                    break;
            }
        }).first().trigger("change");

        //Поменять станции местами
        it._railwayForm.find(".swap").click(function () {
            var itemFrom = it._railwayForm.find("input[name='tshi_station_from']").closest(".item");
            var itemTo = it._railwayForm.find("input[name='tshi_station_to']").closest(".item");

            var fromInput = itemFrom.find(".book-from.tt-input");
            var fromVal = fromInput.val();

            var toInput = itemTo.find(".book-to.tt-input");
            
            fromInput.typeahead('val', toInput.val()).trigger("keyup");
            toInput.typeahead('val', fromVal).trigger("keyup");


            var expressFrom = itemFrom.find(".express");
            var expressFromVal = expressFrom.text();
            var expressFromClass = expressFrom.attr("class");

            var expressTo = itemTo.find(".express");
            expressFrom.text(expressTo.text());
            expressFrom.attr("class", expressTo.attr("class"));
            expressTo.text(expressFromVal);
            expressTo.attr("class", expressFromClass);


            var hiddenFrom = itemFrom.find("input[name='tshi_station_from']");
            var hiddenFromVal = hiddenFrom.val();
            var hiddenTo = itemTo.find("input[name='tshi_station_to']");
            hiddenFrom.val(hiddenTo.val());
            hiddenTo.val(hiddenFromVal);
            
            return false;
        });

        //Кнопка Очистить форму
        it._railwayForm.find(".clear_form").click(function () {
            it._railwayForm.find("input[name='book_from_date'].datepicker").DatePickerChangeMode('single').DatePickerSetDate(new Date()).val(it.extra.dateTimeToString(new Date()));

            it._railwayForm.find("input[name='book_type'][value='oneway']").closest("label").trigger("click");
            it._railwayForm.find("input[name='tshi_station_from'],input[name='tshi_station_to']").siblings(".delete").trigger("click");

            it._railwayForm.find(".selectpicker").each(function () {
                $(this).addClass("opened").find(".option").first().trigger("click");
                $(this).removeClass("opened");
            });

            it._railwayForm.find("input[type='hidden'][name='tshi_station_from']").siblings(".twitter-typeahead").find(".tt-input").focus();

            return false;
        });

        //Отправка формы поиска ЖД билетов
        it._railwayForm.submit(function () {
            return it.validation.railForm();
        });
    }

    // Установка всех локализаций
    rezOnForm.prototype.localeBind = function () {
        it._form.find("*[data-local='true']").each(function () {
            if (!!$(this).attr("data-localText")) {
                $(this).html(it.extra.locale($(this).attr("data-localText")));
            }
            if (!!$(this).attr("data-localPlaceholder")) {
                $(this).attr("placeholder", it.extra.locale($(this).attr("data-localPlaceholder")));
            }
            if (!!$(this).attr("data-localTitle")) {
                $(this).attr("title", it.extra.locale($(this).attr("data-localTitle")));
            }
        });
    }

    //-----------------------------------------
    // Инициализация
    //-----------------------------------------
    rezOnForm.prototype.init = function () {
        $.mask.definitions['~'] = '[0123]';
        $.mask.definitions['#'] = '[0123456789]';
        $.mask.definitions['$'] = '[01]';

        this._o.projectUrl != "/" && this.localeBind();

        var neededTabs = [];
        if (this._o.formType != "all") neededTabs.push(this._o.formType);
        else neededTabs = ["avia", "railway"];

        if (neededTabs.length > 1) {
            this._form.find(".rez-forms-links").removeClass("g-hide");
            var frstTab = this._o.defaultFormTab || neededTabs[0];
        }
        for (var n = 0; n < neededTabs.length; n++) {
            switch (neededTabs[n]) {
                case "avia":
                    this._form.find(".rez-forms-links a.rez-form-link[href='#" + this._aviaForm.attr("id") + "']").removeClass("g-hide").addClass(frstTab == neededTabs[n] ? "active" : "");
                    if (neededTabs.length == 1 || frstTab == neededTabs[n]) this._aviaForm.removeClass("g-hide");
                    rezOnForm.static.pass_selectPicker.reset(undefined, this.redraw.setBriefCallback, this.extra.locale);

                    this.dataWork.airporFinderData = this.dataWork.airporFinderData();
                    this.dataWork.airporFinderData.initialize();

                    this.dataWork.countriesData = this.dataWork.countriesData();
                    this.dataWork.countriesData.initialize();

                    this.dataWork.carriersData = this.dataWork.carriersData();
                    this.dataWork.carriersData.initialize();

                    this.bindDateRange_forForm(it._aviaForm);
                    this.aviaBind();
                    
                    if (this._o.projectUrl != "/")
                        this._aviaForm.attr("method", "POST")
                            .attr("action", this.extra.remoteUrl() + "/AirTickets/ModuleSearch")
                            .attr("target", this._o.formTarget || "_blank");
                    break;
                case "railway":
                    this._form.find(".rez-forms-links a.rez-form-link[href='#" + this._railwayForm.attr("id") + "']").removeClass("g-hide").addClass(frstTab == neededTabs[n] ? "active" : "");
                    if (neededTabs.length == 1 || frstTab == neededTabs[n]) this._railwayForm.removeClass("g-hide");

                    this.dataWork.stationsFinderData = this.dataWork.stationsFinderData();
                    this.dataWork.stationsFinderData.initialize();

                    this.bindDateRange_forForm(it._railwayForm);
                    this.railwayBind();

                    if (this._o.projectUrl != "/")
                        this._railwayForm.attr("method", "POST")
                            .attr("action", this.extra.remoteUrl() + "/RailwayTickets/ModuleSearch")
                            .attr("target", this._o.formTarget || "_blank");
                    break;
            }
        }


        this.bind();

        this.dataWork.setDefaults(this._o);
    }
    this.init();
    //-----------------------------------------
};
(function ($) {
    $.fn.rezOnForm = function (o) {
        if(!this.data('rezOnForm')) this.data('rezOnForm', new rezOnForm($(this), o || window.rezonOpt));
        return this;
    };
})(jQuery);

//-----------------------------------------
// Статические свойства / методы
//----------------------------------------
rezOnForm.static = {};

rezOnForm.staticCountriesData = function (remoteUrl) {
    return new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.label + " " + datum.code);
        },
        limit: 1000,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: remoteUrl + '/HelperAsync/LookupCountries?v=3',
            filter: function (list) {
                return list;
            }
        }
    });
}

rezOnForm.staticGalSubstringMatcher = function (strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            for (var key in str) {
                if (str.hasOwnProperty(key)) {
                    if (substrRegex.test(str[key])) {
                        matches.push(str);
                        break;
                    }
                }
            }
        });
        cb(matches);
    };
};


//-----------------------------------------
rezOnForm.static.pass_selectPicker = {};

rezOnForm.static.pass_selectPicker.bind = function (form, setBriefCallback, localeFunction) {
    // Управление списками количественного выбора
    form.find(".passengers .radio-supplement label").hover(function () {
        if ($(this).is(".none")) {
            var setNumber = $(this).parents(".radio-supplement").siblings("input[type='hidden']").val();
            $(this).parents(".radio-supplement").find("label").each(function () {
                if ($(this).text() <= setNumber) {
                    $(this).addClass("fade");
                }
            });
        } else {
            var curNumber = parseInt($(this).text());
            $(this).parents(".radio-supplement").find("label").each(function () {
                if (parseInt($(this).text()) < curNumber) {
                    $(this).removeClass("lessed less-bl").addClass("less");
                } else {
                    if (parseInt($(this).text()) > curNumber) {
                        $(this).removeClass("less active lessed less-bl");
                    } else {
                        $(this).removeClass("less-bl").addClass("lessed");
                    }
                }
            });
        }
    }).mouseleave(function () {
        rezOnForm.static.pass_selectPicker.stylize($(this).closest(".radio-supplement"));
    }).click(function () {
        if (!$(this).is(".disabled")) {
            $(this).parents(".radio-supplement").siblings("input[type='hidden']").val($(this).text());
            rezOnForm.static.pass_selectPicker.setBrief(false, setBriefCallback, localeFunction);
        }
        return false;
    });

    form.find(".passengers .select-age a.reset").click(function() {
        $(this).siblings("input[type='hidden']").val(0);
        rezOnForm.static.pass_selectPicker.reset(false, setBriefCallback, localeFunction);
        return false;
    });

    form.find(".passengers .radio-supplement").each(function () {
        $(this).find("label").last().mouseover().mouseleave();
    });
}
// Отображение элементов списка количественного выбора в зависимости от установленного значения
rezOnForm.static.pass_selectPicker.stylize = function (elem) {
    var setNumber = parseInt(elem.siblings("input").val());
    elem.find("label").each(function () {
        var itNmb = parseInt($(this).text());
        if (itNmb < setNumber) {
            $(this).removeClass("active fade lessed").addClass("less-bl");
        } else {
            if (itNmb > setNumber) {
                $(this).removeClass("less active fade lessed less-bl");
            } else {
                $(this).removeClass("fade lessed less less-bl").addClass("active");
            }
        }
    });
};
// Установка значений по умолчанию для пассажиров
rezOnForm.static.pass_selectPicker.reset = function (el, setBriefCallback, localeFunction) {
    var selectAge = el || $(".select-age").first();
    selectAge.find(".radio-supplement").each(function () {
        rezOnForm.static.pass_selectPicker.stylize($(this));
    });
    rezOnForm.static.pass_selectPicker.setBrief(selectAge, setBriefCallback, localeFunction);
};
rezOnForm.static.pass_selectPicker.setBrief = function (el, setBriefCallback, localeFunction) {
    var selectAge = el || $(".select-age").first();

    typeof setBriefCallback == "function" && setBriefCallback(selectAge);


    rezOnForm.static.pass_selectPicker.defaultCheck(selectAge);

    rezOnForm.static.pass_selectPicker.validate(selectAge, localeFunction);
};
rezOnForm.static.pass_selectPicker.defaultCheck = function (el) {
    var selectAge = el || $(".select-age").first();
    selectAge.find("input[type='hidden']").each(function () {
        var isDefault = false;

        if ($(this).val() === "0") {
            isDefault = true;
        }
        var reset = $(this).siblings(".reset");
        if (isDefault) {
            reset.addClass("no-visiblity");
        } else {
            reset.removeClass("no-visiblity");
        }

        //Issue #214 fix  -- При клике на очистку категории в главной форме - схлопывается попап
        if (reset.is(":focus")) selectAge.focus();
    });
};
//Валидация количества пассажиров
rezOnForm.static.pass_selectPicker.validate = function (el, localeFunction) {
    var ager = el || $(".select-age").first();
    var msgs = [];

    // Проверка общего кол-ва
    var sum = 0;

    ager.find("input[type='hidden']").each(function () {
        sum += parseInt($(this).val());
    });

    if (sum == 0) {
        msgs.push(localeFunction("VALIDATE_FORM_SEARCH_MESSAGE_2"));
    }

    ager.closest(".passengers").removeClass("has-error");
    ager.find(".has-error").removeClass("has-error");
    ager.find(".radio-supplement label.disabled").removeClass("disabled");

    var availableCountOfPassengers = 6 - sum;

    var availableInfaintsCount = parseInt(ager.find("input[name='psgYouthCnt']").val()) +
        parseInt(ager.find("input[name='psgAdultsCnt']").val()) +
        parseInt(ager.find("input[name='psgOldCnt']").val()) -
        parseInt(ager.find("input[name='psgInfantsCnt']").val()) -
        parseInt(ager.find("input[name='psgInfantsNSCnt']").val());
    if (availableInfaintsCount < 0) {
        $(this).siblings(".radio-supplement").addClass("has-error");
        msgs.push(localeFunction("VALIDATE_FORM_SEARCH_MESSAGE_3"));
    } else {
        ager.find("input[name='psgInfantsCnt'], input[name='psgInfantsNSCnt']").each(function() {
            var skip = 0;
            $(this).siblings(".radio-supplement").find("label").each(function() {
                if ($(this).is(".less") || $(this).is(".active") || $(this).is(".lessed")) skip++;
                else if (parseInt($(this).text()) > availableInfaintsCount + skip) {
                    $(this).addClass("disabled");
                }
            });
        });
    }

    ager.find(".radio-supplement").each(function() {
        var skip = 0;
        $(this).find("label").each(function() {
            if ($(this).is(".less") || $(this).is(".active") || $(this).is(".lessed")) skip++;
            else if (parseInt($(this).text()) > availableCountOfPassengers + skip) {
                $(this).addClass("disabled");
            }
        });
    });

    

    var ret = msgs.length == 0;

    var messageBox = ager.find(".error-box").html("");
    if (ret) 
    {
        messageBox.slideUp(300);
    }
    else {
        messageBox.append($.map(msgs, function(itm, i) {
            return $("<label/>").html(itm);
        }));
        messageBox.slideDown(300);
        ager.closest(".passengers").addClass("has-error");

    }

    return ret;
};