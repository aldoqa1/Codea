import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HeaderProps } from "./../types/components/headerType";
import { View, Text, Pressable } from "react-native";
import HeaderStyle from "./../styles/components/headerStyle";

export default function Header({colors, setIsDarkMode, isDarkMode, setModalVisible, setScreen}:HeaderProps){

    //It updates the lightTheame
    function updateLightTheme():void{
        setIsDarkMode(!isDarkMode);
    }

    //It opens the search modal
    function search():void{
        setModalVisible(true);
        setScreen("");
    }

    return (
        <View style={[HeaderStyle.headerContainer, {backgroundColor:colors.backgroundColor2}]}>

            {/* LightTheme button */}
            <Pressable testID="light-theme-button" onPress={updateLightTheme} >
                <FontAwesomeIcon icon={faMoon} size={26} color={colors.primary} />            
            </Pressable>

            <Text style={[HeaderStyle.headerText, {color:colors.primary}]}>CODEa UNI</Text>
            
            {/* SearchModal button */}
            <Pressable testID="search-button" onPress={search}> 
                <FontAwesomeIcon icon={faSearch} size={26} color={colors.primary} />           
            </Pressable> 

        </View>
    );
    
}