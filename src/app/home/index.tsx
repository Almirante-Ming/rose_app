import { View, Text } from "react-native";
import { styles } from "./styles";
import { Callendar } from "../components/callendar";

export function Home(){
    return(
        <View style={styles.container}>
            <Callendar />
        </View>
    )
}