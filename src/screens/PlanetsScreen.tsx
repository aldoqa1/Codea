import { View, Text, Alert, ActivityIndicator, Pressable } from "react-native";
import { PlanetasInglesType } from "./../types/screens/planetsType";
import { useTablesContext } from "./../utils/tablesContext";
import { ScreenProps } from "./../types/globalType";
import { useQuery } from '@tanstack/react-query';
import PlanetCard from "../components/cards/PlanetCard";
import Paginator from "./../components/Paginator";
import globalStyle from "../styles/globalStyle";

export default function PlanetsScreen({mainData, setMainData, colors, setScreen}:ScreenProps){
    
    //Paginator
    const { setIdentifierData, planetsCurrentPage, setPlanetsCurrentPage, planetsLastPage, setPlanetsLastPage } = useTablesContext();

    //It querys the data
    const {data: dataPlanets, isLoading, refetch} = useQuery({
        queryFn: () => getPlanets(),
        queryKey: ["dataPlanets", planetsCurrentPage],
    });
    
    //It shows the next is it's loading
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    //it gets all the planets / per page
    async function getPlanets() {

        //This means that it has values the arra in that position, so that we can say this array was fetched
        if(mainData.planetas[planetsCurrentPage-1] && mainData.planetas[planetsCurrentPage - 1].length >0){
            return null;
        }

        const response = await fetch(`https://swapi.dev/api/planets?page=${planetsCurrentPage}`);

        if(!response.ok){
            Alert.alert(
                'Error en consulta',
                'Error al cargar datos de planetas',
                [
                { text: 'Cerrar' },
                { text: 'Reintentar', onPress: () => refetch() },
                ],
            );
        }
        
        const data = await response.json();

        if(planetsLastPage===0){
            setPlanetsLastPage(Math.ceil(data.count/10));
        }

        //Im showing all the properties just because the test, but maybe i coldn't need all this properties
        const spanishVersion = data.results.map((item: PlanetasInglesType)=>
        {
            return {
                clima: item.climate,
                creado: item.created,
                diametro: item.diameter,
                editado: item.edited,
                gravedad: item.gravity,
                nombre: item.name,
                orbital_periodo: item.orbital_period,
                poblacion: item.population,
                rotacion_periodo: item.rotation_period,
                superficie_agua: item.surface_water,
                terreno: item.terrain,
                url: item.url,
                residentes: item.residents,
                peliculas: item.films
            }
        });
    
        const copyMainData = JSON.parse(JSON.stringify(mainData));
        
        copyMainData.planetas[planetsCurrentPage-1] = spanishVersion;
        setMainData(copyMainData);
        return (copyMainData);
    }   

    return (

        <View>

            {/* Title */}
            <Text style={[globalStyle.title, {color: colors.primary}]}>Planetas</Text>

            {/* List */}
            {mainData.planetas[planetsCurrentPage-1] && mainData.planetas[planetsCurrentPage-1].map(item=>{
                return(
                    <Pressable onPress={()=>{setIdentifierData(item.nombre); setScreen("infoPlanetScreen")}} key={item.nombre}>
                        <PlanetCard data={item} colors={colors}/>
                    </Pressable>
                )
            })}
            
            {/* Paginator */}
            <Paginator lastPage={planetsLastPage} currentPage={planetsCurrentPage} setCurrentPage={setPlanetsCurrentPage} colors={colors} />

        </View>
    );
    
}