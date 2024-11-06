import type { Union } from '@/common/types/Common'

export const BRAND_COLOR = {
    NONE: '',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ACCENT: 'accent',
    DARK: 'dark',
    POSITIVE: 'positive',
    NEGATIVE: 'negative',
    INFO: 'info',
    WARNING: 'warning',
} as const
export type BrandColor = Union<typeof BRAND_COLOR>

// // Dashboard chart color origin-----opacity-------
// export const COLOR_TYPE = {
//     BLUE: '#36a2ebd4',
//     YELLOW: '#ffcd56d4',
//     PINK: '#ff6384d4',
//     CYAN: '#4bc0c0d4',
//     ORANGE: '#ff9f40d4',
//     PURPLE: '#9966ffd4',
//     GRAY: '#c9cbcfd4',
//     GREEN: '#32CD32',
// }


// // Dashboard chart color ---- purple------------
// export const COLOR_TYPE= {
//     PURPLE:'#8e2ff2',
//     PINK:'#dc5d9c',
//     BLUE:'#2ea3fe',
//     CYAN:'#0fedfe',
//     GRAY:'#c9cbcf',
//     GREEN: '#32CD32',
//     YELLOW: '#ffcd56',
//     ORANGE: '#ff9f40',
// }
// export const CHART_COLOR = {
//     color1: COLOR_TYPE.PURPLE,
//     color2: COLOR_TYPE.PINK,
//     color3: COLOR_TYPE.BLUE,
//     color4: COLOR_TYPE.CYAN,
//     color5: COLOR_TYPE.GRAY,
// }


// Dashboard chart color ---- SK standard----------
export const COLOR_TYPE = {
    RED:'#ea002c',
    ORANGE: '#f47725',
    BLUE: '#0072c6',
    TEAL: '#009a93',
    GREEN: '#b3cf0a',
    YELLOW: '#fbbc05',
    PURPLE: '#68127a',
    NAVY: '#0e306d',
    GRAY: '#c9cbcf',
}
export const CHART_COLOR = {
    color1: COLOR_TYPE.RED,
    color2: COLOR_TYPE.ORANGE,
    color3: COLOR_TYPE.GREEN,
    color4: COLOR_TYPE.TEAL,
    color5: COLOR_TYPE.BLUE,
    color6: COLOR_TYPE.GRAY,
    color7: COLOR_TYPE.YELLOW,
}




