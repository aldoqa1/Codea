import { faFilm, faUser, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavMenuProps } from "./../types/components/navMenuType";
import { Text, View, Pressable, Dimensions} from "react-native";
import { useTablesContext } from "./../utils/tablesContext";
import navMenuStyle from "./../styles/components/navMenuStyle";

export default function NavMenu({colors, screen, setScreen, setModalVisible}:NavMenuProps){
    
    //It gets the screen width
    const screenWidth = Dimensions.get('window').width;
    const { setChoosenData } = useTablesContext();

    //It changes the screen type
    function changeScreen(newScreen:string):void{
        setScreen(newScreen);
        setModalVisible(false);
        //It resets the foundCharcter which was searched using the nav menu
        setChoosenData({nombre: '', altura: '', creado: '', editado: '',ojo_color: '',genero: '',nacimiento_ano: '', cabello_color: '', hogarplaneta: '', masa: '', piel_color: '', url: '', especies: [], naves: [], vehiculos: [], peliculas: []});
    }

    return (
        <View style={[navMenuStyle.navMenuContainer,{width:screenWidth-40, backgroundColor: colors.backgroundColor2}]}>
            <Pressable testID="movie-button" onPress={()=>{changeScreen("moviesScreen")}}>
                <View style={navMenuStyle.navMenuTextContainer}>
                    <FontAwesomeIcon  icon={faFilm} size={26} color={screen==="moviesScreen" || screen=== "infoMovieScreen" ? colors.special : colors.primary} />            
                    <Text style={[navMenuStyle.navMenuText, {color: screen==="moviesScreen" || screen=== "infoMovieScreen" ? colors.special : colors.primary}]}>Peliculas</Text>
                </View>
            </Pressable>
            <Pressable testID="planet-button" onPress={()=>{changeScreen("planetsScreen")}}>
                <View style={navMenuStyle.navMenuTextContainer}>
                    <FontAwesomeIcon  icon={faEarthAmericas} size={26} color={screen==="planetsScreen" || screen=== "infoPlanetScreen" ? colors.special : colors.primary} />            
                    <Text style={[navMenuStyle.navMenuText, {color:screen==="planetsScreen" || screen==="infoPlanetScreen" ? colors.special : colors.primary}]}>Planetas</Text>
                </View>
            </Pressable>
            <Pressable testID="character-button" onPress={()=>{changeScreen("charactersScreen")}}>
                <View style={navMenuStyle.navMenuTextContainer}>
                    <FontAwesomeIcon  icon={faUser} size={26} color={screen==="charactersScreen" || screen==="infoCharacterScreen" ? colors.special : colors.primary} />            
                    <Text style={[navMenuStyle.navMenuText, {color:screen==="charactersScreen" || screen==="infoCharacterScreen" ? colors.special : colors.primary}]}>Personajes</Text>
                </View>
            </Pressable>
        </View>
    );
    
}