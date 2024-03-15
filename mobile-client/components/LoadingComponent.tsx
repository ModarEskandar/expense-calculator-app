import { LucideLoader } from 'lucide-react-native'
import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles'
import AppContext from '../AppContext'
import { useNavigation } from '@react-navigation/native'

const LoadingComponent = () => {
    const {isLoggedIn,setIsLoggedIn} = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => {
        isLoggedIn? navigation.navigate('Home'):navigation.navigate('Signin');
    }, [isLoggedIn])
    
    return (
<View style={[styles.container,{paddingVertical: '50%'}]}>
      <LucideLoader color={'purple'} size={110} />
      <Text>Loading...</Text>

    </View>  )
}

export default LoadingComponent