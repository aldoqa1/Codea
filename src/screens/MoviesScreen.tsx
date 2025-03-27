import { View, Text, Alert, ActivityIndicator, Pressable } from "react-native";
import { PeliculasInglesType } from "./../types/screens/moviesType";
import { useTablesContext } from "./../utils/tablesContext";
import { ScreenProps } from "./../types/globalType";
import { useQuery } from '@tanstack/react-query';
import MovieCard from "../components/cards/MovieCard";
import globalStyle from "../styles/globalStyle";

export default function MoviesScreen({mainData, setMainData, colors, setScreen}:ScreenProps){
   
    //variable to set the identifier 
    const { setIdentifierData } = useTablesContext();

    const {data: dataMovies, isLoading, refetch} = useQuery({
        queryFn: () => getMovies(),
        queryKey: ["dataMovies"],
    });
    
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    
    //It gets a list of the movies
    async function getMovies() {

        const response = await fetch("https://swapi.dev/api/films/");
        
        if(!response.ok){
            Alert.alert(
                'Error en consulta',
                'Error al cargar datos de peliculas',
                [
                { text: 'Cerrar' },
                { text: 'Reintentar', onPress: () => refetch() },
                ],
            );
        }

        const data = await response.json();

        const spanishVersion = data.results.map((item:PeliculasInglesType)=>
        {
            return {
                personajes: item.characters,
                creado: item.created,
                director: item.director,   
                editado: item.edited,
                episodio_id: item.episode_id,
                planetas: item.planets,
                productora: item.producer,
                lanzamiento_fecha: item.release_date,
                especies: item.species,
                naves: item.starships,
                titulo: item.title,
                url: item.url,
                vehiculos: item.vehicles,
                prologo: item.opening_crawl   
            }
        });
    
        const copyMainData = JSON.parse(JSON.stringify(mainData));
        copyMainData.peliculas = spanishVersion;
        setMainData(copyMainData);
        return (copyMainData);
    }    

    return (
        <View>

            {/* Title */}
            <Text style={[globalStyle.title, {color: colors.primary}]}>Peliculas</Text>
            
            {/* List */}
            {mainData.peliculas && mainData.peliculas.map(item=>{
                return(
                    <Pressable onPress={()=>{setIdentifierData(item.titulo); setScreen("infoMovieScreen")}} key={item.titulo}>
                        <MovieCard data={item} colors={colors}/>
                    </Pressable>
                )
            })}
            
        </View>
    );
    
}
