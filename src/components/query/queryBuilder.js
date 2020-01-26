'use strict';

const MAX_HOUR = 2629800000; // One month in milliseconds
const MAX_DAY = 31556952000; // One year in milliseconds

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

const parser = (p) => {
    return `${p.origin}/${p.language}/datos/${p.category}/${p.subcategory}?start_date=${p.from}&end_date=${p.to}&time_trunc=${p.groupBy}`;
}

const build = (params) => {
    const p = { ...defaultParams, ...params };
    // if groupBy === hour, entre el from y el to no puede haber más de un mes, si lo hay, hacemos múltiples llamadas
    // if groupBy === day, entre el from y el to no puede haber más de un año, si lo hay, hacemos múltiples llamadas
    switch (p.groupBy) {
        case ('hour'):
            if(new Date(p.to) - new Date(p.from) > MAX_HOUR) {
                console.log('Splitting query');
                let itfrom = new Date(p.from).getTime();
                let itto = Infinity;
                const qs = [];
                while(itfrom < new Date(p.to).getTime()) {
                    itto = itfrom + MAX_DAY;
                    qs.push(parser({...p, from:new Date(itfrom).toISOString(), to:new Date(itto).toISOString()}))
                    itfrom = itto;
                }
                return qs;
            } else {
                return [parser(p)];
            }
            break;
        case ('day'):
            if(new Date(p.to) - new Date(p.from) > MAX_DAY) {
                console.log('Splitting query');
                let itfrom = new Date(p.from).getTime();
                let itto = Infinity;
                const qs = [];
                while(itfrom < new Date(p.to).getTime()) {
                    itto = itfrom + MAX_DAY;
                    qs.push(parser({...p, from:new Date(itfrom).toISOString(), to:new Date(itto).toISOString()}))
                    itfrom = itto;
                }
                return qs;
            } else {
                return [parser(p)];
            }
            break;
        case ('month'):
            break;
        case ('year'):
            break;
    }
}

export default {
    build: build
}