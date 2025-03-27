import { PersonajesType } from '../types/screens/charactersType';
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

//Context type
type TablesContextType = {
    planetsCurrentPage: number
    setPlanetsCurrentPage: Dispatch<SetStateAction<number>>
    planetsLastPage: number
    setPlanetsLastPage: Dispatch<SetStateAction<number>>
    moviesCurrentPage: number
    setMoviesCurrentPage: Dispatch<SetStateAction<number>>
    moviesLastPage: number
    setMoviesLastPage: Dispatch<SetStateAction<number>>
    charactersCurrentPage: number
    setCharactersCurrentPage: Dispatch<SetStateAction<number>>
    charactersLastPage: number
    setCharactersLastPage: Dispatch<SetStateAction<number>>
    identifierData: string
    setIdentifierData: Dispatch<SetStateAction<string>>
    choosenData: PersonajesType
    setChoosenData: Dispatch<SetStateAction<PersonajesType>>
}

//Context
export const TablesContext = createContext<TablesContextType | null>(null);

//Tables provider type
type TablesProviderProps = {
    children: ReactNode;
}

//It provides the variables to the context
export function TablesProvider({ children }: TablesProviderProps){
  const [planetsCurrentPage, setPlanetsCurrentPage] = useState<number>(1);
  const [planetsLastPage, setPlanetsLastPage] = useState<number>(0);
  const [moviesCurrentPage, setMoviesCurrentPage] = useState<number>(1);
  const [moviesLastPage, setMoviesLastPage] = useState<number>(0);
  const [charactersCurrentPage, setCharactersCurrentPage] = useState<number>(1);
  const [charactersLastPage, setCharactersLastPage] = useState<number>(0);
  const [identifierData, setIdentifierData] = useState<string>("");
  const [choosenData, setChoosenData] = useState<PersonajesType>({nombre: '', altura: '', creado: '', editado: '',ojo_color: '',genero: '',nacimiento_ano: '', cabello_color: '', hogarplaneta: '', masa: '', piel_color: '', url: '', especies: [], naves: [], vehiculos: [], peliculas: []});
  

    return (
        <TablesContext.Provider value={{ choosenData, setChoosenData, identifierData, setIdentifierData, planetsCurrentPage, setPlanetsCurrentPage, planetsLastPage, setPlanetsLastPage, moviesCurrentPage, setMoviesCurrentPage, moviesLastPage, setMoviesLastPage, charactersCurrentPage, setCharactersCurrentPage, charactersLastPage, setCharactersLastPage }}>
            {children}
        </TablesContext.Provider>
    );
};

//To set the context and variables
export function useTablesContext() {
    const context = useContext(TablesContext);
    if (context === null) {
        throw new Error("Error en contexto!");
    }
    return context; 
}