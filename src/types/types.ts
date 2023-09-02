export interface UserLoginInput {
  email: string,
  password: string
}

export type UserRegisterInput = UserLoginInput & {
  username: string
}

export interface Ability {
  id: number,
  name: string
  description: string
  type: string
}

export type Character = {
  user_id: number
  name: string
  title?: string
  char_class?: string
  stat_str?: number
  stat_int?: number
  stat_dex?: number
  image_big?: string
  image_portrait?: string
  armor_type?: string
  main_weapon?: string
  abilities: Ability[]
}

export interface NewInputCharacter {
  name: string
  title?: string
  char_class?: string
  stat_str?: number
  stat_int?: number
  stat_dex?: number
  image_big?: string
  image_portrait?: string
  armor_type?: string
  main_weapon?: string
}

export interface UpdateInputCharacter {
  name?: string
  title?: string
  char_class?: string
  stat_str?: number
  stat_int?: number
  stat_dex?: number
  image_big?: string
  image_portrait?: string
  armor_type?: string
  main_weapon?: string
}

export interface NewInputAbility {
  character_id: number,
  name: string
  description?: string
  type?: string
}

export interface UpdateInputAbility {
  character_id: number
  name?: string
  description?: string
  type?: string
}