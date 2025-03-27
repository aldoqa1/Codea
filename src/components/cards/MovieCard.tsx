import { MovieCardProps } from "./../../types/components/cards/movieCardType";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Text, View } from "react-native";
import cardListStyle from "./../../styles/components/cardListStyle";

//This card shows the info of the movie
export default function MovieCard({data, colors}:MovieCardProps){

    return(
        <View style={[cardListStyle.cardContainer,{backgroundColor: colors.backgroundColor3}]} key={data.titulo}>
            <View style={[cardListStyle.cardIconContainer,{backgroundColor:colors.third}]}>
                <FontAwesomeIcon  icon={faFilm} size={46} color={colors.special} />            
            </View>
            <View style={cardListStyle.cardTextContainer} >
                <Text style={[cardListStyle.cardText,{color:colors.special}]}>{data.titulo}</Text>
                <Text style={[cardListStyle.cardContent,{color:colors.third}]}>Director: <Text style={{color:colors.primary}}>{data.director !== "unknown" ? data.director  : "Desconocido"}</Text></Text>
                <Text style={[cardListStyle.cardContent,{color:colors.third}]}>Episodio numero: <Text style={{color:colors.primary}}>{`${String(data.episodio_id) !== "unknown" ? data.episodio_id : 'Sin datos'}`}</Text></Text>
            </View>
        </View>
    );
}
