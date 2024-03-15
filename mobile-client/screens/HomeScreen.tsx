import { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import AppContext from '../AppContext';
import { useGetCategories, useGetRecentExpenses } from '../lib/react-query/queries';
import { Category, Expense, ExpenseWithNames } from '../types';
import { styles } from '../styles';
import ExpenseCard from '../components/ExpenseCard';
import { PlusCircleIcon } from 'lucide-react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ExpensesTable from '../components/ExpensesTable';

const HomeScreen = () => {
    const { data: expenses, isPending: isExpensesLoading,isFetchedAfterMount } = useGetRecentExpenses();
    const { data: categories, isPending: isCategoriesLoading } = useGetCategories();
    const navigation = useNavigation();
    const navigateToAddExpense = () => {
        navigation.navigate('AddExpense');
        };
        useEffect(() => {
          console.log(!isExpensesLoading && !isCategoriesLoading && expenses && categories);
          
          getDataTable();
        }, [expenses,categories,isExpensesLoading,isCategoriesLoading,isFetchedAfterMount])
    const getDataTable= () => {
  
        if(expenses && categories){
      
          for (var i = 0, len = expenses.length; i < len; i++) {        
            const expense = expenses[i];      
            const index = categories.findIndex((cat:Category)=>cat._id===expense.category);      
             expensesWithNames.push({...expense,categoryName:index?categories[index].name:''})
          }
          // console.log(expensesWithNames);
          
          setTableData(expensesWithNames)
        }
      }
        let expensesWithNames: ExpenseWithNames[]=[];
        
        
    const [tableData,setTableData] = useState<ExpenseWithNames[]>([]); 
//   return (<>
//       <View >

//       <FlatList
//       data={tableData}
//       keyExtractor={expense => expense._id+expense.date}
//       renderItem={({ item }) => (
//         <ExpenseCard expense={item}/>
//       )}
    
//     />
//     <TouchableOpacity
//   style={[styles.textInput,{ opacity: true ? 1 : 0.5 }]} onPress={navigateToAddExpense}
// >
// <FAB
//                 style={styles.fab}
//                 icon="plus"
//                 label="Add more"
//             /></TouchableOpacity>
//       </View>
// </>
//   )


return(<><View>
  <ExpensesTable data={tableData} categories={categories!}/>
  
</View>
<View style={{bottom:0}}>
<TouchableOpacity
  style={[styles.floatBtn,{ opacity: true ? 1 : 0.5 }]} onPress={navigateToAddExpense}
>
<FAB
                style={styles.fab}
                icon="plus"
                label="Add more"
            /></TouchableOpacity>
</View></>
)
}

export default HomeScreen

