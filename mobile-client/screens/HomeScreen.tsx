import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AppContext from '../AppContext';
import { useGetCategories, useGetRecentExpenses } from '../lib/react-query/queries';
import { Category, Expense, ExpenseWithNames } from '../types';
import { styles } from '../styles';
import ExpenseCard from '../components/ExpenseCard';
import { Loader, PlusCircleIcon, SearchIcon } from 'lucide-react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ExpensesTable from '../components/ExpensesTable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOutUser } from '../lib/api';
import { useUserContext } from '../AuthContext';

const HomeScreen = () => {
  const {isLoggedIn,setIsLoggedIn,setUserDetails,userDetails} = useUserContext();

    const { data: expenses, isPending: isExpensesLoading,isFetchedAfterMount } = useGetRecentExpenses();
    const { data: categories, isPending: isCategoriesLoading } = useGetCategories();
    const navigation = useNavigation();
    const navigateToAddExpense = () => {
        navigation.navigate('AddExpense');
        };
        useEffect(() => {
          getDataTable();
        }, [expenses,categories,isExpensesLoading,isCategoriesLoading,isFetchedAfterMount])
    const getDataTable= () => {
  
        if(expenses && categories){
      
          for (var i = 0, len = expenses.length; i < len; i++) {        
            const expense = expenses[i];      
            const index = categories.findIndex((cat:Category)=>cat._id===expense.category);      
             expensesWithNames.unshift({...expense,categoryName:index?categories[index].name:''})
            //  expensesWithNames.push({...expense,categoryName:index?categories[index].name:''})
          }
          
          setTableData(expensesWithNames)
        }
      }
        let expensesWithNames: ExpenseWithNames[]=[];
        
        
    const [tableData,setTableData] = useState<ExpenseWithNames[]>([]);
    const handleSignOutUser = ()=>{
      signOutUser();
      setIsLoggedIn(false);
      navigation.navigate('Signin');
    }


return(<SafeAreaView>

<View style={{height:'auto',marginVertical:20}}>
<View style={styles.mainHeader}>
<Text style={styles.navLink}> Expenses List</Text>
        <TouchableOpacity onPress={() => handleSignOutUser()}>
          <Text
            style={styles.navLink}
          >
            Signout
          </Text>
        </TouchableOpacity>         
          </View>

  {!expenses && !categories && isExpensesLoading && isCategoriesLoading?(<Loader/>):(<ExpensesTable data={tableData} categories={categories!}/>)}
  
</View>
<View style={{marginTop:100}}>
<TouchableOpacity
  style={[styles.floatBtn,{ opacity: true ? 1 : 0.5 }]} onPress={navigateToAddExpense}
>
<FAB
                style={styles.fab}
                icon="plus"
                label=""
            /></TouchableOpacity>
            
</View></SafeAreaView>
)
}

export default HomeScreen

