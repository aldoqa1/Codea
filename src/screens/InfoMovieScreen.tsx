import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { PeliculasType } from "../types/screens/moviesType";
import { View, Text, Pressable, Alert } from "react-native";
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { useTablesContext } from "../utils/tablesContext";
import { InfoScreenProps } from "../types/globalType";
import { useState } from "react";
import infoChoosenStyle from '../styles/components/infoChoosenStyle';

export default function InfoMovieScreen({mainData, colors}:InfoScreenProps){

    //Paginator
    const { identifierData } = useTablesContext();
    let foundData : PeliculasType = {titulo: '', director: '', creado: '', editado: '', lanzamiento_fecha: '', productora: '', url: '', prologo: '', episodio_id: 0, especies: [], naves: [], personajes: [], planetas: [], vehiculos: []};
    
    //It shows requested data in memory, just in memory 
    const [selectedData, setSelectedData] = useState<{[key: string]: string}>({});
    

    //It format the date to ESP
    function formatDate(dateString:string):string{
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('es-ES');
        const formattedTime = date.toLocaleTimeString('es-ES'); 
        
        return `${formattedDate} - ${formattedTime}`;
    };

    //If request certain data
    async function getSelectedData(url:string){
        //If containts data
        if(selectedData[url]){
            return selectedData[url];
        } 

        try{
            const response = await fetch(url);
            if(!response.ok){
                Alert.alert(
                    'Error en consulta',
                    'Error al cargar datos de peliculas',
                    [
                    { text: 'Cerrar' }
                    ],
                );
                return {};
            }

            let data = await response.json();
            
            //Temporal variables. That's why im not turning them into spanish
            data = data.name;
        
            return data;
                    
        }catch(err){
            Alert.alert(
                'Error en consulta',
                'Error al cargar datos de peliculas',
                [
                { text: 'Cerrar' }
                ],
            );
        }
        return "";
    }

    //It sets the film when exists
    mainData.peliculas.forEach(element => {

        if(element.titulo === identifierData){
            foundData = element;
        }

    });

    return (

        <View>
            <View style={infoChoosenStyle.upperContainer}>
            
                <View style={infoChoosenStyle.upperTextContainer}>
                    <Text style={[infoChoosenStyle.cardTitle, { color: colors.special, marginEnd: 20}]}>{foundData.titulo}</Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Numero de episodio: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${String(foundData.episodio_id) !== "unknown" && foundData.episodio_id ? String(foundData.episodio_id) : 'Desconocido'}`}</Text></Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Director: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.director !== "unknown" && foundData.director ? foundData.director : 'Desconocido'}`}</Text></Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Productora: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.productora !== "unknown" && foundData.productora ? foundData.productora : 'Desconocido'}`}</Text></Text>            
                </View>
            
                    <View style={[infoChoosenStyle.cardIconContainer,{backgroundColor:colors.third}]}>
                        <FontAwesomeIcon  icon={faFilm} size={60} color={colors.special} />            
                    </View>
      

            </View>      

            <View style={infoChoosenStyle.listContainer}>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.planetas.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Planetas</Text>
                </View>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.naves.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Naves</Text>
                </View>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.vehiculos.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Vehiculos</Text>
                </View>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.personajes.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Personajes</Text>
                </View>
            </View>    
            
            <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                <View> 
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Prologo: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.prologo !== "unknown" && foundData.prologo ? foundData.prologo : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Lanzamiento: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.lanzamiento_fecha !== "unknown" && foundData.lanzamiento_fecha ? formatDate(foundData.lanzamiento_fecha) : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Numero de especies: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{foundData.especies.length}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Fecha creación: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.editado !== "unknown" && foundData.editado ? formatDate(foundData.editado) : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Fecha edición: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.creado !== "unknown" && foundData.creado ? formatDate(foundData.creado) : 'Desconocido'}`}</Text></Text>            
                </View>
            </View>  

            {/* Vehicles list */}
            {foundData.vehiculos.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Vehiculos de la pelicula</Text>
                    {foundData.vehiculos.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item);
                                const copy = JSON.parse(JSON.stringify(selectedData)); 
                                copy[item] = data; 
                                setSelectedData(copy); 
                            }}
                        >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item]  : 'Ver vehiculo '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}

            {/* Planetas list */}
            {foundData.planetas.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Planetas del personaje</Text>
                    {foundData.planetas.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item);
                                const copy = JSON.parse(JSON.stringify(selectedData));
                                copy[item] = data; 
                                setSelectedData(copy); 
                            }
                            }
                        >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item] : 'Ver planeta '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}

            {/* Species list */}
            {foundData.especies.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Especies que aperecen</Text>
                    {foundData.especies.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item);
                                const copy = JSON.parse(JSON.stringify(selectedData));
                                copy[item] = data; 
                                setSelectedData(copy); 
                            }
                            }
                        >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item] : 'Ver especie '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}

            {/* Starships list */}
            {foundData.naves.length> 0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Naves que aperecen</Text>
                    {foundData.naves.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                                key={item}
                                onPress={async () => {
                                    const data = await getSelectedData(item);
                                    const copy = JSON.parse(JSON.stringify(selectedData));
                                    copy[item] = data; 
                                    setSelectedData(copy); 
                                }
                                }
                            >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item] : 'Ver nave '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}

            {/* Characters list */}
            {foundData.personajes.length> 0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>personajes que aperecen</Text>
                    {foundData.personajes.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                                key={item}
                                onPress={async () => {
                                    const data = await getSelectedData(item);
                                    const copy = JSON.parse(JSON.stringify(selectedData));
                                    copy[item] = data; 
                                    setSelectedData(copy); 
                                }
                                }
                            >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item] : 'Ver personaje '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}
        </View>
   
    );
    
}