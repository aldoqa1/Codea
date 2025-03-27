import { StyleSheet } from "react-native"

export default StyleSheet.create({
    headerText: {
        fontSize: 20, 
        fontWeight:"bold",
        marginRight:"auto", 
        marginLeft:20
    },
    headerContainer: {
        marginTop:20, 
        marginHorizontal:5,
        borderRadius:10, 
        padding:10, 
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between",
        marginBottom: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 11,
    }
});

