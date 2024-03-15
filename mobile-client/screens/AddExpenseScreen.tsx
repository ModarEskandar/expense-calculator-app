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

const AddExpenseScreen = () => {
    
    return (
        <View style={styles.container}>
                      <View style={styles.expenseFormContainer}>
              
              <Text style={styles.message}>Enter your expense details</Text>
              <ExpenseForm action='Create'/>
    
            </View>
            </View>
      );
}

export default AddExpenseScreen

