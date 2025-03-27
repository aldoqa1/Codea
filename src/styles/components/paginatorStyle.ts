import { StyleSheet } from "react-native"

export default StyleSheet.create({
    paginatorContainer:{
        justifyContent:"center", 
        flexDirection:"row", 
        alignItems:"center",
        marginVertical: 10,
        marginTop: 30
    },
    paginatorPage: {
        fontSize: 20,
        borderRadius:5, 
        padding:2,
        paddingHorizontal: 6,
        fontWeight: "bold",
        alignItems:"center", 
        justifyContent:"center",
        shadowColor: "black",
        marginHorizontal: 3,
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 11,
    },
    paginatorMore: {
        fontWeight: "bold", 
        marginHorizontal: 4, 
        marginBottom: 7, 
        fontSize: 20 
    },
    paginatorArrowLeft: {
        marginEnd: 10
    },
    paginatorArrowRight: {
        marginStart: 10
    }
});
