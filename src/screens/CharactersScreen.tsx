import { View, Text, Alert, ActivityIndicator, Pressable } from "react-native";
import { PersonajesInglesType } from "./../types/screens/charactersType";
import { useTablesContext } from "./../utils/tablesContext";
import { ScreenProps } from "./../types/globalType";
import { useQuery } from '@tanstack/react-query';
import CharacterCard from "../components/cards/CharacterCard";
import Paginator from "./../components/Paginator";
import globalStyle from "../styles/globalStyle";

export default function CharactersScreen({mainData, setMainData, colors, setScreen}:ScreenProps){
   
    //Paginator
    const { charactersCurrentPage, setCharactersCurrentPage, charactersLastPage, setCharactersLastPage } = useTablesContext();
    
    //variable to set the identifier 
    const { setIdentifierData } = useTablesContext();
    
    //It querys the data
    const {data: dataCharacters, isLoading, refetch} = useQuery({
        queryFn: () => getCharacters(),
        queryKey: ["dataCharacters", charactersCurrentPage],
    });
    
    //It shows the next is it's loading
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    //it gets all the characters / per page
    async function getCharacters() {

        //This means that it has values the arra in that position, so that we can say this array was fetched
        if(mainData.personajes[charactersCurrentPage-1] && mainData.personajes[charactersCurrentPage - 1].length >0){
            return null;
        }

        const response = await fetch(`https://swapi.dev/api/people?page=${charactersCurrentPage}`);

        if(!response.ok){
            Alert.alert(
                'Error en consulta',
                'Error al cargar datos de personajes',
                [
                { text: 'Cerrar' },
                { text: 'Reintentar', onPress: () => refetch() },
                ],
            );
        }
        
        const data = await response.json();

        if(charactersLastPage===0){
            setCharactersLastPage(Math.ceil(data.count/10));
        }

        //Im showing all the properties just because the test, but maybe i coldn't need all this properties
        const spanishVersion = data.results.map((item: PersonajesInglesType)=>
        {
            return {
                nacimiento_ano: item.birth_year,
                creado: item.created,
                editado: item.edited,
                ojo_color: item.eye_color,
                genero: item.gender,
                cabello_color: item.eye_color,
                altura: item.height,
                hogarplaneta: item.homeworld,
                masa: item.mass,
                nombre: item.name,
                piel_color: item.skin_color,
                url: item.url,
                especies: item.species,
                naves: item.starships,
                vehiculos: item.vehicles,
                peliculas: item.films
            }
        });
    
        const copyMainData = JSON.parse(JSON.stringify(mainData));
        
        copyMainData.personajes[charactersCurrentPage-1] = spanishVersion;
        setMainData(copyMainData);
        return (copyMainData);
    }   

    return (

        <View>

            {/* Title */}
            <Text style={[globalStyle.title, {color: colors.primary}]}>Personajes</Text>

            {/* List */}
            {mainData.personajes[charactersCurrentPage-1] && mainData.personajes[charactersCurrentPage-1].map(item=>{
                return(
                    <Pressable onPress={()=>{setIdentifierData(item.nombre); setScreen("infoCharacterScreen")}} key={item.nombre}>
                        <CharacterCard data={item} colors={colors}/>
                    </Pressable>
                )
            })}
      
            {/* Paginator */}
            <Paginator lastPage={charactersLastPage} currentPage={charactersCurrentPage} setCurrentPage={setCharactersCurrentPage} colors={colors} />

        </View>
   
    );
    
}