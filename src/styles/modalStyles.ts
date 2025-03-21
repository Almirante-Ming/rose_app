import { StyleSheet } from 'react-native';

export const modalStyles = StyleSheet.create({
    modalBackground: { 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black' 
    },
    modalWrapper: { flex: 1, justifyContent: 'flex-end' },
    modalContainer: { 
        height: '50%', width: '100%', backgroundColor: '#ae2831', 
        borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 
    },
});
