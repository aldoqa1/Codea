import { PlanetasType } from "./screens/planetsType";
import { PersonajesType } from "./screens/charactersType";
import { PeliculasType } from "./screens/moviesType";

export type ColorsType = {
    primary: string
    secundary: string
    third: string
    backgroundColor1: string
    backgroundColor2: string
    backgroundColor3: string
    special: string
}

export type MainDataType = {
    peliculas: PeliculasType[]
    personajes:  PersonajesType[][]
    planetas: PlanetasType[][]
}

export type ScreenProps = {
    mainData : MainDataType
    setMainData : React.Dispatch<React.SetStateAction<MainDataType>>
    colors: ColorsType
    setScreen:  React.Dispatch<React.SetStateAction<string>>
}

export type InfoScreenProps = {
    mainData : MainDataType
    colors: ColorsType
}