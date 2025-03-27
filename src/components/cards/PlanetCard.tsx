import { PlanetCardProps } from "./../../types/components/cards/planetCardType";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { Text, View } from "react-native";
import cardListStyle from "./../../styles/components/cardListStyle";

//This card shows the info of the planet
export default function PlanetCard({data, colors}:PlanetCardProps){
    
    return(
        <View style={[cardListStyle.cardContainer,{backgroundColor: colors.backgroundColor3}]} key={data.nombre}>
            <View style={[cardListStyle.cardIconContainer,{backgroundColor:colors.third}]}>
                <FontAwesomeIcon  icon={faEarthAmericas} size={46} color={colors.special} />            
            </View>
            <View style={cardListStyle.cardTextContainer} >
                <Text style={[cardListStyle.cardText,{color:colors.special}]}>{data.nombre}</Text>
                <Text style={[cardListStyle.cardContent,{color:colors.third}]}>Clima: <Text style={{color:colors.primary}}>{data.clima !== "unknown" ? data.clima  : "Desconocido"}</Text></Text>
                <Text style={[cardListStyle.cardContent,{color:colors.third}]}>Poblacion: <Text style={{color:colors.primary}}>{`${data.poblacion !== "unknown" ? data.poblacion : 'Sin datos'}`}</Text></Text>
            </View>
        </View>
    );
}
