import { create } from 'zustand'

import { Character } from '@/interfaces/character'

interface CharacterState {
  characters: Character[]
  setCharacters: (characters: Character[]) => void
}

export const useCharacterStore = create<CharacterState>(set => ({
  characters: [],
  setCharacters: (characters: Character[]) => set({ characters })
}))
