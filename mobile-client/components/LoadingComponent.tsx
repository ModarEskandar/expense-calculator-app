import { LucideLoader } from 'lucide-react-native'
import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../styles'
import AppContext from '../AppContext'
import { useNavigation } from '@react-navigation/native'
import { useUserContext } from '../AuthContext'

const LoadingComponent = () => {
    // const {isLoggedIn,setIsLoggedIn} = useContext(AppContext);
    const {isLoggedIn,isLoading} = useUserContext();

    const navigation = useNavigation();

    useEffect(() => {
        !isLoading?isLoggedIn? navigation.navigate('Home'):navigation.navigate('Signin'):false;
    }, [isLoggedIn,isLoading])
    
    return (
<View style={[styles.container,{paddingVertical: '50%'}]}>
      <LucideLoader color={'purple'} size={110} />
      <Text>Loading...</Text>

    </View>  )
}

export default LoadingComponent