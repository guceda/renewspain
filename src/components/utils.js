export default {

    ISO: {
        toMillis: (t) => new Date(t).getTime()
    },
    period: {
        toMillis: (p) => {
            switch (p) {
                case 'hour':
                    return 3600000;
                case 'day':
                    return 86400000;
                case 'month': 
                    return 2629800000;
                case 'year':
                    return 31536000000; 
            }
        }
    },

}