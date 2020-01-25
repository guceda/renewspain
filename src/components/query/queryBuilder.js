'use strict';

const defaultParams = {
    origin: "https://apidatos.ree.es",
    //pathname: "/es/datos/generacion/estructura-generacion",
    language: "es",
    category: "generacion",
    subcategory: "estructura-generacion",
    //search: "?start_date=2019-01-01T00:00&end_date=2020-01-01T00:00&time_trunc=month",
    startDate: '2019-01-01T00:00',
    endDate: '2020-01-01T00:00',
    groupBy: 'month'
}


export default {
    build: (params) => {
        const {
            origin,
            language,
            category,
            subcategory,
            startDate,
            endDate,
            groupBy,
        } = { ...defaultParams, ...params };
        return `${origin}/${language}/datos/${category}/${subcategory}?start_date=${startDate}&end_date=${endDate}&time_trunc=${groupBy}`;
    }
}