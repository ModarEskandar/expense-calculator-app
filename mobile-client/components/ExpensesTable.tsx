import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ExpenseTableProps } from '../types';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDeleteExpense } from '../lib/react-query/queries';

const ExpensesTable = ({data,categories}:ExpenseTableProps) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);
  const isLastDeleted = from+1===to;
  useEffect(() => {
    console.log(isLastDeleted);
    
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
      console.log(from,to);
      
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
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title >Name</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Category</DataTable.Title>
        <DataTable.Title >Amount</DataTable.Title>
      </DataTable.Header>

      {data.slice(from, to).map((expense) => (
        <DataTable.Row key={expense._id} onLongPress={() => deleteConfirmationPopup(expense._id)}
        onPress={() =>
           {            
            navigation.navigate("Expense", {expense:expense});
          }
        }>
          <DataTable.Cell>{expense.name}</DataTable.Cell>
          <DataTable.Cell>{format(expense.date,'dd/MM/yyyy' )}</DataTable.Cell>
          <DataTable.Cell>{expense.categoryName}</DataTable.Cell>
          <DataTable.Cell >{expense.amount}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${data.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default ExpensesTable;