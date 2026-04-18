import {
  CharacterType,
  CharacterColor,
  CHARACTER_TYPES,
  CHARACTER_COLORS,
  CHARACTER_TYPE_KO,
  CHARACTER_COLOR_KO,
} from '@/types'

export function assignRandomCharacter() {
  const type = CHARACTER_TYPES[Math.floor(Math.random() * CHARACTER_TYPES.length)] as CharacterType
  const color = CHARACTER_COLORS[Math.floor(Math.random() * CHARACTER_COLORS.length)] as CharacterColor
  const seed = `${type}-${color}-${Date.now()}`
  const name = `${CHARACTER_COLOR_KO[color]} ${CHARACTER_TYPE_KO[type]}`

  return { character_type: type, character_color: color, character_seed: seed, character_name: name }
}
