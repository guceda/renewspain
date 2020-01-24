
export default {
    children: {
        name: 'categoría',
        children: {
            balance: {
                name: 'balance',
                children: ['balance-electrico'],
            },
            demanda: {
                name: 'demanda',
                children: [
                    'evolucion',
                    'variacion-componentes',
                    'variacion-componentes-movil',
                    'ire-general',
                    'ire-industria',
                    'ire-servicios',
                    'demanda-maxima-diaria',
                    'demanda-maxima-horaria',
                    'perdidas-transporte',
                    'potencia-maxima-instantanea',
                    'ire-general-media',               
                    'potencia-maxima-instantanea-variacion',
                    'potencia-maxima-instantanea-variacion-historico',
                    'demanda-tiempo-real',
                    'variacion-demanda'
                ],
            },
            generacion: {
                name: 'generación',
                children: [
                    'estructura-generacion',
                    'evolucion-renovable-no-renovable',
                    'estructura-renovables',
                    'estructura-generacion-emisiones-asociadas',
                    'evolucion-estructura-generacion-emisiones-asociadas',
                    'no-renovables-detalle-emisiones-CO2',
                    'maxima-renovable',
                    'maxima-renovable-historico',
                    'maxima-sin-emisiones-historico'
                ],
            },
            intercambios: {
                name: 'intercambios',
                children: [
                    'francia-frontera',
                    'portugal-frontera',
                    'marruecos-frontera',
                    'andorra-frontera',
                    'francia-frontera-programado',
                    'portugal-frontera-programado',
                    'marruecos-frontera-programado',
                    'andorra-frontera-programado',
                    'enlace-baleares',
                    'frontera-fisicos',
                    'frontera - programados'
                ],
            },
            transporte: {
                name: 'transporte',
                children: [
                    'energia-no-suministrada-ens',
                    'indice-indisponibilidad',
                    'tiempo-interrupcion-medio-tim',
                    'kilometros-lineas',
                    'ens-tim',
                    'indice - disponibilidad - total'
                ],
            },
            mercados: {
                name: 'mercados',
                children: [
                    'componentes-precio-energia-cierre-desglose',
                    'componentes-precio',
                    'energia-gestionada-servicios-ajuste',
                    'energia-restricciones',
                    'precios-restricciones',
                    'reserva-potencia-adicional',
                    'banda-regulacion-secundaria',
                    'energia-precios-regulacion-secundaria',
                    'energia-precios-regulacion-terciaria',
                    'energia-precios-gestion-desvios',
                    'coste-servicios-ajuste',
                    'volumen-energia-servicios-ajuste-variacion',
                    'precios-mercados-tiempo-real'
                ],
            },
        }
    }
};
