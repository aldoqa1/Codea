import { StyleSheet } from "react-native"

export default StyleSheet.create({
    navMenuContainer: {
        position: "absolute", 
        bottom: 20, 
        left: 20,
        flexDirection:"row", 
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 7,
        margin: 0,
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 11,
        borderRadius: 10,
        zIndex: 2
    },
    navMenuTextContainer: {
        alignItems:"center", 
        justifyContent:"center"
    },
    navMenuText: {
        marginTop:5, 
        fontWeight: "bold", 
        fontSize:12
    }
});

