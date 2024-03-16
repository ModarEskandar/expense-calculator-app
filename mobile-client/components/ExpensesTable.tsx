import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ExpenseTableProps, ExpenseWithNames } from '../types';
import { format } from 'date-fns';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDeleteExpense } from '../lib/react-query/queries';
import { styles } from '../styles';

const ExpensesTable = ({data,categories}:ExpenseTableProps) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [searchResults, setSearchResults] = useState<ExpenseWithNames[]>(data);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, searchResults.length);
  const isLastDeleted = from+1===to;
  useEffect(() => {
    
    setPage(0);
  }, [itemsPerPage,isLastDeleted]);
  const navigation = useNavigation();
  const { mutateAsync: deleteExpense, isPending: isDeletingExpense } =
  useDeleteExpense();
  const deleteExpenseHandler =  async (id:string) => {
      const deletResult = await deleteExpense(id);
      if (!deletResult) { 
          Alert.alert(`Delete expense failed. Please try again.`);
      }
      
    }
  const deleteConfirmationPopup = (id:string) => {
      Alert.alert(
        "Confirmation",
        "You are about to delete this expense?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => deleteExpenseHandler(id),
          },
        ],
        { cancelable: true }
      );
    };

    // search functionality
const handleSearch = (query:string,prop:string) => {
  
    // Filter your data based on the search query
    const filteredResults = data.filter((item:ExpenseWithNames) =>
      item[prop].toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };
  return (
    <>
    <Text style={[styles.message,{marginLeft:15,marginBottom:0}]}>Search</Text>

    <TouchableOpacity
    style={styles.searchContainer}
    
  >
      
      <View style={{ flex: 0.4 }}>
    <Text
        style={styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
          Name
      </Text>
    <TextInput
style={styles.searchInput}
onChangeText={(value)=>handleSearch(value,'name')} 
/>

    </View>
    <View style={{ flex: 0.4 }}>
    <Text
        style={styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
          Description
      </Text>
    <TextInput
style={styles.searchInput}
onChangeText={(value)=>handleSearch(value,'description')} 
/>

    </View>
    <View style={{ flex: 0.4 }}>
    <Text
        style={styles.label}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
          Category
      </Text>
    <TextInput
style={styles.searchInput}
onChangeText={(value)=>handleSearch(value,'categoryName')} 
/>

    </View>
    
    

  </TouchableOpacity>
  <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Category</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
      </DataTable.Header>

      {searchResults.slice(from, to).map((expense) => (
        <DataTable.Row key={expense._id} onLongPress={() => deleteConfirmationPopup(expense._id)}
        onPress={() =>
           {            
            navigation.navigate("Expense", {expense:expense});
          }
        }>
          <DataTable.Cell>{expense.name}</DataTable.Cell>
          <DataTable.Cell>{format(expense.date,'dd/MM/yyyy' )}</DataTable.Cell>
          <DataTable.Cell>{expense.categoryName}</DataTable.Cell>
          <DataTable.Cell numeric>${expense.amount}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(searchResults.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${searchResults.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable></>
    
  );
};

export default ExpensesTable;