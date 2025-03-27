import { Modal, SafeAreaView, ScrollView, View } from "react-native";
import { ColorsType, MainDataType } from "./../types/globalType";
import GlobalStyle, {getColors} from "./../styles/globalStyle"
import React, { useEffect, useState } from "react";
import InfoCharacterScreen from "../screens/InfoCharacterScreen";
import InfoPlanetScreen from "./../screens/InfoPlanetScreen";
import CharactersScreen from "../screens/CharactersScreen";
import InfoMovieScreen from "./../screens/InfoMovieScreen";
import PlanetsScreen from "./../screens/PlanetsScreen";
import MoviesScreen from "./../screens/MoviesScreen";
import globalStyle from "./../styles/globalStyle";
import Footer from "./../components/Footer"; 
import Header from "./../components/Header"; 
import SearchModal from "./SearchModal";
import NavMenu from "./NavMenu";

export default function Dashboard(){

    //It changes the current screen
    const [screen, setScreen] = useState("moviesScreen");
  
    //This variable contains the data of the API, and it'll be shared within the application
    const [mainData, setMainData] = useState<MainDataType>({ peliculas: [], personajes: [], planetas: [] });
    
    //DarkMode state and colors
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [colors, setColors] = useState<ColorsType>(getColors(isDarkMode));
    const [modalVisible, setModalVisible] = useState(false); 

    //Up updates the color when changing the theme
    useEffect(()=>{
        setColors(getColors(isDarkMode));
    },[isDarkMode]);

    return (
        <View style={[globalStyle.dashboard, { backgroundColor: colors.backgroundColor1}]}>
            
            <SafeAreaView style={[GlobalStyle.container]}>            
                <ScrollView>
                    <Header colors={colors} setScreen={setScreen} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} setModalVisible={setModalVisible} />
                    {screen === 'moviesScreen' && <MoviesScreen setScreen={setScreen} mainData={mainData} setMainData={setMainData} colors={colors} />}
                    {screen === 'planetsScreen' && <PlanetsScreen setScreen={setScreen} mainData={mainData} setMainData={setMainData} colors={colors} />}
                    {screen === 'charactersScreen' && <CharactersScreen setScreen={setScreen} mainData={mainData} setMainData={setMainData} colors={colors} />} 
                    {screen === 'infoCharacterScreen' && <InfoCharacterScreen mainData={mainData} colors={colors} />}
                    {screen === 'infoPlanetScreen' && <InfoPlanetScreen mainData={mainData} colors={colors} />} 
                    {screen === 'infoMovieScreen' && <InfoMovieScreen mainData={mainData} colors={colors} />} 
                    <Footer colors={colors} />                 
                </ScrollView>

            </SafeAreaView>

            <Modal animationType="slide" visible={modalVisible}>    
                <SearchModal colors={colors} setScreen={setScreen} setModalVisible={setModalVisible} />
                <NavMenu colors={colors} screen={screen} setScreen={setScreen} setModalVisible={setModalVisible}/>
            </Modal>
        
            <NavMenu colors={colors} screen={screen} setScreen={setScreen} setModalVisible={setModalVisible}/>

        </View>            

    );

    
}