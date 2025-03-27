import { StyleSheet } from "react-native";

const darkTheme = {
    primary: "#f4f4f4",
    secundary: "#beb9b9",
    third: "#bfbec4",
    backgroundColor1: "#1F1F1F",
    backgroundColor2: "#2e2e2e",
    backgroundColor3: "#232629",
    special: "#E1401F"
}

const lightTheme = {
    primary: "#1f1d1d",
    secundary: "#d9d4d4",
    third: "#040166",
    backgroundColor1: "#fcf9f7",
    backgroundColor2: "#f1f0fa",
    backgroundColor3: "#dfdee3",
    special: "#2572e8"
}

export const getColors = (isDarkMode:boolean) => {
    if(isDarkMode){
        return lightTheme;
    }else{
        return darkTheme;
    }
};

export default StyleSheet.create({
    dashboard:{
        minHeight:'100%'
    },
    container: {
        paddingHorizontal: 24
    },
    title: {
        fontSize: 34,  
        marginLeft: 10, 
        fontWeight: "bold", 
        marginVertical: 10
    }
});