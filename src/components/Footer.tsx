import { FooterProps } from "./../types/components/footerType";
import { Text, View, Linking, Pressable,} from "react-native";
import footerStyle from "./../styles/components/footerStyle";

export default function Footer({colors}:FooterProps){

    //It shows the nice creator
    function showCreator():void{
        Linking.openURL('https://aldoquevedo.tech');
    }

    return (
        <View>
            <Text style={[footerStyle.footerText, {color:colors.primary}]}>Esta aplicación fue creada por <Pressable onPress={showCreator}><Text style={[ footerStyle.footerLink, {color:colors.special}]} >Aldo Quevedo</Text></Pressable> </Text>
        </View>
    );
    
}