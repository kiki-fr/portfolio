/** Space to put between two text parts — none after an elided article like French "l’". */
export const gap = (before: string) => (/[’']$/.test(before) ? '' : ' ')
