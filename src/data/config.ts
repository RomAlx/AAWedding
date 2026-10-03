/**
 * Единственный источник текстов, адресов и ссылок.
 * Правится вручную. Каждое место — один раз в `places`.
 */

export const places = {
  opernyDom: {
    name: 'Оперный дом Царицыно',
    address: 'Оперный дом в парке Царицыно',
    mapUrl: 'https://yandex.ru/maps/-/CXaTF022',
    directions:
      'Приезжайте заранее: от начала парка до Оперного дома около 20–25 минут пешком.',
    routes: [
      {
        label: 'Маршрут от Царицыно',
        mapUrl: 'https://yandex.ru/maps/-/CXaTN8IH',
      },
      {
        label: 'Маршрут от Орехово',
        mapUrl: 'https://yandex.ru/maps/-/CXaTRE3r',
      },
    ],
  },
  shuvalova: {
    name: 'Усадьба Шувалова',
    address: 'Улица Покровка, 40Б',
    mapUrl: 'https://yandex.ru/maps/-/CXaTZ-oG',
  },

} as const

export type PlaceId = keyof typeof places

export interface ScheduleEvent {
  time: string
  title: string
  details?: string
}

export interface ScheduleBlock {
  title: string
  placeId?: PlaceId
  events: ScheduleEvent[]
}

export const config = {
  siteUrl: 'https://romalx.github.io/AAWedding',
  siteName: 'A&A',

  coupleDisplay: 'Алексей & Анна',
  brideName: 'Анна',
  groomName: 'Алексей',

  dateDisplay: '21 ноября 2026',
  dateShort: '21.11.2026',
  timeDisplay: '14:30',
  /** Начало церемонии, Москва (UTC+3). Оффсет +03:00 обязателен. */
  countdownTarget: '2026-11-21T14:30:00+03:00',

  meta: {
    title: 'A&A',
    description:
      'Будем рады видеть вас на нашем празднике! 21 ноября 2026, 14:30, Москва.',
    ogImage: 'invitation.png',
  },

  labels: {
    openInMaps: 'Открыть в Яндекс.Картах',
  },

  hero: {
    image: 'invitation.png',
    tagline: 'Venite da noi',
    ctaLabel: 'Смотреть расписание',
    ctaHref: '#schedule',
  },

  countdown: {
    beforeLabel: 'До свадьбы осталось',
    afterLabel: 'Мы женаты',
  },


  /** Календарь «Save the Date» — месяц свадьбы */
  calendar: {
    monthLabel: 'Ноябрь',
    year: 2026,
    /** 0 = январь … 10 = ноябрь */
    monthIndex: 10,
    highlightDay: 21,
  },


  schedule: {
    title: 'Расписание',
    blocks: [
      {
        title: 'Роспись',
        placeId: 'opernyDom',
        events: [
          {
            time: '14:15',
            title: 'Сбор гостей',
            details: 'Приезжайте чуть раньше — будет время обняться и настроиться.',
          },
          {
            time: '14:30',
            title: 'Начало церемонии',
            details: 'Самый важный момент дня — в Оперном доме Царицыно.',
          },
          {
            time: '14:30 – 16:30',
            title: 'Фотосессия молодоженов',
            details: 'Наше время для памятных кадров — а вы успеете передохнуть перед вечером.',
          },
        ],
      },
      {
        title: 'Закрытый показ в Особняке',
        placeId: 'shuvalova',
        events: [
          {
            time: '17:00',
            title: 'Сбор гостей и фуршет',
            details:
              'Теплый прием с шампанским и закусками для погружения в атмосферу предстоящего спектакля',

          },
          {
            time: '18:00',
            title: 'Спектакль',
            details: '«Однажды во сне и наяву» — иммерсивное шоу нашего вечера.',
          },
          {
            time: '19:00',
            title: 'Праздничный ужин',
            details: 'Ужин, тосты и продолжение праздника в семейном кругу.',
          },
        ],
      },
    ] satisfies ScheduleBlock[],
  },

  venues: {
    title: 'Адреса',
    placeIds: ['opernyDom', 'shuvalova'] as const satisfies readonly PlaceId[],
  },

  wishes: {
    title: 'Пожелания',
    body: 'Спектакль «Однажды во сне и наяву». Будьте готовы к тому, что вас ждет иммерсивное шоу, где будут показаны мини спектакли про жизнь самих гостей. Нам будет очень приятно, если вы вспомните историю про Вас и нас, которой хотели бы поделиться в нашем уютном семейном кругу. На рассказ гостю дается 3 мин.',
  },

  footer: {
    closing: 'Алексей и Анна',
    ornament: 'footer.png',
  },



}

export function getPlace(id: PlaceId) {
  return places[id]
}
