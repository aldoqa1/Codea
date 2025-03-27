import { View, Text, TextInput, SafeAreaView, ScrollView, Alert, ActivityIndicator, Pressable } from "react-native";
import { PersonajesInglesType, PersonajesType } from "./../types/screens/charactersType";
import { SearchModalProps } from "./../types/components/searchModalType";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTablesContext } from "./../utils/tablesContext";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import searchModalStyle from "../styles/components/searchModalStyle";
import CharacterCard from "./cards/CharacterCard";

export default function SearchModal({ setModalVisible, colors, setScreen }: SearchModalProps) {
    
    //It contains the string will search for and the litst of results
    const [contentSearcher, setContentSearcher] = useState("");
    const [foundList, setFoundList] = useState([]); 
    
    //variable to set choosenData
    const { setChoosenData } = useTablesContext();
    
    //To set loading state
    const { data: foundData, isLoading, refetch } = useQuery({
        queryFn: searchCharacters, 
        queryKey: ["foundData"], 
        enabled: false // It's no executated automatically
    });

    // funciton to search charcaters
    async function searchCharacters() {
        try {
            const response = await fetch(`https://swapi.dev/api/people/?search=${contentSearcher}`);
            const data = await response.json();

            const spanishVersion = data.results.map((item: PersonajesInglesType) => {
                return {
                    nacimiento_ano: item.birth_year,
                    creado: item.created,
                    editado: item.edited,
                    ojo_color: item.eye_color,
                    genero: item.gender,
                    cabello_color: item.hair_color,
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
            
            setFoundList(spanishVersion); // Almacena los resultados en el estado
            return(spanishVersion);

        } catch (error) {
            Alert.alert(
                'Error en consulta',
                'Error al buscar personajes',
                [
                    { text: 'Cerrar' },
                    { text: 'Reintentar', onPress: () => refetch() },
                ]
            );
        }
    }

    //It sets the foundCharacter data
    function setFoundCharacter(item:PersonajesType){
        setChoosenData(item); 
        setScreen("infoCharacterScreen"); 
        setModalVisible(false);
    }

    return (
        <SafeAreaView style={[searchModalStyle.searchContainer,{ backgroundColor: colors.backgroundColor1}]}>
            <ScrollView>
                <View style={searchModalStyle.searchInnerContainer}>
                    <TextInput
                        placeholder="Buscar personajes"
                        placeholderTextColor={colors.primary}
                        onChangeText={setContentSearcher}
                        onSubmitEditing={() => {
                            refetch();
                        }}
                        style={[searchModalStyle.searchInput, { borderColor: colors.special, color: colors.special}]}
                    />
                    <FontAwesomeIcon  style={searchModalStyle.searchIcon} icon={faSearch} size={26} color={colors.primary} />
                </View>

                {/* It shows the loading icon if it's not ready yet */}
                {isLoading ? (
                    <View >
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : (
                    <View style={searchModalStyle.searchListContainer}>
                        {foundList && foundList.map((item: PersonajesType) => (
                            <Pressable onPress={()=>{setFoundCharacter(item);}} key={item.nombre}>
                                <CharacterCard key={item.url} data={item} colors={colors} />
                            </Pressable>
                        ))}
                        {foundList && foundList.length===0 && <Text style={{color: colors.primary}}>No se encontraron personajes</Text>}
                    </View>

                )}
            </ScrollView>
        </SafeAreaView>
    );
}