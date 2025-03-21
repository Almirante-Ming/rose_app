import { View, Text, FlatList, Modal, TouchableOpacity, Animated } from 'react-native';
import { useState, useEffect } from "react";
import { Callendar } from "../components";
import { cardStyles, containerStyles, modalStyles, textStyles } from '../../styles';
import axios from 'axios';

export function Home() {
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [backgroundOpacity] = useState(new Animated.Value(0));
    const [notes, setNotes] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:7777/');
                setNotes(response.data || {});
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        setModalVisible(true);
        Animated.timing(backgroundOpacity, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(backgroundOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const sortedNotes = [...(notes[selectedDate] || [])].sort((a, b) => {
        const getTimeValue = (time) => parseInt(time.split('h')[0]);
        return getTimeValue(a.time) - getTimeValue(b.time);
    });

    return (
        <View style={containerStyles.container}>
            <Callendar onDayPress={handleDayPress} />

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <Animated.View style={[modalStyles.modalBackground, { opacity: backgroundOpacity }]} />
                <TouchableOpacity style={modalStyles.modalWrapper} activeOpacity={1} onPress={closeModal}>
                    <View style={modalStyles.modalContainer}>
                        <Text style={textStyles.title}>Anotações para {selectedDate || '...'}</Text>
                        <FlatList
                            data={sortedNotes}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={cardStyles.card}>
                                    <Text style={cardStyles.cardTime}>{item.time}</Text>
                                    <Text style={cardStyles.cardNote}>{item.note}</Text>
                                </View>
                            )}
                            ListEmptyComponent={<Text style={textStyles.emptyText}>Nenhuma anotação encontrada</Text>}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}