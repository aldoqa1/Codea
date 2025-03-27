import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { PaginatorProps } from "./../types/components/paginatorType";
import { View, Text, Pressable } from "react-native";
import paginatorStyle from "../styles/components/paginatorStyle";
import React from "react";

export default function Paginator({lastPage, currentPage, setCurrentPage, colors}:PaginatorProps){
    //It shows two diferent paginator depending on the number of pages
    return (
    lastPage > 6 ? 
        
        <View style={paginatorStyle.paginatorContainer}>

            {currentPage !== 1 && <Pressable onPress={()=>setCurrentPage(currentPage - 1)}><Text style={paginatorStyle.paginatorArrowLeft}><FontAwesomeIcon  icon={faArrowLeft} size={26} color={colors.primary}/></Text></Pressable>}
            {(currentPage > 2) && <Pressable onPress={()=>setCurrentPage(1)}><Text style={[paginatorStyle.paginatorPage, {backgroundColor: colors.primary, color: colors.backgroundColor1}]}>1</Text></Pressable>}
            {(currentPage > 3) && <Text style={{color:colors.primary, fontWeight: "bold", marginHorizontal: 4, marginBottom: 7, fontSize: 20 }}>...</Text>}  

            {(currentPage > 1) && <Pressable onPress={()=>setCurrentPage(currentPage-1)}><Text style={[paginatorStyle.paginatorPage, {backgroundColor: colors.primary, color: colors.backgroundColor2}]}>{currentPage-1}</Text></Pressable>}
            {<Pressable onPress={()=>setCurrentPage(currentPage)}><Text style={[paginatorStyle.paginatorPage,{color: colors.special, backgroundColor: colors.primary}]}>{currentPage}</Text></Pressable>}
            {(currentPage < (lastPage - 1)) && <Pressable onPress={()=>setCurrentPage(currentPage+1)}><Text style={[paginatorStyle.paginatorPage, {backgroundColor: colors.primary, color: colors.backgroundColor1}]}>{currentPage+1}</Text></Pressable>}
            
            {(currentPage  < (lastPage - 2)) && <Text style={[paginatorStyle.paginatorMore, {color:colors.primary}]}>...</Text>}
            {(currentPage !== (lastPage)) && <Pressable onPress={()=>setCurrentPage(lastPage)}><Text style={[paginatorStyle.paginatorPage, {backgroundColor: colors.primary, color: colors.backgroundColor1}]}>{lastPage}</Text></Pressable>}
            {currentPage !== lastPage && <Pressable onPress={()=>setCurrentPage(currentPage + 1)}><Text style={paginatorStyle.paginatorArrowRight}><FontAwesomeIcon icon={faArrowRight} size={26} color={colors.primary}/></Text></Pressable>}

        </View>

    : 
    
        <View style={paginatorStyle.paginatorContainer}>

            {currentPage !== 1 && <Pressable onPress={()=>setCurrentPage(currentPage - 1)}><Text><FontAwesomeIcon  icon={faArrowLeft} size={26} color={colors.primary} /></Text></Pressable>}
            {(lastPage > 0) && <Pressable onPress={()=>{setCurrentPage(1);}}><Text style={[paginatorStyle.paginatorPage,{backgroundColor: colors.primary, color: currentPage == 1 ? colors.special : colors.backgroundColor1 }]}>1</Text></Pressable>}
            {(lastPage > 1) && <Pressable onPress={()=>{setCurrentPage(2);}}><Text style={[paginatorStyle.paginatorPage,{backgroundColor: colors.primary, color: currentPage == 2 ? colors.special : colors.backgroundColor1 }]}>2</Text></Pressable>}
            {(lastPage > 2) && <Pressable onPress={()=>{setCurrentPage(3);}}><Text style={[paginatorStyle.paginatorPage,{backgroundColor: colors.primary, color: currentPage == 3 ? colors.special : colors.backgroundColor1 }]}>3</Text></Pressable>}
            {(lastPage > 3) && <Pressable onPress={()=>{setCurrentPage(4);}}><Text style={[paginatorStyle.paginatorPage,{backgroundColor: colors.primary, color: currentPage == 4 ? colors.special : colors.backgroundColor1 }]}>4</Text></Pressable>}
            {(lastPage > 4) && <Pressable onPress={()=>{setCurrentPage(5);}}><Text style={[paginatorStyle.paginatorPage,{backgroundColor: colors.primary, color: currentPage == 5 ? colors.special : colors.backgroundColor1 }]}>5</Text></Pressable>}
            {(lastPage > 5) && <Pressable onPress={()=>{setCurrentPage(6);}}><Text style={[paginatorStyle.paginatorPage,{backgroundColor: colors.primary, color: currentPage == 6 ? colors.special : colors.backgroundColor1 }]}>6</Text></Pressable>}
            {currentPage !== lastPage && <Pressable onPress={()=>setCurrentPage(currentPage + 1)}><Text><FontAwesomeIcon  icon={faArrowRight} size={26} color={colors.primary} /></Text></Pressable>}
       
        </View>
            
    );

}