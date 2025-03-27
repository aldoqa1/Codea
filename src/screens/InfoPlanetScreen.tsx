import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { PlanetasType } from "../types/screens/planetsType";
import { useTablesContext } from "../utils/tablesContext";
import { InfoScreenProps } from "../types/globalType";
import { View, Text, Alert, Pressable } from "react-native";
import { useState } from 'react';
import infoChoosenStyle from '../styles/components/infoChoosenStyle';

export default function InfoPlanetScreen({mainData, colors}:InfoScreenProps){

    //Paginator
    const { identifierData } = useTablesContext();
    let foundData : PlanetasType = {clima: '', diametro: '', creado: '', editado: '',gravedad: '',nombre: '',orbital_periodo: '', poblacion: '', rotacion_periodo: '', superficie_agua: '', terrero: '', url: '', residentes: [], peliculas: []};

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
    async function getSelectedData(url:string, type: string){
        //If containts data
        if(selectedData[url]){
            return selectedData[url];
        } 

        try{
            const response = await fetch(url);
            if(!response.ok){
                Alert.alert(
                    'Error en consulta',
                    'Error al cargar datos de planetas',
                    [
                    { text: 'Cerrar' }
                    ],
                );
                return {};
            }

            let data = await response.json();
            
            //Temporal variables. That's why im not turning them into spanish
            switch (type) {
                case "movie":{
                    data = data.title;
                    break;
                }
                case "resident":{
                    data = data.name;
                    break;
                }
                default :{
                    data = "Error obteniendo información";
                    break;
                }
            }
        
            return data;
                    
        }catch(err){
            Alert.alert(
                'Error en consulta',
                'Error al cargar datos de planetas',
                [
                { text: 'Cerrar' }
                ],
            );
        }
        return "";
    }

    //It sets the planet when exists
    mainData.planetas.forEach(element => {
        element && element.find(item=>{
            if(item.nombre === identifierData){
                foundData = item;
            }
        })
    });
    return (

        <View>
            <View style={infoChoosenStyle.upperContainer}>
            
                <View>
                    <View style={[infoChoosenStyle.cardIconContainer,{backgroundColor:colors.third}]}>
                        <FontAwesomeIcon  icon={faEarthAmericas} size={60} color={colors.special} />            
                    </View>
                </View>
                <View style={infoChoosenStyle.upperTextContainer}>
                    <Text style={[infoChoosenStyle.cardTitle, { color: colors.special}]}>{foundData.nombre}</Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Diametro: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.diametro !== "unknown" && foundData.diametro ? foundData.diametro : 'Desconocido'}`}</Text></Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Clima: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.clima !== "unknown" && foundData.clima ? foundData.clima : 'Desconocido'}`}</Text></Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Gravedad: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.gravedad !== "unknown" && foundData.gravedad ? foundData.gravedad : 'Desconocido'}`}</Text></Text>            
                </View>

            </View>      

            <View style={infoChoosenStyle.listContainer}>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.peliculas.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Peliculas</Text>
                </View>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.residentes.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Residentes</Text>
                </View>
            </View>    
            <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                <View> 
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Periodo de rotacion: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.rotacion_periodo !== "unknown" && foundData.rotacion_periodo ? foundData.rotacion_periodo : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Periodo orbital: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.orbital_periodo !== "unknown" && foundData.orbital_periodo ? foundData.orbital_periodo : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Poblacion: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.poblacion !== "unknown" && foundData.poblacion ? foundData.poblacion : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Superficie de agua: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.superficie_agua !== "unknown" && foundData.superficie_agua ? foundData.superficie_agua: 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Terreno: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.terrero !== "unknown" && foundData.terrero ? foundData.terrero : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Fecha creación: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.editado !== "unknown" && foundData.editado ? formatDate(foundData.editado) : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Fecha edición: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.creado !== "unknown" && foundData.creado ? formatDate(foundData.creado) : 'Desconocido'}`}</Text></Text>            
                </View>
            </View>  
            
            {/* Residents list */}
            {foundData.residentes.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Residentes del planeta</Text>
                    {foundData.residentes.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item, "resident");
                                const copy = JSON.parse(JSON.stringify(selectedData)); 
                                copy[item] = data; 
                                setSelectedData(copy); 
                            }}
                        >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item]  : 'Ver residente '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}

            {/* Films list */}
            {foundData.peliculas.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Peliculas del planeta</Text>
                    {foundData.peliculas.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item, "movie");
                                const copy = JSON.parse(JSON.stringify(selectedData));
                                copy[item] = data; 
                                setSelectedData(copy); 
                            }
                            }
                        >
                            <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>{selectedData[item] ? selectedData[item] : 'Ver pelicula '+(idx+1)}</Text>
                        </Pressable>
                        );
                    })}
                </View>
            )}

        </View>
   
    );
    
}