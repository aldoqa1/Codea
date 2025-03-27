import { StyleSheet } from "react-native"

export default StyleSheet.create({
    cardContainer: {
        marginVertical: 10, 
        padding:5, 
        flexDirection:"row" 
        ,shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 5.46,
        elevation: 5,
        marginHorizontal: 4,
        borderRadius: 5
    },
    cardIconContainer: { 
        justifyContent:"center", 
        borderRadius: 5, 
        margin: 10, 
        width: 70, 
        height: 70, 
        alignItems:"center", 
        marginEnd:20,
    },
    cardTextContainer: {
        flexDirection:"column",
        flex: 1, 
        flexGrow: 1, 
        flexShrink: 1
    },
    cardText:{
        fontSize: 20, 
        fontWeight: "bold"    
    },
    cardContent:{
        fontSize: 15,   
    }
});

