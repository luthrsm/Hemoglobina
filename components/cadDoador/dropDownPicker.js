import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';


const MyDropDownPicker = () => {

    const [selected, setSelected] = React.useState("");


    const tipos = [
        { key: "1", value: "Não sei" },
        { key: "2", value: "A+" },
        { key: "3", value: "A-" },
        { key: "4", value: "B+" },
        { key: "5", value: "B-" },
        { key: "6", value: "AB+" },
        { key: "7", value: "AB-" },
        { key: "8", value: "O+" },
        { key: "9", value: "O-" },
    ];

    return (
        <SelectList
            setSelected={setSelected}
            fontFamily='DM-Sans'
            data={tipos}
            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
            searchicon={<FontAwesome name="search" size={12} color={'black'} />}
            search={false}
            placeholder='Tipo Sanguíneo'
            boxStyles={styles.boxStyles}
            dropdownItemStyles={styles.dropdownItemStyles}
            dropdownStyles={styles.dropdownStyles}
        />
    )

};

export default MyDropDownPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxStyles:{
        borderColor: '#EEF0EB',
        borderRadius: 7,
        backgroundColor: '#EEF0EB',
        
    },
    dropdownStyles:{
        borderColor: '#EEF0EB',
        borderRadius: 7,
        backgroundColor: '#EEF0EB',
        marginTop: '',
        marginBottom: '5%'
    }
});