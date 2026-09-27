// composables/servicios.ts
// ─────────────────────────────────────────
// Servicios de la empresa: una sola fuente para /servicios, la sección del inicio,
// el pie de página y los schemas SEO.

export interface ItemServicio {
  titulo: string
  desc: string
}

export interface ServicioEmpresa {
  id: string
  num: string
  titulo: string        // Título completo (H2/H3)
  corto: string         // Nombre corto (pestañas, footer)
  badge: string
  desc: string          // Resumen de una línea (tarjeta)
  intro: string         // Párrafo introductorio (sección del inicio)
  icono: string         // Trazos SVG 24x24
  items: ItemServicio[]
  beneficios: string[]
}

export const SERVICIOS: ServicioEmpresa[] = [
  {
    id: 'sanitario',
    num: '01',
    titulo: 'Proyectos Sanitarios',
    corto: 'Sanitarios',
    badge: 'Suralis · Aguas Décima · Servicio de Salud',
    desc: 'Proyectos de agua potable, alcantarillado y gas, con la gestión completa ante las empresas sanitarias y el Servicio de Salud.',
    intro: '¿Necesitas construir o regularizar tus instalaciones sanitarias? Contamos con los profesionales para desarrollar, gestionar y aprobar tu proyecto sanitario, tanto en zonas urbanas como rurales.',
    icono: '<path d="M12 2.5s-6 6.6-6 11a6 6 0 0012 0c0-4.4-6-11-6-11z"/><path d="M9 14.5a3 3 0 003 3"/>',
    items: [
      { titulo: 'Proyectos de agua potable', desc: 'Diseño de proyectos de agua potable y alcantarillado para sectores urbanos y rurales, incluidos sistemas de impulsión y alcantarillados particulares.' },
      { titulo: 'Instalaciones de gas', desc: 'Proyectos e instalaciones de gas para viviendas y locales, según la normativa vigente.' },
      { titulo: 'Gestión ante empresas sanitarias y Servicio de Salud', desc: 'Ingreso, seguimiento y aprobación de proyectos ante Suralis, Aguas Décima y/o el Servicio de Salud respectivo.' },
      { titulo: 'Certificados de dotación', desc: 'Tramitación de certificados de dotación de agua potable y alcantarillado ante Suralis y/o Aguas Décima.' }
    ],
    beneficios: [
      'Cobertura en zonas urbanas y rurales',
      'Gestión completa ante las empresas sanitarias',
      'Tramitación ante el Servicio de Salud',
      'Un solo equipo de principio a fin'
    ]
  },
  {
    id: 'electrico',
    num: '02',
    titulo: 'Servicios Eléctricos',
    corto: 'Eléctricos',
    badge: 'Certificación SEC',
    desc: 'Instalaciones eléctricas domiciliarias e industriales con certificación SEC.',
    intro: '¿Necesitas instalaciones eléctricas nuevas o quieres mejorar, renovar o ampliar tu red eléctrica? Entregamos servicios eléctricos con seguridad, respaldo y calidad técnica en la Región de Los Ríos.',
    icono: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    items: [
      { titulo: 'Instalaciones nuevas', desc: 'Instalaciones eléctricas, tableros y proyectos normados según la legislación vigente.' },
      { titulo: 'Ampliaciones eléctricas', desc: 'Aumentos de capacidad y ampliaciones de la red eléctrica de tu vivienda o local.' },
      { titulo: 'Certificaciones TE1', desc: 'Declaración de la instalación ante la SEC con profesionales y técnicos autorizados.' },
      { titulo: 'Empalmes eléctricos', desc: 'Solicitud, ejecución y modificación de empalmes ante la distribuidora eléctrica.' }
    ],
    beneficios: [
      'Certificación TE1 incluida',
      'Profesionales autorizados SEC',
      'Garantía en todos los trabajos',
      'Materiales de primera calidad'
    ]
  },
  {
    id: 'regularizacion',
    num: '03',
    titulo: 'Ley de Regularización de Construcciones',
    corto: 'Regularizaciones',
    badge: 'Ley N° 20.898 · Ley del Mono',
    desc: 'Regularizamos construcciones existentes de forma simplificada: permiso y recepción en un solo trámite.',
    intro: '¿Necesitas regularizar tu vivienda, un local comercial o un recinto de equipamiento comunitario? Te ayudamos a obtener seguridad jurídica y tranquilidad con un trámite simplificado.',
    icono: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 13l2 2 4-4"/>',
    items: [
      { titulo: 'Viviendas', desc: 'Regularización de viviendas y ampliaciones construidas sin permiso municipal.' },
      { titulo: 'Locales comerciales', desc: 'Regularización de locales comerciales para operar con la documentación al día.' },
      { titulo: 'Equipamiento comunitario', desc: 'Sedes sociales, juntas de vecinos y otros recintos de uso comunitario.' },
      { titulo: 'Gestión municipal completa', desc: 'Planos, documentación técnica y tramitación ante la Dirección de Obras Municipales.' }
    ],
    beneficios: [
      'Permiso y recepción en un solo trámite',
      'Menos documentos que una regularización tradicional',
      'Evita multas y órdenes de demolición',
      'Seguridad jurídica para tu propiedad'
    ]
  },
  {
    id: 'permisos',
    num: '04',
    titulo: 'Permisos de Edificación',
    corto: 'Permisos',
    badge: 'Dirección de Obras Municipales',
    desc: 'Gestión completa de permisos y recepciones ante la Dirección de Obras Municipales (DOM).',
    intro: '¿Vas a construir, ampliar o necesitas cerrar tu obra con la recepción municipal? Preparamos los planos y el expediente, y hacemos el seguimiento ante la DOM hasta su aprobación.',
    icono: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/>',
    items: [
      { titulo: 'Levantamiento de construcción existente', desc: 'Levantamiento arquitectónico de lo construido como base para regularizar o ampliar.' },
      { titulo: 'Permiso de obra nueva', desc: 'Planos, expediente y tramitación del permiso de edificación para construcciones nuevas.' },
      { titulo: 'Obra menor', desc: 'Permisos para ampliaciones y modificaciones de menor escala.' },
      { titulo: 'Certificados de recepción', desc: 'Solicitud y seguimiento de la recepción final de la obra ante la DOM.' }
    ],
    beneficios: [
      'Expedientes completos desde el inicio',
      'Seguimiento hasta la aprobación',
      'Un solo interlocutor ante la DOM',
      'Asesoría en cada etapa'
    ]
  },
  {
    id: 'topografia',
    num: '05',
    titulo: 'Topografía',
    corto: 'Topografía',
    badge: 'Levantamientos de precisión',
    desc: 'Levantamientos topográficos con equipos de precisión para proyectos, subdivisiones y deslindes.',
    intro: '¿Vas a diseñar, subdividir o aclarar los límites de tu terreno? Realizamos levantamientos topográficos con equipos de precisión y entregamos planos listos para tus trámites.',
    icono: '<path d="M3 20l6-12 4 7 3-5 5 10z"/><path d="M3 20h18"/>',
    items: [
      { titulo: 'Curvas de nivel', desc: 'Levantamientos planialtimétricos con curvas de nivel para diseñar sobre el terreno real.' },
      { titulo: 'Subdivisiones', desc: 'Levantamientos y planos para subdividir terrenos urbanos y rurales.' },
      { titulo: 'Rectificación de deslindes', desc: 'Medición y plano para corregir o aclarar los límites de tu propiedad.' },
      { titulo: 'Replanteos', desc: 'Traspaso de los planos al terreno para ubicar ejes y fundaciones antes de construir.' }
    ],
    beneficios: [
      'Equipos de precisión',
      'Planos listos para tus trámites',
      'Terrenos urbanos y rurales',
      'Asesoría para tus trámites'
    ]
  },
  {
    id: 'construccion',
    num: '06',
    titulo: 'Construcción General',
    corto: 'Construcción',
    badge: 'Obra completa',
    desc: 'Ejecución de obras completas, desde los cimientos hasta la entrega final.',
    intro: 'Construimos tu casa o proyecto de principio a fin, coordinando cada especialidad y cuidando los detalles hasta la entrega.',
    icono: '<path d="M2 20h20M5 20V10l7-5 7 5v10"/><path d="M9 20v-6h6v6"/>',
    items: [
      { titulo: 'Obras nuevas', desc: 'Construcción de viviendas y proyectos desde los cimientos.' },
      { titulo: 'Remodelaciones', desc: 'Renovación de espacios interiores y exteriores.' },
      { titulo: 'Ampliaciones', desc: 'Nuevos recintos integrados a tu construcción existente.' },
      { titulo: 'Terminaciones', desc: 'Revestimientos, pinturas y detalles finales.' }
    ],
    beneficios: [
      'Coordinación de todas las especialidades',
      'Supervisión en obra',
      'Materiales de calidad',
      'Entrega con documentación al día'
    ]
  }
]
