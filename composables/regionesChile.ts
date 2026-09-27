// composables/regionesChile.ts
// ─────────────────────────────────────────
// Regiones y comunas de Chile (norte a sur) para el selector de ubicación del panel.

export interface RegionChile {
  nombre: string // Nombre que se guarda y se muestra en la web
  corto: string  // Nombre corto para el selector
  comunas: string[]
}

export const REGION_POR_DEFECTO = 'Región de Los Ríos'
export const COMUNA_POR_DEFECTO = 'Valdivia'

export const REGIONES_CHILE: RegionChile[] = [
  {
    nombre: 'Región de Arica y Parinacota',
    corto: 'XV · Arica y Parinacota',
    comunas: ['Arica', 'Camarones', 'General Lagos', 'Putre']
  },
  {
    nombre: 'Región de Tarapacá',
    corto: 'I · Tarapacá',
    comunas: ['Alto Hospicio', 'Camiña', 'Colchane', 'Huara', 'Iquique', 'Pica', 'Pozo Almonte']
  },
  {
    nombre: 'Región de Antofagasta',
    corto: 'II · Antofagasta',
    comunas: ['Antofagasta', 'Calama', 'María Elena', 'Mejillones', 'Ollagüe', 'San Pedro de Atacama', 'Sierra Gorda', 'Taltal', 'Tocopilla']
  },
  {
    nombre: 'Región de Atacama',
    corto: 'III · Atacama',
    comunas: ['Alto del Carmen', 'Caldera', 'Chañaral', 'Copiapó', 'Diego de Almagro', 'Freirina', 'Huasco', 'Tierra Amarilla', 'Vallenar']
  },
  {
    nombre: 'Región de Coquimbo',
    corto: 'IV · Coquimbo',
    comunas: ['Andacollo', 'Canela', 'Combarbalá', 'Coquimbo', 'Illapel', 'La Higuera', 'La Serena', 'Los Vilos', 'Monte Patria', 'Ovalle', 'Paihuano', 'Punitaqui', 'Río Hurtado', 'Salamanca', 'Vicuña']
  },
  {
    nombre: 'Región de Valparaíso',
    corto: 'V · Valparaíso',
    comunas: ['Algarrobo', 'Cabildo', 'Calera', 'Calle Larga', 'Cartagena', 'Casablanca', 'Catemu', 'Concón', 'El Quisco', 'El Tabo', 'Hijuelas', 'Isla de Pascua', 'Juan Fernández', 'La Cruz', 'La Ligua', 'Limache', 'Llaillay', 'Los Andes', 'Nogales', 'Olmué', 'Panquehue', 'Papudo', 'Petorca', 'Puchuncaví', 'Putaendo', 'Quillota', 'Quilpué', 'Quintero', 'Rinconada', 'San Antonio', 'San Esteban', 'San Felipe', 'Santa María', 'Santo Domingo', 'Valparaíso', 'Villa Alemana', 'Viña del Mar', 'Zapallar']
  },
  {
    nombre: 'Región Metropolitana',
    corto: 'RM · Metropolitana de Santiago',
    comunas: ['Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura']
  },
  {
    nombre: "Región de O'Higgins",
    corto: "VI · O'Higgins",
    comunas: ['Chépica', 'Chimbarongo', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'La Estrella', 'Las Cabras', 'Litueche', 'Lolol', 'Machalí', 'Malloa', 'Marchigüe', 'Mostazal', 'Nancagua', 'Navidad', 'Olivar', 'Palmilla', 'Paredones', 'Peralillo', 'Peumo', 'Pichidegua', 'Pichilemu', 'Placilla', 'Pumanque', 'Quinta de Tilcoco', 'Rancagua', 'Rengo', 'Requínoa', 'San Fernando', 'San Vicente', 'Santa Cruz']
  },
  {
    nombre: 'Región del Maule',
    corto: 'VII · Maule',
    comunas: ['Cauquenes', 'Chanco', 'Colbún', 'Constitución', 'Curepto', 'Curicó', 'Empedrado', 'Hualañé', 'Licantén', 'Linares', 'Longaví', 'Maule', 'Molina', 'Parral', 'Pelarco', 'Pelluhue', 'Pencahue', 'Rauco', 'Retiro', 'Río Claro', 'Romeral', 'Sagrada Familia', 'San Clemente', 'San Javier', 'San Rafael', 'Talca', 'Teno', 'Vichuquén', 'Villa Alegre', 'Yerbas Buenas']
  },
  {
    nombre: 'Región de Ñuble',
    corto: 'XVI · Ñuble',
    comunas: ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay']
  },
  {
    nombre: 'Región del Biobío',
    corto: 'VIII · Biobío',
    comunas: ['Alto Biobío', 'Antuco', 'Arauco', 'Cabrero', 'Cañete', 'Chiguayante', 'Concepción', 'Contulmo', 'Coronel', 'Curanilahue', 'Florida', 'Hualpén', 'Hualqui', 'Laja', 'Lebu', 'Los Álamos', 'Los Ángeles', 'Lota', 'Mulchén', 'Nacimiento', 'Negrete', 'Penco', 'Quilaco', 'Quilleco', 'San Pedro de la Paz', 'San Rosendo', 'Santa Bárbara', 'Santa Juana', 'Talcahuano', 'Tirúa', 'Tomé', 'Tucapel', 'Yumbel']
  },
  {
    nombre: 'Región de La Araucanía',
    corto: 'IX · La Araucanía',
    comunas: ['Angol', 'Carahue', 'Cholchol', 'Collipulli', 'Cunco', 'Curacautín', 'Curarrehue', 'Ercilla', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Purén', 'Renaico', 'Saavedra', 'Temuco', 'Teodoro Schmidt', 'Toltén', 'Traiguén', 'Victoria', 'Vilcún', 'Villarrica']
  },
  {
    nombre: 'Región de Los Ríos',
    corto: 'XIV · Los Ríos',
    comunas: ['Corral', 'Futrono', 'La Unión', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli', 'Río Bueno', 'Valdivia']
  },
  {
    nombre: 'Región de Los Lagos',
    corto: 'X · Los Lagos',
    comunas: ['Ancud', 'Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Cochamó', 'Curaco de Vélez', 'Dalcahue', 'Fresia', 'Frutillar', 'Futaleufú', 'Hualaihué', 'Llanquihue', 'Los Muermos', 'Maullín', 'Osorno', 'Palena', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Puqueldón', 'Purranque', 'Puyehue', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Río Negro', 'San Juan de la Costa', 'San Pablo']
  },
  {
    nombre: 'Región de Aysén',
    corto: 'XI · Aysén',
    comunas: ['Aysén', 'Chile Chico', 'Cisnes', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', "O'Higgins", 'Río Ibáñez', 'Tortel']
  },
  {
    nombre: 'Región de Magallanes',
    corto: 'XII · Magallanes',
    comunas: ['Antártica', 'Cabo de Hornos', 'Laguna Blanca', 'Natales', 'Porvenir', 'Primavera', 'Punta Arenas', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres del Paine']
  }
]

export function comunasDeRegion(region: string): string[] {
  return REGIONES_CHILE.find(r => r.nombre === region)?.comunas ?? []
}

export interface UbicacionPartes {
  region: string
  comuna: string      // '' si no está en la lista (se usa comunaOtra)
  comunaOtra: string
  sector: string
}

// Arma el texto que se guarda: "Sector, Comuna, Región"
export function componerUbicacion(u: UbicacionPartes): string {
  const comuna = u.comuna || u.comunaOtra.trim()
  return [u.sector.trim(), comuna, u.region].filter(Boolean).join(', ')
}

const normalizar = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

// Interpreta un texto guardado ("Niebla, Valdivia, Región de Los Ríos" o "Puerto Montt")
export function separarUbicacion(texto: string): UbicacionPartes {
  const vacio: UbicacionPartes = {
    region: REGION_POR_DEFECTO,
    comuna: COMUNA_POR_DEFECTO,
    comunaOtra: '',
    sector: ''
  }
  if (!texto?.trim()) return vacio

  const partes = texto.split(',').map(p => p.trim()).filter(Boolean)
  const sinPais = partes.filter(p => normalizar(p) !== 'chile')

  // 1) Buscar región escrita en el texto
  let region = REGIONES_CHILE.find(r => sinPais.some(p => normalizar(p) === normalizar(r.nombre)))
  let resto = region ? sinPais.filter(p => normalizar(p) !== normalizar(region!.nombre)) : sinPais

  // 2) Buscar comuna (en la región encontrada o en todas)
  const candidatas = region ? [region] : REGIONES_CHILE
  for (let i = resto.length - 1; i >= 0; i--) {
    for (const r of candidatas) {
      const comuna = r.comunas.find(c => normalizar(c) === normalizar(resto[i]))
      if (comuna) {
        return {
          region: r.nombre,
          comuna,
          comunaOtra: '',
          sector: resto.filter((_, j) => j !== i).join(', ')
        }
      }
    }
  }

  // 3) Sin comuna reconocida: se conserva el texto como "otra"
  return {
    region: region?.nombre ?? REGION_POR_DEFECTO,
    comuna: '',
    comunaOtra: region ? resto.join(', ') : texto,
    sector: ''
  }
}
