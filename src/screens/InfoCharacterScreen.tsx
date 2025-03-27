import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { PersonajesType } from "./../types/screens/charactersType";
import { useTablesContext } from "./../utils/tablesContext";
import { View, Text, Alert, Pressable } from "react-native";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { InfoScreenProps } from "./../types/globalType";
import { useState } from 'react';
import infoChoosenStyle from '../styles/components/infoChoosenStyle';

export default function InfoCharacterScreen({mainData, colors}:InfoScreenProps){
    
    //Paginator
    const { identifierData, choosenData } = useTablesContext();
    let foundData : PersonajesType = {nombre: '', altura: '', creado: '', editado: '',ojo_color: '',genero: '',nacimiento_ano: '', cabello_color: '', hogarplaneta: '', masa: '', piel_color: '', url: '', especies: [], naves: [], vehiculos: [], peliculas: []};
    
    //It shows requested data in memory, just in memory 
    const [selectedData, setSelectedData] = useState<{[key: string]: string}>({});
    
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
                    'Error al cargar datos de personajes',
                    [
                    { text: 'Cerrar' }
                    ],
                );
                return {};
            }

            let data = await response.json();
            
            //Temporal variables. That's why im not turning them into spanish
            switch (type) {
                case "vehicle" :{
                    data = data.name;
                    break;
                }
                case "movie":{
                    data = data.title;
                    break;
                }
                case "specie":{
                    data = data.name;
                    break;
                }
                case "starship":{
                    data = data.name;
                    break;
                }
                case "homeworld":{
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
                'Error al cargar datos de personajes',
                [
                { text: 'Cerrar' }
                ],
            );
        }
        return "";
    }

    //It format the date to ESP
    function formatDate(dateString:string):string{
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('es-ES');
        const formattedTime = date.toLocaleTimeString('es-ES'); 
        
        return `${formattedDate} - ${formattedTime}`;
    };

    //It inializes the data content
    if(!choosenData.nombre){
        mainData.personajes.forEach(element => {
            element && element.find(item=>{
                if(item.nombre === identifierData){
                    foundData = item;
                }
            })
        });
    }else{
        foundData = choosenData;
    }

    return (

        <View>

            {/* Uper information */}
            <View style={infoChoosenStyle.upperContainer}>
            
                <View style={infoChoosenStyle.upperTextContainer}>
                    <Text style={[infoChoosenStyle.cardTitle, { color: colors.special}]}>{foundData.nombre}</Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Medidas: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.masa !== "unknown" && foundData.masa ? foundData.masa+' kg' : ''}`} {`${foundData.altura !== "unknown" && foundData.altura ? foundData.altura+' cm':''}`}</Text></Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Color de ojos: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.ojo_color !== "unknown" && foundData.ojo_color ? foundData.ojo_color : 'Desconocido'}`}</Text></Text>
                    <Text style={[infoChoosenStyle.upperText, {color: colors.third}]}>Color de cabellos: <Text style={[infoChoosenStyle.upperTextInside,{color:colors.primary}]}>{`${foundData.cabello_color !== "unknown" && foundData.cabello_color ? foundData.cabello_color : 'Desconocido'}`}</Text></Text>            
                </View>
      
                <View style={[infoChoosenStyle.cardIconContainer,{backgroundColor:colors.third}]}>
                    <FontAwesomeIcon  icon={faUser} size={60} color={colors.special} />            
                </View>
    

            </View>      

            {/* List information (Counters) */}
            <View style={infoChoosenStyle.listContainer}>
                <View style={[infoChoosenStyle.listCard,{backgroundColor: colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.especies.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Especies</Text>
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
                    <Text style={[infoChoosenStyle.listNumber,{color:colors.special}]}>{foundData.peliculas.length}</Text>
                    <Text style={[infoChoosenStyle.listText,{color:colors.third}]}>Peliculas</Text>
                </View>
            </View>    
            
            {/* Lower information */}
            <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                <View> 
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Datos de personaje</Text>
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Color de piel: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.piel_color !== "unknown" && foundData.piel_color ? foundData.piel_color : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Año de nacimiento: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.nacimiento_ano !== "unknown" && foundData.nacimiento_ano ? foundData.nacimiento_ano : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Genero: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.genero !== "unknown" && foundData.genero ? foundData.genero : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Fecha creación: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.editado !== "unknown" && foundData.editado ? formatDate(foundData.editado) : 'Desconocido'}`}</Text></Text>            
                    <Text style={[infoChoosenStyle.lowerText, {color: colors.third}]}>Fecha edición: <Text style={[infoChoosenStyle.lowerTextInside, {color:colors.primary}]}>{`${foundData.creado !== "unknown" && foundData.creado ? formatDate(foundData.creado) : 'Desconocido'}`}</Text></Text>            
                    <Pressable
                        onPress={async () => {
                            const data = await getSelectedData(foundData.hogarplaneta, "homeworld");
                            const copy = JSON.parse(JSON.stringify(selectedData)); 
                            copy[foundData.hogarplaneta] = data; 
                            setSelectedData(copy); 
                        }}
                    >
                        <Text style={infoChoosenStyle.lowerText}><Text style={[infoChoosenStyle.planet, {color:colors.special}]}>{selectedData[foundData.hogarplaneta] ? selectedData[foundData.hogarplaneta] : 'Ver planeta en donde habita '}</Text></Text>            
                    </Pressable>
                </View>
            </View>  


            {/* Vehicles list */}
            {foundData.vehiculos.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Vehiculos del personaje</Text>
                    {foundData.vehiculos.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item, "vehicle");
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

            {/* Starships list */}
            {foundData.naves.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Naves del personaje</Text>
                    {foundData.naves.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item, "starship");
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

            {/* Species list */}
            {foundData.especies.length>0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Especies del personaje</Text>
                    {foundData.especies.map((item:string, idx:number)=>{
                        return (
                            <Pressable
                            key={item}
                            onPress={async () => {
                                const data = await getSelectedData(item, "specie");
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

            {/* Movies list */}
            {foundData.peliculas.length> 0 && (
                <View style={[infoChoosenStyle.lowerTextContainer,{backgroundColor:colors.backgroundColor3}]}>
                    <Text style={[infoChoosenStyle.cardTitle, {color: colors.special, marginBottom: 10}]}>Peliculas donde aparece</Text>
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