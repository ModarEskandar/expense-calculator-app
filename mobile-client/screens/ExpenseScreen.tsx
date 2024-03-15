import { Text, TouchableOpacity, View } from 'react-native'
import { useCreateExpense, useGetCategories, useUpdateExpense } from '../lib/react-query/queries';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpenseSchema } from '../lib/vlaidations';
import { styles } from '../styles';
import ExpenseForm from '../components/ExpenseForm';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Expense } from '../types';

const ExpenseScreen = () => {
    const router = useRoute();
    const expense = router.params?.expense as unknown as Expense;
    
    return (
        <View style={styles.container}>
                      <View style={styles.expenseFormContainer}>

              <Text style={styles.message}>Edit Expense details</Text>
              <ExpenseForm action='Update' expense={expense}/>
    
            </View>
            </View>
      );
}

export default ExpenseScreen

