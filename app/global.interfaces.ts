export interface User {
    stats: Stats
    _id: string
    role: Role
    username: string
    activeBattle: Boolean
    coin: number
    color: string
    createdAt: string
    email: string
    image: string
    inventory: Array<IItem>
    level: number
    onboardingStage: number
    xp: number
    __v: string
}

interface Stats {
    battles: number
    draws: number
    losses: number
    wins: number
}

enum Role {
    admin = "admin",
    player = "player",
}

export type CardValues = [number, number, number, number]

interface BaseCard {
    image: string
    values: CardValues
}

export enum Rarity {
    Common = "Common",
    Uncommon = "Uncommon",
    Rare = "Rare",
    Epic = "Epic",
    Legendary = "Legendary",
}

export interface CardData extends BaseCard {
    name: string
    number: number
    rarity: string
    empower?: any
    weaken?: any
}

export interface CardLog extends BaseCard {
    _id?: string
    color?: string
}

export interface DeckCard extends CardLog {
    enemiesConverted?: number
    level?: number
    rarity: string
    selected?: boolean
    timesPlayed?: number
    xp?: number
    empower?: any
    weaken?: any
}

export interface ICard extends CardData, DeckCard {
    captured?: boolean | null
}

export interface IItem {
    contents: ItemContents
    image: string
    info: string
    level: number
    name: string
    price: number
    type: string
    _id: string
}

interface ItemContents {
    count: number
    odds: any
}

export interface ChosenQuantity {
    amount: number
    discount: string
}

interface PlayerDetails {
    user: User
    name: string
    deck: Array<CardLog>
    hand: Array<CardLog>
    roundScore: number
    battleScore: number
}

interface RoundResults {
    round: number
    p1Score: number
    p2Score: number
}

interface BattleState {
    board: Array<any>
    decksShuffled: boolean
    handsDealt: boolean
    battleStarted: boolean
    round: number
    isP1Turn: boolean
    roundOver: boolean
    roundResults: Array<RoundResults>
    battleOver: boolean
}

export interface FormData {
    username: string
    email?: string
    password: string
    confirmPassword?: string
    [key: string]: string | undefined
}

export interface HandleToggle {
    isOpen: boolean
    toggleIsOpen?: () => void
    setIsOpen?: (value: boolean) => void
}

export interface NextStage {
    nextStage: (path?: string) => Promise<void>
}

export interface Register {
    register: boolean
}

export enum BattleResult {
    win = "win",
    loss = "loss",
    draw = "draw",
}

export interface IOpponent {
    name: string
    avatar: string
    image: string
    color: string
    level: number
    deckOdds: Object
    cardCount: number
    minPower: number
    maxPower: number
    rules: Array<string>
    rounds: number
    rewards: OpponentRewards
}

interface OpponentRewards {
    xp: number
    coin: number
    items: Array<IItem>
}

export interface Odds {
    Common?: number
    Uncommon?: number
    Rare?: number
    Epic?: number
    Legendary?: number
}
