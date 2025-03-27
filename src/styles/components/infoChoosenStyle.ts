import { StyleSheet } from "react-native"

export default StyleSheet.create({
    upperContainer: {
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between", 
        marginHorizontal:"auto"
    },
    cardIconContainer: { 
        justifyContent:"center", 
        borderRadius: 5, 
        margin: 10, 
        width: 90, 
        height: 90, 
        alignItems:"center", 
        marginLeft: "auto"
    },
    cardTitle:{
        fontSize: 25,
        fontWeight: "bold",
        flex: 1, 
        flexWrap:"wrap",
        width:"auto",
        alignSelf:'baseline',
    },
    upperTextContainer:{
        alignSelf:'baseline',
        flexWrap:"wrap",
        width:"70%", 
    },
    upperText:{
        flex:1,
        flexWrap:'wrap',
        fontWeight: "bold", 
        fontSize: 16, alignSelf:'baseline'
    },
    upperTextInside:{
        fontWeight:"normal"
    },
    listContainer:{
        flexDirection:"row", 
        alignItems:"flex-start", 
        justifyContent:"center", 
        marginTop: 20
    },
    listCard:{
        alignItems: "center", 
        justifyContent:"center", 
        marginHorizontal: 5, 
        minWidth: 75, 
        paddingVertical: 10, 
        borderRadius: 5,
        paddingHorizontal: 4
    },
    listText:{
        fontWeight:"bold", 
        fontSize:14
    },
    listNumber:{
        fontSize:26, 
        fontWeight:"bold"
    },
    lowerTextContainer:{
        borderRadius: 5, 
        marginVertical: 20, 
        padding: 20,
        paddingTop: 15
    },
    lowerText:{
        fontWeight: "bold", 
        fontSize: 17,
        marginBottom: 5
    },
    lowerTextInside:{
        fontWeight:"normal"
    },
    planet:{
        fontSize: 20
    }
    
});

