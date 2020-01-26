'use strict';

const defaultParams = {
    origin: "https://apidatos.ree.es",
    //pathname: "/es/datos/generacion/estructura-generacion",
    language: "es",
    category: "generacion",
    subcategory: "estructura-generacion",
    //search: "?start_date=2019-01-01T00:00&end_date=2020-01-01T00:00&time_trunc=month",
    from: '2019-01-01T00:00',
    to: '2020-01-01T00:00',
    groupBy: 'month'
}


export default {
    build: (params) => {
        const {
            origin,
            language,
            category,
            subcategory,
            from,
            to,
            groupBy,
        } = { ...defaultParams, ...params };
        return `${origin}/${language}/datos/${category}/${subcategory}?start_date=${from}&end_date=${to}&time_trunc=${groupBy}`;
    }
}