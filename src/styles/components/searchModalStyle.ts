import { StyleSheet } from "react-native"

export default StyleSheet.create({
    searchContainer:{
        minHeight: "100%", 
        padding: 20 
    },
    searchInnerContainer:{
        flexDirection: "row",
        marginBottom: 10
    },
    searchInput:{
        borderRadius: 5,
        borderWidth: 2,
        paddingHorizontal: 15,
        fontWeight: "bold",
        fontSize: 18,
        height: "auto",
        paddingBottom: 10,
        flex: 1,
        marginBottom: 10,
    },
    searchIcon:
    { 
        position: "absolute", 
        top: 11, 
        right: 11 
    },
    searchListContainer: {
        marginBottom: 90
    }
    
});
