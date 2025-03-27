import { CharacterCardProps } from "./../../types/components/cards/characterCardType";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Text, View } from "react-native";
import cardListStyle from "./../../styles/components/cardListStyle";

//This card shows the info of the character
export default function CharacterCard({data, colors}:CharacterCardProps){
   
    return(
        <View style={[cardListStyle.cardContainer,{backgroundColor: colors.backgroundColor3}]} key={data.nombre}>

            <View style={[cardListStyle.cardIconContainer,{backgroundColor:colors.third}]}>
                <FontAwesomeIcon  icon={faUser} size={46} color={colors.special} />            
            </View>

            <View style={cardListStyle.cardTextContainer} >
                <Text style={[cardListStyle.cardText,{color:colors.special}]}>{data.nombre}</Text>
                <Text style={[cardListStyle.cardContent,{color:colors.third}]}>Nacimiento: <Text style={{color:colors.primary}}>{data.nacimiento_ano !== "unknown" ? data.nacimiento_ano  : "Desconocido"}</Text></Text>
                <Text style={[cardListStyle.cardContent,{color:colors.third}]}>Medidas: <Text style={{color:colors.primary}}>{`${data.masa !== "unknown" ? data.masa+' kg' : ''}`} {`${data.altura !== "unknown" ? data.altura+' cm':''}`}</Text></Text>
            </View>

        </View>
    );
}